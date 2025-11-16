'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { policyPlanSchema } from '@/core/modules/policyPlan/schemas/policyPlan.schema';
import { usePolicyPlan } from '@/core/modules/policyPlan/hooks/usePolicyPlan';
import { usePoliticalParty } from '@/core/modules/politicalParty/hooks/usePoliticalParty';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function PolicyPlanForm() {
	const { createPlan, loading } = usePolicyPlan();
	const { parties, getAllParties } = usePoliticalParty();
	const router = useRouter();
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		getAllParties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const initialValues = {
		political_party_id: '',
		urlPdf: undefined,
	};

	const handleSubmit = async (values: { political_party_id: string; urlPdf?: File }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		try {
			const payload = {
				policyPlanRequest: {
					political_party_id: values.political_party_id,
				},
				urlPdf: values.urlPdf,
			};

			await createPlan(payload);
			setSuccess(true);
			setTimeout(() => router.push('/dashboard/policy-plans/list'), 2000);
		} catch {
			// Error handled in hook
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Agregar Plan de Política</CardTitle>
				<CardDescription>Sube un plan de política asociado a un partido político</CardDescription>
			</CardHeader>
			<CardContent>
				<Formik
					initialValues={initialValues}
					validationSchema={policyPlanSchema}
					onSubmit={handleSubmit}
				>
					{({ setFieldValue }) => (
						<Form className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Partido Político</label>
								<Field name="political_party_id" as="select" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
									<option value="">Seleccione un partido</option>
									{parties.map((party) => (
										<option key={party.id} value={party.id}>
											{party.name}
										</option>
									))}
								</Field>
								<ErrorMessage name="political_party_id" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Plan de Política (PDF)</label>
								<Input
									type="file"
									accept=".pdf"
									onChange={(e) => setFieldValue('urlPdf', e.target.files?.[0])}
								/>
								<ErrorMessage name="urlPdf" component="p" className="text-sm text-red-500 mt-1" />
							</div>

							{success && <p className="text-green-500">¡Plan creado exitosamente!</p>}

							<Button type="submit" disabled={loading} className="w-full">
								{loading ? 'Creando...' : 'Crear Plan de Política'}
							</Button>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
