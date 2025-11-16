import axios from 'axios';
import { CreatePolicyPlanPayload, PolicyPlan } from '../interfaces/policyPlan.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fvrp2459-8080.brs.devtunnels.ms';

export const policyPlanActions = {
	async createPolicyPlan(payload: CreatePolicyPlanPayload): Promise<PolicyPlan> {
		const formData = new FormData();
		
		// Crear el JSON como Blob con tipo application/json
		const jsonBlob = new Blob(
			[JSON.stringify(payload.policyPlanRequest)],
			{ type: 'application/json' }
		);
		formData.append('policyPlanRequest', jsonBlob, 'policyPlanRequest.json');
		
		// Agregar archivo PDF solo si existe
		if (payload.urlPdf) {
			formData.append('urlPdf', payload.urlPdf);
		}

		// Usar axios sin especificar headers para que detecte correctamente el FormData
		const response = await axios.post<PolicyPlan>(
			`${API_URL}/policyPlan/add`,
			formData
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
