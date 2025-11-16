'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Vote, Megaphone, FileText, Heart } from 'lucide-react';
import { useElectoralEvents } from '@/hooks/useElectoralEvents';

type TabType = 'all' | 'voters' | 'members' | 'favorites';

export default function CalendarioPage() {
	const [activeTab, setActiveTab] = useState<TabType>('all');
  
	// Inicializar el estado con el valor del localStorage directamente
	const [favorites, setFavorites] = useState<string[]>(() => {
		if (typeof window !== 'undefined') {
			const savedFavorites = localStorage.getItem('calendar-favorites');
			return savedFavorites ? JSON.parse(savedFavorites) : [];
		}
		return [];
	});
  
	const { events, loading } = useElectoralEvents();

	// sincronizar favoritos con localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('calendar-favorites', JSON.stringify(favorites));
		}
	}, [favorites]);

	// Función para alternar favoritos
	const toggleFavorite = (eventId: string) => {
		setFavorites(prev =>
			prev.includes(eventId)
				? prev.filter(id => id !== eventId)
				: [...prev, eventId]
		);
	};

	// Verificar si un evento es favorito
	const isFavorite = (eventId: string) => favorites.includes(eventId);

	const getEventIcon = (iconName: string = 'calendar') => {
		const iconProps = { className: 'w-5 h-5 text-white' };
    
		switch (iconName) {
			case 'clock':
				return <Clock {...iconProps} />;
			case 'users':
				return <Users {...iconProps} />;
			case 'vote':
				return <Vote {...iconProps} />;
			case 'megaphone':
				return <Megaphone {...iconProps} />;
			case 'file-text':
				return <FileText {...iconProps} />;
			default:
				return <Calendar {...iconProps} />;
		}
	};

	const formatDateForBadge = (dateString: string) => {
		const [year, month, day] = dateString.split('-').map(Number);
		const date = new Date(year, month - 1, day);
    
		const dayFormatted = date.getDate().toString();
		const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
		const monthFormatted = months[date.getMonth()];
		const yearFormatted = year.toString();
    
		return { day: dayFormatted, month: monthFormatted, year: yearFormatted };
	};

	const isCurrentOrFutureEvent = (dateString: string) => {
		const [year, month, day] = dateString.split('-').map(Number);
		const eventDate = new Date(year, month - 1, day);
    
		const today = new Date();
		today.setHours(0, 0, 0, 0);
    
		return eventDate >= today;
	};

	const filteredEvents = events
		.filter(event => {
			if (activeTab === 'all') return true;
			if (activeTab === 'favorites') return favorites.includes(event.id.toString());
			return event.category === activeTab || event.category === 'all';
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	if (loading) {
		return (
			<main className="max-w-md lg:max-w-4xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
				<div className="animate-pulse space-y-6">
					<div className="h-8 bg-muted rounded w-64"></div>
					<div className="flex gap-2">
						{[1, 2, 3, 4].map(i => (
							<div key={i} className="h-10 bg-muted rounded-full w-32"></div>
						))}
					</div>
					<div className="space-y-4">
						{[1, 2, 3, 4].map(i => (
							<div key={i} className="h-32 bg-muted rounded"></div>
						))}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-md lg:max-w-6xl mx-auto px-4 lg:px-8 py-6 pb-20 lg:pb-6">
			{/* Header */}
			<div className="mb-8">
				{/* Título y botón de favoritos */}
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Calendario Electoral
					</h1>
          
					{/* Botón de favoritos prominente */}
					<Button
						variant={activeTab === 'favorites' ? 'default' : 'outline'}
						onClick={() => setActiveTab('favorites')}
						className="flex items-center gap-2 rounded-full"
					>
						<Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
						<span className="hidden sm:inline">Me Interesa</span>
						{favorites.length > 0 && (
							<Badge
								variant="secondary"
								className="text-xs px-2 py-0"
							>
								{favorites.length}
							</Badge>
						)}
					</Button>
				</div>
        
				{/* Tabs - solo los principales */}
				<div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
					<div className="flex gap-2 min-w-max">
						<Button
							variant={activeTab === 'all' ? 'default' : 'outline'}
							onClick={() => setActiveTab('all')}
							className="rounded-full whitespace-nowrap flex-shrink-0"
						>
              Todos
						</Button>
						<Button
							variant={activeTab === 'voters' ? 'default' : 'outline'}
							onClick={() => setActiveTab('voters')}
							className="rounded-full whitespace-nowrap flex-shrink-0"
						>
              Para Votantes
						</Button>
						<Button
							variant={activeTab === 'members' ? 'default' : 'outline'}
							onClick={() => setActiveTab('members')}
							className="rounded-full whitespace-nowrap flex-shrink-0"
						>
              Para Miembros de Mesa
						</Button>
					</div>
				</div>
			</div>

			{/* Timeline Vertical - Nueva implementación */}
			<div className="max-w-6xl mx-auto">
				{/* Mobile Layout - Optimizado */}
				<div className="lg:hidden space-y-4">
					{filteredEvents.map((event) => {
						const dateInfo = formatDateForBadge(event.date);
						const isCurrent = isCurrentOrFutureEvent(event.date);
						const eventIsFavorite = isFavorite(event.id.toString());
            
						return (
							<Card
								key={event.id.toString()}
								className="border-l-4"
								style={{ borderLeftColor: event.color }}
							>
								<CardContent className="p-4">
									{/* Header con fecha, título y corazón */}
									<div className="flex items-start gap-3 mb-3">
										<div
											className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-full text-white font-bold ${isCurrent ? 'animate-pulse' : ''}`}
											style={{ backgroundColor: event.color }}
										>
											<span className="text-sm leading-none">{dateInfo.day}</span>
											<span className="text-xs leading-none">{dateInfo.month}</span>
											<span className="text-xs leading-none">{dateInfo.year}</span>
										</div>
                    
										<div className="flex-1 min-w-0">
											<h3 className="font-bold text-base mb-1 text-foreground leading-tight">
												{event.name}
											</h3>
											<Badge
												variant="secondary"
												className="text-xs mb-2"
												style={{
													backgroundColor: `${event.color}20`,
													color: event.color,
													border: `1px solid ${event.color}40`
												}}
											>
												{event.category === 'voters' ? 'Para Votantes' :
												event.category === 'members' ? 'Para Miembros de Mesa' :
												event.category === 'organizations' ? 'Para Organizaciones' : 'General'}
											</Badge>
										</div>

										<div className="flex flex-col gap-2 items-center">
											<div
												className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
												style={{ backgroundColor: event.color }}
											>
												{getEventIcon(event.icon)}
											</div>
                      
											{/* Botón de corazón integrado */}
											<Button
												variant={eventIsFavorite ? 'default' : 'outline'}
												size="sm"
												onClick={() => toggleFavorite(event.id.toString())}
												className={`p-1.5 h-8 w-8 rounded-full ${eventIsFavorite ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'border-red-200 hover:bg-red-50 bg-white'}`}
											>
												{eventIsFavorite ? (
													<Heart className="w-4 h-4 fill-white text-white" />
												) : (
													<Heart className="w-4 h-4 text-red-400" />
												)}
											</Button>
										</div>
									</div>

									{/* Descripción */}
									<p className="text-muted-foreground text-sm leading-relaxed">
										{event.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Desktop Layout */}
				<div className="hidden lg:block">
					{filteredEvents.map((event, index) => {
						const dateInfo = formatDateForBadge(event.date);
						const isLeft = index % 2 === 0;
						const isCurrent = isCurrentOrFutureEvent(event.date);
						const eventIsFavorite = isFavorite(event.id.toString());
            
						return (
							<div key={event.id.toString()} className="mb-16">
								{/* Grid de 3 columnas: card-izq | círculo+línea | card-der */}
								<div className="grid grid-cols-[1fr_100px_1fr] gap-8 items-center min-h-[200px]">
                  
									{/* Columna izquierda */}
									<div className={`flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
										{isLeft && (
											<div className="w-full max-w-lg">
												<Card
													className="border-2"
													style={{ borderColor: `${event.color}60` }}
												>
													<CardContent className="p-6">
														<div className="flex items-start gap-3 flex-row-reverse text-right">
															<div className="flex flex-col items-center gap-2">
																<div
																	className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
																	style={{ backgroundColor: event.color }}
																>
																	{getEventIcon(event.icon)}
																</div>
                                
																{/* Botón de corazón integrado */}
																<Button
																	variant={eventIsFavorite ? 'default' : 'outline'}
																	size="sm"
																	onClick={() => toggleFavorite(event.id.toString())}
																	className={`p-1.5 h-8 w-8 rounded-full ${eventIsFavorite ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'border-red-200 hover:bg-red-50 bg-white'}`}
																>
																	{eventIsFavorite ? (
																		<Heart className="w-5 h-5 fill-white text-white" />
																	) : (
																		<Heart className="w-5 h-5 text-red-400" />
																	)}
																</Button>
															</div>
                              
															<div className="flex-1">
																<h3 className="font-bold text-xl mb-2 text-foreground">
																	{event.name}
																</h3>
																<p className="text-muted-foreground mb-3 text-base leading-relaxed">
																	{event.description}
																</p>
                                
																<Badge
																	variant="secondary"
																	className="text-xs"
																	style={{
																		backgroundColor: `${event.color}20`,
																		color: event.color,
																		border: `1px solid ${event.color}40`
																	}}
																>
																	{event.category === 'voters' ? 'Para Votantes' :
																	event.category === 'members' ? 'Para Miembros de Mesa' :
																	event.category === 'organizations' ? 'Para Organizaciones' : 'General'}
																</Badge>
															</div>
														</div>
													</CardContent>
												</Card>
											</div>
										)}
									</div>

									{/* Columna central - Círculo y línea */}
									<div className="flex flex-col items-center">
										{/* Línea superior */}
										{index > 0 && (
											<div className="w-0.5 bg-border h-8"></div>
										)}
                    
										{/* Círculo */}
										<div
											className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-bold border-4 border-background shadow-xl ${isCurrent ? 'animate-pulse' : ''}`}
											style={{ backgroundColor: event.color }}
										>
											<span className="text-xl font-bold">{dateInfo.day}</span>
											<span className="text-xs">{dateInfo.month}</span>
											<span className="text-xs">{dateInfo.year}</span>
										</div>
                    
										{/* Línea inferior */}
										{index < filteredEvents.length - 1 && (
											<div className="w-0.5 bg-border h-8"></div>
										)}
									</div>

									{/* Columna derecha */}
									<div className={`flex ${!isLeft ? 'justify-start' : 'justify-end'}`}>
										{!isLeft && (
											<div className="w-full max-w-lg">
												<Card
													className="border-2"
													style={{ borderColor: `${event.color}60` }}
												>
													<CardContent className="p-6">
														<div className="flex items-start gap-3">
															<div className="flex flex-col items-center gap-2">
																<div
																	className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
																	style={{ backgroundColor: event.color }}
																>
																	{getEventIcon(event.icon)}
																</div>
                                
																{/* Botón de corazón integrado */}
																<Button
																	variant={eventIsFavorite ? 'default' : 'outline'}
																	size="sm"
																	onClick={() => toggleFavorite(event.id.toString())}
																	className={`p-1.5 h-8 w-8 rounded-full ${eventIsFavorite ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'border-red-200 hover:bg-red-50 bg-white'}`}
																>
																	{eventIsFavorite ? (
																		<Heart className="w-5 h-5 fill-white text-white" />
																	) : (
																		<Heart className="w-5 h-5 text-red-400" />
																	)}
																</Button>
															</div>
                              
															<div className="flex-1">
																<h3 className="font-bold text-xl mb-2 text-foreground">
																	{event.name}
																</h3>
																<p className="text-muted-foreground mb-3 text-base leading-relaxed">
																	{event.description}
																</p>
                                
																<Badge
																	variant="secondary"
																	className="text-xs"
																	style={{
																		backgroundColor: `${event.color}20`,
																		color: event.color,
																		border: `1px solid ${event.color}40`
																	}}
																>
																	{event.category === 'voters' ? 'Para Votantes' :
																	event.category === 'members' ? 'Para Miembros de Mesa' :
																	event.category === 'organizations' ? 'Para Organizaciones' : 'General'}
																</Badge>
															</div>
														</div>
													</CardContent>
												</Card>
											</div>
										)}
									</div>

								</div>
							</div>
						);
					})}
				</div>
			</div>

			{filteredEvents.length === 0 && (
				<div className="text-center py-16">
					<p className="text-muted-foreground">
						{activeTab === 'favorites'
							? 'No tienes eventos marcados como favoritos'
							: 'No hay eventos para mostrar en esta categoría'
						}
					</p>
				</div>
			)}
		</main>
	);
}