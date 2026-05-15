import {useEffect, useState} from "react";
import type {Question} from "../types.ts";
import { useAuth } from "../auth/AuthContext.tsx";

export function useSurveyTemplate(templateId: string) {
    const { token } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!templateId) return;
        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/template/template/${templateId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then(res => {
                if (!res.ok) throw new Error(`Template non trovato (${res.status})`)
                return res.json()
            })
            .then(data => {
                setQuestions(data.questions)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [templateId, token])

    return { questions, loading, error }
}