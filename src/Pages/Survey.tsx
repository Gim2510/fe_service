import { Navigate } from "react-router-dom"
import { useSurvey } from "../hooks/useSurvey"
import { useUserSurvey } from "../hooks/useUserSurvey"
import { useSurveyTemplate } from "../hooks/useSurveyTemplate"
import { useSurveyFlow } from "../hooks/useSurveyFlow"
import { useInitSurvey } from "../hooks/useInitSurvey"
import { SurveyQuestion } from "../Components/SurveyQuestion"
import { SurveyContacts } from "../Components/SurveyContacts"
import { SurveyConfirmation } from "../Components/SurveyConfirmation"

export function Survey() {
    const surveyTemplateId = "6980ad77de0a1489a3663896"
    const lang: "it" = "it"

    const { surveyId, loading: loadingSurveyId, error: errorSurveyId } =
        useUserSurvey()

    const { survey, loading: loadingSurvey, error: errorSurvey } =
        useSurvey(surveyId)

    const shouldInitSurvey =
        !loadingSurveyId && !loadingSurvey && !!surveyId && !survey

    useInitSurvey(surveyTemplateId, lang, shouldInitSurvey)

    const { questions, loading: loadingTemplate, error: errorTemplate } =
        useSurveyTemplate(surveyTemplateId)

    const flow = useSurveyFlow(questions ?? [])

    const loading = loadingSurveyId || loadingSurvey || loadingTemplate
    const error = errorSurveyId || errorSurvey || errorTemplate

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-slate-400">
                Preparing interview…
            </div>
        )
    }

    if (error) return <div>{error}</div>
    if (!surveyId || !survey) return <div>Survey non disponibile</div>
    if (!questions.length) return <div>Nessuna domanda disponibile</div>

    if (survey.status === "published") {
        return <Navigate to={`/survey/${survey._id}/recap`} replace />
    }

    const isContactStep = flow.step === questions.length
    const isConfirmationStep = flow.step > questions.length

    return (
        <main className="min-h-screen bg-black text-slate-100 flex items-center justify-center px-6">
            <section className="w-full max-w-3xl py-20">
                {/* Step indicator */}
                <div className="mb-12 text-sm text-slate-500 flex justify-between">
                    <span>
                        Step {Math.min(flow.step + 1, questions.length + 1)} of{" "}
                        {questions.length + 1}
                    </span>
                    <span className="tracking-widest uppercase">
                        Survey interview
                    </span>
                </div>

                {/* Animated container */}
                <div
                    className={`transition-all duration-500 ${
                        flow.animating
                            ? "opacity-0 translate-y-6"
                            : "opacity-100 translate-y-0"
                    }`}
                >
                    {flow.step < questions.length && (
                        <div className="space-y-16">
                            <header className="space-y-6">
                                <span className="text-white font-mono text-sm">
                                    {String(flow.step + 1).padStart(2, "0")}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-light leading-tight">
                                    {flow.question.text[lang]}
                                </h1>
                            </header>

                            <SurveyQuestion
                                question={flow.question}
                                lang={lang}
                                answer={flow.answer}
                                setAnswer={flow.setAnswer}
                            />

                            <div className="flex justify-end pt-8">
                                <button
                                    disabled={!flow.canProceed}
                                    onClick={() => flow.next(survey._id)}
                                    className="px-8 py-4 rounded-xl bg-gray-800 text-white font-medium
                                               disabled:opacity-40 disabled:cursor-not-allowed
                                               hover:bg-[#FFD93D] transition-colors cursor-pointer hover:text-black"
                                >
                                    {flow.isLast ? "Completa survey" : "Continua"}
                                </button>
                            </div>
                        </div>
                    )}

                    {isContactStep && (
                        <SurveyContacts
                            surveyId={survey._id}
                            onNext={() => flow.nextStep()}
                        />
                    )}

                    {isConfirmationStep && <SurveyConfirmation surveyId={surveyId} />}
                </div>
            </section>
        </main>
    )
}
