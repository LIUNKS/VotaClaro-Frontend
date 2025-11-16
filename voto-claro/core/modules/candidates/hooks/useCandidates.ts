import { useState, useEffect, useCallback } from 'react';
import { candidatesActions } from '@/core/candidates/actions/candidates.actions';
import { candidatesUtils } from '../utils/candidates.utils';
import { CandidateApiData, AdaptedCandidate } from '@/core/candidates/interfaces/candidates.interface';

export const useCandidates = () => {
	const [candidates, setCandidates] = useState<CandidateApiData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [lastUpdated, setLastUpdated] = useState<string | null>(null);

	const fetchCandidates = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
      
			const response = await candidatesActions.fetchCandidates();
      
			if (response.success) {
				setCandidates(response.data);
				setLastUpdated(response.lastUpdated);
			} else {
				setError(response.error || 'Error desconocido al cargar candidatos');
			}
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Error al cargar candidatos';
			setError(errorMessage);
			console.error('Error in useCandidates:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Función para obtener candidato por ID
	const getCandidateById = useCallback((id: string): CandidateApiData | null => {
		return candidates.find(c => c.id === id) || null;
	}, [candidates]);

	const getAllCandidates = async () => {
		await fetchCandidates();
		return candidates;
	};

	const getAdaptedCandidates = useCallback((): AdaptedCandidate[] => {
		return candidatesUtils.adaptCandidateData(candidates);
	}, [candidates]);

	const clearCache = () => {
		candidatesActions.clearCache();
	};

	useEffect(() => {
		fetchCandidates();
	}, [fetchCandidates]);

	return {
		loading,
		error,
		candidates,
		lastUpdated,
		getAllCandidates,
		getCandidateById,
		getAdaptedCandidates,
		refetch: fetchCandidates,
		clearCache,
	};
};