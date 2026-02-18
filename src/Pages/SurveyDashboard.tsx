import { useNavigate, useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import { useResetSurvey } from "../hooks/useResetSurvey.ts"

export function SurveyDashboard() {
    const { survey_id } = useParams()
    const { survey, loading } = useSurvey(survey_id)
    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const { questions } = useSurveyTemplate(survey_template_id)
    const locale: "it" | "en" = "it"
    const { resetSurvey, loading: resetting } = useResetSurvey()
    const navigate = useNavigate()

    if (loading || !survey) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-400">
                Preparing dashboard…
            </div>
        )
    }

    const handleBookAppointment = () => {
        window.open(
            import.meta.env.VITE_CALENDLY_URL,
            "_blank"
        );
        navigate('/survey')

    };

    const questionMap = new Map(
        questions.map(q => [q.id, q])
    )

    // --- MVP SCORE LOGIC (placeholder) ---
    const maturityScore = Math.min(
        100,
        Object.values(survey.answers).length * 5
    )

    const priorityActions = [
        "Formalizzare policy di sicurezza IT",
        "Implementare sistema di backup automatico",
        "Centralizzare gestione documentale",
    ]

    return (
        <main className="flex flex-col">

            {/* HERO DASHBOARD */}
            <section className="bg-neutral-950 text-white px-6 py-20">
                <div className="mx-auto max-w-6xl flex flex-col gap-8">
                    <span className="text-xs uppercase tracking-widest text-neutral-400">
                        Digital Maturity Dashboard
                    </span>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-semibold leading-tight">
                                Stato digitale attuale
                            </h1>
                            <p className="mt-3 text-neutral-400 max-w-xl">
                                Analisi sintetica basata sulle risposte fornite.
                                Questo punteggio rappresenta il livello attuale di
                                strutturazione dei processi digitali.
                            </p>
                        </div>

                        {/* SCORE CARD */}
                        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-3xl px-10 py-8 text-center shadow-xl">
                            <div className="text-5xl font-semibold">
                                {maturityScore}%
                            </div>
                            <div className="text-neutral-400 text-sm mt-2">
                                Digital Readiness Score
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIORITY ACTIONS */}
            <section className="bg-neutral-900 text-white px-6 py-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-10">
                        Priorità operative
                    </h2>

                    <div className="space-y-6">
                        {priorityActions.map((action, index) => (
                            <div
                                key={index}
                                className="bg-neutral-800/40 hover:bg-neutral-800/60 transition rounded-2xl p-6 flex justify-between items-center"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-indigo-400 font-mono text-sm">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-lg">{action}</span>
                                </div>
                                <button className="text-sm text-neutral-400 hover:text-white transition">
                                    Approfondisci →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RESPONSE DETAIL (SECONDARY) */}
            <section className="bg-neutral-950 text-white px-6 py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-semibold mb-8 text-neutral-300">
                        Dettaglio risposte
                    </h2>

                    <div className="space-y-6">
                        {Object.entries(survey.answers).map(([questionId, answer], index) => {
                            const question = questionMap.get(questionId)
                            return (
                                <div
                                    key={questionId}
                                    className="bg-neutral-800/40 rounded-2xl p-6"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className="text-indigo-400 text-xs font-mono">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-lg font-medium">
                                            {question?.text.it ?? "Domanda non disponibile"}
                                        </h3>
                                    </div>
                                    <div className="text-neutral-300">
                                        {formatAnswer(answer)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* NEXT STEP CTA */}
            <section className="bg-neutral-900 text-white px-6 py-20 text-center">
                <h2 className="text-3xl font-semibold mb-4">
                    Vuoi migliorare questo punteggio?
                </h2>
                <p className="text-neutral-400 mb-8">
                    Possiamo costruire insieme una roadmap operativa personalizzata.
                </p>

                <button
                    onClick={handleBookAppointment}
                    className="group relative px-10 cursor-pointer hover:text-white py-4 rounded-full bg-white text-neutral-900 font-medium overflow-hidden hover:scale-105 transition"
                >
                    <span className="relative z-10">
                        Richiedi consulenza strategica
                    </span>
                    <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
            </section>

            {/* RESET SECONDARIO */}
            <section className="bg-neutral-950 text-neutral-500 px-6 py-10 text-center">
                <button
                    onClick={async () => {
                        if (!survey_id) return
                        const confirmReset = window.confirm("Sei sicuro di voler resettare il survey?")
                        if (!confirmReset) return
                        await resetSurvey(survey_id, survey_template_id, locale)
                        navigate("/survey")
                    }}
                    disabled={resetting}
                    className="text-sm hover:text-white transition cursor-pointer"
                >
                    {resetting ? "Resetting..." : "Reset Survey"}
                </button>
            </section>
        </main>
    )
}
