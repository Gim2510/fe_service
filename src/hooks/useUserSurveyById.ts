import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { SurveyInstance } from "./useSurvey.ts";

export function useUserSurveyById(userId: string) {
    const { token } = useAuth();
    const [survey, setSurvey] = useState<SurveyInstance | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || !token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setSurvey(null);

        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/survey/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                if (res.status === 404) return null;
                if (!res.ok) throw new Error(`Errore nel recupero survey: ${res.status}`);
                return res.json();
            })
            .then(async (data) => {
                console.log("Survey API raw response:", data);
                if (!data) {
                    setSurvey(null);
                    return;
                }

                let surveyId: string | undefined;
                let maybeSurvey: SurveyInstance | null = null;

                if (Array.isArray(data)) {
                    surveyId = data[0]?._id || data[0];
                } else if (typeof data === "string") {
                    surveyId = data;
                } else if (data.score !== undefined) {
                    maybeSurvey = data as SurveyInstance;
                } else {
                    surveyId = data._id || data.surveyId || data.id;
                }

                if (maybeSurvey) {
                    setSurvey(maybeSurvey);
                    return;
                }

                if (!surveyId) {
                    setSurvey(null);
                    return;
                }

                const surveyRes = await fetch(
                    `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/get_survey/${surveyId}`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                if (!surveyRes.ok) throw new Error(`Errore recupero survey: ${surveyRes.status}`);
                const surveyData = await surveyRes.json();
                setSurvey(surveyData);
            })
            .catch((err) => {
                console.error("useUserSurveyById error:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [userId, token]);

    return { survey, loading, error };
}
