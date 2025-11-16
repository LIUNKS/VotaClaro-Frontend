export interface CandidateApiData {
  id: string;
  dni: string;
  nombre_completo: string;
  datos_personales: {
    fecha_nacimiento: string;
    sexo: string;
    educacion: string;
    lugar_nacimiento: {
      pais: string;
      departamento: string;
      provincia: string;
      distrito: string;
    };
    domicilio: string;
  };
  antecedentes: {
    total: number;
    penales: number;
    obligaciones: number;
    lista_sentencias: any[];
  };
  ingresos: {
    total: number;
    publico: number;
    privado: number;
    renta_publico: number;
    renta_privado: number;
    otro_ingreso_publico: number;
    otro_ingreso_privado: number;
  };
  bienes: {
    valor_total: number;
    muebles: any[];
    inmuebles: any[];
    vehiculos: any[];
  };
}

export interface CandidatesApiResponse {
  success: boolean;
  data: CandidateApiData[];
  error?: string;
  lastUpdated: string;
}

class CandidatesApiService {
	private readonly API_URL = 'https://fvrp2459-8080.brs.devtunnels.ms/citizen';
	private cache: Map<string, { data: CandidateApiData[]; timestamp: number }> = new Map();
	private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

	async fetchCandidates(): Promise<CandidatesApiResponse> {
		try {
			// Verificar caché
			const cached = this.cache.get('candidates');
			if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
				return {
					success: true,
					data: cached.data,
					lastUpdated: new Date(cached.timestamp).toISOString()
				};
			}

			const response = await fetch(this.API_URL, {
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
			this.cache.set('candidates', {
				data,
				timestamp: Date.now()
			});

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
	}

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
	}

	clearCache(): void {
		this.cache.clear();
	}
}

export const candidatesApiService = new CandidatesApiService();