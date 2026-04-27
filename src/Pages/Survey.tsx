import { Navigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

import { useSurvey } from "../hooks/useSurvey";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useSurveyTemplate } from "../hooks/useSurveyTemplate";
import { useSurveyFlow } from "../hooks/useSurveyFlow";

import { SurveyQuestion } from "../Components/Survey/SurveyQuestion.tsx";
import { SurveyContacts } from "../Components/Survey/SurveyContacts.tsx";
import { SurveyConfirmation } from "../Components/Survey/SurveyConfirmation.tsx";
import { useTheme } from "../Context/ThemeContext.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Survey() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const surveyTemplateId = "6980ad77de0a1489a3663896";
    const lang: "it" = "it";

    const { surveyId, loading: loadingSurveyId, error: errorSurveyId } = useUserSurvey();
    const { survey, loading: loadingSurvey, error: errorSurvey } = useSurvey(surveyId);
    const { questions, loading: loadingTemplate, error: errorTemplate } = useSurveyTemplate(surveyTemplateId);

    const flow = useSurveyFlow(questions ?? []);

    const loading = loadingSurveyId || loadingSurvey || loadingTemplate;
    const error = errorSurveyId || errorSurvey || errorTemplate;

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </div>
        );
    }

    if (error) return <div className={`min-h-screen flex items-center justify-center text-sm ${isDark ? "bg-[#111110] text-slate-400" : "bg-[#FAF8F4] text-slate-600"}`}>{error}</div>;
    if (!surveyId || !survey) return <div className={`min-h-screen flex items-center justify-center text-sm ${isDark ? "bg-[#111110] text-slate-400" : "bg-[#FAF8F4] text-slate-600"}`}>Survey non disponibile</div>;
    if (!questions.length) return <div className={`min-h-screen flex items-center justify-center text-sm ${isDark ? "bg-[#111110] text-slate-400" : "bg-[#FAF8F4] text-slate-600"}`}>Nessuna domanda disponibile</div>;

    if (survey.status === "published") {
        return <Navigate to={`/survey/${survey._id}/recap`} replace />;
    }

    const isQuestionStep = flow.step < questions.length;
    const isContactStep = flow.step === questions.length;
    const isConfirmationStep = flow.step > questions.length;

    const totalSteps = questions.length + 1;
    const currentStep = Math.min(flow.step + 1, totalSteps);
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <main className={`min-h-screen flex items-center justify-center px-6 py-16
            ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>

            <section className="w-full max-w-2xl">
                {/* Progress bar */}
                <div className="mb-8 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            Survey interview
                        </span>
                        <span className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {currentStep} / {totalSteps}
                        </span>
                    </div>
                    <div className={`h-0.5 rounded-full ${isDark ? "bg-stone-800/30" : "bg-slate-200"}`}>
                        <div
                            className="h-full rounded-full bg-amber-700 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div
                    className={`transition-all duration-400 ${
                        flow.animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    }`}
                >
                    {isQuestionStep && (
                        <div className="space-y-6">
                            <header className="space-y-3">
                                <span className={`font-mono text-xs font-medium ${isDark ? "text-amber-600" : "text-amber-700"}`}>
                                    {String(flow.step + 1).padStart(2, "0")}
                                </span>
                                <h1 className={`text-2xl md:text-3xl font-semibold leading-tight
                                    ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    {flow.question.text[lang]}
                                </h1>
                            </header>

                            <SurveyQuestion
                                question={flow.question}
                                lang={lang}
                                answer={flow.answer}
                                setAnswer={flow.setAnswer}
                                theme={theme}
                            />

                            <div className={`flex pt-4 ${flow.step > 0 ? "justify-between" : "justify-end"}`}>
                                {flow.step > 0 && (
                                    <button
                                        onClick={flow.prev}
                                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                            ${isDark
                                                ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-amber-800/40"
                                                : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                            }`}
                                    >
                                        <ArrowLeft size={14} /> Indietro
                                    </button>
                                )}

                                <button
                                    disabled={!flow.canProceed}
                                    onClick={() => flow.next(survey._id)}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                        bg-amber-700 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed
                                        text-white text-sm font-semibold transition-colors
                                        shadow-lg shadow-amber-700/20 hover:-translate-y-0.5 duration-200"
                                >
                                    {flow.isLast ? "Completa survey" : "Continua"}
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {isContactStep && (
                        <SurveyContacts surveyId={survey._id} onNext={flow.nextStep} />
                    )}

                    {isConfirmationStep && (
                        <SurveyConfirmation survey_id={surveyId} />
                    )}
                </div>
            </section>
        </main>
    );
}
