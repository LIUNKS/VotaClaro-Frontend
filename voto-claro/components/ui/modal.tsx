'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VotingLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDniSubmit: (dni: string) => void;
}

export function VotingLocationModal({ isOpen, onClose, onDniSubmit }: VotingLocationModalProps) {
	const [dni, setDni] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (dni.trim() && dni.length === 8) {
			setIsLoading(true);
			// Simular una pequeña demora para mostrar el loading
			setTimeout(() => {
				onDniSubmit(dni);
				setIsLoading(false);
				onClose();
			}, 1000);
		}
	};

	const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 8);
		setDni(value);
	};

	// Manejar ESC para cerrar
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-background/80 backdrop-blur-sm"
				onClick={onClose}
			/>
      
			{/* Modal Content */}
			<Card className="relative w-full max-w-md mx-auto shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
				<CardContent className="p-6">
					{/* Botón de cerrar */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
						disabled={isLoading}
						aria-label="Cerrar modal"
					>
						<X className="h-4 w-4 text-muted-foreground" />
					</button>

					{/* Header */}
					<div className="text-center space-y-4 mb-6">
						<div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
							<MapPin className="w-8 h-8 text-primary" />
						</div>
            
						<div>
							<h2 className="text-xl font-bold text-foreground">
                Encuentra tu Local de Votación
							</h2>
							<p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Descubre exactamente dónde te corresponde votar ingresando tu número de DNI.
                Te mostraremos la ubicación, mesa asignada y toda la información que necesitas.
							</p>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="dni" className="text-sm font-medium text-foreground">
                Número de DNI
							</label>
							<div className="relative">
								<Input
									id="dni"
									type="text"
									placeholder="12345678"
									value={dni}
									onChange={handleDniChange}
									maxLength={8}
									className="pl-10"
									required
								/>
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							</div>
							<p className="text-xs text-muted-foreground">
                Ingresa tu DNI de 8 dígitos sin espacios
							</p>
						</div>

						<div className="flex gap-3 pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								className="flex-1"
								disabled={isLoading}
							>
                Cancelar
							</Button>
							<Button
								type="submit"
								className="flex-1"
								disabled={!dni || dni.length !== 8 || isLoading}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Buscando...
									</div>
								) : (
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4" />
                    Buscar Local
									</div>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}