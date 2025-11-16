'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  responsibilities: string[];
}

function RoleCard({ title, description, responsibilities }: RoleCardProps) {
	return (
		<Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
			<CardHeader className="pb-3">
				<div className="flex items-center gap-2">
					<div className="transition-all duration-300 hover:bg-primary/10 p-1 rounded">
						<Users className="w-5 h-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />
					</div>
					<CardTitle className="text-lg font-semibold transition-colors duration-300 hover:text-primary">{title}</CardTitle>
				</div>
				<p className="text-sm text-muted-foreground transition-colors duration-300">{description}</p>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-2">
					<h4 className="text-sm font-medium text-foreground transition-colors duration-300">Responsabilidades principales:</h4>
					<ul className="space-y-1">
						{responsibilities.map((responsibility, index) => (
							<li key={index} className="text-sm text-muted-foreground flex items-start gap-2 transition-colors duration-300 hover:text-foreground">
								<span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0 transition-colors duration-300"></span>
								<span>{responsibility}</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}

export function RolesSection() {
	const roles = [
		{
			title: 'Presidente',
			description: 'Máxima autoridad de la mesa. Dirige y modera el proceso electoral.',
			responsibilities: [
				'Dirige y modera el proceso electoral',
				'Firma las cédulas de votación',
				'Firma las actas oficiales',
				'Responsable de la instalación y cierre',
				'Anuncia el inicio y fin de votación'
			]
		},
		{
			title: 'Secretario',
			description: 'Encargado de llenar todos los documentos electorales oficiales.',
			responsibilities: [
				'Llena las Actas de Instalación, Sufragio y Escrutinio',
				'Registra meticulosamente cada voto',
				'Mantiene la precisión en documentos',
				'Lleva el control de votantes',
				'Registra incidencias en actas'
			]
		},
		{
			title: 'Tercer Miembro (Vocal)',
			description: 'Apoya en las tareas de verificación y control del proceso.',
			responsibilities: [
				'Maneja la lista de electores (padrón)',
				'Verifica identidad de votantes',
				'Solicita firma y huella digital',
				'Entrega hologramas (stickers)',
				'Apoya en verificaciones generales'
			]
		}
	];

	return (
		<section className="space-y-4">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-foreground">Los Roles Clave en la Mesa</h2>
				<p className="text-muted-foreground max-w-3xl mx-auto">
          La mesa de sufragio está compuesta por tres miembros titulares, cada uno con responsabilidades específicas
          para garantizar un proceso electoral transparente y ordenado.
				</p>
			</div>
      
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{roles.map((role, index) => (
					<RoleCard
						key={index}
						title={role.title}
						description={role.description}
						responsibilities={role.responsibilities}
					/>
				))}
			</div>
		</section>
	);
}