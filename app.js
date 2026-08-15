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
};
function icon(n, s = 20) {
  return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n] || ''}</svg>`;
}

const state = { tab: 'home', calY: null, calM: null, calSel: todayISO(), kueche: 'plan' };

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
function whoChip(who) {
  const lbl = who === 'beide' ? 'Beide' : nameOf(who);
  return '<span class="chip ' + esc(who) + '">' + esc(lbl) + '</span>';
}
function emptyState(ic, text) {
  return `<div class="empty"><span class="eicon">${icon(ic, 30)}</span>${text}</div>`;
}

/* ---------- Render ---------- */
function render() {
  document.body.classList.toggle('chatmode', state.tab === 'chat');
  if (state.tab === 'chat' && unreadCount() > 0) markChatRead(); // im offenen Chat gilt alles als gelesen
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === state.tab));
  const v = document.getElementById('view');
  const views = { home: renderHome, haushalt: renderHaushalt, kalender: renderKalender, kueche: renderKueche, uns: renderUns, chat: renderChat, settings: renderSettings };
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
  if (navigator.setAppBadge) {
    const n = openTasks().length + DATA.todos.filter(t => !t.done).length + unreadCount();
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
  const meal = DATA.meals[today];
  const dueMine = openTasks().filter(t => taskWho(t) === me());
  const shopOpen = DATA.shopping.filter(i => !i.done).length;
  const next = nextEvents(10).filter(mine)[0];
  const msgs = DATA.messages.slice(-2);

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
    html += `<div class="note-paper">
      <span class="pin">${heartPin}</span>
      <div class="note-from">Für dich, von ${esc(nameOf(partner()))}</div>
      <div class="note-text">${esc(pn)}</div>
    </div>`;
  }
  if (myNote) {
    html += `<div class="note-paper mine" data-action="edit-note">
      <span class="tape"></span>
      <div class="note-from">Dein Zettel für ${esc(nameOf(partner()))}</div>
      <div class="note-text">${esc(myNote)}</div>
      <div class="note-hint">hängt noch ${noteDaysLeft(me())} Tage · tippen zum Ändern</div>
    </div>`;
  } else {
    html += `<button class="btn ghost small" data-action="edit-note">${icon('pen', 15)} Zettel für ${esc(nameOf(partner()))} anpinnen</button>`;
  }

  html += `<h2 class="sect">Auf einen Blick</h2>
  <div class="stat">
    <div class="card" data-action="go-haushalt"><div class="num">${dueMine.length}</div><div class="lbl">Aufgaben für dich</div></div>
    <div class="card" data-action="go-einkauf"><div class="num">${shopOpen}</div><div class="lbl">auf der Liste</div></div>
    <div class="card" data-action="go-kalender"><div class="num">${next ? Math.max(0, daysUntil(next.date)) : '–'}</div><div class="lbl">${next ? 'Tage bis „' + esc(next.title.slice(0, 14)) + '“' : 'keine Termine'}</div></div>
  </div>`;

  html += `<h2 class="sect">Heute</h2>`;
  let anyToday = false;
  for (const e of evToday) {
    anyToday = true;
    html += `<div class="row"><span class="ric">${icon(e.src === 'ics' ? 'case' : 'cal', 18)}</span><div class="grow"><div class="title">${esc(e.title)}</div><div class="meta">${e.time ? esc(e.time) + ' Uhr · ' : ''}${e.src === 'ics' ? 'Outlook · ' : ''}${e.who === 'beide' ? 'Wir beide' : esc(nameOf(e.who))}</div></div></div>`;
  }
  if (meal) {
    anyToday = true;
    html += `<div class="row" data-action="go-kueche"><span class="ric">${icon('pot', 18)}</span><div class="grow"><div class="title">${esc(mealName(meal))}</div><div class="meta">Heute Abend auf dem Kochplan</div></div></div>`;
  }
  for (const t of dueMine.slice(0, 3)) {
    anyToday = true;
    html += taskRow(t);
  }
  if (!anyToday) html += emptyState('star', 'Für dich steht heute nichts an – genieß den Tag!');

  const un = unreadCount();
  html += `<h2 class="sect">Nachrichten${un ? ' <span class="unread inline">' + un + ' neu</span>' : ''} <span class="more" data-action="open-chat">alle ansehen</span></h2>`;
  if (msgs.length) {
    for (const m of msgs) {
      html += `<div class="row" data-action="open-chat"><span class="ric">${icon('mail', 18)}</span><div class="grow"><div class="title" style="font-weight:500">${esc(m.text)}</div><div class="meta">${esc(nameOf(m.from))}</div></div></div>`;
    }
  } else {
    html += `<div class="card" data-action="open-chat"><div class="hint">Noch keine Nachrichten – schreib ${esc(nameOf(partner()))} etwas Liebes.</div></div>`;
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
      <div class="meta">${FREQ_LABEL[t.freq] || ''}${t.rotation.length > 1 ? ' · im Wechsel' : ''}</div>
    </div>
    ${whoChip(taskWho(t))}
  </div>`;
}

/* ---------- Haushalt ---------- */
function taskMini(t) {
  const done = taskIsDone(t);
  return `<div class="task-mini ${done ? 'done' : ''}">
    <button class="check ${done ? 'on' : ''}" data-action="toggle-task" data-id="${t.id}">${icon('check', 13)}</button>
    <div class="grow" data-action="edit-task" data-id="${t.id}">
      <div class="title">${esc(t.title)}</div>
      <div class="meta">${FREQ_LABEL[t.freq] || ''}${t.rotation.length > 1 ? ' · Wechsel' : ''}</div>
    </div>
  </div>`;
}

function todoMini(t) {
  return `<div class="task-mini ${t.done ? 'done' : ''}">
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
  const open = DATA.tasks.filter(t => !taskIsDone(t));
  const done = DATA.tasks.filter(t => taskIsDone(t));
  let html = `<div class="pagehead"><div><h1 class="page">Haushalt</h1><div class="sub">Wer macht was – fair im Wechsel</div></div>
    <button class="iconbtn" data-action="add-task">${icon('plus', 19)}</button></div>`;

  html += `<h2 class="sect">Jetzt fällig</h2>`;
  const tdOf = p => DATA.todos.filter(t => !t.done && (t.who || 'beide') === p);
  if (open.length || tdOf('stefan').length || tdOf('linda').length) {
    const st = open.filter(t => taskWho(t) === 'stefan');
    const li = open.filter(t => taskWho(t) === 'linda');
    html += `<div class="duo">
      <div>
        <div class="colhead stefan">Stefan</div>
        ${st.map(taskMini).join('') + tdOf('stefan').map(todoMini).join('') || '<div class="hint" style="padding:4px 2px">Nichts offen – stark!</div>'}
      </div>
      <div>
        <div class="colhead linda">Linda</div>
        ${li.map(taskMini).join('') + tdOf('linda').map(todoMini).join('') || '<div class="hint" style="padding:4px 2px">Nichts offen – stark!</div>'}
      </div>
    </div>`;
  } else {
    html += emptyState('star', 'Alles erledigt – ihr seid ein Traumteam!');
  }

  if (done.length) {
    html += `<h2 class="sect">Schon erledigt</h2>` + done.map(taskRow).join('');
  }

  html += `<h2 class="sect">Gemeinsame To-dos</h2>
  <div class="addbar"><input class="f" id="todoInput" placeholder="Neues To-do …"><button class="btn" data-action="todo-add">${icon('plus', 17)}</button></div>
  <div class="mut" style="margin:2px 2px 8px">Neue To-dos landen hier – antippen, um sie Stefan oder Linda zuzuschieben.</div>`;
  for (const t of DATA.todos.filter(t => !t.done && (t.who || 'beide') === 'beide')) {
    html += `<div class="row">
      <button class="check" data-action="todo-toggle" data-id="${t.id}">${icon('check', 15)}</button>
      <div class="grow" data-action="todo-assign" data-id="${t.id}"><div class="title">${esc(t.title)}</div><div class="meta">${t.due ? 'bis ' + esc(fmtShort(t.due)) : 'gemeinsam'}</div></div>
      <span class="chip beide" data-action="todo-assign" data-id="${t.id}" style="cursor:pointer">Beide</span>
    </div>`;
  }
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
    <label class="f">Rhythmus</label>
    <select class="f" id="tkFreq">
      <option value="daily" ${t && t.freq === 'daily' ? 'selected' : ''}>täglich</option>
      <option value="weekly" ${!t || t.freq === 'weekly' ? 'selected' : ''}>jede Woche</option>
      <option value="biweekly" ${t && t.freq === 'biweekly' ? 'selected' : ''}>alle 2 Wochen</option>
      <option value="monthly" ${t && t.freq === 'monthly' ? 'selected' : ''}>jeden Monat</option>
    </select>
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

/* ---------- Kalender ---------- */
const WHO_COLOR = w => w === 'linda' ? 'var(--clay)' : w === 'stefan' ? 'var(--olive)' : '#3E7C7B';

function calLegend() {
  return `<div class="legend">
    <span><i class="dot stefan"></i>Stefan</span>
    <span><i class="dot linda"></i>Linda</span>
    <span><i class="dot beide"></i>Gemeinsam</span>
    <span style="display:inline-flex;align-items:center;gap:4px">${icon('case', 13)} Outlook</span>
  </div>`;
}

function calEvRow(e, compact) {
  return `<div class="row" style="border-left:4px solid ${WHO_COLOR(e.who)};${compact ? 'padding:9px 12px;margin-bottom:6px' : ''}">
    <span class="ric">${icon(e.src === 'ics' ? 'case' : 'cal', compact ? 16 : 18)}</span>
    <div class="grow" ${e.src !== 'ics' ? 'data-action="edit-event" data-id="' + e.id + '"' : ''}><div class="title" ${compact ? 'style="font-size:14px"' : ''}>${esc(e.title)}</div>
    <div class="meta">${e.time ? esc(e.time) + ' Uhr · ' : ''}${e.src === 'ics' ? 'Outlook-Termin' : 'eingetragen'} · ${e.who === 'beide' ? 'gemeinsam' : esc(nameOf(e.who))}${e.repeat ? ' · ↻ ' + REPEAT_LABEL[e.repeat] : ''}</div></div>
    ${whoChip(e.who)}
    ${e.src !== 'ics' ? '<button class="check" data-action="del-event" data-id="' + e.id + '" style="border-color:#E0C4B8;color:#A54B32">' + icon('x', 13) + '</button>' : ''}
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
        `<div class="wev"><i class="dot ${e.who === 'linda' ? 'linda' : e.who === 'stefan' ? 'stefan' : 'beide'}"></i>${e.time ? '<b>' + esc(e.time) + '</b> ' : ''}${esc(e.title)}${e.src === 'ics' ? ' <span class="mut">· Outlook</span>' : ''}</div>`
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
    const m = DATA.meals[iso];
    const wegAbends = ['stefan', 'linda'].filter(p => !isPresent(iso, p, 'a'));
    const hinweis = wegAbends.length === 2
      ? '<span class="sm" style="color:var(--clay)">Beide abends unterwegs</span>'
      : wegAbends.length === 1
        ? '<span class="sm" style="color:var(--clay)">' + nameOf(wegAbends[0]) + ' ist abends nicht da</span>'
        : '';
    html += `<div class="mealday ${iso === today ? 'today' : ''}">
      <div class="d"><span class="w">${WD[(d.getDay() + 6) % 7]}</span><span class="n">${d.getDate()}</span></div>
      <button class="slot ${m ? 'filled' : ''}" data-action="meal-slot" data-iso="${iso}">
        ${m ? esc(mealName(m)) + (m.rid ? '<span class="sm">Rezept hinterlegt – antippen für Zutaten</span>' : '') : 'Was kochen wir?'}
        ${hinweis}
      </button>
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

function openMealSheet(iso) {
  const m = DATA.meals[iso];
  const recipeRows = DATA.recipes.map(r =>
    `<div class="row" data-action="meal-set" data-iso="${iso}" data-rid="${r.id}">
      <span class="ric">${icon('pot', 18)}</span>
      <div class="grow"><div class="title">${esc(r.name)}</div><div class="meta">${r.ing.length} Zutaten</div></div>
    </div>`).join('');
  openSheet(`
    <h2>${esc(fmtNice(iso))}</h2>
    ${m ? '<div class="card sand"><b>' + esc(mealName(m)) + '</b> ist eingeplant.</div>' : ''}
    ${m && m.rid ? '<button class="btn full" style="margin-bottom:8px" data-action="meal-shop" data-rid="' + m.rid + '">' + icon('cart', 16) + ' Zutaten auf die Einkaufsliste</button><button class="btn ghost small full" style="margin-bottom:8px" data-action="recipe-detail" data-id="' + m.rid + '">Rezept ansehen (einzelne Zutaten)</button>' : ''}
    ${m ? '<button class="btn ghost small full" style="margin-bottom:14px" data-action="meal-clear" data-iso="' + iso + '">Eintrag entfernen</button>' : ''}
    <button class="btn ghost small full" data-action="meal-roll" data-iso="${iso}">${icon('dice', 16)} Vorschlag würfeln</button>
    <button class="btn ghost small full" style="margin-top:8px" data-action="ai-recipe-open" data-iso="${iso}">${icon('spark', 16)} Rezept mit KI erfinden</button>
    <label class="f">Freitext (z. B. „Reste essen“, „Essen gehen“)</label>
    <div class="addbar"><input class="f" id="mealText" placeholder="Gericht eintippen …"><button class="btn" data-action="meal-set-text" data-iso="${iso}">OK</button></div>
    <label class="f">Oder ein Rezept wählen</label>
    ${recipeRows}
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
function openAddRecipeSheet(id) {
  const r = id ? DATA.recipes.find(x => x.id === id) : null;
  openSheet(`
    <h2>${r ? 'Rezept bearbeiten' : 'Neues Rezept'}</h2>
    <label class="f">Name</label>
    <input class="f" id="rcName" value="${r ? esc(r.name) : ''}" placeholder="z. B. Lasagne">
    <label class="f">Zutaten (eine pro Zeile)</label>
    <textarea class="f" id="rcIng" placeholder="Lasagneplatten&#10;Hackfleisch&#10;Passierte Tomaten">${r ? esc(r.ing.join('\n')) : ''}</textarea>
    <label class="f">Zubereitung (optional – wie macht ihr's?)</label>
    <textarea class="f" id="rcHow" style="min-height:110px" placeholder="1. Ofen vorheizen …&#10;2. …">${r && r.anleitung ? esc(r.anleitung) : ''}</textarea>
    <div style="margin-top:14px"><button class="btn full" data-action="save-recipe" data-id="${r ? r.id : ''}">Speichern</button></div>
  `);
}

/* ---------- Uns ---------- */
function renderUns() {
  let html = `<div class="pagehead"><div><h1 class="page">Für uns</h1><div class="sub">Mehr als nur Haushalt</div></div></div>`;

  html += `<div class="card olive" data-action="plan-datenight">
    <h3 style="display:flex;align-items:center;gap:8px">${icon('moon', 18)} Date-Night planen</h3>
    <div class="sub">Abend aussuchen, Idee würfeln, Essen einplanen – fertig.</div>
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

  <h2 class="sect">Outlook-Kalender</h2>
  <div class="card">
    <div class="hint" style="margin-bottom:10px">In Outlook (Web): Einstellungen → Kalender → <b>Freigegebene Kalender</b> → „Kalender veröffentlichen“ → den <b>ICS-Link</b> kopieren und hier einfügen. Die Termine werden dann bei jedem App-Start und alle 30 Minuten automatisch aktualisiert.</div>
    <label class="f">Stefans ICS-Link</label>
    <input class="f" id="setIcsStefan" value="${esc(DATA.settings.icsStefan)}" placeholder="https://outlook.office365.com/…/calendar.ics">
    <label class="f">Lindas ICS-Link</label>
    <input class="f" id="setIcsLinda" value="${esc(DATA.settings.icsLinda)}" placeholder="https://outlook.office365.com/…/calendar.ics">
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
    case 'go-haushalt': state.tab = 'haushalt'; render(); break;
    case 'go-kalender': state.tab = 'kalender'; render(); break;
    case 'go-kueche': state.tab = 'kueche'; state.kueche = 'plan'; render(); break;
    case 'go-einkauf': state.tab = 'kueche'; state.kueche = 'list'; render(); break;

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
      save(); closeSheet(); render(); toast('Zettel abgenommen'); break;
    case 'save-note':
      DATA.notes[me()] = document.getElementById('noteText').value.trim();
      if (!DATA.notesAt) DATA.notesAt = { stefan: '', linda: '' };
      DATA.notesAt[me()] = DATA.notes[me()] ? new Date().toISOString() : '';
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
      const t = id ? DATA.tasks.find(x => x.id === id) : null;
      if (t) { Object.assign(t, { title, freq, rotation: rot, turn: t.turn % rot.length }); }
      else DATA.tasks.push({ id: uid(), title, freq, anchor: toISO(startOfWeek(new Date())), rotation: rot, turn: 0, doneKey: null });
      save(); closeSheet(); render(); break;
    }
    case 'del-task': DATA.tasks = DATA.tasks.filter(x => x.id !== id); save(); closeSheet(); render(); break;
    case 'todo-add': {
      const inp = document.getElementById('todoInput');
      if (inp.value.trim()) { DATA.todos.push({ id: uid(), title: inp.value.trim(), who: 'beide', due: '', done: false }); save(); render(); }
      break;
    }
    case 'todo-toggle': { const t = DATA.todos.find(x => x.id === id); if (t) { t.done = !t.done; save(); render(); } break; }
    case 'todo-assign': openTodoSheet(id); break;
    case 'todo-set-who': {
      const t = DATA.todos.find(x => x.id === id);
      if (t) { t.who = el.dataset.w; save(); openTodoSheet(id); }
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
      const fields = { title, date, time: document.getElementById('evTime').value, who: document.getElementById('evWho').value, repeat: document.getElementById('evRepeat').value };
      const ev = id ? DATA.events.find(e => e.id === id) : null;
      if (ev) Object.assign(ev, fields);
      else DATA.events.push({ id: uid(), ...fields });
      state.calSel = date;
      save(); closeSheet(); render(); toast(ev ? 'Termin geändert' : 'Termin eingetragen'); break;
    }
    case 'del-event': DATA.events = DATA.events.filter(x => x.id !== id); save(); render(); break;
    case 'del-event-sheet': DATA.events = DATA.events.filter(x => x.id !== id); save(); closeSheet(); render(); toast('Termin gelöscht'); break;
    case 'ics-refresh': refreshIcs(false); break;

    /* Küche */
    case 'kseg': state.kueche = el.dataset.v; render(); break;
    case 'presence-open': openPresenceSheet(); break;
    case 'presence-toggle':
      setPresence(el.dataset.iso, me(), el.dataset.slot, !isPresent(el.dataset.iso, me(), el.dataset.slot));
      openPresenceSheet();
      break;
    case 'meal-slot': openMealSheet(el.dataset.iso); break;
    case 'meal-set': DATA.meals[el.dataset.iso] = { rid: el.dataset.rid }; save(); closeSheet(); render(); break;
    case 'meal-set-text': {
      const v = document.getElementById('mealText').value.trim();
      if (v) { DATA.meals[el.dataset.iso] = { name: v }; save(); closeSheet(); render(); }
      break;
    }
    case 'meal-clear': delete DATA.meals[el.dataset.iso]; save(); closeSheet(); render(); break;
    case 'meal-roll': {
      const r = suggestRecipe();
      if (!r) { toast('Erst Rezepte anlegen'); break; }
      DATA.meals[el.dataset.iso] = { rid: r.id };
      save(); render(); openMealSheet(el.dataset.iso); toast('Vorschlag: ' + r.name);
      break;
    }
    case 'meal-fill': {
      let filled = 0;
      for (let i = 0; i < 14; i++) {
        const iso = toISO(addDays(new Date(), i));
        if (!DATA.meals[iso]) {
          const r = suggestRecipe();
          if (r) { DATA.meals[iso] = { rid: r.id }; filled++; }
        }
      }
      save(); render();
      toast(filled ? filled + ' Tage vorgeschlagen – tausch aus, was nicht passt' : 'Alle Tage sind schon geplant');
      break;
    }
    case 'meal-shop': {
      const r = DATA.recipes.find(x => x.id === el.dataset.rid);
      if (r) { addRecipeToShopping(r); closeSheet(); toast('Zutaten auf der Liste'); render(); }
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
      chosen.forEach(n => { addShoppingItem(n) === 'exists' ? dup++ : added++; });
      closeSheet(); render();
      toast(added + ' auf der Liste' + (dup ? ' · ' + dup + ' war(en) schon drauf' : ''));
      break;
    }
    case 'shop-add': {
      const inp = document.getElementById('shopInput');
      if (inp.value.trim()) {
        const res = addShoppingItem(inp.value);
        if (res === 'exists') toast('Steht schon auf der Liste');
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
        else DATA.recipes.push({ id: uid(), name, ing, anleitung });
        save(); closeSheet(); render();
      }
      break;
    }
    case 'edit-recipe': openAddRecipeSheet(id); break;
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
        .then(r => {
          const rec = r.recipe;
          state._aiRecipe = rec;
          openSheet(`<h2>${esc(rec.name)}</h2>
            ${rec.ing.map(i => '<div class="row"><div class="grow"><div class="title" style="font-weight:500">' + esc(i) + '</div><div class="meta">' + esc(guessCat(i)) + '</div></div></div>').join('')}
            ${rec.anleitung ? '<h2 style="font-size:17px;margin:14px 0 8px">Zubereitung</h2><div class="card" style="white-space:pre-wrap;font-size:14.5px;line-height:1.5">' + esc(rec.anleitung) + '</div>' : ''}
            <div style="margin-top:12px;display:flex;gap:8px">
              <button class="btn ghost" data-action="ai-recipe-go">Anderer Vorschlag</button>
              <button class="btn" style="flex:1" data-action="ai-recipe-save">Speichern</button>
            </div>`);
        })
        .catch(e => {
          openSheet(`<h2>Das hat nicht geklappt</h2>
            <p class="mut">${e.status === 503 ? 'Die KI ist noch nicht eingerichtet – der Claude-API-Schlüssel fehlt auf dem Server.' : esc(e.message)}</p>
            <div style="margin-top:14px"><button class="btn full" data-action="close-sheet">OK</button></div>`);
        });
      break;
    }
    case 'ai-recipe-save': {
      const rec = state._aiRecipe;
      if (rec && rec.name) {
        const newId = uid();
        DATA.recipes.push({ id: newId, name: rec.name, ing: rec.ing || [], anleitung: rec.anleitung || '' });
        const day = state._aiRecipeForDay;
        if (day) {
          DATA.meals[day] = { rid: newId };
          state._aiRecipeForDay = null;
          save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'plan'; render();
          toast('Gespeichert & für ' + fmtShort(day) + ' eingeplant');
        } else {
          save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'rezepte'; render(); toast('Rezept gespeichert');
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
      toast('Date-Night steht!'); break;
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
      DATA.settings.icsStefan = document.getElementById('setIcsStefan').value.trim();
      DATA.settings.icsLinda = document.getElementById('setIcsLinda').value.trim();
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
        DATA.meals[d] = { name: dish };
        (window._voiceMealItems || []).forEach(i => addShoppingItem(i));
        window._voiceMealItems = [];
        save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'plan'; render(); toast('Eingeplant');
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
    case 'voice-add-recipe': {
      const name = document.getElementById('vrName').value.trim();
      const ing = document.getElementById('vrIng').value.split('\n').map(s => s.trim()).filter(Boolean);
      if (name) {
        DATA.recipes.push({ id: uid(), name, ing });
        save(); closeSheet(); state.tab = 'kueche'; state.kueche = 'rezepte'; render(); toast('Rezept gespeichert');
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
        if (who === partner() && window.UZSync) UZSync.notifyPartner('Neues To-do für dich', title);
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
    openSheet(`<h2>Outlook teilweise blockiert</h2>
      <p class="mut">Der Kalender von ${esc(fail.join(' & '))} konnte nicht direkt geladen werden – das liegt meist an Browser-Sicherheitsregeln (CORS) bei Outlook-Links.</p>
      <p class="mut" style="margin-top:8px"><b>Plan B:</b> Kalender in Outlook als .ics-Datei exportieren und über den Datei-Import im Kalender-Tab laden. Mit dem Sync-Server lösen wir das dauerhaft.</p>
      <div style="margin-top:14px"><button class="btn full" data-action="close-sheet">Alles klar</button></div>`);
  } else if (!silent) {
    toast(ok + ' Outlook-Termine geladen');
  }
}

/* ---------- Ereignis-Verkabelung ---------- */
document.addEventListener('click', e => {
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

/* ---------- Erinnerungen (bei geöffneter App) ---------- */
function maybeNotify() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const key = todayISO();
  if (DATA.settings.notified[key]) return;
  const due = openTasks();
  if (!due.length) return;
  const mine = due.filter(t => taskWho(t) === me());
  const body = mine.length
    ? nameOf(me()) + ', du bist dran: ' + mine.map(t => t.title).join(', ')
    : due.length + ' Aufgaben sind diese Woche noch offen.';
  try { new Notification('Unser Zuhause', { body }); } catch (e) {}
  DATA.settings.notified[key] = true; save();
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

render();
maybeNotify();

/* Outlook automatisch aktuell halten: beim Start und alle 30 Minuten */
if (navigator.onLine) refreshIcs(true);
setInterval(() => { if (navigator.onLine) refreshIcs(true); }, 30 * 60 * 1000);
