import { useNavigate, useParams } from "react-router-dom";
import { useSurvey } from "../hooks/useSurvey";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useSurveyTemplate } from "../hooks/useSurveyTemplate";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { formatAnswer } from "../utils/formatAnswer";
import { useResetSurvey } from "../hooks/useResetSurvey";
import { FallingLines } from "react-loader-spinner";
import { useState, useEffect, useMemo } from "react";
import { actionDetails } from "../utils/actionDetails";
import { useTheme } from "../Context/ThemeContext.tsx";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
    LayoutGrid, Zap, MessageSquare, TrendingUp,
    ChevronDown, ChevronRight, ArrowLeft, ArrowRight,
    Calendar, RotateCcw, Check, Activity,
} from "lucide-react";
import { getSurveyConfig, ALL_SURVEY_TYPES, type SurveyType } from "../types/survey.ts";

const CATEGORY_LABELS: Record<string, string> = {
    leadership: "Leadership", azienda: "Maturità aziendale", software: "Software & Strumenti",
    processi: "Processi operativi", integrazione: "Integrazione sistemi", it_security: "Sicurezza IT", budget: "Readiness investimenti",
};

type DashboardTab = "overview" | "actions" | "answers" | "cta";
const TABS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Panoramica",  icon: <LayoutGrid size={14} /> },
    { id: "actions",  label: "Priorità",   icon: <Zap size={14} /> },
    { id: "answers",  label: "Risposte",    icon: <MessageSquare size={14} /> },
    { id: "cta",      label: "Consulenza",  icon: <TrendingUp size={14} /> },
];

function scoreGrade(pct: number) {
    if (pct >= 70) return { label: "Avanzato", color: "#4ade80", bar: "bg-green-500" };
    if (pct >= 40) return { label: "In sviluppo", color: "#f59e0b", bar: "bg-cyan-500" };
    return { label: "Iniziale", color: "#f87171", bar: "bg-red-400" };
}
function AnimatedScore({ target }: { target: number }) {
    const c = useMotionValue(0);
    const r = useTransform(c, v => Math.round(v));
    useEffect(() => { if (target) { const a = animate(c, target, { duration: 1.4, ease: [0.16, 1, 0.3, 1] }); return a.stop; } }, [target]);
    return <motion.span>{r}</motion.span>;
}

export function SurveyDashboard() {
    const { theme } = useTheme(); const isDark = theme === "dark";
    const navigate = useNavigate();
    const { survey_id } = useParams();
    const { survey, loading } = useSurvey(survey_id);
    const { allSurveys, refetch: refetchSurveys } = useUserSurvey();
    const { data: dashboardStats } = useSurveyDashboard();

    const currentType: SurveyType = useMemo(() => {
        const e = allSurveys.find(s => s.surveyId === survey_id);
        return (e && ['compliance', 'processes', 'growth'].includes(e.surveyType)) ? e.surveyType as SurveyType : 'diagnostic';
    }, [allSurveys, survey_id]);

    const templateId = useMemo(() => currentType === 'diagnostic' ? import.meta.env.VITE_SURVEY_TEMPLATE_ID : getSurveyConfig(currentType).templateId, [currentType]);
    const { questions } = useSurveyTemplate(templateId);
    const { resetSurvey, loading: resetting } = useResetSurvey();

    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
    const [openAction, setOpenAction] = useState<number | null>(null);
    const [qIndex, setQIndex] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => { if (survey) { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); } }, [survey]);
    useEffect(() => { refetchSurveys(); }, [survey_id, refetchSurveys]);

    if (loading || !survey) return <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}><FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible /></div>;

    const totalScore = survey.score ?? 0;
    const byCategory = survey.score_by_category ?? [];
    const grade = scoreGrade(totalScore);
    const answerEntries = Object.entries(survey.answers);
    const filledCount = answerEntries.filter(([, a]) => a?.filled).length;
    const questionMap = new Map(questions.map(q => [q.id, q]));
    const [cqId, cAnswer] = answerEntries[qIndex] ?? [];
    const cQuestion = questionMap.get(cqId);
    const publishedCount = allSurveys.filter(s => s.status === "published").length;

    const A = isDark;
    const card = A ? "rounded-2xl border overflow-hidden backdrop-blur-sm border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "rounded-2xl border overflow-hidden backdrop-blur-sm border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15";
    const mute = A ? "text-slate-500" : "text-slate-400";
    const body = A ? "text-slate-300" : "text-slate-600";

    const ICONS: Record<string, React.ReactNode> = { diagnostic: <ClipboardList size={20} />, compliance: <ShieldAlert size={20} />, processes: <Settings size={20} />, growth: <TrendingUp size={20} /> };

    return (
        <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
            <div className={`absolute inset-0 pointer-events-none ${A ? "opacity-[0.05]" : "opacity-[0.12]"}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${A ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "32px 32px" }} />

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-20 space-y-8">

                {/* ── SURVEY TYPE PILLS + BACK ── */}
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                        {ALL_SURVEY_TYPES.map(type => {
                            const cfg = getSurveyConfig(type);
                            const entry = allSurveys.find(s => s.surveyType === type);
                            const isActive = type === currentType;
                            const isPub = entry?.status === "published";
                            const clickable = isPub || isActive;
                            return (
                                <button key={type} disabled={!clickable}
                                    onClick={() => { if (clickable && entry) navigate(`/survey/${entry.surveyId}/recap`); }}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0
                                        ${isActive ? (A ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]" : "bg-cyan-50 border-cyan-400 text-cyan-800")
                                            : isPub ? (A ? "border-stone-800/30 text-slate-400 hover:border-cyan-500/20 hover:text-cyan-400" : "border-slate-200 text-slate-500 hover:border-cyan-400")
                                            : "border-stone-800/10 text-slate-700/30 cursor-not-allowed opacity-40"}`}>
                                    <span className={isActive ? "text-cyan-400" : isPub ? (A ? "text-slate-500" : "text-slate-400") : ""}>{ICONS[type]}</span>
                                    <span className="max-w-[140px] truncate">{cfg.label}</span>
                                    {isPub && <span className="text-xs font-mono">{isActive && survey ? `${survey.score ?? "?"}%` : " "}</span>}
                                    {!isPub && <span className="text-[10px] opacity-50">—</span>}
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={() => navigate("/survey/start")} className={`flex items-center gap-1 text-xs font-medium shrink-0 ${A ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
                        <ArrowLeft size={13} /> <span className="hidden sm:inline">Tutti i survey</span>
                    </button>
                </motion.div>

                {/* ── HERO HEADER ── */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${A ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            {getSurveyConfig(currentType).label}
                        </span>
                        <h1 className={`text-2xl sm:text-3xl font-semibold mt-3 ${A ? "text-slate-100" : "text-slate-900"}`}>Report di analisi</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className={`text-[10px] font-mono uppercase tracking-widest ${mute}`}>Survey ID</p>
                            <p className={`text-[11px] font-mono ${A ? "text-slate-500" : "text-slate-400"}`}>{survey._id.slice(-8)}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-widest
                            ${survey.status === "published" ? (A ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200")
                                : (A ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200")}`}>
                            {survey.status === "published" ? <><Check size={10} strokeWidth={3} /> Pubblicato</> : "Bozza"}
                        </div>
                    </div>
                </motion.div>

                {/* ── TWO-COLUMN: SCORE + CATEGORIES ── */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* LEFT: Score hero mini + KPI grid */}
                    <div className="space-y-4">
                        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={card}>
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                            <div className="p-8 flex flex-col items-center text-center">
                                <p className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-4 ${mute}`}>Punteggio complessivo</p>
                                <div className="text-[96px] leading-none font-semibold tabular-nums tracking-tight" style={{ color: grade.color }}>
                                    {ready ? <AnimatedScore target={totalScore} /> : "0"}<span className="text-[40px] align-top" style={{ opacity: 0.7 }}>%</span>
                                </div>
                                <p className="text-sm font-medium uppercase tracking-widest mt-3" style={{ color: grade.color }}>{grade.label}</p>
                                <div className={`w-full h-[4px] rounded-full mt-5 overflow-hidden ${A ? "bg-white/8" : "bg-black/8"}`}>
                                    <motion.div className="h-full rounded-full" style={{ backgroundColor: grade.color }} initial={{ width: 0 }} animate={{ width: ready ? `${totalScore}%` : "0%" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
                                </div>
                                <div className="flex justify-between w-full mt-1.5">
                                    {[0, 25, 50, 75, 100].map(v => <span key={v} className={`text-[9px] font-mono ${mute}`}>{v}</span>)}
                                </div>
                                <div className="flex gap-6 mt-6 pt-5 border-t w-full justify-center" style={{ borderColor: A ? "rgb(41 37 36)" : "rgb(226 232 240)" }}>
                                    <div className="text-center"><p className="text-xl font-semibold tabular-nums">{filledCount}</p><p className={`text-[10px] font-mono uppercase tracking-wider ${mute}`}>Risposte</p></div>
                                    <div className="text-center"><p className="text-xl font-semibold tabular-nums">{byCategory.length}</p><p className={`text-[10px] font-mono uppercase tracking-wider ${mute}`}>Categorie</p></div>
                                    <div className="text-center"><p className="text-xl font-semibold tabular-nums">{dashboardStats?.averageScore != null ? `${Math.round(dashboardStats.averageScore)}%` : "—"}</p><p className={`text-[10px] font-mono uppercase tracking-wider ${mute}`}>Media globale</p></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* KPI mini cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: <Check size={14} />, label: "Survey completati", value: `${publishedCount}/${allSurveys.length}`, color: "#4ade80" },
                                { icon: <Activity size={14} />, label: "Livello", value: grade.label, color: grade.color },
                            ].map(k => (
                                <div key={k.label} className={`rounded-xl border p-4 backdrop-blur-sm ${A ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
                                    <div className="flex items-center gap-2 mb-2"><span style={{ color: k.color }}>{k.icon}</span><p className={`text-[10px] font-mono uppercase tracking-wider ${mute}`}>{k.label}</p></div>
                                    <p className="text-lg font-semibold tabular-nums">{k.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Categories + section tabs */}
                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
                        <div className={card}>
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                            <div className="p-6 space-y-1">
                                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${mute}`}>Score per categoria</p>
                                {byCategory.length === 0 && [...Array(5)].map((_, i) => <div key={i} className={`h-4 rounded ${A ? "bg-white/5" : "bg-black/5"} animate-pulse`} style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 80}ms` }} />)}
                                {byCategory.map((cat, i) => {
                                    const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                    const g = scoreGrade(cat.percentage);
                                    return (
                                        <motion.div key={cat.category} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="py-2.5">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className={`text-xs font-medium ${body}`}>{label}</span>
                                                <span className="text-xs font-mono font-semibold tabular-nums" style={{ color: g.color }}>{cat.percentage}%</span>
                                            </div>
                                            <div className={`h-[3px] rounded-full overflow-hidden ${A ? "bg-white/6" : "bg-black/8"}`}>
                                                <motion.div className={`h-full rounded-full ${g.bar}`} initial={{ width: 0 }} animate={{ width: ready ? `${cat.percentage}%` : "0%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.06 }} />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sub-tabs */}
                        <div className="flex gap-1 overflow-x-auto scrollbar-none">
                            {TABS.map(t => (
                                <button key={t.id} onClick={() => setActiveTab(t.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                                        ${activeTab === t.id ? (A ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400" : "bg-cyan-50 border-cyan-400 text-cyan-800")
                                            : (A ? "border-stone-800/20 text-slate-500 hover:text-cyan-400" : "border-slate-200 text-slate-500 hover:text-cyan-700")}`}>{t.icon}{t.label}</button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── SUB-TAB CONTENT ── */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: "easeOut" as const }}>

                        {activeTab === "overview" && byCategory.length > 0 && (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {byCategory.map((cat, i) => {
                                    const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                    const g = scoreGrade(cat.percentage);
                                    return (
                                        <motion.div key={cat.category} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                            className={`rounded-xl border p-5 backdrop-blur-sm ${card}`}>
                                            <div className="flex items-start justify-between mb-2"><span className={`text-xs font-semibold ${body}`}>{label}</span><span className="text-sm font-mono font-bold tabular-nums" style={{ color: g.color }}>{cat.percentage}%</span></div>
                                            <div className={`h-[3px] rounded-full overflow-hidden mb-3 ${A ? "bg-white/6" : "bg-black/8"}`}><motion.div className={`h-full rounded-full ${g.bar}`} initial={{ width: 0 }} animate={{ width: `${cat.percentage}%` }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.04 }} /></div>
                                            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.color, opacity: 0.7 }}>{g.label}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === "actions" && (
                            <div className="space-y-2">
                                {Object.entries(actionDetails).map(([idx, detail]) => {
                                    const i = Number(idx); const isOpen = openAction === i;
                                    return (
                                        <div key={i} className={card}>
                                            <button onClick={() => setOpenAction(isOpen ? null : i)} className="w-full flex justify-between items-center p-5 text-left">
                                                <div className="flex items-center gap-4"><span className={`font-mono text-[10px] uppercase tracking-[0.15em] ${A ? "text-cyan-500" : "text-cyan-400"}`}>{String(i + 1).padStart(2, "0")}</span><span className={`text-sm font-semibold ${A ? "text-slate-200" : "text-slate-800"}`}>{detail.title}</span></div>
                                                {isOpen ? <ChevronDown size={15} className={mute} /> : <ChevronRight size={15} className={mute} />}
                                            </button>
                                            <AnimatePresence>{isOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" as const }} className="overflow-hidden">
                                                    <div className={`px-5 pb-6 space-y-5 border-t ${A ? "border-stone-800/20" : "border-slate-200"}`}>
                                                        <p className={`text-sm leading-relaxed pt-5 ${body}`}>{detail.context}</p>
                                                        <div className="grid md:grid-cols-2 gap-5"><div><h4 className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-3 ${mute}`}>Rischi</h4><ul className="space-y-1.5">{detail.risks.map((r, j) => <li key={j} className={`flex items-start gap-2 text-sm ${body}`}><span className="text-red-400 mt-0.5">•</span>{r}</li>)}</ul></div>
                                                            <div><h4 className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-3 ${mute}`}>Azioni</h4><ul className="space-y-1.5">{detail.actions.map((a, j) => <li key={j} className={`flex items-start gap-2 text-sm ${body}`}><span className="text-cyan-400 mt-0.5">•</span>{a}</li>)}</ul></div></div>
                                                        <p className={`text-xs pt-3 border-t ${A ? "border-stone-800/20 text-slate-500" : "border-slate-200 text-slate-400"}`}>{detail.outcome}</p>
                                                    </div>
                                                </motion.div>
                                            )}</AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === "answers" && (
                            <div className="space-y-4">
                                <div className="scrollbar-theme flex gap-1.5 overflow-x-auto py-1">
                                    {answerEntries.map(([qid], i) => (
                                        <button key={qid} onClick={() => setQIndex(i)} className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold border transition-colors shrink-0
                                            ${qIndex === i ? "bg-cyan-600 border-cyan-500 text-white" : A ? "border-stone-800/20 text-slate-500 hover:text-slate-300" : "border-slate-200 text-slate-500 hover:bg-[#EDF2F7]"}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <div className={card}>
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                                    <div className="p-7"><p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-3 ${A ? "text-cyan-500" : "text-cyan-600"}`}>Domanda {qIndex + 1}</p>
                                        <h3 className={`text-base font-semibold mb-4 ${A ? "text-slate-100" : "text-slate-800"}`}>{cQuestion?.text.it ?? "—"}</h3><div className={`text-sm ${body}`}>{formatAnswer(cAnswer)}</div></div>
                                </div>
                                <div className="flex justify-between">
                                    <button onClick={() => setQIndex(p => Math.max(p - 1, 0))} disabled={qIndex === 0} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium disabled:opacity-30 ${A ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}><ArrowLeft size={13} /> Precedente</button>
                                    <button onClick={() => setQIndex(p => Math.min(p + 1, answerEntries.length - 1))} disabled={qIndex === answerEntries.length - 1} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium disabled:opacity-30 ${A ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}>Successivo <ArrowRight size={13} /></button>
                                </div>
                            </div>
                        )}

                        {activeTab === "cta" && (
                            <div className={card}>
                                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                                <div className="p-10 text-center space-y-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${A ? "bg-cyan-500/15 border border-cyan-500/20" : "bg-cyan-50 border border-cyan-300"}`}><TrendingUp size={20} className="text-cyan-500" /></div>
                                    <div className="space-y-2"><h2 className={`text-2xl font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>Vuoi migliorare questo punteggio?</h2><p className={`text-sm max-w-md mx-auto ${body}`}>Costruiamo una roadmap operativa per la tua azienda.</p></div>
                                    <button onClick={() => { window.open(import.meta.env.VITE_CALENDLY_URL, "_blank"); navigate("/survey"); }} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 duration-200"><Calendar size={14} /> Richiedi consulenza strategica</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── RESET ── */}
                <div className="flex justify-center pt-2">
                    <button disabled={resetting} onClick={async () => { if (!survey_id) return; if (!window.confirm("Reset del survey?")) return; await resetSurvey(survey_id, templateId, "it"); navigate("/survey/start"); }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium disabled:opacity-40 transition-colors ${A ? "border-red-900/30 text-slate-500 hover:border-red-600/40 hover:text-red-400" : "border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500"}`}>
                        {resetting ? <FallingLines color={A ? "#fff" : "#000"} width="15" visible /> : <><RotateCcw size={12} /> Reset Survey</>}
                    </button>
                </div>
            </div>
        </main>
    );
}
