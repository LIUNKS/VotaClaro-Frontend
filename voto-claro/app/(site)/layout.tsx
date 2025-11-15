import LlamaAnimation from '@/components/animations/llama-draw';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/layouts';
import ScrollRestorer from '@/components/scroll-restorer';
import { Footer } from '@/components/ui/Footer';

export default function PageLayout({
  children,
}: {
    children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">
    <LlamaAnimation />
    <div className="relative z-10">
      <Header />
      <ScrollRestorer />
      <div className=''>
        {children};
      </div>
      <Footer />
    </div>
    {/* Bottom Navigation - Mobile Only */}
    <div className="lg:hidden relative z-10">
      <BottomNavigation/>
    </div>
  </div>;
}