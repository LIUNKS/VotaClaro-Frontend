import axios from 'axios';
import { CreatePoliticalPartyPayload, PoliticalParty } from '../interfaces/politicalParty.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fvrp2459-8080.brs.devtunnels.ms';

export const politicalPartyActions = {
	async createPoliticalParty(payload: CreatePoliticalPartyPayload): Promise<PoliticalParty> {
		const formData = new FormData();
		
		// Agregar datos JSON como string
		formData.append('politicalPartyRequest', JSON.stringify(payload.politicalPartyRequest));
		
		// Agregar archivos
		formData.append('urlLogo', payload.urlLogo);
		formData.append('urlListMembers', payload.urlListMembers);

		const response = await axios.post<PoliticalParty>(
			`${API_URL}/politicalParty/add`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return response.data;
	},

	async getAllPoliticalParties(): Promise<PoliticalParty[]> {
		const response = await axios.get<PoliticalParty[]>(`${API_URL}/politicalParty/all`);
		return response.data;
	},

	async getPoliticalPartyById(id: string): Promise<PoliticalParty> {
		const response = await axios.get<PoliticalParty>(`${API_URL}/politicalParty/${id}`);
		return response.data;
	},
};
