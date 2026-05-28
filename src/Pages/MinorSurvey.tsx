import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, AlertCircle, X } from "lucide-react";
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
    const [phase, setPhase] = useState<"init" | "ready">("init");
    const [activeTab, setActiveTab] = useState<string>("");
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
    const [savingQuestion, setSavingQuestion] = useState<string | null>(null);
    const [initiated, setInitiated] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMode, setConfirmMode] = useState<"complete" | "submit">("complete");

    useEffect(() => {
        if (!surveyType) navigate("/survey/start", { replace: true });
    }, [surveyType, navigate]);

    const loadSurveyData = useCallback(async (sid: string) => {
        try {
            const res = await fetch(`${SURVEY_BASE_URL}/v1/survey/get_survey/${sid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.status === "published") {
                navigate(`/survey/${sid}/recap`, { replace: true });
                return;
            }
            const loaded: Record<string, string | number | boolean | string[] | null> = {};
            if (data.answers) {
                for (const [qid, a] of Object.entries(data.answers) as [string, { filled?: boolean; value?: unknown }][]) {
                    if (a?.filled) loaded[qid] = a.value as string | number | boolean | string[] | null;
                }
            }
            setAnswers(loaded);
            setSurveyId(sid);
            setPhase("ready");
        } catch {
            setSurveyId(sid);
            setPhase("ready");
        }
    }, [token, navigate]);

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
            await fetch(`${SURVEY_BASE_URL}/v1/survey/save/${surveyId}`, {
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
        } catch {
            // keep local state even if save fails
        } finally {
            setSavingQuestion(null);
        }
    }, [surveyId, token, savingQuestion]);

    const handleAnswer = (questionId: string, value: string | number | boolean | string[] | null) => {
        setAnswers(prev => {
            const next = { ...prev, [questionId]: value };
            const newAnsweredCount = Object.values(next).filter(v => v !== undefined && v !== null && v !== "").length;
            if (newAnsweredCount === totalQuestions && totalQuestions > 0) {
                setTimeout(() => {
                    setConfirmMode("complete");
                    setShowConfirmModal(true);
                }, 350);
            }
            return next;
        });
        saveAnswer(questionId, value);
        const q = questions.find(qq => qq.id === questionId);
        if (q && (q.type === "boolean" || q.type === "multipleChoice")) {
            setTimeout(() => setExpandedQuestion(null), 200);
        }
    };

    const toggleExpand = (qId: string) => {
        setExpandedQuestion(prev => prev === qId ? null : qId);
    };

    const handleSubmitClick = () => {
        setConfirmMode("submit");
        setShowConfirmModal(true);
    };

    const handleConfirmSubmit = () => {
        if (surveyId) navigate(`/survey/${surveyId}/recap`);
    };

    const goToNextSection = () => {
        const currentIdx = sections.findIndex(s => s.category === activeTab);
        if (currentIdx === -1) return;
        for (let i = currentIdx + 1; i < sections.length; i++) {
            if (sections[i].answered < sections[i].total) {
                setActiveTab(sections[i].category);
                return;
            }
        }
        for (let i = 0; i < currentIdx; i++) {
            if (sections[i].answered < sections[i].total) {
                setActiveTab(sections[i].category);
                return;
            }
        }
    };

    const hasNextIncomplete = useMemo(() => {
        const currentIdx = sections.findIndex(s => s.category === activeTab);
        if (currentIdx === -1) return false;
        for (let i = currentIdx + 1; i < sections.length; i++) {
            if (sections[i].answered < sections[i].total) return true;
        }
        for (let i = 0; i < currentIdx; i++) {
            if (sections[i].answered < sections[i].total) return true;
        }
        return false;
    }, [sections, activeTab]);

    const loading = loadingTemplate || loadingUserSurveys || initLoading || phase === "init";

    if (!surveyType || !config) {
        return (
            <main className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0A0A09]" : "bg-[#FAFAF8]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </main>
        );
    }

    if (loading) {
        return (
            <main className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0A0A09]" : "bg-[#FAFAF8]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </main>
        );
    }

    const sectionComplete = (cat: string) => {
        const s = sections.find(se => se.category === cat);
        return s ? s.answered === s.total : false;
    };

    const cardBg = isDark ? "bg-[#0E0E0D]/80 border-cyan-500/30 shadow-lg shadow-cyan-500/10" : "bg-white border-cyan-500/60 shadow-md shadow-cyan-400/15";
    const expandedBg = isDark ? "bg-[#0E0E0D]/80 border-cyan-500/30" : "bg-white border-cyan-400";
    const hoverBg = isDark ? "hover:border-cyan-500/40" : "hover:border-cyan-400";
    const divider = isDark ? "border-stone-800/20" : "border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText = isDark ? "text-slate-300" : "text-slate-600";
    const pageBg = isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]";

    return (
        <main className={`min-h-screen ${pageBg} ${isDark ? "text-white" : "text-slate-900"}`}>
            <div
                className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.03]" : "opacity-[0.12]"}`}
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
                    <span className={`text-xs font-mono ${mutedText}`}>
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
                    <div className="space-y-1">
                        <p className={`text-[10px] font-mono uppercase tracking-widest px-1 ${mutedText}`}>
                            {activeSection.category}
                        </p>

                        {activeSection.questions.map((q) => {
                            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "";
                            const isExpanded = expandedQuestion === q.id;
                            const isSaving = savingQuestion === q.id;

                            return (
                                <div
                                    key={q.id}
                                    className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all
                                        ${isExpanded
                                            ? expandedBg + ' ' + hoverBg
                                            : cardBg + ' cursor-pointer ' + hoverBg
                                        }`}
                                >
                                    {isExpanded && (
                                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                                    )}
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
                                            <p className={`text-sm leading-snug ${bodyText}`}>
                                                {q.text.it}
                                            </p>
                                            {isAnswered && !isExpanded && (
                                                <p className={`text-xs mt-1 truncate ${mutedText}`}>
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
                                            <ChevronDown size={14} className={mutedText} />
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`px-4 pb-5 border-t ${divider}`}>
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
                    <p className={`text-xs ${mutedText}`}>
                        {allAnswered
                            ? "Tutte le domande hanno una risposta"
                            : `Rispondi a ${totalQuestions - totalAnswered} domande per completare`
                        }
                    </p>
                    <div className="flex items-center gap-2">
                        {hasNextIncomplete && (
                            <button
                                onClick={goToNextSection}
                                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                    ${isDark
                                        ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50"
                                        : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                    }`}
                            >
                                Prossima sezione
                                <ArrowRight size={12} />
                            </button>
                        )}
                        <button
                            onClick={handleSubmitClick}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-500/25"
                        >
                            Invia survey
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfirmModal(false)}
                        />
                        <motion.div
                            className={`relative z-10 w-full max-w-md rounded-2xl border p-8 space-y-5
                                ${isDark ? "bg-[#1C1C1A] border-stone-800/30" : "bg-[#F8FAFB] border-slate-200"}`}
                            initial={{ scale: 0.96, opacity: 0, y: 8 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: "easeOut" as const }}
                        >
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                                    ${isDark ? "text-slate-500 hover:text-slate-300 hover:bg-white/5" : "text-slate-400 hover:text-slate-700 hover:bg-[#EDF2F7]"}`}
                            >
                                <X size={16} />
                            </button>

                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                                ${isDark ? "bg-sky-500/10 border border-sky-500/20" : "bg-sky-50 border border-sky-200"}`}>
                                {confirmMode === "submit" && !allAnswered
                                    ? <AlertCircle size={20} className="text-sky-400" />
                                    : <Check size={20} className="text-sky-400" />
                                }
                            </div>

                            <div className="space-y-1.5">
                                <h3 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    {confirmMode === "submit" && !allAnswered
                                        ? "Survey incompleto"
                                        : "Conferma invio"
                                    }
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {confirmMode === "submit" && !allAnswered
                                        ? `Hai risposto a ${totalAnswered} domande su ${totalQuestions}. Le domande senza risposta saranno considerate come non compilate. Vuoi inviare comunque il survey?`
                                        : allAnswered
                                            ? "Hai risposto a tutte le domande. Confermando, il survey verrà completato e potrai visualizzare il report dettagliato."
                                            : "Vuoi inviare il survey? Potrai visualizzare il report con i punteggi per area."
                                    }
                                </p>
                            </div>

                            <div className="flex gap-2.5 pt-1">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                        ${isDark ? "border-stone-800/40 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleConfirmSubmit}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600
                                        text-white text-sm font-semibold transition-colors"
                                >
                                    {confirmMode === "submit" && !allAnswered ? "Invia comunque" : "Conferma e invia"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
