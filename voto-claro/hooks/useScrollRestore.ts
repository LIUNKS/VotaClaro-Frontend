import { useEffect } from 'react';

interface UseScrollRestoreOptions {
  key: string;
  delay?: number;
  behavior?: ScrollBehavior;
  duration?: number;
  easing?: string;
}

export function useScrollRestore({ 
  key, 
  delay = 200, 
  behavior = 'smooth',
  duration = 800,
  easing = 'ease-out'
}: UseScrollRestoreOptions) {
  
  // Función para scroll suave personalizado
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = Date.now();

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de easing para hacer la animación más suave
      let easeProgress;
      switch (easing) {
        case 'ease-out':
          easeProgress = 1 - Math.pow(1 - progress, 3);
          break;
        case 'ease-in-out':
          easeProgress = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          break;
        default:
          easeProgress = progress;
      }
      
      const currentPosition = startPosition + (distance * easeProgress);
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Restaurar posición del scroll al montar
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(`${key}-scroll-position`);
    if (savedScrollPosition) {
      const targetPosition = parseInt(savedScrollPosition);
      
      // Delay más largo para permitir que el contenido se cargue
      setTimeout(() => {
        // Usar scroll nativo para navegadores que lo soporten bien, 
        // o nuestro scroll personalizado como fallback
        if (behavior === 'smooth' && 'scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          smoothScrollTo(targetPosition);
        }
        
        sessionStorage.removeItem(`${key}-scroll-position`);
      }, delay);
    }
  }, [key, delay, behavior, duration, easing]);

  // Guardar posición antes de navegar
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(`${key}-scroll-position`, window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    
    const handleLinkClick = () => {
      setTimeout(saveScrollPosition, 0);
    };

    const links = document.querySelectorAll('a[href^="/"], button');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, [key]);

  const saveScrollPosition = () => {
    sessionStorage.setItem(`${key}-scroll-position`, window.scrollY.toString());
  };

  return { saveScrollPosition };
}