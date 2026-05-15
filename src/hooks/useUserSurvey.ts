import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export function useUserSurvey() {
    const { id, token } = useAuth();
    const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        if (!id || !token) return;
        console.log(id)
        setLoading(true);
        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/survey/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Errore nel recupero surveyId: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log("user survey fetch", data);
                setSurveyId(data ?? null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, token, retry]);

    return { surveyId, loading, error, refetch: () => setRetry(r => r + 1) };
}
