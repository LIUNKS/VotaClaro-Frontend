'use client';

import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useScrollRestore } from '@/hooks';

interface GridItem {
  id: number | string;
  // Formato API (partidos políticos)
  name?: string;
  description?: string;
  urlLogo?: string;
  ideology?: string;
  // Formato JSON antiguo (partidos)
  nombre?: string;
  descripcion?: string;
  logo?: string;
  // Candidatos
  party?: string;
  image?: string;
  dni?: string;
  sexo?: string;
  educacion?: string;
  antecedentes?: number;
}

interface ItemsGridProps {
  title: string;
  items: GridItem[];
  type: 'candidates' | 'partidos';
  viewAllText: string;
  viewAllPath: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function ItemsGrid({
	title,
	items,
	type,
	viewAllText,
	viewAllPath,
	icon: Icon = Users
}: ItemsGridProps) {
	const router = useRouter();
	const { saveScrollPosition } = useScrollRestore({ key: 'home' });

	const handleItemClick = (itemId: number | string, e: React.MouseEvent) => {
		e.preventDefault();
		saveScrollPosition();
		const basePath = type === 'candidates' ? '/candidates' : '/partidos';
		router.push(`${basePath}/${itemId}?from=home`);
	};

	const handleViewAllClick = () => {
		saveScrollPosition();
		router.push(viewAllPath);
	};

	const getDisplayName = (item: GridItem) => {
		return item.name || item.nombre || 'Sin nombre';
	};

	const getSecondaryText = (item: GridItem) => {
		if (type === 'candidates') {
			// Para candidatos de la API, mostrar party y DNI si están disponibles
			if (item.dni) {
				return `${item.party || 'Partido no especificado'} • DNI: ${item.dni}`;
			}
			return item.party || 'Partido no especificado';
		} else {
			// Para partidos: usar description de la API o descripcion del JSON antiguo
			return item.description || item.descripcion || '';
		}
	};

	const getImageUrl = (item: GridItem) => {
		// Para partidos: urlLogo (API) o logo (JSON antiguo)
		if (type === 'partidos') {
			if (item.urlLogo) {
				// Si la URL ya es completa, usarla directamente
				if (item.urlLogo.startsWith('http')) {
					return item.urlLogo;
				}
				// Si no, construir la URL con el prefijo de la API
				return `${process.env.NEXT_PUBLIC_API_URL}/uploads/picture/${item.urlLogo}`;
			}
			return item.logo || '';
		}
		// Para candidatos: image
		return item.image || '';
	};

	const getPlaceholderSvg = (size: number, fallbackText: string) => {
		if (type === 'candidates') {
			// SVG de persona para candidatos
			return `data:image/svg+xml;base64,${btoa(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#E5E7EB"/>
          <circle cx="${size / 2}" cy="${size / 2.7}" r="${size / 6}" fill="#9CA3AF"/>
          <path d="M${size / 6} ${(size * 5) / 6}c0-${size / 3} ${size / 6}-${size / 3} ${size / 3}-${size / 3}s${size / 3} 0 ${size / 3} ${size / 3}" fill="#9CA3AF"/>
        </svg>
      `)}`;
		} else {
			// SVG con texto para partidos
			return `data:image/svg+xml;base64,${btoa(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#E5E7EB"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle" dy=".3em">${fallbackText.substring(0, 3)}</text>
        </svg>
      `)}`;
		}
	};

	return (
		<Card className="hover:shadow-lg transition-shadow duration-200 h-full">
			<CardContent className="p-4 lg:p-6 h-full flex flex-col">
				<div className="flex items-center gap-2 mb-4 lg:mb-6">
					<Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
					<h3 className="font-semibold text-card-foreground text-base lg:text-lg">
						{title}
					</h3>
				</div>

				<div className="space-y-3 lg:space-y-4 grow">
					{items.map((item) => (
						<div
							key={item.id}
							onClick={(e) => handleItemClick(item.id, e)}
							className="block cursor-pointer"
						>
							<div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
								<div className={`w-12 h-12 lg:w-14 lg:h-14 bg-muted rounded-full overflow-hidden shrink-0 ${
									type === 'partidos' ? 'bg-white p-2' : ''
								}`}>
									<img
										src={getImageUrl(item)}
										alt={getDisplayName(item)}
										className={`w-full h-full ${
											type === 'candidates' ? 'object-cover' : 'object-contain'
										}`}
										onError={(e) => {
											const size = window.innerWidth >= 1024 ? 56 : 48;
											e.currentTarget.src = getPlaceholderSvg(size, getDisplayName(item));
										}}
									/>
								</div>

								<div className="flex-1 min-w-0">
									<p className="font-medium text-card-foreground text-sm lg:text-base truncate">
										{getDisplayName(item)}
									</p>
									<p className="text-sm lg:text-base text-muted-foreground truncate">
										{getSecondaryText(item)}
									</p>
									{/* Mostrar badges adicionales para candidatos de la API */}
									{type === 'candidates' && item.antecedentes !== undefined && item.antecedentes > 0 && (
										<div className="mt-1">
											<span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
												{item.antecedentes} antecedente(s)
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				<button
					onClick={handleViewAllClick}
					className="w-full mt-4 lg:mt-6 py-2 lg:py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm lg:text-base"
				>
					{viewAllText}
				</button>
			</CardContent>
		</Card>
	);
}