/* Unser Zuhause – Outlook/ICS-Import (veröffentlichte Kalender-Links oder .ics-Dateien) */

function parseICS(text, who) {
  // Zeilen entfalten (RFC 5545: Folgezeilen beginnen mit Leerzeichen/Tab)
  const lines = text.split(/\r?\n/);
  const unfolded = [];
  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && unfolded.length) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else {
      unfolded.push(line);
    }
  }

  const events = [];
  let cur = null;
  for (const line of unfolded) {
    if (line === 'BEGIN:VEVENT') { cur = {}; continue; }
    if (line === 'END:VEVENT') {
      if (cur && cur.date && cur.title && !cur.rrule) events.push(cur);
      cur = null; continue;
    }
    if (!cur) continue;
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const keyFull = line.slice(0, idx);
    const val = line.slice(idx + 1);
    const key = keyFull.split(';')[0];

    if (key === 'SUMMARY') {
      cur.title = val.replace(/\\,/g, ',').replace(/\\n/g, ' ').replace(/\\;/g, ';');
    } else if (key === 'DTSTART') {
      // Formate: 20260815, 20260815T093000, 20260815T093000Z
      const m = val.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2}))?/);
      if (m) {
        cur.date = m[1] + '-' + m[2] + '-' + m[3];
        if (m[4]) cur.time = m[4] + ':' + m[5];
        if (/Z$/.test(val) && m[4]) {
          // UTC grob in lokale Zeit umrechnen
          const dt = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]));
          cur.date = toISO(dt);
          cur.time = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
        }
      }
    } else if (key === 'RRULE') {
      cur.rrule = true; // Serientermine: in v1 übersprungen
    }
  }

  const min = toISO(addDays(new Date(), -30));
  const max = toISO(addDays(new Date(), 120));
  return events
    .filter(e => e.date >= min && e.date <= max)
    .map(e => ({ id: uid(), date: e.date, time: e.time || '', title: e.title, who, src: 'ics' }));
}

async function fetchICSUrl(url, who) {
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const text = await res.text();
  return parseICS(text, who);
}

function replaceIcsEvents(who, events) {
  DATA.icsEvents = DATA.icsEvents.filter(e => e.who !== who).concat(events);
  save();
}
