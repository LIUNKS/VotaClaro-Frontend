import { CandidateApiData, CandidatesApiResponse } from '../interfaces/candidates.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class CandidatesCache {
	private cache: Map<string, { data: CandidateApiData[]; timestamp: number }> = new Map();
	private readonly CACHE_DURATION = 5 * 60 * 1000;

	get(key: string): { data: CandidateApiData[]; timestamp: number } | undefined {
		const cached = this.cache.get(key);
		if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
			return cached;
		}
		return undefined;
	}

	set(key: string, data: CandidateApiData[]): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now()
		});
	}

	clear(): void {
		this.cache.clear();
	}
}

const candidatesCache = new CandidatesCache();

export const candidatesActions = {
	async fetchCandidates(): Promise<CandidatesApiResponse> {
		try {
			// Verificar caché
			const cached = candidatesCache.get('candidates');
			if (cached) {
				return {
					success: true,
					data: cached.data,
					lastUpdated: new Date(cached.timestamp).toISOString()
				};
			}

			const response = await fetch(`${API_URL}/citizen`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: CandidateApiData[] = await response.json();
      
			// Guardar en caché
			candidatesCache.set('candidates', data);

			return {
				success: true,
				data,
				lastUpdated: new Date().toISOString()
			};

		} catch (error) {
			console.error('Error fetching candidates:', error);
			return {
				success: false,
				data: [],
				error: error instanceof Error ? error.message : 'Error desconocido',
				lastUpdated: new Date().toISOString()
			};
		}
	},

	async fetchCandidateById(id: string): Promise<CandidateApiData | null> {
		try {
			const response = await this.fetchCandidates();
			if (response.success) {
				return response.data.find(candidate => candidate.id === id) || null;
			}
			return null;
		} catch (error) {
			console.error('Error fetching candidate by ID:', error);
			return null;
		}
	},

	clearCache(): void {
		candidatesCache.clear();
	}
};