const CACHE_NAME = 'smart-village-v1';
const urlsToCache = [
  '/smart-village/',
  '/smart-village/index.html',
  '/smart-village/styles.css',  // اسم ملف الـ CSS بتاعك
  '/smart-village/script.js',   // اسم ملف الـ JS بتاعك
  '/smart-village/icon-192.png',
  '/smart-village/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});