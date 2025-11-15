"use client";

import { ArrowLeft, Search, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsError } from "@/components/ui/NewsError";
import { useNews } from "@/hooks";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoticiasPage() {
  const router = useRouter();
  const { news, loading, error, refetch } = useNews(100); 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (minutes < 60) {
        return minutes <= 1 ? "Hace un momento" : `Hace ${minutes} minutos`;
      } else if (hours < 24) {
        return hours === 1 ? "Hace 1 hora" : `Hace ${hours} horas`;
      } else if (days < 7) {
        return days === 1 ? "Hace 1 día" : `Hace ${days} días`;
      } else {
        return date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    } catch {
      return "Fecha no disponible";
    }
  };

  const handleNewsClick = (index: number, link?: string) => {
    router.push(`/noticias/${index}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-foreground">Noticias</h1>
          </div>
          
          <Button variant="ghost" size="icon">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {searchTerm 
              ? `${filteredNews.length} resultado(s) para "${searchTerm}"`
              : `${filteredNews.length} noticias disponibles`
            }
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>
          )}
        </div>

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
                        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
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
                  {searchTerm ? "No se encontraron noticias con ese término" : "No hay noticias disponibles"}
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
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                          {item.image ? (
                            <img 
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100%" height="100%" fill="#F3F4F6"/>
                                    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle" dy=".3em">📰</text>
                                  </svg>
                                `)}`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-lg">📰</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs text-muted-foreground">
                            Publicado: {item.pubDate ? formatDate(item.pubDate) : "Fecha no disponible"}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors overflow-hidden">
                          <span className="block line-clamp-2" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.title}
                          </span>
                        </h3>
                        
                        <p className="text-sm text-muted-foreground overflow-hidden">
                          <span className="block line-clamp-2" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.description}
                          </span>
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
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNumber)}
                    className="w-10 h-10 p-0"
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
              Mostrando {filteredNews.length} resultado(s) para "{searchTerm}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}