import { useState } from 'react';
import { candidatesActions } from '@/core/candidates/actions/candidates.actions';
import { CitizenData, CreateCandidatePayload, CandidateResponse } from '@/core/candidates/interfaces/candidates.interface';

export const useCandidate = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [citizen, setCitizen] = useState<CitizenData | null>(null);
	const [candidates, setCandidates] = useState<CandidateResponse[]>([]);

	const searchCitizenByDni = async (dni: string) => {
		setLoading(true);
		setError(null);
		setCitizen(null);
		try {
			const data = await candidatesActions.getCitizenByDni(dni);
			setCitizen(data);
			return data;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al buscar ciudadano por DNI';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const createCandidate = async (payload: CreateCandidatePayload) => {
		setLoading(true);
		setError(null);
		try {
			const candidate = await candidatesActions.createCandidate(payload);
			return candidate;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al crear el candidato';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getAllCandidates = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await candidatesActions.getAllCandidates();
			setCandidates(data);
			return data;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al obtener los candidatos';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getCandidateById = async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const candidate = await candidatesActions.getCandidateById(id);
			return candidate;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al obtener el candidato';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const clearCitizen = () => {
		setCitizen(null);
		setError(null);
	};

	return {
		loading,
		error,
		citizen,
		candidates,
		searchCitizenByDni,
		createCandidate,
		getAllCandidates,
		getCandidateById,
		clearCitizen,
	};
};
