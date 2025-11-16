'use client';

import React, { useState } from 'react';
import { Bell, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Footer } from '@/components/ui/Footer';
import { ModeToggle } from '@/components/toogle-dark-mode';
import { SearchBar } from '@/components/ui/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch, useScrollRestore } from '@/hooks';
import { useCandidatesApi } from '@/hooks/useCandidates';

const tabs = [
	{ id: 'presidenciales', label: 'Presidenciales', active: true },
	{ id: 'congresales', label: 'Congresales', active: false },
	{ id: 'senadores', label: 'Senadores', active: false },
	{ id: 'andino', label: 'P. Andino', active: false }
];

export default function CandidatesPage() {
	const { saveScrollPosition } = useScrollRestore({ key: 'candidates-page' });
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('presidenciales');

	// Hook para obtener candidatos de la API
	const {
		candidates: apiCandidates,
		loading: apiLoading,
		error: apiError,
		refetch,
		lastUpdated
	} = useCandidatesApi();

	// Adaptar los datos de la API al formato local
	const adaptedCandidates = apiCandidates.map(candidate => ({
		id: parseInt(candidate.id),
		name: candidate.nombre_completo,
		party: `${candidate.datos_personales.lugar_nacimiento.departamento}, ${candidate.datos_personales.lugar_nacimiento.provincia}`,
		image: '/placeholder-avatar.jpg',
		dni: candidate.dni,
		sexo: candidate.datos_personales.sexo,
		educacion: candidate.datos_personales.educacion,
		antecedentes: candidate.antecedentes.total,
		ingresos: candidate.ingresos.total
	}));

	// Hook de búsqueda
	const {
		searchTerm,
		setSearchTerm,
		filteredData: filteredCandidates,
		resultsCount
	} = useSearch({
		data: adaptedCandidates,
		searchFields: ['name', 'party', 'dni']
	});

	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId);
		setSearchTerm('');
	};

	const handleCandidateClick = (candidateId: number) => {
		saveScrollPosition();
		router.push(`/candidates/${candidateId}?from=candidates`);
	};

	const handleRefresh = async () => {
		await refetch();
	};

	// Loading state
	if (apiLoading) {
		return (
			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="mb-6">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Candidatos</h1>
				</div>
                
				{/* Loading Skeleton */}
				<div className="space-y-3">
					{[...Array(6)].map((_, i) => (
						<Card key={i} className="p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
									<div>
										<div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
										<div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
									</div>
								</div>
								<div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</Card>
					))}
				</div>
			</main>
		);
	}

	// Error state
	if (apiError) {
		return (
			<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="mb-6">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Candidatos</h1>
				</div>
                
				<Card className="p-6 text-center">
					<div className="mb-4">
						<p className="text-red-600 font-medium mb-2">Error al cargar candidatos</p>
						<p className="text-sm text-muted-foreground">{apiError}</p>
					</div>
					<Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
						<RefreshCw className="h-4 w-4" />
                        Reintentar
					</Button>
				</Card>
			</main>
		);
	}

	return (
		<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
			{/* Header Section */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">Candidatos</h1>
					<Button
						onClick={handleRefresh}
						variant="ghost"
						size="sm"
						className="flex items-center gap-2"
					>
						<RefreshCw className="h-4 w-4" />
                        Actualizar
					</Button>
				</div>
          
				{/* Search Bar Component */}
				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Buscar candidato, DNI o ubicación"
				/>

				{/* Last Updated Info */}
				{lastUpdated && (
					<p className="text-xs text-muted-foreground mt-2">
                        Última actualización: {new Date(lastUpdated).toLocaleString('es-PE')}
					</p>
				)}
			</div>

			{/* Tabs */}
			<div className="mb-6">
				<div className="flex space-x-6 border-b border-border">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => handleTabChange(tab.id)}
							className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
								activeTab === tab.id
									? 'text-primary border-primary'
									: 'text-muted-foreground border-transparent hover:text-foreground'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* Results Info */}
			<div className="mb-6">
				<p className="text-sm text-muted-foreground">
					{searchTerm
						? `${resultsCount} candidato(s) encontrado(s) para '${searchTerm}'`
						: `${resultsCount} candidatos disponibles`
					}
				</p>
			</div>

			{/* Candidates List */}
			<div className="space-y-3">
				{filteredCandidates.map((candidate) => (
					<Card
						key={candidate.id}
						className="p-4 hover:shadow-md transition-shadow cursor-pointer"
						onClick={() => handleCandidateClick(candidate.id)}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<Avatar className="h-12 w-12">
									<img
										src={candidate.image}
										alt={candidate.name}
										className="h-full w-full object-cover"
										onError={(e) => {
											e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#E5E7EB"/>
                            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle" dy=".3em">Foto</text>
                          </svg>
                        `)}`;
										}}
									/>
								</Avatar>
								<div className="flex-1">
									<h3 className="font-semibold text-foreground">{candidate.name}</h3>
									<p className="text-sm text-muted-foreground">{candidate.party}</p>
									<div className="flex gap-2 mt-1">
										<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            DNI: {candidate.dni}
										</span>
										{candidate.antecedentes > 0 && (
											<span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
												{candidate.antecedentes} antecedente(s)
											</span>
										)}
									</div>
								</div>
							</div>
							<div className="flex flex-col items-end space-y-1">
								<ChevronRight className="h-5 w-5 text-muted-foreground" />
								<div className="text-xs text-muted-foreground text-right">
									<div>{candidate.sexo}</div>
									<div>{candidate.educacion}</div>
								</div>
							</div>
						</div>
					</Card>
				))}

				{filteredCandidates.length === 0 && !apiLoading && (
					<div className="flex flex-col items-center justify-center py-12">
						<p className="text-muted-foreground">
							{searchTerm ? 'No se encontraron candidatos con ese término' : 'No hay candidatos disponibles'}
						</p>
						{searchTerm && (
							<Button
								variant="ghost"
								onClick={() => setSearchTerm('')}
								className="mt-2"
							>
                                Limpiar búsqueda
							</Button>
						)}
					</div>
				)}
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation />
		</main>
	);
}