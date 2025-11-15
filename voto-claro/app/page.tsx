"use client";

import { Bell, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NewsCard, VotingLocation, CandidatesGrid } from "@/components/home";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Footer } from "@/components/ui/Footer";
import { ModeToggle } from '@/components/toogle-dark-mode';
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "candidates" | "members" | "profile">("home");

  // Datos de ejemplo para las noticias
  const newsItems = [
    {
      title: "Se confirma la fecha límite para la inscripción de candidatos.",
      description: "Mantente informado",
      type: "gradient" as const,
    },
    {
      title: "Nuevas medidas para el día de las elecciones",
      category: "Elecciones",
      type: "image" as const,
      image: "/api/placeholder/80/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-md lg:max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-base lg:text-lg">Elecciones 2026</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "home" 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setActiveTab("candidates")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "candidates" 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Candidatos
            </button>
            <button 
              onClick={() => setActiveTab("members")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "members" 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Miembros
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "profile" 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Perfil
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 lg:mb-6">Noticias Recientes</h1>
              
              <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {newsItems.map((news, index) => (
                  <NewsCard
                    key={index}
                    title={news.title}
                    description={news.description}
                    type={news.type}
                    image={news.image}
                    category={news.category}
                  />
                ))}
              </div>
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
                  
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-base lg:text-lg">Calendario Electoral</h3>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">No te pierdas las fechas importantes</p>
                </CardContent>
              </Card>
            </section>

            {/* Soy Miembro de Mesa */}
            <section>
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="w-full h-32 lg:h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
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
                  
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-base lg:text-lg">Soy Miembro de Mesa</h3>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">Capacitación y materiales</p>
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