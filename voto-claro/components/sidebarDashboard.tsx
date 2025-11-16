'use client';

import * as React from 'react';
import {
	Vote,
	FileText,
	LayoutDashboard,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';

// Datos de navegación para MiVoto
const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard,
			isActive: true,
			items: [],
		},
		{
			title: 'Partidos Políticos',
			url: '/dashboard/political-parties',
			icon: Vote,
			items: [
				{
					title: 'Agregar Partido',
					url: '/dashboard/political-parties/add',
				},
				{
					title: 'Listar Partidos',
					url: '/dashboard/political-parties/list',
				},
			],
		},
		{
			title: 'Planes de Política',
			url: '/dashboard/policy-plans',
			icon: FileText,
			items: [
				{
					title: 'Agregar Plan',
					url: '/dashboard/policy-plans/add',
				},
				{
					title: 'Listar Planes',
					url: '/dashboard/policy-plans/list',
				},
			],
		},
	],
};

export function SidebarDashboard({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center justify-center py-4">
				<div className="text-xl font-bold text-primary">MiVoto</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
