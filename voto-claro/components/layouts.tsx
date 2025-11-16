'use client';
import { Bell, HelpCircle } from 'lucide-react';
import { ModeToggle } from './toogle-dark-mode';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTourContext } from '@/hooks/useTourContext';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Noticias', href: '/noticias' },
  { name: 'Candidatos', href: '/candidates' },
  { name: 'Miembros', href: '/miembro-mesa' },
];

interface HeaderProps {
  onStartTour?: () => void;
  showTourButton?: boolean;
}

export function Header({ onStartTour, showTourButton = false }: HeaderProps = {}) {
  const pathname = usePathname();
  const tourContext = useTourContext();
  
  // Usar props si se proporcionan, sino usar context
  const finalOnStartTour = onStartTour || tourContext.onStartTour;
  const finalShowTourButton = showTourButton || tourContext.showTourButton;

  return (
    <header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10 tour-welcome">
      <div className="max-w-md lg:max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-base lg:text-lg">Elecciones 2026</span>
        </div>
          
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 tour-navigation">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === item.href || (item.href === '/' && pathname === '')
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pathname === '/profile' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
              Perfil
          </button>
        </nav>
          
        <div className="flex items-center gap-2">
          {finalShowTourButton && (
            <button 
              onClick={finalOnStartTour}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              title="Iniciar tour guiado"
            >
              <HelpCircle className="w-6 h-6 text-muted-foreground" />
            </button>
          )}
          <ModeToggle />
          <button className="p-1 hover:bg-muted rounded-full transition-colors">
            <Bell className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}