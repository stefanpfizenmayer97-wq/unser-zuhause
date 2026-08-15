/* Unser Zuhause – Datenhaltung & Helfer (localStorage, sync-fähig) */

const DB_KEY = 'uz-data-v1';

const NAMES = { stefan: 'Stefan', linda: 'Linda' };
const WD = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const WD_LONG = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const CATS = ['Obst & Gemüse', 'Kühlregal', 'Vorrat', 'Getränke', 'Haushalt', 'Sonstiges'];
const CAT_GUESS = [
  ['Obst & Gemüse', ['apfel', 'banane', 'tomate', 'gurke', 'salat', 'zwiebel', 'knoblauch', 'paprika', 'kartoffel', 'karotte', 'möhre', 'zucchini', 'aubergine', 'pilz', 'champignon', 'obst', 'gemüse', 'beere', 'zitrone', 'limette', 'avocado', 'spinat', 'brokkoli', 'kürbis', 'ingwer', 'basilikum', 'petersilie', 'lauch', 'birne', 'traube']],
  ['Kühlregal', ['milch', 'butter', 'käse', 'joghurt', 'quark', 'sahne', 'ei', 'eier', 'schinken', 'wurst', 'hack', 'fleisch', 'hähnchen', 'lachs', 'fisch', 'tofu', 'mozzarella', 'feta', 'parmesan', 'frischkäse', 'speck', 'creme fraiche', 'schmand', 'hefe']],
  ['Vorrat', ['nudel', 'spaghetti', 'reis', 'mehl', 'zucker', 'salz', 'pfeffer', 'öl', 'essig', 'dose', 'passierte', 'linsen', 'bohnen', 'kichererbsen', 'müsli', 'haferflocken', 'brot', 'toast', 'honig', 'marmelade', 'gewürz', 'brühe', 'kokosmilch', 'curry', 'senf', 'ketchup', 'sauce', 'soße', 'schokolade', 'chips', 'penne', 'lasagne', 'wrap']],
  ['Getränke', ['wasser', 'saft', 'cola', 'bier', 'wein', 'kaffee', 'tee', 'limo', 'schorle', 'sprudel']],
  ['Haushalt', ['spülmittel', 'waschmittel', 'müllbeutel', 'küchenrolle', 'klopapier', 'toilettenpapier', 'schwamm', 'putzmittel', 'zahnpasta', 'shampoo', 'seife', 'taschentücher', 'alufolie', 'frischhaltefolie', 'batterien', 'kerze']],
];

function guessCat(name) {
  const n = name.toLowerCase();
  for (const [cat, words] of CAT_GUESS) {
    if (words.some(w => n.includes(w))) return cat;
  }
  return 'Sonstiges';
}

/* ---------- IDs & Datum ---------- */
function uid() { return Math.random().toString(36).slice(2, 10); }

function toISO(d) {
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
function fromISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function todayISO() { return toISO(new Date()); }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function startOfWeek(d) {
  const x = new Date(d); const wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd); x.setHours(0, 0, 0, 0); return x;
}
function fmtNice(iso) {
  const d = fromISO(iso);
  return WD_LONG[(d.getDay() + 6) % 7] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()];
}
function fmtShort(iso) {
  const d = fromISO(iso);
  return WD[(d.getDay() + 6) % 7] + ' ' + d.getDate() + '.' + (d.getMonth() + 1) + '.';
}
function daysUntil(iso) {
  const a = fromISO(todayISO()), b = fromISO(iso);
  return Math.round((b - a) / 864e5);
}

/* ---------- Startdaten ---------- */
const SEED = {
  settings: { me: 'stefan', icsStefan: '', icsLinda: '', icsLast: '', notified: {} },
  notes: { stefan: '', linda: '' },
  notesAt: { stefan: '', linda: '' },
  reads: { stefan: '', linda: '' },
  messages: [],
  tasks: [
    { id: 't1', title: 'Müll rausbringen', freq: 'weekly', rotation: ['stefan', 'linda'], turn: 0, doneKey: null },
    { id: 't2', title: 'Kehrwoche', freq: 'biweekly', anchor: '2026-08-10', rotation: ['linda', 'stefan'], turn: 0, doneKey: null },
    { id: 't3', title: 'Bad putzen', freq: 'weekly', rotation: ['linda', 'stefan'], turn: 0, doneKey: null },
    { id: 't4', title: 'Wäsche waschen', freq: 'weekly', rotation: ['stefan', 'linda'], turn: 1, doneKey: null },
    { id: 't5', title: 'Staubsaugen & wischen', freq: 'weekly', rotation: ['linda', 'stefan'], turn: 1, doneKey: null },
    { id: 't6', title: 'Pflanzen gießen', freq: 'weekly', rotation: ['linda'], turn: 0, doneKey: null },
    { id: 't7', title: 'Bettwäsche wechseln', freq: 'biweekly', anchor: '2026-08-10', rotation: ['stefan', 'linda'], turn: 0, doneKey: null },
  ],
  todos: [],
  events: [],
  icsEvents: [],
  recipes: [
    { id: 'r1', name: 'Spaghetti Bolognese', ing: ['Spaghetti', 'Hackfleisch', 'Passierte Tomaten', 'Zwiebeln', 'Knoblauch', 'Parmesan'] },
    { id: 'r2', name: 'Spaghetti Carbonara', ing: ['Spaghetti', 'Speck', 'Eier', 'Parmesan', 'Pfeffer'] },
    { id: 'r3', name: 'Gemüsecurry mit Reis', ing: ['Reis', 'Kokosmilch', 'Currypaste', 'Paprika', 'Zucchini', 'Kichererbsen'] },
    { id: 'r4', name: 'Ofengemüse mit Feta', ing: ['Kartoffeln', 'Paprika', 'Zucchini', 'Rote Zwiebeln', 'Feta', 'Olivenöl'] },
    { id: 'r5', name: 'Selbstgemachte Pizza', ing: ['Mehl', 'Hefe', 'Passierte Tomaten', 'Mozzarella', 'Basilikum'] },
    { id: 'r6', name: 'Kürbissuppe', ing: ['Kürbis', 'Zwiebeln', 'Ingwer', 'Kokosmilch', 'Gemüsebrühe'] },
    { id: 'r7', name: 'Wraps mit Hähnchen', ing: ['Wraps', 'Hähnchen', 'Salat', 'Tomaten', 'Creme fraiche'] },
  ],
  meals: {},
  shopping: [],
  us: {
    ideas: ['Picknick am Fluss', 'Zusammen Sushi selber machen', 'Abendspaziergang und ein Eis', 'Brettspielabend', 'Fotodate in der Stadt'],
    bucket: ['Ein Wochenende nach Südtirol', 'Töpferkurs zusammen machen'],
    dates: [],
    highlight: '',
  },
};

/* ---------- Laden & Speichern ---------- */
let DATA = load();

function load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return structuredClone(SEED);
    const d = JSON.parse(raw);
    for (const k of Object.keys(SEED)) if (!(k in d)) d[k] = structuredClone(SEED[k]);
    for (const k of Object.keys(SEED.us)) if (!(k in d.us)) d.us[k] = structuredClone(SEED.us[k]);
    for (const k of Object.keys(SEED.settings)) if (!(k in d.settings)) d.settings[k] = structuredClone(SEED.settings[k]);
    return d;
  } catch (e) {
    console.warn('load failed, using seed', e);
    return structuredClone(SEED);
  }
}
function save() {
  localStorage.setItem(DB_KEY, JSON.stringify(DATA));
  if (window.onDataSaved) window.onDataSaved();
}

function me() { return DATA.settings.me; }
function partner() { return me() === 'stefan' ? 'linda' : 'stefan'; }
function nameOf(k) { return NAMES[k] || 'Beide'; }

/* ---------- Haushalt: Rhythmus & Rotation ---------- */
const FREQ_LABEL = { daily: 'täglich', weekly: 'jede Woche', biweekly: 'alle 2 Wochen', monthly: 'jeden Monat' };

function taskPeriodKey(t, d = new Date()) {
  if (t.freq === 'daily') return 'd' + toISO(d);
  if (t.freq === 'weekly') return 'w' + toISO(startOfWeek(d));
  if (t.freq === 'biweekly') {
    const a = startOfWeek(fromISO(t.anchor || '2026-08-10'));
    const w = Math.round((startOfWeek(d) - a) / (7 * 864e5));
    return 'bw' + Math.floor(w / 2);
  }
  if (t.freq === 'monthly') return 'm' + toISO(d).slice(0, 7);
  return 'x';
}
function taskIsDone(t) { return t.doneKey === taskPeriodKey(t); }
function taskWho(t) { return t.rotation[t.turn % t.rotation.length]; }
function toggleTask(t) {
  const len = t.rotation.length;
  if (taskIsDone(t)) {
    t.doneKey = null;
    t.turn = (t.turn + len - 1) % len;
  } else {
    t.doneKey = taskPeriodKey(t);
    t.turn = (t.turn + 1) % len;
  }
  save();
}
function openTasks() { return DATA.tasks.filter(t => !taskIsDone(t)); }

/* ---------- Kalender ---------- */
function eventsOn(iso) {
  const own = DATA.events.filter(e => e.date === iso);
  const ics = DATA.icsEvents.filter(e => e.date === iso);
  return own.concat(ics).sort((a, b) => (a.time || '99') < (b.time || '99') ? -1 : 1);
}
function nextEvents(n = 3) {
  const t = todayISO();
  const all = DATA.events.concat(DATA.icsEvents)
    .filter(e => e.date >= t)
    .sort((a, b) => (a.date + (a.time || '99')) < (b.date + (b.time || '99')) ? -1 : 1);
  return all.slice(0, n);
}

/* ---------- Kochplan: Vorschläge ---------- */
function usedRecipeIds() {
  const used = new Set();
  for (let i = 0; i < 14; i++) {
    const m = DATA.meals[toISO(addDays(new Date(), i))];
    if (m && m.rid) used.add(m.rid);
  }
  return used;
}
function suggestRecipe() {
  if (!DATA.recipes.length) return null;
  const used = usedRecipeIds();
  const pool = DATA.recipes.filter(r => !used.has(r.id));
  const list = pool.length ? pool : DATA.recipes;
  return list[Math.floor(Math.random() * list.length)];
}

/* ---------- Gedanke des Tages (für die Pinnwand) ---------- */
const QUOTES = [
  'Liebe ist nicht, sich anzustarren, sondern gemeinsam in dieselbe Richtung zu blicken.',
  'Das schönste Zuhause ist der Mensch, bei dem man ankommen darf.',
  'Kleine Gesten, jeden Tag – daraus ist große Liebe gemacht.',
  'Heute ist ein guter Tag, um einander zuzuhören.',
  'Wer zusammen lacht, räumt auch leichter zusammen auf.',
  'Nimm dir heute eine Minute, um zu sagen, was du am anderen magst.',
  'Glück ist die Summe der kleinen Momente zu zweit.',
  'Ein ehrliches „Danke“ wirkt länger als ein großer Strauß Blumen.',
  'Zuhause ist kein Ort. Zuhause bist du.',
  'Streitet leise, liebt laut.',
  'Der Alltag ist das eigentliche Abenteuer – gut, dass wir ihn teilen.',
  'Achtsamkeit beginnt damit, das Handy wegzulegen, wenn der andere erzählt.',
  'Man muss nicht alles gleich sehen, um in dieselbe Richtung zu gehen.',
  'Ein gemeinsamer Kaffee am Morgen ist auch eine Art Liebeserklärung.',
  'Was du heute an mir schätzt, sag es mir heute.',
  'Geduld ist Liebe, die warten kann.',
  'Die beste Zeit für ein gutes Gespräch ist jetzt.',
  'Wer den anderen wachsen lässt, wächst mit.',
  'Auch aus Krümeln auf dem Tisch kann man Geschichten lesen.',
  'Umarmt euch heute einmal länger als nötig.',
  'Nicht perfekt, aber echt – so ist gute Liebe.',
  'Jeder Tag zu zweit ist ein kleines Fest, wenn man es bemerkt.',
  'Sag nicht nur „passt schon“ – sag, was du fühlst.',
  'Gemeinsam kochen ist die leckerste Form von Teamwork.',
  'Die Liebe wohnt in der Aufmerksamkeit.',
  'Ein Spaziergang zu zweit ordnet mehr als jede To-do-Liste.',
  'Vergleiche eure Liebe nicht – sie ist ein Original.',
  'Heute schon gelächelt, als du an den anderen gedacht hast?',
  'Wer Fehler zugeben kann, schenkt dem anderen Vertrauen.',
  'Das Leben ist schöner, wenn man es sich gegenseitig leichter macht.',
  'Kleine Pausen zu zweit sind die Tankstellen der Liebe.',
  'Hör zu, um zu verstehen – nicht, um zu antworten.',
  'Ein liebevoller Zettel wirkt manchmal Wunder.',
  'Dankbarkeit macht aus einem normalen Tag einen guten.',
  'Ihr müsst nicht alles schaffen. Nur füreinander da sein.',
  'Wer zuerst „Entschuldigung“ sagt, ist nicht schwach – sondern mutig.',
  'Die schönsten Erinnerungen entstehen meistens ungeplant.',
  'Nähe entsteht, wenn man sich Zeit schenkt.',
  'Auch stille Momente zu zweit erzählen viel.',
  'Frag heute mal: Wie geht es dir wirklich?',
  'Liebe ist ein Verb – sie will jeden Tag getan werden.',
  'Zwei Menschen, ein Zuhause, tausend kleine Wunder.',
  'Lächle deinem Lieblingsmenschen heute zuerst zu.',
  'Wer gemeinsam träumt, hat schon die halbe Reise gemacht.',
  'Der Ton macht die Musik – auch in der Küche.',
  'Halte fest, was zählt: Hände, Momente, Versprechen.',
  'Heute einfach mal den Lieblingsmenschen drücken. Ohne Grund.',
  'Aus „ich“ und „du“ wird jeden Tag aufs Neue ein „wir“.',
  'Ein aufgeräumtes Herz ist wichtiger als eine aufgeräumte Wohnung.',
  'Genießt das Kleine – es ist das Große in Verkleidung.',
];
function dailyQuote() {
  const d = new Date();
  const start = Date.UTC(d.getFullYear(), 0, 0);
  const doy = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 864e5);
  return QUOTES[doy % QUOTES.length];
}

/* ---------- Pinnwand-Zettel: nach 7 Tagen von selbst abnehmen ---------- */
const NOTE_DAYS = 7;
function noteCleanup() {
  if (!DATA.notesAt) DATA.notesAt = { stefan: '', linda: '' };
  let changed = false;
  for (const p of ['stefan', 'linda']) {
    if (!DATA.notes[p]) continue;
    if (!DATA.notesAt[p]) { DATA.notesAt[p] = new Date().toISOString(); changed = true; }
    else if (Date.now() - new Date(DATA.notesAt[p]).getTime() > NOTE_DAYS * 864e5) {
      DATA.notes[p] = ''; DATA.notesAt[p] = ''; changed = true;
    }
  }
  if (changed) save();
}
function noteDaysLeft(p) {
  if (!DATA.notes[p] || !DATA.notesAt || !DATA.notesAt[p]) return null;
  return Math.max(0, NOTE_DAYS - Math.floor((Date.now() - new Date(DATA.notesAt[p]).getTime()) / 864e5));
}

/* ---------- Ungelesene Nachrichten ---------- */
function unreadCount() {
  const since = (DATA.reads && DATA.reads[me()]) || '';
  return DATA.messages.filter(m => m.from === partner() && m.at && m.at > since).length;
}
function markChatRead() {
  if (!DATA.reads) DATA.reads = { stefan: '', linda: '' };
  if (unreadCount() > 0 || !DATA.reads[me()]) {
    DATA.reads[me()] = new Date().toISOString();
    save();
  }
}

/* ---------- Einkauf ---------- */
function addShoppingItem(name, by) {
  const clean = name.trim();
  if (!clean) return 'empty';
  // Steht schon offen auf der Liste? Nicht doppelt eintragen.
  const open = DATA.shopping.find(i => !i.done && i.name.toLowerCase() === clean.toLowerCase());
  if (open) return 'exists';
  // War schon mal drauf und ist abgehakt? Wieder aktivieren statt doppeln.
  const done = DATA.shopping.find(i => i.done && i.name.toLowerCase() === clean.toLowerCase());
  if (done) { done.done = false; save(); return 'added'; }
  DATA.shopping.push({ id: uid(), name: clean, cat: guessCat(clean), done: false, by: by || me() });
  save();
  return 'added';
}
function addRecipeToShopping(recipe) {
  for (const ing of recipe.ing) addShoppingItem(ing);
}

/* ---------- Export / Import ---------- */
function exportData() {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'unser-zuhause-backup-' + todayISO() + '.json';
  a.click();
}
function importData(file, done) {
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const d = JSON.parse(rd.result);
      if (!d.tasks || !d.settings) throw new Error('Kein gültiges Backup');
      DATA = d; save(); done(true);
    } catch (e) { done(false); }
  };
  rd.readAsText(file);
}
