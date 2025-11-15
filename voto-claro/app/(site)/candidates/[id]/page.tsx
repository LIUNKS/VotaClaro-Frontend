'use client';

import { useState, use } from 'react';
import { ArrowLeft, Share2, MapPin, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getCandidateById } from '@/lib/candidates-data';

interface CandidateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  const router = useRouter();
  
  const [selectedSection, setSelectedSection] = useState<'biografia' | 'plan' | 'propuestas'>('biografia');
  
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const candidateId = parseInt(resolvedParams.id);
  const candidate = getCandidateById(candidateId);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Candidato no encontrado</h1>
          <p className="text-muted-foreground mb-4">El candidato que buscas no existe.</p>
          <Button onClick={() => router.back()}>
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${candidate.name}`,
          text: `Conoce más sobre ${candidate.name} - ${candidate.party}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-md lg:max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-foreground text-base lg:text-lg">
              Perfil del Candidato
            </h1>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md lg:max-w-4xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
        {/* Candidate Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="48" cy="48" r="48" fill="#E5E7EB"/>
                        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle" dy=".3em">Foto</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
              
              <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                {candidate.name}
              </h2>
              
              <p className="text-muted-foreground mb-3">
                {candidate.party}
              </p>
              
              <Badge variant="secondary" className="mb-4">
                {candidate.position}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          <button
            onClick={() => setSelectedSection('biografia')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedSection === 'biografia'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Hoja de Vida
          </button>
          <button
            onClick={() => setSelectedSection('plan')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedSection === 'plan'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Plan de Gobierno
          </button>
          <button
            onClick={() => setSelectedSection('propuestas')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedSection === 'propuestas'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Propuestas
          </button>
        </div>

        {/* Content Sections */}
        {selectedSection === 'biografia' && (
          <div className="space-y-6">
            {/* Datos Personales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground">Edad</span>
                  <span className="font-medium">{candidate.age} años</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lugar de Nacimiento
                  </span>
                  <span className="font-medium">{candidate.birthPlace}</span>
                </div>
              </CardContent>
            </Card>

            {/* Formación Académica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="w-5 h-5" />
                  Formación Académica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">{edu.level}</span>
                      <span className="font-medium text-right">{edu.institution}</span>
                    </div>
                    {edu.degree && (
                      <div className="text-sm text-muted-foreground">
                        {edu.degree}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experiencia Profesional */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5" />
                  Experiencia Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <div className="font-medium">{exp.position}</div>
                    <div className="text-sm text-muted-foreground">{exp.company}</div>
                    {exp.description && (
                      <div className="text-sm text-muted-foreground mt-2">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fuente */}
            <div className="text-center text-xs text-muted-foreground">
              <p>Fuente: Jurado Nacional de Elecciones (JNE). Información pública oficial.</p>
            </div>
          </div>
        )}

        {selectedSection === 'plan' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan de Gobierno</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.governmentPlan?.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold text-foreground">{section.title}</h3>
                      <p className="text-muted-foreground text-sm">{section.description}</p>
                      {section.details && (
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                          {section.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Plan de gobierno próximamente disponible</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedSection === 'propuestas' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propuestas Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.proposals?.map((proposal, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">{proposal.title}</h3>
                      <p className="text-muted-foreground text-sm">{proposal.description}</p>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Propuestas próximamente disponibles</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}