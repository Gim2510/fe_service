import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Calendar, ArrowRight, AlertCircle, X, Check } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useSurvey } from "../../hooks/useSurvey.ts";

const CATEGORY_LABELS: Record<string, string> = {
    leadership:   "Leadership",
    azienda:      "Maturità aziendale",
    software:     "Software & Strumenti",
    processi:     "Processi operativi",
    integrazione: "Integrazione sistemi",
    it_security:  "Sicurezza IT",
    budget:       "Readiness investimenti",
};

function scoreGrade(pct: number): { label: string; color: string; dimColor: string; barColor: string } {
    if (pct >= 70) return { label: "Avanzato",     color: "#4ade80", dimColor: "rgba(74,222,128,0.12)", barColor: "bg-green-500" };
    if (pct >= 40) return { label: "In sviluppo",  color: "#f59e0b", dimColor: "rgba(245,158,11,0.12)", barColor: "bg-emerald-500" };
    return             { label: "Iniziale",        color: "#f87171", dimColor: "rgba(248,113,113,0.12)", barColor: "bg-red-400" };
}

function AnimatedScore({ target }: { target: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));

    useEffect(() => {
        if (!target) return;
        const ctrl = animate(count, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
        return ctrl.stop;
    }, [target]);

    return <motion.span>{rounded}</motion.span>;
}

export function SurveyConfirmation({ survey_id }: { survey_id: string }) {
    const [consultationBooked, setConsultationBooked] = useState(false);
    const [showLeavePageModal, setShowLeavePageModal]   = useState(false);
    const [ready, setReady] = useState(false);

    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const { survey } = useSurvey(survey_id);

    useEffect(() => {
        if (survey) {
            const t = setTimeout(() => setReady(true), 120);
            return () => clearTimeout(t);
        }
    }, [survey]);

    const handleBookAppointment = () => {
        setConsultationBooked(true);
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
    };

    const handleViewNextStep = () => {
        if (!consultationBooked) setShowLeavePageModal(true);
        else navigate(`/survey/${survey_id}/recap`);
    };

    const handleProceedAnyway = () => {
        setShowLeavePageModal(false);
        navigate(`/survey/${survey_id}/recap`);
    };

    const totalScore  = survey?.score ?? 0;
    const byCategory  = survey?.score_by_category ?? [];
    const grade       = scoreGrade(totalScore);
    const border      = isDark ? "border-stone-800/30" : "border-slate-200";
    const mutedText   = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText    = isDark ? "text-slate-300" : "text-slate-600";

    return (
        <div className="w-full space-y-5">

            {/* ── Main card ── */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full rounded-2xl border overflow-hidden ${border}`}
                style={{ background: isDark ? "#161614" : "#FAFAF8" }}
            >
                {/* rose accent line */}
                <div className="h-[2px] w-full bg-emerald-700/60" />

                <div className="flex flex-col lg:flex-row min-h-[340px]">

                    {/* ── LEFT — score panel ── */}
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
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${mutedText}`}>
                                    Assessment completato
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
                                <span className="text-[36px] align-top mt-3 inline-block ml-0.5" style={{ color: grade.color, opacity: 0.7 }}>%</span>
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

                    {/* ── RIGHT — categories + CTA ── */}
                    <div className="flex flex-col flex-1 p-8 gap-6">

                        {/* categories */}
                        <div className="flex-1 space-y-1">
                            <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${mutedText}`}>
                                Score per area
                            </p>

                            {byCategory.length === 0 && (
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`h-4 rounded ${isDark ? "bg-white/5" : "bg-black/5"} animate-pulse`}
                                             style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 80}ms` }} />
                                    ))}
                                </div>
                            )}

                            {byCategory.map((cat, i) => {
                                const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                const g = scoreGrade(cat.percentage);
                                return (
                                    <motion.div
                                        key={cat.category}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + i * 0.07 }}
                                        className="group py-2.5"
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className={`text-xs font-medium ${bodyText} group-hover:text-slate-200 transition-colors`}>
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

                        {/* horizontal divider */}
                        <div className={`h-px w-full ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />

                        {/* step progress + CTAs */}
                        <div className="space-y-4">
                            {/* step pills */}
                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"}`}>
                                    <Check size={9} strokeWidth={3} /> Questionario
                                </span>
                                <span className={`h-px flex-1 ${isDark ? "bg-stone-800/50" : "bg-slate-200"}`} />
                                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors duration-500
                                    ${consultationBooked
                                        ? isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"
                                        : isDark ? "border border-stone-800/30 text-slate-600" : "border border-slate-200 text-slate-400"
                                    }`}>
                                    {consultationBooked && <Check size={9} strokeWidth={3} />}
                                    Consulenza
                                </span>
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-2.5">
                                <button
                                    onClick={handleViewNextStep}
                                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5
                                        rounded-xl border text-xs font-medium transition-all
                                        ${isDark
                                            ? "border-stone-800/40 text-slate-400 hover:text-slate-200 hover:border-emerald-800/40"
                                            : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7] hover:border-slate-300"
                                        }`}
                                >
                                    Analisi completa
                                    <ArrowRight size={12} />
                                </button>

                                <button
                                    onClick={handleBookAppointment}
                                    disabled={consultationBooked}
                                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5
                                        rounded-xl text-xs font-semibold transition-all duration-200
                                        ${consultationBooked
                                            ? isDark ? "bg-green-500/10 border border-green-500/20 text-green-400 cursor-default" : "bg-green-50 border border-green-200 text-green-600 cursor-default"
                                            : "bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-700/20 hover:-translate-y-0.5"
                                        }`}
                                >
                                    {consultationBooked
                                        ? <><Check size={12} strokeWidth={2.5} /> Prenotato</>
                                        : <><Calendar size={12} /> Prenota consulenza</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── bottom note ── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className={`text-center text-[11px] ${mutedText}`}
            >
                L'analisi dettagliata per area è disponibile nel report completo
            </motion.p>

            {/* ── Leave page modal ── */}
            <AnimatePresence>
                {showLeavePageModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLeavePageModal(false)}
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
                                onClick={() => setShowLeavePageModal(false)}
                                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                                    ${isDark ? "text-slate-500 hover:text-slate-300 hover:bg-white/5" : "text-slate-400 hover:text-slate-700 hover:bg-[#EDF2F7]"}`}
                            >
                                <X size={16} />
                            </button>

                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                                ${isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
                                <AlertCircle size={20} className="text-emerald-400" />
                            </div>

                            <div className="space-y-1.5">
                                <h3 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Consulenza non prenotata
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    La consulenza gratuita 1:1 ti permette di analizzare i risultati e
                                    ricevere un preventivo su misura. Vuoi procedere lo stesso?
                                </p>
                            </div>

                            <div className="flex gap-2.5 pt-1">
                                <button
                                    onClick={() => setShowLeavePageModal(false)}
                                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                        ${isDark ? "border-stone-800/40 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleProceedAnyway}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600
                                        text-white text-sm font-semibold transition-colors"
                                >
                                    Procedi comunque
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
