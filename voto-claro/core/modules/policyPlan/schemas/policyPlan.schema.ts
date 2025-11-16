import * as Yup from 'yup';

export const policyPlanSchema = Yup.object().shape({
	political_party_id: Yup.string()
		.required('El ID del partido político es requerido')
		.uuid('Debe ser un UUID válido'),
	
	urlPdf: Yup.mixed()
		.required('El PDF del plan de política es requerido')
		.test('fileSize', 'El archivo es muy grande (máximo 15MB)', (value) => {
			if (!value) return false;
			return (value as File).size <= 15 * 1024 * 1024;
		})
		.test('fileType', 'Solo se permiten archivos PDF', (value) => {
			if (!value) return false;
			return (value as File).type === 'application/pdf';
		}),
});

export type PolicyPlanFormValues = Yup.InferType<typeof policyPlanSchema>;
