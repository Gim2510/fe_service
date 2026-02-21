import { useNavigate, useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import { useResetSurvey } from "../hooks/useResetSurvey.ts"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx";

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
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
        navigate('/survey')
    };

    const questionMap = new Map(questions.map(q => [q.id, q]))

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
        <main className="flex flex-col bg-neutral-950 text-white">

            {/* HERO DASHBOARD */}
            <section className="relative px-6 py-24 overflow-hidden">

                {/* Liquid atmosphere */}
                <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px]
                bg-gradient-to-br from-white/10 via-white/5 to-transparent
                rounded-full blur-3xl opacity-30 pointer-events-none" />

                <div className="relative mx-auto max-w-6xl flex flex-col gap-12">

                    <span className="text-xs uppercase tracking-widest text-white/40">
                        Digital Maturity Dashboard
                    </span>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

                        <div>
                            <h1 className="text-4xl font-semibold leading-tight">
                                Stato digitale attuale
                            </h1>
                            <p className="mt-4 text-white/60 max-w-xl">
                                Analisi sintetica basata sulle risposte fornite.
                                Il punteggio rappresenta il livello attuale di
                                strutturazione e controllo dei processi digitali.
                            </p>
                        </div>

                        {/* SCORE PANEL */}
                        <div className="relative bg-white/[0.05] backdrop-blur-2xl
                        border border-white/10
                        rounded-[32px] px-14 py-12
                        shadow-[0_40px_120px_rgba(0,0,0,0.6)]
                        overflow-hidden">

                            <div className="absolute inset-0 rounded-[32px]
                            bg-gradient-to-br from-white/10 to-transparent
                            opacity-40 pointer-events-none" />

                            <div className="relative text-center">
                                <div className="text-6xl font-semibold">
                                    {maturityScore}%
                                </div>
                                <div className="text-white/50 text-sm mt-3">
                                    Digital Readiness Score
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIORITY ACTIONS */}
            <section className="px-6 py-20 bg-neutral-900/40 backdrop-blur-xl">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-12">
                        Priorità operative
                    </h2>

                    <div className="space-y-8">
                        {priorityActions.map((action, index) => (
                            <div
                                key={index}
                                className="relative bg-white/[0.04] backdrop-blur-xl
                                border border-white/10
                                hover:border-white/20
                                rounded-3xl p-8 transition-all duration-500
                                overflow-hidden"
                            >
                                <div className="absolute inset-0 rounded-3xl
                                opacity-0 hover:opacity-100
                                transition duration-700
                                bg-gradient-to-br from-white/10 to-transparent
                                pointer-events-none" />

                                <div className="relative flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <span className="text-white/40 font-mono text-sm">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-lg">{action}</span>
                                    </div>

                                    <button className="text-sm text-white/40 hover:text-white transition">
                                        Approfondisci →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RESPONSE DETAIL */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-semibold mb-10 text-white/60">
                        Dettaglio risposte
                    </h2>

                    <div className="space-y-8">
                        {Object.entries(survey.answers).map(([questionId, answer], index) => {
                            const question = questionMap.get(questionId)
                            return (
                                <div
                                    key={questionId}
                                    className="relative bg-white/[0.03] backdrop-blur-xl
                                    border border-white/5
                                    rounded-3xl p-8 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br
                                    from-white/5 to-transparent opacity-50
                                    pointer-events-none rounded-3xl" />

                                    <div className="relative">
                                        <div className="flex items-baseline gap-6 mb-4">
                                            <span className="text-white/40 text-xs font-mono">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-lg font-medium">
                                                {question?.text.it ?? "Domanda non disponibile"}
                                            </h3>
                                        </div>
                                        <div className="text-white/70">
                                            {formatAnswer(answer)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* NEXT STEP CTA */}
            <section className="relative px-6 py-32 overflow-hidden">

                <div className="absolute inset-0 flex justify-center pointer-events-none">
                    <div className="w-[700px] h-[700px]
                    bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)]
                    blur-3xl opacity-40" />
                </div>

                <div className="relative mx-auto max-w-4xl
                bg-white/[0.05] backdrop-blur-2xl
                border border-white/10
                rounded-[40px] px-12 py-16
                text-center shadow-[0_40px_120px_rgba(0,0,0,0.5)]">

                    <h2 className="text-3xl font-semibold mb-4">
                        Vuoi migliorare questo punteggio?
                    </h2>

                    <p className="text-white/60 mb-10">
                        Possiamo costruire insieme una roadmap operativa personalizzata
                        per trasformare il potenziale digitale in vantaggio competitivo reale.
                    </p>

                    <LiquidGlassButton onClick={handleBookAppointment}>
                        Richiedi consulenza strategica
                    </LiquidGlassButton>
                </div>
            </section>

            {/* RESET */}
            <section className="px-6 py-12 text-center text-white/40">
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