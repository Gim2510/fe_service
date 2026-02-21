import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { useUserSurvey } from "../hooks/useUserSurvey"
import { useSurvey } from "../hooks/useSurvey"
import { useInitSurvey } from "../hooks/useInitSurvey"
import {LiquidGlassButton} from "../Components/Buttons/LiquidGlassButton.tsx";

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

    // Redirect logic
    useEffect(() => {
        if (loadingSurveyId || loadingSurvey) return

        if (survey) {
            if (survey.status === "published") {
                navigate(`/survey/${survey._id}/recap`)
            } else {
                navigate("/survey")
            }
        }

        if (newSurveyId) {
            navigate("/survey")
        }
    }, [survey, newSurveyId, loadingSurvey, loadingSurveyId, navigate])

    // ---------------------------------------
    // UNAUTHENTICATED VIEW
    // ---------------------------------------
    if (!isAuthenticated) {
        return (
            <main className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden">
                {/* Background gradient + subtle grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

                <LiquidGlassButton to='/register'>
                    Registrati per iniziare
                </LiquidGlassButton>
            </main>
        )
    }

    // ---------------------------------------
    // AUTHENTICATED VIEW
    // ---------------------------------------
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden px-6">

            {/* Background gradient + subtle texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <section className="relative z-10 max-w-4xl text-center space-y-10">
                <h1 className="text-5xl font-light leading-tight">
                    Inizia la tua analisi
                </h1>

                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                    Raccogli informazioni strutturate e avvia un processo di analisi mirato.
                    Ottieni subito una panoramica chiara del livello di maturità digitale della tua azienda.
                </p>
                <LiquidGlassButton onClick={() => setShouldInit(true)} disabled={initLoading}>{initLoading ? "Preparazione in corso..." : "Vai al questionario"}</LiquidGlassButton>

                {initLoading && (
                    <p className="text-sm text-neutral-400 mt-2">
                        Sto preparando il questionario, attendi qualche secondo…
                    </p>
                )}
            </section>
        </main>
    )
}
