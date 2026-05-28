import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle, ClipboardList, ShieldAlert, Settings, TrendingUp, Lock, BarChart3, Target, Gauge, Lightbulb, Layers, BrainCircuit, PieChart, Zap, Globe, Workflow, Timer } from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useSurvey } from "../hooks/useSurvey";
import { useInitSurvey } from "../hooks/useInitSurvey";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import { SurveyIntro } from "../Components/Survey/SurveyIntro.tsx";
import { getSurveyConfig, type SurveyType } from "../types/survey.ts";

type SectionInfo = {
    label: string;
    description: string;
    methodology: string;
    scoringLabel: string;
    scoringDesc: string;
    areas: { name: string; desc: string; icon: React.ReactNode }[];
    metrics: { label: string; value: string }[];
    ctaLabel: string;
    ctaCompleted: string;
};

const SURVEYS_INFO: Record<SurveyType, SectionInfo> = {
    diagnostic: {
        label: "Diagnostic Questionnaire",
        description: "Un assessment completo a 360° che mappa il livello di digitalizzazione dell'azienda analizzando processi, strumenti software, integrazione tra sistemi e maturità organizzativa. È il punto di partenza per qualsiasi percorso di trasformazione digitale.",
        methodology: "Attraverso un questionario strutturato in 7 aree tematiche, raccogliamo dati qualitativi e quantitativi sui processi aziendali. Ogni risposta viene pesata in base alla rilevanza strategica dell'area, producendo un Digital Readiness Score che confronta lo stato attuale con le best practice di settore.",
        scoringLabel: "Digital Readiness Score",
        scoringDesc: "Lo score complessivo (0-100%) si basa sulla media ponderata di 7 categorie: Leadership, Maturità Aziendale, Software, Processi, Integrazione, Sicurezza IT e Readiness Investimenti. Punteggi sotto il 40% indicano aree critiche, sopra il 70% indicano maturità avanzata.",
        areas: [
            { name: "Leadership & Governance", desc: "Visione strategica, sponsorship del management, metriche", icon: <Target size={14} /> },
            { name: "Maturità Aziendale", desc: "Struttura organizzativa, competenze digitali interne", icon: <Layers size={14} /> },
            { name: "Software & Strumenti", desc: "CRM, ERP, strumenti collaborativi in uso", icon: <Settings size={14} /> },
            { name: "Processi Operativi", desc: "Automazione workflow, gestione documentale", icon: <Workflow size={14} /> },
            { name: "Integrazione Sistemi", desc: "API, sincronizzazione dati tra piattaforme", icon: <BrainCircuit size={14} /> },
            { name: "Sicurezza IT", desc: "Policy, backup, controllo accessi", icon: <ShieldCheck size={14} /> },
            { name: "Readiness Investimenti", desc: "Budget IT, propensione all'innovazione", icon: <PieChart size={14} /> },
        ],
        metrics: [
            { label: "Domande", value: "~35" },
            { label: "Tempo medio", value: "8-12 min" },
            { label: "Categorie", value: "7" },
            { label: "Output", value: "Report + azioni prioritarie" },
        ],
        ctaLabel: "Avvia il questionario",
        ctaCompleted: "Vedi report completo",
    },
    compliance: {
        label: "IT Compliance & Normativa",
        description: "Un assessment specialistico che misura il grado di conformità dell'azienda rispetto alle normative sulla protezione dei dati (GDPR), alla sicurezza informatica e alle best practice di governance IT. Identifica i gap normativi che espongono l'azienda a rischi legali e sanzioni.",
        methodology: "Il questionario esamina 24 domande distribuite su 4 aree chiave della compliance IT. Ogni risposta viene mappata su una scala di maturità normativa. Lo scoring per categoria evidenzia le aree dove la non conformità rappresenta un rischio concreto di sanzioni o incidenti di sicurezza. Le raccomandazioni finali seguono il framework ISO 27001 e le linee guida del Garante Privacy.",
        scoringLabel: "Compliance Score",
        scoringDesc: "Il punteggio (0-100%) riflette il livello di adeguamento normativo. Sotto il 40%: rischio sanzioni GDPR (fino a 20M o 4% del fatturato). 40-70%: conformità parziale con gap da colmare. Sopra 70%: buon livello di compliance. Le aree con score inferiore al 50% vengono segnalate come prioritarie per un intervento immediato.",
        areas: [
            { name: "GDPR & Privacy", desc: "DPO, registro trattamenti, consensi, data retention, data breach response", icon: <ShieldAlert size={14} /> },
            { name: "Sicurezza Informatica", desc: "2FA, password policy, antivirus/EDR, vulnerability scanning, penetration test, SIEM/SOC", icon: <Lock size={14} /> },
            { name: "Infrastruttura IT", desc: "Firewall, backup, disaster recovery, business continuity, ridondanza geografica", icon: <Layers size={14} /> },
            { name: "Policy & Governance", desc: "Policy BYOD, audit interni, classificazione dati, vendor risk, certificazioni ISO", icon: <ClipboardList size={14} /> },
        ],
        metrics: [
            { label: "Domande", value: "24" },
            { label: "Tempo medio", value: "6-8 min" },
            { label: "Categorie", value: "4" },
            { label: "Output", value: "Gap analysis normativa" },
        ],
        ctaLabel: "Verifica la tua compliance",
        ctaCompleted: "Vedi report compliance",
    },
    processes: {
        label: "Maturità dei Processi",
        description: "Un assessment operativo che analizza il grado di automazione e digitalizzazione dei processi interni. Misura l'efficienza di 4 aree funzionali (Finance, Operations, HR, Sales) e quantifica le ore/uomo perse in attività manuali che potrebbero essere automatizzate con un ROI immediato.",
        methodology: "24 domande organizzate per funzione aziendale valutano il livello di automazione su una scala da completamente manuale a completamente digitalizzato. Lo scoring pesa ogni processo in base all'impatto operativo: i processi finance e operations hanno peso maggiore perché generano il maggior risparmio se automatizzati. Il report finale stima le ore recuperabili e il risparmio economico potenziale.",
        scoringLabel: "Automation Index",
        scoringDesc: "L'Automation Index (0-100%) indica quanto sono digitalizzati i processi. Sotto il 30%: prevalentemente manuale (rischio errori, lentezza). 30-60%: ibrido con ampi margini di miglioramento. Sopra 60%: buona automazione. Il report stima anche le ore/settimana recuperabili con l'automazione dei processi ancora manuali.",
        areas: [
            { name: "Finance & Amministrazione", desc: "Fatturazione elettronica, riconciliazione, flussi approvativi, budgeting, tesoreria", icon: <PieChart size={14} /> },
            { name: "Operations & Supply Chain", desc: "Ordini/fornitori, magazzino, tracciabilità, controllo qualità, manutenzione, produzione", icon: <Workflow size={14} /> },
            { name: "HR & Organizzazione", desc: "Recruiting, onboarding, performance, formazione, presenze, payroll", icon: <Layers size={14} /> },
            { name: "Sales & Customer", desc: "CRM, pipeline, preventivazione, contratti, customer service, retention", icon: <Target size={14} /> },
        ],
        metrics: [
            { label: "Domande", value: "24" },
            { label: "Tempo medio", value: "6-8 min" },
            { label: "Categorie", value: "4" },
            { label: "Output", value: "Automation Index + stima risparmio" },
        ],
        ctaLabel: "Analizza i tuoi processi",
        ctaCompleted: "Vedi report processi",
    },
    growth: {
        label: "Crescita Digitale & Competitività",
        description: "Un assessment di marketing e vendita che misura la maturità digitale commerciale dell'azienda. Valuta la presenza online, le strategie di vendita digitale, l'uso di strumenti di marketing automation e dati, e il livello di innovazione tecnologica rispetto ai competitor del settore.",
        methodology: "24 domande su 4 aree della crescita digitale analizzano il posizionamento competitivo online. Ogni risposta viene confrontata con benchmark di settore (quando disponibili dalla dashboard_service). Lo scoring premia le aziende che hanno una presenza digitale integrata (sito + e-commerce + marketing automation + analytics) e penalizza chi opera in modo frammentato. Il report include raccomandazioni tattiche per colmare il gap competitivo.",
        scoringLabel: "Digital Growth Score",
        scoringDesc: "Il Digital Growth Score (0-100%) misura la competitività digitale. Sotto il 35%: presenza online minima, rischio di perdita quote di mercato. 35-65%: presenza attiva ma non ottimizzata. Sopra 65%: buon posizionamento competitivo. Le aree sotto il 50% rappresentano opportunità di crescita immediata con interventi mirati.",
        areas: [
            { name: "Presenza Online", desc: "Sito web, SEO tecnico, content strategy, social media, reputation, local SEO", icon: <Globe size={14} /> },
            { name: "Vendita Digitale", desc: "E-commerce B2B/B2C, marketplace, pagamenti digitali, checkout UX, cross-selling, recupero carrelli", icon: <Zap size={14} /> },
            { name: "Marketing & Dati", desc: "Marketing automation, lead scoring, analytics, CDP, personalizzazione, attribution", icon: <BarChart3 size={14} /> },
            { name: "Innovazione & Tecnologia", desc: "API/Integrazioni, mobile app, AI/ML, IoT, RPA, blockchain/tracciabilità", icon: <BrainCircuit size={14} /> },
        ],
        metrics: [
            { label: "Domande", value: "24" },
            { label: "Tempo medio", value: "6-8 min" },
            { label: "Categorie", value: "4" },
            { label: "Output", value: "Competitive gap analysis" },
        ],
        ctaLabel: "Misura la tua crescita",
        ctaCompleted: "Vedi report crescita",
    },
};

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

    const minorTypes: SurveyType[] = ["compliance", "processes", "growth"];

    const getMinorState = (type: SurveyType): "locked" | "available" | "in_progress" | "completed" => {
        if (!mainCompleted) return "locked";
        const existing = findSurveyByType(type);
        if (!existing) return "available";
        if (existing.status === "published") return "completed";
        if (!existing.hasAnswers) return "available";
        return "in_progress";
    };

    if (!isAuthenticated) return <SurveyIntro />;

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
            {initLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <FallingLines width="60" color="#fff" visible />
                </div>
            )}

            <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.04]" : "opacity-[0.12]"}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
            {isDark && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />}

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-32 space-y-24">

                {/* ═══════════ HERO ═══════════ */}
                <motion.header
                    className="text-center space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                        isDark ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Assessment Platform
                    </span>
                    <h1 className={`font-fjalla text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Misura la tua{" "}
                        <span className={isDark ? "text-cyan-400" : "text-sky-700"}>maturità digitale</span>
                    </h1>
                    <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Quattro assessment diagnostici indipendenti per mappare ogni dimensione della tua azienda:
                        organizzazione, compliance, efficienza operativa e competitività digitale.
                    </p>
                    <div className="flex items-center justify-center gap-1.5">
                        <Timer size={13} className={isDark ? "text-slate-600" : "text-slate-400"} />
                        <span className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Ogni survey: 6-12 minuti · Nessuna condivisione con terze parti
                        </span>
                    </div>
                </motion.header>

                {/* ═══════════ MAIN DIAGNOSTIC ═══════════ */}
                <SectionBlock
                    surveyType="diagnostic"
                    info={SURVEYS_INFO.diagnostic}
                    state={mainCompleted ? "completed" : survey ? "in_progress" : "available"}
                    score={mainScore}
                    ctaDisabled={initLoading || loadingSurvey || loadingSurveyId || !emailVer}
                    onCta={handleStartMain}
                    isDark={isDark}
                />

                {/* ═══════════ SEPARATOR ═══════════ */}
                <div className="flex items-center gap-4">
                    <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : "bg-gradient-to-r from-sky-300 to-transparent"}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-[0.25em] whitespace-nowrap ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Moduli specialistici
                    </span>
                    <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : "bg-gradient-to-l from-sky-300 to-transparent"}`} />
                </div>

                {/* ═══════════ 3 MINOR SURVEYS ═══════════ */}
                {minorTypes.map((type, i) => {
                    const info = SURVEYS_INFO[type];
                    const state = getMinorState(type);
                    const ac = ACCENT_COLORS[type];

                    return (
                        <SectionBlock
                            key={type}
                            surveyType={type}
                            info={info}
                            state={state}
                            accent={ac}
                            ctaDisabled={state === "locked" || initLoading || !emailVer}
                            onCta={() => handleMinorClick(type)}
                            isDark={isDark}
                            delay={0.1 + i * 0.06}
                        />
                    );
                })}

            </div>
        </main>
    );
}

/* ─── Section Block Component ─── */
function SectionBlock({
    surveyType,
    info,
    state,
    score,
    accent,
    ctaDisabled,
    onCta,
    isDark,
    delay = 0,
}: {
    surveyType: SurveyType;
    info: SectionInfo;
    state: "locked" | "available" | "in_progress" | "completed";
    score?: number | null;
    accent?: typeof ACCENT_COLORS[keyof typeof ACCENT_COLORS];
    ctaDisabled: boolean;
    onCta: () => void;
    isDark: boolean;
    delay?: number;
}) {
    const isMain = surveyType === "diagnostic";
    const borderClass = isMain
        ? "border-cyan-500/30"
        : accent?.border ?? "border-stone-800/20";
    const barClass = isMain
        ? "from-cyan-500/60 via-cyan-500/20 to-transparent"
        : accent?.bar ?? "from-stone-500/20 to-transparent";
    const cardBg = isDark ? "bg-[#0E0E0D]/70" : "bg-white/80";
    const glow = isMain ? "shadow-lg shadow-cyan-500/10" : "";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText = isDark ? "text-slate-300" : "text-slate-600";
    const headingText = isDark ? "text-slate-100" : "text-slate-900";

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            <div className={`relative rounded-2xl border overflow-hidden backdrop-blur-sm ${cardBg} ${borderClass} ${glow} ${state === "locked" ? "opacity-40" : ""}`}>
                <div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${barClass}`} />

                <div className="p-8 sm:p-10 space-y-10">
                    {/* ── Header row ── */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                            isMain
                                ? (isDark ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-cyan-50 border border-cyan-200")
                                : accent
                                    ? (isDark ? `${accent.bg} border ${accent.border}` : "bg-sky-50 border border-sky-200")
                                    : ""
                        }`}>
                            {surveyType === "diagnostic" && <ClipboardList size={24} className={isDark ? "text-cyan-400" : "text-cyan-600"} />}
                            {surveyType === "compliance" && <ShieldAlert size={24} className={isDark ? accent?.text ?? "text-cyan-400" : "text-sky-600"} />}
                            {surveyType === "processes" && <Settings size={24} className={isDark ? accent?.text ?? "text-amber-400" : "text-sky-600"} />}
                            {surveyType === "growth" && <TrendingUp size={24} className={isDark ? accent?.text ?? "text-emerald-400" : "text-sky-600"} />}
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-mono uppercase tracking-widest ${isMain ? (isDark ? "text-cyan-500" : "text-cyan-600") : isDark ? "text-slate-500" : "text-slate-400"}`}>
                                    {isMain ? "Survey principale" : "Modulo specialistico"}
                                </span>
                                {state === "completed" && (
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 ${isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"}`}>
                                        <CheckCircle size={9} /> Completato
                                    </span>
                                )}
                                {state === "in_progress" && (
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isDark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                                        In corso
                                    </span>
                                )}
                                {state === "locked" && (
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 ${isDark ? "bg-stone-800/30 text-stone-500 border border-stone-700/20" : "bg-stone-100 text-stone-500 border border-stone-200"}`}>
                                        <Lock size={9} /> Bloccato
                                    </span>
                                )}
                            </div>
                            <h2 className={`text-2xl sm:text-3xl font-semibold ${headingText}`}>
                                {info.label}
                            </h2>
                            <p className={`text-sm leading-relaxed max-w-3xl ${bodyText}`}>
                                {info.description}
                            </p>

                            {/* ── Metrics strip ── */}
                            <div className="flex flex-wrap gap-5 pt-2">
                                {info.metrics.map(m => (
                                    <div key={m.label} className="text-center min-w-[4rem]">
                                        <p className={`text-lg font-semibold tabular-nums ${isMain ? (isDark ? "text-cyan-400" : "text-cyan-700") : isDark ? accent?.text ?? "text-slate-200" : "text-sky-700"}`}>
                                            {m.value}
                                        </p>
                                        <p className={`text-[10px] font-mono uppercase tracking-widest ${mutedText}`}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Score + CTA ── */}
                        <div className="shrink-0 flex sm:flex-col items-end sm:items-center gap-3 sm:gap-4">
                            {score !== null && score !== undefined && (
                                <div className={`text-center px-4 py-3 rounded-xl border ${isDark ? "border-cyan-500/20 bg-cyan-500/5" : "border-cyan-200 bg-cyan-50"}`}>
                                    <p className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${mutedText}`}>Score</p>
                                    <p className={`text-2xl font-semibold tabular-nums ${isDark ? "text-cyan-400" : "text-cyan-700"}`}>
                                        {score}%
                                    </p>
                                </div>
                            )}
                            <button
                                onClick={onCta}
                                disabled={ctaDisabled}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap ${
                                        state === "locked"
                                            ? (isDark ? "bg-stone-800/40 text-stone-500 cursor-not-allowed" : "bg-stone-100 text-stone-400 cursor-not-allowed")
                                            : isMain
                                                ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5"
                                                : isDark
                                                    ? "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10"
                                                    : "bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:-translate-y-0.5"
                                    }`}
                                >
                                    {state === "completed" ? info.ctaCompleted : state === "in_progress" ? "Continua" : info.ctaLabel}
                                    <ArrowRight size={14} />
                                </button>
                        </div>
                    </div>

                    {/* ── Divider ── */}
                    <div className={`h-px ${isDark ? "bg-stone-800/30" : "bg-slate-200"}`} />

                    {/* ── Methodology + Scoring ── */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Lightbulb size={14} className={isMain ? "text-cyan-400" : accent?.text ?? isDark ? "text-slate-400" : "text-sky-500"} />
                                <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingText}`}>Metodologia</h3>
                            </div>
                            <p className={`text-sm leading-relaxed ${bodyText}`}>{info.methodology}</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Gauge size={14} className={isMain ? "text-cyan-400" : accent?.text ?? isDark ? "text-slate-400" : "text-sky-500"} />
                                <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingText}`}>{info.scoringLabel}</h3>
                            </div>
                            <p className={`text-sm leading-relaxed ${bodyText}`}>{info.scoringDesc}</p>
                        </div>
                    </div>

                    {/* ── Areas covered ── */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Layers size={14} className={isMain ? "text-cyan-400" : accent?.text ?? isDark ? "text-slate-400" : "text-sky-500"} />
                            <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingText}`}>Aree analizzate</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {info.areas.map(area => (
                                <div key={area.name} className={`rounded-xl border p-4 ${isDark ? "border-stone-800/30 bg-[#0A0A09]/50" : "border-slate-200 bg-[#F8FAFB]"}`}>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={isMain ? "text-cyan-400" : accent?.text ?? isDark ? "text-cyan-400" : "text-sky-600"}>
                                            {area.icon}
                                        </span>
                                        <p className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{area.name}</p>
                                    </div>
                                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-500" : "text-slate-500"}`}>{area.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Locked overlay ── */}
                    {state === "locked" && (
                        <div className={`text-center py-4 rounded-xl border ${isDark ? "border-stone-800/20 bg-stone-900/20" : "border-stone-200 bg-stone-50"}`}>
                            <p className={`text-sm ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                                <Lock size={12} className="inline mr-1" />
                                Completa il Diagnostic Questionnaire per sbloccare questo modulo
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
}

const ACCENT_COLORS = {
    compliance: { bar: "from-cyan-500/60 via-cyan-500/20 to-transparent", border: "border-cyan-500/20", bg: "bg-cyan-500/5", text: "text-cyan-400", badge: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400" },
    processes:  { bar: "from-amber-500/60 via-amber-500/20 to-transparent", border: "border-amber-500/20", bg: "bg-amber-500/5", text: "text-amber-400", badge: "border-amber-500/20 bg-amber-500/10 text-amber-400" },
    growth:     { bar: "from-emerald-500/60 via-emerald-500/20 to-transparent", border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400", badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
} as const;
