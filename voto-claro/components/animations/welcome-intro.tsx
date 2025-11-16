'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { LlamaSvg } from '@/assets/components/llama-svg';
import { ColibriSvg } from '@/assets/components/colibri-svg';

gsap.registerPlugin(DrawSVGPlugin, SplitText, ScrambleTextPlugin, CustomEase);

interface WelcomeIntroProps {
	onComplete: () => void;
	forceShow?: boolean; // Para desarrollo: mostrar siempre
}

export default function WelcomeIntro({ onComplete, forceShow = false }: WelcomeIntroProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [shouldShow] = useState(() => {
		if (typeof window === 'undefined') return false;
		
		// Si forceShow está activado, siempre mostrar
		if (forceShow) return true;
		
		const hasVisited = localStorage.getItem('mivoto_visited');
		if (!hasVisited) {
			localStorage.setItem('mivoto_visited', 'true');
			return true;
		}
		return false;
	});

	// Generar posiciones aleatorias para partículas de forma estable
	const [particlePositions] = useState(() =>
		Array.from({ length: 15 }).map(() => ({
			left: Math.random() * 100,
			top: Math.random() * 100
		}))
	);
	
	useEffect(() => {
		// Si no debe mostrar, llamar onComplete inmediatamente
		if (!shouldShow) {
			onComplete();
		}
	}, [shouldShow, onComplete]);

	useGSAP(() => {
		if (!shouldShow) return;

		const tl = gsap.timeline({
			onComplete: () => {
				setTimeout(() => {
					gsap.to(containerRef.current, {
						opacity: 0,
						duration: 1,
						ease: 'power2.inOut',
						onComplete
					});
				}, 800);
			}
		});

		// Custom ease para suavidad
		CustomEase.create('smooth', '0.4, 0.0, 0.2, 1');

		// Estados iniciales
		tl.set('.text-main', { opacity: 0, y: 30 })
			.set('.text-sub', { opacity: 0 })
			.set('.year-text', { opacity: 0, scale: 0.8 })
			.set('#llama-intro path', { drawSVG: '0%' })
			.set('#colibri-intro path', { drawSVG: '0%' })
			.set('.particles', { opacity: 0, scale: 0 })
			.set('.logo-circle', { scale: 0, rotation: -180 });

		// 1. Círculo central aparece
		tl.to('.logo-circle', {
			scale: 1,
			rotation: 0,
			duration: 1.2,
			ease: 'back.out(1.5)'
		}, 0.3);

		// 2. Dibujar llama desde abajo
		tl.to('#llama-intro path', {
			drawSVG: '100%',
			duration: 2,
			ease: 'power1.inOut',
			stagger: 0.05
		}, '-=0.6');

		// 3. Dibujar colibrí desde arriba
		tl.to('#colibri-intro path', {
			drawSVG: '100%',
			duration: 1.8,
			ease: 'power1.inOut',
			stagger: 0.05
		}, '-=1.4');

		// 4. Partículas aparecen
		tl.to('.particles', {
			opacity: 0.6,
			scale: 1,
			duration: 0.8,
			stagger: {
				amount: 0.6,
				from: 'random'
			},
			ease: 'back.out(2)'
		}, '-=1');

		// 5. Texto principal con efecto scramble
		tl.to('.text-main', {
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: 'power2.out'
		}, '-=0.8')
			.to('.text-main', {
				scrambleText: {
					text: 'MIVOTO',
					chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
					revealDelay: 0.2,
					speed: 0.6
				},
				duration: 1.2,
				ease: 'none'
			});

		// 6. Subtexto con split y stagger
		const splitSub = new SplitText('.text-sub', { type: 'words,chars' });
		tl.to('.text-sub', {
			opacity: 1,
			duration: 0.3
		}, '-=0.5')
			.from(splitSub.chars, {
				opacity: 0,
				y: 15,
				rotateX: -90,
				stagger: 0.02,
				duration: 0.6,
				ease: 'back.out(1.7)'
			});

		// 7. Año electoral
		tl.to('.year-text', {
			opacity: 1,
			scale: 1,
			duration: 0.8,
			ease: 'elastic.out(1, 0.5)'
		}, '-=0.3');

	}, { scope: containerRef, dependencies: [shouldShow] });

	if (!shouldShow) return null;

	return (
		<div suppressHydrationWarning
			ref={containerRef}
			className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
		>
			{/* Llama - Esquina inferior derecha */}
			<div className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 opacity-20">
				<LlamaSvg
					id="llama-intro"
					className="w-full h-full stroke-foreground stroke-[1px]"
				/>
			</div>

			{/* Colibrí - Esquina superior izquierda */}
			<div className="absolute top-0 left-0 w-48 h-48 lg:w-72 lg:h-72 opacity-20">
				<ColibriSvg
					id="colibri-intro"
					className="w-full h-full stroke-foreground stroke-[1px]"
				/>
			</div>

			{/* Partículas decorativas */}
			<div className="absolute inset-0 pointer-events-none">
				{particlePositions.map((pos, i) => (
					<div
						key={i}
						className="particles absolute w-1.5 h-1.5 rounded-full bg-foreground/30"
						style={{
							left: `${pos.left}%`,
							top: `${pos.top}%`,
						}}
					/>
				))}
			</div>

			{/* Círculo central decorativo */}
			<div className="logo-circle absolute w-32 h-32 rounded-full border-2 border-foreground/20" />

			{/* Contenido de texto */}
			<div className="relative z-10 text-center px-8">
				<h1 className="text-main text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 tracking-tight">
					MIVOTO
				</h1>
				<p className="text-sub text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light">
					Información clara para decidir mejor
				</p>
				<div className="relative inline-block">
					<p className="year-text text-3xl md:text-4xl lg:text-5xl font-bold text-foreground opacity-0 scale-75">
						Elecciones 2026
					</p>
				</div>
			</div>

			{/* Vignette sutil */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)] pointer-events-none" />
		</div>
	);
}
