'use client';

import { useEffect } from 'react';

export function SWRegister() {
  useEffect(() => {
    // Registrar service worker solo en el cliente
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker registered successfully:', reg.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  return null; // Este componente no renderiza nada
}