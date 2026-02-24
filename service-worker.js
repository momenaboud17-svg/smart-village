// Service Worker للتطبيق - Offline First
const CACHE_NAME = 'smart-village-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap'
];

// التثبيت
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('تم فتح الكاش');
                return cache.addAll(urlsToCache);
            })
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // وجد في الكاش
                if (response) {
                    return response;
                }
                // نسخ الطلب لأنه يمكن استخدامه مرة واحدة
                return fetch(event.request.clone())
                    .then(response => {
                        // تأكد من أن الرد صالح
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // نسخ الرد لأنه يمكن استخدامه مرة واحدة
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // إذا فشل كل شيء، أظهر صفحة offline
                        if (event.request.url.indexOf('.html') > -1) {
                            return caches.match('/offline-pages/offline.html');
                        }
                    });
            })
    );
});

// تنظيف الكاش القديم
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});