import { useState } from 'react';
import { politicalPartyActions } from '@/core/politicalParty/actions/politicalParty.actions';
import { CreatePoliticalPartyPayload, PoliticalParty } from '@/core/politicalParty/interfaces/politicalParty.interface';

export const usePoliticalParty = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [parties, setParties] = useState<PoliticalParty[]>([]);

	const createParty = async (payload: CreatePoliticalPartyPayload) => {
		setLoading(true);
		setError(null);
		try {
			const party = await politicalPartyActions.createPoliticalParty(payload);
			return party;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al crear el partido político';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getAllParties = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await politicalPartyActions.getAllPoliticalParties();
			setParties(data);
			return data;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al obtener los partidos políticos';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getPartyById = async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const party = await politicalPartyActions.getPoliticalPartyById(id);
			return party;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || 'Error al obtener el partido político';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		parties,
		createParty,
		getAllParties,
		getPartyById,
	};
};
