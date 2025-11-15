"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GeolocationMap from "@/components/maps/GeolocationMap";
import { VotingLocationModal } from "@/components/ui/modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getVotingLocationByDni, getDefaultVotingLocation, VotingLocationData } from "@/lib/mockData";

export default function VotingLocationPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [votingLocationData, setVotingLocationData] = useState<VotingLocationData>(
    getDefaultVotingLocation()
  );
  const [userDni, setUserDni] = useState<string>("");

  const handleDniSubmit = (dni: string) => {
    const locationData = getVotingLocationByDni(dni);
    if (locationData) {
      setVotingLocationData(locationData);
      setUserDni(dni);
    } else {
      // Si no se encuentra el DNI, mostrar datos por defecto con mensaje
      setVotingLocationData({
        ...getDefaultVotingLocation(),
        schoolName: "DNI no encontrado",
        address: "Lo sentimos, no encontramos información para el DNI ingresado. Por favor verifica el número o contacta al centro de atención.",
      });
      setUserDni(dni);
    }
  };
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
      {/* Modal de búsqueda por DNI */}
      <VotingLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDniSubmit={handleDniSubmit}
      />

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
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                  Mi Local de Votación
                </h1>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground">
                {userDni 
                  ? "Información de tu local de votación" 
                  : "Encuentra tu lugar de votación y obtén direcciones"
                }
              </p>
            </div>
            {userDni && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Cambiar DNI
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Mensaje cuando no hay DNI o DNI no encontrado */}
        {(!userDni || votingLocationData.schoolName === "DNI no encontrado") && (
          <div className="mb-6">
            <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                      {!userDni ? "¡Ingresa tu DNI para comenzar!" : "DNI no encontrado"}
                    </h3>
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      {!userDni 
                        ? "Haz clic en 'Cambiar DNI' o recarga la página para buscar tu local de votación específico."
                        : "No encontramos información para el DNI ingresado. Verifica el número o contacta al centro de atención."
                      }
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    {!userDni ? "Buscar por DNI" : "Intentar de nuevo"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
                    {votingLocationData.dni !== "00000000" && (
                      <p className="text-sm font-medium text-primary">
                        Mesa: {votingLocationData.tableNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    {votingLocationData.hours !== "" && (
                      <>
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-card-foreground">
                          {votingLocationData.hours}
                        </span>
                      </>
                    )}
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