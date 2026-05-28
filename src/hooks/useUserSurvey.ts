import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { UserSurveyEntry } from "../types/survey.ts";

export function useUserSurvey() {
    const { id, token } = useAuth();
    const [allSurveys, setAllSurveys] = useState<UserSurveyEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        if (!id || !token) return;
        setLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/survey/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Errore nel recupero survey: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setAllSurveys((data as Array<Record<string, unknown>>).map((s) => ({
                        surveyId: String(s._id || s),
                        surveyType: String(s.survey_type || 'diagnostic'),
                        status: String(s.status || 'draft'),
                    })));
                } else if (typeof data === 'string') {
                    setAllSurveys([{ surveyId: data, surveyType: 'diagnostic' }]);
                } else if (data && typeof data === 'object' && '_id' in data) {
                    setAllSurveys([{
                        surveyId: String((data as Record<string, unknown>)._id),
                        surveyType: String((data as Record<string, unknown>).survey_type || 'diagnostic'),
                    }]);
                } else {
                    setAllSurveys([]);
                }
            })
            .catch(() => setAllSurveys([]))
            .finally(() => setLoading(false));
    }, [id, token, retry]);

    const diagnosticSurvey = allSurveys.find(s => s.surveyType === 'diagnostic');
    const surveyId = diagnosticSurvey?.surveyId;

    const findSurveyByType = (type: string) =>
        allSurveys.find(s => s.surveyType === type);

    return { surveyId, allSurveys, findSurveyByType, loading, refetch: () => setRetry(r => r + 1) };
}
