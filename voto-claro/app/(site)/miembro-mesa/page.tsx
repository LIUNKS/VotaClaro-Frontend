'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, BookOpen, Users, Clock } from 'lucide-react';
import { RolesSection, PhasesSection, FAQSection } from '../../../components/miembro-mesa';

export default function MiembroMesaPage() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	return (
		<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8 pb-20 lg:pb-6">
			<section className="text-center space-y-4">
				<div className="flex items-center justify-center gap-3 mb-4">
					<div className="space-y-1">
						<h1 className="text-3xl lg:text-4xl font-bold text-foreground">Soy Miembro de Mesa</h1>
					</div>
				</div>
        
				<div className="max-w-4xl mx-auto space-y-4">
					<p className="text-lg text-muted-foreground leading-relaxed">
            Ser Miembro de Mesa (Presidente, Secretario o Tercer Miembro) es el deber cívico más importante
            durante una jornada electoral. Eres la máxima autoridad en tu mesa de votación y el garante
            de la transparencia del proceso.
					</p>
          
					<div className="flex justify-center">
						<Card className="bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:shadow-md w-full max-w-4xl">
							<CardContent className="p-3">
								<div className="text-center">
									<h3 className="font-semibold text-foreground mb-1 text-base transition-colors duration-300">
                    Guía de Referencia Informativa
									</h3>
									<p className="text-xs text-muted-foreground leading-snug">
                    Aquí te detallamos tu rol, tus responsabilidades y el paso a paso de toda la jornada. Este contenido es una guía de referencia informativa completa para tu capacitación.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			<section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<Card
					className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
					onClick={() => scrollToSection('roles-section')}
				>
					<CardContent className="p-4 text-center">
						<div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-300 group-hover:bg-primary/10">
							<Users className="w-4 h-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
						</div>
						<div className="text-2xl font-bold text-foreground transition-colors duration-300">3</div>
						<div className="text-xs text-muted-foreground">Roles Clave</div>
					</CardContent>
				</Card>
        
				<Card
					className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
					onClick={() => scrollToSection('phases-section')}
				>
					<CardContent className="p-4 text-center">
						<div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-300 group-hover:bg-primary/10">
							<Clock className="w-4 h-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
						</div>
						<div className="text-2xl font-bold text-foreground transition-colors duration-300">3</div>
						<div className="text-xs text-muted-foreground">Fases del Día</div>
					</CardContent>
				</Card>
        
				<Card
					className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
					onClick={() => scrollToSection('phases-section')}
				>
					<CardContent className="p-4 text-center">
						<div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-300 group-hover:bg-primary/10">
							<Shield className="w-4 h-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
						</div>
						<div className="text-2xl font-bold text-foreground transition-colors duration-300">8</div>
						<div className="text-xs text-muted-foreground">Horas de Servicio</div>
					</CardContent>
				</Card>
        
				<Card
					className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
					onClick={() => scrollToSection('faq-section')}
				>
					<CardContent className="p-4 text-center">
						<div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-300 group-hover:bg-primary/10">
							<BookOpen className="w-4 h-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
						</div>
						<div className="text-2xl font-bold text-foreground transition-colors duration-300">9</div>
						<div className="text-xs text-muted-foreground">FAQ Esenciales</div>
					</CardContent>
				</Card>
			</section>

			<Separator />

			<div id="roles-section">
				<RolesSection />
			</div>

			<Separator />

			<div id="phases-section">
				<PhasesSection />
			</div>

			<Separator />

			<div id="faq-section">
				<FAQSection />
			</div>

			<section className="mt-8 flex justify-center">
				<Card className="bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:shadow-md w-full max-w-4xl">
					<CardContent className="p-3">
						<div className="text-center">
							<h3 className="font-semibold text-foreground text-base mb-1 transition-colors duration-300">
                Recuerda: Tu Responsabilidad es Fundamental
							</h3>
							<p className="text-xs text-muted-foreground leading-snug">
                Como miembro de mesa, eres un guardián de la democracia. Tu trabajo garantiza que cada voto sea contado correctamente y que el proceso electoral sea transparente y confiable. Gracias por tu servicio cívico.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}