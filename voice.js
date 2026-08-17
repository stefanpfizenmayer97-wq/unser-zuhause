/* Unser Zuhause – Sprachfunktion: reden, verstehen, eintragen */

/* ---------- Deutsches Datums-Parsing ---------- */
const WD_PARSE = { montag: 0, dienstag: 1, mittwoch: 2, donnerstag: 3, freitag: 4, samstag: 5, sonntag: 6 };

function parseDateDE(text) {
  const t = text.toLowerCase();
  const out = { date: null, time: null, matched: [] };

  if (t.includes('übermorgen')) { out.date = toISO(addDays(new Date(), 2)); out.matched.push('übermorgen'); }
  else if (t.includes('morgen') && !t.includes('guten morgen')) { out.date = toISO(addDays(new Date(), 1)); out.matched.push('morgen'); }
  else if (t.includes('heute')) { out.date = todayISO(); out.matched.push('heute'); }

  for (const [wd, i] of Object.entries(WD_PARSE)) {
    if (t.includes(wd)) {
      const now = new Date();
      const cur = (now.getDay() + 6) % 7;
      let diff = (i - cur + 7) % 7;
      if (diff === 0 && !t.includes('heute')) diff = 7; // "Montag" = nächster Montag
      out.date = toISO(addDays(now, diff));
      out.matched.push(wd);
      break;
    }
  }

  // 15.9. oder 15.09.2026
  const dm = t.match(/\b(\d{1,2})\.(\d{1,2})\.?(\d{4})?\b/);
  if (dm) {
    const y = dm[3] ? +dm[3] : new Date().getFullYear();
    let d = new Date(y, +dm[2] - 1, +dm[1]);
    if (!dm[3] && d < addDays(new Date(), -1)) d = new Date(y + 1, +dm[2] - 1, +dm[1]);
    out.date = toISO(d);
    out.matched.push(dm[0]);
  }

  // "um 18 uhr", "18:30"
  const tm = t.match(/\b(?:um\s+)?(\d{1,2})(?::(\d{2}))?\s*uhr\b/) || t.match(/\b(\d{1,2}):(\d{2})\b/);
  if (tm) {
    out.time = String(+tm[1]).padStart(2, '0') + ':' + (tm[2] || '00');
    out.matched.push(tm[0]);
  }
  return out;
}

function stripMatched(text, parsed) {
  let t = text;
  for (const m of parsed.matched) {
    t = t.replace(new RegExp('(am|um|für)?\\s*' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), ' ');
  }
  return t.replace(/\s+/g, ' ').trim();
}

function detectPerson(text) {
  const t = text.toLowerCase();
  if (t.includes('linda')) return 'linda';
  if (t.includes('stefan')) return 'stefan';
  return null;
}

/* ---------- Absicht erkennen ---------- */
function parseVoice(raw) {
  const text = raw.trim().replace(/[.!]+$/, '');
  const t = text.toLowerCase();
  const parsed = parseDateDE(text);

  // Einkaufsliste
  if (/(einkaufsliste|einkaufszettel|auf die liste|einkaufen:|kauf ein)/.test(t)) {
    let items = text
      .replace(/.*?(?:einkaufsliste|einkaufszettel|liste)[:\s]*/i, '')
      .replace(/\b(auf die|bitte|setzen?|schreib|noch|und zwar)\b/gi, ' ');
    if (/auf die (einkaufsliste|liste)/i.test(text)) {
      items = text.replace(/\s*(bitte\s*)?auf die (einkaufsliste|liste)( setzen| schreiben)?\.?\s*$/i, '')
        .replace(/^(setz|schreib|pack)\s*/i, '');
    }
    const list = items.split(/,| und /i).map(s => s.trim()).filter(s => s.length > 1);
    if (list.length) return { kind: 'shopping', items: list };
  }

  // Kochplan
  if (/(kochplan|einplanen|kochen wir|essen wir|zum abendessen|gibt es)/.test(t) && parsed.date) {
    let dish = stripMatched(text, parsed)
      .replace(/\b(für|am|bitte|kochplan|einplanen|in den|auf den|kochen wir|essen wir|zum abendessen|gibt es|dann)\b/gi, ' ')
      .replace(/\s+/g, ' ').trim();
    dish = dish.replace(/^[,\s]+|[,\s]+$/g, '');
    if (dish) return { kind: 'meal', date: parsed.date, dish };
  }

  // Termin
  if (/(termin|kalender|treffen|verabredet|essen gehen|kino|arzt|friseur|zahnarzt)/.test(t) || (parsed.date && parsed.time)) {
    let title = stripMatched(text, parsed)
      .replace(/\b(termin|in den kalender|kalender|eintragen|bitte|am|um|hab ich|habe ich|haben wir|ist)\b/gi, ' ')
      .replace(/\s+/g, ' ').trim();
    title = title.replace(/^[,\s]+|[,\s]+$/g, '');
    if (parsed.date && title) {
      return { kind: 'event', date: parsed.date, time: parsed.time || '', title, who: detectPerson(text) || 'beide' };
    }
  }

  // To-do (Standard)
  let title = stripMatched(text, parsed)
    .replace(/\b(to.?do|aufgabe|erinnere (mich|uns)|bitte|muss noch|müssen noch|muss|müssen|soll|sollte|nicht vergessen|dran denken)\b/gi, ' ')
    .replace(/\s+/g, ' ').trim();
  title = title.replace(/^[,\s]+|[,\s]+$/g, '');
  const who = detectPerson(text);
  let cleanTitle = title;
  if (who) cleanTitle = title.replace(new RegExp('\\b' + NAMES[who] + '\\b[,]?', 'i'), '').replace(/\s+/g, ' ').trim();
  return { kind: 'todo', title: cleanTitle || text, who: who || 'beide', due: parsed.date || '' };
}

/* ---------- Aufnahme ---------- */
let recog = null;
let recogStop = false;

function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { openVoiceTextFallback(); return; }

  let finalText = '';
  recogStop = false;
  recog = new SR();
  recog.lang = 'de-DE';
  recog.interimResults = true;
  recog.continuous = true;

  openSheet(`
    <h2>Ich höre zu …</h2>
    <div class="voicebox">
      <div class="live" id="voiceLive">Sprich in Ruhe – ich höre zu, bis du auf „Fertig“ tippst.<br>Z.&nbsp;B.: „Schreib ${esc(nameOf(partner()))}, dass ich später komme“ oder „Milch auf die Liste“</div>
      <button class="btn full" data-action="voice-stop">Fertig</button>
    </div>
  `);
  document.getElementById('micBtn').classList.add('listening');

  recog.onresult = ev => {
    let interim = '';
    for (let i = ev.resultIndex; i < ev.results.length; i++) {
      if (ev.results[i].isFinal) finalText += ev.results[i][0].transcript + ' ';
      else interim += ev.results[i][0].transcript;
    }
    const el = document.getElementById('voiceLive');
    if (el) el.textContent = (finalText + interim).trim() || '…';
  };
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window._voiceFinish = null;
    stopVoiceUI();
    if (finalText.trim()) understandVoice(finalText);
    else closeSheet();
  };
  window._voiceFinish = finish; // Sicherheitsnetz: „Fertig“ beendet auch, wenn die Erkennung gerade pausiert

  recog.onerror = ev => {
    if (recogStop || finished) return;
    // Stille o. Ä. ignorieren – onend startet die Aufnahme neu, bis „Fertig“ gedrückt wird
    if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed' || ev.error === 'audio-capture') {
      recogStop = true; finished = true; window._voiceFinish = null;
      stopVoiceUI(); openVoiceTextFallback();
    }
  };
  recog.onend = () => {
    if (recogStop) { finish(); return; }
    // iOS/Safari beendet die Erkennung nach kurzen Pausen von selbst – neu starten, bis „Fertig“ gedrückt wird
    try { recog.start(); } catch (e) {
      setTimeout(() => {
        if (recogStop || finished) return;
        try { recog.start(); } catch (e2) { finish(); }
      }, 180);
    }
  };
  recog.start();
}

/* Erst die KI fragen (versteht freie Sprache), sonst der eingebaute Regel-Parser */
async function understandVoice(text) {
  if (window.UZSync && UZSync.active()) {
    openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich überlege, was du meinst.</div></div>');
    try {
      const r = await UZSync.invoke('ai', { mode: 'parse', text, today: todayISO(), speaker: nameOf(me()) });
      const a = r.action || {};
      if (a.kind === 'shopping' && (a.items || []).length) return confirmVoice({ kind: 'shopping', items: a.items });
      if (a.kind === 'message' && a.title) return confirmVoice({ kind: 'message', text: a.title });
      if (a.kind === 'note' && a.title) return confirmVoice({ kind: 'note', text: a.title });
      if (a.kind === 'idea' && a.title) return confirmVoice({ kind: 'idea', text: a.title });
      if (a.kind === 'chore' && a.title) return confirmVoice({ kind: 'chore', title: a.title, freq: a.freq || 'weekly', who: a.who || 'beide' });
      if (a.kind === 'expense' && a.amount) return confirmVoice({ kind: 'expense', amount: a.amount, title: a.title || 'Ausgabe', who: (a.who === 'stefan' || a.who === 'linda') ? a.who : me() });
      if (a.kind === 'recipe' && a.title) return confirmVoice({ kind: 'recipe', name: a.title, ing: a.items || [], anleitung: a.anleitung || '' });
      if (a.kind === 'meal' && a.dish) return confirmVoice({ kind: 'meal', date: a.date || todayISO(), dish: a.dish, items: a.items || [] });
      if (a.kind === 'event' && a.title) return confirmVoice({ kind: 'event', date: a.date || todayISO(), time: a.time || '', title: a.title, who: a.who || 'beide' });
      if (a.kind === 'todo' && a.title) return confirmVoice({ kind: 'todo', title: a.title, who: a.who || 'beide', due: a.date || '' });
      if (a.kind === 'presence' && a.date) return confirmVoice({ kind: 'presence', date: a.date, who: a.who || me(), slot: a.slot || 'beide', present: a.present !== 'nein' });
    } catch (e) {
      console.warn('KI-Verstehen nicht verfügbar, nutze Regel-Parser:', e.message);
    }
  }
  confirmVoice(parseVoice(text));
}

function stopVoiceRecognition() {
  recogStop = true;
  if (recog) { try { recog.stop(); } catch (e) {} }
  // Falls die Erkennung gerade zwischen zwei Läufen hing, trotzdem sauber abschließen
  setTimeout(() => { if (window._voiceFinish) window._voiceFinish(); }, 350);
}
function stopVoiceUI() { document.getElementById('micBtn').classList.remove('listening'); }

function openVoiceTextFallback() {
  openSheet(`
    <h2>Sag mir, was ansteht</h2>
    <p class="mut">Tipp: Auf dem iPhone kannst du hier auch die Diktier-Taste der Tastatur nutzen.</p>
    <input class="f" id="voiceText" placeholder="z. B. Freitag um 19 Uhr Kino mit Linda" autofocus>
    <div style="margin-top:14px">
      <button class="btn full" data-action="voice-text-go">Verstehen &amp; eintragen</button>
    </div>
  `);
}

/* ---------- Bestätigung ---------- */
function confirmVoice(p) {
  if (p.kind === 'shopping') {
    openSheet(`
      <h2>Auf die Einkaufsliste?</h2>
      ${p.items.map(i => `<div class="row"><div class="grow"><div class="title">${esc(i)}</div><div class="meta">${esc(guessCat(i))}</div></div></div>`).join('')}
      <button class="btn full" data-action="voice-add-shopping" data-items="${esc(JSON.stringify(p.items))}">Ja, eintragen</button>
    `);
  } else if (p.kind === 'message') {
    openSheet(`
      <h2>Nachricht senden?</h2>
      <textarea class="f" id="vgMsg">${esc(p.text)}</textarea>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-send-message">An ${esc(nameOf(partner()))} schicken</button></div>
    `);
  } else if (p.kind === 'note') {
    openSheet(`
      <h2>Zettel anpinnen?</h2>
      <textarea class="f" id="vpNote">${esc(p.text)}</textarea>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-pin-note">An ${esc(nameOf(partner()))}s Pinnwand</button></div>
    `);
  } else if (p.kind === 'idea') {
    openSheet(`
      <h2>Date-Idee speichern?</h2>
      <input class="f" id="viIdea" value="${esc(p.text)}">
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-idea">Auf die Ideenliste</button></div>
    `);
  } else if (p.kind === 'expense') {
    openSheet(`
      <h2>Ausgabe eintragen?</h2>
      <div class="frow">
        <div><label class="f">Betrag (€)</label><input class="f" id="vxAmount" type="number" inputmode="decimal" step="0.01" value="${esc(String(p.amount).replace(',', '.'))}"></div>
        <div><label class="f">Bezahlt von</label>
          <select class="f" id="vxWho">
            <option value="stefan" ${p.who === 'stefan' ? 'selected' : ''}>Stefan</option>
            <option value="linda" ${p.who === 'linda' ? 'selected' : ''}>Linda</option>
          </select></div>
      </div>
      <label class="f">Wofür?</label>
      <input class="f" id="vxTitle" value="${esc(p.title)}">
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-expense">Eintragen (50/50)</button></div>
    `);
  } else if (p.kind === 'chore') {
    openSheet(`
      <h2>Neue Haushaltsaufgabe?</h2>
      <label class="f">Aufgabe</label>
      <input class="f" id="vcTitle" value="${esc(p.title)}">
      <div class="frow">
        <div><label class="f">Rhythmus</label>
          <select class="f" id="vcFreq">
            <option value="daily" ${p.freq === 'daily' ? 'selected' : ''}>täglich</option>
            <option value="weekly" ${p.freq === 'weekly' || !p.freq ? 'selected' : ''}>jede Woche</option>
            <option value="biweekly" ${p.freq === 'biweekly' ? 'selected' : ''}>alle 2 Wochen</option>
            <option value="monthly" ${p.freq === 'monthly' ? 'selected' : ''}>jeden Monat</option>
          </select></div>
        <div><label class="f">Wer?</label>
          <select class="f" id="vcWho">
            <option value="beide" ${p.who === 'beide' ? 'selected' : ''}>Im Wechsel</option>
            <option value="stefan" ${p.who === 'stefan' ? 'selected' : ''}>Stefan</option>
            <option value="linda" ${p.who === 'linda' ? 'selected' : ''}>Linda</option>
          </select></div>
      </div>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-chore">Anlegen</button></div>
    `);
  } else if (p.kind === 'recipe') {
    window._aiRecipeFromVoice = { name: p.name, ing: p.ing };
    openSheet(`
      <h2>Neues Rezept anlegen?</h2>
      <label class="f">Name</label>
      <input class="f" id="vrName" value="${esc(p.name)}">
      <label class="f">Zutaten (eine pro Zeile)</label>
      <textarea class="f" id="vrIng">${esc(p.ing.join('\n'))}</textarea>
      <label class="f">Zubereitung</label>
      <textarea class="f" id="vrAnleitung" rows="5">${esc(p.anleitung || '')}</textarea>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-recipe">Rezept speichern</button></div>
    `);
  } else if (p.kind === 'presence') {
    openSheet(`
      <h2>„Wer ist wann da“ eintragen?</h2>
      <div class="frow">
        <div><label class="f">Tag</label><input class="f" type="date" id="vpDate" value="${esc(p.date)}"></div>
        <div><label class="f">Wer</label>
          <select class="f" id="vpWho">
            <option value="stefan" ${p.who === 'stefan' ? 'selected' : ''}>Stefan</option>
            <option value="linda" ${p.who === 'linda' ? 'selected' : ''}>Linda</option>
            <option value="beide" ${p.who === 'beide' ? 'selected' : ''}>Beide</option>
          </select></div>
      </div>
      <div class="frow">
        <div><label class="f">Mahlzeit</label>
          <select class="f" id="vpSlot">
            <option value="m" ${p.slot === 'm' ? 'selected' : ''}>Mittagessen</option>
            <option value="a" ${p.slot === 'a' ? 'selected' : ''}>Abendessen</option>
            <option value="beide" ${p.slot === 'beide' ? 'selected' : ''}>Mittag + Abend</option>
          </select></div>
        <div><label class="f">Status</label>
          <select class="f" id="vpPresent">
            <option value="ja" ${p.present ? 'selected' : ''}>Da</option>
            <option value="nein" ${!p.present ? 'selected' : ''}>Nicht da</option>
          </select></div>
      </div>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-set-presence">Eintragen</button></div>
    `);
  } else if (p.kind === 'meal') {
    window._voiceMealItems = p.items || [];
    openSheet(`
      <h2>In den Kochplan?</h2>
      <label class="f">Gericht</label>
      <input class="f" id="vmDish" value="${esc(p.dish)}">
      <label class="f">Datum</label>
      <input class="f" id="vmDate" type="date" value="${p.date}">
      ${(p.items && p.items.length) ? '<div class="mut" style="margin-top:8px">Außerdem auf die Einkaufsliste: ' + esc(p.items.join(', ')) + '</div>' : ''}
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-meal">Eintragen</button></div>
    `);
  } else if (p.kind === 'event') {
    openSheet(`
      <h2>Neuer Termin?</h2>
      <label class="f">Titel</label>
      <input class="f" id="veTitle" value="${esc(p.title)}">
      <div class="frow">
        <div><label class="f">Datum</label><input class="f" id="veDate" type="date" value="${p.date}"></div>
        <div><label class="f">Uhrzeit</label><input class="f" id="veTime" type="time" value="${p.time}"></div>
      </div>
      <label class="f">Wer?</label>
      <select class="f" id="veWho">
        <option value="beide" ${p.who === 'beide' ? 'selected' : ''}>Wir beide</option>
        <option value="stefan" ${p.who === 'stefan' ? 'selected' : ''}>Stefan</option>
        <option value="linda" ${p.who === 'linda' ? 'selected' : ''}>Linda</option>
      </select>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-event">Eintragen</button></div>
    `);
  } else {
    openSheet(`
      <h2>Neues To-do?</h2>
      <label class="f">Aufgabe</label>
      <input class="f" id="vtTitle" value="${esc(p.title)}">
      <div class="frow">
        <div><label class="f">Wer?</label>
          <select class="f" id="vtWho">
            <option value="beide" ${p.who === 'beide' ? 'selected' : ''}>Beide</option>
            <option value="stefan" ${p.who === 'stefan' ? 'selected' : ''}>Stefan</option>
            <option value="linda" ${p.who === 'linda' ? 'selected' : ''}>Linda</option>
          </select></div>
        <div><label class="f">Bis wann?</label><input class="f" id="vtDue" type="date" value="${p.due}"></div>
      </div>
      <div style="margin-top:14px"><button class="btn full" data-action="voice-add-todo">Eintragen</button></div>
    `);
  }
}
