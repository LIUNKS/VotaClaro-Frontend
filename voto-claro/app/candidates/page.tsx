'use client';

import React, { useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { Footer } from '@/components/ui/Footer';
import { ModeToggle } from '@/components/toogle-dark-mode';
import { SearchBar } from '@/components/ui/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { candidatesData, type Candidate } from '@/lib/candidates-data';
import { useSearch, useScrollRestore } from '@/hooks';

const tabs = [
  { id: 'presidenciales', label: 'Presidenciales', active: true },
  { id: 'diputados', label: 'Diputados', active: false },
  { id: 'senadores', label: 'Senadores', active: false },
  { id: 'andino', label: 'Parlamento Andino', active: false }
];

export default function CandidatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('presidenciales');
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'noticias' | 'candidates' | 'members' | 'profile'>('candidates');

  // Hook para restaurar la posición del scroll
  const { saveScrollPosition } = useScrollRestore({ 
    key: 'candidates',
    behavior: 'smooth',
    delay: 300,
    duration: 1000,
    easing: 'ease-out'
  });

  // Hook de búsqueda
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredData: filteredCandidates, 
    resultsCount 
  } = useSearch<Candidate>({
    data: candidatesData,
    searchFields: ['name', 'party']
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchTerm('');
    
    // Por ahora mostramos todos los candidatos, pero se podrá filtrar por categoría si habilitamos
    // const categoryMap = {
    //   'presidenciales': 'presidencial',
    //   'diputados': 'diputado', 
    //   'senadores': 'senador',
    //   'andino': 'andino'
    // };
    // const filteredByCategory = getCandidatesByCategory(categoryMap[tabId]);
  };

  const handleCandidateClick = (candidateId: number) => {
    // Guardar posición manualmente antes de navegar
    saveScrollPosition();
    router.push(`/candidates/${candidateId}?from=candidates`);
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
              className="px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Noticias
            </Link>
            <Link 
              href="/candidates"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeNavTab === 'candidates' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Candidatos
            </Link>
            <button 
              onClick={() => setActiveNavTab('members')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeNavTab === 'members' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Miembros
            </button>
            <button 
              onClick={() => setActiveNavTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeNavTab === 'profile' 
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
        {/* Title and Search Section */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Candidatos</h1>
          
          {/* Search Bar Component */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar candidato o partido"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-6 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchTerm 
              ? `${resultsCount} candidato(s) encontrado(s) para '${searchTerm}'`
              : `${resultsCount} candidatos disponibles`
            }
          </p>
        </div>

        {/* Candidates List */}
        <div className="space-y-3">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCandidateClick(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#E5E7EB"/>
                            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle" dy=".3em">Foto</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.party}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}

          {filteredCandidates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? 'No se encontraron candidatos con ese término' : 'No hay candidatos disponibles'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Desktop Only */}
      <Footer />

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden">
        <BottomNavigation
          activeTab={activeNavTab}
          onTabChange={setActiveNavTab}
        />
      </div>
    </div>
  );
}