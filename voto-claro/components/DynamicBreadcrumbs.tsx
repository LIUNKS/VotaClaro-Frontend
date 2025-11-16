'use client';

import { usePathname } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeNames: Record<string, string> = {
	'dashboard': 'Dashboard',
	'political-parties': 'Partidos Políticos',
	'policy-plans': 'Planes de Política',
	'add': 'Agregar',
	'list': 'Listar',
};

export function DynamicBreadcrumbs() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	// Remover el primer segmento si es 'dashboard'
	const breadcrumbSegments = segments[0] === 'dashboard' ? segments.slice(1) : segments;

	if (breadcrumbSegments.length === 0) {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{breadcrumbSegments.map((segment, index) => {
					const isLast = index === breadcrumbSegments.length - 1;
					const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
					const href = `/dashboard/${breadcrumbSegments.slice(0, index + 1).join('/')}`;

					return (
						<div key={segment} className="flex items-center gap-2">
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{name}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href}>{name}</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
