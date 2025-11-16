// Service Worker básico para cache offline
const CACHE_NAME = 'votaclaro-cache-v3';
const SW_VERSION = 'v3-' + (new Date()).toISOString();

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

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	if (url.origin !== self.location.origin) {
		return;
	}
	if (event.request.mode === 'navigate') {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(event.request).then((response) => {
					if (response) {
						return response;
					}
					return new Response(`
						<!DOCTYPE html>
						<html lang="es">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<title>VotaClaro - Sin conexión</title>
							<style>
								body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
								h1 { color: #333; }
								p { color: #666; }
							</style>
						</head>
						<body>
							<h1>Sin conexión a internet</h1>
							<p>Lo sentimos, no puedes acceder a esta página sin conexión. Por favor, verifica tu conexión e intenta nuevamente.</p>
						</body>
						</html>
					`, {
						headers: { 'Content-Type': 'text/html' }
					});
				});
			})
		);
	}
	else if (url.pathname.startsWith('/api/')) {
		event.respondWith(
			fetch(event.request).then((response) => {
				if (response.status === 200) {
					const responseClone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseClone);
					});
				}
				return response;
			}).catch(() => {
				return caches.match(event.request).then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					}
					return new Response(JSON.stringify({ error: 'Offline', message: 'No cached data available' }), {
						status: 503,
						headers: { 'Content-Type': 'application/json' }
					});
				});
			})
		);
	}
	else if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/placeholder/')) {
		event.respondWith(
			caches.match(event.request).then((response) => {
				if (response) {
					return response;
				}
				return fetch(event.request).then((response) => {
					if (response.status === 200) {
						const responseClone = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							// cache.put for asset
							cache.put(event.request, responseClone);
						});
					}
					return response;
				}).catch(() => {
					return new Response('Asset not available offline', { status: 503 });
				});
			})
		);
	}
	// Para HMR, intenta red primero (deja que fallen para mostrar errores)
	else {
		event.respondWith(
			fetch(event.request).catch(() => {
				// No devolver nada, dejar que falle
			})
		);
	}
});
