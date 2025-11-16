import { useState, useEffect, useCallback } from 'react';
import { candidatesApiService, CandidateApiData } from '@/services/candidatesService';

export interface UseCandidatesApiReturn {
  candidates: CandidateApiData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: string | null;
  getCandidateById: (id: string) => CandidateApiData | undefined;
}

export function useCandidatesApi(): UseCandidatesApiReturn {
	const [candidates, setCandidates] = useState<CandidateApiData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [lastUpdated, setLastUpdated] = useState<string | null>(null);

	const fetchCandidates = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
      
			const response = await candidatesApiService.fetchCandidates();
      
			if (response.success) {
				setCandidates(response.data);
				setLastUpdated(response.lastUpdated);
			} else {
				setError(response.error || 'Error desconocido al cargar candidatos');
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error al cargar candidatos';
			setError(errorMessage);
			console.error('Error in useCandidatesApi:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	const getCandidateById = useCallback((id: string) => {
		return candidates.find(candidate => candidate.id === id);
	}, [candidates]);

	useEffect(() => {
		fetchCandidates();
	}, [fetchCandidates]);

	return {
		candidates,
		loading,
		error,
		refetch: fetchCandidates,
		lastUpdated,
		getCandidateById,
	};
}