import {useAuth} from "../auth/AuthContext.tsx";
import {useEffect, useRef, useState} from "react";

export function useInitSurvey(
    templateId: string,
    locale: "it" | "en",
    enabled: boolean
) {
    const { id, token } = useAuth();

    const [surveyId, setSurveyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!enabled) return;
        if (!id || !token) return;
        if (hasInitialized.current) return;

        hasInitialized.current = true;
        setLoading(true);

        fetch(
            `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/init/${id}/${templateId}/${locale}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then(res => {
                if (!res.ok) throw new Error(`Init failed: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setSurveyId(data._id ?? null);
            })
            .catch(err => {
                hasInitialized.current = false; // allow retry if needed
                setError(err.message);
            })
            .finally(() => setLoading(false));

    }, [enabled, id, token, templateId, locale]);

    return { surveyId, loading, error };
}

