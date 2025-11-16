'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Joyride from 'react-joyride';
import { Calendar, Zap, BookOpen, AlertCircle, CheckCircle2, Menu, Users, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { VotingLocation, ItemsGrid } from '@/components/home';
import NewsList from './newsList';
import { useTour } from '@/hooks/useTour';
import { useTourContext } from '@/hooks/useTourContext';
import { useNews } from '@/hooks';
import { getFeaturedCandidates } from '@/lib/candidates-data';
import { WelcomeIntro } from '@/components/animations';

export default function HomePage() {
	const { runTour, tourStep, handleTourCallback, startTour, isClient } = useTour();
	const { setTourConfig } = useTourContext();
	const [currentTourTarget, setCurrentTourTarget] = useState<string | null>(null);
	const { news, loading, error } = useNews(4);
	const [partidos, setPartidos] = useState([]);
	const [showContent, setShowContent] = useState(false);
	const [introComplete, setIntroComplete] = useState(false);

	// Variable de entorno para forzar mostrar intro (desarrollo)
	const forceShowIntro = process.env.NEXT_PUBLIC_SHOW_INTRO === 'true';

	// Cargar partidos desde JSON
	useEffect(() => {
		const loadPartidos = async () => {
			try {
				const response = await fetch('/partidos.json');
				const data = await response.json();
				// Tomar solo los primeros 3 partidos
				setPartidos(data.partidos.slice(0, 3));
			} catch (error) {
				console.error('Error loading partidos:', error);
			}
		};
		loadPartidos();
	}, []);

	useEffect(() => {
		setTourConfig({ onStartTour: startTour, showTourButton: true });
		return () => setTourConfig({ showTourButton: false });
	}, [setTourConfig, startTour]);

	// Manejar completado de intro
	const handleIntroComplete = () => {
		setIntroComplete(true);
		setTimeout(() => {
			setShowContent(true);
		}, 100);
	};

	const shouldApplyOpacity = (elementClass: string) => {
		return runTour && currentTourTarget && currentTourTarget !== elementClass;
	};

	const getTourStyles = () => {
		const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
		const hasTarget = currentTourTarget && currentTourTarget !== '.tour-welcome' && currentTourTarget !== '.tour-navigation';
    
		return {
			options: {
				primaryColor: '#3b82f6',
				backgroundColor: isDark ? 'hsl(var(--popover))' : '#ffffff',
				textColor: isDark ? 'hsl(var(--popover-foreground))' : '#1f2937',
				overlayColor: hasTarget
					? 'rgba(0, 0, 0, 0)'
					: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)',
				spotlightShadow: '0 0 0 0 transparent',
				spotlightClicks: true,
				zIndex: 10000,
			},
			tooltip: {
				fontSize: 14,
				padding: 0,
				borderRadius: 12,
				backgroundColor: isDark ? 'hsl(var(--popover))' : '#ffffff',
				color: isDark ? 'hsl(var(--popover-foreground))' : '#1f2937',
				boxShadow: isDark
					? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
					: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
				border: isDark ? '1px solid hsl(var(--border))' : '1px solid #e2e8f0',
				maxWidth: 420,
				minWidth: 320,
			},
			tooltipContainer: {
				textAlign: 'left' as const,
			},
			tooltipTitle: {
				fontSize: 18,
				fontWeight: '600',
				color: isDark ? 'hsl(var(--popover-foreground))' : '#111827',
				marginBottom: 8,
			},
			tooltipContent: {
				fontSize: 14,
				lineHeight: 1.6,
				color: isDark ? 'hsl(var(--muted-foreground))' : '#4b5563',
			},
			tooltipFooter: {
				marginTop: 32,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '16px',
				paddingTop: '16px',
			},
			buttonNext: {
				backgroundColor: '#3b82f6',
				color: '#ffffff',
				fontSize: 14,
				padding: '12px 24px',
				borderRadius: 10,
				border: 'none',
				fontWeight: '600',
				cursor: 'pointer',
				boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
				transition: 'all 0.2s ease',
			},
			buttonBack: {
				backgroundColor: isDark ? 'hsl(var(--secondary))' : '#f8fafc',
				color: isDark ? 'hsl(var(--secondary-foreground))' : 'black',
				fontSize: 14,
				padding: '12px 20px',
				borderRadius: 10,
				border: isDark ? '1px solid hsl(var(--border))' : '1px solid #e2e8f0',
				fontWeight: '500',
				cursor: 'pointer',
				marginRight: '12px',
				transition: 'all 0.2s ease',
				boxShadow: isDark ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
			},
			buttonSkip: {
				backgroundColor: 'transparent',
				color: isDark ? 'hsl(var(--muted-foreground))' : '#ffffff',
				fontSize: 13,
				padding: '8px 12px',
				border: 'none',
				fontWeight: '500',
				cursor: 'pointer',
				borderRadius: 6,
				transition: 'all 0.2s ease',
			},
			beacon: {
				animation: 'joyride-beacon 1.2s ease-in-out infinite',
			},
			overlay: {
				backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
			},
			spotlight: {
				backgroundColor: 'transparent',
				borderRadius: 12,
				border: 'none',
				boxShadow: 'none',
			},
			buttonClose: {
				width: 16,
				height: 16,
				color: isDark ? 'hsl(var(--muted-foreground))' : '#64748b',
				border: 'none',
				borderRadius: 3,
				fontSize: 8,
				fontWeight: 'bold',
				cursor: 'pointer',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute' as const,
				top: 14,
				right: 10,
				zIndex: 1000,
				transition: 'all 0.2s ease',
				opacity: 0.6,
			},
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const customTourCallback = (data: any): void => {
		const { step, index, status, action } = data;
    
		if (step && tourSteps[index]) {
			setCurrentTourTarget(tourSteps[index].target);
		}
    
		if (status === 'finished' || status === 'skipped' || action === 'close') {
			setCurrentTourTarget(null);
		}
    
		handleTourCallback(data);
	};

	const tourSteps = [
		{
			target: '.tour-welcome',
			content: (
				<Card>
					<CardHeader className="pb-4">
						<div className="flex items-center gap-4">
							<div className="space-y-1">
								<h3 className="text-xl font-bold tracking-tight">¡Bienvenido a VotoClaro!</h3>
								<Badge variant="secondary" className="text-xs">
                  Tu guía electoral completa
								</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground leading-relaxed">
              Te ayudaremos a conocer todas las funciones de tu aplicación electoral.
              Este tour te mostrará cómo usar VotoClaro para ejercer tu voto de manera informada y segura.
						</p>
						<Separator />
						<Card className="bg-blue-50/80 dark:bg-slate-800/80 border-blue-200/60 dark:border-blue-400/50 backdrop-blur-md">
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<div className="shrink-0 mt-0.5">
										<Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Consejo</p>
										<p className="text-xs text-blue-800 dark:text-blue-200 mt-1">Haz clic en &quot;Siguiente&quot; para avanzar, o &quot;Saltar tour&quot; para omitir esta guía.</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'center' as const,
			disableBeacon: true,
		},
		{
			target: '.tour-news',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Noticias Electorales</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<p className="text-muted-foreground leading-relaxed">
              Mantente informado con las últimas noticias sobre el proceso electoral.
              Aquí encontrarás información actualizada y confiable desde fuentes oficiales.
						</p>
						<Card className="bg-emerald-50/80 dark:bg-slate-800/80 border-emerald-200/60 dark:border-emerald-400/50 backdrop-blur-md">
							<CardContent className="p-3">
								<div className="flex items-center gap-3">
									<div className="shrink-0">
										<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
									</div>
									<div className="flex-1">
										<p className="text-xs text-emerald-700 dark:text-emerald-200 leading-relaxed">Acceso a noticias verificadas y actualizadas en tiempo real</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'right' as const,
		},
		{
			target: '.tour-candidates',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Conoce a tus Candidatos</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<p className="text-muted-foreground leading-relaxed">
              Explora los perfiles completos de los candidatos: sus propuestas, trayectoria profesional
              y planes de gobierno. Tomar una decisión informada es tu derecho.
						</p>
						<ul className="text-sm list-disc pl-5 text-muted-foreground">
							<li><strong>Nombre:</strong> Identificación del candidato.</li>
							<li><strong>Partido:</strong> Agrupación política a la que pertenece.</li>
							<li><strong>Imagen:</strong> Foto del candidato (si está disponible).</li>
							<li><strong>Ver todos:</strong> Usa el botón para ver la lista completa de candidatos.</li>
						</ul>
						<Card className="bg-purple-50/80 dark:bg-slate-800/80 border-purple-200/60 dark:border-purple-400/50 backdrop-blur-md">
							<CardContent className="p-3">
								<div className="flex items-center gap-3">
									<div className="shrink-0">
										<BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
									</div>
									<div className="flex-1">
										<p className="text-xs text-purple-700 dark:text-purple-200 leading-relaxed">Información verificada de cada candidato y sus propuestas</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'right' as const,
		},
		{
			target: '.tour-parties',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Partidos Políticos</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<p className="text-muted-foreground leading-relaxed">
              Conoce las organizaciones políticas que participan en las elecciones.
              Explora sus ideologías, propuestas y candidatos postulados.
						</p>
						<ul className="text-sm list-disc pl-5 text-muted-foreground">
							<li><strong>Nombre:</strong> Nombre oficial del partido o movimiento.</li>
							<li><strong>Descripción breve:</strong> Resumen de su propuesta o ideología.</li>
							<li><strong>Logo:</strong> Identificador visual del partido.</li>
							<li><strong>Ver todos:</strong> Usa el botón para ver la lista completa de partidos.</li>
						</ul>
						<Card className="bg-blue-50/80 dark:bg-slate-800/80 border-blue-200/60 dark:border-blue-400/50 backdrop-blur-md">
							<CardContent className="p-3">
								<div className="flex items-center gap-3">
									<div className="shrink-0">
										<Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									</div>
									<div className="flex-1">
										<p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">Información completa sobre partidos y movimientos políticos</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'left' as const,
		},
		{
			target: '.tour-voting-location',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<div className="space-y-1">
								<h3 className="text-lg font-semibold">Mi Local de Votación</h3>
								<Badge variant="destructive" className="text-xs">
                  ¡Muy importante!
								</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<p className="text-muted-foreground leading-relaxed">
              Ingresa tu DNI para encontrar tu local de votación específico.
              Conoce la ubicación exacta, tu mesa asignada y todas las facilidades disponibles.
						</p>
						<Card className="bg-orange-50/80 dark:bg-slate-800/80 border-orange-200/60 dark:border-orange-400/50 backdrop-blur-md">
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-semibold text-orange-900 dark:text-orange-100">No olvides tu DNI</p>
										<p className="text-xs text-orange-800 dark:text-orange-200 mt-1">Necesitarás tu documento de identidad para votar</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'left' as const,
		},
		{
			target: '.tour-calendar',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Calendario Electoral</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<p className="text-muted-foreground leading-relaxed">
              No te pierdas ninguna fecha importante del proceso electoral.
              Consulta plazos de inscripción, debates y por supuesto, el día de las elecciones.
						</p>
						<Card className="bg-yellow-50/80 dark:bg-slate-800/80 border-yellow-200/60 dark:border-yellow-400/50 backdrop-blur-md">
							<CardContent className="p-3">
								<div className="flex items-center gap-3">
									<Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
									<p className="text-xs text-yellow-700 dark:text-yellow-200 leading-relaxed">Mantente al día con todas las fechas clave del proceso</p>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'left' as const,
		},
		{
			target: '.tour-member',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Soy Miembro de Mesa</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground leading-relaxed">
              Accede a recursos especializados para miembros de mesa electoral.
              Encuentra materiales de capacitación, formularios y toda la información necesaria para tu labor electoral.
						</p>
						<Separator />
						<Card className="bg-orange-50/80 dark:bg-slate-800/80 border-orange-200/60 dark:border-orange-400/50 backdrop-blur-md">
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-semibold text-orange-900 dark:text-orange-100">Capacitación disponible</p>
										<p className="text-xs text-orange-800 dark:text-orange-200 mt-1">Accede a materiales y guías para tu rol como miembro de mesa</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'left' as const,
		},
		{
			target: '.tour-navigation',
			content: (
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-3">
							<h3 className="text-lg font-semibold">Navegación</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground leading-relaxed">
              Usa el menú de navegación para explorar todas las secciones de VotoClaro.
              También puedes acceder rápidamente desde el menú inferior en móviles.
						</p>
						<Separator />
						<Card className="bg-emerald-50/80 dark:bg-slate-800/80 border-emerald-200/60 dark:border-emerald-400/50 backdrop-blur-md">
							<CardContent className="p-4 space-y-3">
								<div className="flex items-center gap-3">
									<Menu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
									<p className="text-xs text-emerald-700 dark:text-emerald-200 leading-relaxed">Menú principal para acceso rápido</p>
								</div>
								<p className="text-xs text-emerald-700 dark:text-slate-200 leading-relaxed">
                  Ya conoces todas las funciones principales. Haz clic en el ícono de ayuda
                  en la esquina superior derecha si quieres repetir este tour en cualquier momento.
								</p>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			),
			placement: 'bottom' as const,
		},
	];

	// Obtener candidatos destacados
	const candidatos = getFeaturedCandidates(3);

	return (
		<>
			{!introComplete && (
				<WelcomeIntro onComplete={handleIntroComplete} forceShow={forceShowIntro} />
			)}
			
			{isClient && showContent && (
				<Joyride
					steps={tourSteps}
					run={runTour}
					stepIndex={tourStep}
					callback={customTourCallback}
					continuous
					showProgress
					showSkipButton
					scrollToFirstStep
					scrollDuration={300}
					disableOverlayClose
					spotlightClicks
					styles={getTourStyles()}
					locale={{
						back: 'Atrás',
						close: 'Cerrar',
						last: '¡Finalizar!',
						next: 'Siguiente',
						skip: 'Saltar tour',
					}}
				/>
			)}

			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6 pb-20 lg:pb-6">
				{/* Header Section - Above columns */}
				<div className="flex items-center justify-between mb-4 lg:mb-6">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Noticias Recientes
					</h1>
					{news.length > 0 && !loading && (
						<div className="flex items-center gap-2 text-sm text-green-600">
							<div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              En vivo desde El Comercio
						</div>
					)}
					{error && !loading && (
						<div className="flex items-center gap-2 text-sm text-orange-600">
							<div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              Modo offline
						</div>
					)}
				</div>
				<div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0 space-y-6">
					{/* Left Column - Noticias */}
					<div className="lg:col-span-8">
						<section className={`tour-news transition-opacity duration-500 ${
							shouldApplyOpacity('.tour-news') ? 'opacity-30' : 'opacity-100'
						}`}>
							<NewsList />
						</section>
					</div>

					{/* Right Column - Sidebar */}
					<div className="lg:col-span-4 space-y-9">
						{/* Mi Local de Votación */}
						<section className={`tour-voting-location transition-opacity duration-500 ${
							shouldApplyOpacity('.tour-voting-location') ? 'opacity-30' : 'opacity-100'
						}`}>
							<VotingLocation />
						</section>

						{/* Calendario Electoral */}
						<section className={`tour-calendar transition-opacity duration-500 ${
							shouldApplyOpacity('.tour-calendar') ? 'opacity-30' : 'opacity-100'
						}`}>
							<Link href="/calendario" className="block group">
								<Card className='transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer'>
									<CardContent className="p-4 lg:p-8">
										<div className="w-full h-32 lg:h-40 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4 flex items-center justify-center">
											<Calendar className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-600 dark:text-yellow-400" />
										</div>
                  
										<h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">Calendario Electoral</h3>
										<p className="text-sm lg:text-base text-muted-foreground">No te pierdas las fechas importantes</p>
									</CardContent>
								</Card>
							</Link>
						</section>

						{/* Soy Miembro de Mesa */}
						<section className={`tour-member transition-opacity duration-500 ${
							shouldApplyOpacity('.tour-member') ? 'opacity-30' : 'opacity-100'
						}`}>
							<Link href="/miembro-mesa" className="block group">
								<Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
									<CardContent className="p-4 lg:p-8">
										<div className="w-full h-32 lg:h-40 bg-linear-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
											<BookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 dark:text-blue-400" />
										</div>
										<h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg group-hover:text-primary transition-colors">Soy Miembro de Mesa</h3>
										<p className="text-sm lg:text-base text-muted-foreground mb-0">Capacitación y materiales</p>
									</CardContent>
								</Card>
							</Link>
						</section>
					</div>
				</div>

				{/* Candidatos y Partidos - Responsive two-up (abajo de noticias) */}
				<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-6">
					<div className={`w-full lg:w-1/2 tour-candidates transition-opacity duration-500 ${
						shouldApplyOpacity('.tour-candidates') ? 'opacity-30' : 'opacity-100'
					}`}>
						<ItemsGrid
							title="Candidatos Destacados"
							items={candidatos}
							type="candidates"
							viewAllText="Ver todos los candidatos"
							viewAllPath="/candidates"
							icon={Users}
						/>
					</div>
					<div className={`w-full lg:w-1/2 tour-parties transition-opacity duration-500 ${
						shouldApplyOpacity('.tour-parties') ? 'opacity-30' : 'opacity-100'
					}`}>
						<ItemsGrid
							title="Partidos"
							items={partidos}
							type="partidos"
							viewAllText="Ver todos los partidos"
							viewAllPath="/partidos"
							icon={Flag}
						/>
					</div>
				</div>
			</main>
		</>
	);
}