import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { useSurveyTemplate } from "../hooks/useSurveyTemplate";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useInitSurvey } from "../hooks/useInitSurvey";
import { getSurveyConfig, type SurveyType } from "../types/survey";
import { SurveyQuestion } from "../Components/Survey/SurveyQuestion.tsx";
import { useTheme } from "../Context/ThemeContext.tsx";
import { FallingLines } from "react-loader-spinner";

const SURVEY_BASE_URL = import.meta.env.VITE_SURVEY_BASE_URL;

export function MinorSurvey() {
    const { surveyType: rawSurveyType } = useParams<{ surveyType: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { token, id: userId } = useAuth();

    const surveyType = (
        rawSurveyType && ['compliance', 'processes', 'growth'].includes(rawSurveyType)
            ? rawSurveyType as SurveyType
            : null
    );

    const config = surveyType ? getSurveyConfig(surveyType) : null;
    const { questions, loading: loadingTemplate } = useSurveyTemplate(config?.templateId || "");
    const { findSurveyByType, loading: loadingUserSurveys, refetch: refetchSurveys } = useUserSurvey();
    const { initSurvey, loading: initLoading } = useInitSurvey();

    const [surveyId, setSurveyId] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, string | number | boolean | string[] | null>>({});
    const [phase, setPhase] = useState<"init" | "ready" | "complete">("init");
    const [activeTab, setActiveTab] = useState<string>("");
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
    const [savingQuestion, setSavingQuestion] = useState<string | null>(null);
    const [initiated, setInitiated] = useState(false);

    useEffect(() => {
        if (!surveyType) navigate("/survey/start", { replace: true });
    }, [surveyType, navigate]);

    const loadSurveyData = useCallback(async (sid: string) => {
        try {
            const res = await fetch(`${SURVEY_BASE_URL}/v1/survey/get_survey/${sid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const loaded: Record<string, string | number | boolean | string[] | null> = {};
            if (data.answers) {
                for (const [qid, a] of Object.entries(data.answers) as [string, { filled?: boolean; value?: unknown }][]) {
                    if (a?.filled) loaded[qid] = a.value as string | number | boolean | string[] | null;
                }
            }
            setAnswers(loaded);
            setSurveyId(sid);
            setPhase(data.status === "published" ? "complete" : "ready");
        } catch {
            setSurveyId(sid);
            setPhase("ready");
        }
    }, [token]);

    useEffect(() => {
        if (!surveyType || !config || loadingUserSurveys || !token || !userId || initiated) return;
        setInitiated(true);

        const existing = findSurveyByType(surveyType);
        if (existing) {
            loadSurveyData(existing.surveyId);
        } else {
            initSurvey(config.templateId, "it", surveyType).then((id) => {
                if (id) {
                    setSurveyId(id);
                    setPhase("ready");
                    refetchSurveys();
                }
            });
        }
    }, [surveyType, config, loadingUserSurveys, token, userId, initiated, findSurveyByType, initSurvey, loadSurveyData, refetchSurveys]);

    const sections = useMemo(() => {
        if (!questions.length) return [];
        const groupMap = new Map<string, typeof questions>();
        for (const q of questions) {
            const cat = q.category || "Generale";
            if (!groupMap.has(cat)) groupMap.set(cat, []);
            groupMap.get(cat)!.push(q);
        }
        return Array.from(groupMap.entries()).map(([category, qs]) => {
            const answered = qs.filter(q => {
                const v = answers[q.id];
                return v !== undefined && v !== null && v !== "";
            }).length;
            return { category, questions: qs, answered, total: qs.length };
        });
    }, [questions, answers]);

    useEffect(() => {
        if (sections.length && !activeTab) {
            const firstIncomplete = sections.find(s => s.answered < s.total);
            setActiveTab(firstIncomplete ? firstIncomplete.category : sections[0].category);
        }
    }, [sections, activeTab]);

    const totalAnswered = useMemo(() =>
        sections.reduce((sum, s) => sum + s.answered, 0), [sections]);
    const totalQuestions = questions.length;
    const progress = totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0;
    const allAnswered = totalAnswered === totalQuestions && totalQuestions > 0;

    const activeSection = sections.find(s => s.category === activeTab);

    const saveAnswer = useCallback(async (questionId: string, value: string | number | boolean | string[] | null) => {
        if (!surveyId || savingQuestion) return;
        setSavingQuestion(questionId);
        try {
            const res = await fetch(`${SURVEY_BASE_URL}/v1/survey/save/${surveyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    question_id: questionId,
                    answer: { value, filled: true },
                }),
            });
            const data = await res.json();
            if (data.score !== undefined || data.survey?.score !== undefined) {
                setPhase("complete");
            }
        } catch {
            // keep local state even if save fails
        } finally {
            setSavingQuestion(null);
        }
    }, [surveyId, token, savingQuestion]);

    const handleAnswer = (questionId: string, value: string | number | boolean | string[] | null) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        saveAnswer(questionId, value);
        const q = questions.find(qq => qq.id === questionId);
        if (q && (q.type === "boolean" || q.type === "multipleChoice")) {
            setTimeout(() => setExpandedQuestion(null), 200);
        }
    };

    const toggleExpand = (qId: string) => {
        setExpandedQuestion(prev => prev === qId ? null : qId);
    };

    const handleComplete = () => {
        if (surveyId) navigate(`/survey/${surveyId}/recap`);
    };

    const loading = loadingTemplate || loadingUserSurveys || initLoading || phase === "init";

    if (!surveyType || !config) {
        return (
            <main className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </main>
        );
    }

    if (loading) {
        return (
            <main className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </main>
        );
    }

    if (phase === "complete") {
        return (
            <main className={`min-h-screen flex items-center justify-center px-6 py-16 ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md text-center space-y-6"
                >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${isDark ? "bg-green-500/15 border border-green-500/20" : "bg-green-50 border border-green-300"}`}>
                        <Check size={28} className="text-green-400" />
                    </div>
                    <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        {config.label} completato
                    </h2>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Hai risposto a tutte le {totalQuestions} domande. Visualizza il report dettagliato con i punteggi per area.
                    </p>
                    <button
                        onClick={handleComplete}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 duration-200"
                    >
                        Vedi report
                    </button>
                </motion.div>
            </main>
        );
    }

    const sectionComplete = (cat: string) => {
        const s = sections.find(se => se.category === cat);
        return s ? s.answered === s.total : false;
    };

    return (
        <main className={`min-h-screen ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
            <div
                className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-16 space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/survey/start")}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        <ArrowLeft size={13} />
                        Torna ai survey
                    </button>
                    <span className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {totalAnswered}/{totalQuestions}
                    </span>
                </div>

                <div className={`h-0.5 rounded-full ${isDark ? "bg-white/8" : "bg-black/8"}`}>
                    <div
                        className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <h1 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {config.label}
                </h1>

                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                    {sections.map(s => {
                        const done = sectionComplete(s.category);
                        return (
                            <button
                                key={s.category}
                                onClick={() => setActiveTab(s.category)}
                                className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium
                                    whitespace-nowrap transition-all shrink-0 border
                                    ${activeTab === s.category
                                        ? isDark
                                            ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                                            : "bg-cyan-50 border-cyan-400 text-cyan-800"
                                        : isDark
                                            ? "border-stone-800/30 text-slate-500 hover:border-stone-700/40"
                                            : "border-slate-200 text-slate-500 hover:bg-[#EDF2F7]"
                                    }`}
                            >
                                {s.category}
                                {done && (
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center ${isDark ? "bg-green-500/20" : "bg-green-100"}`}>
                                        <Check size={9} className="text-green-400" />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {activeSection && (
                    <div className="space-y-0.5">
                        <p className={`text-[10px] font-mono uppercase tracking-widest px-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {activeSection.category}
                        </p>

                        {activeSection.questions.map((q) => {
                            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "";
                            const isExpanded = expandedQuestion === q.id;
                            const isSaving = savingQuestion === q.id;

                            return (
                                <div
                                    key={q.id}
                                    className={`rounded-xl border overflow-hidden transition-all ${isExpanded
                                        ? isDark
                                            ? "border-cyan-500/30 bg-[#1C1C1A]/80"
                                            : "border-cyan-400 bg-white"
                                        : isDark
                                            ? "border-stone-800/30 bg-[#0E0E0D]/60 hover:border-cyan-500/20"
                                            : "border-slate-200 bg-white hover:border-cyan-300"
                                        } cursor-pointer`}
                                >
                                    <div
                                        onClick={() => toggleExpand(q.id)}
                                        className="flex items-start gap-3 p-4"
                                    >
                                        <div className={`mt-0.5 shrink-0 ${isAnswered ? "text-green-400" : isDark ? "text-slate-600" : "text-slate-400"}`}>
                                            {isAnswered
                                                ? <Check size={15} />
                                                : <span className="text-[10px] font-mono block w-4 text-center">
                                                    {activeSection.questions.indexOf(q) + 1}
                                                </span>
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                                {q.text.it}
                                            </p>
                                            {isAnswered && !isExpanded && (
                                                <p className={`text-xs mt-1 truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                    {typeof answers[q.id] === 'boolean'
                                                        ? (answers[q.id] ? 'Si' : 'No')
                                                        : Array.isArray(answers[q.id])
                                                            ? (answers[q.id] as string[]).join(', ')
                                                            : String(answers[q.id])
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className={`mt-0.5 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                                            <ChevronDown size={14} className={isDark ? "text-slate-600" : "text-slate-400"} />
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`px-4 pb-5 border-t ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                                                {isSaving && (
                                                    <div className="flex justify-center pt-4">
                                                        <FallingLines color={isDark ? "#fff" : "#000"} width="20" visible />
                                                    </div>
                                                )}
                                                {!isSaving && (
                                                    <SurveyQuestion
                                                        question={q}
                                                        lang="it"
                                                        answer={answers[q.id] ?? null}
                                                        setAnswer={(v: string | number | boolean | string[] | null) => handleAnswer(q.id, v)}
                                                        theme={theme}
                                                        onAutoSelect={() => {}}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {allAnswered
                            ? "Tutte le domande hanno una risposta"
                            : `Rispondi a ${totalQuestions - totalAnswered} domande per completare`
                        }
                    </p>
                    {allAnswered && (
                        <button
                            onClick={handleComplete}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/25"
                        >
                            <Check size={14} />
                            Completa survey
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
