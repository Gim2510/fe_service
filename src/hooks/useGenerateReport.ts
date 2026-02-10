import { useState } from "react"
import {useAuth} from "../auth/AuthContext.tsx";

export function useGenerateSurveyReport(surveyId: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const { token } = useAuth();

    const to = import.meta.env.VITE_SURVEY_REPORT_TO_EMAIL

    const generateReport = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(
                `${import.meta.env.VITE_REPORT_BASE_URL}/v1/report/generate_report/${surveyId}/${to}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message ?? "Errore nella generazione del report")
            }

            setSuccess(true)
        } catch (e) {
            setError(e instanceof Error ? e.message : "Errore sconosciuto")
        } finally {
            setLoading(false)
        }
    }

    return {
        generateReport,
        loading,
        error,
        success,
    }
}
