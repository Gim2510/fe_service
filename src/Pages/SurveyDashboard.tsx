import { useNavigate, useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import { useResetSurvey } from "../hooks/useResetSurvey"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton"
import { FallingLines } from "react-loader-spinner"
import { useState } from "react"
import { actionDetails } from "../utils/actionDetails"

export function SurveyDashboard() {
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
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <FallingLines color="#fff" width="150" visible />
            </div>
        )
    }

    const handleBookAppointment = () => {
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank")
        navigate("/survey")
    }

    const questionMap = new Map(questions.map(q => [q.id, q]))

    return (
        <main className="flex flex-col bg-neutral-950 text-white">

            {/* HERO */}
            <section className="relative px-6 pb-14 py-30">
                <div className="mx-auto max-w-6xl flex flex-col gap-12">
          <span className="text-xs uppercase tracking-widest text-white/40">
            Digital Maturity Dashboard
          </span>

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
                        <div>
                            <h1 className="text-4xl font-semibold">Stato digitale attuale</h1>
                            <p className="mt-4 text-white/60 max-w-xl">
                                Analisi basata sulle risposte fornite. Il punteggio indica il livello
                                di controllo e strutturazione dei processi digitali.
                            </p>
                        </div>

                        <div className="bg-white/[0.05] border border-white/10 rounded-3xl px-14 py-12 text-center">
                            <div className="text-6xl font-semibold">{survey.score}%</div>
                            <div className="text-white/50 text-sm mt-3">
                                Digital Readiness Score
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIORITY ACTIONS */}
            <section className="px-6 py-20 bg-neutral-900/40">
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

                                    {/* HEADER CARD */}
                                    <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-6">
                        <span className="text-white/40 font-mono text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                                                <span className="text-lg font-medium">
                          {detail.title}
                        </span>
                                            </div>

                                            <button
                                                onClick={() => toggleAction(index)}
                                                className="text-sm cursor-pointer text-white/40 hover:text-white transition"
                                            >
                                                {isOpen ? "Chiudi ↑" : "Approfondisci →"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* DETAIL */}
                                    <div
                                        className={`transition-all duration-700 overflow-hidden ${
                                            isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6">

                                            <p className="text-white/70 leading-relaxed">
                                                {detail.context}
                                            </p>

                                            <div>
                                                <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2">
                                                    Rischi
                                                </h4>
                                                <ul className="list-disc list-inside text-white/70 space-y-1">
                                                    {detail.risks.map((risk, i) => (
                                                        <li key={i}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2">
                                                    Azioni consigliate
                                                </h4>
                                                <ul className="list-disc list-inside text-white/70 space-y-1">
                                                    {detail.actions.map((action, i) => (
                                                        <li key={i}>{action}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="pt-4 border-t border-white/10 text-white/80">
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
                    <h2 className="text-xl font-semibold text-white/60">
                        Dettaglio risposte
                    </h2>

                    {Object.entries(survey.answers).map(([questionId, answer], index) => {
                        const question = questionMap.get(questionId)

                        return (
                            <div
                                key={questionId}
                                className="bg-white/[0.03] border border-white/5 rounded-3xl p-8"
                            >
                                <div className="flex gap-6 mb-4">
                  <span className="text-white/40 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                                    <h3 className="text-lg">
                                        {question?.text.it ?? "Domanda non disponibile"}
                                    </h3>
                                </div>

                                <div className="text-white/70">
                                    {formatAnswer(answer)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-32 text-center">
                <div className="mx-auto max-w-4xl bg-white/[0.05] border border-white/10 rounded-[40px] px-12 py-16">
                    <h2 className="text-3xl font-semibold mb-4">
                        Vuoi migliorare questo punteggio?
                    </h2>
                    <p className="text-white/60 mb-10">
                        Costruiamo una roadmap operativa personalizzata.
                    </p>
                    <LiquidGlassButton onClick={handleBookAppointment}>
                        Richiedi consulenza strategica
                    </LiquidGlassButton>
                </div>
            </section>

            {/* RESET */}
            <section className="px-6 py-12 text-center text-white/40">
                <button
                    className='hover:text-white cursor-pointer transition-all ease-in-out'
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