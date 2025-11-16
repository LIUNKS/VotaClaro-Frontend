'use client';

import React, { useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Footer } from '@/components/ui/Footer';
import { ModeToggle } from '@/components/toogle-dark-mode';
import { SearchBar } from '@/components/ui/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { candidatesData, type Candidate } from '@/lib/candidates-data';
import { useSearch, useScrollRestore } from '@/hooks';

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

	// Hook de búsqueda
	const {
		searchTerm,
		setSearchTerm,
		filteredData: filteredCandidates,
		resultsCount
	} = useSearch<Candidate>({
		data: candidatesData,
		searchFields: ['name', 'party']
	});

	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId);
		setSearchTerm('');
    
		// Por ahora mostramos todos los candidatos, pero se podrá filtrar por categoría si habilitamos
		// const categoryMap = {
		//   'presidenciales': 'presidencial',
		//   'congresales': 'congresista',
		//   'senadores': 'senador',
		//   'andino': 'andino'
		// };
		// const filteredByCategory = getCandidatesByCategory(categoryMap[tabId]);
	};

	const handleCandidateClick = (candidateId: number) => {
		// Guardar posición antes de navegar
		saveScrollPosition();
		router.push(`/candidates/${candidateId}?from=candidates`);
	};

	return (

		<main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
			{/* Title and Search Section */}
			<div className="mb-6">
				<h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Candidatos</h1>
          
				{/* Search Bar Component */}
				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Buscar candidato o partido"
				/>
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
								<div>
									<h3 className="font-semibold text-foreground">{candidate.name}</h3>
									<p className="text-sm text-muted-foreground">{candidate.party}</p>
								</div>
							</div>
							<ChevronRight className="h-5 w-5 text-muted-foreground" />
						</div>
					</Card>
				))}

				{filteredCandidates.length === 0 && (
					<div className="flex flex-col items-center justify-center py-12">
						<p className="text-muted-foreground">
							{searchTerm ? 'No se encontraron candidatos con ese término' : 'No hay candidatos disponibles'}
						</p>
					</div>
				)}
			</div>
		</main>

	);
}