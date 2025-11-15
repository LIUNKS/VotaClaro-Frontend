import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mapa de votación',
  description: 'Mapa interactivo para ubicaciones de votación',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}