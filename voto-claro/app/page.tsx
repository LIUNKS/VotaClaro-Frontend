"use client";

import { Bell, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NewsCard, VotingLocation, CandidatesGrid } from "@/components/home";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Footer } from "@/components/ui/Footer";
import { ModeToggle } from '@/components/toogle-dark-mode';
import { NewsSkeleton } from "@/components/ui/NewsSkeleton";
import { NewsError } from "@/components/ui/NewsError";
import { useNews } from "@/hooks";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "candidates" | "members" | "profile">("home");
  const { news, loading, error, refetch, lastUpdated } = useNews(4);

  // Fallback data if no news loaded yet
  const fallbackNews = [
    {
      title: "Se confirma la fecha límite para la inscripción de candidatos.",
      description: "Mantente informado",
      type: "gradient" as const,
      category: "Elecciones",
      image: undefined,
      link: undefined,
      pubDate: new Date().toISOString(),
      creator: "Equipo VotaClaro",
      contentEncoded: "Mantente informado sobre las fechas importantes del proceso electoral.",
    },
    {
      title: "Nuevas medidas para el día de las elecciones",
      description: "Mantente informado sobre los nuevos protocolos",
      category: "Elecciones",
      type: "image" as const,
      image: "/api/placeholder/80/80",
      link: undefined,
      pubDate: new Date().toISOString(),
      creator: "Equipo VotaClaro",
      contentEncoded: "Conoce los nuevos protocolos de seguridad para el día de las elecciones.",
    },
  ];

  // Use real news if available, otherwise fallback
  const displayNews = news.length > 0 ? news : fallbackNews;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-md lg:max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-base lg:text-lg">Elecciones 2026</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
            <section>
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
                    {displayNews.map((news, index) => (
                      <NewsCard
                        key={index}
                        title={news.title}
                        description={news.description}
                        type={news.type}
                        image={news.image}
                        link={news.link}
                        newsId={index}
                        pubDate={news.pubDate}
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
            <section>
              <CandidatesGrid />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mi Local de Votación */}
            <section>
              <VotingLocation />
            </section>

            {/* Calendario Electoral */}
            <section>
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

            {/* Soy Miembro de Mesa */}
            <section>
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