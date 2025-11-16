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

<<<<<<< HEAD
  useEffect(() => {
    const loadEvents = () => {
      try {
        setEvents(electoralData.electoralEvents as ElectoralEvent[]);
      } catch (error) {
        console.error('Error loading electoral events:', error);
      } finally {
        setLoading(false);
      }
    };
=======
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
>>>>>>> f3b52e37755c7d893d311c83c3066560295fc6ac

		loadEvents();
	}, []);

	return { events, loading };
}