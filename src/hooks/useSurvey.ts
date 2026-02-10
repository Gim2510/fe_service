import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export type SurveyInstance = {
    _id: string;
    templateId: string;
    answers: Record<string, any>;
    status: "draft" | "published";
    currentStep?: number;
};

export function useSurvey(surveyId: string | undefined) {
    const { token } = useAuth();
    const [survey, setSurvey] = useState<SurveyInstance | null>(null);
    const [loading, setLoading] = useState(!!surveyId);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!surveyId || !token) return;

        setLoading(true);

        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/get_survey/${surveyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Errore recupero survey: ${res.status}`);
                return res.json();
            })
            .then(data => setSurvey(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [surveyId, token]);

    return { survey, loading, error };
}
