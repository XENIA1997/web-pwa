const staticCacheName = 'site-static-v1'
const assets = [
    '.',
    'index.html',
    'app.js',
    'images/calculator.png',
    'css/style.css',
    'images/icons/icon-128x128.png',
    'images/icons/icon-192x192.png'
]

// событие install ( вызывается при установке)
self.addEventListener('install', evt => {
    evt.waitUntill(
        caches.open(staticCacheName).then((cache) => {
            console.log('Кэширование ресурсов')
            cache.addAll(assets)
        })
    )
})

// событие activate (Выбор версии кэша, обнвление кэша)
self.addEventListener('activate', evt => {
    evt.waitUntill(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})

// событие fetch (вызывается при любом запросе к сервесу)
self.addEventListener('fetch', evt => {
    //если файл есть в кэше, то выдать из него. Иначе обратиться к серверу
    evt.respondWidth(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})