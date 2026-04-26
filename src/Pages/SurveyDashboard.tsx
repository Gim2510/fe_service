import { useNavigate, useParams } from "react-router-dom";
import { useSurvey } from "../hooks/useSurvey";
import { useSurveyTemplate } from "../hooks/useSurveyTemplate";
import { formatAnswer } from "../utils/formatAnswer";
import { useResetSurvey } from "../hooks/useResetSurvey";
import { FallingLines } from "react-loader-spinner";
import { useState } from "react";
import { actionDetails } from "../utils/actionDetails";
import { useTheme } from "../Context/ThemeContext.tsx";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid, Zap, MessageSquare, TrendingUp,
    ChevronDown, ChevronRight, ArrowLeft, ArrowRight,
    Calendar, RotateCcw
} from "lucide-react";

type DashboardTab = "overview" | "actions" | "answers" | "cta";

const TABS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutGrid size={14} /> },
    { id: "actions", label: "Priorità", icon: <Zap size={14} /> },
    { id: "answers", label: "Risposte", icon: <MessageSquare size={14} /> },
    { id: "cta", label: "Migliora punteggio", icon: <TrendingUp size={14} /> },
];

export function SurveyDashboard() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const isDark = theme === "dark";

    const { survey_id } = useParams();
    const { survey, loading } = useSurvey(survey_id);

    const survey_template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID;
    const { questions } = useSurveyTemplate(survey_template_id);

    const { resetSurvey, loading: resetting } = useResetSurvey();

    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
    const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const locale: "it" | "en" = "it";

    if (loading || !survey) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#E8EDF3]"}`}>
                <FallingLines color={isDark ? "#fff" : "#3B82F6"} width="60" visible />
            </div>
        );
    }

    const handleBookAppointment = () => {
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
        navigate("/survey");
    };

    const toggleAction = (index: number) => {
        setOpenActionIndex(prev => (prev === index ? null : index));
    };

    const questionMap = new Map(questions.map(q => [q.id, q]));
    const answerEntries = Object.entries(survey.answers);
    const totalAnswers = answerEntries.length;

    const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, totalAnswers - 1));
    const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    const goTo = (index: number) => setCurrentIndex(index);

    const [currentQuestionId, currentAnswer] = answerEntries[currentIndex];
    const currentQuestion = questionMap.get(currentQuestionId);

    const card = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";
    const scoreColor = survey.score >= 70 ? "text-green-400" : survey.score >= 40 ? "text-amber-400" : "text-red-400";

    return (
        <main className={`min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#E8EDF3] text-slate-900"}`}>

            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`, backgroundSize: "28px 28px" }} />

            {/* Hero */}
            <section className="relative px-6 pt-28 pb-8">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-3">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                            Digital Maturity Dashboard
                        </span>
                        <h1 className={`text-3xl sm:text-4xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Stato digitale attuale
                        </h1>
                        <p className={`max-w-lg text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Analisi basata sulle risposte fornite. Il punteggio indica il livello
                            di controllo e strutturazione dei processi digitali.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" as const }}
                        className={`rounded-2xl px-10 py-8 text-center border ${card} shrink-0`}
                    >
                        <div className={`text-5xl font-semibold tabular-nums ${scoreColor}`}>
                            {survey.score}%
                        </div>
                        <div className={`text-xs font-medium uppercase tracking-widest mt-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            Digital Readiness Score
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tabs */}
            <section className="relative px-6 pb-6">
                <div className="max-w-5xl mx-auto flex gap-1 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium
                                whitespace-nowrap transition-colors border
                                ${activeTab === tab.id
                                    ? isDark
                                        ? "bg-amber-700/15 border-amber-600/30 text-amber-400"
                                        : "bg-amber-50 border-amber-400 text-amber-800"
                                    : isDark
                                        ? "border-stone-800/20 text-slate-500 hover:text-slate-300 hover:border-stone-800/40"
                                        : "border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-[#EDF2F7]"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Tab content */}
            <section className="relative px-6 pb-20">
                <div className="max-w-5xl mx-auto">
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
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Score", value: `${survey.score}%`, mono: false, accent: scoreColor },
                                        { label: "Risposte", value: String(answerEntries.length), mono: false },
                                        { label: "Survey ID", value: survey._id, mono: true },
                                    ].map(item => (
                                        <div key={item.label} className={`rounded-2xl border p-7 ${card}`}>
                                            <div className={`text-xs font-medium uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                {item.label}
                                            </div>
                                            <div className={`${item.mono ? "text-sm font-mono break-all" : "text-4xl font-semibold"} ${item.accent ?? (isDark ? "text-slate-100" : "text-slate-900")}`}>
                                                {item.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ACTIONS */}
                            {activeTab === "actions" && (
                                <div className="space-y-3">
                                    {Object.entries(actionDetails).map(([indexStr, detail]) => {
                                        const index = Number(indexStr);
                                        const isOpen = openActionIndex === index;

                                        return (
                                            <div key={index} className={`rounded-2xl border overflow-hidden ${card}`}>
                                                <button
                                                    onClick={() => toggleAction(index)}
                                                    className="w-full flex justify-between items-center p-6 text-left"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className={`font-mono text-xs ${isDark ? "text-amber-700" : "text-amber-500"}`}>
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                                            {detail.title}
                                                        </span>
                                                    </div>
                                                    {isOpen
                                                        ? <ChevronDown size={16} className={isDark ? "text-slate-400" : "text-slate-500"} />
                                                        : <ChevronRight size={16} className={isDark ? "text-slate-500" : "text-slate-400"} />
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
                                                            <div className={`px-6 pb-6 space-y-5 border-t ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                                                                <p className={`text-sm leading-relaxed pt-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                                    {detail.context}
                                                                </p>

                                                                <div className="grid md:grid-cols-2 gap-5">
                                                                    <div>
                                                                        <h4 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                                            Rischi
                                                                        </h4>
                                                                        <ul className="space-y-1.5">
                                                                            {detail.risks.map((risk, i) => (
                                                                                <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                                                    <span className="text-red-400 mt-0.5">•</span>
                                                                                    {risk}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                                            Azioni consigliate
                                                                        </h4>
                                                                        <ul className="space-y-1.5">
                                                                            {detail.actions.map((action, i) => (
                                                                                <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                                                    <span className="text-amber-500 mt-0.5">•</span>
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
                                <div className="space-y-5">
                                    <div className="flex gap-1.5 overflow-x-auto py-1">
                                        {answerEntries.map(([qid], idx) => (
                                            <button
                                                key={qid}
                                                onClick={() => goTo(idx)}
                                                className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold border transition-colors shrink-0
                                                    ${currentIndex === idx
                                                        ? isDark ? "bg-amber-700 border-amber-600 text-white" : "bg-amber-700 border-amber-600 text-white"
                                                        : isDark ? "border-stone-800/20 text-slate-500 hover:text-slate-300" : "border-slate-200 text-slate-500 hover:bg-[#EDF2F7]"
                                                    }`}
                                            >
                                                {idx + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <div className={`rounded-2xl border p-7 ${card}`}>
                                        <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${isDark ? "text-amber-600" : "text-amber-700"}`}>
                                            Domanda {currentIndex + 1}
                                        </p>
                                        <h3 className={`text-base font-semibold mb-4 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                            {currentQuestion?.text.it ?? "Domanda non disponibile"}
                                        </h3>
                                        <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                            {formatAnswer(currentAnswer)}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            onClick={goPrev}
                                            disabled={currentIndex === 0}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                                disabled:opacity-30
                                                ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                                        >
                                            <ArrowLeft size={13} /> Precedente
                                        </button>
                                        <button
                                            onClick={goNext}
                                            disabled={currentIndex === totalAnswers - 1}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                                disabled:opacity-30
                                                ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                                        >
                                            Successivo <ArrowRight size={13} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            {activeTab === "cta" && (
                                <div className={`rounded-2xl border p-10 text-center ${card}`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6
                                        ${isDark ? "bg-amber-700/15 border border-amber-700/20" : "bg-amber-50 border border-amber-300"}`}>
                                        <TrendingUp size={20} className="text-amber-600" />
                                    </div>
                                    <h2 className={`text-2xl font-semibold mb-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                        Vuoi migliorare questo punteggio?
                                    </h2>
                                    <p className={`text-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                        Costruiamo una roadmap operativa personalizzata per la tua azienda.
                                    </p>
                                    <button
                                        onClick={handleBookAppointment}
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                                            bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                                            transition-colors shadow-lg shadow-amber-700/25 hover:-translate-y-0.5 duration-200"
                                    >
                                        <Calendar size={14} />
                                        Richiedi consulenza strategica
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Reset */}
            <section className="relative px-6 pb-16 text-center">
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
            </section>
        </main>
    );
}
