import { CandidateApiData, CandidatesApiResponse, CitizenData, CreateCandidatePayload, CandidateResponse } from '../interfaces/candidates.interface';
import axios from 'axios';

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
				error: error instanceof Error ? error.message : 'Error desconocido'
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
	},

	// ========== Nuevas funciones para gestión de candidatos ==========

	async getCitizenByDni(dni: string): Promise<CitizenData> {
		const response = await axios.get<CitizenData>(`${API_URL}/citizen/dni/${dni}`);
		return response.data;
	},

	async createCandidate(payload: CreateCandidatePayload): Promise<CandidateResponse> {
		const formData = new FormData();
		
		// Crear el JSON como Blob con tipo application/json
		const jsonBlob = new Blob(
			[JSON.stringify(payload.candidateRequest)],
			{ type: 'application/json' }
		);
		formData.append('candidateRequest', jsonBlob, 'candidateRequest.json');
		
		// Agregar imagen solo si existe
		if (payload.urlImgPerson) {
			formData.append('urlImgPerson', payload.urlImgPerson);
		}

		const response = await axios.post<{ body: CandidateResponse }>(
			`${API_URL}/candidate/add/wtPresidentialForm`,
			formData
		);

		return response.data.body;
	},

	async getAllCandidates(): Promise<CandidateResponse[]> {
		const response = await axios.get<{ body: CandidateResponse[] }>(`${API_URL}/candidate/list`);
		return Array.isArray(response.data.body) ? response.data.body : [];
	},

	async getCandidateById(id: string): Promise<CandidateResponse> {
		const response = await axios.get<{ body: CandidateResponse }>(`${API_URL}/candidate/${id}`);
		return response.data.body;
	}
};