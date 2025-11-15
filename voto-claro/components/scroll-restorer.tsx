'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    // Restore scroll position for current page on mount
    const savedScroll = sessionStorage.getItem(`scrollPosition-${pathname}`);
    if (savedScroll) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 0);
    }

    // Save scroll position before page unloads or navigates
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scrollPosition-${pathname}`, window.scrollY.toString());
    };

    // Save scroll position on navigation (when pathname changes)
    const handleScroll = () => {
      sessionStorage.setItem(`scrollPosition-${pathname}`, window.scrollY.toString());
    };

    // Add scroll listener to save position continuously
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}