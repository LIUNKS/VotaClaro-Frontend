'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { LogoSvg } from '@/assets/components/logo-svg';

gsap.registerPlugin(DrawSVGPlugin);

export default function LogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set('#capa-logo', { visibility: 'visible' });
    gsap.set('#logo', { fillOpacity: 0 });

    tl.from('#logo', {
      drawSVG: '0%',
      duration: 3,
      ease: 'power1.inOut',
    }).to('#logo', {
      fillOpacity: 1,
      duration: 1.2,
      ease: 'power1.out',
    }, '>-0.2');
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex items-center pointer-events-none">
      <LogoSvg className="w-1/2 stroke-foreground stroke-[1.2px] fill-foreground" />
    </div>
  );
}
