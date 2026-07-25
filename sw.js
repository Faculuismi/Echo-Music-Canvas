const CACHE_NAME = 'echo-canvas-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './canvas.json',
    './App%20Logo/echo.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/hls.js@1'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                // We use map and catch to ensure partial caching succeeds even if one URL fails
                return Promise.all(
                    ASSETS_TO_CACHE.map(url => {
                        return cache.add(url).catch(reason => {
                            console.warn(`[SW] Cache add failed for ${url}:`, reason);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Stale-while-revalidate strategy for better performance and freshness
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests, only cache own domain and explicitly listed CDNs if possible
    if (event.request.method !== 'GET') return;

    // Special handling for video streams to prevent caching them fully in SW
    if (event.request.url.match(/\.(mp4|m3u8|ts)$/i)) {
        return; // Let browser handle video requests naturally
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Network failed, if we don't have it in cache, we just fail gracefully.
                });

                // Return cached response immediately if available, while network fetches in background
                // If not in cache, return the network fetch promise
                return cachedResponse || fetchPromise;
            })
    );
});
