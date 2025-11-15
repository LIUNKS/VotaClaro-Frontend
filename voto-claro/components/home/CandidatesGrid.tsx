"use client";

import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const candidates = [
  { id: 1, name: "Ana García", party: "Partido A", image: "/api/placeholder/60/60" },
  { id: 2, name: "Carlos López", party: "Partido B", image: "/api/placeholder/60/60" },
  { id: 3, name: "María Silva", party: "Partido C", image: "/api/placeholder/60/60" },
];

export function CandidatesGrid() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
          <h3 className="font-semibold text-gray-800 text-base lg:text-lg">Conoce a tus Candidatos</h3>
        </div>
        
        <div className="space-y-3 lg:space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const size = window.innerWidth >= 1024 ? 56 : 48;
                    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#E5E7EB"/>
                        <circle cx="${size/2}" cy="${size/2.7}" r="${size/6}" fill="#9CA3AF"/>
                        <path d="M${size/6} ${size*5/6}c0-${size/3} ${size/6}-${size/3} ${size/3}-${size/3}s${size/3} 0 ${size/3} ${size/3}" fill="#9CA3AF"/>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm lg:text-base">{candidate.name}</p>
                <p className="text-sm lg:text-base text-gray-600">{candidate.party}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 lg:mt-6 py-2 lg:py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm lg:text-base">
          Ver Todos los Candidatos
        </button>
      </CardContent>
    </Card>
  );
}