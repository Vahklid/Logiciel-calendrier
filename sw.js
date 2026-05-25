// Version du cache — à incrémenter à chaque mise à jour
const CACHE_NAME = 'suivi-v1779739666';

self.addEventListener('install', e => {
  // Force l'activation immédiate sans attendre la fermeture des onglets
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(['/']))
  );
});

self.addEventListener('activate', e => {
  // Supprime tous les anciens caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
