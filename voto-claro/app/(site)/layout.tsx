import LlamaAnimation from '@/components/animations/llama-draw';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/layouts';
import ScrollRestorer from '@/components/scroll-restorer';
import { Footer } from '@/components/ui/Footer';
import { TourProvider } from '@/hooks/useTourContext';
import type { ReactNode } from 'react';

export default function PageLayout({
  children,
}: {
    children: ReactNode
}) {
  return (
    <TourProvider>
      <div className="min-h-screen bg-background">
        <LlamaAnimation />
        <div className="relative z-10">
          <Header />
          <ScrollRestorer />
          <div>
            {children}
          </div>
          <Footer />
        </div>
        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden relative z-10">
          <BottomNavigation/>
        </div>
      </div>
    </TourProvider>
  );
}