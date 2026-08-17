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
  notesLiked: { stefan: false, linda: false },
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
  presence: {},
  shopping: [],
  expenses: [],
  checkins: {},
  missionSkips: {},
  training: { plans: {}, week: {} },
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

/* ---------- Kalender (inkl. wiederkehrender Termine) ---------- */
const REPEAT_LABEL = { weekly: 'wöchentlich', biweekly: 'alle 2 Wochen', monthly: 'monatlich' };

function repeatMatches(e, iso) {
  if (iso < e.date) return false;
  const d = fromISO(iso), s = fromISO(e.date);
  if (e.repeat === 'weekly') return d.getDay() === s.getDay();
  if (e.repeat === 'biweekly') {
    if (d.getDay() !== s.getDay()) return false;
    const w = Math.round((startOfWeek(d) - startOfWeek(s)) / (7 * 864e5));
    return w % 2 === 0;
  }
  if (e.repeat === 'monthly') return d.getDate() === s.getDate();
  return false;
}
function eventsOn(iso) {
  const own = DATA.events
    .filter(e => e.repeat ? repeatMatches(e, iso) : e.date === iso)
    .map(e => e.repeat ? { ...e, date: iso } : e);
  const ics = DATA.icsEvents.filter(e => e.date === iso);
  // Besondere Tage (Jahrestage etc.) erscheinen jedes Jahr im Kalender
  const specials = ((DATA.us && DATA.us.dates) || [])
    .filter(d => d.date && d.date.slice(5) === iso.slice(5))
    .map(d => ({ id: 'ud-' + d.id, title: d.title, date: iso, time: '', who: 'beide', src: 'special' }));
  // Geplante Trainingseinheiten erscheinen automatisch im Kalender (nur lesen, nie hier planen)
  const training = [];
  if (DATA.training && DATA.training.week) {
    const mon = toISO(startOfWeek(new Date(iso + 'T12:00')));
    const dayIdx = Math.round((new Date(iso + 'T12:00') - new Date(mon + 'T12:00')) / 864e5);
    for (const person of ['stefan', 'linda']) {
      for (const e of DATA.training.week[mon + ':' + person] || []) {
        if (e.day !== dayIdx) continue;
        const zus = typeof trainingTogetherOn === 'function' ? trainingTogetherOn(person, mon, dayIdx, e.cat) : null;
        training.push({ id: 'tr-' + person + '-' + iso, title: e.title + (zus ? ' · zusammen' : ''), date: iso, time: e.time || '', who: person, src: 'training', trDone: e.done });
      }
    }
  }
  return specials.concat(own.concat(ics).sort((a, b) => (a.time || '99') < (b.time || '99') ? -1 : 1)).concat(training);
}
function nextEvents(n = 3) {
  const out = [];
  for (let i = 0; i < 60 && out.length < n + 8; i++) {
    out.push(...eventsOn(toISO(addDays(new Date(), i))).filter(e => e.src !== 'training'));
  }
  return out.slice(0, n);
}

/* ---------- Anwesenheit: wer ist wann zum Essen da? ---------- */
function isPresent(iso, person, slot) {
  const p = DATA.presence && DATA.presence[iso] && DATA.presence[iso][person];
  return p ? p[slot] !== false : true; // Standard: da
}
function setPresence(iso, person, slot, val) {
  if (!DATA.presence) DATA.presence = {};
  if (!DATA.presence[iso]) DATA.presence[iso] = {};
  if (!DATA.presence[iso][person]) DATA.presence[iso][person] = {};
  DATA.presence[iso][person][slot] = val;
  save();
}

/* ---------- Kochplan: Mittag & Abend pro Tag ---------- */
function mealAt(iso, slot) {
  const m = DATA.meals[iso];
  if (!m) return null;
  if (m.m || m.a) return m[slot] || null;
  return slot === 'a' ? m : null; // alte Einträge zählen als Abendessen
}
function setMeal(iso, slot, entry) {
  const cur = DATA.meals[iso];
  const norm = cur ? (cur.m || cur.a ? { ...cur } : { a: cur }) : {};
  if (entry) norm[slot] = entry; else delete norm[slot];
  if (norm.m || norm.a) DATA.meals[iso] = norm;
  else delete DATA.meals[iso];
  save();
}

/* ---------- Kochplan: Vorschläge ---------- */
function usedRecipeIds() {
  const used = new Set();
  for (let i = 0; i < 14; i++) {
    const iso = toISO(addDays(new Date(), i));
    for (const slot of ['m', 'a']) {
      const e = mealAt(iso, slot);
      if (e && e.rid) used.add(e.rid);
    }
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

/* ---------- Outlook-Feiertage rausfiltern (auch aus alten/gesyncten Daten) ---------- */
function cleanupHolidayIcs() {
  const before = (DATA.icsEvents || []).length;
  DATA.icsEvents = (DATA.icsEvents || []).filter(e => !/\bholiday\b|feiertag/i.test(e.title));
  return DATA.icsEvents.length !== before;
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
      DATA.notes[p] = ''; DATA.notesAt[p] = '';
      if (DATA.notesLiked) DATA.notesLiked[p] = false;
      changed = true;
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

/* ---------- Rezept-Basis: 100 vegetarische Gerichte ---------- */
const BASE_RECIPES = [
  // Pasta
  ['Nudeln mit Pesto alla Trapanese', ['Spaghetti', 'Mandeln', 'Cherrytomaten', 'Basilikum', 'Parmesan', 'Knoblauch']],
  ['Spaghetti Aglio e Olio', ['Spaghetti', 'Knoblauch', 'Chiliflocken', 'Petersilie', 'Olivenöl']],
  ['Penne all’Arrabbiata', ['Penne', 'Passierte Tomaten', 'Knoblauch', 'Chiliflocken', 'Petersilie']],
  ['Pasta mit Zitronen-Sahnesauce', ['Tagliatelle', 'Sahne', 'Zitrone', 'Parmesan', 'Basilikum']],
  ['One-Pot-Pasta Caprese', ['Spaghetti', 'Cherrytomaten', 'Mozzarella', 'Basilikum', 'Knoblauch']],
  ['Gnocchi-Pfanne mit Spinat', ['Gnocchi', 'Spinat', 'Frischkäse', 'Knoblauch', 'Parmesan']],
  ['Gnocchi mit Salbeibutter', ['Gnocchi', 'Butter', 'Salbei', 'Parmesan']],
  ['Tortellini mit Tomatenrahm', ['Tortellini', 'Passierte Tomaten', 'Sahne', 'Basilikum']],
  ['Pasta mit Pilzrahmsauce', ['Bandnudeln', 'Champignons', 'Sahne', 'Zwiebeln', 'Petersilie']],
  ['Spaghetti mit Spinat-Gorgonzola', ['Spaghetti', 'Spinat', 'Gorgonzola', 'Sahne', 'Walnüsse']],
  ['Pasta alla Norma', ['Penne', 'Aubergine', 'Passierte Tomaten', 'Knoblauch', 'Basilikum', 'Parmesan']],
  ['Zucchini-Zitronen-Pasta', ['Spaghetti', 'Zucchini', 'Zitrone', 'Parmesan', 'Pinienkerne']],
  ['Mac and Cheese', ['Makkaroni', 'Cheddar', 'Milch', 'Butter', 'Mehl']],
  ['Lasagne mit Gemüse', ['Lasagneplatten', 'Zucchini', 'Aubergine', 'Passierte Tomaten', 'Mozzarella', 'Sahne']],
  ['Pasta mit Brokkoli und Mandeln', ['Orecchiette', 'Brokkoli', 'Mandeln', 'Knoblauch', 'Parmesan', 'Zitrone']],
  ['Ravioli mit Tomaten-Butter', ['Ravioli', 'Butter', 'Cherrytomaten', 'Basilikum', 'Parmesan']],
  ['Spätzlepfanne mit Bergkäse', ['Spätzle', 'Bergkäse', 'Zwiebeln', 'Schnittlauch']],
  ['Pasta mit Erbsen-Minz-Pesto', ['Penne', 'Erbsen', 'Minze', 'Parmesan', 'Zitrone', 'Pinienkerne']],
  ['Tomaten-Ricotta-Pasta', ['Rigatoni', 'Ricotta', 'Passierte Tomaten', 'Basilikum', 'Knoblauch']],
  ['Pasta mit geröstetem Blumenkohl', ['Penne', 'Blumenkohl', 'Kapern', 'Zitrone', 'Semmelbrösel', 'Parmesan']],
  // Kartoffeln
  ['Ofenkartoffeln mit Kräuterquark', ['Kartoffeln', 'Quark', 'Schnittlauch', 'Petersilie', 'Leinöl']],
  ['Süßkartoffel-Pommes mit Dip', ['Süßkartoffeln', 'Joghurt', 'Knoblauch', 'Paprikapulver']],
  ['Kartoffelgratin', ['Kartoffeln', 'Sahne', 'Bergkäse', 'Knoblauch', 'Muskat']],
  ['Bratkartoffeln mit Spiegelei', ['Kartoffeln', 'Eier', 'Zwiebeln', 'Schnittlauch']],
  ['Gefüllte Ofen-Süßkartoffeln', ['Süßkartoffeln', 'Feta', 'Kichererbsen', 'Joghurt', 'Granatapfel']],
  ['Kartoffel-Gemüse-Rösti', ['Kartoffeln', 'Karotten', 'Zucchini', 'Eier', 'Schmand']],
  ['Kartoffelsuppe', ['Kartoffeln', 'Karotten', 'Lauch', 'Gemüsebrühe', 'Majoran']],
  ['Gnocchi-Kartoffel-Blech mit Rosmarin', ['Gnocchi', 'Kartoffeln', 'Rosmarin', 'Cherrytomaten', 'Parmesan']],
  ['Kartoffel-Curry', ['Kartoffeln', 'Kokosmilch', 'Currypaste', 'Erbsen', 'Ingwer']],
  ['Kartoffelpuffer mit Apfelmus', ['Kartoffeln', 'Eier', 'Mehl', 'Apfelmus']],
  // Reis, Quinoa & Getreide
  ['Quinoa-Bowl mit Ofengemüse', ['Quinoa', 'Süßkartoffeln', 'Brokkoli', 'Kichererbsen', 'Tahini', 'Zitrone']],
  ['Gemüse-Curry mit Reis', ['Reis', 'Kokosmilch', 'Currypaste', 'Paprika', 'Zucchini', 'Kichererbsen']],
  ['Pilz-Risotto', ['Risottoreis', 'Champignons', 'Zwiebeln', 'Weißwein', 'Parmesan', 'Gemüsebrühe']],
  ['Zitronen-Risotto mit Erbsen', ['Risottoreis', 'Erbsen', 'Zitrone', 'Parmesan', 'Gemüsebrühe']],
  ['Gebratener Reis mit Ei und Gemüse', ['Reis', 'Eier', 'Erbsen', 'Karotten', 'Sojasauce', 'Frühlingszwiebeln']],
  ['Bulgur-Salat (Taboulé)', ['Bulgur', 'Petersilie', 'Minze', 'Tomaten', 'Gurke', 'Zitrone']],
  ['Couscous-Pfanne mit Gemüse', ['Couscous', 'Zucchini', 'Paprika', 'Kichererbsen', 'Rosinen', 'Zimt']],
  ['Quinoa-Feta-Salat', ['Quinoa', 'Feta', 'Gurke', 'Cherrytomaten', 'Minze', 'Zitrone']],
  ['Kürbis-Risotto', ['Risottoreis', 'Kürbis', 'Zwiebeln', 'Parmesan', 'Salbei', 'Gemüsebrühe']],
  ['Reis-Bowl mit Teriyaki-Gemüse', ['Reis', 'Brokkoli', 'Karotten', 'Sojasauce', 'Honig', 'Sesam']],
  ['Polenta mit Pilzragout', ['Polenta', 'Champignons', 'Parmesan', 'Thymian', 'Gemüsebrühe']],
  ['Ebly-Gemüse-Pfanne', ['Ebly', 'Zucchini', 'Paprika', 'Frischkäse', 'Kräuter']],
  // Suppen & Eintöpfe
  ['Kürbissuppe', ['Kürbis', 'Zwiebeln', 'Ingwer', 'Kokosmilch', 'Gemüsebrühe']],
  ['Tomatensuppe mit Grilled Cheese', ['Passierte Tomaten', 'Sahne', 'Basilikum', 'Toast', 'Cheddar', 'Butter']],
  ['Linsensuppe', ['Rote Linsen', 'Karotten', 'Zwiebeln', 'Kreuzkümmel', 'Zitrone', 'Gemüsebrühe']],
  ['Erbsensuppe mit Minze', ['Erbsen', 'Zwiebeln', 'Minze', 'Gemüsebrühe', 'Schmand']],
  ['Brokkoli-Cheddar-Suppe', ['Brokkoli', 'Cheddar', 'Kartoffeln', 'Zwiebeln', 'Gemüsebrühe']],
  ['Karotten-Ingwer-Suppe', ['Karotten', 'Ingwer', 'Orangensaft', 'Kokosmilch', 'Gemüsebrühe']],
  ['Minestrone', ['Weiße Bohnen', 'Karotten', 'Sellerie', 'Passierte Tomaten', 'Suppennudeln', 'Parmesan']],
  ['Süßkartoffel-Erdnuss-Suppe', ['Süßkartoffeln', 'Erdnussbutter', 'Kokosmilch', 'Ingwer', 'Chiliflocken']],
  ['Blumenkohl-Cremesuppe', ['Blumenkohl', 'Kartoffeln', 'Sahne', 'Muskat', 'Gemüsebrühe']],
  ['Chili sin Carne', ['Kidneybohnen', 'Mais', 'Passierte Tomaten', 'Paprika', 'Sojahack', 'Kreuzkümmel']],
  ['Gemüseeintopf', ['Kartoffeln', 'Karotten', 'Lauch', 'Sellerie', 'Erbsen', 'Gemüsebrühe']],
  ['Ramen mit Ei und Pak Choi', ['Ramen-Nudeln', 'Eier', 'Pak Choi', 'Miso-Paste', 'Frühlingszwiebeln', 'Sesam']],
  // Ofen & Auflauf
  ['Ofengemüse mit Feta', ['Kartoffeln', 'Paprika', 'Zucchini', 'Rote Zwiebeln', 'Feta', 'Olivenöl']],
  ['Gemüselasagne mit Spinat', ['Lasagneplatten', 'Spinat', 'Ricotta', 'Passierte Tomaten', 'Mozzarella']],
  ['Überbackener Blumenkohl', ['Blumenkohl', 'Sahne', 'Bergkäse', 'Semmelbrösel', 'Muskat']],
  ['Zucchini-Reis-Auflauf', ['Zucchini', 'Reis', 'Passierte Tomaten', 'Feta', 'Kräuter']],
  ['Gefüllte Paprika', ['Paprika', 'Reis', 'Sojahack', 'Passierte Tomaten', 'Käse']],
  ['Auberginen-Parmigiana', ['Auberginen', 'Passierte Tomaten', 'Mozzarella', 'Parmesan', 'Basilikum']],
  ['Kürbis-Feta-Blech', ['Kürbis', 'Feta', 'Rote Zwiebeln', 'Honig', 'Thymian']],
  ['Flammkuchen mit Ziegenkäse', ['Flammkuchenteig', 'Schmand', 'Ziegenkäse', 'Honig', 'Walnüsse', 'Rucola']],
  ['Pizza Margherita (selbstgemacht)', ['Mehl', 'Hefe', 'Passierte Tomaten', 'Mozzarella', 'Basilikum']],
  ['Pizza mit Pilzen und Rucola', ['Mehl', 'Hefe', 'Passierte Tomaten', 'Champignons', 'Mozzarella', 'Rucola']],
  ['Quiche mit Lauch und Käse', ['Blätterteig', 'Lauch', 'Eier', 'Sahne', 'Bergkäse']],
  ['Süßkartoffel-Auflauf mit Spinat', ['Süßkartoffeln', 'Spinat', 'Feta', 'Sahne', 'Muskat']],
  // Salate & Bowls
  ['Großer Caesar-Salat (veggie)', ['Römersalat', 'Parmesan', 'Toast', 'Joghurt', 'Knoblauch', 'Kapern']],
  ['Griechischer Salat mit Brot', ['Tomaten', 'Gurke', 'Feta', 'Oliven', 'Rote Zwiebeln', 'Fladenbrot']],
  ['Buddha-Bowl', ['Reis', 'Kichererbsen', 'Avocado', 'Karotten', 'Edamame', 'Sesam', 'Sojasauce']],
  ['Linsensalat mit Feta', ['Berglinsen', 'Feta', 'Cherrytomaten', 'Rucola', 'Balsamico']],
  ['Halloumi-Salat mit Wassermelone', ['Halloumi', 'Wassermelone', 'Rucola', 'Minze', 'Limette']],
  ['Caprese mit Ciabatta', ['Tomaten', 'Mozzarella', 'Basilikum', 'Ciabatta', 'Balsamico']],
  ['Falafel-Bowl mit Hummus', ['Falafel', 'Hummus', 'Couscous', 'Gurke', 'Tomaten', 'Joghurt']],
  ['Nudelsalat mit Pesto', ['Fusilli', 'Pesto', 'Cherrytomaten', 'Mozzarella', 'Rucola']],
  ['Panzanella (Brotsalat)', ['Ciabatta', 'Tomaten', 'Gurke', 'Rote Zwiebeln', 'Basilikum', 'Kapern']],
  ['Süßkartoffel-Feta-Salat', ['Süßkartoffeln', 'Feta', 'Babyspinat', 'Kürbiskerne', 'Honig']],
  // Asiatisch
  ['Gemüse-Wok mit Erdnusssauce', ['Wok-Gemüse', 'Erdnussbutter', 'Kokosmilch', 'Sojasauce', 'Reis', 'Limette']],
  ['Pad Thai (veggie)', ['Reisnudeln', 'Eier', 'Tofu', 'Sojasprossen', 'Erdnüsse', 'Limette']],
  ['Tofu süß-sauer', ['Tofu', 'Paprika', 'Ananas', 'Reis', 'Sojasauce', 'Ingwer']],
  ['Gemüse-Gyoza mit Dip', ['Gyoza', 'Sojasauce', 'Sesamöl', 'Frühlingszwiebeln', 'Gurke']],
  ['Veggie-Sushi-Bowl', ['Sushireis', 'Avocado', 'Gurke', 'Karotten', 'Nori-Blätter', 'Sojasauce']],
  ['Rotes Thai-Curry mit Tofu', ['Tofu', 'Rote Currypaste', 'Kokosmilch', 'Bambussprossen', 'Paprika', 'Reis']],
  ['Sesamnudeln mit Gurke', ['Mie-Nudeln', 'Tahini', 'Sojasauce', 'Gurke', 'Frühlingszwiebeln', 'Sesam']],
  ['Bibimbap (veggie)', ['Reis', 'Spinat', 'Karotten', 'Champignons', 'Eier', 'Gochujang']],
  ['Miso-Auberginen', ['Auberginen', 'Miso-Paste', 'Honig', 'Reis', 'Sesam', 'Frühlingszwiebeln']],
  ['Frühlingsrollen mit Dip', ['Reispapier', 'Glasnudeln', 'Karotten', 'Gurke', 'Minze', 'Erdnusssauce']],
  // Wraps, Mexikanisch & Herzhaftes
  ['Gemüse-Quesadillas', ['Tortillas', 'Käse', 'Mais', 'Paprika', 'Schwarze Bohnen', 'Salsa']],
  ['Burrito-Bowl', ['Reis', 'Schwarze Bohnen', 'Mais', 'Avocado', 'Salsa', 'Limette']],
  ['Veggie-Tacos', ['Taco-Schalen', 'Kidneybohnen', 'Mais', 'Avocado', 'Tomaten', 'Käse']],
  ['Halloumi-Wraps', ['Wraps', 'Halloumi', 'Salat', 'Tomaten', 'Joghurt', 'Minze']],
  ['Falafel-Wraps', ['Wraps', 'Falafel', 'Hummus', 'Salat', 'Tomaten', 'Joghurt']],
  ['Shakshuka mit Fladenbrot', ['Eier', 'Passierte Tomaten', 'Paprika', 'Zwiebeln', 'Kreuzkümmel', 'Fladenbrot']],
  ['Veggie-Burger', ['Burgerbrötchen', 'Veggie-Patties', 'Salat', 'Tomaten', 'Cheddar', 'Burgersauce']],
  ['Käsespätzle', ['Spätzle', 'Bergkäse', 'Zwiebeln', 'Butter', 'Schnittlauch']],
  ['Pfannkuchen mit Pilzfüllung', ['Mehl', 'Eier', 'Milch', 'Champignons', 'Frischkäse', 'Petersilie']],
  ['Semmelknödel mit Pilzrahm', ['Knödelbrot', 'Eier', 'Milch', 'Champignons', 'Sahne', 'Petersilie']],
  ['Zucchinipuffer mit Tzatziki', ['Zucchini', 'Eier', 'Mehl', 'Feta', 'Joghurt', 'Gurke', 'Knoblauch']],
  ['Ofen-Feta mit Tomaten und Brot', ['Feta', 'Cherrytomaten', 'Knoblauch', 'Ciabatta', 'Honig', 'Thymian']],
];
/* Runde 2: 200 weitere Rezepte (Knödel, Fisch, Salate, Urgetreide u.v.m.) */
const BASE_RECIPES_2 = [
  // Knödel & Alpenküche
  ['Spinatknödel mit Bergkäse', ['Knödelbrot', 'Spinat', 'Eier', 'Milch', 'Bergkäse', 'Zwiebel', 'Butter', 'Parmesan']],
  ['Kaspressknödel auf Salat', ['Knödelbrot', 'Bergkäse', 'Eier', 'Milch', 'Zwiebel', 'Schnittlauch', 'Blattsalat']],
  ['Rote-Bete-Knödel mit Mohnbutter', ['Knödelbrot', 'Rote Bete', 'Eier', 'Frischkäse', 'Butter', 'Mohn', 'Parmesan']],
  ['Topfenknödel mit Zwetschgenröster', ['Quark', 'Grieß', 'Eier', 'Butter', 'Semmelbrösel', 'Zwetschgen', 'Zimt']],
  ['Kürbisknödel mit Salbeibutter', ['Knödelbrot', 'Hokkaido-Kürbis', 'Eier', 'Butter', 'Salbei', 'Parmesan']],
  ['Kartoffelknödel mit Pilzgulasch', ['Kartoffeln', 'Mehl', 'Eier', 'Champignons', 'Paprika', 'Sahne', 'Paprikapulver']],
  ['Brezenknödel mit Rahmschwammerl', ['Brezen', 'Eier', 'Milch', 'Pfifferlinge', 'Sahne', 'Petersilie', 'Zwiebel']],
  ['Käsespätzle mit Röstzwiebeln', ['Spätzle', 'Bergkäse', 'Emmentaler', 'Zwiebeln', 'Butter', 'Schnittlauch']],
  ['Allgäuer Krautspätzle', ['Spätzle', 'Sauerkraut', 'Zwiebel', 'Butter', 'Kümmel', 'Bergkäse']],
  ['Schupfnudeln mit Sauerkraut', ['Schupfnudeln', 'Sauerkraut', 'Zwiebel', 'Butter', 'Kümmel', 'Schmand']],
  ['Tiroler Gröstl vegetarisch', ['Kartoffeln', 'Zwiebel', 'Räuchertofu', 'Spiegeleier', 'Majoran', 'Petersilie']],
  ['Germknödel mit Vanillesauce', ['Mehl', 'Hefe', 'Milch', 'Powidl', 'Mohn', 'Butter', 'Vanillesauce']],
  // Fisch & Meeresfrüchte
  ['Salat mit gebratenem Lachs', ['Lachsfilet', 'Blattsalat', 'Avocado', 'Gurke', 'Cherrytomaten', 'Zitrone', 'Senf', 'Honig']],
  ['Ofenlachs auf Gemüsebett', ['Lachsfilet', 'Zucchini', 'Paprika', 'Cherrytomaten', 'Zitrone', 'Olivenöl', 'Thymian']],
  ['Lachs-Teriyaki mit Reis', ['Lachsfilet', 'Sojasauce', 'Honig', 'Ingwer', 'Knoblauch', 'Reis', 'Sesam', 'Frühlingszwiebeln']],
  ['Lachs-Sahne-Pasta', ['Tagliatelle', 'Lachsfilet', 'Sahne', 'Zitrone', 'Dill', 'Zwiebel']],
  ['Lachs-Bowl mit Edamame', ['Lachsfilet', 'Reis', 'Edamame', 'Avocado', 'Gurke', 'Sojasauce', 'Sesam']],
  ['Gebeizter Lachs auf Rösti', ['Graved Lachs', 'Kartoffeln', 'Schmand', 'Dill', 'Meerrettich', 'Zitrone']],
  ['Lachsburger mit Limettenmayo', ['Lachsfilet', 'Burgerbrötchen', 'Limette', 'Mayonnaise', 'Rucola', 'Rote Zwiebel']],
  ['Zitronen-Forelle aus dem Ofen', ['Forelle', 'Zitrone', 'Petersilie', 'Knoblauch', 'Butter', 'Kartoffeln']],
  ['Forellenfilet mit Mandelbutter', ['Forellenfilet', 'Mandelblättchen', 'Butter', 'Zitrone', 'Petersilie', 'Reis']],
  ['Kabeljau in Tomaten-Kapern-Sugo', ['Kabeljau', 'Passierte Tomaten', 'Kapern', 'Oliven', 'Knoblauch', 'Ciabatta']],
  ['Fischfilet mit Senfkruste', ['Kabeljau', 'Senf', 'Semmelbrösel', 'Butter', 'Petersilie', 'Kartoffeln']],
  ['Backfisch mit Kartoffelsalat', ['Seelachs', 'Mehl', 'Bier', 'Kartoffeln', 'Gurke', 'Senf', 'Essig']],
  ['Fischstäbchen-Wrap', ['Fischstäbchen', 'Tortilla-Wraps', 'Joghurt', 'Gurke', 'Blattsalat', 'Zitrone']],
  ['Garnelen-Knoblauch-Pfanne', ['Garnelen', 'Knoblauch', 'Chiliflocken', 'Zitrone', 'Petersilie', 'Baguette']],
  ['Garnelen-Curry mit Kokosmilch', ['Garnelen', 'Kokosmilch', 'Currypaste', 'Paprika', 'Zuckerschoten', 'Reis', 'Limette']],
  ['Spaghetti mit Garnelen und Zitrone', ['Spaghetti', 'Garnelen', 'Zitrone', 'Knoblauch', 'Rucola', 'Chiliflocken']],
  ['Thunfisch-Salat mit weißen Bohnen', ['Thunfisch', 'Weiße Bohnen', 'Rote Zwiebel', 'Petersilie', 'Zitrone', 'Olivenöl']],
  ['Thunfisch-Pasta mit Tomaten', ['Penne', 'Thunfisch', 'Passierte Tomaten', 'Kapern', 'Oliven', 'Knoblauch']],
  ['Poke Bowl mit Thunfisch', ['Thunfisch', 'Sushireis', 'Avocado', 'Mango', 'Gurke', 'Sojasauce', 'Sesam']],
  ['Matjes nach Hausfrauenart', ['Matjesfilet', 'Joghurt', 'Sahne', 'Apfel', 'Gewürzgurken', 'Zwiebel', 'Kartoffeln']],
  ['Bratkartoffeln mit Räucherlachs', ['Kartoffeln', 'Räucherlachs', 'Schmand', 'Dill', 'Zwiebel', 'Kapern']],
  ['Fischsuppe mit Safran', ['Kabeljau', 'Garnelen', 'Fenchel', 'Tomaten', 'Safran', 'Knoblauch', 'Baguette']],
  ['Dorade vom Blech mit Ofengemüse', ['Dorade', 'Kartoffeln', 'Fenchel', 'Zitrone', 'Oliven', 'Rosmarin']],
  ['Pangasius in Zitronensauce', ['Pangasius', 'Zitrone', 'Sahne', 'Dill', 'Reis', 'Brokkoli']],
  ['Sardinen auf Bruschetta', ['Sardinen', 'Ciabatta', 'Tomaten', 'Knoblauch', 'Basilikum', 'Zitrone']],
  ['Fisch-Tacos mit Krautsalat', ['Kabeljau', 'Tortilla-Wraps', 'Spitzkohl', 'Limette', 'Joghurt', 'Koriander', 'Chiliflocken']],
  // Salate (sättigend)
  ['Buchweizensalat mit gepresster Zucchini', ['Buchweizen', 'Zucchini', 'Feta', 'Minze', 'Zitrone', 'Olivenöl', 'Pinienkerne']],
  ['Quinoasalat mit Granatapfel', ['Quinoa', 'Granatapfel', 'Petersilie', 'Minze', 'Feta', 'Zitrone', 'Walnüsse']],
  ['Linsensalat mit Ziegenkäse', ['Berglinsen', 'Ziegenkäse', 'Rote Bete', 'Rucola', 'Walnüsse', 'Balsamico', 'Honig']],
  ['Kichererbsensalat orientalisch', ['Kichererbsen', 'Gurke', 'Tomaten', 'Petersilie', 'Minze', 'Zitrone', 'Kreuzkümmel']],
  ['Couscous-Salat mit Ofengemüse', ['Couscous', 'Paprika', 'Zucchini', 'Aubergine', 'Rosinen', 'Mandeln', 'Zitrone']],
  ['Griechischer Bauernsalat', ['Tomaten', 'Gurke', 'Feta', 'Oliven', 'Rote Zwiebel', 'Oregano', 'Olivenöl']],
  ['Caesar Salad mit Croûtons', ['Römersalat', 'Parmesan', 'Ciabatta', 'Joghurt', 'Sardellen', 'Knoblauch', 'Zitrone']],
  ['Panzanella – italienischer Brotsalat', ['Ciabatta', 'Tomaten', 'Gurke', 'Rote Zwiebel', 'Basilikum', 'Kapern', 'Essig']],
  ['Wassermelonen-Feta-Salat', ['Wassermelone', 'Feta', 'Minze', 'Limette', 'Rucola', 'Kürbiskerne']],
  ['Burrata mit Tomaten und Pfirsich', ['Burrata', 'Tomaten', 'Pfirsich', 'Basilikum', 'Balsamico', 'Ciabatta']],
  ['Nizza-Salat', ['Thunfisch', 'Grüne Bohnen', 'Kartoffeln', 'Eier', 'Oliven', 'Tomaten', 'Sardellen']],
  ['Krautsalat mit Apfel und Walnuss', ['Spitzkohl', 'Apfel', 'Walnüsse', 'Joghurt', 'Senf', 'Honig']],
  ['Rote-Bete-Carpaccio mit Ziegenkäse', ['Rote Bete', 'Ziegenkäse', 'Rucola', 'Walnüsse', 'Honig', 'Balsamico']],
  ['Fenchel-Orangen-Salat', ['Fenchel', 'Orangen', 'Oliven', 'Rote Zwiebel', 'Olivenöl', 'Pistazien']],
  ['Spargelsalat mit Erdbeeren', ['Grüner Spargel', 'Erdbeeren', 'Rucola', 'Parmesan', 'Balsamico', 'Pinienkerne']],
  ['Glasnudelsalat mit Erdnüssen', ['Glasnudeln', 'Möhren', 'Gurke', 'Erdnüsse', 'Limette', 'Sojasauce', 'Koriander']],
  ['Tabouleh mit viel Petersilie', ['Bulgur', 'Petersilie', 'Minze', 'Tomaten', 'Frühlingszwiebeln', 'Zitrone', 'Olivenöl']],
  ['Halloumi-Salat mit Honig-Senf', ['Halloumi', 'Blattsalat', 'Avocado', 'Cherrytomaten', 'Honig', 'Senf', 'Kürbiskerne']],
  ['Brokkolisalat mit Cranberries', ['Brokkoli', 'Cranberries', 'Sonnenblumenkerne', 'Rote Zwiebel', 'Joghurt', 'Honig']],
  ['Gurkensalat mit Dill und Schmand', ['Gurke', 'Schmand', 'Dill', 'Zitrone', 'Senf']],
  ['Kartoffelsalat mit Radieschen', ['Kartoffeln', 'Radieschen', 'Gewürzgurken', 'Schnittlauch', 'Senf', 'Gemüsebrühe']],
  ['Wildreissalat mit Mango', ['Wildreis', 'Mango', 'Paprika', 'Frühlingszwiebeln', 'Limette', 'Cashewkerne', 'Koriander']],
  ['Endiviensalat mit Speckkartoffeln', ['Endivie', 'Kartoffeln', 'Speckwürfel', 'Zwiebel', 'Essig', 'Senf']],
  ['Feldsalat mit Birne und Walnuss', ['Feldsalat', 'Birne', 'Walnüsse', 'Ziegenkäse', 'Honig', 'Balsamico']],
  ['Avocado-Mais-Salat mit Limette', ['Avocado', 'Mais', 'Schwarze Bohnen', 'Paprika', 'Limette', 'Koriander', 'Chiliflocken']],
  // Buchweizen & Urgetreide
  ['Buchweizenkuchen mit gepresster Zucchini', ['Buchweizen', 'Zucchini', 'Eier', 'Parmesan', 'Frühlingszwiebeln', 'Muskat', 'Olivenöl']],
  ['Buchweizen-Bratlinge mit Kräuterquark', ['Buchweizen', 'Möhren', 'Eier', 'Haferflocken', 'Quark', 'Schnittlauch', 'Petersilie']],
  ['Buchweizen-Risotto mit Pilzen', ['Buchweizen', 'Champignons', 'Zwiebel', 'Weißwein', 'Parmesan', 'Thymian']],
  ['Kascha mit geschmortem Gemüse', ['Buchweizen', 'Zwiebel', 'Möhren', 'Champignons', 'Butter', 'Petersilie']],
  ['Buchweizen-Pfannkuchen (Galettes)', ['Buchweizenmehl', 'Eier', 'Milch', 'Bergkäse', 'Spinat', 'Champignons']],
  ['Buchweizen-Porridge mit Beeren', ['Buchweizen', 'Milch', 'Honig', 'Beeren', 'Mandeln', 'Zimt']],
  ['Hirse-Gemüse-Pfanne', ['Hirse', 'Zucchini', 'Paprika', 'Mais', 'Frühlingszwiebeln', 'Kräuterfrischkäse']],
  ['Hirseauflauf mit Kürbis', ['Hirse', 'Hokkaido-Kürbis', 'Eier', 'Milch', 'Bergkäse', 'Muskat']],
  ['Dinkel-Risotto mit grünem Spargel', ['Dinkel', 'Grüner Spargel', 'Zwiebel', 'Weißwein', 'Parmesan', 'Zitrone']],
  ['Grünkern-Bratlinge mit Joghurt-Dip', ['Grünkern', 'Zwiebel', 'Eier', 'Semmelbrösel', 'Joghurt', 'Kräuter']],
  ['Gerstengraupen-Pilz-Topf', ['Graupen', 'Champignons', 'Lauch', 'Möhren', 'Gemüsebrühe', 'Petersilie']],
  ['Amaranth-Gemüse-Bowl', ['Amaranth', 'Süßkartoffel', 'Brokkoli', 'Kichererbsen', 'Tahini', 'Zitrone']],
  // Suppen & Eintöpfe
  ['Kürbis-Kokos-Suppe', ['Hokkaido-Kürbis', 'Kokosmilch', 'Ingwer', 'Orangensaft', 'Kürbiskerne', 'Chiliflocken']],
  ['Tomatensuppe mit Grilled-Cheese-Ecken', ['Passierte Tomaten', 'Zwiebel', 'Sahne', 'Basilikum', 'Toastbrot', 'Cheddar']],
  ['Linsensuppe mit Essig', ['Tellerlinsen', 'Kartoffeln', 'Möhren', 'Lauch', 'Essig', 'Majoran']],
  ['Rote-Linsen-Kokos-Suppe', ['Rote Linsen', 'Kokosmilch', 'Ingwer', 'Curry', 'Tomaten', 'Koriander', 'Limette']],
  ['Kartoffelsuppe mit Würstchen', ['Kartoffeln', 'Möhren', 'Lauch', 'Wiener Würstchen', 'Majoran', 'Schmand']],
  ['Erbsensuppe mit Minze', ['Erbsen', 'Zwiebel', 'Gemüsebrühe', 'Minze', 'Schmand', 'Zitrone']],
  ['Blumenkohl-Käse-Suppe', ['Blumenkohl', 'Kartoffeln', 'Schmelzkäse', 'Muskat', 'Schnittlauch']],
  ['Französische Zwiebelsuppe', ['Zwiebeln', 'Butter', 'Weißwein', 'Gemüsebrühe', 'Baguette', 'Bergkäse']],
  ['Minestrone mit Parmesan', ['Möhren', 'Zucchini', 'Sellerie', 'Weiße Bohnen', 'Nudeln', 'Tomaten', 'Parmesan']],
  ['Süßkartoffel-Erdnuss-Suppe', ['Süßkartoffel', 'Erdnussbutter', 'Kokosmilch', 'Ingwer', 'Chiliflocken', 'Koriander']],
  ['Möhren-Ingwer-Suppe', ['Möhren', 'Ingwer', 'Orangensaft', 'Kokosmilch', 'Koriander']],
  ['Rote-Bete-Suppe mit Meerrettich', ['Rote Bete', 'Kartoffeln', 'Gemüsebrühe', 'Meerrettich', 'Schmand', 'Dill']],
  ['Gulaschsuppe vegetarisch', ['Sojawürfel', 'Paprika', 'Kartoffeln', 'Zwiebeln', 'Paprikapulver', 'Kümmel']],
  ['Chili sin Carne', ['Kidneybohnen', 'Mais', 'Sojagranulat', 'Tomaten', 'Paprika', 'Kreuzkümmel', 'Kakao']],
  ['Kichererbsen-Spinat-Eintopf', ['Kichererbsen', 'Spinat', 'Tomaten', 'Knoblauch', 'Kreuzkümmel', 'Zitrone']],
  ['Grüne Thai-Suppe mit Tofu', ['Grüne Currypaste', 'Kokosmilch', 'Tofu', 'Zuckerschoten', 'Champignons', 'Limette', 'Reisnudeln']],
  ['Ramen mit Ei und Pak Choi', ['Ramen-Nudeln', 'Miso', 'Eier', 'Pak Choi', 'Frühlingszwiebeln', 'Sesam', 'Ingwer']],
  ['Pho mit Reisnudeln', ['Reisnudeln', 'Gemüsebrühe', 'Ingwer', 'Sternanis', 'Zimt', 'Sojasprossen', 'Koriander', 'Limette']],
  ['Gazpacho', ['Tomaten', 'Gurke', 'Paprika', 'Knoblauch', 'Ciabatta', 'Olivenöl', 'Sherryessig']],
  ['Graupensuppe mit Wurzelgemüse', ['Graupen', 'Möhren', 'Sellerie', 'Lauch', 'Kartoffeln', 'Petersilie']],
  ['Zucchinicremesuppe', ['Zucchini', 'Kartoffeln', 'Zwiebel', 'Frischkäse', 'Basilikum']],
  ['Maronensuppe mit Sahnehaube', ['Maronen', 'Zwiebel', 'Gemüsebrühe', 'Sahne', 'Muskat', 'Thymian']],
  ['Bohneneintopf mit Kräutern', ['Weiße Bohnen', 'Tomaten', 'Möhren', 'Rosmarin', 'Knoblauch', 'Ciabatta']],
  ['Champignoncremesuppe', ['Champignons', 'Zwiebel', 'Sahne', 'Weißwein', 'Petersilie', 'Baguette']],
  ['Currylinsen-Dal mit Naan', ['Rote Linsen', 'Kokosmilch', 'Tomaten', 'Ingwer', 'Kurkuma', 'Kreuzkümmel', 'Naan']],
  // Currys & Asiatisch
  ['Gemüse-Massaman-Curry', ['Massaman-Currypaste', 'Kokosmilch', 'Kartoffeln', 'Erdnüsse', 'Zwiebel', 'Reis']],
  ['Rotes Thai-Curry mit Tofu', ['Rote Currypaste', 'Kokosmilch', 'Tofu', 'Paprika', 'Bambussprossen', 'Basilikum', 'Reis']],
  ['Gelbes Curry mit Süßkartoffel', ['Gelbe Currypaste', 'Kokosmilch', 'Süßkartoffel', 'Blumenkohl', 'Erbsen', 'Reis']],
  ['Palak Paneer', ['Paneer', 'Spinat', 'Tomaten', 'Ingwer', 'Garam Masala', 'Sahne', 'Naan']],
  ['Chana Masala', ['Kichererbsen', 'Tomaten', 'Zwiebel', 'Ingwer', 'Garam Masala', 'Koriander', 'Reis']],
  ['Butter Chicken', ['Hähnchenbrust', 'Tomaten', 'Sahne', 'Butter', 'Garam Masala', 'Ingwer', 'Reis']],
  ['Tikka Masala mit Blumenkohl', ['Blumenkohl', 'Joghurt', 'Tomaten', 'Garam Masala', 'Ingwer', 'Sahne', 'Reis']],
  ['Pad Thai mit Tofu', ['Reisnudeln', 'Tofu', 'Eier', 'Sojasprossen', 'Erdnüsse', 'Limette', 'Tamarindenpaste']],
  ['Gebratener Reis mit Ei und Gemüse', ['Reis', 'Eier', 'Erbsen', 'Möhren', 'Frühlingszwiebeln', 'Sojasauce', 'Sesamöl']],
  ['Nasi Goreng', ['Reis', 'Eier', 'Möhren', 'Lauch', 'Sojasauce', 'Sambal Oelek', 'Erdnüsse']],
  ['Yaki Udon mit Gemüse', ['Udon-Nudeln', 'Paprika', 'Pak Choi', 'Champignons', 'Sojasauce', 'Mirin', 'Sesam']],
  ['Teriyaki-Tofu mit Brokkoli', ['Tofu', 'Brokkoli', 'Sojasauce', 'Honig', 'Ingwer', 'Sesam', 'Reis']],
  ['Bibimbap', ['Reis', 'Spinat', 'Möhren', 'Sojasprossen', 'Champignons', 'Eier', 'Gochujang', 'Sesamöl']],
  ['Süß-sauer-Gemüsepfanne', ['Paprika', 'Ananas', 'Möhren', 'Zwiebel', 'Sojasauce', 'Essig', 'Reis']],
  ['Sesamnudeln mit Erdnusssauce', ['Mie-Nudeln', 'Erdnussbutter', 'Sojasauce', 'Limette', 'Gurke', 'Frühlingszwiebeln', 'Sesam']],
  ['Frühlingsrollen mit Dip', ['Frühlingsrollenteig', 'Weißkohl', 'Möhren', 'Glasnudeln', 'Sojasauce', 'Süß-Chili-Sauce']],
  ['Sommerrollen mit Erdnussdip', ['Reispapier', 'Reisnudeln', 'Möhren', 'Gurke', 'Minze', 'Erdnussbutter', 'Limette']],
  ['Gyoza mit Gemüsefüllung', ['Gyoza-Teig', 'Weißkohl', 'Champignons', 'Ingwer', 'Sojasauce', 'Sesamöl', 'Frühlingszwiebeln']],
  ['Miso-Auberginen (Nasu Dengaku)', ['Auberginen', 'Miso', 'Mirin', 'Honig', 'Sesam', 'Reis', 'Frühlingszwiebeln']],
  ['Mapo Tofu vegetarisch', ['Tofu', 'Champignons', 'Gochujang', 'Sojasauce', 'Knoblauch', 'Ingwer', 'Reis']],
  ['Hähnchen-Satay mit Erdnusssauce', ['Hähnchenbrust', 'Erdnussbutter', 'Kokosmilch', 'Sojasauce', 'Limette', 'Reis', 'Gurke']],
  ['Kokos-Limetten-Reis mit Mango', ['Reis', 'Kokosmilch', 'Limette', 'Mango', 'Cashewkerne', 'Koriander']],
  ['Wok-Gemüse mit Cashews', ['Brokkoli', 'Paprika', 'Zuckerschoten', 'Cashewkerne', 'Sojasauce', 'Ingwer', 'Reis']],
  ['Curry-Udon-Suppe', ['Udon-Nudeln', 'Currypulver', 'Kokosmilch', 'Möhren', 'Zwiebel', 'Frühlingszwiebeln']],
  ['Onigiri mit Sesam und Avocado', ['Sushireis', 'Nori', 'Avocado', 'Sesam', 'Sojasauce', 'Gurke']],
  // Ofengerichte & Aufläufe
  ['Kartoffelgratin mit Lauch', ['Kartoffeln', 'Lauch', 'Sahne', 'Bergkäse', 'Muskat', 'Knoblauch']],
  ['Moussaka vegetarisch', ['Auberginen', 'Kartoffeln', 'Linsen', 'Tomaten', 'Béchamelsauce', 'Parmesan', 'Zimt']],
  ['Gefüllte Paprika mit Reis', ['Paprika', 'Reis', 'Feta', 'Tomaten', 'Zwiebel', 'Petersilie']],
  ['Gefüllte Zucchini mit Couscous', ['Zucchini', 'Couscous', 'Feta', 'Tomaten', 'Pinienkerne', 'Minze']],
  ['Cannelloni mit Spinat-Ricotta', ['Cannelloni', 'Spinat', 'Ricotta', 'Passierte Tomaten', 'Parmesan', 'Muskat']],
  ['Kürbis-Lasagne', ['Lasagneplatten', 'Hokkaido-Kürbis', 'Béchamelsauce', 'Salbei', 'Parmesan', 'Muskat']],
  ['Blumenkohl aus dem Ofen mit Tahini', ['Blumenkohl', 'Tahini', 'Zitrone', 'Kreuzkümmel', 'Granatapfel', 'Petersilie']],
  ['Ofen-Süßkartoffeln mit Feta-Dip', ['Süßkartoffel', 'Feta', 'Joghurt', 'Honig', 'Rosmarin', 'Walnüsse']],
  ['Ratatouille mit Baguette', ['Aubergine', 'Zucchini', 'Paprika', 'Tomaten', 'Zwiebel', 'Thymian', 'Baguette']],
  ['Zwiebelkuchen mit Kümmel', ['Mürbeteig', 'Zwiebeln', 'Schmand', 'Eier', 'Kümmel', 'Speckwürfel']],
  ['Flammkuchen klassisch', ['Flammkuchenteig', 'Schmand', 'Zwiebeln', 'Speckwürfel', 'Schnittlauch']],
  ['Flammkuchen mit Birne und Gorgonzola', ['Flammkuchenteig', 'Schmand', 'Birne', 'Gorgonzola', 'Walnüsse', 'Honig']],
  ['Pizza Margherita selbstgemacht', ['Pizzateig', 'Passierte Tomaten', 'Mozzarella', 'Basilikum', 'Olivenöl']],
  ['Pizza mit Rucola und Parmaschinken', ['Pizzateig', 'Passierte Tomaten', 'Mozzarella', 'Rucola', 'Parmaschinken', 'Parmesan']],
  ['Nudelauflauf mit Brokkoli', ['Penne', 'Brokkoli', 'Sahne', 'Bergkäse', 'Muskat', 'Semmelbrösel']],
  ['Wirsingroulade mit Pilzfüllung', ['Wirsing', 'Champignons', 'Reis', 'Zwiebel', 'Gemüsebrühe', 'Schmand']],
  ['Shakshuka mit Feta', ['Tomaten', 'Paprika', 'Eier', 'Feta', 'Kreuzkümmel', 'Petersilie', 'Fladenbrot']],
  ['Ofen-Gnocchi mit Tomaten und Mozzarella', ['Gnocchi', 'Cherrytomaten', 'Mozzarella', 'Basilikum', 'Knoblauch', 'Olivenöl']],
  ['Hasselback-Kartoffeln mit Kräuterquark', ['Kartoffeln', 'Butter', 'Rosmarin', 'Quark', 'Schnittlauch', 'Knoblauch']],
  ['Mac and Cheese aus dem Ofen', ['Makkaroni', 'Cheddar', 'Milch', 'Butter', 'Semmelbrösel', 'Muskat']],
  // Bowls & schnelle Pfannen
  ['Buddha Bowl mit Erdnusssauce', ['Quinoa', 'Süßkartoffel', 'Kichererbsen', 'Avocado', 'Rotkohl', 'Erdnussbutter', 'Limette']],
  ['Falafel-Bowl mit Hummus', ['Falafel', 'Hummus', 'Bulgur', 'Gurke', 'Tomaten', 'Petersilie', 'Zitrone']],
  ['Burrito Bowl', ['Reis', 'Schwarze Bohnen', 'Mais', 'Avocado', 'Tomatensalsa', 'Limette', 'Koriander']],
  ['Gyros-Bowl mit Tzatziki', ['Hähnchenbrust', 'Reis', 'Tomaten', 'Gurke', 'Joghurt', 'Knoblauch', 'Oregano']],
  ['Herbst-Bowl mit Kürbis und Grünkohl', ['Hokkaido-Kürbis', 'Grünkohl', 'Quinoa', 'Cranberries', 'Kürbiskerne', 'Tahini']],
  ['Halloumi-Bowl mit Bulgur', ['Halloumi', 'Bulgur', 'Paprika', 'Gurke', 'Minze', 'Joghurt', 'Granatapfel']],
  ['Räuchertofu-Pfanne mit grünen Bohnen', ['Räuchertofu', 'Grüne Bohnen', 'Kartoffeln', 'Zwiebel', 'Senf', 'Bohnenkraut']],
  ['Halloumi-Gemüse-Spieße', ['Halloumi', 'Zucchini', 'Paprika', 'Champignons', 'Olivenöl', 'Zitrone', 'Fladenbrot']],
  ['Kichererbsen-Pfanne mit Spinat und Feta', ['Kichererbsen', 'Spinat', 'Feta', 'Tomaten', 'Knoblauch', 'Zitrone']],
  ['Zucchini-Nudeln mit Avocado-Pesto', ['Zucchini', 'Avocado', 'Basilikum', 'Pinienkerne', 'Zitrone', 'Parmesan']],
  ['Pilz-Stroganoff', ['Champignons', 'Zwiebel', 'Schmand', 'Senf', 'Paprikapulver', 'Bandnudeln']],
  ['Blumenkohl-Reis-Pfanne', ['Blumenkohl', 'Erbsen', 'Möhren', 'Eier', 'Sojasauce', 'Frühlingszwiebeln']],
  ['Süßkartoffel-Rösti mit Avocado', ['Süßkartoffel', 'Eier', 'Mehl', 'Avocado', 'Limette', 'Schmand']],
  ['Spiegelei-Pfanne mit Bratkartoffeln', ['Kartoffeln', 'Eier', 'Zwiebel', 'Gewürzgurken', 'Schnittlauch']],
  ['Polenta mit geschmorten Tomaten', ['Polenta', 'Cherrytomaten', 'Parmesan', 'Butter', 'Thymian', 'Knoblauch']],
  // Herzhafte Kuchen, Tartes & Puffer
  ['Quiche Lorraine', ['Mürbeteig', 'Speckwürfel', 'Eier', 'Sahne', 'Bergkäse', 'Muskat']],
  ['Spinat-Feta-Quiche', ['Mürbeteig', 'Spinat', 'Feta', 'Eier', 'Sahne', 'Muskat']],
  ['Tomaten-Tarte mit Senf', ['Blätterteig', 'Tomaten', 'Senf', 'Bergkäse', 'Thymian', 'Honig']],
  ['Mangold-Ricotta-Tarte', ['Mürbeteig', 'Mangold', 'Ricotta', 'Eier', 'Parmesan', 'Muskat']],
  ['Zucchini-Käse-Kuchen (herzhaft)', ['Zucchini', 'Mehl', 'Eier', 'Bergkäse', 'Joghurt', 'Frühlingszwiebeln', 'Backpulver']],
  ['Kartoffelpuffer mit Apfelmus', ['Kartoffeln', 'Eier', 'Mehl', 'Zwiebel', 'Apfelmus', 'Muskat']],
  ['Möhren-Pastinaken-Puffer', ['Möhren', 'Pastinaken', 'Eier', 'Mehl', 'Schmand', 'Schnittlauch']],
  ['Maispuffer mit Avocadodip', ['Mais', 'Mehl', 'Eier', 'Frühlingszwiebeln', 'Avocado', 'Limette', 'Joghurt']],
  ['Brokkoli-Käse-Nuggets', ['Brokkoli', 'Semmelbrösel', 'Eier', 'Cheddar', 'Joghurt', 'Schnittlauch']],
  ['Empanadas mit Gemüsefüllung', ['Mürbeteig', 'Paprika', 'Mais', 'Zwiebel', 'Kreuzkümmel', 'Eier']],
  ['Börek mit Spinat und Feta', ['Yufkateig', 'Spinat', 'Feta', 'Eier', 'Joghurt', 'Sesam']],
  ['Pastinaken-Waffeln mit Kräuterdip', ['Pastinaken', 'Mehl', 'Eier', 'Milch', 'Quark', 'Kräuter']],
  ['Herzhafte Käsewaffeln', ['Mehl', 'Eier', 'Milch', 'Bergkäse', 'Schnittlauch', 'Backpulver']],
  ['Pilz-Wellington (Blätterteig)', ['Blätterteig', 'Champignons', 'Zwiebel', 'Walnüsse', 'Thymian', 'Eier']],
  ['Focaccia mit Rosmarin', ['Mehl', 'Hefe', 'Olivenöl', 'Rosmarin', 'Meersalz', 'Cherrytomaten']],
  // Wraps, Burger & Abendbrot
  ['Halloumi-Wrap mit Minzjoghurt', ['Tortilla-Wraps', 'Halloumi', 'Blattsalat', 'Tomaten', 'Joghurt', 'Minze']],
  ['Falafel-Wrap mit Hummus', ['Tortilla-Wraps', 'Falafel', 'Hummus', 'Gurke', 'Tomaten', 'Petersilie']],
  ['Veggie-Burger mit Bohnenpatty', ['Burgerbrötchen', 'Kidneybohnen', 'Haferflocken', 'Zwiebel', 'Cheddar', 'Blattsalat', 'Tomaten']],
  ['Pilz-Burger mit Portobello', ['Burgerbrötchen', 'Portobello-Pilze', 'Cheddar', 'Rucola', 'Rote Zwiebel', 'Mayonnaise']],
  ['Caprese-Sandwich vom Grill', ['Ciabatta', 'Mozzarella', 'Tomaten', 'Basilikum', 'Pesto']],
  ['Club-Sandwich mit Ei', ['Toastbrot', 'Eier', 'Blattsalat', 'Tomaten', 'Mayonnaise', 'Gewürzgurken']],
  ['Avocado-Toast mit pochiertem Ei', ['Sauerteigbrot', 'Avocado', 'Eier', 'Zitrone', 'Chiliflocken', 'Radieschen']],
  ['Pita mit Halloumi und Krautsalat', ['Pita', 'Halloumi', 'Spitzkohl', 'Joghurt', 'Zitrone', 'Minze']],
  ['Quesadillas mit Bohnen und Käse', ['Tortilla-Wraps', 'Schwarze Bohnen', 'Cheddar', 'Mais', 'Tomatensalsa', 'Koriander']],
  ['Bruschetta-Platte', ['Ciabatta', 'Tomaten', 'Knoblauch', 'Basilikum', 'Olivenöl', 'Mozzarella']],
  ['Brotzeit-Brett mit Obatzda', ['Camembert', 'Frischkäse', 'Butter', 'Paprikapulver', 'Zwiebel', 'Brezen', 'Radieschen']],
  ['Überbackenes Baguette mit Pilzen', ['Baguette', 'Champignons', 'Frischkäse', 'Bergkäse', 'Petersilie']],
  // Süß & Frühstück fürs Abendessen
  ['Kaiserschmarrn mit Apfelmus', ['Mehl', 'Eier', 'Milch', 'Rosinen', 'Butter', 'Puderzucker', 'Apfelmus']],
  ['Pancakes mit Blaubeeren', ['Mehl', 'Eier', 'Milch', 'Blaubeeren', 'Ahornsirup', 'Backpulver']],
  ['Ofenpfannkuchen (Dutch Baby)', ['Mehl', 'Eier', 'Milch', 'Butter', 'Beeren', 'Puderzucker']],
  ['Milchreis mit Zimt und Kirschen', ['Milchreis', 'Milch', 'Zucker', 'Zimt', 'Sauerkirschen', 'Vanille']],
  ['Grießbrei mit Beerenkompott', ['Grieß', 'Milch', 'Honig', 'Beeren', 'Vanille', 'Zimt']],
  ['Arme Ritter mit Zimtzucker', ['Toastbrot', 'Eier', 'Milch', 'Butter', 'Zimt', 'Zucker', 'Apfelmus']],
  ['French Toast herzhaft', ['Sauerteigbrot', 'Eier', 'Milch', 'Bergkäse', 'Schnittlauch', 'Tomaten']],
  ['Porridge mit Banane und Nüssen', ['Haferflocken', 'Milch', 'Banane', 'Walnüsse', 'Honig', 'Zimt']],
  ['Overnight Oats mit Apfel und Zimt', ['Haferflocken', 'Joghurt', 'Milch', 'Apfel', 'Zimt', 'Mandeln']],
  ['Shakshuka süß-pikant mit Datteln', ['Tomaten', 'Paprika', 'Eier', 'Datteln', 'Harissa', 'Fladenbrot']],
  ['Crêpes mit Zitrone und Zucker', ['Mehl', 'Eier', 'Milch', 'Butter', 'Zitrone', 'Zucker']],
  ['Waffeln mit heißen Himbeeren', ['Mehl', 'Eier', 'Milch', 'Butter', 'Himbeeren', 'Puderzucker']],
  ['Apfelküchle mit Vanilleeis', ['Äpfel', 'Mehl', 'Eier', 'Milch', 'Zimt', 'Zucker', 'Vanilleeis']],
  ['Quarkkeulchen mit Apfelkompott', ['Quark', 'Kartoffeln', 'Mehl', 'Eier', 'Zimt', 'Äpfel', 'Rosinen']],
];
function fmtEuro(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
function expenseBalance() {
  // > 0: Linda schuldet Stefan; < 0: Stefan schuldet Linda
  return (DATA.expenses || [])
    .filter(e => !e.settled)
    .reduce((s, e) => s + (e.paidBy === 'stefan' ? e.amount : -e.amount) / 2, 0);
}

/* ---------- Verbundenheit: Frage des Tages & Wochen-Check-in ---------- */
const COUPLE_QUESTIONS = [
  'Was war dein schönster Moment mit mir in letzter Zeit?',
  'Wobei fühlst du dich von mir am meisten gesehen?',
  'Was würdest du gern mal wieder zusammen machen, das wir lange nicht gemacht haben?',
  'Wofür bist du mir gerade dankbar – auch wenn es klein ist?',
  'Was wünschst du dir diese Woche von mir?',
  'Wann hast du dich zuletzt so richtig lebendig gefühlt?',
  'Was hat dich diese Woche zum Lachen gebracht?',
  'Welche kleine Geste von mir bedeutet dir am meisten?',
  'Worauf freust du dich gerade am meisten?',
  'Was beschäftigt dich im Moment, worüber wir noch nicht gesprochen haben?',
  'Wie kann ich dich unterstützen, wenn du gestresst bist?',
  'Was war dein Lieblingsmoment aus unserem ersten gemeinsamen Jahr?',
  'Welchen Traum würdest du gern mal zusammen angehen?',
  'Was hast du Neues über dich gelernt in letzter Zeit?',
  'Wo würdest du mit mir hinreisen, wenn alles möglich wäre?',
  'Was macht unser Zuhause für dich zu einem Zuhause?',
  'Wann fühlst du dich mir am nächsten?',
  'Welche Gewohnheit von uns beiden magst du am liebsten?',
  'Was möchtest du in einem Jahr über uns sagen können?',
  'Was hat dich an mir überrascht, seit wir zusammen wohnen?',
  'Welches Essen verbindest du mit einer schönen Erinnerung an uns?',
  'Was brauchst du nach einem anstrengenden Tag am meisten?',
  'Worin bin ich dir ein Vorbild?',
  'Was würdest du unserem jüngeren Ich raten?',
  'Welche Musik passt gerade zu deinem Leben?',
  'Was gibt dir in stressigen Zeiten Halt?',
  'Welchen Ort möchtest du mir unbedingt mal zeigen?',
  'Was war eine Herausforderung, die uns stärker gemacht hat?',
  'Wie sieht für dich ein perfekter gemeinsamer Sonntag aus?',
  'Wofür möchtest du dir selbst öfter Zeit nehmen?',
  'Was hat dich heute zum Schmunzeln gebracht?',
  'Welchen Moment von uns würdest du gern nochmal erleben?',
  'Was war das Beste an deinem heutigen Tag?',
  'Wobei kannst du am besten abschalten?',
  'Welches Lied verbindest du mit uns?',
  'Was würdest du machen, wenn wir morgen beide frei hätten?',
  'Worauf bist du gerade stolz – bei dir oder bei mir?',
  'Welche kleine Angewohnheit von mir findest du heimlich süß?',
  'Was möchtest du unbedingt noch lernen?',
  'Wie merke ich am besten, dass es dir nicht gut geht?',
  'Was war dein Lieblingsurlaub bisher – und warum?',
  'Welchen Film sollten wir unbedingt mal zusammen schauen?',
  'Was bedeutet Geborgenheit für dich?',
  'Welche Tradition sollten wir zwei uns erfinden?',
  'Was hast du als Kind geliebt, das du heute vermisst?',
  'Wann hast du dich das erste Mal in mich verliebt gefühlt?',
  'Was würdest du an einem verregneten Sonntag am liebsten machen?',
  'Welches Kompliment hörst du am liebsten?',
  'Was wolltest du mich schon immer mal fragen?',
  'Wie stellst du dir uns in zehn Jahren vor?',
  'Was hilft dir, nach einem Streit wieder auf mich zuzugehen?',
  'Welcher Ort fühlt sich für dich nach Heimat an?',
  'Was war die beste Entscheidung deines Lebens?',
  'Worüber würdest du gern öfter mit mir reden?',
  'Welches Essen könnte ich für dich kochen, um dich glücklich zu machen?',
  'Was tust du nur für dich – und sollte ich das öfter respektieren?',
  'Welche Superkraft hätte unsere Beziehung, wenn sie eine hätte?',
  'Was hat dir diese Woche Energie gegeben – und was hat welche gezogen?',
  'Wann fühlst du dich von mir am meisten unterstützt?',
  'Welches Abenteuer steht noch auf deiner Liste?',
  'Was schätzt du an unserem Alltag am meisten?',
  'Welche Jahreszeit passt am besten zu unserer Beziehung – und warum?',
  'Was war dein schönstes Geschenk, das nichts gekostet hat?',
  'Worin sind wir zwei ein unschlagbares Team?',
  'Was möchtest du am Wochenende auf keinen Fall tun?',
  'Welcher Duft weckt bei dir Erinnerungen?',
  'Was würdest du tun, wenn du dich einen Tag lang um nichts kümmern müsstest?',
  'Welchen Rat würdest du frisch verliebten Paaren geben?',
  'Was findest du mutig an mir?',
  'Wie zeigst du am liebsten Zuneigung – und wie empfängst du sie am liebsten?',
  'Was war der lustigste Moment, den wir zusammen erlebt haben?',
  'Wovon träumst du, wenn du aus dem Fenster schaust?',
  'Was macht dir gerade ein bisschen Sorgen – und wie kann ich helfen?',
  'Welches Ritual von uns möchtest du nie verlieren?',
  'Was war das Netteste, das diese Woche jemand zu dir gesagt hat?',
  'Wobei vergisst du komplett die Zeit?',
  'Welche drei Worte beschreiben uns am besten?',
  'Was möchtest du morgen anders machen als heute?',
  'Wen bewunderst du – und wofür?',
  'Was war dein erster Eindruck von mir – und was stimmt davon noch?',
  'Welche Kleinigkeit macht deinen Tag sofort besser?',
  'Wo würdest du gern mal einen ganzen Monat leben?',
  'Was sollten wir öfter feiern?',
  'Welches Buch oder welche Serie hat dich zuletzt berührt?',
  'Was tut dir gut, wenn du überfordert bist?',
  'Welchen Tag unseres Lebens würdest du gern nochmal von außen ansehen?',
  'Was möchtest du dieses Jahr noch zu Ende bringen?',
  'Was hast du durch mich Neues kennengelernt?',
  'Wann fühlst du dich am freisten?',
  'Was würdest du gern öfter zu zweit kochen?',
  'Welcher gemeinsame Plan macht dir gerade am meisten Vorfreude?',
  'Was hat dich an unserem Kennenlernen überrascht?',
  'Welchen Ausflug sollten wir diesen Monat noch machen?',
  'Was ist dein Lieblingsplatz in unserer Wohnung – und warum?',
  'Worüber lachst du, obwohl du es eigentlich nicht solltest?',
  'Was möchtest du öfter hören von mir?',
  'Wie sieht dein perfekter Feierabend aus?',
  'Was würdest du dich trauen, wenn du wüsstest, dass es klappt?',
  'Welche Erinnerung an uns zaubert dir sofort ein Lächeln ins Gesicht?',
  'Was ist für dich der Unterschied zwischen Verliebtsein und Liebe?',
  'Welchen Menschen möchtest du mal wieder treffen?',
  'Was war heute anstrengend – und was hat dich getragen?',
  'Welche Musik lief bei unserem ersten Date – oder hätte laufen sollen?',
  'Was können wir zwei besser als alle anderen Paare?',
  'Wovor hattest du mal Angst, die heute weg ist?',
  'Was wünschst du dir für unseren nächsten Urlaub?',
  'Welche Frage stellst du dir in letzter Zeit oft?',
  'Was macht dich an einem Morgen glücklich?',
  'Welches Gericht erinnert dich an deine Kindheit?',
  'Was würdest du tun, wenn Geld keine Rolle spielen würde?',
  'Wann hast du zuletzt etwas zum ersten Mal gemacht?',
  'Was schätzt du an der Familie oder den Freunden des anderen?',
  'Welchen kleinen Luxus gönnst du dir viel zu selten?',
  'Was bedeutet für dich ein gelungener Tag?',
  'Worin möchtest du in einem Jahr besser sein?',
  'Welches Tier wären wir zwei als Paar?',
  'Was war die schönste Überraschung, die du je bekommen hast?',
  'Womit kann ich dich immer aufheitern?',
  'Was möchtest du am liebsten sofort mit mir machen, wenn du das hier liest?',
];
function dailyCoupleQuestions() {
  const d = new Date();
  const start = Date.UTC(d.getFullYear(), 0, 0);
  const doy = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 864e5);
  const len = COUPLE_QUESTIONS.length;
  const i1 = (doy * 7 + 3) % len;
  let i2 = (doy * 11 + 57) % len;
  if (i2 === i1) i2 = (i2 + 1) % len;
  return [COUPLE_QUESTIONS[i1], COUPLE_QUESTIONS[i2]];
}

/* ---------- Mission der Woche: einer bereitet für den anderen etwas vor ---------- */
const COUPLE_MISSIONS = [
  'Bereite ein kleines Blind-Date vor – Ort geheim, Outfit-Hinweis erlaubt.',
  'Koche einen Überraschungs-Abend mit drei Gängen – das Menü bleibt bis zum Schluss geheim.',
  'Plane einen Spaziergang mit einem Überraschungs-Zwischenstopp (Eis, Aussicht, Bank mit Snack …).',
  'Schreib einen kleinen Brief und verstecke ihn dort, wo der andere ihn diese Woche findet.',
  'Organisiere einen Filmabend wie im Kino: Ticket, Snackbar, Programm.',
  'Stelle eine Playlist mit Liedern zusammen, die dich an euch erinnern – und hört sie gemeinsam.',
  'Plane ein Frühstück im Bett – inklusive einer Sache, die der andere besonders liebt.',
  'Bereite ein Mini-Picknick vor, drinnen oder draußen – Hauptsache Decke.',
  'Suche ein Foto von euch aus, lass es drucken oder rahme es – und erzähle, warum genau dieses.',
  'Plane eine kleine Aktivität, die der andere schon lange mal machen wollte.',
  'Bereite einen Spieleabend vor – mit Preis für den Gewinner.',
  'Übernimm heimlich eine Aufgabe, die der andere diese Woche gehasst hätte.',
  'Plane einen Abend komplett ohne Handys – und überlege dir, was ihr stattdessen macht.',
  'Bereite ein Verkostungs-Spiel vor: drei Dinge blind probieren und erraten.',
  'Organisiere eine Mini-Schnitzeljagd durch die Wohnung mit einer Überraschung am Ende.',
  'Plane einen Sonnenauf- oder Sonnenuntergang an einem schönen Ort – mit Thermoskanne.',
  'Suche ein neues Rezept aus und kocht es zum ersten Mal zusammen.',
  'Bereite einen Wellness-Abend vor: Kerzen, Musik, vielleicht eine Massage.',
  'Plane einen Ausflug in einen Ort, in dem ihr beide noch nie wart.',
  'Erstelle ein kleines Quiz über euch beide – wer kennt den anderen besser?',
  'Bereite eine „Erinnerungs-Zeitreise“ vor: besucht einen Ort aus eurer Anfangszeit.',
  'Kaufe eine Kleinigkeit unter 10 €, die perfekt zum anderen passt – und erkläre warum.',
  'Plane einen Abend mit dem Lieblingsessen des anderen – ohne dass er etwas tun muss.',
  'Bereite ein gemeinsames Kreativ-Projekt vor: malen, bauen, backen – egal was.',
  'Organisiere eine Fahrrad- oder Spazierrunde mit Einkehr-Überraschung.',
  'Schreibe fünf Dinge auf, die du am anderen liebst – und lies sie ihm vor.',
  'Plane einen Abend nur mit Dingen, die nichts kosten – und beweise, dass er trotzdem großartig wird.',
  'Bereite ein Themen-Dinner vor: ein Land, sein Essen, seine Musik.',
  'Organisiere ein Fotoshooting zu zweit – Selbstauslöser reicht, drei Orte, zehn Bilder.',
  'Suche eine neue Route für einen Abendspaziergang aus und baue eine Überraschung ein.',
  'Plane einen „Ja-Tag“-Vormittag: Der andere wünscht, du erfüllst (im Rahmen!).',
  'Backe etwas, das der andere liebt – oder lerne es extra dafür.',
  'Bereite einen Rätselabend vor: Escape-Spiel, Kreuzworträtsel oder selbst ausgedacht.',
  'Plane ein Candle-Light-Dinner zuhause – Handy-Verbot inklusive.',
  'Organisiere eine kleine Weinprobe oder Saftverkostung mit drei Sorten.',
  'Erstelle eine „Warum wir gut zusammenpassen“-Liste mit zehn Punkten.',
  'Plane einen Nachmittag in der Natur mit einer Aktivität, die ihr noch nie gemacht habt.',
  'Bereite ein Frühstücks-Date am Wochenende vor – an einem ungewöhnlichen Ort.',
  'Suche drei Songs aus, die eure Zukunft beschreiben sollen – und erkläre sie beim Abendessen.',
  'Organisiere einen Tanzabend im Wohnzimmer – Playlist und Programm sind deine Sache.',
  'Plane eine Fahrt ins Blaue: Der andere weiß nur die Abfahrtszeit.',
  'Bereite einen „Kindheitsabend“ vor: Essen, Spiel oder Film aus deiner Kindheit.',
  'Verwandle das Wohnzimmer in ein Heimkino – mit Karten, Snacks und Programmheft.',
  'Plane ein Sport- oder Bewegungs-Date, das euch beiden Spaß macht.',
  'Bereite ein Vier-Gänge-Menü vor, bei dem jeder Gang aus einem anderen Land kommt.',
  'Organisiere eine kleine Museums-, Markt- oder Stadtteil-Erkundung.',
  'Baue eine Kissenburg und plane einen gemütlichen Abend darin.',
  'Bereite ein „Interview“ mit zehn Fragen vor, die du dem anderen schon immer stellen wolltest.',
  'Plane einen Abend, an dem ihr gemeinsam etwas für später plant: Reise, Projekt, Traum.',
  'Überrasche den anderen mit einem Lieblingsgericht als Picknick am ungewöhnlichen Ort.',
  'Bereite eine kleine Zeitkapsel vor: Briefe und Fotos, die ihr in einem Jahr öffnet.',
  'Plane einen Abend, an dem ihr gemeinsam euer Lieblingsfoto auswählt und einrahmt.',
];
/* Alle 2 Wochen eine Mission; wer vorbereitet, wechselt pro Runde.
   52 Missionen × 2 Wochen = 2 Jahre ohne Wiederholung. */
function currentMission() {
  const period = Math.floor(startOfWeek(new Date()).getTime() / (14 * 864e5));
  const key = 'p' + period;
  const rerolled = !!(DATA.missionSkips && DATA.missionSkips[key]);
  const len = COUPLE_MISSIONS.length;
  const idx = ((period * 3) + (rerolled ? 17 : 0)) % len;
  return {
    task: COUPLE_MISSIONS[idx],
    wer: period % 2 === 0 ? 'stefan' : 'linda',
    key,
    rerolled,
  };
}
function weekKey() { return 'w' + toISO(startOfWeek(new Date())); }
function checkinOf(person) {
  return (DATA.checkins && DATA.checkins[weekKey()] && DATA.checkins[weekKey()][person]) || null;
}
function saveCheckin(person, answers) {
  if (!DATA.checkins) DATA.checkins = {};
  if (!DATA.checkins[weekKey()]) DATA.checkins[weekKey()] = {};
  DATA.checkins[weekKey()][person] = answers;
  save();
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
