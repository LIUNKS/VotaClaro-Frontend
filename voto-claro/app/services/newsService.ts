export interface RSSNewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category?: string;
  image?: string;
  creator?: string;
  contentEncoded?: string;
}

export interface NewsCardData {
  title: string;
  description: string;
  category?: string;
  type: "gradient" | "image";
  image?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  contentEncoded?: string;
}

export interface NewsResponse {
  success: boolean;
  data: RSSNewsItem[];
  error?: string;
  lastUpdated: string;
}

export class NewsService {
  private static readonly API_BASE = '/api/news';
  private static readonly CACHE_KEY = 'political_news_cache';
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static async fetchPoliticalNews(): Promise<NewsResponse> {
    try {
      const cached = this.getCachedNews();
      if (cached) {
        return cached;
      }

      const response = await fetch(`${this.API_BASE}/political`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NewsResponse = await response.json();
      
      if (data.success) {
        this.setCachedNews(data);
      }

      return data;
    } catch (error) {
      console.error('Error fetching political news:', error);
      
      const cached = this.getCachedNews();
      if (cached) {
        return cached;
      }

      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  static formatNewsForUI(newsItems: RSSNewsItem[], maxItems: number = 6): NewsCardData[] {
    return newsItems.slice(0, maxItems).map((item, index) => {
      const hasImage = item.image && item.image.trim() !== '';
      const cardType = hasImage ? 'image' as const : 'gradient' as const;
      
      return {
        title: this.truncateText(item.title, 80),
        description: this.truncateText(item.description, 120),
        category: item.category || 'Política',
        type: cardType,
        image: item.image || '/api/placeholder/80/80',
        link: item.link,
        pubDate: item.pubDate,
        creator: item.creator,
        contentEncoded: item.contentEncoded,
      };
    });
  }

  private static getCachedNews(): NewsResponse | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      const now = Date.now();
      const cacheTime = new Date(parsedCache.timestamp).getTime();

      if (now - cacheTime < this.CACHE_DURATION) {
        return parsedCache.data;
      }

      localStorage.removeItem(this.CACHE_KEY);
      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    }
  }

  private static setCachedNews(data: NewsResponse): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheObject = {
        data,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  private static truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  static clearCache(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }
}