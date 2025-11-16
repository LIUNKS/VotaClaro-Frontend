'use client';

import { useEffect } from 'react';
import { usePolicyPlan } from '@/core/modules/policyPlan/hooks/usePolicyPlan';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function PolicyPlansList() {
	const { plans, getAllPlans, loading } = usePolicyPlan();
	const router = useRouter();

	useEffect(() => {
		getAllPlans();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <p>Cargando planes de política...</p>;

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Planes de Política</h1>
				<Button onClick={() => router.push('/dashboard/policy-plans/add')}>
					Agregar Plan
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{plans.map((plan) => (
					<Card key={plan.id}>
						<CardHeader>
							<CardTitle>Plan {plan.id.substring(0, 8)}</CardTitle>
							<CardDescription>Partido: {plan.political_party_id.substring(0, 8)}</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" onClick={() => window.open(plan.urlPdf, '_blank')}>
								Ver PDF
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

			{plans.length === 0 && <p className="text-center text-muted-foreground">No hay planes de política registrados</p>}
		</div>
	);
}
