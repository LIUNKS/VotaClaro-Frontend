"use client";

import { Bell, Calendar, ArrowRight, HelpCircle, Vote, Newspaper, Users, MapPin, CalendarDays, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NewsCard, VotingLocation, CandidatesGrid } from "@/components/home";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Footer } from "@/components/ui/Footer";
import { ModeToggle } from '@/components/toogle-dark-mode';
import { NewsSkeleton } from "@/components/ui/NewsSkeleton";
import { NewsError } from "@/components/ui/NewsError";
import { useNews, useTour } from "@/hooks";
import { useState } from "react";
import Link from "next/link";
import Joyride from 'react-joyride';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "candidates" | "members" | "profile">("home");
  const { news, loading, error, refetch, lastUpdated } = useNews(4);
  const { runTour, tourStep, handleTourCallback, startTour, isClient } = useTour();
  
  // Estado para rastrear el elemento activo del tour
  const [currentTourTarget, setCurrentTourTarget] = useState<string | null>(null);

  // Función helper para determinar si un elemento debe tener opacidad
  const shouldApplyOpacity = (elementClass: string) => {
    return runTour && currentTourTarget && currentTourTarget !== elementClass;
  };
  // Función para obtener estilos según el tema
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

  // Función personalizada para manejar el callback del tour y rastrear el target activo
  const customTourCallback = (data: any) => {
    const { step, index, status, action } = data;
    
    // Actualizar el target actual basándose en el paso activo
    if (step && tourSteps[index]) {
      setCurrentTourTarget(tourSteps[index].target);
    }
    
    // Resetear el target cuando el tour termina
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
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800 dark:text-slate-100">
                      Consejo útil
                    </p>
                    <p className="text-xs text-blue-700 dark:text-slate-200 mt-1">
                      Puedes saltar este tour en cualquier momento y reactivarlo desde el botón de ayuda.
                    </p>
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
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Tip</p>
                    <p className="text-xs text-emerald-600 dark:text-slate-200 mt-0.5">
                      Haz clic en "Ver más noticias" para explorar todas las actualizaciones disponibles.
                    </p>
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
            <Card className="bg-purple-50/80 dark:bg-slate-800/80 border-purple-200/60 dark:border-purple-400/50 backdrop-blur-md">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Tip</p>
                    <p className="text-xs text-purple-600 dark:text-slate-200 mt-0.5">
                      Compara candidatos lado a lado para tomar la mejor decisión.
                    </p>
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
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                      Información importante
                    </p>
                    <p className="text-xs text-orange-700 dark:text-slate-200 mt-1">
                      Sin tu DNI no podrás votar el día de las elecciones.
                    </p>
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
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300 uppercase tracking-wider">Próximamente</p>
                    <p className="text-xs text-yellow-600 dark:text-slate-200 mt-0.5">
                      Recordatorios automáticos para fechas clave.
                    </p>
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
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wider">Capacitación</p>
                    <p className="text-xs text-orange-600 dark:text-slate-200 mt-0.5">
                      Encuentra manuales, videos y formularios oficiales para el día electoral.
                    </p>
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
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      ¡Tour Completado!
                    </p>
                  </div>
                </div>
                <p className="text-xs text-emerald-700 dark:text-slate-200 leading-relaxed">
                  Ya conoces todas las funciones principales. Haz clic en el ícono de ayuda 
                  <Button variant="ghost" size="sm" className="mx-1 px-1 py-0 h-auto text-emerald-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-slate-200">
                    <HelpCircle className="h-3 w-3" />
                  </Button>
                  si quieres repetir este tour en cualquier momento.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      ),
      placement: 'bottom' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Tour Component */}
      {isClient && (
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

      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10 tour-welcome">
        <div className="max-w-md lg:max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-base lg:text-lg">Elecciones 2026</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 tour-navigation">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "home" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setActiveTab("candidates")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "candidates" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Candidatos
            </button>
            <button 
              onClick={() => setActiveTab("members")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "members" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Miembros
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "profile" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Perfil
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={startTour}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              title="Iniciar tour guiado"
            >
              <HelpCircle className="w-6 h-6 text-muted-foreground" />
            </button>
            <ModeToggle />
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <Bell className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6 pb-20 lg:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0 space-y-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Noticias Recientes */}
            <section className={`tour-news transition-opacity duration-500 ${
              shouldApplyOpacity('.tour-news') ? 'opacity-30' : 'opacity-100'
            }`}>
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
              
              {loading ? (
                <NewsSkeleton count={2} />
              ) : error ? (
                <NewsError 
                  error={error}
                  onRetry={refetch}
                  isRetrying={loading}
                />
              ) : (
                <>
                  <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                    {news.map((newsItem, index) => (
                      <NewsCard
                        key={index}
                        title={newsItem.title}
                        description={newsItem.description}
                        type={newsItem.type}
                        image={newsItem.image}
                        link={newsItem.link}
                        newsId={index}
                        pubDate={newsItem.pubDate}
                      />
                    ))}
                  </div>
                  {news.length > 0 && (
                    <div className="text-center mt-6 space-y-3">
                      <Link 
                        href="/noticias"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors group"
                      >
                        Ver más noticias
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Conoce a tus Candidatos */}
            <section className={`tour-candidates transition-opacity duration-500 ${
              shouldApplyOpacity('.tour-candidates') ? 'opacity-30' : 'opacity-100'
            }`}>
              <CandidatesGrid />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mi Local de Votación */}
            <section className={`tour-voting-location transition-opacity duration-500 ${
              shouldApplyOpacity('.tour-voting-location') ? 'opacity-30' : 'opacity-100'
            }`}>
              <VotingLocation />
            </section>

            <section className={`tour-calendar transition-opacity duration-500 ${
              shouldApplyOpacity('.tour-calendar') ? 'opacity-30' : 'opacity-100'
            }`}>
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="w-full h-32 lg:h-40 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4 flex items-center justify-center">
                    <Calendar className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  
                  <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">Calendario Electoral</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">No te pierdas las fechas importantes</p>
                </CardContent>
              </Card>
            </section>

            <section className={`tour-member transition-opacity duration-500 ${
              shouldApplyOpacity('.tour-member') ? 'opacity-30' : 'opacity-100'
            }`}>
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="w-full h-32 lg:h-40 bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src="/api/placeholder/300/120"
                      alt="Miembro de mesa"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="300" height="120" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#F3F4F6"/>
                            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle" dy=".3em">Capacitación</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">Soy Miembro de Mesa</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">Capacitación y materiales</p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      {/* Footer - Desktop Only */}
      <Footer />

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}