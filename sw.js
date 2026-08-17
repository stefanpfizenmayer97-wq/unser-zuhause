/* Unser Zuhause – Service Worker (offlinefähig, Netz zuerst) */
const CACHE = 'uz-v28';
const SHELL = ['./', 'index.html', 'styles.css', 'store.js', 'ics.js', 'voice.js', 'app.js', 'config.js', 'sync.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Push-Nachrichten anzeigen */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.title || 'Unser Zuhause', {
    body: d.body || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    data: { url: d.url || './' },
  }));
  try { if (self.navigator && self.navigator.setAppBadge) self.navigator.setAppBadge(); } catch (err) {}
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  try { if (self.navigator && self.navigator.clearAppBadge) self.navigator.clearAppBadge(); } catch (err) {}
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return clients.openWindow(e.notification.data?.url || './');
  }));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
