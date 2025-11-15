'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { LlamaSvg } from '@/assets/components/llama-svg';

gsap.registerPlugin(DrawSVGPlugin);

export default function LlamaAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set('#llama', { visibility: 'visible' });
    gsap.from('#llama', {
      drawSVG: '0%',
      duration: 20,
      ease: 'power1.inOut'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 flex justify-center items-center">
      <LlamaSvg className="w-1/2 stroke-foreground stroke-[1.2px] absolute bottom-0 right-0" />
    </div>
  );
}