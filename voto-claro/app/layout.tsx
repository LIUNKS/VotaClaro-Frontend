import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Vota informado | MiVoto',
  description: 'Información clara y confiable para tomar decisiones informadas en las elecciones.',
  keywords: ['elecciones', 'votación', 'candidatos', 'información electoral', 'democracia', 'voto informado', 'procesos electorales'],
  authors: [{ name: 'MiVoto Team', url: 'https://web.francopm.dev/' }],
  openGraph: {
    title: 'Vota informado | MiVoto',
    description: 'Información clara y confiable para tomar decisiones informadas en las elecciones.',
    url: 'https://web.francopm.dev/',
    images: [
      {
        url: 'https://web.francopm.dev/images/page.jpg',
        width: 1200,
        height: 630,
        alt: 'Vota informado | MiVoto',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}