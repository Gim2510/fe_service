import {useEffect, useState} from "react";
import type {Question} from "../types.ts";

export function useSurveyTemplate(templateId: string) {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/template/template/${templateId}`)
            .then(res => {
                if (!res.ok) throw new Error("Template non trovato")
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
    }, [templateId])

    return { questions, loading, error }
}