import { Navigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { useMemo, useRef, useEffect } from "react";

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

    // Resume from the first unanswered question, restore all previous answers
    const { resumeStep, resumeAnswer, savedAnswers } = useMemo(() => {
        if (!questions.length || !survey?.answers) return { resumeStep: 0, resumeAnswer: null, savedAnswers: {} };
        const idx = questions.findIndex(q => !survey.answers[q.id]?.filled);
        const step = idx === -1 ? questions.length : idx;
        const ans = idx >= 0 ? (survey.answers[questions[idx].id]?.value ?? null) : null;
        const saved: Record<string, any> = {};
        for (const q of questions) {
            const a = survey.answers[q.id];
            if (a?.filled) saved[q.id] = a.value;
        }
        return { resumeStep: step, resumeAnswer: ans, savedAnswers: saved };
    }, [questions, survey?.answers]);

    const flow = useSurveyFlow(questions ?? [], resumeStep, resumeAnswer, savedAnswers);

    // Ref always pointing to latest next() — avoids stale closure in auto-advance setTimeout
    const nextRef = useRef(flow.next);
    useEffect(() => { nextRef.current = flow.next; });

    const loading = loadingSurveyId || loadingSurvey || loadingTemplate;
    const error = errorSurveyId || errorSurvey || errorTemplate;

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </div>
        );
    }

    if (error) return <div className={`min-h-screen flex items-center justify-center text-sm ${isDark ? "bg-[#0E0E0D] text-slate-400" : "bg-[#FAFAF8] text-slate-600"}`}>{error}</div>;
    if (!surveyId || !survey) return <Navigate to="/survey/start" replace />;
    if (!questions || !questions.length) return <Navigate to="/survey/start" replace />;

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
            ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>

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
                    <div className={`h-0.5 rounded-full ${isDark ? "bg-cyan-900/30" : "bg-slate-200"}`}>
                        <div
                            className={`h-full rounded-full bg-cyan-500 transition-all duration-500 ${
                                isDark ? "shadow-[0_0_8px_rgba(6,182,212,0.4)]" : ""
                            }`}
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
                                <span className={`font-mono text-xs font-medium ${isDark ? "text-cyan-500" : "text-cyan-700"}`}>
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
                                onAutoSelect={() => {
                                    setTimeout(() => nextRef.current(survey._id), 150);
                                }}
                            />

                            <div className="flex items-center pt-4 gap-3">
                                {flow.step > 0 && (
                                    <button
                                        onClick={flow.prev}
                                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                            ${isDark
                                                ? "border-cyan-500/20 text-slate-400 hover:text-slate-200 hover:border-cyan-500/40"
                                                : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                            }`}
                                    >
                                        <ArrowLeft size={14} /> Indietro
                                    </button>
                                )}

                                <div className="flex-1" />

                                <button
                                    onClick={() => flow.skip(survey._id)}
                                    disabled={flow.animating}
                                    className={`text-xs font-medium transition-colors disabled:opacity-30
                                        ${isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-500"}`}
                                >
                                    Salta
                                </button>

                                <button
                                    disabled={!flow.canProceed}
                                    onClick={() => flow.next(survey._id)}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                        bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed
                                        text-white text-sm font-semibold transition-colors
                                        shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 duration-200"
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
