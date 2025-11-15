'use client';

import { Home, Users, GraduationCap, User, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNavigation() {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio', href: '/' },
    { id: 'noticias', icon: Newspaper, label: 'Noticias', href: '/noticias' },
    { id: 'candidates', icon: Users, label: 'Candidatos', href: '/candidates' },
    { id: 'members', icon: GraduationCap, label: 'Miembros', href: '/members' },
    { id: 'profile', icon: User, label: 'Perfil', href: '/profile' },
  ] as const;

  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/noticias') return 'noticias';
    if (pathname === '/candidates') return 'candidates';
    if (pathname === '/members') return 'members';
    if (pathname === '/profile') return 'profile';
    if (pathname.startsWith('/candidates/')) return 'candidates';
    return 'home'; // default
  };

  const currentActiveTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-pb z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map(({ id, icon: Icon, label, href }) => {
            const isActive = currentActiveTab === id;
            
            return (
              <Link
                key={id}
                href={href}
                className="flex flex-col items-center py-2 px-3 min-w-0 transition-colors"
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}