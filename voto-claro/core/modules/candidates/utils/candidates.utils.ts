import { CandidateApiData, AdaptedCandidate } from '@/core/candidates/interfaces/candidates.interface';

export const candidatesUtils = {
	adaptCandidateData(candidates: CandidateApiData[]): AdaptedCandidate[] {
		const IMAGE_BASE = 'https://fvrp2459-8080.brs.devtunnels.ms/uploads/pictures/';

		return candidates.map(candidate => {
			const imageFile = candidate.url_img && candidate.url_img.trim() !== '' ? candidate.url_img : `${candidate.id}.jpg`;
			const imageUrl = `${IMAGE_BASE}${imageFile}`;

			return {
				id: candidate.id,
				name: candidate.nombre_completo,
				party: `${candidate.datos_personales.lugar_nacimiento.departamento}, ${candidate.datos_personales.lugar_nacimiento.provincia}`,
				image: imageUrl,
				dni: candidate.dni,
				sexo: candidate.datos_personales.sexo === 'M' ? 'Masculino' : 'Femenino',
				educacion: candidate.datos_personales.educacion,
				antecedentes: candidate.antecedentes.total,
				ingresos: candidate.ingresos.total
			};
		});
	},

	formatLastUpdated(lastUpdated: string | null): string {
		if (!lastUpdated) return 'No disponible';
		return new Date(lastUpdated).toLocaleString('es-PE', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
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
	},

	formatCurrency(amount: number): string {
		return new Intl.NumberFormat('es-PE', {
			style: 'currency',
			currency: 'PEN'
		}).format(amount);
	},

	getAgeFromBirthDate(birthDate: string): number {
		const [day, month, year] = birthDate.split('/');
		const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
		const today = new Date();
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
        
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
			age--;
		}
        
		return age;
	}
};