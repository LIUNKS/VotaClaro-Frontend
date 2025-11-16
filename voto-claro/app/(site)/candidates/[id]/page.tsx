'use client';

import React, { useState, use, useRef, useEffect } from 'react';
import { ArrowLeft, Share2, MapPin, GraduationCap, Briefcase, Calendar, AlertTriangle, DollarSign, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useCandidates } from '@/core/modules/candidates/hooks/useCandidates';

interface CandidateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CandidateDetailPage({ params }: CandidateDetailPageProps) {
	const router = useRouter();
	const resolvedParams = use(params);
	const candidateId = resolvedParams.id;
  
	// Usar el hook para obtener los candidatos
	const { getCandidateById, loading } = useCandidates();
	const [selectedSection, setSelectedSection] = useState<'biografia' | 'plan' | 'propuestas' | 'antecedentes' | 'patrimonial'>('biografia');
  
	// Ref para el contenedor de tabs
	const tabsContainerRef = useRef<HTMLDivElement>(null);
  
	// Obtener el candidato por ID
	const candidate = getCandidateById(candidateId);

	// Función para hacer scroll a la tab activa
	const scrollToActiveTab = (tabName: string) => {
		if (!tabsContainerRef.current) return;
    
		const container = tabsContainerRef.current;
		const activeButton = container.querySelector(`button[data-tab="${tabName}"]`) as HTMLElement;
    
		if (activeButton) {
			const containerRect = container.getBoundingClientRect();
			const buttonRect = activeButton.getBoundingClientRect();
      
			const scrollLeft = container.scrollLeft + buttonRect.left - containerRect.left -
                        (containerRect.width / 2) + (buttonRect.width / 2);
      
			container.scrollTo({
				left: scrollLeft,
				behavior: 'smooth'
			});
		}
	};

	// Función para manejar el cambio de sección
	const handleSectionChange = (section: typeof selectedSection) => {
		setSelectedSection(section);
		scrollToActiveTab(section);
	};

	// Scroll a la tab activa cuando cambie
	useEffect(() => {
		scrollToActiveTab(selectedSection);
	}, [selectedSection]);

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
					<p className="text-muted-foreground">Cargando información del candidato...</p>
				</div>
			</div>
		);
	}

	if (!candidate) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-foreground mb-2">Candidato no encontrado</h1>
					<p className="text-muted-foreground mb-4">El candidato que buscas no existe.</p>
					<Button onClick={() => router.back()}>
            Volver
					</Button>
				</div>
			</div>
		);
	}

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: `Perfil de ${candidate.nombre_completo}`,
					text: `Conoce más sobre ${candidate.nombre_completo}`,
					url: window.location.href,
				});
			} catch (error) {
				console.log('Error sharing:', error);
			}
		} else {
			navigator.clipboard.writeText(window.location.href);
		}
	};

	const handleBackClick = () => {
		router.back();
	};

	return (
		<>
			{/* Header */}
			<header className="bg-card border-b border-border px-4 lg:px-8 py-4 sticky top-0">
				<div className="max-w-md lg:max-w-4xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="icon"
							onClick={handleBackClick}
							className="shrink-0"
						>
							<ArrowLeft className="w-5 h-5" />
						</Button>
						<h1 className="font-semibold text-foreground text-base lg:text-lg">
              Perfil del Candidato
						</h1>
					</div>
          
					<Button
						variant="ghost"
						size="icon"
						onClick={handleShare}
					>
						<Share2 className="w-5 h-5" />
					</Button>
				</div>
			</header>

			<main className="max-w-md lg:max-w-4xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				{/* Candidate Profile Header */}
				<Card className="mb-6">
					<CardContent className="p-6">
						<div className="text-center">
							<div className="relative w-24 h-24 mx-auto mb-4">
								<img
									src="/placeholder-avatar.jpg"
									alt={candidate.nombre_completo}
									className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
									onError={(e) => {
										e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="48" cy="48" r="48" fill="#E5E7EB"/>
                        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle" dy=".3em">Foto</text>
                      </svg>
                    `)}`;
									}}
								/>
							</div>
              
							<h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
								{candidate.nombre_completo}
							</h2>
              
							<p className="text-muted-foreground mb-3">
								{candidate.datos_personales.lugar_nacimiento.departamento}, {candidate.datos_personales.lugar_nacimiento.provincia}
							</p>
              
							<Badge variant="secondary" className="mb-2">
                Candidato Presidencial
							</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Navigation Tabs */}
				<div className="bg-muted rounded-lg p-1 mb-6">
					<div
						ref={tabsContainerRef}
						className="flex gap-1 overflow-x-auto"
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
							WebkitOverflowScrolling: 'touch'
						}}
					>
						<button
							data-tab="biografia"
							onClick={() => handleSectionChange('biografia')}
							className={`py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
								selectedSection === 'biografia'
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							}`}
						>
              Hoja de Vida
						</button>
						<button
							data-tab="antecedentes"
							onClick={() => handleSectionChange('antecedentes')}
							className={`py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
								selectedSection === 'antecedentes'
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							}`}
						>
              Antecedentes
						</button>
						<button
							data-tab="patrimonial"
							onClick={() => handleSectionChange('patrimonial')}
							className={`py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
								selectedSection === 'patrimonial'
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							}`}
						>
              Patrimonial
						</button>
					</div>
				</div>

				{/* Content Sections */}
				{selectedSection === 'biografia' && (
					<div className="space-y-6">
						{/* Datos Personales */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Calendar className="w-5 h-5" />
                  Datos Personales
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">DNI</span>
									<span className="font-medium">{candidate.dni}</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">Fecha de Nacimiento</span>
									<span className="font-medium">{candidate.datos_personales.fecha_nacimiento}</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">Sexo</span>
									<span className="font-medium">{candidate.datos_personales.sexo === 'M' ? 'Masculino' : 'Femenino'}</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">Educación</span>
									<span className="font-medium">{candidate.datos_personales.educacion}</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground flex items-center gap-2">
										<MapPin className="w-4 h-4" />
                    Lugar de Nacimiento
									</span>
									<span className="font-medium text-right">
										{candidate.datos_personales.lugar_nacimiento.distrito}, {candidate.datos_personales.lugar_nacimiento.provincia}, {candidate.datos_personales.lugar_nacimiento.departamento}
									</span>
								</div>
								<div className="flex justify-between items-center py-2">
									<span className="text-muted-foreground">Domicilio</span>
									<span className="font-medium text-right">{candidate.datos_personales.domicilio}</span>
								</div>
							</CardContent>
						</Card>

						{/* Formación Académica */}
						{candidate.formacion_academica && candidate.formacion_academica.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<GraduationCap className="w-5 h-5" />
                    Formación Académica
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{candidate.formacion_academica.map((edu, index) => (
										<div key={index} className="space-y-2 border-b border-border pb-4 last:border-b-0 last:pb-0">
											<div className="font-medium text-foreground">{edu.grado} en {edu.carrera}</div>
											<div className="text-sm text-muted-foreground">{edu.institucion}</div>
											<div className="text-xs text-muted-foreground">Año de finalización: {edu.anio_fin}</div>
										</div>
									))}
								</CardContent>
							</Card>
						)}

						{/* Experiencia Laboral */}
						{candidate.experiencia_laboral && candidate.experiencia_laboral.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<Briefcase className="w-5 h-5" />
                    Experiencia Laboral
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									{candidate.experiencia_laboral.map((exp, index) => (
										<div key={index} className="space-y-2 border-b border-border pb-4 last:border-b-0 last:pb-0">
											<div className="flex justify-between items-start">
												<span className="text-sm text-muted-foreground">
													{exp.desde} - {exp.hasta || 'Presente'}
												</span>
											</div>
											<div className="font-medium text-foreground">{exp.cargo}</div>
											<div className="text-sm text-muted-foreground">{exp.organizacion}</div>
										</div>
									))}
								</CardContent>
							</Card>
						)}

						{/* Local de Votación */}
						{candidate.local_votacion && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<MapPin className="w-5 h-5" />
                    Local de Votación
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex justify-between items-center py-2 border-b border-border">
										<span className="text-muted-foreground">Local</span>
										<span className="font-medium">{candidate.local_votacion.schoolName}</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-border">
										<span className="text-muted-foreground">Dirección</span>
										<span className="font-medium text-right">{candidate.local_votacion.address}</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-border">
										<span className="text-muted-foreground">Mesa</span>
										<span className="font-medium">{candidate.local_votacion.tableNumber}</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-muted-foreground">Horario</span>
										<span className="font-medium">{candidate.local_votacion.hours}</span>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Fuente */}
						<div className="text-center text-xs text-muted-foreground">
							<p>Fuente: Jurado Nacional de Elecciones (JNE). Información pública oficial.</p>
						</div>
					</div>
				)}

				{selectedSection === 'antecedentes' && (
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<AlertTriangle className="w-5 h-5" />
                  Antecedentes Judiciales
								</CardTitle>
							</CardHeader>
							<CardContent>
								{candidate.antecedentes.lista_sentencias.length > 0 ? (
									<div className="space-y-4">
										{candidate.antecedentes.lista_sentencias.map((sentencia, index) => (
											<div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
												<div className="flex items-start gap-3">
													<AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
													<div className="space-y-2 flex-1">
														<div className="font-medium text-red-600 dark:text-red-100">
															{sentencia.caratula}
														</div>
														<div className="text-sm space-y-1">
															<div className="flex justify-between">
																<span className="text-foreground">Tipo:</span>
																<span className="text-foreground">{sentencia.tipo}</span>
															</div>
															<div className="flex justify-between">
																<span className="text-foreground">Expediente:</span>
																<span className="text-foreground">{sentencia.expediente}</span>
															</div>
															<div className="flex justify-between">
																<span className="text-foreground">Órgano:</span>
																<span className="text-foreground">{sentencia.organo_judicial}</span>
															</div>
															<div className="flex justify-between">
																<span className="text-foreground">Situación:</span>
																<span className="text-foreground">{sentencia.situacion}</span>
															</div>
															<div className="flex justify-between">
																<span className="text-foreground">Fecha:</span>
																<span className="text-foreground">{sentencia.fecha}</span>
															</div>
															{sentencia.fallo && (
																<div className="flex justify-between">
																	<span className="text-foreground">Fallo:</span>
																	<span className="text-foreground">{sentencia.fallo}</span>
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-8">
										<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
											<Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
										</div>
										<p className="text-foreground font-medium">Sin antecedentes judiciales</p>
										<p className="text-muted-foreground text-sm">No se registran sentencias o procesos judiciales</p>
									</div>
								)}

								{/* Fuente */}
								<div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
									<p>Fuente: Registro Nacional de Condenas (RNC) - Poder Judicial del Perú</p>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{selectedSection === 'patrimonial' && (
					<div className="space-y-6">
						{/* Ingresos */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<DollarSign className="w-5 h-5" />
                  Declaración de Ingresos
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">Total de Ingresos</span>
									<span className="font-medium text-green-600 dark:text-green-400">S/ {candidate.ingresos.total.toLocaleString()}</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-border">
									<span className="text-muted-foreground">Ingresos Públicos</span>
									<span className="font-medium">S/ {candidate.ingresos.publico.toLocaleString()}</span>
								</div>
								<div className="flex justify-between items-center py-2">
									<span className="text-muted-foreground">Ingresos Privados</span>
									<span className="font-medium">S/ {candidate.ingresos.privado.toLocaleString()}</span>
								</div>
							</CardContent>
						</Card>

						{/* Bienes */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Car className="w-5 h-5" />
                  Declaración de Bienes
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="mb-4">
									<div className="flex justify-between items-center py-2 border-b border-border">
										<span className="text-muted-foreground">Valor Total de Bienes</span>
										<span className="font-medium text-green-600 dark:text-green-400">S/ {candidate.bienes.valor_total.toLocaleString()}</span>
									</div>
								</div>

								{/* Inmuebles */}
								{candidate.bienes.inmuebles && candidate.bienes.inmuebles.length > 0 && (
									<div className="space-y-4 mb-6">
										<h4 className="font-medium">Inmuebles:</h4>
										{candidate.bienes.inmuebles.map((inmueble, index) => (
											<div key={index} className="p-3 bg-muted/50 rounded-lg">
												<div className="flex justify-between items-start mb-2">
													<span className="font-medium">{inmueble.tipo || 'Inmueble'}</span>
													<span className="text-sm font-medium">S/ {inmueble.valor.toLocaleString()}</span>
												</div>
												<div className="text-sm text-muted-foreground space-y-1">
													<div>Dirección: {inmueble.direccion}</div>
													{inmueble.caracteristica && <div>Característica: {inmueble.caracteristica}</div>}
													{inmueble.comentario && (
														<div className="text-red-400 dark:text-red-400 text-xs mt-2 p-2 bg-muted/50 rounded">
															{inmueble.comentario}
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								)}

								{/* Vehículos */}
								{candidate.bienes.vehiculos && candidate.bienes.vehiculos.length > 0 && (
									<div className="space-y-4 mb-6">
										<h4 className="font-medium">Vehículos:</h4>
										{candidate.bienes.vehiculos.map((vehiculo, index) => (
											<div key={index} className="p-3 bg-muted/50 rounded-lg">
												<div className="flex justify-between items-start mb-2">
													<span className="font-medium">{vehiculo.modelo}</span>
													<span className="text-sm font-medium">S/ {vehiculo.valor.toLocaleString()}</span>
												</div>
												<div className="text-sm text-muted-foreground space-y-1">
													<div>Placa: {vehiculo.placa}</div>
													{vehiculo.anio && <div>Año: {vehiculo.anio}</div>}
													{vehiculo.caracteristica && <div>Característica: {vehiculo.caracteristica}</div>}
													{vehiculo.comentario && (
														<div className="text-red-400 dark:text-red-400 text-xs mt-2 p-2 bg-muted/50 rounded">
															{vehiculo.comentario}
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								)}

								{/* Acciones */}
								{candidate.bienes.acciones && candidate.bienes.acciones.length > 0 && (
									<div className="space-y-4 mb-6">
										<h4 className="font-medium">Acciones:</h4>
										{candidate.bienes.acciones.map((accion, index) => (
											<div key={index} className="p-3 bg-muted/50 rounded-lg">
												<div className="flex justify-between items-start mb-2">
													<span className="font-medium">{accion.persona_juridica}</span>
													<span className="text-sm font-medium">S/ {accion.valor.toLocaleString()}</span>
												</div>
												<div className="text-sm text-muted-foreground space-y-1">
													<div>Tipo: {accion.tipo}</div>
													<div>Cantidad: {accion.cantidad}</div>
													{accion.comentario && <div>Comentario: {accion.comentario}</div>}
												</div>
											</div>
										))}
									</div>
								)}

								{/* Fuente */}
								<div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
									<p>Fuente: Declaración Jurada de Bienes y Rentas - JNE</p>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</main>
		</>
	);
}