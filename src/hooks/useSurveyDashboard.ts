import { useEffect, useState } from "react";
import type {SurveyDashboardStats} from "../types/DashboardResponses.ts";
import {useAuth} from "../auth/AuthContext.tsx";

export function useSurveyDashboard() {
    const [data, setData] = useState<SurveyDashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dashboard_base_url = import.meta.env.VITE_DASHBOARD_BASE_URL

    const {token} = useAuth()

    useEffect(() => {
        const fetchSurveyDashboard = async () => {
            try {

                const res = await fetch(`${dashboard_base_url}/v1/dashboard/surveys_info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Errore caricamento survey");

                const json = await res.json();
                setData(json);
            } catch (err) {
                setError("Errore nel recupero dati survey");
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyDashboard();
    }, []);

    return { data, loading, error };
}
