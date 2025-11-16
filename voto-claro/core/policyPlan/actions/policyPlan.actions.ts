import axios from 'axios';
import { CreatePolicyPlanPayload, PolicyPlan } from '../interfaces/policyPlan.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fvrp2459-8080.brs.devtunnels.ms';

export const policyPlanActions = {
	async createPolicyPlan(payload: CreatePolicyPlanPayload): Promise<PolicyPlan> {
		const formData = new FormData();
		
		// Agregar datos JSON como string
		formData.append('policyPlanRequest', JSON.stringify(payload.policyPlanRequest));
		
		// Agregar archivo PDF
		formData.append('urlPdf', payload.urlPdf);

		const response = await axios.post<PolicyPlan>(
			`${API_URL}/policyPlan/add`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return response.data;
	},

	async getAllPolicyPlans(): Promise<PolicyPlan[]> {
		const response = await axios.get<PolicyPlan[]>(`${API_URL}/policyPlan/all`);
		return response.data;
	},

	async getPolicyPlansByPartyId(partyId: string): Promise<PolicyPlan[]> {
		const response = await axios.get<PolicyPlan[]>(`${API_URL}/policyPlan/party/${partyId}`);
		return response.data;
	},
};
