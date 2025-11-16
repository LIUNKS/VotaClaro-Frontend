'use client';
import { HelpCircle, ChevronDown, Users, MapPin, Sun, Moon, Menu } from 'lucide-react';
import { ModeToggle } from './toogle-dark-mode';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTourContext } from '@/hooks/useTourContext';
import LogoAnimation from './animations/logo-draw';
import { useTheme } from 'next-themes';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onStartTour?: () => void;
  showTourButton?: boolean;
}

export function Header({ onStartTour, showTourButton = false }: HeaderProps = {}) {
	const pathname = usePathname();
	const tourContext = useTourContext();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [openDesktop, setOpenDesktop] = useState(false);
	const [openMobile, setOpenMobile] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);
  
	// Usar props si se proporcionan, sino usar context
	const finalOnStartTour = onStartTour || tourContext.onStartTour;
	const finalShowTourButton = showTourButton || tourContext.showTourButton;
  
	const navItems = [
		{ id: 'home', name: 'Inicio', href: '/' },
		{ id: 'noticias', name: 'Noticias', href: '/noticias' },
		{ id: 'partidos', name: 'Partidos', href: '/partidos' },
		{ id: 'candidates', name: 'Candidatos', href: '/candidates' },
		{ id: 'calendar', name: 'Calendario', href: '/calendario' },
	] as const;

	const getActiveTab = () => {
		if (pathname === '/') return 'home';
		if (pathname === '/noticias' || pathname.startsWith('/noticias/')) return 'noticias';
		if (pathname === '/partidos' || pathname.startsWith('/partidos/')) return 'partidos';
		if (pathname === '/candidates' || pathname.startsWith('/candidates/')) return 'candidates';
		if (pathname === '/profile') return 'profile';
		if (pathname === '/calendario') return 'calendar';
		if (pathname === '/miembro-mesa' || pathname.startsWith('/miembro-mesa/')) return 'mas';
		if (pathname === '/voting-location' || pathname.startsWith('/voting-location/')) return 'mas';
		return 'home'; // default
	};

	return (
		<header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10 tour-welcome">
			<div className="max-w-md lg:max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-2 w-44">
					<LogoAnimation />
				</div>
          
				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-8 tour-navigation">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								getActiveTab() === item.id
									? 'bg-primary/10 text-primary'
									: 'text-muted-foreground hover:text-foreground hover:bg-muted'
							}`}
						>
							{item.name}
						</Link>
					))}
					<Popover modal={false} open={openDesktop} onOpenChange={setOpenDesktop}>
						<PopoverTrigger asChild>
							<button className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
								getActiveTab() === 'mas'
									? 'bg-primary/10 text-primary'
									: 'text-muted-foreground hover:text-foreground hover:bg-muted'
							}`}>
                Más
								<ChevronDown className="w-4 h-4" />
							</button>
						</PopoverTrigger>
						<PopoverContent side="top" align="start" className="flex flex-col gap-1 p-2 bg-card border rounded-lg shadow-lg">
							<Link href="/miembro-mesa" className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-md transition-colors text-blue-500" onClick={() => setOpenDesktop(false)}>
								<Users className="w-4 h-4" />
                Miembro Mesa
							</Link>
							<Link href="/voting-location" className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-md transition-colors text-green-500" onClick={() => setOpenDesktop(false)}>
								<MapPin className="w-4 h-4" />
                Ubicación de Voto
							</Link>
						</PopoverContent>
					</Popover>
				</nav>
          
				<div className="flex items-center gap-2">
					<Popover modal={false} open={openMobile} onOpenChange={setOpenMobile}>
						<PopoverTrigger asChild>
							<button className="px-2 py-1 hover:bg-muted rounded-md transition-colors lg:hidden flex items-center gap-1 text-xs" title="Más opciones">
								<Menu className="w-5 h-5 text-muted-foreground" />
							</button>
						</PopoverTrigger>
						<PopoverContent side="top" align="center" className="flex flex-col gap-1 p-2 bg-card border rounded-lg shadow-lg">
							<Link href="/miembro-mesa" className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-md transition-colors text-blue-500" onClick={() => setOpenMobile(false)}>
								<Users className="w-4 h-4" />
                Miembro Mesa
							</Link>
							<Link href="/voting-location" className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-md transition-colors text-green-500" onClick={() => setOpenMobile(false)}>
								<MapPin className="w-4 h-4" />
                Ubicación de Voto
							</Link>
						</PopoverContent>
					</Popover>
					{finalShowTourButton && (
						<button
							onClick={finalOnStartTour}
							className="p-1 hover:bg-muted rounded-full transition-colors"
							title="Iniciar tour guiado"
						>
							<HelpCircle className="w-6 h-6 text-muted-foreground" />
						</button>
					)}
					{mounted && (
						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className="p-1 hover:bg-muted rounded-full transition-colors md:hidden"
							title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
						>
							{theme === 'dark' ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
						</button>
					)}
					<div className="hidden md:block">
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}