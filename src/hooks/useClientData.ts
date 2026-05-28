import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { Client } from "../types/clientTypes.ts";

const BASE_URL: string =
  (import.meta as Record<string, unknown> & { env: Record<string, string> }).env.VITE_CLIENT_BASE_URL ||
  "http://localhost:3010";

export function useClientData() {
  const { token, id } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClient = useCallback(async () => {
    if (!token || !id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/v1/client/by-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Errore: ${res.status}`);
      const data: Client = await res.json();
      setClient(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Errore sconosciuto";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  return { client, loading, error, refetch: fetchClient };
}
