import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { Project } from "../types/clientTypes.ts";

const BASE_URL: string =
  (import.meta as any).env.VITE_CLIENT_BASE_URL ||
  "http://localhost:3010";

export function useProjects(clientId: string | null) {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!token || !clientId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/v1/project/by-client/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Errore: ${res.status}`);
      const data: Project[] = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Errore sconosciuto";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, clientId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}
