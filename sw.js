// 네트워크 우선 — 캐시 우선이면 구버전에 갇힌다
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var c = r.clone();
    caches.open('calc-v1').then(function (k) { k.put(e.request, c); });
    return r;
  }).catch(function () { return caches.match(e.request); }));
});
