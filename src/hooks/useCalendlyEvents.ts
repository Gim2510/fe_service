import { useState, useEffect, useCallback } from "react";

interface CalendlyInvitee {
  name: string;
  email: string;
  questions_and_answers?: { question: string; answer: string }[];
}

interface CalendlyEvent {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
  status: "active" | "canceled" | "rescheduled";
  location?: { type: string; location?: string };
  invitees: CalendlyInvitee[];
  event_type?: string;
  created_at: string;
  updated_at: string;
}

interface UseCalendlyEventsReturn {
  events: CalendlyEvent[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DASHBOARD_BASE_URL = import.meta.env.VITE_DASHBOARD_BASE_URL || "http://localhost:3006";

export function useCalendlyEvents(from?: string, to?: string): UseCalendlyEventsReturn {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token") || "";
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const res = await fetch(
        `${DASHBOARD_BASE_URL}/v1/dashboard/calendly/events?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setEvents(json.events || []);
    } catch (err: any) {
      setError(err.message || "Errore nel recupero eventi");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refresh: fetchEvents };
}
