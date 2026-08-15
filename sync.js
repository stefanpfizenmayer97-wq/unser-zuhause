/* Unser Zuhause – Live-Sync, Push & KI-Anbindung über Supabase.
   Aktiviert sich automatisch, sobald config.js ausgefüllt ist. */

window.UZSync = (() => {
  const cfg = window.UZ_CONFIG || {};
  let client = null, session = null, pushTimer = null, applyingRemote = false;

  const configured = () => !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  const active = () => !!(client && session);
  const email = () => (session && session.user && session.user.email) || '';
  const fnUrl = (name) => cfg.supabaseUrl + '/functions/v1/' + name;

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

  /* ---------- Wer ist angemeldet? ---------- */
  const EMAIL_TO_PERSON = {
    'stefanpfizenmayer97@gmail.com': 'stefan',
    'lindakuepfer@gmx.de': 'linda',
  };
  function applyIdentity() {
    const p = EMAIL_TO_PERSON[email().toLowerCase()];
    if (p && DATA.settings.me !== p) {
      DATA.settings.me = p;
      localStorage.setItem(DB_KEY, JSON.stringify(DATA));
      if (typeof render === 'function') render();
    }
  }

  /* ---------- Abgleich & Realtime ---------- */
  async function start() {
    applyIdentity(); // Login bestimmt, wer "ich" bin – kein manuelles Umschalten nötig
    const { data: row } = await client.from('household').select('data, updated_at').eq('id', 1).maybeSingle();
    if (row && row.data && (!DATA._syncedAt || row.updated_at > DATA._syncedAt)) {
      applyRemote(row.data, row.updated_at);
    } else {
      push();
    }
    client.channel('household-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'household', filter: 'id=eq.1' }, payload => {
        // Eigenes Echo überspringen (Zeitformate können abweichen → als Zeitpunkt vergleichen),
        // sonst überschreibt es bei schnellen Klicks gerade gemachte Änderungen.
        const remoteTs = payload.new && payload.new.updated_at ? new Date(payload.new.updated_at).getTime() : 0;
        const localTs = DATA._syncedAt ? new Date(DATA._syncedAt).getTime() : 0;
        if (payload.new && payload.new.data && remoteTs > localTs) {
          applyRemote(payload.new.data, payload.new.updated_at);
        }
      })
      .subscribe();
    // Kurz nach dem Start freundlich nach Push fragen (falls noch nicht aktiv)
    if (typeof maybePushPrompt === 'function') setTimeout(maybePushPrompt, 1500);
  }

  /* Beim Zurückkehren in die App (Gerät wacht auf): erst frischen Stand holen,
     bevor eigene Änderungen rausgehen – verhindert Überschreiben mit altem Stand. */
  async function refresh() {
    if (!active()) return;
    try {
      const { data: row } = await client.from('household').select('data, updated_at').eq('id', 1).maybeSingle();
      if (row && row.data) {
        const remoteTs = new Date(row.updated_at).getTime();
        const localTs = DATA._syncedAt ? new Date(DATA._syncedAt).getTime() : 0;
        if (remoteTs > localTs) applyRemote(row.data, row.updated_at);
      }
    } catch (e) { console.warn('Sync-Refresh fehlgeschlagen:', e.message); }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refresh();
  });

  function applyRemote(remote, ts) {
    applyingRemote = true;
    // Identität kommt vom Login, nicht aus den gesyncten Daten
    const meKeep = EMAIL_TO_PERSON[email().toLowerCase()] || DATA.settings.me;
    DATA = remote;
    DATA.settings = DATA.settings || {};
    DATA.settings.me = meKeep;
    if (typeof cleanupHolidayIcs === 'function') cleanupHolidayIcs();
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

  /* ---------- Edge Functions aufrufen ---------- */
  async function invoke(name, body) {
    if (!active()) throw new Error('Nicht angemeldet');
    const res = await fetch(fnUrl(name), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.access_token,
        'apikey': cfg.supabaseAnonKey,
      },
      body: JSON.stringify(body || {}),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(json.error || ('HTTP ' + res.status)); err.status = res.status; throw err; }
    return json;
  }

  /* Push an den Partner – bewusst "fire and forget" */
  function notifyPartner(title, body) {
    if (!active()) return;
    invoke('notify', { title, body }).catch(e => console.warn('Push nicht gesendet:', e.message));
  }

  /* Outlook-ICS über den Server-Proxy laden (umgeht CORS) */
  async function fetchIcsProxy(url) {
    if (!active()) throw new Error('Nicht angemeldet');
    const res = await fetch(fnUrl('ics-proxy') + '?url=' + encodeURIComponent(url), {
      headers: {
        'Authorization': 'Bearer ' + session.access_token,
        'apikey': cfg.supabaseAnonKey,
      },
    });
    if (!res.ok) throw new Error('Proxy: HTTP ' + res.status);
    return res.text();
  }

  /* ---------- Push-Benachrichtigungen auf diesem Gerät ---------- */
  function b64ToUint8(base64) {
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
  }

  async function enablePush() {
    if (!active()) throw new Error('Erst anmelden');
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push wird hier nicht unterstützt – App zum Home-Bildschirm hinzufügen (iOS 16.4+)');
    }
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') throw new Error('Benachrichtigungen nicht erlaubt');
    const reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, rej) => setTimeout(() => rej(new Error('App neu laden und nochmal versuchen')), 6000)),
    ]);
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: b64ToUint8(cfg.vapidPublicKey),
    });
    const { error } = await client.from('push_subscriptions').insert({
      email: email(),
      subscription: sub.toJSON(),
    });
    if (error && error.code !== '23505') throw new Error(error.message); // 23505 = schon registriert
    return true;
  }

  /* Status: 'unsupported' | 'denied' | 'on' | 'off' */
  async function pushStatus() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'denied') return 'denied';
    try {
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, rej) => setTimeout(() => rej(new Error('sw')), 3000)),
      ]);
      const sub = await reg.pushManager.getSubscription();
      return sub ? 'on' : 'off';
    } catch (e) { return 'off'; }
  }

  async function disablePush() {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      const endpoint = sub.endpoint;
      await sub.unsubscribe();
      if (active()) {
        await client.from('push_subscriptions').delete()
          .eq('email', email())
          .filter('subscription->>endpoint', 'eq', endpoint);
      }
    }
    localStorage.removeItem('uz-push-done');
  }

  function testPush() {
    return invoke('notify', {
      title: 'Test von Unser Zuhause',
      body: 'Wenn du das liest, funktionieren die Benachrichtigungen auf diesem Gerät.',
      toSelf: true,
    });
  }

  init();

  return {
    configured, active, email, invoke, notifyPartner, fetchIcsProxy,
    enablePush, disablePush, pushStatus, testPush,
    logout: async () => { if (client) await client.auth.signOut(); location.reload(); },
  };
})();
