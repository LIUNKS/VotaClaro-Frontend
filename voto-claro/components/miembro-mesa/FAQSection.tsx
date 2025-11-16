'use client';

import * as React from "react";
import { HelpCircle, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


function FAQItem({ question, answer, open, onOpenChange }: {
  question: string;
  answer: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="rounded-lg border border-border bg-muted/20 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none group">
        <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
          {question}
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 transition-colors duration-300">
            <ChevronsUpDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-4 pb-4 pt-1 animate-slideDown">
        <div className="text-muted-foreground text-sm leading-relaxed">
          {answer.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-3 last:mb-0">{paragraph}</p>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function FAQSection() {
  const faqs = [
    {
      question: "¿Cuál es mi tarea más importante?",
      answer: "Llenar correctamente las tres Actas (Instalación, Sufragio y Escrutinio). El Acta de Escrutinio es la más crítica, ya que contiene el resultado oficial de los votos de la mesa y es la que se usa para el cómputo nacional."
    },
    {
      question: "¿Qué pasa si falta un miembro de mesa titular?",
      answer: "Si a las 7:00 AM faltan titulares, se llama a los suplentes. Si los suplentes tampoco están, la mesa se completa con electores de la misma mesa que estén presentes en la fila. La autoridad de la ONPE supervisará este proceso."
    },
    {
      question: "¿Cómo se diferencian los votos (válidos, nulos, blancos)?",
      answer: "Voto Válido: Una marca (cruz '+' o aspa 'x') dentro del recuadro del símbolo o número del partido. Si la intersección de las líneas está dentro, es válido.\n\nVoto Nulo: La marca se sale del recuadro, hay marcas en más de un partido, o la cédula tiene escrituras, rayones, roturas o está firmada.\n\nVoto en Blanco: La cédula no tiene ninguna marca."
    },
    {
      question: "¿Qué hago si un elector no aparece en la lista (padrón)?",
      answer: "No puede votar en esa mesa. Se le debe informar amablemente que verifique su local y mesa correctos, ya sea con el personal de la ONPE o consultando la aplicación."
    },
    {
      question: "¿Puede un elector recibir ayuda para votar? (Voto asistido)",
      answer: "Sí. Las personas con discapacidad, adultos mayores, o personas que no pueden valerse por sí mismas tienen voto preferencial (no hacen cola). Pueden ser asistidos por una persona de su confianza (quien debe identificarse) o por el propio Presidente de mesa."
    },
    {
      question: "¿Qué es una 'impugnación de voto'?",
      answer: "Ocurre si un personero o miembro de mesa duda de la identidad de un votante (por ejemplo, la foto del DNI no coincide). Se anota el hecho en el acta, y al elector se le permite votar, pero su cédula se guarda en un sobre especial (sobre de impugnación) para ser revisado después por el Jurado Nacional de Elecciones (JNE)."
    },
    {
      question: "¿Qué puede hacer (y qué no puede hacer) un personero?",
      answer: "Los personeros (representantes de partidos) pueden observar todo el proceso y presentar reclamos (que deben anotarse en el acta). No pueden tocar el material electoral (cédulas, actas), interrumpir la votación, ni influir en el voto de los electores."
    },
    {
      question: "¿Qué pasa si me equivoco al llenar el acta?",
      answer: "Nunca se debe usar corrector líquido (liquid paper) ni hacer borrones o tachaduras ilegibles. Se debe trazar una línea delgada sobre el error, escribir el dato correcto al lado y, si es un dato importante, los tres miembros de mesa deben firmar al costado de la corrección."
    },
    {
      question: "¿Con quién me comunico si tengo un problema grave?",
      answer: "Los miembros de mesa cuentan con el apoyo constante del Coordinador de Local (personal de la ONPE, usualmente con chaleco azul), a quien deben reportar cualquier incidencia (falta de material, problemas de seguridad, desorden, etc.)."
    }
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="transition-transform duration-300 hover:scale-110">
            <HelpCircle className="w-5 h-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground transition-colors duration-300 hover:text-primary">Preguntas Frecuentes</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Respuestas a las situaciones más comunes que puedes enfrentar como miembro de mesa. 
          Haz clic en cada pregunta para ver la respuesta completa.
        </p>
      </div>
      <div className="flex flex-col gap-3 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === idx}
            onOpenChange={(open) => setOpenIndex(open ? idx : null)}
          />
        ))}
      </div>
    </section>
  );
}