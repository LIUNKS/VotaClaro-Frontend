'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ColibriSvg } from '@/assets/components/colibri-svg';

gsap.registerPlugin(DrawSVGPlugin);

export default function ColibriAnimation() {
	const containerRef = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		gsap.set('#colibri', { visibility: 'visible' });
		gsap.from('#colibri', {
			drawSVG: '0%',
			duration: 5,
			ease: 'power1.inOut'
		});
	}, { scope: containerRef });
	return (
		<div ref={containerRef} className="fixed inset-0 z-0 flex justify-center items-center opacity-60 pointer-events-none">
			<ColibriSvg className="lg:w-1/4 stroke-foreground stroke-[1.2px] absolute top-24 left-5 p-5" />
		</div>
	);
}
