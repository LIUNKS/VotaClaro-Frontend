import { CandidateApiData, AdaptedCandidate } from '@/core/candidates/interfaces/candidates.interface';

export const candidatesUtils = {
	adaptCandidateData(candidates: CandidateApiData[]): AdaptedCandidate[] {
		return candidates.map(candidate => ({
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
	},

	formatLastUpdated(lastUpdated: string | null): string {
		if (!lastUpdated) return 'No disponible';
		return new Date(lastUpdated).toLocaleString('es-PE');
	},

	getCandidateLocation(candidate: CandidateApiData): string {
		const { departamento, provincia } = candidate.datos_personales.lugar_nacimiento;
		return `${departamento}, ${provincia}`;
	},

	filterCandidatesBySearch(candidates: AdaptedCandidate[], searchTerm: string): AdaptedCandidate[] {
		if (!searchTerm) return candidates;
    
		const lowerSearchTerm = searchTerm.toLowerCase();
		return candidates.filter(candidate =>
			candidate.name.toLowerCase().includes(lowerSearchTerm) ||
      candidate.party.toLowerCase().includes(lowerSearchTerm) ||
      candidate.dni.includes(searchTerm)
		);
	}
};