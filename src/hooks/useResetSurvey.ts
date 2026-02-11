import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export function useResetSurvey() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetSurvey = async (
        surveyId: string,
        templateId: string,
        locale: "it" | "en"
    ) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/reset/${surveyId}/${templateId}/${locale}`,
                {
                    method: "GET", // ⚠️ importante se è un reset
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Errore reset survey: ${response.status}`);
            }

            return await response.json();
        } catch (err: any) {
            setError(err.message || "Errore sconosciuto");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { resetSurvey, loading, error };
}
