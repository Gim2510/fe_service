import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import type { SurveyInstance } from "./useSurvey.ts";

export type UserSurveyEntryWithData = {
    surveyId: string;
    surveyType: string;
    status: string;
    survey?: SurveyInstance;
};

export function useUserSurveyById(userId: string) {
    const { token } = useAuth();
    const [surveys, setSurveys] = useState<UserSurveyEntryWithData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || !token) { setLoading(false); return; }
        setLoading(true);
        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/survey/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async res => { if (!res.ok) throw new Error(`Error: ${res.status}`); return res.json(); })
            .then(async (data) => {
                if (!data) { setSurveys([]); return; }
                let entries: { id: string; type: string; status?: string }[] = [];
                if (Array.isArray(data)) {
                    entries = data.map((s: any) => ({ id: s._id || s, type: s.survey_type || 'diagnostic', status: s.status }));
                } else if (typeof data === 'object' && data._id) {
                    entries = [{ id: data._id, type: data.survey_type || 'diagnostic', status: data.status }];
                }
                const results = await Promise.all(entries.map(async e => {
                    try {
                        const r = await fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/get_survey/${e.id}`, { headers: { Authorization: `Bearer ${token}` } });
                        if (!r.ok) throw new Error('fail');
                        return { surveyId: e.id, surveyType: e.type, status: e.status || 'draft', survey: await r.json() };
                    } catch { return { surveyId: e.id, surveyType: e.type, status: e.status || 'draft' }; }
                }));
                setSurveys(results);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [userId, token]);

    const mainSurvey = surveys.find(s => s.surveyType === 'diagnostic')?.survey ?? null;
    return { survey: mainSurvey, surveys, loading, error };
}
