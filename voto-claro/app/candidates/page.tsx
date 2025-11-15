"use client";

import { Search, Filter, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const candidates = [
  {
    id: 1,
    name: "Ana García Mendoza",
    party: "Partido Democrático Nacional",
    position: "Presidencia",
    image: "/api/placeholder/150/150",
    votes: "2,345,678",
    percentage: "32.5%",
    proposals: ["Educación gratuita", "Salud universal", "Empleo juvenil"]
  },
  {
    id: 2,
    name: "Carlos López Rivera",
    party: "Alianza por el Progreso",
    position: "Presidencia", 
    image: "/api/placeholder/150/150",
    votes: "1,987,432",
    percentage: "27.8%",
    proposals: ["Economía digital", "Infraestructura", "Seguridad ciudadana"]
  },
  {
    id: 3,
    name: "María Silva Torres",
    party: "Movimiento Ciudadano",
    position: "Presidencia",
    image: "/api/placeholder/150/150", 
    votes: "1,654,321",
    percentage: "23.1%",
    proposals: ["Medio ambiente", "Derechos humanos", "Transparencia"]
  },
  {
    id: 4,
    name: "Roberto Fernández",
    party: "Unidad Nacional",
    position: "Presidencia",
    image: "/api/placeholder/150/150",
    votes: "1,234,567",
    percentage: "16.6%", 
    proposals: ["Desarrollo rural", "Pequeña empresa", "Tradición"]
  }
];

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="max-w-md lg:max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Candidatos 2026</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar candidato o partido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2 lg:gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los cargos</option>
                <option value="presidencia">Presidencia</option>
                <option value="congreso">Congreso</option>
                <option value="regional">Regional</option>
              </select>
              
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden lg:inline">Filtros</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                {/* Candidate Photo */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const size = window.innerWidth >= 1024 ? 96 : 80;
                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#E5E7EB"/>
                            <circle cx="${size/2}" cy="${size/2.5}" r="${size/5}" fill="#9CA3AF"/>
                            <path d="M${size/5} ${size*4/5}c0-${size/3} ${size/5}-${size/3} ${size*3/10}-${size/3}s${size*3/10} 0 ${size*3/10} ${size/3}" fill="#9CA3AF"/>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{candidate.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{candidate.party}</p>
                    <p className="text-sm text-gray-600">{candidate.position}</p>
                  </div>
                </div>

                {/* Voting Stats */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Intención de voto</span>
                    <span className="font-bold text-lg text-gray-800">{candidate.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: candidate.percentage }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{candidate.votes} votos estimados</p>
                </div>

                {/* Key Proposals */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Propuestas clave:</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.proposals.map((proposal, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {proposal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Ver Perfil
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Cargar más candidatos
          </button>
        </div>
      </main>
    </div>
  );
}