import { useEffect, useState } from 'react';
import { mockEvents } from '../data/mockEvents';
import type { Event } from '../types/event';

interface EventsState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

async function loadEvents(): Promise<Event[]> {
  return mockEvents;
}

export function useEvents(): EventsState {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const loadedEvents = await loadEvents();
        if (isActive) {
          setEvents(loadedEvents);
        }
      } catch (cause) {
        if (isActive) {
          setError(
            cause instanceof Error && cause.message.length > 0
              ? cause.message
              : 'Nie udało się wczytać wydarzeń. Spróbuj ponownie później.',
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isActive = false;
    };
  }, []);

  return { events, isLoading, error };
}
