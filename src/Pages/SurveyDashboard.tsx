import { useNavigate, useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import { useResetSurvey } from "../hooks/useResetSurvey"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton"
import { FallingLines } from "react-loader-spinner"
import { useState } from "react"
import { actionDetails } from "../utils/actionDetails"
import { useTheme } from "../Context/ThemeContext.tsx"

export function SurveyDashboard() {
    const { theme } = useTheme()
    const [openActionIndex, setOpenActionIndex] = useState<number | null>(null)

    const { survey_id } = useParams()
    const { survey, loading } = useSurvey(survey_id)

    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const { questions } = useSurveyTemplate(survey_template_id)
    const locale: "it" | "en" = "it"

    const { resetSurvey, loading: resetting } = useResetSurvey()
    const navigate = useNavigate()

    const toggleAction = (index: number) => {
        setOpenActionIndex(prev => (prev === index ? null : index))
    }

    if (loading || !survey) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${
                    theme === "dark" ? "bg-neutral-950" : "bg-white"
                }`}
            >
                <FallingLines color={theme === "dark" ? "#fff" : "#000"} width="150" visible />
            </div>
        )
    }

    const handleBookAppointment = () => {
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank")
        navigate("/survey")
    }

    const questionMap = new Map(questions.map(q => [q.id, q]))

    return (
        <main
            className={`flex flex-col ${
                theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-black"
            }`}
        >

            {/* HERO */}
            <section className="relative px-6 pt-24 pb-14">
                <div className="mx-auto max-w-6xl flex flex-col gap-12">
                    <span
                        className={`text-xs uppercase tracking-widest ${
                            theme === "dark" ? "text-white/40" : "text-black/40"
                        }`}
                    >
                        Digital Maturity Dashboard
                    </span>

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
                        <div>
                            <h1 className="text-4xl font-semibold">
                                Stato digitale attuale
                            </h1>
                            <p
                                className={`mt-4 max-w-xl ${
                                    theme === "dark" ? "text-white/60" : "text-black/60"
                                }`}
                            >
                                Analisi basata sulle risposte fornite. Il punteggio indica
                                il livello di controllo e strutturazione dei processi digitali.
                            </p>
                        </div>

                        <div
                            className={`rounded-3xl px-14 py-12 text-center border ${
                                theme === "dark"
                                    ? "bg-white/[0.05] border-white/10"
                                    : "bg-black/[0.03] border-black/10"
                            }`}
                        >
                            <div className="text-6xl font-semibold">
                                {survey.score}%
                            </div>
                            <div
                                className={`text-sm mt-3 ${
                                    theme === "dark" ? "text-white/50" : "text-black/50"
                                }`}
                            >
                                Digital Readiness Score
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIORITY ACTIONS */}
            <section
                className={`px-6 py-20 ${
                    theme === "dark" ? "bg-neutral-900/40" : "bg-neutral-100"
                }`}
            >
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-12">
                        Priorità operative
                    </h2>

                    <div className="space-y-8">
                        {Object.entries(actionDetails).map(([indexStr, detail]) => {
                            const index = Number(indexStr)
                            const isOpen = openActionIndex === index

                            return (
                                <div key={index} className="space-y-4">

                                    {/* HEADER */}
                                    <div
                                        className={`rounded-3xl p-8 border ${
                                            theme === "dark"
                                                ? "bg-white/[0.04] border-white/10"
                                                : "bg-black/[0.03] border-black/10"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-6">
                                                <span
                                                    className={`font-mono text-sm ${
                                                        theme === "dark"
                                                            ? "text-white/40"
                                                            : "text-black/40"
                                                    }`}
                                                >
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-lg font-medium">
                                                    {detail.title}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => toggleAction(index)}
                                                className={`text-sm cursor-pointer transition ${
                                                    theme === "dark"
                                                        ? "text-white/40 hover:text-white"
                                                        : "text-black/40 hover:text-black"
                                                }`}
                                            >
                                                {isOpen ? "Chiudi ↑" : "Approfondisci →"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* DETAIL */}
                                    <div
                                        className={`transition-all duration-700 overflow-hidden ${
                                            isOpen
                                                ? "max-h-[800px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div
                                            className={`rounded-3xl p-8 space-y-6 border ${
                                                theme === "dark"
                                                    ? "bg-white/[0.03] border-white/10"
                                                    : "bg-black/[0.02] border-black/10"
                                            }`}
                                        >
                                            <p
                                                className={`leading-relaxed ${
                                                    theme === "dark"
                                                        ? "text-white/70"
                                                        : "text-black/70"
                                                }`}
                                            >
                                                {detail.context}
                                            </p>

                                            <div>
                                                <h4
                                                    className={`text-sm uppercase tracking-wider mb-2 ${
                                                        theme === "dark"
                                                            ? "text-white/40"
                                                            : "text-black/40"
                                                    }`}
                                                >
                                                    Rischi
                                                </h4>
                                                <ul
                                                    className={`list-disc list-inside space-y-1 ${
                                                        theme === "dark"
                                                            ? "text-white/70"
                                                            : "text-black/70"
                                                    }`}
                                                >
                                                    {detail.risks.map((risk, i) => (
                                                        <li key={i}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4
                                                    className={`text-sm uppercase tracking-wider mb-2 ${
                                                        theme === "dark"
                                                            ? "text-white/40"
                                                            : "text-black/40"
                                                    }`}
                                                >
                                                    Azioni consigliate
                                                </h4>
                                                <ul
                                                    className={`list-disc list-inside space-y-1 ${
                                                        theme === "dark"
                                                            ? "text-white/70"
                                                            : "text-black/70"
                                                    }`}
                                                >
                                                    {detail.actions.map((action, i) => (
                                                        <li key={i}>{action}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div
                                                className={`pt-4 border-t ${
                                                    theme === "dark"
                                                        ? "border-white/10 text-white/80"
                                                        : "border-black/10 text-black/80"
                                                }`}
                                            >
                                                {detail.outcome}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* RESPONSE DETAIL */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-4xl space-y-8">
                    <h2
                        className={`text-xl font-semibold ${
                            theme === "dark" ? "text-white/60" : "text-black/60"
                        }`}
                    >
                        Dettaglio risposte
                    </h2>

                    {Object.entries(survey.answers).map(([questionId, answer], index) => {
                        const question = questionMap.get(questionId)

                        return (
                            <div
                                key={questionId}
                                className={`rounded-3xl p-8 border ${
                                    theme === "dark"
                                        ? "bg-white/[0.03] border-white/5"
                                        : "bg-black/[0.02] border-black/5"
                                }`}
                            >
                                <div className="flex gap-6 mb-4">
                                    <span
                                        className={`font-mono text-xs ${
                                            theme === "dark"
                                                ? "text-white/40"
                                                : "text-black/40"
                                        }`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-lg">
                                        {question?.text.it ?? "Domanda non disponibile"}
                                    </h3>
                                </div>

                                <div
                                    className={theme === "dark" ? "text-white/70" : "text-black/70"}
                                >
                                    {formatAnswer(answer)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-32 text-center">
                <div
                    className={`mx-auto max-w-4xl rounded-[40px] px-12 py-16 border ${
                        theme === "dark"
                            ? "bg-white/[0.05] border-white/10"
                            : "bg-black/[0.03] border-black/10"
                    }`}
                >
                    <h2 className="text-3xl font-semibold mb-4">
                        Vuoi migliorare questo punteggio?
                    </h2>
                    <p
                        className={`mb-10 ${
                            theme === "dark" ? "text-white/60" : "text-black/60"
                        }`}
                    >
                        Costruiamo una roadmap operativa personalizzata.
                    </p>
                    <LiquidGlassButton onClick={handleBookAppointment}>
                        Richiedi consulenza strategica
                    </LiquidGlassButton>
                </div>
            </section>

            {/* RESET */}
            <section
                className={`px-6 py-12 text-center ${
                    theme === "dark" ? "text-white/40" : "text-black/40"
                }`}
            >
                <button
                    className="hover:text-current cursor-pointer transition-all"
                    disabled={resetting}
                    onClick={async () => {
                        if (!survey_id) return
                        if (!window.confirm("Sei sicuro di voler resettare il survey?")) return
                        await resetSurvey(survey_id, survey_template_id, locale)
                        navigate("/survey")
                    }}
                >
                    {resetting ? "Resetting..." : "Reset Survey"}
                </button>
            </section>

        </main>
    )
}