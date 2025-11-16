import LlamaAnimation from '@/components/animations/llama-draw';
import { SidebarDashboard } from '@/components/sidebarDashboard';
import { DynamicBreadcrumbs } from '@/components/DynamicBreadcrumbs';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { ReactNode } from 'react';

export default function DashboardLayout({
	children,
}: {
    children: ReactNode
}) {
	return (
		<SidebarProvider>
			<SidebarDashboard />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<DynamicBreadcrumbs />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative">
					<LlamaAnimation />
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}