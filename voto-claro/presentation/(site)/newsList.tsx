'use client';

import { NewsCard } from '@/components/home';
import { NewsError } from '@/components/ui/NewsError';
import { NewsSkeleton } from '@/components/ui/NewsSkeleton';
import { useNews } from '@/hooks';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NewsList(){
  const { news, loading, error, refetch } =  useNews(4);
    
  // Fallback data if no news loaded yet
  const fallbackNews = [
    {
      title: 'Se confirma la fecha límite para la inscripción de candidatos.',
      description: 'Mantente informado',
      type: 'gradient' as const,
      category: 'Elecciones',
      image: undefined,
      link: undefined,
      pubDate: new Date().toISOString(),
      creator: 'Equipo VotaClaro',
      contentEncoded: 'Mantente informado sobre las fechas importantes del proceso electoral.',
    },
    {
      title: 'Nuevas medidas para el día de las elecciones',
      description: 'Mantente informado sobre los nuevos protocolos',
      category: 'Elecciones',
      type: 'image' as const,
      image: '/api/placeholder/80/80',
      link: undefined,
      pubDate: new Date().toISOString(),
      creator: 'Equipo VotaClaro',
      contentEncoded: 'Conoce los nuevos protocolos de seguridad para el día de las elecciones.',
    },
  ];
    
  // Use real news if available, otherwise fallback
  const displayNews = news.length > 0 ? news : fallbackNews;
  return (
    <section>   
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
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors group"
              >
                        Ver todas las noticias
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>);
            
}