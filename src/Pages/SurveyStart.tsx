import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle, ClipboardList, ShieldAlert, Settings, TrendingUp, Lock } from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useSurvey } from "../hooks/useSurvey";
import { useInitSurvey } from "../hooks/useInitSurvey";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import SecurityItem from "../Components/Survey/SecurityItem.tsx";
import { SurveyIntro } from "../Components/Survey/SurveyIntro.tsx";
import { getSurveyConfig, type SurveyType } from "../types/survey.ts";


const steps = [
    { n: "01", title: "Raccolta informazioni", desc: "Inserisci dati su processi, strumenti e organizzazione aziendale." },
    { n: "02", title: "Analisi", desc: "Le informazioni vengono strutturate per individuare inefficienze e opportunità." },
    { n: "03", title: "Confronto", desc: "Possibilità di fissare un incontro per definire le prossime azioni operative." },
];

const securityItems = [
    { title: "Accesso e controllo interno", body: "Accesso limitato ai membri autorizzati con logging e audit delle attività." },
    { title: "Autenticazione e sessioni", body: "Sistema basato su JWT e refresh token con validazione server-side." },
    { title: "Protezione attiva", body: "Protezione da brute force e controllo traffico." },
    { title: "Monitoraggio", body: "Logging e osservabilità tramite infrastruttura cloud (Railway, Vercel)." },
    { title: "Gestione dei dati", body: "Nessuna condivisione con terze parti. Cancellazione entro 60 giorni su richiesta." },
];

const MINOR_CARD_STYLES = {
    compliance: {
        accent: "cyan" as const,
        gradient: "from-cyan-500/60 via-cyan-500/20 to-transparent",
        icon: ShieldAlert,
        colorClass: "text-cyan-400",
        borderClass: "border-cyan-500/30",
        glowClass: "shadow-cyan-500/10",
        bgClass: "bg-cyan-500/10",
    },
    processes: {
        accent: "amber" as const,
        gradient: "from-amber-500/60 via-amber-500/20 to-transparent",
        icon: Settings,
        colorClass: "text-amber-400",
        borderClass: "border-amber-500/30",
        glowClass: "shadow-amber-500/10",
        bgClass: "bg-amber-500/10",
    },
    growth: {
        accent: "emerald" as const,
        gradient: "from-emerald-500/60 via-emerald-500/20 to-transparent",
        icon: TrendingUp,
        colorClass: "text-emerald-400",
        borderClass: "border-emerald-500/30",
        glowClass: "shadow-emerald-500/10",
        bgClass: "bg-emerald-500/10",
    },
} as const;

export function SurveyStart() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { isAuthenticated, emailVer } = useAuth();

    const templateId = import.meta.env.VITE_SURVEY_TEMPLATE_ID;
    const locale = "it" as const;

    const { surveyId, loading: loadingSurveyId, refetch, findSurveyByType } = useUserSurvey();
    const { survey, loading: loadingSurvey } = useSurvey(surveyId);
    const { initSurvey, loading: initLoading } = useInitSurvey();

    const mainCompleted = survey?.status === "published";
    const mainScore = survey?.score ?? null;

    const handleStartMain = async () => {
        try {
            if (survey?._id) {
                navigate(survey.status === "published" ? `/survey/${survey._id}/recap` : `/survey`);
                return;
            }
            const newSurveyId = await initSurvey(templateId, locale);
            if (newSurveyId) {
                await refetch();
                navigate(`/survey`);
            }
        } catch (e) { console.error("Errore avvio survey:", e); }
    };

    const handleMinorClick = async (type: SurveyType) => {
        const existing = findSurveyByType(type);
        if (existing) {
            navigate(existing.status === "published" ? `/survey/${existing.surveyId}/recap` : `/survey/minor/${type}`);
        } else {
            const cfg = getSurveyConfig(type);
            const newId = await initSurvey(cfg.templateId, locale, type);
            if (newId) {
                refetch();
                navigate(`/survey/minor/${type}`);
            }
        }
    };

    const minorTypes = ["compliance", "processes", "growth"] as const;

    const getMinorState = (type: SurveyType): "locked" | "available" | "in_progress" | "completed" => {
        if (!mainCompleted) return "locked";
        const existing = findSurveyByType(type);
        if (!existing) return "available";
        if (existing.status === "published") return "completed";
        return "in_progress";
    };

    if (!isAuthenticated) return <SurveyIntro />;

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"} px-6 py-24`}>
            {initLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <FallingLines width="60" color="#fff" visible />
                </div>
            )}

            {/* Grid + radial bg */}
            <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.05]" : "opacity-[0.12]"}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />
            {isDark && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent pointer-events-none" />}

            {/* ─── Hero header ─── */}
            <motion.section
                className="relative z-10 max-w-4xl mx-auto text-center space-y-5 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                    isDark ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"
                }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Diagnostic Hub
                </span>
                <h1 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Misura la tua{" "}
                    <span className={isDark ? "text-cyan-400" : "text-sky-700"}>maturità digitale</span>
                </h1>
                <p className={`text-base leading-relaxed max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Quattro assessment diagnostici per mappare processi, sicurezza IT ed efficienza operativa.
                    Ogni survey produce un report con azioni prioritarie.
                </p>
            </motion.section>

            {emailVer ? (
                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    {/* ─── MAIN SURVEY — hero card ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                        <div className={`relative rounded-2xl border overflow-hidden backdrop-blur-sm ${
                            isDark
                                ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10"
                                : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"
                        }`}>
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                                        isDark ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-cyan-50 border border-cyan-200"
                                    }`}>
                                        <ClipboardList size={22} className={isDark ? "text-cyan-400" : "text-cyan-600"} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-cyan-500" : "text-cyan-600"}`}>
                                                Survey principale
                                            </span>
                                            {mainCompleted && (
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                                                    isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"
                                                }`}>
                                                    Completato
                                                </span>
                                            )}
                                            {survey && !mainCompleted && (
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                                                    isDark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"
                                                }`}>
                                                    In corso
                                                </span>
                                            )}
                                        </div>
                                        <h2 className={`text-xl font-semibold mb-1.5 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                            Diagnostic Questionnaire
                                        </h2>
                                        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                            Il questionario completo che analizza processi, strumenti e organizzazione aziendale per individuare le aree di miglioramento prioritarie.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        {mainScore !== null && (
                                            <div className="text-right">
                                                <p className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Score</p>
                                                <p className="text-2xl font-semibold tabular-nums text-cyan-400">{mainScore}%</p>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleStartMain}
                                            disabled={initLoading || loadingSurvey || loadingSurveyId}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                                                bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed
                                                text-white text-sm font-semibold transition-all
                                                shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 duration-200 whitespace-nowrap"
                                        >
                                            {initLoading
                                                ? <FallingLines width="20" color="#fff" visible />
                                                : <>
                                                    {survey?.status === "published" ? "Vedi report" : survey ? "Continua" : "Inizia"}
                                                    <ArrowRight size={14} />
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Connector ─── */}
                    <div className="flex items-center justify-center gap-3 py-1">
                        <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-r from-transparent to-cyan-500/20" : "bg-gradient-to-r from-transparent to-sky-300"}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>Diagnostici specializzati</span>
                        <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-l from-transparent to-cyan-500/20" : "bg-gradient-to-l from-transparent to-sky-300"}`} />
                    </div>

                    {/* ─── MINOR SURVEYS — 3 cards ─── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {minorTypes.map((type, i) => {
                            const cfg = getSurveyConfig(type);
                            const state = getMinorState(type);
                            const st = MINOR_CARD_STYLES[type];
                            const IconCmp = st.icon;

                            return (
                                <motion.button
                                    key={type}
                                    onClick={() => handleMinorClick(type)}
                                    disabled={state === "locked" || initLoading}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                                    className={`relative rounded-2xl border overflow-hidden backdrop-blur-sm text-left transition-all duration-300
                                        disabled:cursor-not-allowed group
                                        ${state === "locked"
                                            ? "opacity-30 border-stone-800/20 bg-[#0E0E0D]/40"
                                            : isDark
                                                ? `${st.borderClass} bg-[#0E0E0D]/70 hover:-translate-y-1 ${st.glowClass}`
                                                : "border-sky-300 bg-white hover:-translate-y-1 shadow-sm"
                                        }`}
                                >
                                    {state !== "locked" && (
                                        <div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${st.gradient}`} />
                                    )}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                state === "locked" ? "bg-stone-800/20" : isDark ? st.bgClass : "bg-sky-50"
                                            }`}>
                                                {state === "locked"
                                                    ? <Lock size={17} className="text-stone-600" />
                                                    : <IconCmp size={17} className={isDark ? st.colorClass : "text-sky-600"} />
                                                }
                                            </div>
                                            {state === "completed" && (
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1
                                                    ${isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"}`}>
                                                    <CheckCircle size={9} />
                                                    Fatto
                                                </span>
                                            )}
                                            {state === "in_progress" && (
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md
                                                    ${isDark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                                                    In corso
                                                </span>
                                            )}
                                        </div>

                                        <h3 className={`text-sm font-semibold mb-1.5 ${state === "locked"
                                            ? (isDark ? "text-stone-600" : "text-stone-400")
                                            : (isDark ? "text-slate-200" : "text-slate-800")
                                        }`}>
                                            {cfg.label}
                                        </h3>
                                        <p className={`text-xs leading-relaxed mb-4 ${state === "locked"
                                            ? (isDark ? "text-stone-700" : "text-stone-400")
                                            : (isDark ? "text-slate-500" : "text-slate-500")
                                        }`}>
                                            {state === "locked" ? "Completa il Diagnostic Questionnaire per sbloccare" : cfg.description}
                                        </p>

                                        <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                                            state === "locked"
                                                ? "text-stone-600"
                                                : isDark ? `${st.colorClass} group-hover:gap-2` : "text-sky-600 group-hover:gap-2"
                                        }`}>
                                            <span className="transition-all group-hover:gap-2">
                                                {state === "completed" ? "Vedi report" : state === "in_progress" ? "Continua" : state === "available" ? "Inizia" : "Bloccato"}
                                            </span>
                                            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="relative z-10 max-w-md mx-auto text-center">
                    <button
                        disabled
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border
                            border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium cursor-not-allowed"
                    >
                        Verifica prima la tua email
                    </button>
                </div>
            )}

            {/* ─── Steps ─── */}
            <section className="relative z-10 max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                    <motion.div
                        key={s.n}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                    >
                        <div className={`relative rounded-2xl border backdrop-blur-sm p-7 h-full ${
                            isDark ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white/80 border-sky-400/50 shadow-sm"
                        }`}>
                            <span className={`text-xs font-mono font-medium mb-4 block ${isDark ? "text-cyan-500" : "text-sky-500"}`}>{s.n}</span>
                            <h3 className={`text-base font-semibold mb-3 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{s.title}</h3>
                            <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-600"}`}>{s.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* ─── Security ─── */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto mt-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={`rounded-2xl border backdrop-blur-sm p-7 ${
                    isDark ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white/80 border-sky-400/50"
                }`}>
                    <div className="flex items-center gap-2 mb-5">
                        <ShieldCheck size={16} className="text-cyan-400" />
                        <h2 className={`text-base font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Protezione dei dati</h2>
                    </div>
                    <div className="space-y-0">
                        {securityItems.map(item => (
                            <SecurityItem key={item.title} title={item.title}>{item.body}</SecurityItem>
                        ))}
                    </div>
                    <p className={`text-xs mt-5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Infrastruttura basata su servizi cloud moderni con controlli di accesso avanzati e monitoraggio continuo.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
