import axios from 'axios';
import { Citizen } from '../interfaces/locationVote.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fvrp2459-8080.brs.devtunnels.ms';

export const locationVoteActions = {
	async getCitizenByDni(dni: string): Promise<Citizen> {
		const response = await axios.get<Citizen>(`${API_URL}/citizen/dni/${dni}`);
		return response.data;
	},
};