const CACHE_NAME = 'axiar-intelligence-v1'
const urlsToCache = [
  '/',
  '/portal/login',
  '/portal/dashboard',
  '/portal/projects',
  '/portal/reports',
  '/portal/invoices',
  '/portal/settings',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
]

const STATIC_CACHE = 'axiar-static-v1'
const API_CACHE = 'axiar-api-v1'
const IMAGE_CACHE = 'axiar-images-v1'

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== API_CACHE && 
              cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and development mode
  if (request.method !== 'GET' || url.hostname === 'localhost') {
    return
  }

  // Handle different cache strategies based on request type
  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith('/api/')) {
      // API requests - network first, cache fallback
      event.respondWith(networkFirstStrategy(request, API_CACHE))
    } else if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      // Images - cache first, network fallback
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE))
    } else {
      // Static assets - cache first, network fallback
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE))
    }
  } else {
    // External requests - network only
    event.respondWith(fetch(request))
  }
})

// Cache first strategy
function cacheFirstStrategy(request, cacheName) {
  return caches.open(cacheName)
    .then((cache) => cache.match(request))
    .then((response) => {
      if (response) {
        return response
      }
      return fetch(request).then((response) => {
        if (response.ok) {
          const responseClone = response.clone()
          caches.open(cacheName).then((cache) => cache.put(request, responseClone))
        }
        return response
      })
    })
}

// Network first strategy
function networkFirstStrategy(request, cacheName) {
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => cache.put(request, response.clone()))
        return response
      }
      return caches.open(cacheName).then((cache) => cache.match(request))
    })
    .catch(() => {
      return caches.open(cacheName).then((cache) => cache.match(request))
    })
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Handle offline actions when back online
  return self.registration.showNotification('Uygulama güncellendi', {
    body: 'Çevrimdışı işlemler senkronize edildi',
    icon: '/icon-192.png',
    tag: 'sync-complete'
  })
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    data: event.data.json(),
    actions: [
      {
        action: 'explore',
        title: 'Görüntüle'
      },
      {
        action: 'close',
        title: 'Kapat'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Axiar Intelligence', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
