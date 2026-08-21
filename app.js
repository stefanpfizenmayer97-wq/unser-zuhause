/* Unser Zuhause – Oberfläche & Interaktion */

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- Einfarbige Icons ---------- */
const I = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="4"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  pot: '<path d="M4.5 11h15v3.5a5.5 5.5 0 0 1-5.5 5.5h-4a5.5 5.5 0 0 1-5.5-5.5V11Z"/><path d="M2.5 11h19M9 7.5C9 6.7 9.7 6 10.5 6h3c.8 0 1.5.7 1.5 1.5"/>',
  heart: '<path d="M12 20.5S4.5 16 3 11.5a4.8 4.8 0 0 1 9-2.4 4.8 4.8 0 0 1 9 2.4C19.5 16 12 20.5 12 20.5Z"/>',
  chat: '<path d="M4 5h16v11h-5l-3 3-3-3H4V5Z"/>',
  gear: '<path d="M4 8h16M4 16h16"/><circle cx="10" cy="8" r="2.6"/><circle cx="14" cy="16" r="2.6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevL: '<path d="m14.5 6-6 6 6 6"/>',
  chevR: '<path d="m9.5 6 6 6-6 6"/>',
  x: '<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>',
  cart: '<circle cx="9.5" cy="19.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="16.5" cy="19.5" r="1.3" fill="currentColor" stroke="none"/><path d="M3.5 4.5h2.2L8 15h10l2.2-8H6"/>',
  bulb: '<path d="M9.5 17.5h5M10.5 20.5h3"/><path d="M12 3.5a5.8 5.8 0 0 1 3.7 10.3c-.7.6-1 1.4-1 2.2h-5.4c0-.8-.3-1.6-1-2.2A5.8 5.8 0 0 1 12 3.5Z"/>',
  star: '<path d="m12 3.5 2.5 5.4 5.9.7-4.4 4 1.2 5.9L12 16.6l-5.2 2.9 1.2-5.9-4.4-4 5.9-.7L12 3.5Z"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.3" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.3" fill="currentColor" stroke="none"/>',
  spark: '<path d="M12 4.5 13.6 10 19 12l-5.4 2L12 19.5 10.4 14 5 12l5.4-2L12 4.5Z"/><path d="M18.5 3.5v3M17 5h3"/>',
  pen: '<path d="M4.5 19.5h4l11-11-4-4-11 11v4Z"/>',
  bell: '<path d="M6.5 16v-5.5a5.5 5.5 0 1 1 11 0V16l1.8 2H4.7l1.8-2Z"/><path d="M10.5 21h3"/>',
  moon: '<path d="M20 13.5A8 8 0 1 1 10.5 4 6.5 6.5 0 0 0 20 13.5Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
  send: '<path d="M3.5 11.3 20.5 4l-4.4 16.5-4.6-7.2-8-2Z"/><path d="m11.5 13.3 9-9.3"/>',
  case: '<rect x="3.5" y="7.5" width="17" height="12" rx="3"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12h17"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  hantel: '<path d="M2.5 12h3M18.5 12h3M8.5 12h7"/><rect x="5.5" y="8" width="3" height="8" rx="1"/><rect x="15.5" y="8" width="3" height="8" rx="1"/>',
};
function icon(n, s = 20) {
  return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n] || ''}</svg>`;
}

const state = { tab: 'home', calY: null, calM: null, calSel: todayISO(), kueche: 'plan', training: 'woche' };

/* ---------- Sheet & Toast ---------- */
function openSheet(html) {
  const w = document.getElementById('sheetWrap');
  document.getElementById('sheet').innerHTML = '<div class="sheet-grab"></div>' + html;
  w.classList.remove('hidden');
}
function closeSheet() {
  document.getElementById('sheetWrap').classList.add('hidden');
  document.getElementById('sheet').innerHTML = '';
}
function toast(msg) {
  const d = document.createElement('div');
  d.textContent = msg;
  d.style.cssText = 'position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 150px);transform:translateX(-50%);background:#414A2C;color:#F4F1E6;padding:10px 18px;border-radius:999px;font-size:14px;font-weight:600;z-index:99;box-shadow:0 4px 14px rgba(0,0,0,0.25);white-space:nowrap';
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 2000);
}
/* ---------- Partner benachrichtigen ---------- */
function pingPartner(title, body) {
  if (window.UZSync) UZSync.notifyPartner(title, (body || '').slice(0, 120));
}
/* Sammel-Push: viele kleine Änderungen (Einkauf, Kochplan …) werden zu EINER
   Benachrichtigung gebündelt, damit der andere nicht zugespamt wird. */
const _pingBatches = {};
function pingBatched(key, title, item, delay = 20000) {
  const b = _pingBatches[key] = _pingBatches[key] || { items: [] };
  if (item) b.items.push(item);
  b.title = title;
  clearTimeout(b.timer);
  b.timer = setTimeout(() => {
    const items = b.items.filter(Boolean);
    b.items = [];
    const body = items.slice(0, 5).join(', ') + (items.length > 5 ? ' und mehr' : '');
    pingPartner(b.title, body);
  }, delay);
}

function whoChip(who) {
  const lbl = who === 'beide' ? 'Beide' : nameOf(who);
  return '<span class="chip ' + esc(who) + '">' + esc(lbl) + '</span>';
}
function emptyState(ic, text) {
  return `<div class="empty"><span class="eicon">${icon(ic, 30)}</span>${text}</div>`;
}

/* ---------- Render ---------- */
function render() {
  // Trainingswoche liegt immer bereit, damit sie im Kalender erscheint
  try {
    if (typeof scheduleTrainingWeek === 'function' && DATA.training && DATA.training.plans) {
      const trMon = toISO(startOfWeek(new Date()));
      for (const p of ['stefan', 'linda']) {
        if (DATA.training.plans[p] && !DATA.training.week[trMon + ':' + p]) scheduleTrainingWeek(p, trMon);
      }
    }
  } catch (e) { console.warn('Trainingsplanung übersprungen:', e.message); }
  document.body.classList.toggle('chatmode', state.tab === 'chat');
  if (state.tab === 'chat' && unreadCount() > 0) markChatRead(); // im offenen Chat gilt alles als gelesen
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === state.tab));
  const v = document.getElementById('view');
  const views = { home: renderHome, haushalt: renderHaushalt, kalender: renderKalender, kueche: renderKueche, uns: renderUns, chat: renderChat, settings: renderSettings, training: renderTraining };
  v.innerHTML = (views[state.tab] || renderHome)();
  window.scrollTo(0, 0);
  updateBadge();
  if (state.tab === 'settings') setTimeout(fillPushCard, 50);
}

/* Benachrichtigungs-Karte in den Einstellungen mit echtem Status füllen */
async function fillPushCard() {
  const el = document.getElementById('pushCard');
  if (!el) return;
  const sync = window.UZSync;
  if (!sync || !sync.active()) {
    el.innerHTML = '<div class="hint">Erst anmelden – dann kannst du hier Benachrichtigungen einschalten.</div>';
    return;
  }
  const st = await sync.pushStatus();
  if (st === 'unsupported') {
    el.innerHTML = '<div class="hint"><b>Auf diesem Gerät nicht möglich.</b><br>Auf dem iPhone: Die App zuerst über „Teilen → Zum Home-Bildschirm“ installieren und <b>von dort</b> öffnen – im normalen Safari-Tab erlaubt iOS keine Mitteilungen (ab iOS 16.4).</div>';
    return;
  }
  if (st === 'denied') {
    el.innerHTML = '<div class="hint"><b>Von iOS blockiert.</b><br>Einschalten unter: iPhone-Einstellungen → Mitteilungen → „Zuhause“ → Mitteilungen erlauben. Danach hier zurückkommen.</div>';
    return;
  }
  el.innerHTML = st === 'on'
    ? `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
         <b>Auf diesem Gerät: aktiv</b><span class="chip stefan">AN</span>
       </div>
       <div style="display:flex;flex-direction:column;gap:8px">
         <button class="btn ghost small" data-action="push-test">Test an dieses Gerät senden</button>
         <button class="btn danger small" data-action="push-off">Benachrichtigungen ausschalten</button>
       </div>`
    : `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
         <b>Auf diesem Gerät: aus</b><span class="chip ghost">AUS</span>
       </div>
       <button class="btn small full" data-action="push-on">${icon('bell', 16)} Benachrichtigungen einschalten</button>`;
}
function updateBadge() {
  // Rote Zahl am App-Icon = nur ungelesene Nachrichten (nicht offene Aufgaben)
  if (navigator.setAppBadge) {
    const n = unreadCount();
    n ? navigator.setAppBadge(n).catch(() => {}) : navigator.clearAppBadge().catch(() => {});
  }
}

/* ---------- Home ---------- */
function renderHome() {
  noteCleanup(); // abgelaufene Pinnwand-Zettel abnehmen
  const now = new Date(), h = now.getHours();
  const greet = h < 5 ? 'Gute Nacht' : h < 11 ? 'Guten Morgen' : h < 18 ? 'Hallo' : 'Guten Abend';
  const today = todayISO();
  const pn = DATA.notes[partner()];
  const mine = e => e.who === 'beide' || e.who === me(); // nur was mich (oder uns) betrifft
  const evToday = eventsOn(today).filter(mine);
  const mealM = mealAt(today, 'm'), mealA = mealAt(today, 'a');
  const dueMine = openTasks().filter(t => taskWho(t) === me());
  const shopOpen = DATA.shopping.filter(i => !i.done).length;
  const next = nextEvents(10).filter(mine)[0];

  let html = `
  <div class="pagehead">
    <div>
      <h1 class="brand">Unser Zuhause</h1>
      <div class="sub">${greet}, ${esc(nameOf(me()))} · ${esc(fmtNice(today))}</div>
    </div>
    <div class="headbtns">
      <button class="iconbtn" data-action="open-chat" aria-label="Nachrichten" style="position:relative">${icon('chat', 19)}${unreadCount() ? '<span class="unread">' + unreadCount() + '</span>' : ''}</button>
      <button class="iconbtn" data-action="open-settings" aria-label="Einstellungen">${icon('gear', 19)}</button>
    </div>
  </div>`;

  const heartPin = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 21C6.2 16.7 3 12.8 3 9.4 3 6.5 5.2 4.4 7.7 4.4c1.7 0 3.2.9 4.3 2.4 1.1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 2.1 4.7 5 0 3.4-3.2 7.3-9 11.6Z" fill="#BC6A4A"/></svg>';
  html += `<div class="quote-paper">
    <span class="tape"></span>
    <div class="quote-text">„${esc(dailyQuote())}“</div>
    <div class="quote-sub">Gedanke des Tages</div>
  </div>`;
  const myNote = DATA.notes[me()];
  if (pn) {
    const liked = DATA.notesLiked && DATA.notesLiked[partner()];
    html += `<div class="note-paper">
      <span class="pin">${heartPin}</span>
      <div class="note-from">Für dich, von ${esc(nameOf(partner()))}</div>
      <div class="note-text">${esc(pn)}</div>
      <button class="notelike ${liked ? 'on' : ''}" data-action="note-like">♥${liked ? '' : ' liken'}</button>
    </div>`;
  }
  if (myNote) {
    html += `<div class="note-paper mine" data-action="edit-note">
      <span class="tape"></span>
      <div class="note-from">Dein Zettel für ${esc(nameOf(partner()))}</div>
      <div class="note-text">${esc(myNote)}</div>
      ${DATA.notesLiked && DATA.notesLiked[me()] ? '<div class="note-hint" style="text-align:left;color:#BC6A4A;font-weight:700">♥ Gefällt ' + esc(nameOf(partner())) + '</div>' : ''}
      <div class="note-hint">hängt noch ${noteDaysLeft(me())} Tage · tippen zum Ändern</div>
    </div>`;
  } else {
    html += `<button class="btn ghost small" data-action="edit-note">${icon('pen', 15)} Zettel für ${esc(nameOf(partner()))} anpinnen</button>`;
  }

  // Heutige Termine
  html += `<h2 class="sect">Heute <span class="more" data-action="go-kalender">zum Kalender</span></h2>`;
  if (evToday.length) {
    for (const e of evToday) {
      html += `<div class="row" style="border-left:4px solid ${WHO_COLOR(e.who)}"><span class="ric">${icon(e.src === 'ics' ? 'case' : 'cal', 18)}</span><div class="grow"><div class="title">${esc(e.title)}</div><div class="meta">${e.time ? esc(e.time) + ' Uhr · ' : ''}${e.src === 'ics' ? 'Kalender · ' : ''}${e.who === 'beide' ? 'Wir beide' : esc(nameOf(e.who))}</div></div></div>`;
    }
  } else {
    html += `<div class="card"><p class="mut" style="margin:0">Keine Termine heute.</p></div>`;
  }

  // Essen heute
  if (mealM || mealA) {
    html += `<h2 class="sect">Essen heute <span class="more" data-action="go-kueche">zum Kochplan</span></h2>`;
    if (mealM) html += `<div class="row" data-action="go-kueche"><span class="ric">${icon('pot', 18)}</span><div class="grow"><div class="title">${esc(mealName(mealM))}</div><div class="meta">Mittagessen</div></div></div>`;
    if (mealA) html += `<div class="row" data-action="go-kueche"><span class="ric">${icon('pot', 18)}</span><div class="grow"><div class="title">${esc(mealName(mealA))}</div><div class="meta">Abendessen</div></div></div>`;
  }

  // To-dos & Aufgaben nur, wenn sie HEUTE anstehen
  const todayIdx = (now.getDay() + 6) % 7;
  const tasksToday = dueMine.filter(t => t.freq === 'daily' || t.day === todayIdx);
  const todosToday = (DATA.todos || []).filter(t => !t.done && t.due === today && ((t.who || 'beide') === me() || (t.who || 'beide') === 'beide'));
  if (tasksToday.length || todosToday.length) {
    html += `<h2 class="sect">Heute dran <span class="more" data-action="go-haushalt">zum Haushalt</span></h2>`;
    for (const t of tasksToday) html += taskRow(t);
    for (const t of todosToday) {
      html += `<div class="row"><button class="check" data-action="todo-toggle" data-id="${t.id}">${icon('check', 15)}</button><div class="grow"><div class="title">${esc(t.title)}</div><div class="meta">To-do · heute fällig</div></div></div>`;
    }
  }

  // Deine Trainingswoche in Kurzform
  if (DATA.training && DATA.training.plans && DATA.training.plans[me()]) {
    const trMon = toISO(startOfWeek(new Date()));
    const trWeek = trainingWeekEntries(me(), trMon) || [];
    if (trWeek.length) {
      html += `<h2 class="sect">Deine Trainingswoche <span class="more" data-action="go-training">zum Training</span></h2>`;
      for (const e of trWeek) {
        const iso = toISO(addDays(new Date(trMon + 'T12:00'), e.day));
        const zus = trainingTogetherOn(me(), trMon, e.day, e.cat);
        html += `<div class="row ${e.done ? 'done' : ''}" data-action="go-training">
          <span class="ric">${icon('hantel', 18)}</span>
          <div class="grow"><div class="title">${esc(e.title)}${zus ? ' <span style="color:#BC6A4A">♥</span>' : ''}</div>
          <div class="meta">${WD[e.day]}${iso === todayISO() ? ' · heute' : ''}${e.time ? ' · ' + esc(e.time) + ' Uhr' : ''}${e.done ? ' · geschafft ✓' : ''}${zus ? ' · mit ' + esc(nameOf(partner())) : ''}</div></div>
        </div>`;
      }
    }
  }
  return html;
}

function mealName(m) {
  if (m.rid) { const r = DATA.recipes.find(r => r.id === m.rid); if (r) return r.name; }
  return m.name;
}
function taskRow(t) {
  const done = taskIsDone(t);
  return `<div class="row ${done ? 'done' : ''}">
    <button class="check ${done ? 'on' : ''}" data-action="toggle-task" data-id="${t.id}">${icon('check', 15)}</button>
    <div class="grow" data-action="edit-task" data-id="${t.id}">
      <div class="title">${esc(t.title)}</div>
      <div class="meta">${FREQ_LABEL[t.freq] || ''}${t.day != null ? ' · am ' + WD[t.day] : ''}${t.rotation.length > 1 ? ' · im Wechsel' : ''}</div>
    </div>
    ${whoChip(taskWho(t))}
  </div>`;
}

/* ---------- Haushalt ---------- */
function taskMini(t) {
  const done = taskIsDone(t);
  return `<div class="task-mini ${done ? 'done' : ''}" data-drag-kind="task" data-drag-id="${t.id}">
    <button class="check ${done ? 'on' : ''}" data-action="toggle-task" data-id="${t.id}">${icon('check', 13)}</button>
    <div class="grow" data-action="edit-task" data-id="${t.id}">
      <div class="title">${esc(t.title)}</div>
      <div class="meta">${FREQ_LABEL[t.freq] || ''}${t.rotation.length > 1 ? ' · Wechsel' : ''}</div>
    </div>
  </div>`;
}

function todoMini(t) {
  return `<div class="task-mini ${t.done ? 'done' : ''}" data-drag-kind="todo" data-drag-id="${t.id}">
    <button class="check ${t.done ? 'on' : ''}" data-action="todo-toggle" data-id="${t.id}">${icon('check', 13)}</button>
    <div class="grow" data-action="todo-assign" data-id="${t.id}">
      <div class="title">${esc(t.title)}</div>
      <div class="meta">einmalig${t.due ? ' · bis ' + esc(fmtShort(t.due)) : ''}</div>
    </div>
  </div>`;
}

function openTodoSheet(id) {
  const t = DATA.todos.find(x => x.id === id);
  if (!t) return;
  const w = t.who || 'beide';
  openSheet(`
    <h2>${esc(t.title)}</h2>
    <label class="f">Wer soll's machen?</label>
    <div class="frow">
      <button class="btn ${w === 'stefan' ? '' : 'ghost'}" data-action="todo-set-who" data-id="${t.id}" data-w="stefan">Stefan</button>
      <button class="btn ${w === 'linda' ? '' : 'ghost'}" data-action="todo-set-who" data-id="${t.id}" data-w="linda">Linda</button>
      <button class="btn ${w === 'beide' ? '' : 'ghost'}" data-action="todo-set-who" data-id="${t.id}" data-w="beide">Beide</button>
    </div>
    <label class="f">Bis wann? (optional)</label>
    <input class="f" type="date" id="tdDue" value="${esc(t.due || '')}">
    <div style="margin-top:14px;display:flex;gap:8px">
      <button class="btn danger small" data-action="todo-del" data-id="${t.id}">Löschen</button>
      <button class="btn" style="flex:1" data-action="todo-save-due" data-id="${t.id}">Fertig</button>
    </div>
  `);
}

function renderHaushalt() {
  let html = `<div class="pagehead"><div><h1 class="page">Haushalt</h1><div class="sub">Aufgaben &amp; Finanzen</div></div>
    <button class="iconbtn" data-action="add-task">${icon('plus', 19)}</button></div>
  <div class="seg">
    <button class="${state.haushalt !== 'finanzen' ? 'active' : ''}" data-action="hseg" data-v="aufgaben">Aufgaben</button>
    <button class="${state.haushalt === 'finanzen' ? 'active' : ''}" data-action="hseg" data-v="finanzen">Finanzen</button>
  </div>`;
  if (state.haushalt === 'finanzen') return html + renderFinanzen();

  const open = DATA.tasks.filter(t => !taskIsDone(t));
  const done = DATA.tasks.filter(t => taskIsDone(t));

  html += `<h2 class="sect">Jetzt fällig</h2>`;
  const tdOf = p => DATA.todos.filter(t => !t.done && (t.who || 'beide') === p);
  if (open.length || tdOf('stefan').length || tdOf('linda').length) {
    const st = open.filter(t => taskWho(t) === 'stefan');
    const li = open.filter(t => taskWho(t) === 'linda');
    html += `<div class="duo">
      <div data-col="stefan">
        <div class="colhead stefan">Stefan</div>
        ${st.map(taskMini).join('') + tdOf('stefan').map(todoMini).join('') || '<div class="hint" style="padding:4px 2px">Nichts offen – stark!</div>'}
      </div>
      <div data-col="linda">
        <div class="colhead linda">Linda</div>
        ${li.map(taskMini).join('') + tdOf('linda').map(todoMini).join('') || '<div class="hint" style="padding:4px 2px">Nichts offen – stark!</div>'}
      </div>
    </div>
    <div class="mut" style="margin:2px 2px 0">Tipp: Karte gedrückt halten und in die andere Spalte ziehen, um sie zuzuschieben.</div>`;
  } else {
    html += emptyState('star', 'Alles erledigt – ihr seid ein Traumteam!');
  }

  if (done.length) {
    html += `<h2 class="sect">Schon erledigt</h2>` + done.map(taskRow).join('');
  }

  html += `<h2 class="sect">Neues To-do</h2>
  <div class="addbar">
    <input class="f" id="todoInput" placeholder="Was steht an?">
    <select class="f" id="todoWho" style="flex:none;width:auto;padding:12px 8px">
      <option value="beide">Beide</option>
      <option value="stefan">Stefan</option>
      <option value="linda">Linda</option>
    </select>
    <button class="btn" data-action="todo-add">${icon('plus', 17)}</button>
  </div>
  <div class="mut" style="margin:2px 2px 8px">Direkt zuweisen – oder später per Antippen zuschieben.</div>

  <h2 class="sect">Gemeinsame To-dos</h2><div data-col="beide">`;
  const beideTodos = DATA.todos.filter(t => !t.done && (t.who || 'beide') === 'beide');
  if (!beideTodos.length) html += `<div class="card"><div class="hint">Gerade keine gemeinsamen To-dos – Stefans und Lindas stehen oben in den Spalten. Karten hierher ziehen macht sie wieder gemeinsam.</div></div>`;
  for (const t of beideTodos) {
    html += `<div class="row" data-drag-kind="todo" data-drag-id="${t.id}">
      <button class="check" data-action="todo-toggle" data-id="${t.id}">${icon('check', 15)}</button>
      <div class="grow" data-action="todo-assign" data-id="${t.id}"><div class="title">${esc(t.title)}</div><div class="meta">${t.due ? 'bis ' + esc(fmtShort(t.due)) : 'gemeinsam'}</div></div>
      <span class="chip beide" data-action="todo-assign" data-id="${t.id}" style="cursor:pointer">Beide</span>
    </div>`;
  }
  html += `</div>`;
  const doneTodos = DATA.todos.filter(t => t.done);
  if (doneTodos.length) {
    html += `<div class="cathead">Erledigt</div>`;
    for (const t of doneTodos) {
      html += `<div class="row done">
        <button class="check on" data-action="todo-toggle" data-id="${t.id}">${icon('check', 15)}</button>
        <div class="grow"><div class="title">${esc(t.title)}</div></div>
        ${whoChip(t.who || 'beide')}
      </div>`;
    }
    html += `<button class="btn ghost small" data-action="todo-clear">Erledigte entfernen</button>`;
  }
  return html;
}

function openTaskSheet(id) {
  const t = id ? DATA.tasks.find(x => x.id === id) : null;
  const rotVal = t ? (t.rotation.length > 1 ? (t.rotation[0] === 'stefan' ? 'st-li' : 'li-st') : 'nur-' + t.rotation[0]) : 'st-li';
  openSheet(`
    <h2>${t ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}</h2>
    <label class="f">Aufgabe</label>
    <input class="f" id="tkTitle" value="${t ? esc(t.title) : ''}" placeholder="z. B. Altglas wegbringen">
    <div class="frow">
      <div><label class="f">Rhythmus</label>
      <select class="f" id="tkFreq">
        <option value="daily" ${t && t.freq === 'daily' ? 'selected' : ''}>täglich</option>
        <option value="weekly" ${!t || t.freq === 'weekly' ? 'selected' : ''}>jede Woche</option>
        <option value="biweekly" ${t && t.freq === 'biweekly' ? 'selected' : ''}>alle 2 Wochen</option>
        <option value="monthly" ${t && t.freq === 'monthly' ? 'selected' : ''}>jeden Monat</option>
      </select></div>
      <div><label class="f">Am liebsten am</label>
      <select class="f" id="tkDay">
        <option value="">egal</option>
        ${WD.map((d, i) => '<option value="' + i + '" ' + (t && t.day === i ? 'selected' : '') + '>' + d + '</option>').join('')}
      </select></div>
    </div>
    <label class="f">Wer ist dran?</label>
    <select class="f" id="tkRot">
      <option value="st-li" ${rotVal === 'st-li' ? 'selected' : ''}>Im Wechsel – Stefan beginnt</option>
      <option value="li-st" ${rotVal === 'li-st' ? 'selected' : ''}>Im Wechsel – Linda beginnt</option>
      <option value="nur-stefan" ${rotVal === 'nur-stefan' ? 'selected' : ''}>Immer Stefan</option>
      <option value="nur-linda" ${rotVal === 'nur-linda' ? 'selected' : ''}>Immer Linda</option>
    </select>
    <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="save-task" data-id="${t ? t.id : ''}">Speichern</button>
      ${t ? '<button class="btn danger full" data-action="del-task" data-id="' + t.id + '">Aufgabe löschen</button>' : ''}
    </div>
  `);
}

/* ---------- Finanzen: wer hat was ausgelegt? ---------- */
function renderFinanzen() {
  const open = (DATA.expenses || []).filter(e => !e.settled);
  const settled = (DATA.expenses || []).filter(e => e.settled).slice(-8).reverse();
  const net = expenseBalance();
  let balanceHtml;
  if (Math.abs(net) < 0.005) {
    balanceHtml = '<div class="num" style="font-size:22px">Ihr seid quitt</div><div class="lbl">nichts offen</div>';
  } else {
    const schuldner = net > 0 ? 'Linda' : 'Stefan';
    const glaeubiger = net > 0 ? 'Stefan' : 'Linda';
    balanceHtml = `<div class="num">${fmtEuro(Math.abs(net))}</div><div class="lbl">bekommt <b>${glaeubiger}</b> von <b>${schuldner}</b></div>`;
  }
  let html = `<div class="card" style="text-align:center;padding:18px">${balanceHtml}</div>

  <h2 class="sect">Ausgabe eintragen</h2>
  <div class="card">
    <div class="frow">
      <div><label class="f">Betrag (€)</label><input class="f" id="expAmount" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0,00"></div>
      <div><label class="f">Bezahlt von</label>
        <select class="f" id="expWho">
          <option value="stefan" ${me() === 'stefan' ? 'selected' : ''}>Stefan</option>
          <option value="linda" ${me() === 'linda' ? 'selected' : ''}>Linda</option>
        </select></div>
    </div>
    <label class="f">Wofür?</label>
    <input class="f" id="expTitle" placeholder="z. B. Wocheneinkauf, Pizza, Drogerie …">
    <button class="btn full" style="margin-top:12px" data-action="exp-add">Eintragen (wird 50/50 geteilt)</button>
  </div>

  <h2 class="sect">Offene Ausgaben</h2>`;
  if (open.length) {
    for (const e of open.slice().reverse()) {
      html += `<div class="row" style="border-left:4px solid ${e.paidBy === 'stefan' ? 'var(--olive)' : 'var(--clay)'}">
        <div class="grow"><div class="title">${esc(e.title)}</div>
        <div class="meta">${esc(fmtShort(e.date))} · ${esc(nameOf(e.paidBy))} hat bezahlt</div></div>
        <b style="white-space:nowrap">${fmtEuro(e.amount)}</b>
        <button class="check" data-action="exp-del" data-id="${e.id}" style="border-color:#E0C4B8;color:#A54B32">${icon('x', 13)}</button>
      </div>`;
    }
    html += `<button class="btn full" style="margin-top:8px" data-action="exp-settle-open">Ausgleichen &amp; abhaken</button>`;
  } else {
    html += `<div class="card"><div class="hint">Keine offenen Ausgaben. Trag ein, was jemand ausgelegt hat – die App rechnet automatisch 50/50.</div></div>`;
  }
  if (settled.length) {
    html += `<div class="cathead">Beglichen (zuletzt)</div>`;
    for (const e of settled) {
      html += `<div class="row done"><div class="grow"><div class="title">${esc(e.title)}</div><div class="meta">${esc(fmtShort(e.date))} · ${esc(nameOf(e.paidBy))}</div></div><span class="mut">${fmtEuro(e.amount)}</span></div>`;
    }
  }
  return html;
}

/* ---------- Kalender ---------- */
const WHO_COLOR = w => w === 'linda' ? '#E02D2D' : w === 'stefan' ? '#1E1E1E' : '#F5B301';

function calLegend() {
  return `<div class="legend">
    <span><i class="dot stefan"></i>Stefan</span>
    <span><i class="dot linda"></i>Linda</span>
    <span><i class="dot beide"></i>Gemeinsam</span>
    <span style="display:inline-flex;align-items:center;gap:4px">${icon('case', 13)} Outlook/Apple</span>
  </div>`;
}

function calEvRow(e, compact) {
  const borderColor = e.src === 'special' ? '#B98A3D' : WHO_COLOR(e.who);
  const ic = e.src === 'special' ? 'star' : e.src === 'ics' ? 'case' : 'cal';
  const quelle = e.src === 'special' ? 'besonderer Tag' : e.src === 'ics' ? 'Kalender-Abo' : 'eingetragen';
  const editable = !e.src;
  return `<div class="row" style="border-left:4px solid ${borderColor};${compact ? 'padding:9px 12px;margin-bottom:6px' : ''}">
    <span class="ric" ${e.src === 'special' ? 'style="color:#B98A3D"' : ''}>${icon(ic, compact ? 16 : 18)}</span>
    <div class="grow" ${editable ? 'data-action="edit-event" data-id="' + e.id + '"' : ''}><div class="title" ${compact ? 'style="font-size:14px"' : ''}>${esc(e.title)}</div>
    <div class="meta">${e.time ? esc(e.time) + ' Uhr · ' : ''}${e.allday ? 'ganztägig · ' : ''}${e.endDate ? 'bis ' + esc(fmtShort(e.endDate)) + ' · ' : ''}${quelle} · ${e.who === 'beide' ? 'gemeinsam' : esc(nameOf(e.who))}${e.repeat ? ' · ↻ ' + REPEAT_LABEL[e.repeat] : ''}</div></div>
    ${whoChip(e.who)}
    ${editable ? '<button class="check" data-action="del-event" data-id="' + e.id + '" style="border-color:#E0C4B8;color:#A54B32">' + icon('x', 13) + '</button>' : ''}
  </div>`;
}

function renderKalender() {
  if (state.calY === null) { const n = new Date(); state.calY = n.getFullYear(); state.calM = n.getMonth(); }
  if (!state.calView) state.calView = 'monat';

  let html = `<div class="pagehead"><div><h1 class="page">Kalender</h1><div class="sub">Unser gemeinsamer Überblick</div></div>
    <button class="iconbtn" data-action="add-event">${icon('plus', 19)}</button></div>
  <div class="seg">
    <button class="${state.calView === 'monat' ? 'active' : ''}" data-action="cal-view" data-v="monat">Monat</button>
    <button class="${state.calView === 'woche' ? 'active' : ''}" data-action="cal-view" data-v="woche">Woche</button>
    <button class="${state.calView === 'tag' ? 'active' : ''}" data-action="cal-view" data-v="tag">Tag</button>
  </div>`;

  if (state.calView === 'woche') return html + renderCalWoche();
  if (state.calView === 'tag') return html + renderCalTag();
  return html + renderCalMonat();
}

function renderCalWoche() {
  const ws = startOfWeek(fromISO(state.calSel));
  const we = addDays(ws, 6);
  const today = todayISO();
  let html = `<div class="calhead">
    <button class="iconbtn" data-action="cal-prev">${icon('chevL', 18)}</button>
    <div class="m">${ws.getDate()}.${ws.getMonth() + 1}. – ${we.getDate()}.${we.getMonth() + 1}.${we.getFullYear()}</div>
    <button class="iconbtn" data-action="cal-next">${icon('chevR', 18)}</button>
  </div>` + calLegend();
  for (let i = 0; i < 7; i++) {
    const d = addDays(ws, i);
    const iso = toISO(d);
    const evs = eventsOn(iso);
    html += `<div class="dayblock ${iso === today ? 'today' : ''}">
      <div class="dayhead" data-action="cal-day-tag" data-iso="${iso}">
        <span>${WD_LONG[i]}, ${d.getDate()}. ${MONTHS[d.getMonth()]}</span>
        ${iso === today ? '<span class="chip stefan" style="background:var(--olive);color:#fff">Heute</span>' : ''}
      </div>
      ${evs.length ? evs.map(e => calEvRow(e, true)).join('') : '<div class="noev">frei</div>'}
    </div>`;
  }
  return html;
}

function renderCalTag() {
  const iso = state.calSel;
  const evs = eventsOn(iso);
  let html = `<div class="calhead">
    <button class="iconbtn" data-action="cal-prev">${icon('chevL', 18)}</button>
    <div class="m" style="font-size:17px">${esc(fmtNice(iso))}</div>
    <button class="iconbtn" data-action="cal-next">${icon('chevR', 18)}</button>
  </div>` + calLegend();
  if (evs.length) {
    for (const e of evs) {
      html += `<div class="tagrow">
        <div class="ttime">${e.time ? esc(e.time) : 'ganz-<br>tägig'}</div>
        <div class="grow">${calEvRow(e, false)}</div>
      </div>`;
    }
  } else {
    html += emptyState('cal', 'An diesem Tag ist nichts eingetragen.');
  }
  html += `<button class="btn ghost small full" style="margin-top:8px" data-action="add-event">${icon('plus', 15)} Termin an diesem Tag</button>`;
  return html;
}

function renderCalMonat() {
  const y = state.calY, m = state.calM;
  const first = new Date(y, m, 1);
  const startPad = (first.getDay() + 6) % 7;
  const gridStart = addDays(first, -startPad);
  const today = todayISO();

  let cells = '';
  for (const w of WD) cells += `<div class="wd">${w}</div>`;
  for (let i = 0; i < 42; i++) {
    const d = addDays(gridStart, i);
    const iso = toISO(d);
    const evs = eventsOn(iso);
    const dots = evs.slice(0, 3).map(e => `<span class="dot ${e.who === 'linda' ? 'linda' : e.who === 'stefan' ? 'stefan' : 'beide'}"></span>`).join('');
    cells += `<button class="day ${d.getMonth() !== m ? 'dim' : ''} ${iso === today ? 'today' : ''} ${iso === state.calSel ? 'sel' : ''}" data-action="cal-day" data-iso="${iso}">
      <span>${d.getDate()}</span><span class="dots">${dots}</span></button>`;
  }

  const selEvs = eventsOn(state.calSel);
  let html = `<div class="calhead">
    <button class="iconbtn" data-action="cal-prev">${icon('chevL', 18)}</button>
    <div class="m">${MONTHS[m]} ${y}</div>
    <button class="iconbtn" data-action="cal-next">${icon('chevR', 18)}</button>
  </div>
  <div class="calgrid">${cells}</div>
  ${calLegend()}
  <h2 class="sect">${esc(fmtNice(state.calSel))}</h2>`;

  if (selEvs.length) {
    html += selEvs.map(e => calEvRow(e, false)).join('');
  } else {
    html += emptyState('cal', 'Nichts eingetragen.');
  }

  // Kleine Wochen-Vorschau ab dem gewählten Tag
  html += `<h2 class="sect">Die nächsten 7 Tage</h2>`;
  let anyWeek = false;
  for (let i = 1; i <= 7; i++) {
    const d = addDays(fromISO(state.calSel), i);
    const iso = toISO(d);
    const evs = eventsOn(iso);
    if (!evs.length) continue;
    anyWeek = true;
    html += `<div class="weekrow" data-action="cal-day" data-iso="${iso}">
      <div class="wd2">${WD[(d.getDay() + 6) % 7]}<br><b>${d.getDate()}.</b></div>
      <div class="wevs">${evs.map(e =>
        `<div class="wev"><i class="dot ${e.who === 'linda' ? 'linda' : e.who === 'stefan' ? 'stefan' : 'beide'}"></i>${e.time ? '<b>' + esc(e.time) + '</b> ' : ''}${esc(e.title)}${e.src === 'ics' ? ' <span class="mut">· Abo</span>' : ''}</div>`
      ).join('')}</div>
    </div>`;
  }
  if (!anyWeek) html += `<div class="card"><div class="hint">In den nächsten 7 Tagen ist nichts eingetragen.</div></div>`;

  return html;
}

function openEventSheet(dateISO, id) {
  const ev = id ? DATA.events.find(e => e.id === id) : null;
  const w = ev ? ev.who : 'beide';
  openSheet(`
    <h2>${ev ? 'Termin bearbeiten' : 'Neuer Termin'}</h2>
    <label class="f">Titel</label>
    <input class="f" id="evTitle" value="${ev ? esc(ev.title) : ''}" placeholder="z. B. Kino mit Linda">
    <div class="frow">
      <div><label class="f">Datum</label><input class="f" id="evDate" type="date" value="${ev ? ev.date : dateISO}"></div>
      <div><label class="f">Uhrzeit</label><input class="f" id="evTime" type="time" value="${ev ? esc(ev.time || '') : ''}"></div>
    </div>
    <label style="display:flex;gap:10px;align-items:center;margin:10px 2px 4px;font-size:14px">
      <input type="checkbox" id="evAllday" ${ev && ev.allday ? 'checked' : ''}> Ganztägig (ohne Uhrzeit)
    </label>
    <label class="f">Bis (bei mehreren Tagen, sonst leer lassen)</label>
    <input class="f" id="evEnd" type="date" value="${ev && ev.endDate ? ev.endDate : ''}">
    <div class="frow">
      <div><label class="f">Wer?</label>
      <select class="f" id="evWho">
        <option value="beide" ${w === 'beide' ? 'selected' : ''}>Wir beide</option>
        <option value="stefan" ${w === 'stefan' ? 'selected' : ''}>Stefan</option>
        <option value="linda" ${w === 'linda' ? 'selected' : ''}>Linda</option>
      </select></div>
      <div><label class="f">Wiederholen?</label>
      <select class="f" id="evRepeat">
        <option value="" ${!ev || !ev.repeat ? 'selected' : ''}>einmalig</option>
        <option value="weekly" ${ev && ev.repeat === 'weekly' ? 'selected' : ''}>wöchentlich</option>
        <option value="biweekly" ${ev && ev.repeat === 'biweekly' ? 'selected' : ''}>alle 2 Wochen</option>
        <option value="monthly" ${ev && ev.repeat === 'monthly' ? 'selected' : ''}>monatlich</option>
      </select></div>
    </div>
    ${ev && ev.repeat ? '<div class="mut" style="margin-top:6px">Änderungen und Löschen gelten für die ganze Serie.</div>' : ''}
    <div style="margin-top:16px;display:flex;gap:8px">
      ${ev ? '<button class="btn danger small" data-action="del-event-sheet" data-id="' + ev.id + '">Löschen</button>' : ''}
      <button class="btn" style="flex:1" data-action="save-event" data-id="${ev ? ev.id : ''}">${ev ? 'Speichern' : 'Eintragen'}</button>
    </div>
  `);
}

/* ---------- Küche ---------- */
function renderKueche() {
  let html = `<div class="pagehead"><div><h1 class="page">Küche</h1><div class="sub">Kochplan, Einkauf &amp; Rezepte</div></div></div>
  <div class="seg">
    <button class="${state.kueche === 'plan' ? 'active' : ''}" data-action="kseg" data-v="plan">Kochplan</button>
    <button class="${state.kueche === 'list' ? 'active' : ''}" data-action="kseg" data-v="list">Einkaufsliste</button>
    <button class="${state.kueche === 'rezepte' ? 'active' : ''}" data-action="kseg" data-v="rezepte">Rezepte</button>
  </div>`;
  if (state.kueche === 'plan') html += renderMealplan();
  else if (state.kueche === 'list') html += renderShopping();
  else html += renderRecipes();
  return html;
}

function renderMealplan() {
  const today = todayISO();
  let html = `<div class="frow" style="margin-bottom:4px">
    <button class="btn ghost small" data-action="presence-open">Wer ist wann da?</button>
    <button class="btn ghost small" data-action="meal-fill">${icon('spark', 15)} Vorschläge</button>
  </div>`;
  let curWeek = null;
  for (let i = 0; i < 14; i++) {
    const d = addDays(new Date(), i);
    const iso = toISO(d);
    const wk = toISO(startOfWeek(d));
    if (wk !== curWeek) {
      curWeek = wk;
      const off = Math.round((startOfWeek(d) - startOfWeek(new Date())) / (7 * 864e5));
      html += `<h2 class="sect">${off === 0 ? 'Diese Woche' : off === 1 ? 'Nächste Woche' : 'Übernächste Woche'}</h2>`;
    }
    const weg = slot => ['stefan', 'linda'].filter(p => !isPresent(iso, p, slot));
    const hint = w => w.length === 2
      ? '<span class="sm" style="color:var(--clay)">beide unterwegs</span>'
      : w.length === 1 ? '<span class="sm" style="color:var(--clay)">' + nameOf(w[0]) + ' nicht da</span>' : '';
    const slotBtn = (slot, label) => {
      const e = mealAt(iso, slot);
      return `<button class="slot ${e ? 'filled' : ''}" data-action="meal-slot" data-iso="${iso}" data-slot="${slot}">
        <span class="slotlbl">${label}</span>${e ? esc(mealName(e)) : '<span style="color:var(--muted)">–</span>'}${hint(weg(slot))}
      </button>`;
    };
    html += `<div class="mealday ${iso === today ? 'today' : ''}">
      <div class="d"><span class="w">${WD[(d.getDay() + 6) % 7]}</span><span class="n">${d.getDate()}</span></div>
      <div class="slots">${slotBtn('m', 'Mittag')}${slotBtn('a', 'Abend')}</div>
    </div>`;
  }
  return html;
}

function openPresenceSheet() {
  let rows = '';
  for (let i = 0; i < 7; i++) {
    const d = addDays(new Date(), i);
    const iso = toISO(d);
    const chip = (slot, label) => {
      const on = isPresent(iso, me(), slot);
      return `<button class="chip" data-action="presence-toggle" data-iso="${iso}" data-slot="${slot}"
        style="cursor:pointer;padding:7px 12px;${on ? 'background:var(--olive);color:#fff' : 'background:transparent;border:1px solid var(--line);color:var(--muted);text-decoration:line-through'}">${label}</button>`;
    };
    const pM = isPresent(iso, partner(), 'm'), pA = isPresent(iso, partner(), 'a');
    rows += `<div class="row" style="align-items:center">
      <div class="grow">
        <div class="title" style="font-size:14px">${WD[(d.getDay() + 6) % 7]}, ${d.getDate()}.${d.getMonth() + 1}.</div>
        <div class="meta">${esc(nameOf(partner()))}: Mittag ${pM ? '✓' : '–'} · Abend ${pA ? '✓' : '–'}</div>
      </div>
      ${chip('m', 'Mittag')}
      ${chip('a', 'Abend')}
    </div>`;
  }
  openSheet(`
    <h2>Wann bist du da, ${esc(nameOf(me()))}?</h2>
    <p class="mut">Tippe weg, was bei dir ausfällt – ${esc(nameOf(partner()))} sieht es im Kochplan.</p>
    ${rows}
    <div style="margin-top:12px"><button class="btn full" data-action="close-sheet">Fertig</button></div>
  `);
}

function openMealSheet(iso, slot) {
  slot = slot || 'a';
  const m = mealAt(iso, slot);
  const lbl = slot === 'm' ? 'Mittagessen' : 'Abendessen';
  const recipeRows = DATA.recipes.slice().sort((a, b) => a.name.localeCompare(b.name, 'de')).map(r =>
    `<div class="row" data-action="meal-preview" data-iso="${iso}" data-slot="${slot}" data-rid="${r.id}" data-meal-row data-search="${esc((r.name + ' ' + r.ing.join(' ')).toLowerCase())}">
      <span class="ric">${icon('pot', 18)}</span>
      <div class="grow"><div class="title">${esc(r.name)}</div><div class="meta">${r.ing.length} Zutaten</div></div>
    </div>`).join('');
  openSheet(`
    <h2>${esc(fmtNice(iso))} · ${lbl}</h2>
    ${m ? '<div class="card sand"><b>' + esc(mealName(m)) + '</b> ist eingeplant.</div>' : ''}
    ${m && m.rid ? '<button class="btn full" style="margin-bottom:8px" data-action="meal-shop" data-rid="' + m.rid + '">' + icon('cart', 16) + ' Zutaten auf die Einkaufsliste</button><button class="btn ghost small full" style="margin-bottom:8px" data-action="recipe-detail" data-id="' + m.rid + '">Rezept ansehen (einzelne Zutaten)</button>' : ''}
    ${m ? '<button class="btn ghost small full" style="margin-bottom:14px" data-action="meal-clear" data-iso="' + iso + '" data-slot="' + slot + '">Eintrag entfernen</button>' : ''}
    <button class="btn ghost small full" data-action="meal-roll" data-iso="${iso}" data-slot="${slot}">${icon('dice', 16)} Vorschlag würfeln</button>
    <button class="btn ghost small full" style="margin-top:8px" data-action="ai-recipe-open" data-iso="${iso}" data-slot="${slot}">${icon('spark', 16)} Rezept mit KI erfinden</button>
    <label class="f">Gericht wählen</label>
    <input class="f" id="mealSearch" placeholder="Suchen … (z. B. Pasta, Kürbis, Feta)" autocomplete="off" style="margin-bottom:10px">
    ${recipeRows}
  `);
}

/* KI-Rezept-Vorschlag anzeigen (auch nach Änderungswünschen) */
function showAiRecipeResult(rec) {
  state._aiRecipe = rec;
  openSheet(`<h2>${esc(rec.name)}</h2>
    ${rec.ing.map(i => '<div class="row"><div class="grow"><div class="title" style="font-weight:500">' + esc(i) + '</div><div class="meta">' + esc(guessCat(i)) + '</div></div></div>').join('')}
    ${rec.anleitung ? '<h2 style="font-size:17px;margin:14px 0 8px">Zubereitung</h2><div class="card" style="white-space:pre-wrap;font-size:14.5px;line-height:1.5">' + esc(rec.anleitung) + '</div>' : ''}
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="ai-recipe-save">Speichern</button>
      <button class="btn ghost small full" data-action="ai-recipe-refine">${icon('spark', 14)} Änderungswunsch – KI passt es an</button>
      <div class="frow">
        <button class="btn ghost small" data-action="ai-recipe-go">Anderer Vorschlag</button>
        <button class="btn ghost small" data-action="ai-recipe-edit">Selbst anpassen</button>
      </div>
    </div>`);
}

/* Vorschau eines Gerichts, bevor es in den Kochplan wandert */
function openMealPreviewSheet(iso, slot, rid) {
  const r = DATA.recipes.find(x => x.id === rid);
  if (!r) { openMealSheet(iso, slot); return; }
  const lbl = slot === 'm' ? 'Mittagessen' : 'Abendessen';
  openSheet(`
    <h2>${esc(r.name)}</h2>
    <p class="mut">${esc(fmtNice(iso))} · ${lbl}</p>
    <div class="cathead">Zutaten</div>
    ${r.ing.map(i => '<div class="row"><span class="ric">' + icon('cart', 16) + '</span><div class="grow"><div class="title">' + esc(i) + '</div></div></div>').join('')}
    <div class="cathead">Zubereitung</div>
    ${r.anleitung
      ? '<div class="card" style="white-space:pre-line;font-size:14px;line-height:1.55">' + esc(r.anleitung) + '</div>'
      : '<p class="mut">Noch keine Anleitung hinterlegt – unter Rezepte kann die KI eine schreiben.</p>'}
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="meal-set" data-iso="${iso}" data-slot="${slot}" data-rid="${r.id}">Für ${esc(fmtShort(iso))} auswählen</button>
      <button class="btn ghost full" data-action="meal-back" data-iso="${iso}" data-slot="${slot}">Zurück zur Auswahl</button>
    </div>
  `);
}

function renderShopping() {
  const open = DATA.shopping.filter(i => !i.done);
  const done = DATA.shopping.filter(i => i.done);
  let html = `<div class="addbar"><input class="f" id="shopInput" placeholder="Was brauchen wir?"><button class="btn" data-action="shop-add">${icon('plus', 17)}</button></div>`;
  if (!DATA.shopping.length) html += emptyState('cart', 'Die Liste ist leer.<br>Füge etwas hinzu oder übernimm Zutaten aus dem Kochplan.');
  for (const cat of CATS) {
    const items = open.filter(i => i.cat === cat);
    if (!items.length) continue;
    html += `<div class="cathead">${cat}</div>`;
    for (const i of items) html += shopRow(i);
  }
  if (done.length) {
    html += `<div class="cathead">Im Wagen</div>`;
    for (const i of done) html += shopRow(i);
    html += `<button class="btn ghost small" data-action="shop-clear">Erledigte entfernen</button>`;
  }
  return html;
}
function shopRow(i) {
  return `<div class="row ${i.done ? 'done' : ''}">
    <button class="check ${i.done ? 'on' : ''}" data-action="shop-toggle" data-id="${i.id}">${icon('check', 15)}</button>
    <div class="grow"><div class="title">${esc(i.name)}</div></div>
  </div>`;
}

function renderRecipes() {
  let html = `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
    <button class="btn ghost full" data-action="add-recipe">${icon('plus', 16)} Neues Rezept</button>
    <button class="btn full" data-action="ai-recipe-open">${icon('spark', 16)} Rezept mit KI erfinden</button>
  </div>`;
  html += `<input class="f" id="recipeSearch" placeholder="Rezepte durchsuchen (Name oder Zutat) …" style="margin-bottom:10px" autocomplete="off">`;
  for (const r of DATA.recipes) {
    html += `<div class="row" data-action="recipe-detail" data-id="${r.id}" data-recipe-row data-search="${esc((r.name + ' ' + r.ing.join(' ')).toLowerCase())}">
      <span class="ric">${icon('pot', 18)}</span>
      <div class="grow"><div class="title">${esc(r.name)}</div><div class="meta">${r.ing.length} Zutaten</div></div>
      <span class="chip ghost">ansehen</span>
    </div>`;
  }
  return html;
}
function openRecipeSheet(id) {
  const r = DATA.recipes.find(x => x.id === id);
  if (!r) return;
  openSheet(`
    <h2>${esc(r.name)}</h2>
    <div class="mut" style="margin-bottom:8px">Abwählen, was ihr schon habt – dann übernehmen.</div>
    ${r.ing.map(i => '<div class="row" data-ing-name="' + esc(i) + '"><button class="check on" data-action="ing-toggle">' + icon('check', 13) + '</button><div class="grow" data-action="ing-toggle-row"><div class="title" style="font-weight:500">' + esc(i) + '</div><div class="meta">' + esc(guessCat(i)) + '</div></div></div>').join('')}
    ${r.anleitung
      ? '<h2 style="font-size:17px;margin:16px 0 8px">Zubereitung</h2><div class="card" style="white-space:pre-wrap;font-size:14.5px;line-height:1.5">' + esc(r.anleitung) + '</div>'
      : '<button class="btn ghost small full" style="margin-top:10px" data-action="ai-howto" data-id="' + r.id + '">' + icon('spark', 15) + ' Zubereitung von der KI ergänzen</button>'}
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="recipe-shop" data-id="${r.id}">${icon('cart', 16)} Ausgewählte auf die Einkaufsliste</button>
      <div class="frow">
        <button class="btn ghost small" data-action="edit-recipe" data-id="${r.id}">Bearbeiten</button>
        <button class="btn danger small" data-action="del-recipe" data-id="${r.id}">Löschen</button>
      </div>
    </div>
  `);
}
function openAddRecipeSheet(id, draft) {
  const r = id ? DATA.recipes.find(x => x.id === id) : (draft || null);
  openSheet(`
    <h2>${id ? 'Rezept bearbeiten' : draft ? 'KI-Rezept anpassen' : 'Neues Rezept'}</h2>
    <label class="f">Name</label>
    <input class="f" id="rcName" value="${r ? esc(r.name) : ''}" placeholder="z. B. Lasagne">
    <label class="f">Zutaten (eine pro Zeile)</label>
    <textarea class="f" id="rcIng" placeholder="Lasagneplatten&#10;Hackfleisch&#10;Passierte Tomaten">${r ? esc((r.ing || []).join('\n')) : ''}</textarea>
    <label class="f">Zubereitung (optional – wie macht ihr's?)</label>
    <textarea class="f" id="rcHow" style="min-height:110px" placeholder="1. Ofen vorheizen …&#10;2. …">${r && r.anleitung ? esc(r.anleitung) : ''}</textarea>
    <div style="margin-top:14px"><button class="btn full" data-action="save-recipe" data-id="${id || ''}">Speichern</button></div>
  `);
}

/* ---------- Uns ---------- */
function renderUns() {
  let html = `<div class="pagehead"><div><h1 class="page">Für uns</h1><div class="sub">Mehr als nur Haushalt</div></div></div>`;

  html += `<div class="card olive" data-action="plan-datenight">
    <h3 style="display:flex;align-items:center;gap:8px">${icon('moon', 18)} Date-Night planen</h3>
    <div class="sub">Abend aussuchen, Idee würfeln, Essen einplanen – fertig.</div>
  </div>`;

  const [q1, q2] = dailyCoupleQuestions();
  const mission = currentMission();
  html += `<h2 class="sect">Verbundenheit</h2>
  <div class="card sand">
    <div class="hint" style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--olive);margin-bottom:6px">Gesprächsfragen des Tages</div>
    <div style="font-family:var(--serif);font-style:italic;font-size:16px;line-height:1.45">1. ${esc(q1)}</div>
    <div style="font-family:var(--serif);font-style:italic;font-size:16px;line-height:1.45;margin-top:8px">2. ${esc(q2)}</div>
    <div class="hint" style="margin-top:8px">Beim Abendessen stellen – und wirklich zuhören.</div>
  </div>
  <div class="card" style="border-left:4px solid #B98A3D">
    <div class="hint" style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#B98A3D;margin-bottom:6px">Mission · ${esc(nameOf(mission.wer))} bereitet vor · alle 2 Wochen</div>
    ${mission.wer === me()
      ? '<div style="font-size:15px;line-height:1.45">' + esc(mission.task) + '</div>'
        + '<div class="hint" style="margin-top:8px">Deine geheime Mission – ' + esc(nameOf(partner())) + ' sieht sie nicht. Du hast 2 Wochen Zeit. Pssst.</div>'
        + (!mission.rerolled ? '<button class="btn ghost small full" style="margin-top:10px" data-action="mission-reroll">' + icon('dice', 15) + ' Mission neu würfeln (1×)</button>' : '<div class="hint" style="margin-top:6px">Neu gewürfelt – das ist jetzt deine Mission.</div>')
      : '<div style="font-size:15px;line-height:1.45">' + esc(nameOf(mission.wer)) + ' hat in diesen 2 Wochen eine geheime Mission für dich … lass dich überraschen. 🎁</div>'}
  </div>`;
  const myCi = checkinOf(me()), paCi = checkinOf(partner());
  html += `<div class="card" data-action="checkin-open" style="cursor:pointer">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <h3>Wochen-Check-in</h3>
      <span class="chip ${myCi ? 'stefan' : 'ghost'}">Du ${myCi ? '✓' : '–'}</span>
    </div>
    <div class="sub" style="margin-top:4px">3 kleine Fragen, einmal pro Woche – füreinander. ${paCi ? esc(nameOf(partner())) + ' hat schon ausgefüllt.' : ''}</div>
  </div>`;

  html += `<h2 class="sect">Besondere Tage <span class="more" data-action="add-usdate">hinzufügen</span></h2>`;
  const dates = DATA.us.dates.slice().sort((a, b) => nextOccurrence(a.date) < nextOccurrence(b.date) ? -1 : 1);
  if (dates.length) {
    for (const d of dates) {
      const nxt = nextOccurrence(d.date);
      const days = daysUntil(nxt);
      html += `<div class="row">
        <span class="ric">${icon('star', 18)}</span>
        <div class="grow"><div class="title">${esc(d.title)}</div><div class="meta">${esc(fmtShort(nxt))}</div></div>
        <span class="countdown">${days === 0 ? 'Heute!' : 'in ' + days + ' Tagen'}</span>
        <button class="check" data-action="del-usdate" data-id="${d.id}" style="border-color:#E0C4B8;color:#A54B32">${icon('x', 13)}</button>
      </div>`;
    }
  } else {
    html += `<div class="card"><div class="hint">Jahrestag, Geburtstage, Kennenlerntag … tragt eure wichtigen Tage ein, wir zählen die Tage mit.</div></div>`;
  }

  html += `<h2 class="sect">Date-Ideen <span class="more" data-action="idea-random">überrasch uns</span></h2>
  <div class="addbar"><input class="f" id="ideaInput" placeholder="Neue Idee …"><button class="btn" data-action="idea-add">${icon('plus', 17)}</button></div>
  <button class="btn ghost small full" style="margin-bottom:10px" data-action="ai-ideas-open">${icon('spark', 15)} Ideen von der KI holen</button>`;
  DATA.us.ideas.forEach((idea, i) => {
    html += `<div class="row"><span class="ric">${icon('bulb', 18)}</span><div class="grow"><div class="title" style="font-weight:500">${esc(idea)}</div></div>
      <button class="check" data-action="idea-del" data-i="${i}" style="border-color:#E0C4B8;color:#A54B32">${icon('x', 13)}</button></div>`;
  });

  html += `<h2 class="sect">Das müssen wir mal machen</h2>
  <div class="addbar"><input class="f" id="bucketInput" placeholder="Ab auf die Liste …"><button class="btn" data-action="bucket-add">${icon('plus', 17)}</button></div>`;
  DATA.us.bucket.forEach((b, i) => {
    html += `<div class="row"><span class="ric">${icon('spark', 18)}</span><div class="grow"><div class="title" style="font-weight:500">${esc(b)}</div></div>
      <button class="check" data-action="bucket-del" data-i="${i}" style="border-color:#E0C4B8;color:#A54B32">${icon('x', 13)}</button></div>`;
  });
  return html;
}
function openCheckinSheet() {
  const mi = checkinOf(me()) || { schoen: '', schwer: '', wunsch: '' };
  const pa = checkinOf(partner());
  const paBlock = pa
    ? `<div class="card sand" style="margin-bottom:12px">
        <div class="hint" style="font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:11px;margin-bottom:6px">${esc(nameOf(partner()))}s Woche</div>
        ${pa.schoen ? '<div style="margin-bottom:6px"><b>Schön war:</b> ' + esc(pa.schoen) + '</div>' : ''}
        ${pa.schwer ? '<div style="margin-bottom:6px"><b>Schwierig war:</b> ' + esc(pa.schwer) + '</div>' : ''}
        ${pa.wunsch ? '<div><b>Wünscht sich:</b> ' + esc(pa.wunsch) + '</div>' : ''}
      </div>`
    : `<div class="mut" style="margin-bottom:10px">${esc(nameOf(partner()))} hat diese Woche noch nicht ausgefüllt.</div>`;
  openSheet(`
    <h2>Wochen-Check-in</h2>
    ${paBlock}
    <label class="f">Was war diese Woche schön?</label>
    <textarea class="f" id="ciSchoen" style="min-height:64px">${esc(mi.schoen)}</textarea>
    <label class="f">Was war schwierig?</label>
    <textarea class="f" id="ciSchwer" style="min-height:64px">${esc(mi.schwer)}</textarea>
    <label class="f">Was wünschst du dir für nächste Woche?</label>
    <textarea class="f" id="ciWunsch" style="min-height:64px">${esc(mi.wunsch)}</textarea>
    <div style="margin-top:14px"><button class="btn full" data-action="checkin-save">Speichern</button></div>
  `);
}

function nextOccurrence(iso) {
  const t = fromISO(todayISO());
  let d = fromISO(iso);
  d.setFullYear(t.getFullYear());
  if (d < t) d.setFullYear(t.getFullYear() + 1);
  return toISO(d);
}
function nextFriday() {
  const n = new Date();
  const diff = (4 - ((n.getDay() + 6) % 7) + 7) % 7 || 7;
  return toISO(addDays(n, diff));
}
function openDateNightSheet(preIdx) {
  const ideas = DATA.us.ideas.map((x, i) => '<option value="' + i + '"' + (i === preIdx ? ' selected' : '') + '>' + esc(x) + '</option>').join('');
  openSheet(`
    <h2>Date-Night planen</h2>
    <div class="frow">
      <div><label class="f">Datum</label><input class="f" id="dnDate" type="date" value="${nextFriday()}"></div>
      <div><label class="f">Uhrzeit</label><input class="f" id="dnTime" type="time" value="19:30"></div>
    </div>
    <label class="f">Programm</label>
    <select class="f" id="dnIdea"><option value="-1">Einfach Zeit zu zweit</option>${ideas}</select>
    <div class="mut" style="margin-top:8px">Tipp: Handys weg, Kerzen an.</div>
    <div style="margin-top:14px"><button class="btn full" data-action="save-datenight">In den Kalender</button></div>
  `);
}

/* ---------- Chat (WhatsApp-Stil) ---------- */
function msgTime(m) {
  if (m.at) {
    const d = new Date(m.at);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  return m.ts || '';
}
function msgDay(m) { return m.at ? toISO(new Date(m.at)) : null; }

/* ---------- Training ---------- */
function renderTraining() {
  const mon = toISO(startOfWeek(new Date()));
  let html = `<div class="pagehead"><div><h1 class="page">Training</h1><div class="sub">Stark werden – allein und zu zweit</div></div></div>
  <div class="seg">
    <button class="${state.training === 'woche' ? 'active' : ''}" data-action="trseg" data-v="woche">Meine Woche</button>
    <button class="${state.training === 'workouts' ? 'active' : ''}" data-action="trseg" data-v="workouts">Workouts</button>
    <button class="${state.training === 'zusammen' ? 'active' : ''}" data-action="trseg" data-v="zusammen">Zusammen</button>
  </div>`;
  if (state.training === 'workouts') html += renderWorkoutLib();
  else if (state.training === 'zusammen') html += renderTrainingTogether(mon);
  else html += renderTrainingWeek(mon);
  return html;
}

const GOAL_LABEL = { staerker: 'Stärker werden', masse: 'Muskeln aufbauen', ausdauer: 'Ausdauer verbessern', beweglich: 'Beweglicher werden', fit: 'Rundum fit' };

function renderTrainingWeek(mon) {
  const plan = trainingState().plans[me()];
  if (!plan) {
    return `<div class="card" style="text-align:center;padding:26px 18px">
      ${icon('hantel', 34)}
      <p style="margin:10px 0 4px"><b>Noch kein Trainingsplan</b></p>
      <p class="mut">Sag mir dein Ziel und wie oft du Zeit hast – ich plane deine Wochen automatisch um euren Kalender herum.</p>
      <button class="btn full" style="margin-top:12px" data-action="training-wizard">${icon('spark', 16)} Meinen Plan erstellen</button>
    </div>
    <p class="hint" style="margin-top:10px">Einzelne Workouts findest du jederzeit unter „Workouts“ – auch ohne Plan.</p>`;
  }
  if (reflowTrainingWeek(me(), mon)) toast('Training wegen Terminen umgeplant');
  const entries = trainingWeekEntries(me(), mon) || scheduleTrainingWeek(me(), mon);
  const t = todayISO();
  const wk = Math.max(1, Math.floor((new Date(t) - new Date(plan.startISO)) / (7 * 864e5)) + 1);
  let html = `<div class="card sand" style="margin-bottom:12px">
    <b>${esc(planGoals(plan).map(g => GOAL_LABEL[g] || g).join(' + ') || 'Mein Plan')}</b> · Woche ${wk} · zuletzt ${plan.freq}× pro Woche
    <div class="hint" style="margin-top:6px">${esc(plan.progression)}</div>
  </div>`;
  // Wochen-Check-in: einmal pro Woche kurz bestätigen oder anpassen
  const prefs = trainingWeekPrefs(me(), mon);
  if (!prefs) {
    html += `<div class="card" style="margin-bottom:12px;border-left:4px solid var(--olive)">
      <b>Neue Woche – passt dein Pensum?</b>
      <div class="hint" style="margin:4px 0 10px">Geplant sind ${plan.freq} Einheiten. Wenn diese Woche mehr oder weniger drin ist (oder andere Orte), sag es kurz – deine Ziele bleiben im Blick.</div>
      <div style="display:flex;gap:8px">
        <button class="btn small" style="flex:1" data-action="training-week-ok">Passt so ✓</button>
        <button class="btn ghost small" style="flex:1" data-action="training-week-adjust">Diese Woche anpassen</button>
      </div>
    </div>`;
  }
  // Rückblick auf die Vorwoche + Ausblick auf die kommende
  const stats = trainingLastWeekStats(me(), mon);
  const nextMon = toISO(addDays(new Date(mon + 'T12:00'), 7));
  const nextFree = trainingFreeEvenings(me(), nextMon);
  const analyse = [];
  if (stats) {
    const q = stats.done / stats.total;
    if (q >= 1) analyse.push('Letzte Woche alle ' + stats.total + ' Einheiten geschafft – weiter so!');
    else if (q > 0.5) analyse.push('Letzte Woche ' + stats.done + ' von ' + stats.total + ' geschafft – solide.');
    else analyse.push('Letzte Woche wurden es ' + stats.done + ' von ' + stats.total + ' – diese Woche plane ich eine Einheit weniger, dranbleiben zählt mehr als Volumen.');
    if (stats.extras) analyse.push('Plus ' + stats.extras + ' extra – stark!');
    if (stats.missedIntervall) analyse.push('Die verpasste Intervalleinheit habe ich nach vorn gelegt.');
  }
  if (wk > 1 && wk % 4 === 0 && planGoals(plan).some(g => g === 'staerker' || g === 'masse' || g === 'ausdauer')) {
    analyse.push('Woche ' + wk + ' ist deine Deload-Woche: gleiche Einheiten, aber nur ~70 % vom Gewicht bzw. Umfang – so verarbeitet der Körper den Fortschritt.');
  }
  if (nextFree < plan.freq) analyse.push('Ausblick: Nächste Woche wird eng (' + nextFree + ' freie Abende für ' + plan.freq + ' Einheiten) – ich plane dann automatisch um.');
  if (analyse.length) html += `<div class="card" style="margin-bottom:12px;font-size:13px;line-height:1.5">${icon('spark', 14)} ${esc(analyse.join(' '))}</div>`;
  for (const e of entries) {
    const iso = toISO(addDays(new Date(mon + 'T12:00'), e.day));
    const isToday = iso === t;
    const past = iso < t && !e.done;
    const zus = trainingTogetherOn(me(), mon, e.day, e.cat);
    const zusText = zus === 'gym' ? 'mit ' + nameOf(partner()) + ' zusammen im Gym' : zus === 'cardio' ? 'zusammen mit ' + nameOf(partner()) : zus === 'paar' ? 'zu zweit mit ' + nameOf(partner()) : '';
    html += `<div class="row ${e.done ? 'done' : ''}" style="${isToday ? 'border-left:3px solid var(--olive);' : ''}">
      <button class="check ${e.done ? 'on' : ''}" data-action="training-done" data-mon="${mon}" data-day="${e.day}">${icon('check', 15)}</button>
      <div class="grow" data-action="training-open" data-cat="${e.cat}" data-mon="${mon}" data-day="${e.day}">
        <div class="title">${esc(e.title)}${zusText ? ' <span style="color:#BC6A4A">♥</span>' : ''}</div>
        <div class="meta">${WD[e.day]} ${isToday ? '· heute' : ''}${e.time ? ' · ' + esc(e.time) + ' Uhr' : ''} · ~${e.minutes} Min.${zusText ? ' · <b>' + zusText + '</b>' : ''}${e.moved ? ' · wegen Termin verschoben' : ''}${past ? ' · verpasst – einfach nachholen' : ''}</div>
      </div>
      <span class="more" data-action="training-move" data-mon="${mon}" data-day="${e.day}">schieben</span>
    </div>`;
  }
  html += `<button class="btn small full" style="margin-top:14px" data-action="training-week-adjust">${icon('pen', 14)} Diese Woche ändern: Wie oft &amp; wo (Gym, zuhause, Rad …)</button>
  <div style="display:flex;gap:8px;margin-top:8px">
    <button class="btn ghost small" style="flex:1" data-action="training-extra">${icon('plus', 14)} Extra-Einheit</button>
    <button class="btn ghost small" style="flex:1" data-action="training-log-past">Nachtragen</button>
  </div>
  <div style="display:flex;gap:8px;margin-top:8px">
    <button class="btn ghost small" style="flex:1" data-action="training-wizard">Langfrist-Plan anpassen</button>
    <button class="btn ghost small" style="flex:1" data-action="training-replan">Woche neu legen</button>
  </div>`;
  return html;
}

function renderWorkoutLib() {
  const cats = [
    ['Für zuhause', [['home-ganzkoerper', 'Ganzkörper'], ['home-bauch', 'Bauch'], ['home-beine', 'Beine & Po'], ['home-arme', 'Arme & Schultern'], ['home-stretch', 'Stretching'], ['home-yoga', 'Yoga']]],
    ['Zu zweit', [['paar-zirkel20', 'Partner-Zirkel'], ['paar-sync20', 'Synchron-Workout'], ['paar-kraft30', 'Partner-Kraft'], ['paar-spass30', 'Cardio & Spaß']]],
    ['Im Gym', [['gym-ganzkoerper', 'Ganzkörper A'], ['gym-ganzkoerper-b', 'Ganzkörper B'], ['gym-oberkoerper', 'Oberkörper'], ['gym-unterkoerper', 'Unterkörper'], ['gym-beinepo', 'Beine & Po'], ['gym-push', 'Push'], ['gym-pull', 'Pull'], ['gym-brust', 'Brust & Trizeps'], ['gym-ruecken', 'Rücken & Bizeps'], ['gym-schulternarme', 'Schultern & Arme'], ['gym-bauch', 'Bauch & Core'], ['gym-ausdauer', 'Ausdauer'], ['gym-sprungkraft', 'Sprungkraft']]],
    ['Ausdauer draußen', [['cardio-joggen', 'Zone-2-Lauf'], ['cardio-joggen-intervall', 'Intervall-Lauf 4×4'], ['cardio-joggen-lang', 'Langer Lauf'], ['cardio-radfahren', 'Radfahren'], ['cardio-rad-intervall', 'Rad-Intervalle'], ['cardio-schwimmen', 'Schwimmen'], ['cardio-schwimmen-intervall', 'Schwimm-Intervalle']]],
  ];
  let html = '';
  for (const [label, list] of cats) {
    html += `<h2 class="sect">${label}</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">`;
    for (const [cat, name] of list) {
      html += `<div class="card" data-action="training-open" data-cat="${cat}" style="padding:14px"><div class="lbl" style="font-weight:700;color:var(--ink)">${name}</div><div class="hint">${workoutByCat(cat).minutes} Min.</div></div>`;
    }
    html += '</div>';
  }
  const own = (trainingState().myWorkouts && trainingState().myWorkouts[me()]) || [];
  html += `<h2 class="sect">Eigene Workouts</h2>`;
  if (own.length) {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">`;
    for (const w of own) {
      html += `<div class="card" data-action="training-open" data-cat="mein-${w.id}" style="padding:14px"><div class="lbl" style="font-weight:700;color:var(--ink)">${esc(w.name)}</div><div class="hint">${w.minutes} Min. · von dir</div></div>`;
    }
    html += '</div>';
  }
  html += `<button class="btn ghost small full" data-action="ai-workout-open">${icon('spark', 15)} Neues Workout mit KI erstellen</button>`;
  return html;
}

function renderTrainingTogether(mon) {
  const ts = trainingState();
  const mine = ts.plans[me()] ? (trainingWeekEntries(me(), mon) || scheduleTrainingWeek(me(), mon)) : null;
  const theirs = ts.plans[partner()] ? (trainingWeekEntries(partner(), mon) || scheduleTrainingWeek(partner(), mon)) : null;
  let html = '';
  // Euer Sportkalender: beide Wochen auf einen Blick (steht bewusst nicht im Haupt-Kalender)
  html += `<h2 class="sect">Euer Sportkalender</h2>`;
  const t0 = todayISO();
  let anyCal = false;
  let calHtml = '';
  for (let d = 0; d < 7; d++) {
    const iso = toISO(addDays(new Date(mon + 'T12:00'), d));
    const rows = [];
    for (const [person, entries] of [[me(), mine], [partner(), theirs]]) {
      for (const e of entries || []) {
        if (e.day !== d) continue;
        const zus = trainingTogetherOn(person, mon, d, e.cat);
        rows.push(`<div style="display:flex;align-items:center;gap:8px;font-size:13.5px;padding:2px 0">
          <span class="dot ${person}"></span>
          <span style="${e.done ? 'text-decoration:line-through;opacity:0.55' : ''}">${esc(nameOf(person))}: ${esc(e.title)}${e.time ? ' · ' + esc(e.time) : ''}</span>
          ${e.done ? '<span style="color:var(--olive)">✓</span>' : ''}${zus ? ' <span style="color:#BC6A4A">♥</span>' : ''}
        </div>`);
      }
    }
    if (!rows.length) continue;
    anyCal = true;
    calHtml += `<div style="padding:8px 0;border-bottom:1px solid var(--line)">
      <div style="font-weight:700;font-size:13px;${iso === t0 ? 'color:var(--olive)' : ''}">${fmtShort(iso)}${iso === t0 ? ' · heute' : ''}</div>
      ${rows.join('')}
    </div>`;
  }
  html += anyCal
    ? `<div class="card" style="margin-bottom:14px;padding:6px 16px">${calHtml}</div>`
    : `<div class="card" style="margin-bottom:14px"><p class="mut">Diese Woche sind noch keine Einheiten geplant.</p></div>`;
  if (!mine || !theirs) {
    html += `<div class="card"><p class="mut">${!mine ? 'Du hast' : esc(nameOf(partner())) + ' hat'} noch keinen Trainingsplan – sobald ihr beide einen habt, suche ich hier jede Woche eure gemeinsamen Trainingsmomente.</p></div>`;
  } else {
    const t = todayISO();
    const suggestions = [];
    const famOf = e => workoutFamily(e.cat);
    // 1) Gleiche Trainingsart in dieser Woche? Freien gemeinsamen Abend suchen
    for (const m of mine) {
      if (m.done) continue;
      const match = theirs.find(x => !x.done && famOf(x) === famOf(m));
      if (!match) continue;
      let bestDay = null;
      for (let d = 0; d < 7; d++) {
        const iso = toISO(addDays(new Date(mon + 'T12:00'), d));
        if (iso < t) continue;
        if (trainingEveningBusy(iso, me()) || trainingEveningBusy(iso, partner())) continue;
        bestDay = d; break;
      }
      if (bestDay !== null) {
        suggestions.push({ fam: famOf(m), day: bestDay, title: famOf(m) === 'paar' ? m.title : 'Gemeinsam: ' + m.title, cat: m.cat });
      }
      if (suggestions.length >= 2) break;
    }
    // Tage, an denen beide trainieren – automatisch zusammengelegt von der Wochenplanung
    const sameDays = [];
    for (let d = 0; d < 7; d++) {
      const m = mine.find(e => e.day === d), th = theirs.find(e => e.day === d);
      if (m && th) sameDays.push({ d, m, th });
    }
    if (sameDays.length) {
      html += `<h2 class="sect">Eure gemeinsamen Trainingstage</h2>`;
      for (const s of sameDays) {
        const iso = toISO(addDays(new Date(mon + 'T12:00'), s.d));
        const beideGym = s.m.cat.startsWith('gym') && s.th.cat.startsWith('gym');
        const zeile = beideGym ? 'Ihr könnt zusammen ins Gym fahren.' : 'Verschiedenes Training – aber zur gleichen Zeit.';
        html += `<div class="card" style="margin-bottom:8px">
          <b>${WD[s.d]}</b> · Du: ${esc(s.m.title)} · ${esc(nameOf(partner()))}: ${esc(s.th.title)}
          <div class="hint" style="margin:4px 0 10px">${zeile}</div>
          ${iso >= t ? '<button class="btn ghost small full" data-action="training-together" data-iso="' + iso + '" data-title="Gemeinsame Trainingszeit" data-cat="' + s.m.cat + '">' + icon('cal', 14) + ' Am ' + WD[s.d] + ' als festen Termin eintragen</button>' : ''}
        </div>`;
      }
    }
    if (suggestions.length) {
      html += `<h2 class="sect">Diese Woche zusammen?</h2>`;
      for (const s of suggestions) {
        const iso = toISO(addDays(new Date(mon + 'T12:00'), s.day));
        html += `<div class="card" style="margin-bottom:8px">
          <b>${esc(s.title)}</b>
          <div class="hint" style="margin:4px 0 10px">Ihr habt beide ${s.fam === 'paar' ? 'ein Paar-Workout' : s.fam + '-Training'} auf dem Plan – am ${WD[s.day]} (${fmtShort(iso)}) habt ihr laut Kalender beide abends frei.</div>
          <button class="btn small full" data-action="training-together" data-iso="${iso}" data-title="${esc(s.title)}" data-cat="${s.cat}">${icon('cal', 15)} Am ${WD[s.day]} gemeinsam eintragen</button>
        </div>`;
      }
    } else {
      html += `<div class="card"><p class="mut">Diese Woche habe ich keine passende Überschneidung gefunden – schnappt euch unten einfach spontan ein Paar-Workout.</p></div>`;
    }
  }
  html += `<h2 class="sect">Paar-Workouts</h2>`;
  for (const p of PAAR_WORKOUTS) {
    html += `<div class="row" data-action="training-open" data-cat="paar-${p.id}">
      <span class="ric">${icon('heart', 18)}</span>
      <div class="grow"><div class="title">${esc(p.name)}</div><div class="meta">~${p.minutes} Min. zu zweit</div></div>
    </div>`;
  }
  return html;
}

function openWorkoutSheet(cat, mon, day) {
  const plan = trainingState().plans[me()];
  const gymGoal = plan && cat.startsWith('gym') ? primaryGymGoal(plan) : null;
  const w = adaptWorkoutToGoal(cat, gymGoal, me());
  if (!w) return;
  const note = gymGoal && GOAL_NOTES[gymGoal] ? GOAL_NOTES[gymGoal] : '';
  openSheet(`
    <h2>${esc(w.name)}</h2>
    <p class="mut">~${w.minutes} Min. · ${esc(w.rounds)}</p>
    ${note ? '<div class="card sand" style="margin-bottom:10px;font-size:13px">' + esc(note) + '</div>' : ''}
    ${(plan && plan.limits ? plan.limits : []).filter(l => LIMIT_HINTS[l] && LIMIT_HINTS[l].match(cat)).map(l => '<div class="card" style="margin-bottom:10px;font-size:13px;border-left:4px solid #A54B32">' + esc(LIMIT_HINTS[l].text) + '</div>').join('')}
    ${cat.startsWith('gym') && cat !== 'gym-ausdauer' ? '<div class="hint" style="margin-bottom:10px">Aufwärmen: 5 Min. locker (Rad/Rudern) + 1–2 leichte Aufwärmsätze der ersten Übung.</div>' : ''}
    ${w.ex.map(([n, v]) => {
      const prog = cat.startsWith('gym') ? nextProgression(me(), n, v) : null;
      return '<div class="row" data-action="exercise-open" data-name="' + esc(n) + '" data-cat="' + cat + '"' + (mon !== undefined ? ' data-mon="' + mon + '" data-day="' + day + '"' : '') + '><span class="ric">' + icon('hantel', 16) + '</span><div class="grow"><div class="title">' + esc(n) + '</div>' + (prog ? '<div class="meta" style="color:var(--olive-deep);font-weight:700">heute: ' + prog.w + ' kg × ' + prog.r + '</div>' : '') + '</div><span class="meta">' + esc(v) + '</span></div>';
    }).join('')}
    <p class="hint" style="margin-top:6px">Übung antippen: Erklärung${cat.startsWith('gym') ? ' + Gewichts-Tagebuch' : ''}.</p>
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
      ${mon !== undefined && day !== undefined ? '<button class="btn full" data-action="training-done-sheet" data-mon="' + mon + '" data-day="' + day + '">' + icon('check', 16) + ' Geschafft – abhaken</button>' : ''}
      <button class="btn ghost small full" data-action="training-to-cal" data-cat="${cat}" data-title="${esc(w.name)}">${icon('cal', 15)} Als Termin in den Kalender</button>
      <button class="btn ghost small full" data-action="workout-edit" data-cat="${cat}">${icon('pen', 14)} Übungen anpassen${w.custom ? ' (angepasst)' : ''}</button>
    </div>
  `);
}

/* Übungs-Detail: Erklärung, Video-Link und (im Gym) Gewichts-Tagebuch */
function exerciseInfo(name) {
  if (typeof UEBUNGEN === 'undefined') return '';
  if (UEBUNGEN[name]) return UEBUNGEN[name];
  const key = Object.keys(UEBUNGEN).find(k => name.includes(k) || k.includes(name));
  return key ? UEBUNGEN[key] : '';
}
function openExerciseSheet(name, cat, mon, day) {
  const info = exerciseInfo(name);
  const isGym = cat && cat.startsWith('gym');
  const ts = trainingState();
  if (!ts.log) ts.log = {};
  if (!ts.log[me()]) ts.log[me()] = {};
  const hist = (ts.log[me()][name] || []).slice(-3).reverse();
  const wk = cat ? workoutByCat(cat, me()) : null;
  const vol = wk ? ((wk.ex.find(x => x[0] === name) || [])[1] || '') : '';
  const prog = isGym ? nextProgression(me(), name, vol) : null;
  const back = `data-action="training-open" data-cat="${cat}"` + (mon !== undefined && mon !== '' ? ` data-mon="${mon}" data-day="${day}"` : '');
  openSheet(`
    <h2>${esc(name)}</h2>
    ${info ? '<div class="card" style="font-size:14px;line-height:1.55">' + esc(info) + '</div>' : '<p class="mut">Für diesen Punkt gibt es keine eigene Erklärung – einfach locker nach Gefühl.</p>'}
    <a class="btn ghost small full" style="margin-top:10px;text-align:center;text-decoration:none;display:block" href="https://www.youtube.com/results?search_query=${encodeURIComponent(name.replace(/\(.*\)/, '').trim() + ' Übung Ausführung')}" target="_blank" rel="noopener">▶ Video zur Ausführung ansehen</a>
    ${isGym ? `
      <div class="cathead" style="margin-top:14px">Dein Tagebuch</div>
      ${prog ? '<div class="card sand" style="font-size:14px"><b>Heute dran: ' + prog.w + ' kg × ' + prog.r + '</b><div class="hint" style="margin-top:3px">' + esc(prog.grund) + '</div></div>' : ''}
      ${hist.length ? hist.map(h => '<div class="row"><div class="grow"><div class="title">' + h.w + ' kg × ' + h.r + '</div><div class="meta">' + esc(fmtShort(h.d)) + '</div></div></div>').join('') : '<p class="mut">Noch kein Eintrag – trag nach dem ersten Satz dein Gewicht ein, dann rechnet die App ab dem nächsten Mal deine Steigerung aus.</p>'}
      <div class="frow" style="margin-top:8px">
        <div><label class="f">Gewicht (kg)</label><input class="f" id="exLogW" type="number" inputmode="decimal" step="0.5" value="${prog ? prog.w : hist[0] ? hist[0].w : ''}"></div>
        <div><label class="f">Wiederholungen</label><input class="f" id="exLogR" type="number" inputmode="numeric" value="${prog ? prog.r : hist[0] ? hist[0].r : ''}"></div>
      </div>
      <button class="btn full" style="margin-top:10px" data-action="exercise-log" data-name="${esc(name)}" data-cat="${cat}" data-mon="${mon !== undefined ? mon : ''}" data-day="${day !== undefined ? day : ''}">Eintragen</button>
    ` : ''}
    <button class="btn ghost small full" style="margin-top:10px" ${back}>Zurück zum Workout</button>
  `);
}

/* Spontan mehr oder weniger: Einheit dazunehmen oder nachtragen */
function openTrainingExtraSheet(mode) {
  const groups = [
    ['Zuhause', ['home-ganzkoerper', 'home-bauch', 'home-beine', 'home-arme', 'home-stretch', 'home-yoga']],
    ['Gym', ['gym-ganzkoerper', 'gym-oberkoerper', 'gym-unterkoerper', 'gym-push', 'gym-pull', 'gym-bauch', 'gym-ausdauer', 'gym-sprungkraft']],
    ['Ausdauer', ['cardio-joggen', 'cardio-radfahren', 'cardio-schwimmen']],
    ['Zu zweit', ['paar-zirkel20', 'paar-sync20', 'paar-kraft30', 'paar-spass30']],
  ];
  let rows = '';
  for (const [label, cats] of groups) {
    rows += `<div class="cathead">${label}</div>`;
    for (const cat of cats) {
      const w = workoutByCat(cat);
      rows += `<div class="row" data-action="training-extra-pick" data-cat="${cat}" data-mode="${mode}"><span class="ric">${icon('hantel', 16)}</span><div class="grow"><div class="title">${esc(w.name)}</div><div class="meta">~${w.minutes} Min.</div></div></div>`;
    }
  }
  openSheet(`
    <h2>${mode === 'done' ? 'Was hast du gemacht?' : 'Extra-Einheit diese Woche'}</h2>
    <p class="mut">${mode === 'done' ? 'Wird als erledigt in deine Woche eingetragen.' : 'Ich lege sie auf einen freien Tag – verschieben geht immer.'}</p>
    ${rows}
  `);
}

function openTrainingWizard() {
  const plan = trainingState().plans[me()] || {};
  const el = (v, cur) => v === cur ? 'selected' : '';
  const chk = v => (plan.elements || []).includes(v) ? 'checked' : '';
  const gchk = v => planGoals(plan).includes(v) ? 'checked' : '';
  openSheet(`
    <h2>Dein Trainingsplan</h2>
    <label class="f">Was sind deine Ziele? (mehrere möglich)</label>
    <div class="card" style="display:flex;flex-direction:column;gap:10px;font-size:14px">
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tgFit" ${gchk('fit')}> Rundum fit werden</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tgStaerker" ${gchk('staerker')}> Stärker werden (Kraft)</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tgMasse" ${gchk('masse')}> Muskeln aufbauen</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tgAusdauer" ${gchk('ausdauer')}> Ausdauer verbessern</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tgBeweglich" ${gchk('beweglich')}> Beweglicher werden</label>
    </div>
    <label class="f">Konkretes Wunschziel? (optional, hilft der KI)</label>
    <input class="f" id="twZiel" value="${esc(plan.zielText || '')}" placeholder="z. B. 100 kg Bankdrücken, 10 km am Stück laufen">
    <label class="f">Wie viel Trainingserfahrung hast du?</label>
    <select class="f" id="twLevel">
      <option value="anfaenger" ${el('anfaenger', plan.level)}>Wenig – ich fange (wieder) an</option>
      <option value="fortgeschritten" ${!plan.level || plan.level === 'fortgeschritten' ? 'selected' : ''}>Etwas – ich trainiere ab und zu</option>
      <option value="profi" ${el('profi', plan.level)}>Viel – ich trainiere regelmäßig</option>
    </select>
    <label class="f">Gibt es Zonen, die extra Aufmerksamkeit kriegen sollen?</label>
    <div class="card" style="display:flex;flex-direction:column;gap:10px;font-size:14px">
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tfPobeine" ${(plan.fokus || []).includes('pobeine') ? 'checked' : ''}> Po & Beine</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tfBauch" ${(plan.fokus || []).includes('bauch') ? 'checked' : ''}> Bauch & Core</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tfRuecken" ${(plan.fokus || []).includes('ruecken') ? 'checked' : ''}> Rücken</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tfArme" ${(plan.fokus || []).includes('arme') ? 'checked' : ''}> Arme & Schultern</label>
    </div>
    <label class="f">Worauf muss ich Rücksicht nehmen?</label>
    <div class="card" style="display:flex;flex-direction:column;gap:10px;font-size:14px">
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tlKnie" ${(plan.limits || []).includes('knie') ? 'checked' : ''}> Knie</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tlRuecken" ${(plan.limits || []).includes('ruecken') ? 'checked' : ''}> Rücken</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="tlSchulter" ${(plan.limits || []).includes('schulter') ? 'checked' : ''}> Schulter</label>
    </div>
    <p class="hint" style="margin-top:8px">Wie oft und wo du trainierst, fragst du nicht hier ein für alle Mal ab – das klärt der Wochen-Check-in jede Woche neu. Der Plan merkt sich, was bei dir üblich ist.</p>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="training-create">${icon('spark', 16)} Plan erstellen</button>
      ${trainingState().plans[me()] ? '<button class="btn danger small full" data-action="training-delete">Plan löschen</button>' : ''}
    </div>
  `);
}

function openTrainingMoveSheet(mon, day) {
  const entries = trainingWeekEntries(me(), mon) || [];
  const e = entries.find(x => x.day === Number(day));
  if (!e) return;
  const t = todayISO();
  const opts = [];
  for (let d = 0; d < 7; d++) {
    if (d === e.day) continue;
    const iso = toISO(addDays(new Date(mon + 'T12:00'), d));
    if (iso < t) continue;
    const taken = entries.some(x => x.day === d);
    const busy = trainingEveningBusy(iso, me());
    opts.push(`<button class="btn ghost small full" style="margin-bottom:8px" data-action="training-move-to" data-mon="${mon}" data-from="${e.day}" data-to="${d}">
      ${WD[d]} (${fmtShort(iso)})${busy ? ' · abends Termin' : ''}${taken ? ' · schon eine Einheit' : ''}
    </button>`);
  }
  openSheet(`
    <h2>„${esc(e.title)}“ anpassen</h2>
    <label class="f">Uhrzeit (steht dann im Kalender)</label>
    <div style="display:flex;gap:8px;margin-bottom:14px">
      <input class="f" type="time" id="tmTime" value="${esc(e.time || '')}" style="flex:1;margin:0">
      <button class="btn small" data-action="training-set-time" data-mon="${mon}" data-day="${e.day}">Speichern</button>
    </div>
    <label class="f">Oder auf einen anderen Tag</label>
    ${opts.join('') || '<p class="mut">Diese Woche ist kein Tag mehr frei.</p>'}
    <button class="btn danger small full" data-action="training-skip" data-mon="${mon}" data-day="${e.day}">Diese Woche ausfallen lassen</button>
  `);
}

/* Wochen-Check-in: Pensum und Orte nur für diese Woche */
function openTrainingWeekSheet() {
  const plan = trainingState().plans[me()];
  if (!plan) return;
  const mon = toISO(startOfWeek(new Date()));
  const prefs = trainingWeekPrefs(me(), mon) || {};
  const els = prefs.elements || plan.elements || [];
  const chk = v => els.includes(v) ? 'checked' : '';
  openSheet(`
    <h2>Diese Woche</h2>
    <p class="mut">Dein Langfrist-Plan bleibt – hier stellst du nur diese Woche ein.</p>
    <label class="f">Wie oft schaffst du es?</label>
    <select class="f" id="wpFreq">${[1, 2, 3, 4, 5, 6, 7].map(n => '<option value="' + n + '" ' + ((prefs.freq || plan.freq) === n ? 'selected' : '') + '>' + n + '×</option>').join('')}</select>
    <label class="f">Wo kannst du trainieren?</label>
    <div class="card" style="display:flex;flex-direction:column;gap:10px;font-size:14px">
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpHome" ${chk('home')}> Zuhause</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpGym" ${chk('gym')}> Fitnessstudio</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpPaar" ${chk('paar')}> Paar-Workout</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpJoggen" ${chk('joggen')}> Joggen</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpRad" ${chk('radfahren')}> Radfahren</label>
      <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="wpSchwimmen" ${chk('schwimmen')}> Schwimmen</label>
    </div>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="training-week-apply">Woche so planen</button>
      <button class="btn ghost full" data-action="training-week-ai">${icon('spark', 15)} Von der KI planen lassen</button>
    </div>
  `);
}
function readWeekPrefsForm() {
  const elements = [];
  if (document.getElementById('wpHome').checked) elements.push('home');
  if (document.getElementById('wpGym').checked) elements.push('gym');
  if (document.getElementById('wpPaar').checked) elements.push('paar');
  if (document.getElementById('wpJoggen').checked) elements.push('joggen');
  if (document.getElementById('wpRad').checked) elements.push('radfahren');
  if (document.getElementById('wpSchwimmen').checked) elements.push('schwimmen');
  return { freq: Number(document.getElementById('wpFreq').value), elements };
}
function applyWeekPrefs(prefs) {
  const ts = trainingState();
  const mon = toISO(startOfWeek(new Date()));
  ts.weekPrefs[mon + ':' + me()] = prefs;
  // Der Plan merkt sich dein übliches Pensum als Startwert für kommende Wochen
  const plan = ts.plans[me()];
  if (plan && prefs.freq) {
    plan.freq = prefs.freq;
    if (prefs.elements && prefs.elements.length) plan.elements = prefs.elements;
    const gen = buildTrainingPlan({ goals: planGoals(plan), freq: plan.freq, elements: plan.elements, level: plan.level, fokus: plan.fokus });
    plan.weekly = gen.weekly;
  }
  delete ts.week[mon + ':' + me()];
  scheduleTrainingWeek(me(), mon);
  save(); closeSheet(); state.training = 'woche'; render();
}

/* Übungsliste eines Workouts selbst anpassen */
function openWorkoutEditSheet(cat) {
  const w = workoutByCat(cat, me());
  if (!w) return;
  openSheet(`
    <h2>${esc(w.name)} anpassen</h2>
    <p class="mut">Eine Übung pro Zeile, Format: <b>Übung – Umfang</b> (z. B. „Bankdrücken – 3×8“). Gilt nur für dich.</p>
    <textarea class="f" id="weEx" rows="10">${esc(w.ex.map(([n, v]) => n + ' – ' + v).join('\n'))}</textarea>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <button class="btn full" data-action="workout-edit-save" data-cat="${cat}">Speichern</button>
      ${cat.startsWith('mein-') ? '<button class="btn danger small full" data-action="workout-edit-reset" data-cat="' + cat + '">Workout löschen</button>' : w.custom ? '<button class="btn danger small full" data-action="workout-edit-reset" data-cat="' + cat + '">Zurück zum Standard</button>' : ''}
    </div>
  `);
}

function renderChat() {
  let html = `<div class="pagehead"><div><h1 class="page">${esc(nameOf(partner()))}</h1><div class="sub">Nur für euch zwei</div></div>
    <button class="iconbtn" data-tab="home">${icon('chevL', 18)}</button></div>`;
  if (!DATA.messages.length) html += emptyState('mail', 'Noch ganz leer hier – schreib die erste Nachricht.');
  const gestern = toISO(addDays(new Date(), -1));
  let lastDay = null;
  for (const m of DATA.messages) {
    const day = msgDay(m);
    if (day && day !== lastDay) {
      lastDay = day;
      const label = day === todayISO() ? 'Heute' : day === gestern ? 'Gestern' : fmtShort(day);
      html += `<div class="datechip"><span>${esc(label)}</span></div>`;
    }
    html += `<div class="bubble ${m.from === me() ? 'me' : 'them'}">${esc(m.text)}<span class="bt">${esc(msgTime(m))}</span></div>`;
  }
  html += `<div class="chatbar"><input class="f" id="chatInput" placeholder="Nachricht" autocomplete="off"><button class="btn send" data-action="chat-send">${icon('send', 20)}</button></div>`;
  return html;
}

/* ---------- Einstellungen ---------- */
function renderSettings() {
  const sync = window.UZSync;
  const syncHtml = sync && sync.configured()
    ? (sync.active()
      ? `<div style="margin-bottom:10px">Verbunden als <b>${esc(sync.email())}</b> – alles synchronisiert live.</div><button class="btn ghost small full" data-action="sync-logout">Abmelden</button>`
      : `<div class="hint">Konfiguriert, aber nicht angemeldet – lade die App neu.</div>`)
    : `<div class="hint">Noch nicht verbunden. Sobald euer kostenloses Supabase-Projekt eingerichtet ist (Anleitung: SETUP-SUPABASE.md im App-Ordner), tragen wir zwei Werte in config.js ein – dann synchronisiert alles live zwischen euren iPhones, mit Login nur für euch zwei.</div>`;

  return `<div class="pagehead"><div><h1 class="page">Einstellungen</h1><div class="sub">App einrichten</div></div>
    <button class="iconbtn" data-tab="home">${icon('chevL', 18)}</button></div>

  <h2 class="sect">Wer bist du?</h2>
  <div class="card">
    ${sync && sync.active()
      ? `<div>Du bist als <b>${esc(nameOf(me()))}</b> angemeldet (${esc(sync.email())}).</div>
         <div class="hint" style="margin-top:8px">Die App erkennt am Login automatisch, wer du bist – Begrüßung, Chat und Notizen stimmen auf jedem Gerät.</div>`
      : `<select class="f" id="setMe">
           <option value="stefan" ${me() === 'stefan' ? 'selected' : ''}>Stefan</option>
           <option value="linda" ${me() === 'linda' ? 'selected' : ''}>Linda</option>
         </select>
         <div class="hint" style="margin-top:8px">Ohne Anmeldung kannst du hier manuell wählen. Sobald du angemeldet bist, geht das automatisch.</div>`}
  </div>

  <h2 class="sect">Gemeinsamer Sync</h2>
  <div class="card">${syncHtml}</div>

  <h2 class="sect">Kalender verbinden (Outlook &amp; Apple)</h2>
  <div class="card">
    <div class="hint" style="margin-bottom:10px"><b>Outlook (Web):</b> Einstellungen → Kalender → <b>Freigegebene Kalender</b> → „Kalender veröffentlichen“ → den <b>ICS-Link</b> kopieren.<br><br>
    <b>Apple-Kalender (iPhone):</b> Kalender-App → unten „Kalender“ → beim gewünschten Kalender aufs <b>ⓘ</b> → <b>„Öffentlicher Kalender“</b> einschalten → „Link teilen“ → <b>Link kopieren</b> und hier einfügen (beginnt mit webcal:// – passt so).<br><br>
    Die Termine werden bei jedem App-Start und alle 30 Minuten automatisch aktualisiert.</div>
    <label class="f">Stefans Kalender-Link</label>
    <input class="f" id="setIcsStefan" value="${esc(DATA.settings.icsStefan)}" placeholder="https://outlook.office365.com/…/calendar.ics">
    <label class="f">Lindas Kalender-Link</label>
    <input class="f" id="setIcsLinda" value="${esc(DATA.settings.icsLinda)}" placeholder="webcal://p66-caldav.icloud.com/published/…">
    <button class="btn small full" style="margin-top:12px" data-action="save-ics">Speichern &amp; laden</button>
    <div class="frow" style="margin-top:8px">
      <button class="btn ghost small" data-action="ics-refresh">Jetzt aktualisieren</button>
      <label class="btn ghost small" style="cursor:pointer">Datei importieren<input type="file" accept=".ics,text/calendar" id="icsFileStefan" hidden></label>
    </div>
    <div class="hint" style="margin-top:8px">Aktualisiert sich automatisch bei jedem App-Start und alle 30 Minuten.${DATA.icsEvents.length ? ' Aktuell ' + DATA.icsEvents.length + ' Termine geladen' + (DATA.settings.icsLast ? ' · Stand ' + esc(DATA.settings.icsLast) : '') + '.' : ''}</div>
  </div>

  <h2 class="sect">Benachrichtigungen</h2>
  <div class="card" id="pushCard"><div class="hint">Prüfe Status …</div></div>

  <h2 class="sect">Daten</h2>
  <div class="card" style="display:flex;flex-direction:column;gap:8px">
    <button class="btn ghost small" data-action="export-data">Backup exportieren</button>
    <label class="btn ghost small" style="cursor:pointer">Backup importieren<input type="file" accept="application/json" id="importFile" hidden></label>
    <button class="btn danger small" data-action="reset-app">App zurücksetzen</button>
  </div>
  <div class="mut" style="text-align:center;margin-top:16px">Unser Zuhause v1.1 · gebaut für Linda &amp; Stefan</div>`;
}

/* ---------- Aktionen ---------- */
function handleAction(a, el) {
  const id = el.dataset.id;
  switch (a) {
    /* Navigation */
    case 'open-settings': state.tab = 'settings'; render(); break;
    case 'open-chat': state.tab = 'chat'; markChatRead(); render(); requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight)); break;
    case 'go-haushalt': state.tab = 'haushalt'; state.haushalt = 'aufgaben'; render(); break;
    case 'go-kalender': state.tab = 'kalender'; render(); break;
    case 'home-ev': state.tab = 'kalender'; state.calView = 'tag'; state.calSel = el.dataset.iso; render(); break;
    case 'go-kueche': state.tab = 'kueche'; state.kueche = 'plan'; render(); break;
    case 'go-einkauf': state.tab = 'kueche'; state.kueche = 'list'; render(); break;
    case 'go-training': state.tab = 'training'; state.training = 'woche'; render(); break;

    /* Notiz & Highlight */
    case 'edit-note':
      openSheet(`<h2>Zettel für ${esc(nameOf(partner()))}</h2>
        <p class="mut">Er hängt dann an ${esc(nameOf(partner()))}s Pinnwand, bis du ihn änderst oder abnimmst.</p>
        <textarea class="f" id="noteText" placeholder="z. B. Ich komme heute erst um 19 Uhr – Essen steht im Ofen">${esc(DATA.notes[me()])}</textarea>
        <div style="margin-top:14px;display:flex;gap:8px">
          ${DATA.notes[me()] ? '<button class="btn ghost" data-action="clear-note">Abnehmen</button>' : ''}
          <button class="btn" style="flex:1" data-action="save-note">Anpinnen</button>
        </div>`);
      break;
    case 'clear-note':
      DATA.notes[me()] = '';
      if (DATA.notesAt) DATA.notesAt[me()] = '';
      if (DATA.notesLiked) DATA.notesLiked[me()] = false;
      save(); closeSheet(); render(); toast('Zettel abgenommen'); break;
    case 'note-like': {
      if (!DATA.notesLiked) DATA.notesLiked = { stefan: false, linda: false };
      const author = partner();
      DATA.notesLiked[author] = !DATA.notesLiked[author];
      save(); render();
      if (DATA.notesLiked[author]) pingPartner('♥ ' + nameOf(me()) + ' mag deinen Zettel', (DATA.notes[author] || '').slice(0, 100));
      break;
    }
    case 'save-note':
      DATA.notes[me()] = document.getElementById('noteText').value.trim();
      if (!DATA.notesAt) DATA.notesAt = { stefan: '', linda: '' };
      DATA.notesAt[me()] = DATA.notes[me()] ? new Date().toISOString() : '';
      if (!DATA.notesLiked) DATA.notesLiked = { stefan: false, linda: false };
      DATA.notesLiked[me()] = false; // neuer Zettel, neues Glück
      if (DATA.notes[me()]) pingPartner('Neuer Zettel an eurer Pinnwand', nameOf(me()) + ': ' + DATA.notes[me()].slice(0, 100));
      save(); closeSheet(); render(); toast('Angepinnt');
      if (DATA.notes[me()] && window.UZSync) {
        UZSync.notifyPartner(nameOf(me()) + ' hat dir einen Zettel an die Pinnwand gehängt', DATA.notes[me()].slice(0, 120));
      }
      break;
    /* Haushalt */
    case 'toggle-task': { const t = DATA.tasks.find(x => x.id === id); if (t) { toggleTask(t); render(); } break; }
    case 'add-task': openTaskSheet(null); break;
    case 'edit-task': openTaskSheet(id); break;
    case 'save-task': {
      const title = document.getElementById('tkTitle').value.trim();
      if (!title) break;
      const rotMap = { 'st-li': ['stefan', 'linda'], 'li-st': ['linda', 'stefan'], 'nur-stefan': ['stefan'], 'nur-linda': ['linda'] };
      const rot = rotMap[document.getElementById('tkRot').value];
      const freq = document.getElementById('tkFreq').value;
      const dayV = document.getElementById('tkDay').value;
      const day = dayV === '' ? null : Number(dayV);
      const t = id ? DATA.tasks.find(x => x.id === id) : null;
      if (t) { Object.assign(t, { title, freq, day, rotation: rot, turn: t.turn % rot.length }); }
      else DATA.tasks.push({ id: uid(), title, freq, day, anchor: toISO(startOfWeek(new Date())), rotation: rot, turn: 0, doneKey: null });
      save(); closeSheet(); render(); break;
    }
    case 'del-task': DATA.tasks = DATA.tasks.filter(x => x.id !== id); save(); closeSheet(); render(); break;
    case 'todo-add': {
      const inp = document.getElementById('todoInput');
      if (inp.value.trim()) {
        const whoSel = document.getElementById('todoWho');
        const who = whoSel ? whoSel.value : 'beide';
        const title = inp.value.trim();
        DATA.todos.push({ id: uid(), title, who, due: '', done: false });
        save(); render();
        if (who === 'beide' || who === partner()) pingBatched('todo', 'Neue To-dos für dich', title, 300000);
        toast(who === 'beide' ? 'Bei den gemeinsamen To-dos' : 'In ' + nameOf(who) + 's Spalte gelegt');
      }
      break;
    }
    case 'todo-toggle': { const t = DATA.todos.find(x => x.id === id); if (t) { t.done = !t.done; save(); render(); } break; }
    case 'todo-assign': openTodoSheet(id); break;
    case 'todo-set-who': {
      const t = DATA.todos.find(x => x.id === id);
      if (t) {
        const vorher = t.who || 'beide';
        t.who = el.dataset.w;
        save(); openTodoSheet(id);
        if (t.who === partner() && vorher !== partner()) pingBatched('todo', 'Neue To-dos für dich', t.title, 300000);
      }
      break;
    }
    case 'todo-save-due': {
      const t = DATA.todos.find(x => x.id === id);
      if (t) { t.due = document.getElementById('tdDue').value; save(); }
      closeSheet(); render();
      break;
    }
    case 'todo-del': DATA.todos = DATA.todos.filter(x => x.id !== id); save(); closeSheet(); render(); break;
    case 'todo-clear': DATA.todos = DATA.todos.filter(t => !t.done); save(); render(); break;

    /* Kalender */
    case 'cal-view': state.calView = el.dataset.v; render(); break;
    case 'cal-prev': case 'cal-next': {
      const dir = a === 'cal-next' ? 1 : -1;
      if (state.calView === 'woche') {
        state.calSel = toISO(addDays(fromISO(state.calSel), dir * 7));
      } else if (state.calView === 'tag') {
        state.calSel = toISO(addDays(fromISO(state.calSel), dir));
      } else {
        state.calM += dir;
        if (state.calM < 0) { state.calM = 11; state.calY--; }
        if (state.calM > 11) { state.calM = 0; state.calY++; }
      }
      render(); break;
    }
    case 'cal-day': state.calSel = el.dataset.iso; render(); break;
    case 'cal-day-tag': state.calSel = el.dataset.iso; state.calView = 'tag'; render(); break;
    case 'add-event': openEventSheet(state.calSel || todayISO()); break;
    case 'edit-event': openEventSheet(null, id); break;
    case 'save-event': {
      const title = document.getElementById('evTitle').value.trim();
      const date = document.getElementById('evDate').value;
      if (!title || !date) break;
      const allday = document.getElementById('evAllday').checked;
      let endDate = document.getElementById('evEnd').value || '';
      if (endDate && endDate <= date) endDate = ''; // „bis“ nur, wenn wirklich später
      const fields = { title, date, time: allday ? '' : document.getElementById('evTime').value, allday, endDate, who: document.getElementById('evWho').value, repeat: allday || endDate ? '' : document.getElementById('evRepeat').value };
      const ev = id ? DATA.events.find(e => e.id === id) : null;
      const before = ev ? { ...ev } : null;
      if (ev) Object.assign(ev, fields);
      else DATA.events.push({ id: uid(), ...fields });
      state.calSel = date;
      save(); closeSheet(); render(); toast(ev ? 'Termin geändert' : 'Termin eingetragen');
      const betrifft = w => w === 'beide' || w === partner();
      if (!ev && betrifft(fields.who)) {
        pingPartner('Neuer Termin von ' + nameOf(me()), fields.title + ' · ' + fmtShort(date) + (fields.time ? ', ' + fields.time + ' Uhr' : ''));
      } else if (ev && (betrifft(fields.who) || betrifft(before.who))) {
        const changes = [];
        if (before.date !== fields.date) changes.push('jetzt am ' + fmtShort(fields.date));
        if (before.time !== fields.time) changes.push(fields.time ? 'jetzt um ' + fields.time + ' Uhr' : 'Uhrzeit entfernt');
        if (before.title !== fields.title) changes.push('heißt jetzt „' + fields.title + '“');
        if (before.who !== fields.who) changes.push('zugeordnet: ' + (fields.who === 'beide' ? 'Beide' : nameOf(fields.who)));
        if (changes.length) pingPartner('Termin geändert: ' + before.title, changes.join(' · '));
      }
      break;
    }
    case 'del-event': case 'del-event-sheet': {
      const ev = DATA.events.find(x => x.id === id);
      DATA.events = DATA.events.filter(x => x.id !== id);
      save();
      if (a === 'del-event-sheet') closeSheet();
      render();
      if (ev && ev.who !== me()) pingPartner('Termin gelöscht', ev.title + ' · ' + fmtShort(ev.date));
      if (a === 'del-event-sheet') toast('Termin gelöscht');
      break;
    }
    case 'ics-refresh': refreshIcs(false); break;

    /* Küche */
    case 'kseg': state.kueche = el.dataset.v; render(); break;
    case 'hseg': state.haushalt = el.dataset.v; render(); break;
    case 'presence-open': openPresenceSheet(); break;
    case 'voice-set-presence': {
      const iso = document.getElementById('vpDate').value;
      const who = document.getElementById('vpWho').value;
      const slot = document.getElementById('vpSlot').value;
      const val = document.getElementById('vpPresent').value === 'ja';
      if (iso) {
        const persons = who === 'beide' ? ['stefan', 'linda'] : [who];
        const slots = slot === 'beide' ? ['m', 'a'] : [slot];
        for (const p of persons) for (const s of slots) setPresence(iso, p, s, val);
        closeSheet(); render(); toast('Im Plan eingetragen');
        pingBatched('presence', nameOf(me()) + ' hat den „Wer ist wann da“-Plan aktualisiert', null, 30000);
      }
      break;
    }
    case 'presence-toggle':
      setPresence(el.dataset.iso, me(), el.dataset.slot, !isPresent(el.dataset.iso, me(), el.dataset.slot));
      pingBatched('presence', nameOf(me()) + ' hat den „Wer ist wann da“-Plan aktualisiert', null, 30000);
      openPresenceSheet();
      break;

    /* Finanzen */
    case 'exp-add': {
      const amount = parseFloat((document.getElementById('expAmount').value || '').replace(',', '.'));
      const title = document.getElementById('expTitle').value.trim() || 'Ausgabe';
      const paidBy = document.getElementById('expWho').value;
      if (!amount || amount <= 0) { toast('Bitte einen Betrag eingeben'); break; }
      if (!DATA.expenses) DATA.expenses = [];
      DATA.expenses.push({ id: uid(), title, amount: Math.round(amount * 100) / 100, paidBy, date: todayISO(), settled: false });
      save(); render();
      pingPartner(nameOf(paidBy) + ' hat ' + fmtEuro(amount) + ' ausgelegt', title);
      toast('Eingetragen – ' + fmtEuro(amount / 2) + ' pro Person');
      break;
    }
    case 'exp-del': DATA.expenses = DATA.expenses.filter(e => e.id !== id); save(); render(); break;
    case 'exp-settle-open': {
      const net = expenseBalance();
      const text = Math.abs(net) < 0.005
        ? 'Ihr seid ausgeglichen – die offenen Einträge werden nur abgehakt.'
        : (net > 0 ? 'Linda' : 'Stefan') + ' zahlt ' + (net > 0 ? 'Stefan' : 'Linda') + ' <b>' + fmtEuro(Math.abs(net)) + '</b> – danach hier abhaken.';
      openSheet(`<h2>Ausgleichen</h2>
        <p style="font-size:15px">${text}</p>
        <div class="frow" style="margin-top:14px">
          <button class="btn ghost" data-action="close-sheet">Abbrechen</button>
          <button class="btn" style="flex:1" data-action="exp-settle">Beglichen ✓</button>
        </div>`);
      break;
    }
    case 'exp-settle': {
      const now = new Date().toISOString();
      (DATA.expenses || []).forEach(e => { if (!e.settled) { e.settled = true; e.settledAt = now; } });
      save(); closeSheet(); render();
      pingPartner('Finanzen ausgeglichen', 'Alle offenen Ausgaben sind abgehakt');
      toast('Alles beglichen');
      break;
    }

    /* Training */
    case 'trseg': state.training = el.dataset.v; render(); break;
    case 'training-wizard': openTrainingWizard(); break;
    case 'training-create': {
      const goals = [];
      if (document.getElementById('tgFit').checked) goals.push('fit');
      if (document.getElementById('tgStaerker').checked) goals.push('staerker');
      if (document.getElementById('tgMasse').checked) goals.push('masse');
      if (document.getElementById('tgAusdauer').checked) goals.push('ausdauer');
      if (document.getElementById('tgBeweglich').checked) goals.push('beweglich');
      if (!goals.length) { toast('Wähle mindestens ein Ziel aus'); break; }
      const fokus = [];
      if (document.getElementById('tfPobeine').checked) fokus.push('pobeine');
      if (document.getElementById('tfBauch').checked) fokus.push('bauch');
      if (document.getElementById('tfRuecken').checked) fokus.push('ruecken');
      if (document.getElementById('tfArme').checked) fokus.push('arme');
      const limits = [];
      if (document.getElementById('tlKnie').checked) limits.push('knie');
      if (document.getElementById('tlRuecken').checked) limits.push('ruecken');
      if (document.getElementById('tlSchulter').checked) limits.push('schulter');
      const ts = trainingState();
      const alt = ts.plans[me()];
      const opts = {
        goals,
        level: document.getElementById('twLevel').value,
        zielText: document.getElementById('twZiel').value.trim(),
        fokus, limits,
        // Pensum und Orte kommen aus dem Wochen-Check-in; als Startwert: Empfehlung bzw. bisherige Gewohnheit
        freq: alt && alt.freq ? alt.freq : recommendedFreq(goals),
        elements: alt && alt.elements && alt.elements.length ? alt.elements : ['gym', 'home'],
      };
      const gen = buildTrainingPlan(opts);
      ts.plans[me()] = { ...opts, startISO: alt ? alt.startISO : todayISO(), weekly: gen.weekly, progression: gen.progression };
      // aktuelle Woche neu legen
      delete ts.week[toISO(startOfWeek(new Date())) + ':' + me()];
      scheduleTrainingWeek(me(), toISO(startOfWeek(new Date())));
      save(); closeSheet(); state.training = 'woche'; render();
      pingPartner(nameOf(me()) + ' hat einen Trainingsplan', goals.map(g => GOAL_LABEL[g] || g).join(' + '));
      openTrainingWeekSheet(); toast('Ziele stehen – und wie sieht diese Woche aus?');
      break;
    }
    case 'training-delete': {
      const ts = trainingState();
      delete ts.plans[me()];
      for (const k of Object.keys(ts.week)) if (k.endsWith(':' + me())) delete ts.week[k];
      save(); closeSheet(); render(); toast('Plan gelöscht');
      break;
    }
    case 'training-replan': {
      const ts = trainingState();
      delete ts.week[toISO(startOfWeek(new Date())) + ':' + me()];
      scheduleTrainingWeek(me(), toISO(startOfWeek(new Date())));
      render(); toast('Woche neu geplant');
      break;
    }
    case 'training-open': openWorkoutSheet(el.dataset.cat, el.dataset.mon, el.dataset.day !== undefined ? Number(el.dataset.day) : undefined); break;
    case 'training-done': case 'training-done-sheet': {
      const entries = trainingWeekEntries(me(), el.dataset.mon) || [];
      const e = entries.find(x => x.day === Number(el.dataset.day));
      if (e) {
        e.done = !e.done;
        save();
        if (a === 'training-done-sheet') closeSheet();
        render();
        if (e.done) { toast('Stark! 💪'); pingBatched('training', nameOf(me()) + ' hat trainiert', e.title, 5000); }
      }
      break;
    }
    case 'training-move': openTrainingMoveSheet(el.dataset.mon, el.dataset.day); break;
    case 'training-week-ok': {
      const ts = trainingState();
      ts.weekPrefs[toISO(startOfWeek(new Date())) + ':' + me()] = { ok: true };
      save(); render(); toast('Alles klar – Woche steht');
      break;
    }
    case 'training-week-adjust': openTrainingWeekSheet(); break;
    case 'training-week-apply': applyWeekPrefs(readWeekPrefsForm()); toast('Woche angepasst'); break;
    case 'training-week-ai': {
      const prefs = readWeekPrefsForm();
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich stelle deine Trainingswoche zusammen.</div></div>');
      (async () => {
        try {
          const plan = trainingState().plans[me()];
          const mon = toISO(startOfWeek(new Date()));
          const stats = trainingLastWeekStats(me(), mon);
          const wkNr = Math.max(1, Math.floor((new Date(todayISO()) - new Date(plan.startISO)) / (7 * 864e5)) + 1);
          // Historie der letzten 3 Wochen: was wurde wirklich gemacht?
          const history = [];
          for (let wBack = 1; wBack <= 3; wBack++) {
            const wMon = toISO(addDays(new Date(mon + 'T12:00'), -7 * wBack));
            const es = trainingState().week[wMon + ':' + me()] || [];
            if (es.length) history.push({ weeksAgo: wBack, done: es.filter(x => x.done).map(x => x.cat), missed: es.filter(x => !x.done).map(x => x.cat) });
          }
          // Tagebuch-Auszug: die letzten Einträge der meistgenutzten Übungen (erkennt Stagnation)
          const logAll = (trainingState().log && trainingState().log[me()]) || {};
          const tagebuch = Object.entries(logAll)
            .sort((a, b) => b[1].length - a[1].length).slice(0, 5)
            .map(([name, arr]) => ({ uebung: name, letzte: arr.slice(-3) }));
          const r = await UZSync.invoke('ai', {
            mode: 'trainweek',
            goals: planGoals(plan), freq: prefs.freq, elements: prefs.elements,
            level: plan.level || '', fokus: plan.fokus || [], limits: plan.limits || [],
            zielText: plan.zielText || '', tagebuch,
            lastWeek: stats, history, weekNumber: wkNr,
            freeEveningsNextWeek: trainingFreeEvenings(me(), toISO(addDays(new Date(mon + 'T12:00'), 7))),
          });
          const sessions = (r.sessions || [])
            .filter(s => typeof workoutByCat === 'function' && workoutByCat(s.cat))
            .map(s => { const w = workoutByCat(s.cat); return { cat: s.cat, title: w.name, minutes: s.minutes || w.minutes, day: 0 }; });
          if (!sessions.length) throw new Error('leer');
          applyWeekPrefs({ ...prefs, sessions, hinweis: r.hinweis || '' });
          toast('Deine KI-Woche steht!');
          if (r.hinweis) setTimeout(() => toast(r.hinweis), 1600);
        } catch (e) {
          console.warn('KI-Wochenplanung nicht verfügbar:', e.message);
          applyWeekPrefs(prefs);
          toast('KI gerade nicht erreichbar – nach Plan-Logik gelegt');
        }
      })();
      break;
    }
    case 'training-set-time': {
      const entries = trainingWeekEntries(me(), el.dataset.mon) || [];
      const e = entries.find(x => x.day === Number(el.dataset.day));
      if (e) { e.time = document.getElementById('tmTime').value || ''; save(); closeSheet(); render(); toast(e.time ? 'Steht um ' + e.time + ' Uhr im Kalender' : 'Uhrzeit entfernt'); }
      break;
    }
    case 'workout-edit': openWorkoutEditSheet(el.dataset.cat); break;
    case 'workout-edit-save': {
      const lines = document.getElementById('weEx').value.split('\n').map(s => s.trim()).filter(Boolean);
      const ex = lines.map(l => {
        const p = l.split(/\s+[–\-|]\s+/);
        return [p[0].trim(), (p[1] || '').trim() || 'nach Gefühl'];
      });
      if (!ex.length) { toast('Mindestens eine Übung angeben'); break; }
      const ts = trainingState();
      if (el.dataset.cat.startsWith('mein-')) {
        const own = (ts.myWorkouts[me()] || []).find(w => 'mein-' + w.id === el.dataset.cat);
        if (own) own.ex = ex;
      } else {
        if (!ts.custom[me()]) ts.custom[me()] = {};
        ts.custom[me()][el.dataset.cat] = { ex };
      }
      save(); closeSheet(); openWorkoutSheet(el.dataset.cat); toast('Gespeichert – dein Workout');
      break;
    }
    case 'workout-edit-reset': {
      const ts = trainingState();
      if (el.dataset.cat.startsWith('mein-')) {
        ts.myWorkouts[me()] = (ts.myWorkouts[me()] || []).filter(w => 'mein-' + w.id !== el.dataset.cat);
        save(); closeSheet(); state.training = 'workouts'; render(); toast('Workout gelöscht');
      } else {
        if (ts.custom[me()]) delete ts.custom[me()][el.dataset.cat];
        save(); closeSheet(); openWorkoutSheet(el.dataset.cat); toast('Standard wiederhergestellt');
      }
      break;
    }
    case 'ai-workout-open':
      openSheet(`<h2>Workout mit KI erstellen</h2>
        <label class="f">Was soll es sein?</label>
        <textarea class="f" id="awWish" rows="3" placeholder="z. B. 30 Min. Beine & Po mit Kurzhanteln zuhause, ohne Sprünge"></textarea>
        <button class="btn full" style="margin-top:12px" data-action="ai-workout-create">${icon('spark', 16)} Erstellen</button>`);
      break;
    case 'ai-workout-create': {
      const wish = document.getElementById('awWish').value.trim();
      if (!wish) { toast('Beschreib kurz, was du willst'); break; }
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich stelle dein Workout zusammen.</div></div>');
      (async () => {
        try {
          const r = await UZSync.invoke('ai', { mode: 'workoutgen', wish });
          const ts = trainingState();
          if (!ts.myWorkouts[me()]) ts.myWorkouts[me()] = [];
          const w = { id: uid(), name: r.name, minutes: r.minutes, rounds: r.rounds, ex: (r.ex || []).map(x => [x.name, x.umfang]) };
          ts.myWorkouts[me()].push(w);
          save(); render(); openWorkoutSheet('mein-' + w.id); toast('Dein Workout ist da!');
          pingPartner('Neues Workout von ' + nameOf(me()), w.name);
        } catch (e) {
          console.warn('KI-Workout fehlgeschlagen:', e.message);
          closeSheet(); toast('KI gerade nicht erreichbar – später nochmal versuchen');
        }
      })();
      break;
    }
    case 'training-move-to': {
      const entries = trainingWeekEntries(me(), el.dataset.mon) || [];
      const e = entries.find(x => x.day === Number(el.dataset.from));
      if (e) {
        e.day = Number(el.dataset.to); e.moved = true;
        entries.sort((x, y) => x.day - y.day);
        save(); closeSheet(); render(); toast('Verschoben');
      }
      break;
    }
    case 'training-skip': {
      const entries = trainingWeekEntries(me(), el.dataset.mon) || [];
      const idx = entries.findIndex(x => x.day === Number(el.dataset.day));
      if (idx >= 0) { entries.splice(idx, 1); save(); closeSheet(); render(); toast('Diese Woche ohne – passt'); }
      break;
    }
    case 'training-to-cal': {
      DATA.events.push({ id: uid(), title: el.dataset.title, date: todayISO(), time: '', who: me(), repeat: '' });
      save(); closeSheet(); state.tab = 'kalender'; state.calSel = todayISO(); render();
      toast('Im Kalender – Datum/Uhrzeit dort anpassen');
      break;
    }
    case 'exercise-open': openExerciseSheet(el.dataset.name, el.dataset.cat, el.dataset.mon, el.dataset.day !== undefined && el.dataset.day !== '' ? Number(el.dataset.day) : undefined); break;
    case 'exercise-log': {
      const w = parseFloat(String(document.getElementById('exLogW').value).replace(',', '.'));
      const r = parseInt(document.getElementById('exLogR').value, 10);
      if (!w || !r) { toast('Gewicht und Wiederholungen angeben'); break; }
      const ts = trainingState();
      if (!ts.log) ts.log = {};
      if (!ts.log[me()]) ts.log[me()] = {};
      const arr = ts.log[me()][el.dataset.name] = ts.log[me()][el.dataset.name] || [];
      const prev = arr[arr.length - 1];
      arr.push({ d: todayISO(), w, r });
      if (arr.length > 30) arr.shift();
      save();
      const besser = prev && (w > prev.w || (w === prev.w && r > prev.r));
      toast(besser ? 'Mehr als letztes Mal – stark! 📈' : 'Eingetragen');
      openExerciseSheet(el.dataset.name, el.dataset.cat, el.dataset.mon !== '' ? el.dataset.mon : undefined, el.dataset.day !== '' ? Number(el.dataset.day) : undefined);
      break;
    }
    case 'training-extra': openTrainingExtraSheet('plan'); break;
    case 'training-log-past': openTrainingExtraSheet('done'); break;
    case 'training-extra-pick': {
      const mon = toISO(startOfWeek(new Date()));
      const entries = trainingWeekEntries(me(), mon) || scheduleTrainingWeek(me(), mon) || (trainingState().week[mon + ':' + me()] = []);
      const w = workoutByCat(el.dataset.cat);
      const todayIdx = (new Date().getDay() + 6) % 7;
      if (el.dataset.mode === 'done') {
        entries.push({ cat: el.dataset.cat, title: w.name, minutes: w.minutes, day: todayIdx, done: true, extra: true });
        entries.sort((x, y) => x.day - y.day);
        save(); closeSheet(); render(); toast('Nachgetragen – stark! 💪');
        pingBatched('training', nameOf(me()) + ' hat trainiert', w.name, 5000);
      } else {
        let best = todayIdx;
        for (let d = todayIdx; d < 7; d++) {
          const iso = toISO(addDays(new Date(mon + 'T12:00'), d));
          if (!entries.some(x => x.day === d) && !trainingEveningBusy(iso, me())) { best = d; break; }
        }
        entries.push({ cat: el.dataset.cat, title: w.name, minutes: w.minutes, day: best, done: false, extra: true });
        entries.sort((x, y) => x.day - y.day);
        save(); closeSheet(); render(); toast('Am ' + WD[best] + ' eingeplant');
      }
      break;
    }
    case 'training-together': {
      openSheet(`
        <h2>${esc(el.dataset.title)}</h2>
        <p class="mut">${esc(fmtNice(el.dataset.iso))} · kommt als gemeinsamer Termin in den Kalender.</p>
        <label class="f">Um wie viel Uhr?</label>
        <input class="f" type="time" id="ttTime" value="19:00">
        <button class="btn full" style="margin-top:12px" data-action="training-together-save" data-iso="${el.dataset.iso}" data-title="${esc(el.dataset.title)}">${icon('cal', 15)} Eintragen</button>
      `);
      break;
    }
    case 'training-together-save': {
      const time = document.getElementById('ttTime').value || '19:00';
      DATA.events.push({ id: uid(), title: el.dataset.title, date: el.dataset.iso, time, who: 'beide', repeat: '' });
      save(); closeSheet(); render(); toast('Gemeinsames Training steht im Kalender');
      pingPartner('Gemeinsames Training?', el.dataset.title + ' · ' + fmtShort(el.dataset.iso) + ', ' + time + ' Uhr – ' + nameOf(me()) + ' hat es eingetragen');
      break;
    }

    /* Verbundenheit */
    case 'mission-reroll': {
      const m = currentMission();
      if (m.wer !== me() || m.rerolled) break;
      if (!DATA.missionSkips) DATA.missionSkips = {};
      DATA.missionSkips[m.key] = true;
      save(); render(); toast('Neue Mission!');
      break;
    }
    case 'checkin-open': openCheckinSheet(); break;
    case 'checkin-save': {
      saveCheckin(me(), {
        schoen: document.getElementById('ciSchoen').value.trim(),
        schwer: document.getElementById('ciSchwer').value.trim(),
        wunsch: document.getElementById('ciWunsch').value.trim(),
      });
      closeSheet(); render();
      pingPartner('Wochen-Check-in', nameOf(me()) + ' hat geteilt, wie die Woche war – schau mal rein');
      toast('Gespeichert');
      break;
    }
    case 'meal-slot': openMealSheet(el.dataset.iso, el.dataset.slot); break;
    case 'meal-set': {
      const slot = el.dataset.slot || 'a';
      setMeal(el.dataset.iso, slot, { rid: el.dataset.rid });
      closeSheet(); render();
      pingPartner('Kochplan', mealName({ rid: el.dataset.rid }) + ' am ' + fmtShort(el.dataset.iso) + (slot === 'm' ? ' (mittags)' : ''));
      break;
    }
    case 'meal-set-text': {
      const v = document.getElementById('mealText').value.trim();
      if (v) {
        const slot = el.dataset.slot || 'a';
        setMeal(el.dataset.iso, slot, { name: v });
        closeSheet(); render();
        pingPartner('Kochplan', v + ' am ' + fmtShort(el.dataset.iso) + (slot === 'm' ? ' (mittags)' : ''));
      }
      break;
    }
    case 'meal-clear': setMeal(el.dataset.iso, el.dataset.slot || 'a', null); render(); openMealSheet(el.dataset.iso, el.dataset.slot || 'a'); break;
    case 'meal-preview': openMealPreviewSheet(el.dataset.iso, el.dataset.slot || 'a', el.dataset.rid); break;
    case 'meal-back': openMealSheet(el.dataset.iso, el.dataset.slot || 'a'); break;
    case 'meal-roll': {
      const r = suggestRecipe();
      if (!r) { toast('Erst Rezepte anlegen'); break; }
      const slot = el.dataset.slot || 'a';
      setMeal(el.dataset.iso, slot, { rid: r.id });
      render(); openMealSheet(el.dataset.iso, slot); toast('Vorschlag: ' + r.name);
      pingPartner('Kochplan', r.name + ' am ' + fmtShort(el.dataset.iso) + (slot === 'm' ? ' (mittags)' : ''));
      break;
    }
    case 'meal-fill': {
      let filled = 0;
      for (let i = 0; i < 14; i++) {
        const iso = toISO(addDays(new Date(), i));
        if (!mealAt(iso, 'a')) {
          const r = suggestRecipe();
          if (r) { setMeal(iso, 'a', { rid: r.id }); filled++; }
        }
      }
      render();
      toast(filled ? filled + ' Tage vorgeschlagen – tausch aus, was nicht passt' : 'Alle Tage sind schon geplant');
      if (filled) pingPartner('Kochplan', nameOf(me()) + ' hat ' + filled + ' Tage mit Vorschlägen geplant');
      break;
    }
    case 'meal-shop': {
      const r = DATA.recipes.find(x => x.id === el.dataset.rid);
      if (r) {
        addRecipeToShopping(r);
        pingBatched('shop', 'Einkaufsliste ergänzt', 'Zutaten für ' + r.name);
        closeSheet(); toast('Zutaten auf der Liste'); render();
      }
      break;
    }
    case 'ing-toggle': el.classList.toggle('on'); break;
    case 'ing-toggle-row': {
      const c = el.parentElement.querySelector('.check');
      if (c) c.classList.toggle('on');
      break;
    }
    case 'recipe-shop': {
      const rows = [...document.querySelectorAll('#sheet [data-ing-name]')];
      const chosen = rows.filter(x => x.querySelector('.check.on')).map(x => x.dataset.ingName);
      if (!chosen.length) { toast('Nichts ausgewählt'); break; }
      let added = 0, dup = 0;
      chosen.forEach(n => {
        if (addShoppingItem(n) === 'exists') dup++;
        else { added++; pingBatched('shop', 'Einkaufsliste ergänzt', n); }
      });
      closeSheet(); render();
      toast(added + ' auf der Liste' + (dup ? ' · ' + dup + ' war(en) schon drauf' : ''));
      break;
    }
    case 'shop-add': {
      const inp = document.getElementById('shopInput');
      if (inp.value.trim()) {
        const name = inp.value.trim();
        const res = addShoppingItem(name);
        if (res === 'exists') toast('Steht schon auf der Liste');
        else pingBatched('shop', 'Einkaufsliste ergänzt', name);
        render(); document.getElementById('shopInput').focus();
      }
      break;
    }
    case 'shop-toggle': { const i = DATA.shopping.find(x => x.id === id); if (i) { i.done = !i.done; save(); render(); } break; }
    case 'shop-clear': DATA.shopping = DATA.shopping.filter(i => !i.done); save(); render(); break;
    case 'recipe-detail': openRecipeSheet(id); break;
    case 'add-recipe': openAddRecipeSheet(); break;
    case 'save-recipe': {
      const name = document.getElementById('rcName').value.trim();
      const ing = document.getElementById('rcIng').value.split('\n').map(s => s.trim()).filter(Boolean);
      const anleitung = document.getElementById('rcHow').value.trim();
      if (name) {
        const r = id ? DATA.recipes.find(x => x.id === id) : null;
        if (r) Object.assign(r, { name, ing, anleitung });
        else {
          DATA.recipes.push({ id: uid(), name, ing, anleitung });
          pingPartner('Neues Rezept von ' + nameOf(me()), name);
        }
        save(); closeSheet(); render();
      }
      break;
    }
    case 'edit-recipe': openAddRecipeSheet(id); break;
    case 'ai-recipe-edit': openAddRecipeSheet(null, state._aiRecipe); break;
    case 'ai-howto': {
      const r = DATA.recipes.find(x => x.id === id);
      if (!r) break;
      if (!window.UZSync || !UZSync.active()) { toast('Erst anmelden'); break; }
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich schreibe die Zubereitung.</div></div>');
      UZSync.invoke('ai', { mode: 'howto', wish: r.name, recipes: r.ing })
        .then(res => { r.anleitung = res.anleitung || ''; save(); openRecipeSheet(r.id); toast('Zubereitung ergänzt'); })
        .catch(e => { openRecipeSheet(r.id); toast(e.message); });
      break;
    }
    case 'del-recipe': DATA.recipes = DATA.recipes.filter(r => r.id !== id); save(); closeSheet(); render(); break;
    case 'ai-recipe-open':
      state._aiRecipeForDay = el.dataset.iso || null;
      state._aiRecipeForSlot = el.dataset.slot || 'a';
      openSheet(`<h2>Rezept erfinden${state._aiRecipeForDay ? ' für ' + esc(fmtShort(state._aiRecipeForDay)) : ''}</h2>
        <label class="f">Worauf habt ihr Lust?</label>
        <input class="f" id="aiWish" placeholder="z. B. schnell &amp; vegetarisch, was mit Kürbis …">
        <div style="margin-top:14px"><button class="btn full" data-action="ai-recipe-go">Vorschlag holen</button></div>
        <div class="mut" style="margin-top:8px">Die KI erfindet ein Gericht samt Zutaten – speichern kannst du es danach.</div>`);
      break;
    case 'ai-recipe-go': {
      const wishEl = document.getElementById('aiWish');
      if (wishEl) state._aiWish = wishEl.value.trim();
      if (!window.UZSync || !UZSync.active()) { toast('Erst anmelden'); break; }
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich überlege mir ein Rezept.</div></div>');
      UZSync.invoke('ai', { mode: 'recipe', wish: state._aiWish || '', recipes: DATA.recipes.map(r => r.name) })
        .then(r => showAiRecipeResult(r.recipe))
        .catch(e => {
          openSheet(`<h2>Das hat nicht geklappt</h2>
            <p class="mut">${e.status === 503 ? 'Die KI ist noch nicht eingerichtet – der Claude-API-Schlüssel fehlt auf dem Server.' : esc(e.message)}</p>
            <div style="margin-top:14px"><button class="btn full" data-action="close-sheet">OK</button></div>`);
        });
      break;
    }
    case 'ai-recipe-refine':
      openSheet(`<h2>Was soll anders sein?</h2>
        <p class="mut">„${esc((state._aiRecipe || {}).name || '')}“ wird entsprechend angepasst.</p>
        <input class="f" id="aiChange" placeholder="z. B. ohne Pilze, mit mehr Protein, schärfer">
        <div style="margin-top:14px"><button class="btn full" data-action="ai-recipe-refine-go">Anpassen lassen</button></div>`);
      break;
    case 'ai-recipe-refine-go': {
      const aenderung = document.getElementById('aiChange').value.trim();
      if (!aenderung) { toast('Sag kurz, was anders sein soll'); break; }
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich passe das Rezept an.</div></div>');
      UZSync.invoke('ai', { mode: 'recipe', wish: state._aiWish || '', recipes: DATA.recipes.map(r => r.name), previous: state._aiRecipe, aenderung })
        .then(r => showAiRecipeResult(r.recipe))
        .catch(e => { closeSheet(); toast('Das hat nicht geklappt: ' + e.message); });
      break;
    }
    case 'ai-recipe-save': {
      const rec = state._aiRecipe;
      if (rec && rec.name) {
        const newId = uid();
        DATA.recipes.push({ id: newId, name: rec.name, ing: rec.ing || [], anleitung: rec.anleitung || '' });
        const day = state._aiRecipeForDay;
        if (day) {
          setMeal(day, state._aiRecipeForSlot || 'a', { rid: newId });
          state._aiRecipeForDay = null;
          save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'plan'; render();
          toast('Gespeichert & für ' + fmtShort(day) + ' eingeplant');
          pingPartner('Kochplan', rec.name + ' am ' + fmtShort(day) + ' (neues Rezept)');
        } else {
          save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'rezepte'; render(); toast('Rezept gespeichert');
          pingPartner('Neues Rezept von ' + nameOf(me()), rec.name);
        }
      }
      break;
    }

    /* Uns */
    case 'add-usdate':
      openSheet(`<h2>Besonderer Tag</h2>
        <label class="f">Was feiern wir?</label><input class="f" id="udTitle" placeholder="z. B. Unser Jahrestag">
        <label class="f">Datum</label><input class="f" id="udDate" type="date">
        <div style="margin-top:14px"><button class="btn full" data-action="save-usdate">Speichern</button></div>`);
      break;
    case 'save-usdate': {
      const title = document.getElementById('udTitle').value.trim();
      const date = document.getElementById('udDate').value;
      if (title && date) { DATA.us.dates.push({ id: uid(), title, date }); save(); closeSheet(); render(); }
      break;
    }
    case 'del-usdate': DATA.us.dates = DATA.us.dates.filter(d => d.id !== id); save(); render(); break;
    case 'idea-add': {
      const inp = document.getElementById('ideaInput');
      if (inp.value.trim()) { DATA.us.ideas.push(inp.value.trim()); save(); render(); }
      break;
    }
    case 'idea-del': DATA.us.ideas.splice(+el.dataset.i, 1); save(); render(); break;
    case 'idea-random': {
      if (!DATA.us.ideas.length) { toast('Erst Ideen sammeln'); break; }
      const idea = DATA.us.ideas[Math.floor(Math.random() * DATA.us.ideas.length)];
      openSheet(`<h2>Wie wär's damit?</h2>
        <div class="card sand" style="text-align:center"><div style="font-family:var(--serif);font-style:italic;font-size:21px;padding:10px 0">${esc(idea)}</div></div>
        <div class="frow" style="margin-top:6px">
          <button class="btn ghost" data-action="idea-random">Nochmal würfeln</button>
          <button class="btn" data-action="plan-datenight">Planen</button>
        </div>`);
      break;
    }
    case 'bucket-add': {
      const inp = document.getElementById('bucketInput');
      if (inp.value.trim()) { DATA.us.bucket.push(inp.value.trim()); save(); render(); }
      break;
    }
    case 'bucket-del': DATA.us.bucket.splice(+el.dataset.i, 1); save(); render(); break;
    case 'plan-datenight': openDateNightSheet(); break;
    case 'ai-ideas-open':
      openSheet(`<h2>Date-Ideen von der KI</h2>
        <label class="f">Worauf habt ihr Lust? (optional)</label>
        <input class="f" id="aiIdeaWish" placeholder="z. B. draußen, günstig, was Besonderes …">
        <div style="margin-top:14px"><button class="btn full" data-action="ai-ideas-go">Vorschläge holen</button></div>`);
      break;
    case 'ai-ideas-go': {
      const wishEl = document.getElementById('aiIdeaWish');
      if (wishEl) state._aiIdeaWish = wishEl.value.trim();
      if (!window.UZSync || !UZSync.active()) { toast('Erst anmelden'); break; }
      openSheet('<h2>Einen Moment …</h2><div class="voicebox"><div class="live">Ich sammle schöne Ideen für euch.</div></div>');
      UZSync.invoke('ai', { mode: 'dateideas', wish: state._aiIdeaWish || '', today: todayISO(), recipes: DATA.us.ideas })
        .then(r => {
          const rows = (r.ideas || []).map(i =>
            `<div class="row"><span class="ric">${icon('bulb', 18)}</span>
              <div class="grow"><div class="title" style="font-weight:500">${esc(i)}</div></div>
              <button class="check" data-action="ai-idea-keep" data-text="${esc(i)}" title="Merken">${icon('plus', 14)}</button>
              <button class="check" data-action="ai-idea-plan" data-text="${esc(i)}" title="Als Date-Night planen">${icon('cal', 14)}</button>
            </div>`).join('');
          openSheet(`<h2>Wie wär's damit?</h2>
            <div class="mut" style="margin-bottom:8px">+ merkt die Idee, 📅 plant sie direkt als Date-Night.</div>
            ${rows}
            <div class="frow" style="margin-top:10px">
              <button class="btn ghost" data-action="ai-ideas-go">Andere Vorschläge</button>
              <button class="btn" style="flex:1" data-action="close-sheet">Fertig</button>
            </div>`);
        })
        .catch(e => { openSheet('<h2>Das hat nicht geklappt</h2><p class="mut">' + esc(e.message) + '</p><div style="margin-top:14px"><button class="btn full" data-action="close-sheet">OK</button></div>'); });
      break;
    }
    case 'ai-idea-keep': {
      const txt = el.dataset.text;
      if (!DATA.us.ideas.includes(txt)) { DATA.us.ideas.push(txt); save(); }
      toast('Gemerkt');
      break;
    }
    case 'ai-idea-plan': {
      const txt = el.dataset.text;
      if (!DATA.us.ideas.includes(txt)) { DATA.us.ideas.push(txt); save(); }
      openDateNightSheet(DATA.us.ideas.indexOf(txt));
      break;
    }
    case 'save-datenight': {
      const date = document.getElementById('dnDate').value;
      const time = document.getElementById('dnTime').value;
      const ideaI = +document.getElementById('dnIdea').value;
      const idea = ideaI >= 0 ? DATA.us.ideas[ideaI] : '';
      if (!date) break;
      DATA.events.push({ id: uid(), title: 'Date-Night' + (idea ? ': ' + idea : ''), date, time, who: 'beide' });
      save(); closeSheet(); state.tab = 'kalender'; state.calSel = date; render();
      toast('Date-Night steht!');
      pingPartner('Date-Night geplant', (idea || 'Zeit zu zweit') + ' · ' + fmtShort(date) + (time ? ', ' + time + ' Uhr' : ''));
      break;
    }

    /* Chat */
    case 'chat-send': {
      const inp = document.getElementById('chatInput');
      const txt = inp.value.trim();
      if (txt) {
        const n = new Date();
        DATA.messages.push({ id: uid(), from: me(), text: txt, at: n.toISOString(), ts: WD[(n.getDay() + 6) % 7] + ' ' + String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0') });
        save(); render();
        if (window.UZSync) UZSync.notifyPartner('Nachricht von ' + nameOf(me()), txt.slice(0, 120));
        requestAnimationFrame(() => { window.scrollTo(0, document.body.scrollHeight); const c = document.getElementById('chatInput'); if (c) c.focus(); });
      }
      break;
    }

    /* Einstellungen */
    case 'save-ics':
      // Apple teilt Kalender als webcal:// – das ist derselbe Feed über https
      const normIcs = u => u.trim().replace(/^webcal:\/\//i, 'https://');
      DATA.settings.icsStefan = normIcs(document.getElementById('setIcsStefan').value);
      DATA.settings.icsLinda = normIcs(document.getElementById('setIcsLinda').value);
      save(); refreshIcs(false); break;
    case 'push-on':
      (async () => {
        try {
          await UZSync.enablePush();
          localStorage.setItem('uz-push-done', '1');
          toast('Benachrichtigungen aktiv');
        } catch (e) { toast(e.message); }
        fillPushCard();
      })();
      break;
    case 'push-off':
      (async () => {
        try { await UZSync.disablePush(); toast('Benachrichtigungen aus'); }
        catch (e) { toast(e.message); }
        fillPushCard();
      })();
      break;
    case 'push-test':
      (async () => {
        try {
          const r = await UZSync.testPush();
          toast(r.sent > 0 ? 'Test gesendet – müsste gleich klingeln' : 'Kein registriertes Gerät gefunden');
        } catch (e) { toast(e.message); }
      })();
      break;
    case 'export-data': exportData(); break;
    case 'reset-app':
      openSheet(`<h2>Wirklich alles löschen?</h2>
        <p class="mut">Alle Aufgaben, Termine, Listen und Nachrichten auf diesem Gerät werden entfernt. Vorher lieber ein Backup exportieren.</p>
        <div class="frow" style="margin-top:14px">
          <button class="btn ghost" data-action="close-sheet">Abbrechen</button>
          <button class="btn danger" data-action="reset-app-confirm">Ja, löschen</button>
        </div>`);
      break;
    case 'reset-app-confirm': localStorage.removeItem(DB_KEY); location.reload(); break;
    case 'close-sheet': closeSheet(); break;
    case 'push-prompt-yes':
      (async () => {
        try {
          await UZSync.enablePush();
          localStorage.setItem('uz-push-done', '1');
          closeSheet(); toast('Benachrichtigungen aktiv');
        } catch (e) { closeSheet(); toast(e.message); }
      })();
      break;
    case 'sync-logout': if (window.UZSync) window.UZSync.logout(); break;

    /* Sprachfunktion */
    case 'voice-stop': stopVoiceRecognition(); break;
    case 'voice-text-go': {
      const v = document.getElementById('voiceText').value.trim();
      if (v) understandVoice(v);
      break;
    }
    case 'voice-add-shopping': {
      const items = JSON.parse(el.dataset.items);
      items.forEach(i => addShoppingItem(i));
      closeSheet(); state.tab = 'kueche'; state.kueche = 'list'; render(); toast('Auf der Liste'); break;
    }
    case 'voice-add-meal': {
      const d = document.getElementById('vmDate').value, dish = document.getElementById('vmDish').value.trim();
      if (d && dish) {
        setMeal(d, 'a', { name: dish });
        (window._voiceMealItems || []).forEach(i => addShoppingItem(i));
        window._voiceMealItems = [];
        save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'plan'; render(); toast('Eingeplant');
        pingPartner('Kochplan', dish + ' am ' + fmtShort(d));
      }
      break;
    }
    case 'voice-send-message': {
      const txt = document.getElementById('vgMsg').value.trim();
      if (txt) {
        DATA.messages.push({ id: uid(), from: me(), text: txt, at: new Date().toISOString() });
        save();
        if (window.UZSync) UZSync.notifyPartner('Nachricht von ' + nameOf(me()), txt.slice(0, 120));
        closeSheet(); state.tab = 'chat'; markChatRead(); render();
        requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight));
        toast('Gesendet');
      }
      break;
    }
    case 'voice-pin-note': {
      const txt = document.getElementById('vpNote').value.trim();
      if (txt) {
        DATA.notes[me()] = txt;
        if (!DATA.notesAt) DATA.notesAt = { stefan: '', linda: '' };
        DATA.notesAt[me()] = new Date().toISOString();
        if (!DATA.notesLiked) DATA.notesLiked = { stefan: false, linda: false };
        DATA.notesLiked[me()] = false;
        save();
        if (window.UZSync) UZSync.notifyPartner(nameOf(me()) + ' hat dir einen Zettel an die Pinnwand gehängt', txt.slice(0, 120));
        closeSheet(); state.tab = 'home'; render(); toast('Angepinnt');
      }
      break;
    }
    case 'voice-add-idea': {
      const v = document.getElementById('viIdea').value.trim();
      if (v) { DATA.us.ideas.push(v); save(); closeSheet(); state.tab = 'uns'; render(); toast('Idee gespeichert'); }
      break;
    }
    case 'voice-add-chore': {
      const title = document.getElementById('vcTitle').value.trim();
      if (title) {
        const who = document.getElementById('vcWho').value;
        const rotation = who === 'beide' ? ['stefan', 'linda'] : [who];
        DATA.tasks.push({
          id: uid(), title, freq: document.getElementById('vcFreq').value,
          anchor: toISO(startOfWeek(new Date())), rotation, turn: 0, doneKey: null,
        });
        save(); closeSheet(); state.tab = 'haushalt'; render(); toast('Aufgabe angelegt');
      }
      break;
    }
    case 'voice-add-expense': {
      const amount = parseFloat((document.getElementById('vxAmount').value || '').replace(',', '.'));
      const title = document.getElementById('vxTitle').value.trim() || 'Ausgabe';
      const paidBy = document.getElementById('vxWho').value;
      if (!amount || amount <= 0) { toast('Bitte einen Betrag eingeben'); break; }
      if (!DATA.expenses) DATA.expenses = [];
      DATA.expenses.push({ id: uid(), title, amount: Math.round(amount * 100) / 100, paidBy, date: todayISO(), settled: false });
      save(); closeSheet();
      state.tab = 'haushalt'; state.haushalt = 'finanzen'; render();
      pingPartner(nameOf(paidBy) + ' hat ' + fmtEuro(amount) + ' ausgelegt', title);
      toast('Eingetragen – ' + fmtEuro(amount / 2) + ' pro Person');
      break;
    }
    case 'voice-add-recipe': {
      const name = document.getElementById('vrName').value.trim();
      const ing = document.getElementById('vrIng').value.split('\n').map(s => s.trim()).filter(Boolean);
      const anleitung = (document.getElementById('vrAnleitung') || { value: '' }).value.trim();
      if (name) {
        DATA.recipes.push({ id: uid(), name, ing, anleitung });
        save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'rezepte'; render(); toast('Rezept gespeichert');
        pingPartner('Neues Rezept von ' + nameOf(me()), name);
      }
      break;
    }
    case 'voice-add-event': {
      const title = document.getElementById('veTitle').value.trim();
      const date = document.getElementById('veDate').value;
      if (title && date) {
        DATA.events.push({ id: uid(), title, date, time: document.getElementById('veTime').value, who: document.getElementById('veWho').value });
        save(); closeSheet(); state.tab = 'kalender'; state.calSel = date; render(); toast('Termin eingetragen');
      }
      break;
    }
    case 'voice-add-todo': {
      const title = document.getElementById('vtTitle').value.trim();
      if (title) {
        const who = document.getElementById('vtWho').value;
        DATA.todos.push({ id: uid(), title, who, due: document.getElementById('vtDue').value, done: false });
        save(); closeSheet(); state.tab = 'haushalt'; render(); toast('To-do angelegt');
        if (who === partner() || who === 'beide') pingBatched('todo', 'Neue To-dos für dich', title, 300000);
      }
      break;
    }
  }
}

/* ---------- Outlook laden ---------- */
async function refreshIcs(silent) {
  const jobs = [];
  if (DATA.settings.icsStefan) jobs.push(['stefan', DATA.settings.icsStefan]);
  if (DATA.settings.icsLinda) jobs.push(['linda', DATA.settings.icsLinda]);
  if (!jobs.length) { if (!silent) toast('Keine ICS-Links hinterlegt'); return; }
  let ok = 0, fail = [];
  for (const [who, url] of jobs) {
    try {
      const evs = await fetchICSUrl(url, who);
      replaceIcsEvents(who, evs);
      ok += evs.length;
    } catch (e) {
      // Direktabruf blockiert (CORS)? Über den Server-Proxy versuchen.
      try {
        if (!window.UZSync || !UZSync.active()) throw e;
        const text = await UZSync.fetchIcsProxy(url);
        const evs = parseICS(text, who);
        replaceIcsEvents(who, evs);
        ok += evs.length;
      } catch (e2) { fail.push(nameOf(who)); }
    }
  }
  if (ok || !fail.length) {
    const n = new Date();
    DATA.settings.icsLast = fmtShort(todayISO()) + ' ' + String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
    save();
  }
  render();
  if (fail.length) {
    if (silent) { console.warn('ICS-Refresh fehlgeschlagen für', fail.join(', ')); return; }
    openSheet(`<h2>Kalender teilweise blockiert</h2>
      <p class="mut">Der Kalender von ${esc(fail.join(' & '))} konnte nicht direkt geladen werden – das liegt meist an Browser-Sicherheitsregeln (CORS) oder einem abgelaufenen Link.</p>
      <p class="mut" style="margin-top:8px"><b>Plan B:</b> Kalender in Outlook als .ics-Datei exportieren und über den Datei-Import im Kalender-Tab laden. Mit dem Sync-Server lösen wir das dauerhaft.</p>
      <div style="margin-top:14px"><button class="btn full" data-action="close-sheet">Alles klar</button></div>`);
  } else if (!silent) {
    toast(ok + ' Kalender-Termine geladen');
  }
}

/* ---------- Ereignis-Verkabelung ---------- */
document.addEventListener('click', e => {
  if (window._justDropped && Date.now() - window._justDropped < 450) return; // Klick nach Drag verschlucken
  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) { state.tab = tabBtn.dataset.tab; render(); return; }
  const el = e.target.closest('[data-action]');
  if (el) handleAction(el.dataset.action, el);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const map = { shopInput: 'shop-add', chatInput: 'chat-send', todoInput: 'todo-add', ideaInput: 'idea-add', bucketInput: 'bucket-add' };
  const act = map[e.target.id];
  if (act) { e.preventDefault(); handleAction(act, e.target); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'recipeSearch') {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('[data-recipe-row]').forEach(r => {
      r.style.display = !q || r.dataset.search.includes(q) ? '' : 'none';
    });
  }
  if (e.target.id === 'mealSearch') {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('#sheet [data-meal-row]').forEach(r => {
      r.style.display = !q || r.dataset.search.includes(q) ? '' : 'none';
    });
  }
});
document.addEventListener('change', e => {
  if (e.target.id === 'icsFileStefan' || e.target.id === 'icsFileLinda') {
    const who = e.target.id === 'icsFileStefan' ? 'stefan' : 'linda';
    const file = e.target.files[0];
    if (!file) return;
    const rd = new FileReader();
    rd.onload = () => {
      const evs = parseICS(rd.result, who);
      replaceIcsEvents(who, evs);
      render(); toast(evs.length + ' Termine importiert');
    };
    rd.readAsText(file);
  }
  if (e.target.id === 'importFile') {
    const file = e.target.files[0];
    if (file) importData(file, ok => { if (ok) { render(); toast('Backup geladen'); } else toast('Datei ungültig'); });
  }
  if (e.target.id === 'setMe') { DATA.settings.me = e.target.value; save(); toast('Hallo ' + nameOf(me()) + '!'); }
});
document.getElementById('sheetBackdrop').addEventListener('click', () => { stopVoiceRecognition(); closeSheet(); });
document.getElementById('micBtn').addEventListener('click', startVoice);

/* iOS-PWA-Bug: Nach dem Fortsetzen aus dem Hintergrund verankert Safari fixierte
   Elemente falsch – die Leiste „wandert“ dann beim Scrollen mit nach oben.
   Abhilfe: bei jedem Aufwachen ein Neuzeichnen der Leisten erzwingen. */
function repaintBars() {
  document.body.classList.remove('kbopen');
  for (const id of ['tabbar', 'micBtn']) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.style.display = 'none';
    void el.offsetHeight;            // Reflow erzwingen
    el.style.display = '';
  }
  // Viewport neu verankern (gleiche Position, zwingt iOS zum Neuberechnen)
  window.scrollTo(window.scrollX, window.scrollY + 1);
  window.scrollTo(window.scrollX, window.scrollY - 1);
}
window.addEventListener('pageshow', repaintBars);
window.addEventListener('focus', () => setTimeout(repaintBars, 60));
document.addEventListener('visibilitychange', () => { if (!document.hidden) setTimeout(repaintBars, 60); });

/* Bildschirm-Tastatur erkennen (iOS): solange sie offen ist, Leiste + Mikro verstecken */
if (window.visualViewport) {
  const vv = window.visualViewport;
  const onVV = () => {
    const kbOffen = window.innerHeight - vv.height > 100;
    document.body.classList.toggle('kbopen', kbOffen);
  };
  vv.addEventListener('resize', onVV);
  vv.addEventListener('scroll', onVV);
} else {
  // Fallback für ältere Browser: bei Fokus auf Eingabefelder ausblenden
  document.addEventListener('focusin', e => {
    if (e.target.matches('input[type="text"], input:not([type]), textarea, input[type="search"]')) document.body.classList.add('kbopen');
  });
  document.addEventListener('focusout', () => setTimeout(() => document.body.classList.remove('kbopen'), 150));
}

/* ---------- Ziehen & Zuschieben: Karten zwischen den Spalten ---------- */
let _drag = null;

function dragStart(x, y) {
  if (!_drag || _drag.active) return;
  _drag.active = true;
  const r = _drag.card.getBoundingClientRect();
  const ghost = _drag.card.cloneNode(true);
  Object.assign(ghost.style, {
    position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px',
    zIndex: 999, pointerEvents: 'none', margin: 0,
    transform: 'rotate(2deg) scale(1.04)', boxShadow: '0 12px 26px rgba(47,50,34,0.3)', opacity: 0.96,
  });
  document.body.appendChild(ghost);
  _drag.ghost = ghost;
  _drag.dx = x - r.left; _drag.dy = y - r.top;
  _drag.card.style.opacity = '0.35';
  if (navigator.vibrate) { try { navigator.vibrate(10); } catch (e) {} }
  document.querySelectorAll('[data-col]').forEach(c => c.classList.add('droppable'));
}
function dragColAt(x, y, slack = 0) {
  // Robust über Rechteck-Vergleich statt elementFromPoint;
  // mit slack wird notfalls die nächstgelegene Spalte genommen (großzügiger Drop)
  let best = null, bestDist = Infinity;
  for (const c of document.querySelectorAll('[data-col]')) {
    const r = c.getBoundingClientRect();
    if (x >= r.left - 4 && x <= r.right + 4 && y >= r.top - 8 && y <= r.bottom + 8) return c.dataset.col;
    if (slack) {
      const ox = x < r.left ? r.left - x : (x > r.right ? x - r.right : 0);
      const oy = y < r.top ? r.top - y : (y > r.bottom ? y - r.bottom : 0);
      const d = Math.hypot(ox, oy);
      if (d < slack && d < bestDist) { bestDist = d; best = c.dataset.col; }
    }
  }
  return best;
}
function dragCancel() {
  if (!_drag) return;
  clearTimeout(_drag.timer);
  if (_drag.ghost) _drag.ghost.remove();
  if (_drag.card) _drag.card.style.opacity = '';
  document.querySelectorAll('[data-col]').forEach(c => c.classList.remove('droppable', 'dropover'));
  _drag = null;
}
function dragDrop(col) {
  if (_drag.kind === 'todo') {
    const t = DATA.todos.find(x => x.id === _drag.id);
    if (t && (t.who || 'beide') !== col) {
      t.who = col;
      save(); render();
      toast(col === 'beide' ? 'Wieder gemeinsam' : nameOf(col) + ' übernimmt');
      if (col === partner()) pingBatched('todo', 'Neue To-dos für dich', t.title, 300000);
    }
  } else if (_drag.kind === 'task' && col !== 'beide') {
    const t = DATA.tasks.find(x => x.id === _drag.id);
    if (t && taskWho(t) !== col) {
      const idx = t.rotation.indexOf(col);
      if (idx >= 0) t.turn = idx;
      else { t.rotation = [col]; t.turn = 0; }
      save(); render();
      toast(nameOf(col) + ' übernimmt „' + t.title + '“');
      if (col === partner()) pingBatched('todo', 'Neue To-dos für dich', t.title, 300000);
    }
  }
}

document.addEventListener('pointerdown', e => {
  if (state.tab !== 'haushalt') return;
  const card = e.target.closest('[data-drag-kind]');
  if (!card || e.target.closest('.check')) return; // Abhaken bleibt Abhaken
  _drag = {
    card, id: card.dataset.dragId, kind: card.dataset.dragKind,
    x0: e.clientX, y0: e.clientY, active: false,
  };
  _drag.timer = setTimeout(() => dragStart(_drag.x0, _drag.y0), 350); // gedrückt halten
});
document.addEventListener('pointermove', e => {
  if (!_drag) return;
  const dx = e.clientX - _drag.x0, dy = e.clientY - _drag.y0;
  if (!_drag.active) {
    // Seitliches Wischen startet das Ziehen sofort; senkrecht = normales Scrollen
    if (Math.abs(dx) > 16 && Math.abs(dx) > Math.abs(dy) * 1.4) { clearTimeout(_drag.timer); dragStart(e.clientX, e.clientY); }
    else if (Math.abs(dy) > 14) dragCancel();
    return;
  }
  e.preventDefault();
  _drag.lastX = e.clientX; _drag.lastY = e.clientY;
  _drag.ghost.style.left = (e.clientX - _drag.dx) + 'px';
  _drag.ghost.style.top = (e.clientY - _drag.dy) + 'px';
  // Sanft mitscrollen, wenn man an den Rand zieht (z. B. runter zu „Gemeinsame To-dos“)
  if (e.clientY > window.innerHeight - 90) window.scrollBy(0, 10);
  else if (e.clientY < 90) window.scrollBy(0, -10);
  const col = dragColAt(e.clientX, e.clientY, 60);
  document.querySelectorAll('[data-col]').forEach(c => c.classList.toggle('dropover', c.dataset.col === col));
}, { passive: false });
document.addEventListener('pointerup', e => {
  if (!_drag) return;
  clearTimeout(_drag.timer);
  const wasActive = _drag.active;
  if (wasActive) {
    window._justDropped = Date.now();
    const col = dragColAt(e.clientX, e.clientY, 60);
    if (col) dragDrop(col);
    e.preventDefault();
  }
  dragCancel();
});
document.addEventListener('pointercancel', e => {
  // Bricht das System die Geste ab (z. B. weil iOS doch scrollt), zählt die
  // letzte bekannte Position trotzdem als Drop – so geht nichts „auf halber Strecke“ verloren
  if (_drag && _drag.active) {
    window._justDropped = Date.now();
    const col = dragColAt(_drag.lastX ?? e.clientX, _drag.lastY ?? e.clientY, 60);
    if (col) dragDrop(col);
  }
  dragCancel();
});
// iOS: sobald das Ziehen aktiv ist, natives Scrollen unterbinden –
// sonst bricht Safari die Geste mit pointercancel ab.
document.addEventListener('touchmove', e => {
  if (_drag && _drag.active) e.preventDefault();
}, { passive: false });
document.addEventListener('contextmenu', e => {
  if (_drag) e.preventDefault(); // Kontextmenü beim Gedrückthalten unterdrücken
});

/* ---------- Erinnerungen (bei geöffneter App) ---------- */
function maybeNotify() {
  /* Bewusst abgeschaltet: Die lokale „du bist dran“-Meldung feuerte bei jedem
     App-Öffnen neu (der Tagesmerker wurde vom Cloud-Sync überschrieben) und
     nervte. Aufgaben-Erinnerung kommt jetzt NUR noch 1× im Morgen-Push. */
}

/* ---------- Push-Hinweis beim App-Start ---------- */
async function maybePushPrompt() {
  try {
    if (!window.UZSync || !UZSync.active()) return;
    if (!('Notification' in window) || !('PushManager' in window) || !('serviceWorker' in navigator)) return;
    if (localStorage.getItem('uz-push-done')) return;
    if (Notification.permission === 'denied') return;
    if (Notification.permission === 'granted') {
      // Erlaubnis besteht schon (z. B. nach Neuinstallation) – Gerät still neu registrieren
      await UZSync.enablePush();
      localStorage.setItem('uz-push-done', '1');
      return;
    }
    if (window._pushPromptShown) return;
    window._pushPromptShown = true;
    openSheet(`
      <h2>Benachrichtigungen aktivieren?</h2>
      <p class="mut">Dann meldet sich die App, wenn ${esc(nameOf(partner()))} dir schreibt oder etwas ans Schwarze Brett hängt – und jeden Morgen mit deinen Aufgaben und dem Abendessen.</p>
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
        <button class="btn full" data-action="push-prompt-yes">${icon('bell', 16)} Jetzt aktivieren</button>
        <button class="btn ghost small full" data-action="close-sheet">Später</button>
      </div>`);
  } catch (e) { console.warn('Push-Hinweis übersprungen:', e.message); }
}

if (cleanupHolidayIcs()) save();
if (typeof trainingCleanup === 'function' && trainingCleanup()) save();

/* Basis-Rezepte einspielen (ohne Dubletten) – läuft auch nach jedem Cloud-Sync,
   damit ein älterer Datenstand aus der Cloud die Rezepte nicht wieder verdrängt */
function ensureBaseRecipes() {
  let changed = false;
  const howto = typeof BASE_ANLEITUNGEN !== 'undefined' ? BASE_ANLEITUNGEN : {};
  const have = new Set(DATA.recipes.map(r => r.name.toLowerCase()));
  const add = list => {
    for (const [name, ing] of list) {
      if (!have.has(name.toLowerCase())) { DATA.recipes.push({ id: uid(), name, ing, anleitung: howto[name] || '' }); have.add(name.toLowerCase()); changed = true; }
    }
  };
  if (!DATA.settings.recipeBaseV1) { add(BASE_RECIPES); DATA.settings.recipeBaseV1 = true; changed = true; }
  if (!DATA.settings.recipeBaseV2) { add(BASE_RECIPES_2); DATA.settings.recipeBaseV2 = true; changed = true; }
  // Zubereitungen nachtragen, wo sie noch fehlen (auch für schon eingespielte Rezepte)
  for (const r of DATA.recipes) {
    if (!r.anleitung && howto[r.name]) { r.anleitung = howto[r.name]; changed = true; }
  }
  return changed;
}
if (ensureBaseRecipes()) save();

render();
maybeNotify();

/* Outlook automatisch aktuell halten: beim Start und alle 30 Minuten */
if (navigator.onLine) refreshIcs(true);
setInterval(() => { if (navigator.onLine) refreshIcs(true); }, 30 * 60 * 1000);
