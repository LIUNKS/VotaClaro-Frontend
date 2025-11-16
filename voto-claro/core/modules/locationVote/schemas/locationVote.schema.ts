import * as Yup from 'yup';

export const locationVoteSchema = Yup.object().shape({
	dni: Yup.string()
		.required('El DNI es requerido')
		.matches(/^\d{8}$/, 'El DNI debe tener exactamente 8 dígitos'),
});

export type LocationVoteFormValues = Yup.InferType<typeof locationVoteSchema>;