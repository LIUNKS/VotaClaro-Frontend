"use client";

import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface VotingLocationProps {
  schoolName?: string;
  address?: string;
  tableNumber?: string;
}

export function VotingLocation({ schoolName, address, tableNumber }: VotingLocationProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2 text-base lg:text-lg">Mi Local de Votación</h3>
            <p className="text-sm lg:text-base text-gray-600 mb-3">
              Encuentra tu local de votación y obtén direcciones exactas
            </p>
          </div>
          
          <Link 
            href="/voting-location"
            className="p-2 lg:p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Navigation className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}