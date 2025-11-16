'use client';

import { useEffect } from 'react';

export function SWRegister() {
	useEffect(() => {
		if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
				.then(reg => {
					reg.addEventListener('updatefound', () => {
						const newWorker = reg.installing;
						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
							});
						}
					});

					navigator.serviceWorker.addEventListener('message', (_event) => {
					});
				})
				.catch(err => {
					console.error('[SWRegister] registration failed:', err);
				});
		}
	}, []);

	return null; // Este componente no renderiza nada
}