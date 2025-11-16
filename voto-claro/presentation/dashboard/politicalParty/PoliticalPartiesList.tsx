'use client';

import { useEffect } from 'react';
import { usePoliticalParty } from '@/core/modules/politicalParty/hooks/usePoliticalParty';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function PoliticalPartiesList() {
	const { parties, getAllParties, loading, error } = usePoliticalParty();
	const router = useRouter();

	useEffect(() => {
		getAllParties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <p>Cargando partidos políticos...</p>;

	if (error) {
		return (
			<div className="space-y-4">
				<h1 className="text-3xl font-bold">Partidos Políticos</h1>
				<div className="text-center text-red-500">
					<p>Error al cargar los partidos políticos: {error}</p>
					<Button onClick={getAllParties} className="mt-4">
						Reintentar
					</Button>
				</div>
			</div>
		);
	}

	// Verificar que parties sea un array
	if (!Array.isArray(parties)) {
		return (
			<div className="space-y-4">
				<h1 className="text-3xl font-bold">Partidos Políticos</h1>
				<div className="text-center text-yellow-500">
					<p>Error: Los datos de partidos no son válidos</p>
					<Button onClick={getAllParties} className="mt-4">
						Reintentar
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Partidos Políticos</h1>
				<Button onClick={() => router.push('/dashboard/political-parties/add')}>
					Agregar Partido
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{parties.map((party) => (
					<Card key={party.id}>
						<CardHeader>
							<CardTitle>{party.name}</CardTitle>
							<CardDescription>{party.ideology}</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm"><strong>Ubicación:</strong> {party.location}</p>
							<p className="text-sm"><strong>Miembros:</strong> {party.members}</p>
							<p className="text-sm mt-2">{party.description}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{parties.length === 0 && <p className="text-center text-muted-foreground">No hay partidos políticos registrados</p>}
		</div>
	);
}
