import { useState } from 'react';
import { locationVoteActions } from '@/core/locationVote/actions/locationVote.actions';
import { Citizen } from '@/core/locationVote/interfaces/locationVote.interface';

export const useLocationVote = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [citizen, setCitizen] = useState<Citizen | null>(null);

	const getCitizenByDni = async (dni: string) => {
		setLoading(true);
		setError(null);
		try {
			const data = await locationVoteActions.getCitizenByDni(dni);
			setCitizen(data);
			return data;
		} catch (err: unknown) {
			const errorMessage = (err as any).response?.data?.message || (err as Error).message || 'Error al obtener la información del ciudadano';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		citizen,
		getCitizenByDni,
	};
};