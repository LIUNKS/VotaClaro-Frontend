'use client';

import React, { useState, useCallback } from 'react';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { Footer } from '@/components/ui/Footer';
import { ModeToggle } from '@/components/toogle-dark-mode';
import { NewsError } from '@/components/ui/NewsError';
import { SearchBar } from '@/components/ui/SearchBar';
import { useNews, useSearch } from '@/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { NewsCardData } from '@/app/services/newsService';

export default function NoticiasPage() {
  const router = useRouter();
  const { news, loading, error, refetch } = useNews(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'home' | 'noticias' | 'candidates' | 'members' | 'profile'>('noticias');
  const itemsPerPage = 10;

  const handleSearchChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const { 
    searchTerm, 
    setSearchTerm, 
    filteredData: filteredNews, 
    resultsCount 
  } = useSearch<NewsCardData>({
    data: news,
    searchFields: ['title', 'description'],
    onSearchChange: handleSearchChange
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const formatDate = (dateString?: string) => {
    try {
      if (!dateString) return 'Fecha no disponible';
      
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (minutes < 60) {
        return minutes <= 1 ? 'Hace un momento' : `Hace ${minutes} minutos`;
      } else if (hours < 24) {
        return hours === 1 ? 'Hace 1 hora' : `Hace ${hours} horas`;
      } else if (days < 7) {
        return days === 1 ? 'Hace 1 día' : `Hace ${days} días`;
      } else {
        return date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    } catch {
      return 'Fecha no disponible';
    }
  };

  const handleNewsClick = (index: number, link?: string) => {
    router.push(`/noticias/${index}`);
  };

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
            <Link 
              href="/"
              className="px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/noticias"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'noticias' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Noticias
            </Link>
            <Link 
              href="/candidates"
              className="px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Candidatos
            </Link>
            <button 
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'members' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Miembros
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Perfil
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Noticias</h1>
          
          {/* Search Bar Component */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar noticias..."
          />
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {searchTerm 
              ? `${resultsCount} resultado(s) para "${searchTerm}"`
              : `${resultsCount} noticias disponibles`
            }
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>
          )}
        </div>

        {/* News Content */}
        <div>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-muted rounded-lg animate-pulse" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="py-16">
              <NewsError 
                error={error}
                onRetry={refetch}
                isRetrying={loading}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {currentNews.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No se encontraron noticias con ese término' : 'No hay noticias disponibles'}
                  </p>
                </div>
              ) : (
                currentNews.map((item, localIndex) => {
                  const realIndex = startIndex + localIndex;
                  return (
                    <Card 
                      key={realIndex} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                      onClick={() => handleNewsClick(realIndex, item.link)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                                      <rect width="100%" height="100%" fill="#E5E7EB"/>
                                      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle" dy=".3em">Imagen</text>
                                    </svg>
                                  `)}`;
                                }}
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-primary font-medium">Noticia</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(item.pubDate)}
                              </span>
                              {item.creator && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{item.creator}</span>
                                </>
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className="w-10 h-10"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {searchTerm && !loading && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {resultsCount} resultado(s) para "{searchTerm}"
            </p>
          </div>
        )}
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