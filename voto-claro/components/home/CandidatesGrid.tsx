'use client';

import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFeaturedCandidates } from '@/lib/candidates-data';

export function CandidatesGrid() {
  const candidates = getFeaturedCandidates(3);
  const router = useRouter();

  const handleCandidateClick = (candidateId: number, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/candidates/${candidateId}?from=home`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          <h3 className="font-semibold text-card-foreground text-base lg:text-lg">
            Conoce a tus Candidatos
          </h3>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              onClick={(e) => handleCandidateClick(candidate.id, e)}
              className="block cursor-pointer"
            >
              <div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-muted rounded-full overflow-hidden">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const size = window.innerWidth >= 1024 ? 56 : 48;
                      e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100%" height="100%" fill="#E5E7EB"/>
                          <circle cx="${size / 2}" cy="${size / 2.7}" r="${size / 6}" fill="#9CA3AF"/>
                          <path d="M${size / 6} ${(size * 5) / 6}c0-${size / 3} ${size / 6}-${size / 3} ${size / 3}-${size / 3}s${size / 3} 0 ${size / 3} ${size / 3}" fill="#9CA3AF"/>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-card-foreground text-sm lg:text-base">
                    {candidate.name}
                  </p>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {candidate.party}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/candidates">
          <button className="w-full mt-4 lg:mt-6 py-2 lg:py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm lg:text-base">
            Ver Todos los Candidatos
          </button>
        </Link>
      </CardContent>
    </Card>
  );
}