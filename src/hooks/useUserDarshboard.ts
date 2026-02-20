import { useEffect, useState } from "react";
import type {UsersDashboardStats} from "../types/DashboardResponses.ts";
import {useAuth} from "../auth/AuthContext.tsx";

export function useUsersDashboard() {
    const [data, setData] = useState<UsersDashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dashboard_base_url = import.meta.env.VITE_DASHBOARD_BASE_URL
    const {token} = useAuth()

    useEffect(() => {
        const fetchUsersDashboard = async () => {
            try {

                const res = await fetch(`${dashboard_base_url}/v1/dashboard/users_info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Errore caricamento utenti");

                const json = await res.json();
                setData(json);
            } catch (err) {
                setError("Errore nel recupero dati utenti");
            } finally {
                setLoading(false);
            }
        };

        fetchUsersDashboard();
    }, []);

    return { data, loading, error };
}
