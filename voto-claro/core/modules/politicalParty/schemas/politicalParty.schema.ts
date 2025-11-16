import * as Yup from 'yup';

export const politicalPartySchema = Yup.object().shape({
	name: Yup.string()
		.required('El nombre es requerido')
		.min(3, 'El nombre debe tener al menos 3 caracteres')
		.max(100, 'El nombre no puede exceder 100 caracteres'),
	
	ideology: Yup.string()
		.required('La ideología es requerida')
		.min(3, 'La ideología debe tener al menos 3 caracteres')
		.max(100, 'La ideología no puede exceder 100 caracteres'),
	
	members: Yup.string()
		.required('Los miembros son requeridos')
		.min(1, 'Debe especificar al menos un miembro'),
	
	location: Yup.string()
		.required('La ubicación es requerida')
		.min(3, 'La ubicación debe tener al menos 3 caracteres')
		.max(200, 'La ubicación no puede exceder 200 caracteres'),
	
	description: Yup.string()
		.required('La descripción es requerida')
		.min(10, 'La descripción debe tener al menos 10 caracteres')
		.max(1000, 'La descripción no puede exceder 1000 caracteres'),
	
	dateFoundation: Yup.string()
		.required('La fecha de fundación es requerida')
		.matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
	
	urlLogo: Yup.mixed()
		.required('El logo es requerido')
		.test('fileSize', 'El archivo es muy grande (máximo 5MB)', (value) => {
			if (!value) return false;
			return (value as File).size <= 5 * 1024 * 1024;
		})
		.test('fileType', 'Solo se permiten imágenes (JPG, PNG, WEBP)', (value) => {
			if (!value) return false;
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			return validTypes.includes((value as File).type);
		}),
	
	urlListMembers: Yup.mixed()
		.required('El PDF de lista de miembros es requerido')
		.test('fileSize', 'El archivo es muy grande (máximo 10MB)', (value) => {
			if (!value) return false;
			return (value as File).size <= 10 * 1024 * 1024;
		})
		.test('fileType', 'Solo se permiten archivos PDF', (value) => {
			if (!value) return false;
			return (value as File).type === 'application/pdf';
		}),
});

export type PoliticalPartyFormValues = Yup.InferType<typeof politicalPartySchema>;
