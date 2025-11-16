'use client';

import { useState, useEffect } from 'react';
import electoralData from '@/calendario.json';

export interface ElectoralEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  type: 'announcement' | 'registration' | 'deadline' | 'voting' | 'campaign';
  category: 'all' | 'voters' | 'members' | 'organizations';
  icon: string;
  color: string;
}

export function useElectoralEvents() {
	const [events, setEvents] = useState<ElectoralEvent[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadEvents = () => {
			try {
				setEvents(electoralData.electoralEvents);
			} catch (error) {
				console.error('Error loading electoral events:', error);
			} finally {
				setLoading(false);
			}
		};

		loadEvents();
	}, []);

	return { events, loading };
}