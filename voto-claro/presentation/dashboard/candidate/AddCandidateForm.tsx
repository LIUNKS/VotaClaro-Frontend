'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCandidate } from '@/core/modules/candidates/hooks/useCandidate';
import { usePoliticalParty } from '@/core/modules/politicalParty/hooks/usePoliticalParty';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Search, User, Building2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import * as Yup from 'yup';

const candidateSchema = Yup.object().shape({
	dni: Yup.string()
		.required('DNI es requerido')
		.matches(/^\d{8}$/, 'DNI debe tener 8 dígitos'),
	politicalPartyId: Yup.string().required('Debe seleccionar un partido político'),
	urlImgPerson: Yup.mixed().nullable(),
});

export function AddCandidateForm() {
	const { searchCitizenByDni, createCandidate, citizen, loading: candidateLoading, clearCitizen } = useCandidate();
	const { parties, getAllParties, loading: partiesLoading } = usePoliticalParty();
	const router = useRouter();
	const [success, setSuccess] = useState(false);
	const [searchedDni, setSearchedDni] = useState('');

	// Cargar partidos al montar
	useEffect(() => {
		getAllParties();
	}, [getAllParties]);

	interface FormValues {
		dni: string;
		politicalPartyId: string;
		urlImgPerson?: File;
	}

	const initialValues: FormValues = {
		dni: '',
		politicalPartyId: '',
		urlImgPerson: undefined,
	};

	const handleSearchCitizen = async (dni: string) => {
		if (!dni || dni.length !== 8) {
			alert('Por favor ingrese un DNI válido de 8 dígitos');
			return;
		}
		
		try {
			await searchCitizenByDni(dni);
			setSearchedDni(dni);
		} catch {
			alert('No se encontró ciudadano con ese DNI');
		}
	};

	const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		if (!citizen) {
			alert('Debe buscar y seleccionar un ciudadano primero');
			setSubmitting(false);
			return;
		}

		try {
			const payload = {
				candidateRequest: {
					dni: values.dni,
					politicalPartyId: values.politicalPartyId,
				},
				urlImgPerson: values.urlImgPerson,
			};

			await createCandidate(payload);
			setSuccess(true);
			
			setTimeout(() => {
				router.push('/dashboard/candidates/list');
			}, 2000);
		} catch (error) {
			console.error('Error al crear candidato:', error);
			alert('Error al crear el candidato. Por favor intente nuevamente.');
		} finally {
			setSubmitting(false);
		}
	};

	const selectedParty = parties.find(p => p.id === searchedDni);

	return (
		<div className="space-y-6">
			{success && (
				<Card className="border-green-500 bg-green-50">
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 text-green-700">
							<CheckCircle2 className="h-5 w-5" />
							<p className="font-medium">¡Candidato creado exitosamente! Redirigiendo...</p>
						</div>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Agregar Candidato Presidencial</CardTitle>
					<CardDescription>
						Busque un ciudadano por DNI y asígnelo como candidato a un partido político
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Formik
						initialValues={initialValues}
						validationSchema={candidateSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue, isSubmitting }) => (
							<Form className="space-y-6">
								{/* Búsqueda de Ciudadano */}
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<User className="h-5 w-5 text-muted-foreground" />
										<h3 className="text-lg font-semibold">1. Buscar Ciudadano</h3>
									</div>
									
									<div className="flex gap-2">
										<div className="flex-1">
											<Field
												as={Input}
												name="dni"
												type="text"
												placeholder="Ingrese DNI (8 dígitos)"
												maxLength={8}
												disabled={!!citizen}
											/>
											<ErrorMessage name="dni" component="p" className="text-sm text-red-500 mt-1" />
										</div>
										<Button
											type="button"
											onClick={() => handleSearchCitizen(values.dni)}
											disabled={candidateLoading || !!citizen}
										>
											<Search className="h-4 w-4 mr-2" />
											Buscar
										</Button>
										{citizen && (
											<Button
												type="button"
												variant="outline"
												onClick={() => {
													clearCitizen();
													setSearchedDni('');
													setFieldValue('dni', '');
													setFieldValue('politicalPartyId', '');
												}}
											>
												Limpiar
											</Button>
										)}
									</div>
								</div>

								{/* Información del Ciudadano */}
								{citizen && (
									<Card className="border-blue-200 bg-blue-50/50">
										<CardHeader>
											<CardTitle className="text-lg">Información del Ciudadano</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											<div className="grid grid-cols-2 gap-4">
												<div>
													<p className="text-sm font-medium text-muted-foreground">Nombre Completo</p>
													<p className="text-sm font-semibold">{citizen.nombre_completo}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground">DNI</p>
													<p className="text-sm font-semibold">{citizen.dni}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</p>
													<p className="text-sm">{citizen.datos_personales.fecha_nacimiento}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground">Educación</p>
													<p className="text-sm">{citizen.datos_personales.educacion}</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground">Antecedentes</p>
													<p className="text-sm">{citizen.antecedentes.total} registros</p>
												</div>
												<div>
													<p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
													<p className="text-sm">S/. {citizen.ingresos.total.toLocaleString()}</p>
												</div>
											</div>

											{citizen.experiencia_laboral.length > 0 && (
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-2">Experiencia Laboral</p>
													<div className="space-y-1">
														{citizen.experiencia_laboral.slice(0, 3).map((exp, idx) => (
															<p key={idx} className="text-sm">
																<strong>{exp.cargo}</strong> - {exp.organizacion} ({exp.desde} - {exp.hasta || 'Actualidad'})
															</p>
														))}
													</div>
												</div>
											)}

											{citizen.formacion_academica.length > 0 && (
												<div>
													<p className="text-sm font-medium text-muted-foreground mb-2">Formación Académica</p>
													<div className="space-y-1">
														{citizen.formacion_academica.slice(0, 2).map((edu, idx) => (
															<p key={idx} className="text-sm">
																<strong>{edu.grado}</strong> en {edu.carrera} - {edu.institucion} ({edu.anio_fin})
															</p>
														))}
													</div>
												</div>
											)}
										</CardContent>
									</Card>
								)}

								{/* Selección de Partido Político */}
								{citizen && (
									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<Building2 className="h-5 w-5 text-muted-foreground" />
											<h3 className="text-lg font-semibold">2. Seleccionar Partido Político</h3>
										</div>
										
										<div>
											<Field
												as="select"
												name="politicalPartyId"
												className="w-full px-3 py-2 border border-input rounded-md bg-background"
												disabled={partiesLoading}
											>
												<option value="">Seleccione un partido político</option>
												{parties.map((party) => (
													<option key={party.id} value={party.id}>
														{party.name} - {party.ideology}
													</option>
												))}
											</Field>
											<ErrorMessage name="politicalPartyId" component="p" className="text-sm text-red-500 mt-1" />
										</div>

										{values.politicalPartyId && selectedParty && (
											<Card className="border-purple-200 bg-purple-50/50">
												<CardHeader>
													<CardTitle className="text-lg">Información del Partido</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<div className="grid grid-cols-2 gap-4">
														<div>
															<p className="text-sm font-medium text-muted-foreground">Nombre</p>
															<p className="text-sm font-semibold">{selectedParty.name}</p>
														</div>
														<div>
															<p className="text-sm font-medium text-muted-foreground">Ideología</p>
															<p className="text-sm">{selectedParty.ideology}</p>
														</div>
														<div>
															<p className="text-sm font-medium text-muted-foreground">Ubicación</p>
															<p className="text-sm">{selectedParty.location}</p>
														</div>
														<div>
															<p className="text-sm font-medium text-muted-foreground">Miembros</p>
															<p className="text-sm">{selectedParty.members}</p>
														</div>
													</div>
													<div>
														<p className="text-sm font-medium text-muted-foreground">Descripción</p>
														<p className="text-sm">{selectedParty.description}</p>
													</div>
												</CardContent>
											</Card>
										)}
									</div>
								)}

								{/* Subida de Imagen */}
								{citizen && values.politicalPartyId && (
									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<ImageIcon className="h-5 w-5 text-muted-foreground" />
											<h3 className="text-lg font-semibold">3. Imagen del Candidato (Opcional)</h3>
										</div>
										
										<Input
											type="file"
											accept="image/*"
											onChange={(e) => {
												const file = e.target.files?.[0];
												setFieldValue('urlImgPerson', file);
											}}
										/>
										<p className="text-sm text-muted-foreground">
											Formatos aceptados: JPG, PNG, JPEG. Tamaño máximo: 5MB
										</p>
									</div>
								)}

								{/* Botones de Acción */}
								<div className="flex gap-4 pt-4">
									<Button
										type="submit"
										disabled={isSubmitting || candidateLoading || !citizen || !values.politicalPartyId}
										className="flex-1"
									>
										{isSubmitting ? 'Creando...' : 'Crear Candidato'}
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={() => router.back()}
										disabled={isSubmitting}
									>
										Cancelar
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
}
