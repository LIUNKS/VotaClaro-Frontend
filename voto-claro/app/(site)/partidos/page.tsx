'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { useRouter } from 'next/navigation';

// Type for partido data
interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logo: string;
  descripcion: string;
  fundacion: string;
  ideologia: string;
  lider: string;
  miembros: string;
  sitioWeb: string;
  sede: string;
  colores: string[];
}

export default function PartidosPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [partidos, setPartidos] = useState<Partido[]>([]);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 6;

	// Load data from JSON file
	useEffect(() => {
		const loadPartidos = async () => {
			try {
				const response = await fetch('/partidos.json');
				const data = await response.json();
				setPartidos(data.partidos);
			} catch (error) {
				console.error('Error loading partidos:', error);
			} finally {
				setLoading(false);
			}
		};

		loadPartidos();
	}, []);

	const handleSearchChange = useCallback(() => {
		setCurrentPage(1);
	}, []);

	// Filter partidos based on search term
	const filteredPartidos = partidos.filter(partido =>
		partido.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partido.siglas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partido.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partido.ideologia.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}, 100);
	};

	const totalPages = Math.ceil(filteredPartidos.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentPartidos = filteredPartidos.slice(startIndex, endIndex);

	const handlePartidoClick = (id: number) => {
		router.push(`/partidos/${id}?from=partidos`);
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

	if (loading) {
		return (
			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="text-center py-16">
					<p className="text-muted-foreground">Cargando partidos...</p>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
			{/* Title Section */}
			<div className="mb-6">
				<h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Partidos Políticos</h1>
          
				{/* Search Bar */}
				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Buscar partidos..."
				/>
			</div>

			{/* Results Info */}
			<div className="flex justify-between items-center mb-6">
				<p className="text-sm text-muted-foreground">
					{searchTerm
						? `${filteredPartidos.length} resultado(s) para "${searchTerm}"`
						: `${filteredPartidos.length} partidos disponibles`
					}
				</p>
          
				{totalPages > 1 && (
					<p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
					</p>
				)}
			</div>

			{/* Partidos Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{currentPartidos.length === 0 ? (
					<div className="col-span-full text-center py-16">
						<p className="text-muted-foreground">
							{searchTerm ? 'No se encontraron partidos con ese término' : 'No hay partidos disponibles'}
						</p>
					</div>
				) : (
					currentPartidos.map((partido) => (
						<Card
							key={partido.id}
							className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
							onClick={() => handlePartidoClick(partido.id)}
						>
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="flex-shrink-0">
										{partido.logo ? (
											<img
												src={partido.logo}
												alt={`Logo ${partido.nombre}`}
												className="w-16 h-16 object-contain rounded-lg bg-white p-2"
												onError={(e) => {
													e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100%" height="100%" fill="#E5E7EB"/>
                              <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="8" fill="#9CA3AF" text-anchor="middle" dy=".3em">${partido.siglas}</text>
                            </svg>
                          `)}`;
												}}
											/>
										) : (
											<div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
												<span className="text-sm font-bold text-primary">{partido.siglas}</span>
											</div>
										)}
									</div>
                  
									<div className="flex-1 min-w-0">
										<h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
											{partido.nombre}
										</h3>
										<p className="text-sm text-muted-foreground">{partido.siglas}</p>
									</div>
								</div>

								<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
									{partido.descripcion}
								</p>

								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Badge variant="secondary" className={getIdeologiaColor(partido.ideologia)}>
											{partido.ideologia}
										</Badge>
										<div className="flex items-center gap-1 text-xs text-muted-foreground">
											<Calendar className="w-3 h-3" />
											<span>Fund. {partido.fundacion}</span>
										</div>
									</div>

									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-1 text-muted-foreground">
											<Users className="w-4 h-4" />
											<span>{parseInt(partido.miembros).toLocaleString()} miembros</span>
										</div>
										<div className="flex items-center gap-1 text-muted-foreground">
											<MapPin className="w-4 h-4" />
											<span>{partido.sede}</span>
										</div>
									</div>

									<div className="pt-2 border-t border-border">
										<p className="text-xs text-muted-foreground mb-1">Líder actual:</p>
										<p className="text-sm font-medium text-foreground">{partido.lider}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-8">
					<Button
						variant="outline"
						onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
						disabled={currentPage === 1}
						className="flex items-center gap-2"
					>
						<ChevronLeft className="w-4 h-4" />
            Anterior
					</Button>

					<div className="flex items-center gap-2">
						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							let pageNumber;
							if (totalPages <= 5) {
								pageNumber = i + 1;
							} else if (currentPage <= 3) {
								pageNumber = i + 1;
							} else if (currentPage >= totalPages - 2) {
								pageNumber = totalPages - 4 + i;
							} else {
								pageNumber = currentPage - 2 + i;
							}

							return (
								<Button
									key={pageNumber}
									variant={pageNumber === currentPage ? 'default' : 'outline'}
									size="sm"
									onClick={() => handlePageChange(pageNumber)}
									className="w-10 h-10"
								>
									{pageNumber}
								</Button>
							);
						})}
					</div>

					<Button
						variant="outline"
						onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
						disabled={currentPage === totalPages}
						className="flex items-center gap-2"
					>
            Siguiente
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			)}

			{searchTerm && (
				<div className="text-center py-4">
					<p className="text-sm text-muted-foreground">
            Mostrando {filteredPartidos.length} resultado(s) para "{searchTerm}"
					</p>
				</div>
			)}
		</main>
	);
}