/* Unser Zuhause – Live-Sync über Supabase.
   Aktiviert sich automatisch, sobald config.js ausgefüllt ist.
   Ablauf: Login (nur Linda & Stefan) → Stand abgleichen → Realtime-Kanal:
   jede Änderung landet in Sekunden auf dem anderen iPhone. */

window.UZSync = (() => {
  const cfg = window.UZ_CONFIG || {};
  let client = null, session = null, pushTimer = null, applyingRemote = false;

  const configured = () => !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  const active = () => !!(client && session);
  const email = () => (session && session.user && session.user.email) || '';

  async function init() {
    if (!configured()) return; // rein lokaler Modus
    try {
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      client = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      const { data } = await client.auth.getSession();
      session = data.session;
      if (!session) { showLogin(); return; }
      await start();
    } catch (e) {
      console.warn('Sync nicht verfügbar (offline?):', e);
    }
  }

  /* ---------- Login nur für Linda & Stefan ---------- */
  function showLogin() {
    const w = document.createElement('div');
    w.id = 'loginWrap';
    w.innerHTML = `<div class="login-card">
      <h1 class="brand" style="text-align:center">Unser Zuhause</h1>
      <p class="sub" style="text-align:center;margin-bottom:18px">Nur für Linda &amp; Stefan</p>
      <label class="f">E-Mail</label>
      <input class="f" id="loginEmail" type="email" autocomplete="username" autocapitalize="off">
      <label class="f">Passwort</label>
      <input class="f" id="loginPw" type="password" autocomplete="current-password">
      <div id="loginErr" style="color:#A54B32;font-size:13px;margin-top:8px;min-height:18px"></div>
      <button class="btn full" id="loginBtn" style="margin-top:10px">Anmelden</button>
    </div>`;
    document.body.appendChild(w);
    const go = async () => {
      const mail = w.querySelector('#loginEmail').value.trim();
      const pw = w.querySelector('#loginPw').value;
      const errEl = w.querySelector('#loginErr');
      errEl.textContent = '';
      const { data, error } = await client.auth.signInWithPassword({ email: mail, password: pw });
      if (error) { errEl.textContent = 'Anmeldung fehlgeschlagen – E-Mail oder Passwort prüfen.'; return; }
      session = data.session;
      w.remove();
      await start();
    };
    w.querySelector('#loginBtn').addEventListener('click', go);
    w.querySelector('#loginPw').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  }

  /* ---------- Abgleich & Realtime ---------- */
  async function start() {
    const { data: row } = await client.from('household').select('data, updated_at').eq('id', 1).maybeSingle();
    if (row && row.data && (!DATA._syncedAt || row.updated_at > DATA._syncedAt)) {
      applyRemote(row.data, row.updated_at);
    } else {
      push();
    }
    client.channel('household-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'household', filter: 'id=eq.1' }, payload => {
        if (payload.new && payload.new.data && payload.new.updated_at !== DATA._syncedAt) {
          applyRemote(payload.new.data, payload.new.updated_at);
        }
      })
      .subscribe();
  }

  function applyRemote(remote, ts) {
    applyingRemote = true;
    const meKeep = DATA.settings.me; // "Wer bist du?" bleibt Geräteeinstellung
    DATA = remote;
    DATA.settings = DATA.settings || {};
    DATA.settings.me = meKeep;
    DATA._syncedAt = ts;
    localStorage.setItem(DB_KEY, JSON.stringify(DATA));
    if (typeof render === 'function') render();
    applyingRemote = false;
  }

  async function push() {
    if (!active()) return;
    const ts = new Date().toISOString();
    const { error } = await client.from('household').upsert({ id: 1, data: DATA, updated_at: ts });
    if (!error) DATA._syncedAt = ts;
    else console.warn('Sync-Push fehlgeschlagen:', error.message);
  }

  function schedulePush() {
    if (!client || !session || applyingRemote) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 800);
  }
  window.onDataSaved = schedulePush;

  init();

  return {
    configured, active, email,
    logout: async () => { if (client) await client.auth.signOut(); location.reload(); },
  };
})();
