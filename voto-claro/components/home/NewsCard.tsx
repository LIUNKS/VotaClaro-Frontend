'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface NewsCardProps {
  title: string;
  description?: string;
  type: 'gradient' | 'image';
  image?: string;
  link?: string;
  pubDate?: string;
  newsId?: number; // ID para navegación interna
}

export function NewsCard({ title, description, type, image, link, pubDate, newsId }: NewsCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (newsId !== undefined) {
      router.push(`/noticias/${newsId}?from=home`);
    }
  };

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-200 ${link ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-4 lg:p-6">
        {type === 'gradient' && (
          <div className="w-full h-32 lg:h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-white text-center">
            </div>
          </div>
        )}
        
        {type === 'image' && image && (
          <div className="w-full h-32 lg:h-40 bg-muted rounded-lg mb-4 overflow-hidden">
            <img 
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="300" height="160" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#F3F4F6"/>
                    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle" dy=".3em">Imagen</text>
                  </svg>
                `)}`;
              }}
            />
          </div>
        )}
        
        <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">{title}</h3>
        {description && (
          <p className="text-sm lg:text-base text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}