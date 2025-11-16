'use client';

import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Footer } from '@/components/ui/Footer';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function NoticiaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Detectar desde dónde viene el usuario
  const fromPage = searchParams.get('from');
  const initialTab = fromPage === 'noticias' ? 'noticias' : 'home';
  
  const [activeTab, setActiveTab] = useState<'home' | 'noticias' | 'candidates' | 'members' | 'profile'>(initialTab);
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const newsId = params.id ? parseInt(params.id as string, 10) : null;
  
  useEffect(() => {
    async function fetchNewsDetail() {
      if (newsId === null || isNaN(newsId)) {
        setError('ID de noticia inválido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/news/political');
        if (!response.ok) {
          throw new Error('Error al cargar noticias');
        }
        
        const data = await response.json();
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const foundNews = data.data[newsId];
          
          if (foundNews) {
            setCurrentNews(foundNews);
          } else {
            setError('Noticia no encontrada');
          }
        } else {
          setError('Formato de datos inválido');
        }
      } catch (err) {
        setError('Error al cargar la noticia');
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsDetail();
  }, [newsId]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Fecha no disponible';
    }
  };

  const handleReadOriginal = () => {
    if (currentNews?.link) {
      window.open(currentNews.link, '_blank', 'noopener,noreferrer');
    }
  };

  const tuneContent = (html: string) => {
  // Paso 1: Reemplazos básicos de entidades (ya los tienes)
    let cleaned = html
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ');

    // Paso 2: Remover elementos no deseados (ej. scripts, estilos, anuncios)
    cleaned = cleaned.replace(/<script[^>]*>.*?<\/script>/gi, ''); // Remover scripts
    cleaned = cleaned.replace(/<style[^>]*>.*?<\/style>/gi, ''); // Remover estilos inline

    // Paso 3: Agregar clases CSS para estilizar (ej. para Tailwind)
    cleaned = cleaned.replace(/<p>/g, '<p class="text-foreground leading-relaxed mb-4">');
    cleaned = cleaned.replace(/<img /g, '<img class="my-4 rounded-lg shadow-md w-full h-auto p-4 bg-accent" ');

    return cleaned;
  };

  const handleBackClick = () => {
    // Regresar según desde dónde vino
    router.back();
  };

  if (loading) {
    return (
        
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !currentNews) {
    return (
        
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Noticia no encontrada</h2>
          <p className="text-muted-foreground mb-6">La noticia que buscas no está disponible.</p>
          <Button onClick={handleBackClick}>Volver a noticias</Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="bg-card border-b border-border px-4 py-4 sticky top-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-foreground">Noticias</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-20 lg:pb-6">
        {currentNews.image && (
          <div className="w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden mb-6">
            <Image 
              src={currentNews.image}
              alt={currentNews.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              width={800}
              height={400}
            />
          </div>
        )}

        <article className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {currentNews.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Publicado: {formatDate(currentNews.pubDate)}</span>
            </div>
            {currentNews.creator && currentNews.creator.trim() && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Por: {currentNews.creator}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>Fuente: {currentNews.source}</span>
            </div>
          </div>

          <div className="text-lg text-muted-foreground leading-relaxed">
            {currentNews.description}
          </div>

          <div className="prose prose-lg max-w-none">
            {currentNews.contentEncoded ? (
              <div 
                className="text-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: tuneContent(currentNews.contentEncoded)
                }}
              />
            ) : (
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {currentNews.description}
                </p>
                
                <p className="text-foreground leading-relaxed">
                  Este es un resumen de la noticia. Para leer el artículo completo con todos los detalles, 
                  haz clic en el botón de abajo para ir al artículo original.
                </p>
              </div>
            )}
          </div>

          {currentNews.link && (
            <Card className="mt-8">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    ¿Quieres leer más detalles?
                  </h3>
                  <p className="text-muted-foreground">
                    Lee el artículo completo en la fuente original para obtener toda la información.
                  </p>
                  <Button 
                    onClick={handleReadOriginal}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Leer artículo completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a todas las noticias
            </Button>
          </div>
        </article>
      </main>
    </>
  );
}