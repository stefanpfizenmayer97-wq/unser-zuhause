/* Trainings-Bibliothek: Workouts für Zuhause, zu zweit, im Gym und Ausdauer.
   Format der Übungen: [Name, Umfang] – Umfang als Sätze×Wdh. oder Zeit. */

const HOME_WORKOUTS = {
  ganzkoerper: { name: 'Ganzkörper zuhause', minutes: 30, rounds: '3 Runden, 60 Sek. Pause dazwischen', ex: [
    ['Hampelmänner (Aufwärmen)', '60 Sek.'],
    ['Kniebeugen', '15 Wdh.'],
    ['Liegestütze (Knie erlaubt)', '10–12 Wdh.'],
    ['Ausfallschritte im Wechsel', '10 je Seite'],
    ['Plank', '40 Sek.'],
    ['Rudern mit Handtuch am Türrahmen', '12 Wdh.'],
    ['Glute Bridge', '15 Wdh.'],
    ['Mountain Climbers', '30 Sek.'],
  ]},
  bauch: { name: 'Bauch-Workout', minutes: 20, rounds: '3 Runden, 45 Sek. Pause', ex: [
    ['Crunches', '20 Wdh.'],
    ['Beinheben liegend', '12 Wdh.'],
    ['Russian Twists', '20 je Seite'],
    ['Plank', '45 Sek.'],
    ['Seitstütz', '30 Sek. je Seite'],
    ['Fahrrad-Crunches', '20 je Seite'],
    ['Toter Käfer (Dead Bug)', '10 je Seite'],
  ]},
  beine: { name: 'Beine & Po', minutes: 25, rounds: '3 Runden, 60 Sek. Pause', ex: [
    ['Kniebeugen', '20 Wdh.'],
    ['Ausfallschritte rückwärts', '12 je Seite'],
    ['Sumo-Kniebeugen', '15 Wdh.'],
    ['Glute Bridge einbeinig', '10 je Seite'],
    ['Wandsitz', '45 Sek.'],
    ['Wadenheben', '25 Wdh.'],
    ['Sprungkniebeugen (leicht)', '10 Wdh.'],
  ]},
  arme: { name: 'Arme & Schultern', minutes: 20, rounds: '3 Runden, 45 Sek. Pause', ex: [
    ['Liegestütze eng (Trizeps)', '8–10 Wdh.'],
    ['Dips an der Stuhlkante', '10 Wdh.'],
    ['Pike Push-ups (Schultern)', '8 Wdh.'],
    ['Bizeps-Curls mit Wasserflaschen', '15 Wdh.'],
    ['Seitheben mit Flaschen', '12 Wdh.'],
    ['Plank mit Schulterklopfen', '10 je Seite'],
  ]},
  stretch: { name: 'Stretching', minutes: 15, rounds: '1 Durchgang, jede Position ruhig halten', ex: [
    ['Nacken zur Seite neigen', '30 Sek. je Seite'],
    ['Schulterkreisen + Arm über die Brust', '30 Sek. je Arm'],
    ['Katze-Kuh im Vierfüßler', '60 Sek.'],
    ['Herabschauender Hund', '45 Sek.'],
    ['Ausfallschritt-Hüftbeuger-Dehnung', '40 Sek. je Seite'],
    ['Sitzende Vorbeuge (Beinrückseite)', '45 Sek.'],
    ['Taube (Po/Hüfte)', '40 Sek. je Seite'],
    ['Drehsitz (Wirbelsäule)', '30 Sek. je Seite'],
  ]},
  yoga: { name: 'Yoga-Flow', minutes: 20, rounds: 'Ruhig atmen, 3–5 Atemzüge je Haltung, 2 Durchgänge', ex: [
    ['Berghaltung + Arme heben', '5 Atemzüge'],
    ['Vorbeuge', '5 Atemzüge'],
    ['Halber Sonnengruß', '3 Wiederholungen'],
    ['Krieger I', '5 Atemzüge je Seite'],
    ['Krieger II', '5 Atemzüge je Seite'],
    ['Herabschauender Hund', '5 Atemzüge'],
    ['Kobra', '5 Atemzüge'],
    ['Kindhaltung', '8 Atemzüge'],
    ['Rückenlage-Twist + Endentspannung', '2 Min.'],
  ]},
};

const PAAR_WORKOUTS = [
  { id: 'zirkel20', name: 'Partner-Zirkel', minutes: 20, rounds: '4 Runden: 40 Sek. Übung, 20 Sek. Wechselpause – einer macht A, der andere B, dann tauschen', ex: [
    ['A: Kniebeugen / B: Plank', '40 Sek.'],
    ['A: Mountain Climbers / B: Glute Bridge', '40 Sek.'],
    ['A: Liegestütze / B: Wandsitz', '40 Sek.'],
    ['A: Hampelmänner / B: Crunches', '40 Sek.'],
  ]},
  { id: 'sync20', name: 'Synchron-Workout', minutes: 20, rounds: '3 Runden gemeinsam im gleichen Takt, 60 Sek. Pause', ex: [
    ['Kniebeugen Rücken an Rücken', '15 Wdh.'],
    ['High-Five-Liegestütze (versetzt)', '8 Wdh.'],
    ['Partner-Sit-ups mit Abklatschen', '15 Wdh.'],
    ['Ausfallschritte aufeinander zu', '10 je Seite'],
    ['Doppel-Plank (gegenüber, Blickkontakt!)', '45 Sek.'],
  ]},
  { id: 'kraft30', name: 'Partner-Kraft', minutes: 30, rounds: '3 Runden, 90 Sek. Pause – Partner gibt Widerstand oder assistiert', ex: [
    ['Handtuch-Rudern gegeneinander', '12 Wdh.'],
    ['Partner-Kniebeugen mit Handhalt', '15 Wdh.'],
    ['Liegestütze mit Partner-Klaps', '10 Wdh.'],
    ['Beinheben – Partner schubst die Füße weg', '12 Wdh.'],
    ['Schubkarre (2–3 Meter, dann Wechsel)', '3 Bahnen'],
    ['Rücken an Rücken aufstehen (eingehakt)', '8 Wdh.'],
  ]},
  { id: 'spass30', name: 'Cardio & Spaß zu zweit', minutes: 30, rounds: '2 Durchgänge, zwischen den Stationen 60 Sek. Pause', ex: [
    ['Gemeinsames Aufwärmen: Tanzen zu 2 Songs', '6 Min.'],
    ['Staffel: 30 Sek. Burpees im Wechsel', '4 Min.'],
    ['Plank-Duell: wer hält länger?', '3 Versuche'],
    ['Wandsitz-Duell mit Quizfragen', '3 Runden'],
    ['Hampelmann-Battle', '60 Sek.'],
    ['Auslaufen + Partner-Dehnen', '5 Min.'],
  ]},
];

const GYM_PLANS = {
  oberkoerper: { name: 'Gym: Oberkörper', minutes: 45, rounds: '3 Sätze je Übung, 90 Sek. Pause – zügig durcharbeiten', ex: [
    ['Bankdrücken (Langhantel oder Kurzhanteln)', '3×8–10'],
    ['Latzug oder Klimmzüge', '3×8–10'],
    ['Schulterdrücken Kurzhanteln', '3×10'],
    ['Rudern am Kabel', '3×12'],
    ['Bizeps-Curls', '2×12'],
    ['Trizeps am Kabel', '2×12'],
  ]},
  unterkoerper: { name: 'Gym: Unterkörper', minutes: 45, rounds: '3 Sätze, 2 Min. Pause bei Kniebeugen/Kreuzheben, sonst 90 Sek.', ex: [
    ['Kniebeugen (Langhantel)', '3×6–8'],
    ['Rumänisches Kreuzheben', '3×10'],
    ['Beinpresse', '3×12'],
    ['Ausfallschritte mit Kurzhanteln', '2×10 je Seite'],
    ['Wadenheben stehend', '3×15'],
    ['Plank', '3×45 Sek.'],
  ]},
  push: { name: 'Gym: Push (Drücken)', minutes: 45, rounds: '3 Sätze, 90–120 Sek. Pause', ex: [
    ['Bankdrücken', '3×6–8'],
    ['Schrägbank Kurzhanteln', '3×10'],
    ['Schulterdrücken', '3×8–10'],
    ['Seitheben', '3×12–15'],
    ['Dips', '2×max.'],
  ]},
  pull: { name: 'Gym: Pull (Ziehen)', minutes: 45, rounds: '3 Sätze, 90–120 Sek. Pause', ex: [
    ['Kreuzheben', '3×5–6'],
    ['Klimmzüge oder Latzug', '3×8'],
    ['Langhantel-Rudern', '3×10'],
    ['Face Pulls', '2×15'],
    ['Bizeps-Curls Langhantel', '2×10'],
  ]},
  ganzkoerper: { name: 'Gym: Ganzkörper A', minutes: 45, rounds: '3 Sätze je Übung, 90 Sek. Pause (große Übungen 2 Min.)', ex: [
    ['Kniebeugen', '3×6–8'],
    ['Bankdrücken', '3×8'],
    ['Rudern (Langhantel oder Kabel)', '3×10'],
    ['Schulterdrücken', '2×10'],
    ['Plank', '3×45 Sek.'],
  ]},
  ganzkoerper2: { name: 'Gym: Ganzkörper B', minutes: 45, rounds: '3 Sätze je Übung, 90 Sek. Pause (große Übungen 2 Min.)', ex: [
    ['Rumänisches Kreuzheben', '3×8'],
    ['Latzug oder Klimmzüge', '3×8–10'],
    ['Schrägbank Kurzhanteln', '3×10'],
    ['Beinpresse', '3×12'],
    ['Bauch: Kabel-Crunches', '2×15'],
  ]},
  ausdauer: { name: 'Gym: Ausdauer', minutes: 45, rounds: 'Pulsbereich: locker reden können = richtig', ex: [
    ['Aufwärmen Crosstrainer', '5 Min. locker'],
    ['Intervall Laufband: 2 Min. zügig / 2 Min. locker', '6 Runden'],
    ['Rudergerät', '10 Min. gleichmäßig'],
    ['Fahrrad ausrollen', '8 Min. locker'],
    ['Dehnen', '5 Min.'],
  ]},
  bauch: { name: 'Gym: Bauch & Core', minutes: 30, rounds: '3 Runden, 60 Sek. Pause', ex: [
    ['Kabel-Crunches', '15 Wdh.'],
    ['Hängendes Beinheben', '10–12 Wdh.'],
    ['Cable Woodchopper', '12 je Seite'],
    ['Plank mit Gewicht', '45 Sek.'],
    ['Ab-Wheel oder Ausrollen an der Langhantel', '10 Wdh.'],
    ['Farmer’s Walk', '2×30 Meter'],
  ]},
  sprungkraft: { name: 'Gym: Sprungkraft & Athletik', minutes: 45, rounds: 'Explosiv ausführen, lange Pausen (2 Min.) – Qualität vor Menge', ex: [
    ['Aufwärmen: Seilspringen', '4 Min.'],
    ['Box Jumps', '4×5'],
    ['Kniebeugen explosiv (leichtes Gewicht)', '4×5'],
    ['Ausfallschritt-Sprünge', '3×6 je Seite'],
    ['Standweitsprung', '4×3'],
    ['Wadenheben schnell', '3×15'],
    ['Sprint auf dem Laufband', '4×20 Sek.'],
  ]},
};

/* Ausdauer nach dem 80/20-Prinzip: Der Großteil locker in Zone 2 (reden möglich),
   1 Einheit pro Woche intensiv – 4×4-Minuten-Intervalle sind das am besten belegte Format. */
const CARDIO_PLANS = {
  joggen: { name: 'Lockerer Lauf (Zone 2)', minutes: 40, rounds: 'Grundlagenausdauer: So locker, dass du dich nebenher unterhalten könntest – das ist der Bereich, in dem die Ausdauer wächst', ex: [
    ['Warmlaufen ganz locker', '5 Min.'],
    ['Dauerlauf im Plaudertempo (Zone 2)', '30 Min.'],
    ['Auslaufen + Dehnen (Waden, Oberschenkel, Hüfte)', '5 Min.'],
  ]},
  'joggen-intervall': { name: 'Intervall-Lauf 4×4', minutes: 35, rounds: 'Das 4×4-Format: 4 Min. hart (Sprechen kaum möglich, ~90 % Maximalpuls), 3 Min. Traben – 4 Runden. Maximal 1× pro Woche', ex: [
    ['Warmlaufen locker + 3 kurze Steigerungen', '10 Min.'],
    ['4 Min. hart laufen', 'Runde 1'],
    ['3 Min. locker traben', 'Pause'],
    ['4 Min. hart / 3 Min. Traben wiederholen', 'Runden 2–4'],
    ['Auslaufen ganz locker', '5 Min.'],
  ]},
  'joggen-lang': { name: 'Langer Lauf', minutes: 60, rounds: 'Der wöchentliche lange Lauf: betont langsam, jede Woche ~5 Min. länger – nie mehr als 10 % Steigerung', ex: [
    ['Ganz locker einlaufen', '10 Min.'],
    ['Langsamer Dauerlauf (bewusst gemütlich)', '40–50 Min.'],
    ['Gehen zum Abschluss + Dehnen', '5 Min.'],
  ]},
  radfahren: { name: 'Grundlagen-Radfahren (Zone 2)', minutes: 60, rounds: 'Trittfrequenz 80–90, Tempo unterhaltungsfähig – Umfang schlägt Intensität', ex: [
    ['Einrollen flach', '10 Min.'],
    ['Grundlagentempo (Zone 2, reden möglich)', '40 Min.'],
    ['Ausrollen + kurz dehnen (Hüftbeuger, Rücken)', '10 Min.'],
  ]},
  'rad-intervall': { name: 'Rad-Intervalle 4×4', minutes: 45, rounds: '4 Min. hart (schwerer Gang oder bergauf, ~90 % Puls), 4 Min. locker kurbeln – 4 Runden, max. 1× pro Woche', ex: [
    ['Einrollen mit steigender Trittfrequenz', '10 Min.'],
    ['4 Min. hart fahren', 'Runde 1'],
    ['4 Min. ganz locker kurbeln', 'Pause'],
    ['4 Min. hart / 4 Min. locker wiederholen', 'Runden 2–4'],
    ['Ausrollen', '8 Min.'],
  ]},
  schwimmen: { name: 'Schwimmen (Technik & Grundlage)', minutes: 45, rounds: 'Bahnen à 25 m, Pausen 15–30 Sek. – Technik vor Tempo: bessere Wasserlage spart mehr Kraft als jedes Training', ex: [
    ['Einschwimmen ruhig (Brust oder Kraul)', '200 m'],
    ['Technik: 4× 50 m mit Fokus auf Atmung und Wasserlage', '200 m'],
    ['Hauptteil: 6–8× 50 m zügig, gleichmäßiges Tempo', '300–400 m'],
    ['Beine mit Brett', '100 m'],
    ['Ausschwimmen locker', '100 m'],
  ]},
  'schwimmen-intervall': { name: 'Schwimm-Intervalle', minutes: 40, rounds: 'Intensive Serie: 8× 50 m zügig mit 20–30 Sek. Pause – Tempo so, dass die letzte Bahn noch sauber ist', ex: [
    ['Einschwimmen locker', '200 m'],
    ['8× 50 m zügig, 20–30 Sek. Pause', '400 m'],
    ['Technik locker (Kraul oder Brust)', '100 m'],
    ['Ausschwimmen', '100 m'],
  ]},
};

/* Kategorie-Schlüssel → Workout-Inhalt */
const WORKOUT_CATS = {
  'home-ganzkoerper': () => HOME_WORKOUTS.ganzkoerper,
  'home-bauch': () => HOME_WORKOUTS.bauch,
  'home-beine': () => HOME_WORKOUTS.beine,
  'home-arme': () => HOME_WORKOUTS.arme,
  'home-stretch': () => HOME_WORKOUTS.stretch,
  'home-yoga': () => HOME_WORKOUTS.yoga,
  'gym-oberkoerper': () => GYM_PLANS.oberkoerper,
  'gym-unterkoerper': () => GYM_PLANS.unterkoerper,
  'gym-push': () => GYM_PLANS.push,
  'gym-pull': () => GYM_PLANS.pull,
  'gym-ganzkoerper': () => GYM_PLANS.ganzkoerper,
  'gym-ganzkoerper-b': () => GYM_PLANS.ganzkoerper2,
  'gym-ausdauer': () => GYM_PLANS.ausdauer,
  'gym-bauch': () => GYM_PLANS.bauch,
  'gym-sprungkraft': () => GYM_PLANS.sprungkraft,
  'cardio-joggen': () => CARDIO_PLANS.joggen,
  'cardio-joggen-intervall': () => CARDIO_PLANS['joggen-intervall'],
  'cardio-joggen-lang': () => CARDIO_PLANS['joggen-lang'],
  'cardio-radfahren': () => CARDIO_PLANS.radfahren,
  'cardio-rad-intervall': () => CARDIO_PLANS['rad-intervall'],
  'cardio-schwimmen': () => CARDIO_PLANS.schwimmen,
  'cardio-schwimmen-intervall': () => CARDIO_PLANS['schwimmen-intervall'],
  'paar-zirkel20': () => PAAR_WORKOUTS[0],
  'paar-sync20': () => PAAR_WORKOUTS[1],
  'paar-kraft30': () => PAAR_WORKOUTS[2],
  'paar-spass30': () => PAAR_WORKOUTS[3],
};
function workoutByCat(cat) {
  const f = WORKOUT_CATS[cat];
  return f ? f() : null;
}
/* Grobe Familie einer Kategorie – fürs Matchen gemeinsamer Einheiten */
function workoutFamily(cat) {
  if (!cat) return '';
  if (cat.startsWith('paar')) return 'paar';
  if (cat.includes('bauch')) return 'bauch';
  if (cat.includes('stretch') || cat.includes('yoga')) return 'mobilität';
  if (cat.startsWith('cardio') || cat === 'gym-ausdauer') return 'ausdauer';
  return 'kraft';
}

/* Ziel-Anpassung fürs Gym: Wiederholungsbereiche nach Trainingsziel.
   Kraft: schwere Grundübungen 4–6 Wdh., lange Pausen. Muskelaufbau: 6–12 Wdh.
   Kraftausdauer: 12–15 Wdh., kurze Pausen. Freie Grundübungen vor Maschinen. */
const COMPOUND = ['Bankdrücken', 'Kniebeugen', 'Kreuzheben', 'Rudern', 'Klimmzüge', 'Latzug', 'Schulterdrücken', 'Beinpresse', 'Dips', 'Schrägbank'];
const GOAL_NOTES = {
  staerker: 'Ziel Kraft: Grundübungen frei (Langhantel) und schwer – 4–6 Wdh., 2–3 Min. Pause. Letzte Wiederholung anstrengend, aber technisch sauber.',
  masse: 'Ziel Muskelaufbau: 6–12 Wdh. bis 1–2 Wdh. vor Muskelversagen, ca. 90 Sek. Pause. Freie Übungen zuerst, Maschinen/Kabel gezielt zum Auffüllen.',
  ausdauer: 'Ziel Ausdauer: Im Gym 12–15 Wdh. mit kurzen Pausen (45–60 Sek.) – geführte Maschinen sind hier völlig okay. Herzstück bleibt das Cardio-Training.',
  beweglich: 'Ziel Beweglichkeit: Positionen ruhig halten, in die Dehnung atmen, nie in den Schmerz. Regelmäßigkeit schlägt Intensität.',
  fit: 'Ziel Fitness: Mischung aus Kraft (8–12 Wdh.) und Ausdauer. Grundübungen frei, Rest nach Lust – Hauptsache dranbleiben.',
};
function adaptWorkoutToGoal(cat, goal) {
  const w = workoutByCat(cat);
  if (!w) return null;
  if (!goal || !cat.startsWith('gym')) return w;
  const isCompound = name => COMPOUND.some(c => name.includes(c));
  const scheme = {
    staerker: { comp: '5×4–6', iso: '3×8–10', rounds: 'Grundübungen schwer: 2–3 Min. Pause. Isolationsübungen: 90 Sek.' },
    masse: { comp: '4×6–10', iso: '3×10–15', rounds: '90 Sek. Pause, bis 1–2 Wdh. vor Muskelversagen trainieren' },
    ausdauer: { comp: '3×12–15', iso: '3×15', rounds: 'Kurze Pausen (45–60 Sek.), zügiges Tempo' },
    fit: { comp: '3×8–12', iso: '3×12', rounds: '60–90 Sek. Pause, sauber und kontrolliert' },
  }[goal];
  if (!scheme || cat === 'gym-ausdauer') return w;
  return {
    ...w,
    rounds: scheme.rounds,
    ex: w.ex.map(([name, vol]) => /\d×/.test(vol) ? [name, isCompound(name) ? scheme.comp : scheme.iso] : [name, vol]),
  };
}

/* Regelbasierter Plan-Generator – sofort und offline; die KI kann ihn verfeinern.
   opts: { goals: [...], freq, elements: [...], duration } – mehrere Ziele werden
   proportional gemischt (z. B. Masse + Ausdauer bei 4×: 2 Kraft, 2 Cardio). */
function buildTrainingPlan(opts) {
  const { freq, elements } = opts;
  const goals = (opts.goals && opts.goals.length ? opts.goals : [opts.goal || 'fit']);
  const has = e => elements.includes(e);

  // Einheiten pro Ziel (round-robin, Summe = freq)
  const counts = {};
  goals.forEach(g => { counts[g] = 0; });
  for (let i = 0; i < freq; i++) counts[goals[i % goals.length]]++;

  /* Kraft: Split nach Frequenz – evidenzbasiert.
     Jede Muskelgruppe ~2×/Woche treffen: bis 3 Einheiten Ganzkörper (A/B im Wechsel),
     4 Einheiten Ober-/Unterkörper, erst ab 5–6 Push/Pull/Beine. */
  const kraftSeq = n => {
    if (has('gym')) {
      const splits = {
        1: ['gym-ganzkoerper'],
        2: ['gym-ganzkoerper', 'gym-ganzkoerper-b'],
        3: ['gym-ganzkoerper', 'gym-ganzkoerper-b', 'gym-ganzkoerper'],
        4: ['gym-oberkoerper', 'gym-unterkoerper', 'gym-oberkoerper', 'gym-unterkoerper'],
        5: ['gym-oberkoerper', 'gym-unterkoerper', 'gym-push', 'gym-pull', 'gym-unterkoerper'],
        6: ['gym-push', 'gym-pull', 'gym-unterkoerper', 'gym-push', 'gym-pull', 'gym-unterkoerper'],
        7: ['gym-push', 'gym-pull', 'gym-unterkoerper', 'gym-push', 'gym-pull', 'gym-unterkoerper', 'gym-ganzkoerper'],
      };
      return splits[Math.min(n, 7)].slice(0, n);
    }
    const rot = ['home-ganzkoerper', 'home-beine', 'home-arme', 'home-bauch'];
    return Array.from({ length: n }, (_, i) => rot[i % rot.length]);
  };

  /* Ausdauer: 80/20 – maximal 1 intensive Intervalleinheit pro Woche,
     der Rest locker (Zone 2), ab 3 Einheiten zusätzlich 1 lange Einheit. */
  const ausdauerSeq = n => {
    const modes = [];
    if (has('joggen')) modes.push('joggen');
    if (has('radfahren')) modes.push('rad');
    if (has('schwimmen')) modes.push('schwimmen');
    if (!modes.length) return Array.from({ length: n }, () => has('gym') ? 'gym-ausdauer' : 'home-ganzkoerper');
    const locker = { joggen: 'cardio-joggen', rad: 'cardio-radfahren', schwimmen: 'cardio-schwimmen' };
    const intervall = { joggen: 'cardio-joggen-intervall', rad: 'cardio-rad-intervall', schwimmen: 'cardio-schwimmen-intervall' };
    const lang = { joggen: 'cardio-joggen-lang', rad: 'cardio-radfahren', schwimmen: 'cardio-schwimmen' };
    const seq = [];
    for (let i = 0; i < n; i++) {
      const mode = modes[i % modes.length];
      if (i === 0 && n >= 2) seq.push(intervall[mode]);        // die eine harte Einheit
      else if (i === n - 1 && n >= 3) seq.push(lang[mode]);    // die lange lockere
      else seq.push(locker[mode]);                             // Zone 2
    }
    return seq;
  };

  const beweglichSeq = n => Array.from({ length: n }, (_, i) => i % 2 ? 'home-yoga' : 'home-stretch');

  const fitSeq = n => {
    const kraft = has('gym') ? ['gym-ganzkoerper', 'gym-ganzkoerper-b'] : ['home-ganzkoerper', 'home-beine'];
    const cardio = has('joggen') ? 'cardio-joggen' : has('radfahren') ? 'cardio-radfahren' : has('schwimmen') ? 'cardio-schwimmen' : has('gym') ? 'gym-ausdauer' : 'home-bauch';
    return Array.from({ length: n }, (_, i) => i % 2 ? cardio : kraft[Math.floor(i / 2) % kraft.length]);
  };

  const seqFor = { staerker: kraftSeq, masse: kraftSeq, ausdauer: ausdauerSeq, beweglich: beweglichSeq, fit: fitSeq };
  const goalSeqs = goals.map(g => (seqFor[g] || fitSeq)(counts[g]));

  // Ziele verzahnen (hart/locker wechselt sich ab): Einheit i gehört zu Ziel i mod Anzahl-Ziele
  const cats = [];
  const cursors = goals.map(() => 0);
  for (let i = 0; i < freq; i++) {
    const gi = i % goals.length;
    if (cursors[gi] < goalSeqs[gi].length) cats.push(goalSeqs[gi][cursors[gi]++]);
  }
  // Rest auffüllen, falls ein Ziel keine Einheiten bekommen konnte
  for (let gi = 0; gi < goals.length && cats.length < freq; gi++) {
    while (cursors[gi] < goalSeqs[gi].length && cats.length < freq) cats.push(goalSeqs[gi][cursors[gi]++]);
  }

  // Trainingstage über die Woche verteilen (0 = Montag … 6 = Sonntag)
  const daymap = { 2: [1, 4], 3: [0, 2, 4], 4: [0, 1, 3, 5], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] };
  const days = daymap[freq] || daymap[3];
  const weekly = days.map((day, i) => {
    const cat = cats[i] || 'home-ganzkoerper';
    const w = workoutByCat(cat);
    return { day, cat, title: w ? w.name : cat, minutes: w ? w.minutes : 30 };
  });
  // Paar-Workout gewünscht? Eine Einheit pro Woche ersetzen
  if (has('paar') && weekly.length) {
    const p = PAAR_WORKOUTS[Math.floor(days.length / 2) % PAAR_WORKOUTS.length];
    const slot = weekly[weekly.length - 1];
    slot.cat = 'paar-' + p.id; slot.title = p.name; slot.minutes = p.minutes;
  }
  const prog = {
    staerker: 'Kraft: Jede Woche etwas mehr Gewicht oder 1 Wiederholung mehr – Technik geht immer vor.',
    masse: 'Muskelaufbau: Sätze sauber bis nahe ans Muskelversagen, jede Woche minimal steigern, gut essen und schlafen.',
    ausdauer: 'Ausdauer: Jede Woche 5–10 % mehr Umfang; jede 4. Woche locker machen zum Erholen.',
    beweglich: 'Beweglichkeit: Lieber 10 Minuten regelmäßig als 1 Stunde selten.',
    fit: 'Fitness: Kraft und Ausdauer im Wechsel, Pausentage ernst nehmen.',
  };
  return { weekly, progression: goals.map(g => prog[g] || '').filter(Boolean).join(' ') };
}
/* Ziele eines Plans (alt: plan.goal, neu: plan.goals) */
function planGoals(plan) {
  if (!plan) return [];
  return plan.goals && plan.goals.length ? plan.goals : (plan.goal ? [plan.goal] : []);
}
/* Welches Ziel bestimmt die Gym-Wiederholungsbereiche? Kraft vor Masse vor Ausdauer. */
function primaryGymGoal(plan) {
  const gs = planGoals(plan);
  for (const g of ['staerker', 'masse', 'ausdauer', 'fit']) if (gs.includes(g)) return g;
  return null;
}

/* ---------- Kalenderbewusste Wochenplanung ----------
   Der Plan legt nur fest, WAS pro Woche ansteht. Auf welche Tage die Einheiten
   fallen, entscheidet die App jede Woche neu – nach Kalender und Abstand. */
function trainingState() {
  if (!DATA.training) DATA.training = { plans: {}, week: {} };
  if (!DATA.training.plans) DATA.training.plans = {};
  if (!DATA.training.week) DATA.training.week = {};
  return DATA.training;
}
/* Ist der Abend (16:30–21:30) durch einen Termin der Person belegt? */
function trainingEveningBusy(iso, person) {
  return eventsOn(iso).some(e => {
    if (!(e.who === person || e.who === 'beide' || e.src === 'ics')) return false;
    if (!e.time) return false;
    return e.time >= '16:30' && e.time <= '21:30';
  });
}
function trainingWeekEntries(person, monISO) {
  const ts = trainingState();
  return ts.week[monISO + ':' + person] || null;
}
/* Rückblick: Wie lief die Vorwoche? Fließt in die Planung der neuen Woche ein. */
function trainingLastWeekStats(person, monISO) {
  const prevMon = toISO(addDays(new Date(monISO + 'T12:00'), -7));
  const entries = trainingState().week[prevMon + ':' + person];
  if (!entries || !entries.length) return null;
  const done = entries.filter(e => e.done).length;
  return {
    total: entries.length,
    done,
    extras: entries.filter(e => e.extra && e.done).length,
    missedIntervall: entries.some(e => !e.done && e.cat.includes('intervall')),
  };
}
/* Ausblick: Wie viele freie Abende hat die Person in einer Woche? */
function trainingFreeEvenings(person, monISO) {
  let free = 0;
  for (let d = 0; d < 7; d++) {
    if (!trainingEveningBusy(toISO(addDays(new Date(monISO + 'T12:00'), d)), person)) free++;
  }
  return free;
}

/* Einheiten des Plans auf die Woche legen: freie Abende bevorzugen,
   Kraft-Einheiten nicht direkt hintereinander, Paar-Einheit ans Wochenende tendieren.
   Schlau: Lief die Vorwoche schlecht (≤ 50 %), wird eine Einheit weniger geplant –
   dranbleiben schlägt Volumen. Eine verpasste Intervalleinheit rückt nach vorn. */
function scheduleTrainingWeek(person, monISO) {
  const ts = trainingState();
  const key = monISO + ':' + person;
  if (ts.week[key]) return ts.week[key];
  const plan = ts.plans[person];
  if (!plan) return null;
  const stats = trainingLastWeekStats(person, monISO);
  let sessions = plan.weekly.slice();
  if (stats && stats.total >= 2 && stats.done / stats.total <= 0.5 && sessions.length > 2) {
    // Überforderung vermeiden: die letzte lockere Einheit dieser Woche streichen
    const dropIdx = sessions.map((s, i) => ({ s, i })).reverse().find(x => !x.s.cat.includes('intervall') && workoutFamily(x.s.cat) !== 'paar');
    sessions.splice(dropIdx ? dropIdx.i : sessions.length - 1, 1);
  }
  if (stats && stats.missedIntervall) {
    // Verpasste harte Einheit zuerst einplanen
    sessions.sort((a, b) => (b.cat.includes('intervall') ? 1 : 0) - (a.cat.includes('intervall') ? 1 : 0));
  }
  const taken = new Set();
  const entries = [];
  const todayIdx = (() => {
    const t = todayISO();
    for (let i = 0; i < 7; i++) if (toISO(addDays(new Date(monISO + 'T12:00'), i)) === t) return i;
    return -1;
  })();
  for (const s of sessions) {
    let best = -1, bestScore = -Infinity;
    for (let d = 0; d < 7; d++) {
      if (taken.has(d)) continue;
      const iso = toISO(addDays(new Date(monISO + 'T12:00'), d));
      let score = 0;
      if (!trainingEveningBusy(iso, person)) score += 4;               // freier Abend zählt am meisten
      if (d === s.day) score += 2;                                     // Wunsch-Rhythmus des Plans
      if (todayIdx >= 0 && d < todayIdx) score -= 6;                   // Vergangenheit meiden
      const fam = workoutFamily(s.cat);
      const hart = c => workoutFamily(c) === 'kraft' || c.includes('intervall');
      if (fam === 'kraft' && entries.some(e => workoutFamily(e.cat) === 'kraft' && Math.abs(e.day - d) === 1)) score -= 2; // Regeneration
      if (hart(s.cat) && entries.some(e => hart(e.cat) && Math.abs(e.day - d) === 1)) score -= 1; // harte Einheiten spreizen
      if (fam === 'paar' && d >= 4) score += 1;                        // Paar-Workout eher Richtung Wochenende
      if (score > bestScore) { bestScore = score; best = d; }
    }
    taken.add(best);
    entries.push({ ...s, day: best, done: false, moved: false });
  }
  entries.sort((a, b) => a.day - b.day);
  ts.week[key] = entries;
  save();
  return entries;
}
/* Neue Termine dazwischengekommen? Betroffene, noch offene Einheiten automatisch umlegen. */
function reflowTrainingWeek(person, monISO) {
  const entries = trainingWeekEntries(person, monISO);
  if (!entries) return false;
  let changed = false;
  const t = todayISO();
  for (const e of entries) {
    if (e.done) continue;
    const iso = toISO(addDays(new Date(monISO + 'T12:00'), e.day));
    if (iso < t) continue;
    if (!trainingEveningBusy(iso, person)) continue;
    // besseren freien Tag suchen (ab heute, noch unbelegt)
    for (let d = 0; d < 7; d++) {
      const dISO = toISO(addDays(new Date(monISO + 'T12:00'), d));
      if (dISO < t || entries.some(x => x !== e && x.day === d)) continue;
      if (!trainingEveningBusy(dISO, person)) { e.day = d; e.moved = true; changed = true; break; }
    }
  }
  if (changed) { entries.sort((a, b) => a.day - b.day); save(); }
  return changed;
}
/* Sprachsuche: „Bauch“, „Yoga“, „Gym Push“ → passende Workout-Kategorie */
function workoutCatForQuery(q) {
  q = (q || '').toLowerCase();
  const map = [
    [/paar|partner|zu zweit|zusammen/, 'paar-zirkel20'],
    [/yoga/, 'home-yoga'],
    [/stretch|dehn/, 'home-stretch'],
    [/push|drück/, 'gym-push'],
    [/pull|zieh/, 'gym-pull'],
    [/oberkörper/, 'gym-oberkoerper'],
    [/unterkörper/, 'gym-unterkoerper'],
    [/sprung/, 'gym-sprungkraft'],
    [/intervall/, 'cardio-joggen-intervall'],
    [/schwimm/, 'cardio-schwimmen'],
    [/rad|fahrrad|bike/, 'cardio-radfahren'],
    [/jogg|lauf|renn/, 'cardio-joggen'],
    [/bauch|core/, q.includes('gym') ? 'gym-bauch' : 'home-bauch'],
    [/bein|po\b/, 'home-beine'],
    [/arm|schulter/, 'home-arme'],
    [/ausdauer|cardio/, 'gym-ausdauer'],
    [/gym|studio|kraft/, 'gym-ganzkoerper'],
    [/ganzkörper|komplett|alles/, 'home-ganzkoerper'],
  ];
  for (const [re, cat] of map) if (re.test(q)) return cat;
  return 'home-ganzkoerper';
}
function openWorkoutForQuery(q) {
  openWorkoutSheet(workoutCatForQuery(q));
}

/* Alte Wochen aufräumen (Sync-Dokument klein halten) */
function trainingCleanup() {
  const ts = trainingState();
  const cur = toISO(startOfWeek(new Date()));
  let changed = false;
  for (const k of Object.keys(ts.week)) {
    if (k.slice(0, 10) < toISO(addDays(new Date(cur + 'T12:00'), -21))) { delete ts.week[k]; changed = true; }
  }
  return changed;
}
