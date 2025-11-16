'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface TourConfig {
  onStartTour?: () => void;
  showTourButton?: boolean;
}

interface TourContextValue extends TourConfig {
  setTourConfig: (config: TourConfig) => void;
}

const defaultConfig: TourContextValue = {
	showTourButton: false,
	setTourConfig: () => undefined,
};

const TourContext = createContext<TourContextValue>(defaultConfig);

export function TourProvider({ children }: { children: ReactNode }) {
	const [config, setConfig] = useState<TourConfig>({ showTourButton: false });

	const value = useMemo(() => ({
		onStartTour: config.onStartTour,
		showTourButton: Boolean(config.showTourButton),
		setTourConfig: setConfig,
	}), [config]);

	return (
		<TourContext.Provider value={value}>
			{children}
		</TourContext.Provider>
	);
}

export function useTourContext() {
	return useContext(TourContext);
}

export type { TourConfig, TourContextValue };
