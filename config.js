/* Unser Zuhause – Konfiguration für den gemeinsamen Live-Sync.
   Solange die Werte leer sind, läuft die App rein lokal auf dem Gerät.
   Nach der Supabase-Einrichtung (siehe SETUP-SUPABASE.md) hier eintragen:
   - supabaseUrl:     Projekt-URL, z. B. https://abcdefgh.supabase.co
   - supabaseAnonKey: der öffentliche "anon public" API-Key des Projekts
   Der anon-Key darf im Code stehen – echte Sicherheit kommt von Login + Row Level Security. */
window.UZ_CONFIG = {
  supabaseUrl: 'https://kpzutmtkouwamtqcgmux.supabase.co',
  supabaseAnonKey: 'sb_publishable_YkaGYaebesJPb9Of3kkjuQ_bxmkkgi3',
};
