import { useNavigate, useParams } from "react-router-dom";
import { useSurvey } from "../hooks/useSurvey";
import { useSurveyTemplate } from "../hooks/useSurveyTemplate";
import { formatAnswer } from "../utils/formatAnswer";
import { useResetSurvey } from "../hooks/useResetSurvey";
import { FallingLines } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { actionDetails } from "../utils/actionDetails";
import { useTheme } from "../Context/ThemeContext.tsx";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
    LayoutGrid, Zap, MessageSquare, TrendingUp,
    ChevronDown, ChevronRight, ArrowLeft, ArrowRight,
    Calendar, RotateCcw, Check,
} from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
    leadership:   "Leadership",
    azienda:      "Maturità aziendale",
    software:     "Software & Strumenti",
    processi:     "Processi operativi",
    integrazione: "Integrazione sistemi",
    it_security:  "Sicurezza IT",
    budget:       "Readiness investimenti",
};

type DashboardTab = "overview" | "actions" | "answers" | "cta";

const TABS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview",           icon: <LayoutGrid size={14} /> },
    { id: "actions",  label: "Priorità",            icon: <Zap size={14} /> },
    { id: "answers",  label: "Risposte",             icon: <MessageSquare size={14} /> },
    { id: "cta",      label: "Migliora punteggio",  icon: <TrendingUp size={14} /> },
];

function scoreGrade(pct: number): { label: string; color: string; barColor: string } {
    if (pct >= 70) return { label: "Avanzato",    color: "#4ade80", barColor: "bg-green-500" };
    if (pct >= 40) return { label: "In sviluppo", color: "#f59e0b", barColor: "bg-emerald-500" };
    return             { label: "Iniziale",       color: "#f87171", barColor: "bg-red-400" };
}

function AnimatedScore({ target }: { target: number }) {
    const count   = useMotionValue(0);
    const rounded = useTransform(count, v => Math.round(v));

    useEffect(() => {
        if (!target) return;
        const ctrl = animate(count, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
        return ctrl.stop;
    }, [target]);

    return <motion.span>{rounded}</motion.span>;
}

export function SurveyDashboard() {
    const { theme } = useTheme();
    const navigate  = useNavigate();
    const isDark    = theme === "dark";

    const { survey_id } = useParams();
    const { survey, loading } = useSurvey(survey_id);

    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID;
    const { questions } = useSurveyTemplate(survey_template_id);

    const { resetSurvey, loading: resetting } = useResetSurvey();

    const [activeTab,        setActiveTab]        = useState<DashboardTab>("overview");
    const [openActionIndex,  setOpenActionIndex]  = useState<number | null>(null);
    const [currentIndex,     setCurrentIndex]     = useState(0);
    const [ready,            setReady]            = useState(false);

    const locale: "it" | "en" = "it";

    useEffect(() => {
        if (survey) {
            const t = setTimeout(() => setReady(true), 120);
            return () => clearTimeout(t);
        }
    }, [survey]);

    if (loading || !survey) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </div>
        );
    }

    const totalScore = survey.score ?? 0;
    const byCategory = survey.score_by_category ?? [];
    const grade      = scoreGrade(totalScore);

    const toggleAction   = (index: number) => setOpenActionIndex(prev => prev === index ? null : index);
    const questionMap    = new Map(questions.map(q => [q.id, q]));
    const answerEntries  = Object.entries(survey.answers);
    const totalAnswers   = answerEntries.length;
    const goNext         = () => setCurrentIndex(prev => Math.min(prev + 1, totalAnswers - 1));
    const goPrev         = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    const goTo           = (index: number) => setCurrentIndex(index);

    const [currentQuestionId, currentAnswer] = answerEntries[currentIndex];
    const currentQuestion = questionMap.get(currentQuestionId);

    const border    = isDark ? "border-stone-800/30" : "border-slate-200";
    const card      = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText  = isDark ? "text-slate-300" : "text-slate-600";

    return (
        <main className={`min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>

            {/* subtle grid bg */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 space-y-6">

                {/* page label */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between"
                >
                    <div className="space-y-0.5">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${mutedText}`}>
                            Digital Maturity Dashboard
                        </span>
                        <h1 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Analisi dettagliata
                        </h1>
                    </div>
                </motion.div>

                {/* ── Hero card — split layout ── */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full rounded-2xl border overflow-hidden ${border}`}
                    style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                >
                    {/* rose accent line */}
                    <div className="h-[2px] w-full bg-emerald-700/60" />

                    <div className="flex flex-col lg:flex-row min-h-[320px]">

                        {/* LEFT — score */}
                        <div
                            className="relative flex flex-col justify-between p-8 lg:w-[42%] shrink-0 overflow-hidden"
                            style={{ background: isDark ? "#111110" : "#F0EDE8" }}
                        >
                            {/* grid pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                                style={{
                                    backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px),
                                                      linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
                                    backgroundSize: "32px 32px",
                                }}
                            />

                            {/* top label */}
                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#f59e0b]" />
                                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${mutedText}`}>
                                        Report completo
                                    </span>
                                </div>
                            </div>

                            {/* score number */}
                            <div className="relative flex flex-col items-start gap-1 py-6">
                                <div
                                    className="text-[88px] leading-none font-semibold tabular-nums tracking-tight"
                                    style={{ color: grade.color, fontVariantNumeric: "tabular-nums" }}
                                >
                                    {ready ? <AnimatedScore target={totalScore} /> : "0"}
                                    <span
                                        className="text-[36px] align-top mt-3 inline-block ml-0.5"
                                        style={{ color: grade.color, opacity: 0.7 }}
                                    >%</span>
                                </div>

                                <div className="space-y-0.5">
                                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                                        Digital Readiness Score
                                    </p>
                                    <p
                                        className="text-xs font-medium uppercase tracking-widest"
                                        style={{ color: grade.color }}
                                    >
                                        {grade.label}
                                    </p>
                                </div>
                            </div>

                            {/* score strip */}
                            <div className="relative space-y-2">
                                <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/8" : "bg-black/8"}`}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: grade.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: ready ? `${totalScore}%` : "0%" }}
                                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    {[0, 25, 50, 75, 100].map(v => (
                                        <span key={v} className={`text-[9px] font-mono ${mutedText}`}>{v}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* vertical divider */}
                        <div className={`hidden lg:block w-px shrink-0 ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />

                        {/* RIGHT — categories */}
                        <div className="flex flex-col flex-1 p-8 gap-4">
                            <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                                Score per area
                            </p>

                            {byCategory.length === 0 && (
                                <div className="flex-1 space-y-3 pt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-4 rounded ${isDark ? "bg-white/5" : "bg-black/5"} animate-pulse`}
                                            style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 80}ms` }}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="flex-1 space-y-0.5">
                                {byCategory.map((cat, i) => {
                                    const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                    const g     = scoreGrade(cat.percentage);
                                    return (
                                        <motion.div
                                            key={cat.category}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + i * 0.07 }}
                                            className="group py-2.5"
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className={`text-xs font-medium ${bodyText}`}>
                                                    {label}
                                                </span>
                                                <span
                                                    className="text-xs font-mono font-semibold tabular-nums"
                                                    style={{ color: g.color }}
                                                >
                                                    {cat.percentage}%
                                                </span>
                                            </div>
                                            <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                                                <motion.div
                                                    className={`h-full rounded-full ${g.barColor}`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: ready ? `${cat.percentage}%` : "0%" }}
                                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.07 }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* KPI strip at bottom */}
                            <div className={`flex items-center gap-4 pt-3 mt-auto border-t ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
                                <div>
                                    <p className={`text-[9px] font-mono uppercase tracking-widest ${mutedText}`}>Risposte</p>
                                    <p className={`text-sm font-semibold tabular-nums mt-0.5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        {answerEntries.length}
                                    </p>
                                </div>
                                <div className={`w-px h-6 self-center ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[9px] font-mono uppercase tracking-widest ${mutedText}`}>Survey ID</p>
                                    <p className={`text-[11px] font-mono truncate mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                        {survey._id}
                                    </p>
                                </div>
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest
                                    ${isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"}`}>
                                    <Check size={9} strokeWidth={3} /> Pubblicato
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Tabs ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="flex gap-1 overflow-x-auto"
                >
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium
                                whitespace-nowrap transition-colors border
                                ${activeTab === tab.id
                                    ? isDark
                                        ? "bg-emerald-700/15 border-emerald-600/30 text-emerald-400"
                                        : "bg-emerald-50 border-emerald-400 text-emerald-800"
                                    : isDark
                                        ? "border-stone-800/20 text-slate-500 hover:text-slate-300 hover:border-stone-800/40"
                                        : "border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-[#EDF2F7]"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* ── Tab content ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                    >
                        {/* OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="space-y-4">
                                {/* category detail cards */}
                                {byCategory.length > 0 && (
                                    <div className={`rounded-2xl border overflow-hidden ${border}`}
                                         style={{ background: isDark ? "#161614" : "#FAFAF8" }}>
                                        <div className="h-[2px] w-full bg-emerald-700/40" />
                                        <div className="p-7 space-y-5">
                                            <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                                                Analisi per area
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {byCategory.map((cat, i) => {
                                                    const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                                    const g     = scoreGrade(cat.percentage);
                                                    return (
                                                        <motion.div
                                                            key={cat.category}
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.35, delay: i * 0.05 }}
                                                            className={`rounded-xl border p-5 ${card}`}
                                                        >
                                                            <div className="flex items-start justify-between mb-3">
                                                                <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                                                    {label}
                                                                </span>
                                                                <span
                                                                    className="text-sm font-mono font-bold tabular-nums"
                                                                    style={{ color: g.color }}
                                                                >
                                                                    {cat.percentage}%
                                                                </span>
                                                            </div>
                                                            <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                                                                <motion.div
                                                                    className={`h-full rounded-full ${g.barColor}`}
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${cat.percentage}%` }}
                                                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.05 }}
                                                                />
                                                            </div>
                                                            <p
                                                                className="text-[10px] font-mono uppercase tracking-widest mt-2"
                                                                style={{ color: g.color, opacity: 0.8 }}
                                                            >
                                                                {g.label}
                                                            </p>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* score summary */}
                                <div className={`rounded-2xl border p-7 ${card}`}>
                                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${mutedText}`}>
                                        Riepilogo
                                    </p>
                                    <div className="flex flex-wrap gap-8">
                                        <div>
                                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${mutedText}`}>Score totale</p>
                                            <p className="text-3xl font-semibold tabular-nums" style={{ color: grade.color }}>
                                                {totalScore}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${mutedText}`}>Livello</p>
                                            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: grade.color }}>
                                                {grade.label}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${mutedText}`}>Risposte fornite</p>
                                            <p className={`text-3xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                                {answerEntries.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ACTIONS */}
                        {activeTab === "actions" && (
                            <div className="space-y-2">
                                {Object.entries(actionDetails).map(([indexStr, detail]) => {
                                    const index  = Number(indexStr);
                                    const isOpen = openActionIndex === index;

                                    return (
                                        <div
                                            key={index}
                                            className={`rounded-2xl border overflow-hidden ${border}`}
                                            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                                        >
                                            <button
                                                onClick={() => toggleAction(index)}
                                                className="w-full flex justify-between items-center p-5 text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className={`font-mono text-[10px] uppercase tracking-[0.15em] ${isDark ? "text-emerald-600" : "text-emerald-500"}`}>
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                                        {detail.title}
                                                    </span>
                                                </div>
                                                {isOpen
                                                    ? <ChevronDown size={15} className={mutedText} />
                                                    : <ChevronRight size={15} className={mutedText} />
                                                }
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className={`px-5 pb-6 space-y-5 border-t ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                                                            <p className={`text-sm leading-relaxed pt-5 ${bodyText}`}>
                                                                {detail.context}
                                                            </p>

                                                            <div className="grid md:grid-cols-2 gap-5">
                                                                <div>
                                                                    <h4 className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-3 ${mutedText}`}>
                                                                        Rischi
                                                                    </h4>
                                                                    <ul className="space-y-1.5">
                                                                        {detail.risks.map((risk, i) => (
                                                                            <li key={i} className={`flex items-start gap-2 text-sm ${bodyText}`}>
                                                                                <span className="text-red-400 mt-0.5">•</span>
                                                                                {risk}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h4 className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-3 ${mutedText}`}>
                                                                        Azioni consigliate
                                                                    </h4>
                                                                    <ul className="space-y-1.5">
                                                                        {detail.actions.map((action, i) => (
                                                                            <li key={i} className={`flex items-start gap-2 text-sm ${bodyText}`}>
                                                                                <span className="text-emerald-500 mt-0.5">•</span>
                                                                                {action}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <p className={`text-xs pt-3 border-t ${isDark ? "border-stone-800/20 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                                                                {detail.outcome}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ANSWERS */}
                        {activeTab === "answers" && (
                            <div className="space-y-4">
                                {/* index strip */}
                                <div className="scrollbar-theme flex gap-1.5 overflow-x-auto py-1">
                                    {answerEntries.map(([qid], idx) => (
                                        <button
                                            key={qid}
                                            onClick={() => goTo(idx)}
                                            className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold border transition-colors shrink-0
                                                ${currentIndex === idx
                                                    ? "bg-emerald-700 border-emerald-600 text-white"
                                                    : isDark
                                                        ? "border-stone-800/20 text-slate-500 hover:text-slate-300 hover:border-stone-700/40"
                                                        : "border-slate-200 text-slate-500 hover:bg-[#EDF2F7]"
                                                }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* question card */}
                                <div
                                    className={`rounded-2xl border overflow-hidden ${border}`}
                                    style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                                >
                                    <div className="h-[2px] w-full bg-emerald-700/40" />
                                    <div className="p-7">
                                        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-3 ${isDark ? "text-emerald-600" : "text-emerald-700"}`}>
                                            Domanda {currentIndex + 1}
                                        </p>
                                        <h3 className={`text-base font-semibold mb-4 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                                            {currentQuestion?.text.it ?? "Domanda non disponibile"}
                                        </h3>
                                        <div className={`text-sm ${bodyText}`}>
                                            {formatAnswer(currentAnswer)}
                                        </div>
                                    </div>
                                </div>

                                {/* nav */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={goPrev}
                                        disabled={currentIndex === 0}
                                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                            disabled:opacity-30
                                            ${isDark
                                                ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/40"
                                                : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                            }`}
                                    >
                                        <ArrowLeft size={13} /> Precedente
                                    </button>
                                    <button
                                        onClick={goNext}
                                        disabled={currentIndex === totalAnswers - 1}
                                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                            disabled:opacity-30
                                            ${isDark
                                                ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/40"
                                                : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                            }`}
                                    >
                                        Successivo <ArrowRight size={13} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        {activeTab === "cta" && (
                            <div
                                className={`rounded-2xl border overflow-hidden ${border}`}
                                style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                            >
                                <div className="h-[2px] w-full bg-emerald-700/60" />
                                <div className="p-10 text-center space-y-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto
                                        ${isDark ? "bg-emerald-700/15 border border-emerald-700/20" : "bg-emerald-50 border border-emerald-300"}`}>
                                        <TrendingUp size={20} className="text-emerald-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                            Vuoi migliorare questo punteggio?
                                        </h2>
                                        <p className={`text-sm max-w-md mx-auto ${bodyText}`}>
                                            Costruiamo una roadmap operativa personalizzata per la tua azienda.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
                                            navigate("/survey");
                                        }}
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                                            bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold
                                            transition-all shadow-lg shadow-emerald-700/25 hover:-translate-y-0.5 duration-200"
                                    >
                                        <Calendar size={14} />
                                        Richiedi consulenza strategica
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── Reset ── */}
                <div className="flex justify-center pt-4">
                    <button
                        disabled={resetting}
                        onClick={async () => {
                            if (!survey_id) return;
                            if (!window.confirm("Sei sicuro di voler resettare il survey?")) return;
                            await resetSurvey(survey_id, survey_template_id, locale);
                            navigate("/survey");
                        }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-medium
                            disabled:opacity-40 transition-colors
                            ${isDark
                                ? "border-red-900/30 text-slate-500 hover:border-red-600/40 hover:text-red-400"
                                : "border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500"
                            }`}
                    >
                        {resetting
                            ? <FallingLines color={isDark ? "#fff" : "#000"} width="15" visible ariaLabel="loading" />
                            : <><RotateCcw size={12} /> Reset Survey</>
                        }
                    </button>
                </div>
            </div>
        </main>
    );
}
