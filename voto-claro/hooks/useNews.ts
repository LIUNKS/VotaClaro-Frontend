import { useState, useEffect, useCallback } from 'react';
import { NewsService, NewsCardData, NewsResponse } from '@/services/newsService';

export interface UseNewsReturn {
  news: NewsCardData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: string | null;
}

export function useNews(maxItems: number = 6): UseNewsReturn {
  const [news, setNews] = useState<NewsCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const shouldClearCache = !localStorage.getItem('newsTypeFixedV2');
      if (shouldClearCache) {
        NewsService.clearCache();
        localStorage.setItem('newsTypeFixedV2', 'true');
      }
      
      const response: NewsResponse = await NewsService.fetchPoliticalNews();
      
      if (response.success) {
        const formattedNews = NewsService.formatNewsForUI(response.data, maxItems);
        setNews(formattedNews);
        setLastUpdated(response.lastUpdated);
      } else {
        setError(response.error || 'Error desconocido al cargar noticias');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar noticias';
      setError(errorMessage);
      console.error('Error in useNews:', err);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 10 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
    lastUpdated,
  };
}