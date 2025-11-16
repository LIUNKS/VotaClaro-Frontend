'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { politicalPartySchema } from '@/core/modules/politicalParty/schemas/politicalParty.schema';
import { usePoliticalParty } from '@/core/modules/politicalParty/hooks/usePoliticalParty';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function PoliticalPartyForm() {
	const { createParty, loading } = usePoliticalParty();
	const router = useRouter();
	const [success, setSuccess] = useState(false);

	interface FormValues {
		name: string;
		ideology: string;
		members: string;
		location: string;
		description: string;
		dateFoundation: string;
		urlLogo?: File;
		urlListMembers?: File;
	}

	const initialValues: FormValues = {
		name: '',
		ideology: '',
		members: '',
		location: '',
		description: '',
		dateFoundation: '',
		urlLogo: undefined,
		urlListMembers: undefined,
	};

	const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		try {
			const payload = {
				politicalPartyRequest: {
					name: values.name,
					ideology: values.ideology,
					members: values.members,
					location: values.location,
					description: values.description,
					dateFoundation: values.dateFoundation,
				},
				urlLogo: values.urlLogo as File,
				urlListMembers: values.urlListMembers as File,
			};

			await createParty(payload);
			setSuccess(true);
			setTimeout(() => router.push('/dashboard/political-parties/list'), 2000);
		} catch {
			// Error handled in hook
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Agregar Partido Político</CardTitle>
				<CardDescription>Complete el formulario para registrar un nuevo partido político</CardDescription>
			</CardHeader>
			<CardContent>
				<Formik
					initialValues={initialValues}
					validationSchema={politicalPartySchema}
					onSubmit={handleSubmit}
				>
					{({ setFieldValue }) => (
						<Form className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Nombre</label>
								<Field name="name" as={Input} placeholder="Nombre del partido" />
								<ErrorMessage name="name" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Ideología</label>
								<Field name="ideology" as={Input} placeholder="Ideología política" />
								<ErrorMessage name="ideology" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Miembros</label>
								<Field name="members" as={Input} placeholder="Número de miembros" />
								<ErrorMessage name="members" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Ubicación</label>
								<Field name="location" as={Input} placeholder="Ciudad, País" />
								<ErrorMessage name="location" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Descripción</label>
								<Field name="description" as="textarea" className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Descripción del partido" />
								<ErrorMessage name="description" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Fecha de Fundación</label>
								<Field name="dateFoundation" type="date" as={Input} />
								<ErrorMessage name="dateFoundation" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Logo (imagen)</label>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => setFieldValue('urlLogo', e.target.files?.[0])}
								/>
								<ErrorMessage name="urlLogo" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Lista de Miembros (PDF)</label>
								<Input
									type="file"
									accept=".pdf"
									onChange={(e) => setFieldValue('urlListMembers', e.target.files?.[0])}
								/>
								<ErrorMessage name="urlListMembers" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							{success && <p className="text-green-500">¡Partido creado exitosamente!</p>}

							<Button type="submit" disabled={loading} className="w-full">
								{loading ? 'Creando...' : 'Crear Partido Político'}
							</Button>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
