import { useParams } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { formatAnswer } from "../utils/formatAnswer"
import type { Question } from "../types"

export function SurveyRecap() {
    const { survey_id } = useParams()
    const { survey, loading } = useSurvey(survey_id)
    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    const { questions } = useSurveyTemplate(survey_template_id)

    if (loading || !survey) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-slate-400">
                Preparing report…
            </div>
        )
    }

    const questionMap = new Map<string, Question>(
        questions.map(q => [q.id, q])
    )

    return (
        <main className="min-h-screen bg-black text-slate-100 px-6 py-20">
            <section className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-20">
                    <span className="text-sm tracking-widest text-indigo-400 uppercase">
                        Survey report
                    </span>
                    <h1 className="mt-4 text-4xl font-light leading-tight">
                        Response overview
                    </h1>
                    <p className="mt-6 text-slate-400 max-w-2xl">
                        A complete and structured summary of all responses provided
                        in this survey.
                    </p>
                </header>

                {/* Content */}
                <div className="space-y-24">
                    {Object.entries(survey.answers).map(
                        ([questionId, answer], index) => {
                            const question = questionMap.get(questionId)

                            return (
                                <section key={questionId}>
                                    <div className="flex items-baseline gap-6 mb-6">
                                        <span className="text-indigo-400 text-sm font-mono">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h2 className="text-2xl font-light leading-snug">
                                            {question?.text.it ??
                                                "Domanda non disponibile"}
                                        </h2>
                                    </div>

                                    <div className="pl-12">
                                        <div className="bg-slate-900/50 rounded-2xl px-8 py-10">
                                            <div className="text-3xl font-medium leading-snug">
                                                {formatAnswer(answer)}
                                            </div>

                                            {question?.type && (
                                                <div className="mt-6 text-xs uppercase tracking-wide text-slate-500">
                                                    Answer type: {question.type}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )
                        }
                    )}
                </div>
            </section>
        </main>
    )
}
