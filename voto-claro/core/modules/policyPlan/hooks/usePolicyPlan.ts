import { useState } from 'react';
import { policyPlanActions } from '@/core/policyPlan/actions/policyPlan.actions';
import { CreatePolicyPlanPayload, PolicyPlan } from '@/core/policyPlan/interfaces/policyPlan.interface';

export const usePolicyPlan = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [plans, setPlans] = useState<PolicyPlan[]>([]);

	const createPlan = async (payload: CreatePolicyPlanPayload) => {
		setLoading(true);
		setError(null);
		try {
			const plan = await policyPlanActions.createPolicyPlan(payload);
			return plan;
		} catch (err: unknown) {
			const errorMessage = (err as any).response?.data?.message || (err as Error).message || 'Error al crear el plan de política';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getAllPlans = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await policyPlanActions.getAllPolicyPlans();
			setPlans(data);
			return data;
		} catch (err: unknown) {
			const errorMessage = (err as any).response?.data?.message || (err as Error).message || 'Error al obtener los planes de política';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const getPlansByPartyId = async (partyId: string) => {
		setLoading(true);
		setError(null);
		try {
			const data = await policyPlanActions.getPolicyPlansByPartyId(partyId);
			return data;
		} catch (err: unknown) {
			const errorMessage = (err as any).response?.data?.message || (err as Error).message || 'Error al obtener los planes de política';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		plans,
		createPlan,
		getAllPlans,
		getPlansByPartyId,
	};
};
