'use client';

import * as React from 'react';
import {
	Vote,
	FileText,
	LayoutDashboard,
	Users,
} from 'lucide-react';
import Image from 'next/image';

import { NavMain } from '@/components/nav-main';
import { LogoSvg } from '@/assets/components/logo-svg';
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
			title: 'Candidatos',
			url: '/dashboard/candidates',
			icon: Users,
			items: [
				{
					title: 'Agregar Candidato',
					url: '/dashboard/candidates/add',
				},
				{
					title: 'Listar Candidatos',
					url: '/dashboard/candidates/list',
				},
			],
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
			<SidebarHeader className="flex items-center justify-center py-4 px-2">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 relative">
						<LogoSvg className="w-full h-full fill-primary" />
						<Image 
							src="/icon.svg" 
							alt="MiVoto Logo" 
							width={40} 
							height={40} 
							className="absolute inset-0 opacity-0"
							onError={(e) => {
								e.currentTarget.style.opacity = '1';
								e.currentTarget.previousElementSibling?.classList.add('hidden');
							}}
						/>
					</div>
					<span className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">MiVoto</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
