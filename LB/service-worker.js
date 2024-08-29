const cacheName = 'library-cache-v1';
const assets = [
  '/',

  '/home.html',
  '/author.html',
  '/publisher.html',
  '/form.html',
  '/LB.css',
  '/LB.js',
  '/image/tw.png',
  '/image/tw.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assets);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => cache !== cacheName)
          .map(cache => caches.delete(cache))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
