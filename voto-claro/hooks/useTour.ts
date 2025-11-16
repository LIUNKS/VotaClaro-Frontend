import { useState, useEffect, useCallback } from 'react';
import { Step, CallBackProps } from 'react-joyride';

const TOUR_STORAGE_KEY = 'voto-claro-tour-completed';

export interface TourStep extends Step {
  target: string;
  content: React.ReactNode;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disableBeacon?: boolean;
  hideBackButton?: boolean;
  hideCloseButton?: boolean;
}

export function useTour() {
  const [runTour, setRunTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    try {
      const hasCompletedTour = localStorage.getItem(TOUR_STORAGE_KEY);
      if (!hasCompletedTour) {
        setTimeout(() => setRunTour(true), 2000);
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }
  }, [isClient]);

  const handleTourCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (type === 'step:after') {
      if (action === 'next') {
        setTourStep(index + 1);
      } else if (action === 'prev') {
        setTourStep(index - 1);
      }
    }

    if (status === 'finished' || status === 'skipped' || action === 'close') {
      setRunTour(false);
      setTourStep(0);
      if (isClient) {
        try {
          localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        } catch (error) {
          console.warn('Error setting localStorage:', error);
        }
      }
    }
  };

  const startTour = useCallback(() => {
    if (!isClient) return;
    setTourStep(0);
    setRunTour(true);
  }, [isClient]);

  const resetTour = useCallback(() => {
    if (!isClient) return;
    try {
      localStorage.removeItem(TOUR_STORAGE_KEY);
      startTour();
    } catch (error) {
      console.warn('Error resetting tour:', error);
    }
  }, [isClient, startTour]);

  return {
    runTour: isClient && runTour,
    tourStep,
    handleTourCallback,
    startTour,
    resetTour,
    isClient,
  };
}