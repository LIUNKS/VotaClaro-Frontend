export interface Citizen {
	dni: string;
	nombre_completo: string;
	local_votacion: {
		schoolName: string;
		address: string;
		tableNumber: string;
		latitude: number;
		longitude: number;
		hours: string;
		capacity: string;
	};
	// Otros campos de la respuesta si son necesarios
	createdAt?: string;
	updatedAt?: string;
}

export interface GetCitizenByDniRequest {
	dni: string;
}