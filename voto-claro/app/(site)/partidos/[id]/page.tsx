'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Users, MapPin, Calendar, Globe, User, Award, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Partido {
  id: number;
  nombre: string;
  logo: string;
  descripcion: string;
  fundacion: string;
  ideologia: string;
  lider: string;
  miembros: string;
  sede: string;
  candidatos: {
    presidenciales: Candidato[];
    congresales: Candidato[];
  };
}

interface Candidato {
  nombre: string;
  foto?: string;
  descripcion?: string;
  region?: string;
}

export default function PartidoDetailPage() {
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const from = searchParams.get('from');
  
	const [partido, setPartido] = useState<Partido | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				// Load partido data with candidates
				const partidoResponse = await fetch('/partidos.json');
				const partidoData = await partidoResponse.json();
				const foundPartido = partidoData.partidos.find((p: Partido) => p.id === parseInt(params.id as string));
				setPartido(foundPartido);
			} catch (error) {
				console.error('Error loading data:', error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			loadData();
		}
	}, [params.id]);

	const handleBack = () => {
		if (from === 'partidos') {
			router.push('/partidos');
		} else {
			router.back();
		}
	};

	const getIdeologiaColor = (ideologia: string) => {
		switch (ideologia.toLowerCase()) {
			case 'izquierda':
				return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
			case 'centro':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
			case 'centro-izquierda':
				return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
			case 'centro-derecha':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
			case 'derecha':
				return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
		}
	};

	const getCargoColor = (tipo: string) => {
		switch (tipo.toLowerCase()) {
			case 'presidenciales':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
			case 'congresales':
				return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
		}
	};

	// Calculate total candidates
	const totalCandidatos = partido ?
		(partido.candidatos?.presidenciales?.length || 0) +
    (partido.candidatos?.congresales?.length || 0) : 0;

	if (loading) {
		return (
			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="text-center py-16">
					<p className="text-muted-foreground">Cargando información del partido...</p>
				</div>
			</main>
		);
	}

	if (!partido) {
		return (
			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="text-center py-16">
					<p className="text-muted-foreground">Partido no encontrado</p>
					<Button onClick={handleBack} className="mt-4">
						<ArrowLeft className="w-4 h-4 mr-2" />
            Volver
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
			{/* Header with back button */}
			<div className="mb-6">
				<Button
					variant="ghost"
					onClick={handleBack}
					className="mb-4 hover:bg-muted"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
          Volver
				</Button>
			</div>

			{/* Partido Header */}
			<Card className="mb-8">
				<CardContent className="p-6">
					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex-shrink-0">
							{partido.logo ? (
								<img
									src={partido.logo}
									alt={`Logo ${partido.nombre}`}
									className="w-24 h-24 object-contain rounded-lg bg-white p-3"
								/>
							) : (
								<div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
								</div>
							)}
						</div>

						<div className="flex-1">
							<div className="flex flex-wrap items-start gap-3 mb-4">
								<h1 className="text-2xl lg:text-3xl font-bold text-foreground">{partido.nombre}</h1>
								<Badge variant="secondary" className={getIdeologiaColor(partido.ideologia)}>
									{partido.ideologia}
								</Badge>
							</div>

							<p className="text-muted-foreground mb-4">{partido.descripcion}</p>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<span>Fundado en {partido.fundacion}</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="w-4 h-4 text-muted-foreground" />
									<span>{parseInt(partido.miembros).toLocaleString()} miembros</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4 text-muted-foreground" />
									<span>{partido.sede}</span>
								</div>
								<div className="flex items-center gap-2">
									<User className="w-4 h-4 text-muted-foreground" />
									<span>Líder: {partido.lider}</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Tabs for different sections */}
			<Tabs defaultValue="candidatos" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="candidatos">Candidatos ({totalCandidatos})</TabsTrigger>
					<TabsTrigger value="informacion">Información del Partido</TabsTrigger>
				</TabsList>

				<TabsContent value="candidatos" className="space-y-6">
					<div className="text-center mb-6">
						<p className="text-muted-foreground">
							{totalCandidatos === 0
								? 'No hay candidatos registrados para este partido'
								: `${totalCandidatos} candidato(s) postulado(s) por este partido`
							}
						</p>
					</div>

					{totalCandidatos === 0 ? (
						<Card>
							<CardContent className="p-8 text-center">
								<Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
								<p className="text-muted-foreground">
                  Este partido aún no tiene candidatos registrados en nuestra base de datos.
								</p>
							</CardContent>
						</Card>
					) : (
						<div className="space-y-8">
							{/* Candidatos Presidenciales */}
							{partido.candidatos?.presidenciales && partido.candidatos.presidenciales.length > 0 && (
								<div>
									<div className="flex items-center gap-2 mb-4">
										<h3 className="text-lg font-semibold">Candidatos Presidenciales</h3>
										<Badge variant="secondary" className={getCargoColor('presidenciales')}>
											{partido.candidatos.presidenciales.length}
										</Badge>
									</div>
                  
									<div className="grid gap-4 md:grid-cols-2">
										{partido.candidatos.presidenciales.map((candidato, index) => (
											<Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
												<CardContent className="p-6">
													<div className="flex items-start gap-4">
														<div className="flex-shrink-0">
															{candidato.foto ? (
																<img
																	src={candidato.foto}
																	alt={candidato.nombre}
																	className="w-16 h-16 object-cover rounded-full"
																/>
															) : (
																<div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
																	<User className="w-6 h-6 text-primary" />
																</div>
															)}
														</div>

														<div className="flex-1 min-w-0">
															<h4 className="font-bold text-foreground text-lg mb-2">
																{candidato.nombre}
															</h4>
															<Badge variant="secondary" className={getCargoColor('presidenciales')}>
                                Candidato Presidencial
															</Badge>
                              
															{candidato.descripcion && (
																<p className="text-sm text-muted-foreground mt-2">
																	{candidato.descripcion}
																</p>
															)}
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
							)}

							{/* Candidatos al Congreso */}
							{partido.candidatos?.congresales && partido.candidatos.congresales.length > 0 && (
								<div>
									<div className="flex items-center gap-2 mb-4">
										<h3 className="text-lg font-semibold">Candidatos al Congreso</h3>
										<Badge variant="secondary" className={getCargoColor('congresales')}>
											{partido.candidatos.congresales.length}
										</Badge>
									</div>
                  
									<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
										{partido.candidatos.congresales.map((candidato, index) => (
											<Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
												<CardContent className="p-4">
													<div className="flex items-start gap-3">
														<div className="flex-shrink-0">
															{candidato.foto ? (
																<img
																	src={candidato.foto}
																	alt={candidato.nombre}
																	className="w-12 h-12 object-cover rounded-full"
																/>
															) : (
																<div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
																	<User className="w-5 h-5 text-primary" />
																</div>
															)}
														</div>

														<div className="flex-1 min-w-0">
															<h4 className="font-semibold text-foreground mb-1">
																{candidato.nombre}
															</h4>
                              
															{candidato.region && (
																<div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
																	<MapPin className="w-3 h-3" />
																	<span>{candidato.region}</span>
																</div>
															)}
                              
                              <Badge variant="outline">
                                Congresista
															</Badge>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</TabsContent>

				<TabsContent value="informacion" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Información Detallada</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h4 className="font-semibold mb-2">Historia</h4>
								<p className="text-muted-foreground">
									{partido.descripcion}
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2">Datos Básicos</h4>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Fundación:</span>
											<span>{partido.fundacion}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Sede:</span>
											<span>{partido.sede}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Miembros:</span>
											<span>{parseInt(partido.miembros).toLocaleString()}</span>
										</div>
									</div>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Colores Oficiales</h4>
									<div className="flex gap-2">
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}