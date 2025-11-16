// Service Worker básico para cache offline
const CACHE_NAME = 'votaclaro-cache-v1';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll([
				'/',
				'/noticias',
				'/candidates',
				'/miembro-mesa',
				'/calendario',
				'/voting-location'
			]);
		})
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	if (event.request.mode === 'navigate') {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(event.request);
			})
		);
	}
	else if (!url.pathname.startsWith('/api/') && !url.pathname.startsWith('/_next/webpack-hmr')) {
		event.respondWith(
			caches.match(event.request).then((response) => {
				if (response) {
					return response;
				}
				return fetch(event.request).then((response) => {
					if (response.status === 200) {
						const responseClone = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request, responseClone);
						});
					}
					return response;
				}).catch(() => {
					// Devolver una respuesta de error para evitar el TypeError
					return new Response('Resource not available offline', { status: 503 });
				});
			})
		);
	}
	// Para APIs y HMR, intenta red primero (deja que fallen para mostrar errores)
	else {
		event.respondWith(
			fetch(event.request).catch(() => {
				// No devolver nada, dejar que falle
			})
		);
	}
});
