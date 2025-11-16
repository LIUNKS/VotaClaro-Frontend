import axios from 'axios';
import { CreatePoliticalPartyPayload, PoliticalParty } from '../interfaces/politicalParty.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fvrp2459-8080.brs.devtunnels.ms';

export const politicalPartyActions = {
	async createPoliticalParty(payload: CreatePoliticalPartyPayload): Promise<PoliticalParty> {
		const formData = new FormData();
		
		// Crear el JSON como Blob con tipo application/json
		const jsonBlob = new Blob(
			[JSON.stringify(payload.politicalPartyRequest)],
			{ type: 'application/json' }
		);
		formData.append('politicalPartyRequest', jsonBlob, 'politicalPartyRequest.json');
		
		// Agregar archivos solo si existen
		if (payload.urlLogo) {
			formData.append('urlLogo', payload.urlLogo);
		}
		if (payload.urlListMembers) {
			formData.append('urlListMembers', payload.urlListMembers);
		}

		// Usar axios sin especificar headers para que detecte correctamente el FormData
		const response = await axios.post<PoliticalParty>(
			`${API_URL}/politicalParty/add`,
			formData
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
