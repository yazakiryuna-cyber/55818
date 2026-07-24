const CACHE='ruos-v1';
const ASSETS=['/','/index.html','/admin.html','/pos.html','/kds.html','/display.html','/manifest.json','/assets/css/style.css','/assets/js/api.js','/assets/js/common.js','/assets/js/customer.js','/assets/js/admin.js','/assets/js/pos.js','/assets/js/kds.js','/assets/js/display.js','/assets/images/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ if(e.request.url.includes('/api/')||e.request.url.includes('/ws/')) return; e.respondWith(fetch(e.request).then(r=>{ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match('/index.html')))); });
