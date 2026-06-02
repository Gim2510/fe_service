import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { Task, TaskPriority } from "../types/clientTypes.ts";

const BASE_URL: string =
  (import.meta as any).env.VITE_CLIENT_BASE_URL ||
  "http://localhost:3010";

export function useProjectTasks(projectId: string | null) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!token || !projectId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/v1/task/by-project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Errore: ${res.status}`);
      const data: Task[] = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Errore sconosciuto";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (payload: {
      title: string;
      description?: string;
      priority: TaskPriority;
      start_date?: string;
      deadline?: string;
    }) => {
      if (!token || !projectId) throw new Error("Autenticazione richiesta");
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/v1/task/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload, project_id: projectId, status: "backlog" }),
        });
        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const created: Task = await res.json();
        setTasks((prev) => [...prev, created]);
        return created;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Errore sconosciuto";
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, projectId],
  );

  const updateTask = useCallback(
    async (taskId: string, payload: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "start_date" | "deadline">>) => {
      if (!token) throw new Error("Autenticazione richiesta");
      try {
        const res = await fetch(`${BASE_URL}/v1/task/${taskId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const updated: Task = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
        return updated;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Errore sconosciuto";
        setError(msg);
        throw err;
      }
    },
    [token],
  );

  const addComment = useCallback(
    async (taskId: string, text: string) => {
      if (!token) throw new Error("Autenticazione richiesta");
      try {
        const res = await fetch(`${BASE_URL}/v1/task/${taskId}/comment`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const updated: Task = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
        return updated;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Errore sconosciuto";
        setError(msg);
        throw err;
      }
    },
    [token],
  );

  return { tasks, loading, error, createTask, updateTask, addComment, refetch: fetchTasks };
}
