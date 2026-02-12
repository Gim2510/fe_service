import { useNavigate, useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import { useResetSurvey } from "../hooks/useResetSurvey.ts"

export function SurveyRecap() {
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
                Preparing report…
            </div>
        )
    }

    const questionMap = new Map(
        questions.map(q => [q.id, q])
    )

    return (
        <main className="flex flex-col">

            {/* HERO SECTION */}
            <section className="bg-neutral-950 text-white px-6 py-16">
                <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-widest text-neutral-400">
            Survey report
          </span>
                    <h1 className="mt-2 text-3xl font-semibold leading-snug">
                        Response Overview
                    </h1>
                    <p className="mt-2 text-sm text-neutral-300 max-w-2xl">
                        Structured summary of all responses provided in this survey.
                    </p>
                </div>
            </section>

            {/* SURVEY ANSWERS */}
            <section className="bg-neutral-900 text-white px-6 py-12">
                <div className="mx-auto max-w-4xl space-y-8">
                    {Object.entries(survey.answers).map(([questionId, answer], index) => {
                        const question = questionMap.get(questionId)
                        return (
                            <div
                                key={questionId}
                                className="bg-neutral-800/40 backdrop-blur-md rounded-2xl p-6 transition hover:scale-[1.01]"
                            >
                                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-indigo-400 text-xs font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                                    <h2 className="text-xl font-medium leading-snug">
                                        {question?.text.it ?? "Domanda non disponibile"}
                                    </h2>
                                </div>
                                <div className="text-xl font-medium">
                                    {formatAnswer(answer)}
                                </div>
                                {question?.type && (
                                    <div className="mt-2 text-[10px] uppercase tracking-wide text-neutral-400">
                                        Answer type: {question.type}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA RESET SURVEY */}
            <section className="bg-neutral-950 text-white px-6 py-12 text-center">
                <button
                    onClick={async () => {
                        if (!survey_id) return
                        const confirmReset = window.confirm("Sei sicuro di voler resettare il survey?")
                        if (!confirmReset) return
                        await resetSurvey(survey_id, survey_template_id, locale)
                        navigate("/survey")
                    }}
                    disabled={resetting}
                    className="px-8 py-3 cursor-pointer rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition text-white font-medium text-base disabled:opacity-50"
                >
                    {resetting ? "Resetting..." : "Reset Survey"}
                </button>
                <p className="mt-2 text-neutral-400 text-xs">
                    Una volta resettato, le risposte non potranno più essere recuperate.
                </p>
            </section>
        </main>
    )
}
