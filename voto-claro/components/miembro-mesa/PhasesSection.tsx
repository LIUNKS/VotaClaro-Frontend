'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle2, Vote, FileText } from "lucide-react";

interface PhaseCardProps {
  icon: React.ReactNode;
  title: string;
  timeRange: string;
  description: string;
  steps: string[];
}

function PhaseCard({ icon, title, timeRange, description, steps }: PhaseCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/10">
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-1 transition-colors duration-300 hover:text-primary">{title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300">
              <Clock className="w-4 h-4 transition-colors duration-300" />
              <span>{timeRange}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 transition-colors duration-300">{description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <Separator className="mb-4 transition-colors duration-300" />
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground transition-colors duration-300">Pasos principales:</h4>
          <ul className="space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-3 transition-colors duration-300 hover:text-foreground">
                <span className="w-5 h-5 bg-muted text-muted-foreground rounded-full text-xs flex items-center justify-center mt-0.5 flex-shrink-0 font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  {index + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function PhasesSection() {
  const phases = [
    {
      icon: <FileText className="w-5 h-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />,
      title: "Fase de Instalación",
      timeRange: "7:00 AM - 8:00 AM",
      description: "Preparación y apertura de mesa. El objetivo es tener todo listo para iniciar la votación a las 8:00 AM.",
      steps: [
        "Llegada y verificación de identidad con DNI",
        "Recepción de caja de material electoral de ONPE",
        "Revisión y conteo de materiales (cédulas, ánfora, etc.)",
        "Armado del local (cabina secreta y ánfora)",
        "Llenado del Acta de Instalación por el Secretario",
        "Firma de cédulas por el Presidente",
        "Anuncio oficial del inicio de votación"
      ]
    },
    {
      icon: <Vote className="w-5 h-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />,
      title: "Fase de Sufragio",
      timeRange: "8:00 AM - 4:00 PM",
      description: "8 horas continuas de votación. Proceso ordenado de recepción de electores y registro de votos.",
      steps: [
        "Identificación del elector con DNI",
        "Verificación en lista de electores (padrón)",
        "Entrega de cédula firmada por el Presidente",
        "Votación secreta en cabina",
        "Depósito de voto en ánfora",
        "Firma y huella en lista de electores",
        "Entrega de holograma como constancia"
      ]
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />,
      title: "Fase de Escrutinio",
      timeRange: "4:00 PM en adelante",
      description: "Conteo oficial de votos y elaboración de actas. La fase más crítica que requiere máxima concentración.",
      steps: [
        "Conteo de votantes (firmas y huellas)",
        "Conteo de cédulas en ánfora",
        "Clasificación de votos (válidos, nulos, blancos)",
        "Llenado meticuloso del Acta de Escrutinio",
        "Guardado en sobres de seguridad",
        "Entrega de material sellado a ONPE"
      ]
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Las 3 Fases de la Jornada Electoral</h2>
        <p className="text-muted-foreground max-w-4xl mx-auto">
          Tu trabajo se divide en tres momentos cruciales, conocidos como "Los 3 Momentos de la Jornada". 
          Cada fase tiene objetivos específicos y pasos claramente definidos.
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <PhaseCard
            key={index}
            icon={phase.icon}
            title={phase.title}
            timeRange={phase.timeRange}
            description={phase.description}
            steps={phase.steps}
          />
        ))}
      </div>
    </section>
  );
}