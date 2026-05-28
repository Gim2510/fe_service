import { useAuth } from "../auth/AuthContext.tsx";
import { useState } from "react";

export function useInitSurvey() {
    const { id, token } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initSurvey = async (
        templateId: string,
        locale: "it" | "en",
        surveyType?: string,
    ): Promise<string | undefined> => {
        if (!id || !token) return undefined;

        setLoading(true);
        setError(null);

        try {
            const qs = surveyType ? `?survey_type=${encodeURIComponent(surveyType)}` : '';
            const res = await fetch(
                `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/init/${id}/${templateId}/${locale}${qs}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) {
                throw new Error(`Init failed: ${res.status}`);
            }

            const data = await res.json();
            return data._id ?? null;

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return { initSurvey, loading, error };
}