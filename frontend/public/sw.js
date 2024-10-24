function isCacheable(request) {
    const { pathname } = new URL(request.url);
    return /.+.(json|js|png|html|woff)$/.test(pathname);
} async function cacheFirstWithRefresh(request) {
    const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
            const cache = await caches.open('MyCache_1');
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }); return (await caches.match(request)) || (await fetchResponsePromise);
}
self.addEventListener('fetch', (event) => {
    if (isCacheable(event.request)) {
        event.respondWith(cacheFirstWithRefresh(event.request));

    }
});