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
      duration: 10,
      ease: 'power1.inOut'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 flex justify-center items-center opacity-40 pointer-events-none">
      <LlamaSvg className="lg:w-1/2 stroke-foreground stroke-[1.2px] absolute bottom-0 right-0" />
    </div>
  );
}