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

type DashboardTab =
    | "overview"
    | "actions"
    | "answers"
    | "cta"

export function SurveyDashboard() {

    const { theme } = useTheme()
    const navigate = useNavigate()

    const { survey_id } = useParams()
    const { survey, loading } = useSurvey(survey_id)

    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const { questions } = useSurveyTemplate(survey_template_id)

    const { resetSurvey, loading: resetting } = useResetSurvey()

    const [activeTab, setActiveTab] = useState<DashboardTab>("overview")
    const [openActionIndex, setOpenActionIndex] = useState<number | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const locale: "it" | "en" = "it"

    if (loading || !survey) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-neutral-950" : "bg-white"}`}>
                <FallingLines color={theme === "dark" ? "#fff" : "#000"} width="150" visible />
            </div>
        )
    }

    const handleBookAppointment = () => {
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank")
        navigate("/survey")
    }

    const toggleAction = (index: number) => {
        setOpenActionIndex(prev => (prev === index ? null : index))
    }

    const questionMap = new Map(questions.map(q => [q.id, q]))
    const answerEntries = Object.entries(survey.answers)

    const totalAnswers = answerEntries.length

    const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, totalAnswers - 1))
    const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0))
    const goTo = (index: number) => setCurrentIndex(index)

    const [currentQuestionId, currentAnswer] = answerEntries[currentIndex]
    const currentQuestion = questionMap.get(currentQuestionId)

    const isDark = theme === "dark"

    const glassCard = isDark
        ? "bg-white/[0.04] border-white/10"
        : "bg-black/[0.03] border-black/10"

    return (
        <main className={`min-h-screen ${isDark ? "bg-neutral-950 text-white" : "bg-white text-black"}`}>

            {/* HERO */}

            <section className="px-6 pt-24 pb-12">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

                    <div>
                        <span className={`text-xs uppercase tracking-widest ${isDark ? "text-white/40" : "text-black/40"}`}>
                            Digital Maturity Dashboard
                        </span>

                        <h1 className="text-4xl font-semibold mt-4">
                            Stato digitale attuale
                        </h1>

                        <p className={`mt-4 max-w-xl ${isDark ? "text-white/60" : "text-black/60"}`}>
                            Analisi basata sulle risposte fornite. Il punteggio indica il livello
                            di controllo e strutturazione dei processi digitali.
                        </p>
                    </div>

                    <div className={`rounded-3xl px-14 py-12 text-center border ${glassCard}`}>
                        <div className="text-6xl font-semibold">
                            {survey.score}%
                        </div>
                        <div className={`text-sm mt-3 ${isDark ? "text-white/50" : "text-black/50"}`}>
                            Digital Readiness Score
                        </div>
                    </div>

                </div>
            </section>

            {/* TABS */}

            <section className="px-6 pb-10 overflow-auto">
                <div className="max-w-6xl mx-auto flex gap-3 overflow-auto">

                    <LiquidGlassButton
                        variant="navbar"
                        scale={false}
                        onClick={() => setActiveTab("overview")}
                        className={`${activeTab === "overview" ? "!bg-black/30 text-black !border-black/10" : "!border-black/30"}`}
                    >
                        Overview
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        variant="navbar"
                        scale={false}
                        onClick={() => setActiveTab("actions")}
                        className={activeTab === "actions" ? "!bg-black/30 text-black !border-black/10" : "!border-black/30"}
                    >
                        Priorità
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        variant="navbar"
                        scale={false}
                        onClick={() => setActiveTab("answers")}
                        className={activeTab === "answers" ? "!bg-black/30 text-black !border-black/10" : "!border-black/30"}
                    >
                        Risposte
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        variant="navbar"
                        scale={false}
                        onClick={() => setActiveTab("cta")}
                        className={activeTab === "cta" ? "!bg-black/30 text-black !border-black/10" : "!border-black/30"}
                    >
                        Migliora punteggio
                    </LiquidGlassButton>

                </div>
            </section>

            {/* TAB CONTENT */}

            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto">

                    {/* OVERVIEW */}

                    {activeTab === "overview" && (

                        <div className="grid md:grid-cols-3 gap-6">

                            <div className={`rounded-3xl border p-8 ${glassCard}`}>
                                <div className="text-sm opacity-60">Score</div>
                                <div className="text-4xl font-semibold mt-2">
                                    {survey.score}%
                                </div>
                            </div>

                            <div className={`rounded-3xl border p-8 ${glassCard}`}>
                                <div className="text-sm opacity-60">Risposte</div>
                                <div className="text-4xl font-semibold mt-2">
                                    {answerEntries.length}
                                </div>
                            </div>

                            <div className={`rounded-3xl border p-8 ${glassCard}`}>
                                <div className="text-sm opacity-60">Survey ID</div>
                                <div className="text-sm font-mono mt-2 break-all">
                                    {survey._id}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* PRIORITY ACTIONS */}

                    {activeTab === "actions" && (

                        <div className="space-y-8">

                            {Object.entries(actionDetails).map(([indexStr, detail]) => {

                                const index = Number(indexStr)
                                const isOpen = openActionIndex === index

                                return (

                                    <div key={index} className="space-y-4">

                                        <div className={`rounded-3xl p-8 border ${glassCard}`}>

                                            <div className="flex justify-between items-center">

                                                <div className="flex items-center gap-6">

                                                    <span className={`font-mono text-sm ${isDark ? "text-white/40" : "text-black/40"}`}>
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    <span className="text-lg font-medium">
                                                        {detail.title}
                                                    </span>

                                                </div>

                                                <button
                                                    onClick={() => toggleAction(index)}
                                                    className={`text-sm transition ${isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} cursor-pointer`}
                                                >
                                                    {isOpen ? "Chiudi ↑" : "Approfondisci →"}
                                                </button>

                                            </div>

                                        </div>

                                        {isOpen && (

                                            <div className={`rounded-3xl p-8 border space-y-6 ${glassCard}`}>

                                                <p className={isDark ? "text-white/70" : "text-black/70"}>
                                                    {detail.context}
                                                </p>

                                                <div>
                                                    <h4 className="text-sm uppercase tracking-wider mb-2 opacity-60">
                                                        Rischi
                                                    </h4>

                                                    <ul className="list-disc list-inside space-y-1">
                                                        {detail.risks.map((risk, i) => (
                                                            <li key={i}>{risk}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm uppercase tracking-wider mb-2 opacity-60">
                                                        Azioni consigliate
                                                    </h4>

                                                    <ul className="list-disc list-inside space-y-1">
                                                        {detail.actions.map((action, i) => (
                                                            <li key={i}>{action}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-4 border-t opacity-80">
                                                    {detail.outcome}
                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )

                            })}

                        </div>

                    )}

                    {/* ANSWERS */}

                    {activeTab === "answers" && (

                        <div className="space-y-8">

                            <div className="flex gap-2 overflow-auto py-4">

                                {answerEntries.map(([qid], idx) => (

                                    <LiquidGlassButton
                                        variant="navbar"
                                        key={qid}
                                        onClick={() => goTo(idx)}
                                        className={currentIndex === idx ? "!bg-black/40 text-black !border-black/30" : "!border-black/30"}
                                    >
                                        {idx + 1}
                                    </LiquidGlassButton>

                                ))}

                            </div>

                            <div className={`rounded-3xl p-8 border ${glassCard}`}>

                                <h3 className="text-lg mb-4">
                                    {currentQuestion?.text.it ?? "Domanda non disponibile"}
                                </h3>

                                <div className={isDark ? "text-white/70" : "text-black/70"}>
                                    {formatAnswer(currentAnswer)}
                                </div>

                            </div>

                            <div className="flex justify-between">

                                <LiquidGlassButton
                                    variant="navbar"
                                    onClick={goPrev}
                                    disabled={currentIndex === 0}
                                >
                                    ← Precedente
                                </LiquidGlassButton>

                                <LiquidGlassButton
                                    variant="navbar"
                                    onClick={goNext}
                                    disabled={currentIndex === totalAnswers - 1}
                                >
                                    Successivo →
                                </LiquidGlassButton>

                            </div>

                        </div>

                    )}

                    {/* CTA */}

                    {activeTab === "cta" && (

                        <div className="text-center">

                            <div className={`mx-auto max-w-3xl rounded-[40px] px-12 py-16 border ${glassCard}`}>

                                <h2 className="text-3xl font-semibold mb-4">
                                    Vuoi migliorare questo punteggio?
                                </h2>

                                <p className={`mb-10 ${isDark ? "text-white/60" : "text-black/60"}`}>
                                    Costruiamo una roadmap operativa personalizzata.
                                </p>

                                <LiquidGlassButton onClick={handleBookAppointment} className={`${isDark ? "" : "!bg-white"}`}>
                                    Richiedi consulenza strategica
                                </LiquidGlassButton>

                            </div>

                        </div>

                    )}

                </div>
            </section>

            {/* RESET */}

            <section className={`px-6 pb-16 text-center ${isDark ? "text-white/40" : "text-black/40"}`}>

                <button
                    className="hover:text-current transition"
                    disabled={resetting}
                    onClick={async () => {

                        if (!survey_id) return

                        if (!window.confirm("Sei sicuro di voler resettare il survey?"))
                            return

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