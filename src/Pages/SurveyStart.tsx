import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { useUserSurvey } from "../hooks/useUserSurvey"
import { useSurvey } from "../hooks/useSurvey"
import { useInitSurvey } from "../hooks/useInitSurvey"

export function SurveyStart() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const templateId = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const locale: "it" = "it"

    const { surveyId, loading: loadingSurveyId } = useUserSurvey()
    const { survey, loading: loadingSurvey } = useSurvey(surveyId)

    const [shouldInit, setShouldInit] = useState(false)

    const { surveyId: newSurveyId, loading: initLoading } =
        useInitSurvey(templateId, locale, shouldInit)

    // Redirect logic (single source of truth)
    useEffect(() => {
        if (loadingSurveyId || loadingSurvey) return

        // Existing survey
        if (survey) {
            if (survey.status === "published") {
                navigate(`/survey/${survey._id}/recap`)
            } else {
                navigate("/survey")
            }
        }

        // Newly initialized survey
        if (newSurveyId) {
            navigate("/survey")
        }
    }, [
        survey,
        newSurveyId,
        loadingSurvey,
        loadingSurveyId,
        navigate,
    ])

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <button
                    onClick={() => navigate("/register")}
                    className="px-12 py-5 rounded-2xl bg-slate-100 text-slate-900 text-lg"
                >
                    Registrati per iniziare
                </button>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center px-6">
            <section className="max-w-4xl mx-auto space-y-12">
                <h1 className="text-5xl font-light leading-tight">
                    Inizia la tua analisi
                </h1>

                <p className="text-xl text-slate-400 max-w-3xl">
                    Il questionario consente di raccogliere informazioni strutturate
                    e avviare un processo di analisi mirato.
                </p>

                <button
                    onClick={() => setShouldInit(true)}
                    disabled={initLoading}
                    className="
                        px-12 py-5 rounded-2xl
                        bg-indigo-500 text-white text-lg font-medium
                        hover:bg-indigo-400 transition
                        disabled:opacity-50
                    "
                >
                    {initLoading
                        ? "Preparazione in corso…"
                        : "Vai al questionario"}
                </button>
            </section>
        </main>
    )
}
