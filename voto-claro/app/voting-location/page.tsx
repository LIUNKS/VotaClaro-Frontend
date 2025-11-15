"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GeolocationMap from "@/components/maps/GeolocationMap";
import Link from "next/link";

// Datos de ejemplo para el local de votación
const votingLocationData = {
  schoolName: "Colegio Nacional San José",
  address: "Av. Principal 123, Miraflores, Lima",
  tableNumber: "012345",
  latitude: -12.1203,
  longitude: -77.0282,
  phone: "+51 1 234-5678",
  hours: "8:00 AM - 6:00 PM",
  capacity: "350 votantes",
  facilities: [
    "Acceso para personas con discapacidad",
    "Estacionamiento disponible",
    "Transporte público cercano",
    "Servicio de agua y baños",
  ],
};

export default function VotingLocationPage() {
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${votingLocationData.latitude},${votingLocationData.longitude}`;
    window.open(url, "_blank");
  };

  const openInWaze = () => {
    const url = `https://waze.com/ul?ll=${votingLocationData.latitude},${votingLocationData.longitude}&navigate=yes`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-md lg:max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <Link
              href="/"
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                Mi Local de Votación
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Encuentra tu lugar de votación y obtén direcciones
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Map Column */}
          <div className="lg:col-span-8">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-64 lg:h-96 w-full overflow-hidden bg-muted">
                  <GeolocationMap
                    latitude={votingLocationData.latitude}
                    longitude={votingLocationData.longitude}
                    markerTitle={votingLocationData.schoolName}
                    width="100%"
                    height="100%"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <button
                onClick={openInGoogleMaps}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-all duration-200 font-medium cursor-pointer shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation className="w-5 h-5" />
                <span>Google Maps</span>
              </button>
              <button
                onClick={openInWaze}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 active:bg-secondary/70 transition-all duration-200 font-medium cursor-pointer shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation className="w-5 h-5" />
                <span>Waze</span>
              </button>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Location Details */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground text-lg mb-1">
                      {votingLocationData.schoolName}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {votingLocationData.address}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      Mesa: {votingLocationData.tableNumber}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {votingLocationData.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {votingLocationData.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {votingLocationData.capacity}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                <h4 className="font-semibold text-card-foreground mb-4">
                  Facilidades Disponibles
                </h4>
                <ul className="space-y-2">
                  {votingLocationData.facilities.map((facility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">
                        {facility}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Notas Importantes */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                <h4 className="font-semibold text-card-foreground mb-4">
                  Información Importante
                </h4>
                <div className="space-y-3 text-sm">
                  
                  <div className="bg-muted border border-border rounded-lg p-3">
                    <p className="font-semibold text-foreground mb-1">
                      Documentos Requeridos
                    </p>
                    <p className="text-muted-foreground">
                      Lleva tu DNI vigente para poder votar
                    </p>
                  </div>

                  <div className="bg-muted border border-border rounded-lg p-3">
                    <p className="font-semibold text-foreground mb-1">
                      Horario de Votación
                    </p>
                    <p className="text-muted-foreground">
                      Las urnas abren a las 8:00 AM y cierran a las 6:00 PM
                    </p>
                  </div>

                  <div className="bg-muted border border-border rounded-lg p-3">
                    <p className="font-semibold text-foreground mb-1">
                      Protocolo de Seguridad
                    </p>
                    <p className="text-muted-foreground">
                      Se mantienen medidas de bioseguridad vigentes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}