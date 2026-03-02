import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { useUserSurvey } from "../hooks/useUserSurvey"
import { useSurvey } from "../hooks/useSurvey"
import { useInitSurvey } from "../hooks/useInitSurvey"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx"
import { FallingLines } from "react-loader-spinner"
import { useTheme } from "../Context/ThemeContext.tsx"

export function SurveyStart() {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { isAuthenticated, emailVer } = useAuth()

    const templateId = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const locale: "it" = "it"

    const { surveyId, loading: loadingSurveyId } = useUserSurvey()
    const { survey, loading: loadingSurvey } = useSurvey(surveyId)

    const [shouldInit, setShouldInit] = useState(false)

    const { surveyId: newSurveyId, loading: initLoading } =
        useInitSurvey(templateId, locale, shouldInit)

    // ---------------------------------------
    // REDIRECT LOGIC
    // ---------------------------------------
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
            <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

                {/* Background */}
                <div
                    className={`absolute inset-0 ${
                        theme === "dark"
                            ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800"
                            : "bg-white"
                    }`}
                />

                {/* Grid texture */}
                <div
                    className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                        theme === "dark"
                            ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                            : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                    }`}
                />

                <LiquidGlassButton to="/register">
                    Registrati per iniziare
                </LiquidGlassButton>
            </main>
        )
    }

    // ---------------------------------------
    // AUTHENTICATED VIEW
    // ---------------------------------------
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

            {/* Background */}
            <div
                className={`absolute inset-0 ${
                    theme === "dark"
                        ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800"
                        : "bg-white"
                }`}
            />

            {/* Grid texture */}
            <div
                className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                    theme === "dark"
                        ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                        : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                }`}
            />

            <section
                className={`relative z-10 max-w-4xl text-center space-y-10 ${
                    theme === "dark" ? "text-white" : "text-black"
                }`}
            >
                <h1 className="text-5xl font-light leading-tight">
                    Inizia la tua analisi
                </h1>

                <p
                    className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                    }`}
                >
                    Raccogli informazioni strutturate e avvia un processo di analisi mirato.
                    Ottieni subito una panoramica chiara del livello di maturità digitale
                    della tua azienda.
                </p>

                {emailVer ? (
                    <LiquidGlassButton
                        onClick={() => setShouldInit(true)}
                        disabled={initLoading}
                    >
                        {initLoading ? (
                            <FallingLines width="50" color="#fff" visible />
                        ) : (
                            "Vai al questionario"
                        )}
                    </LiquidGlassButton>
                ) : (
                    <LiquidGlassButton disabled>
                        Verifica la tua email
                    </LiquidGlassButton>
                )}

                {initLoading && (
                    <FallingLines width="100" color="#fff" visible />
                )}
            </section>
        </main>
    )
}