import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, BarChart2, FileText, Clock } from "lucide-react";
import { useCreateCheckoutSession } from "../hooks/useCreateCheckoutSession.ts";
import { CheckoutConfirmModal } from "../Components/Payments/CheckoutConfirmModal.tsx";
import { useTheme } from "../Context/ThemeContext.tsx";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const FEATURES = [
    { icon: <BarChart2 size={16} />, text: "Analisi strutturata delle risposte" },
    { icon: <Zap size={16} />, text: "Identificazione delle inefficienze operative" },
    { icon: <FileText size={16} />, text: "Raccomandazioni strategiche personalizzate" },
    { icon: <CheckCircle size={16} />, text: "Sintesi executive pronta per condivisione" },
    { icon: <Clock size={16} />, text: "Insight immediati senza settimane di attesa" },
];

const VALUE_CARDS = [
    { title: "Chiarezza", desc: "Decisioni basate su dati organizzati e leggibili." },
    { title: "Priorità", desc: "Focus su ciò che genera reale impatto operativo." },
    { title: "Velocità", desc: "Insight immediati senza settimane di attesa." },
];

export function PremiumPreCheckout() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [showModal, setShowModal] = useState(false);
    const { createCheckoutSession, loading, error } = useCreateCheckoutSession();

    const handleConfirmCheckout = async () => {
        const data = await createCheckoutSession();
        if (data?.url) {
            window.location.href = data.url;
        }
    };

    const card = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`, backgroundSize: "28px 28px" }} />
            {isDark && (
                <>
                    <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] bg-amber-700 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04] bg-indigo-600 pointer-events-none" />
                </>
            )}

            <div className="relative max-w-5xl mx-auto px-6 py-32 space-y-24">

                {/* HERO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-7">
                        <motion.span
                            {...fadeUp(0)}
                            className={`block text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}
                        >
                            Abbonamento Premium
                        </motion.span>

                        <motion.h1
                            {...fadeUp(0.08)}
                            className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
                        >
                            Trasforma il tuo questionario in un{" "}
                            <span className="text-amber-600">report strategico.</span>
                        </motion.h1>

                        <motion.p {...fadeUp(0.16)} className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Con Premium ricevi analisi approfondite, insight strutturati e raccomandazioni
                            operative personalizzate dopo ogni survey compilato.
                        </motion.p>

                        <motion.div {...fadeUp(0.22)} className="flex items-center gap-4 pt-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                                    bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                                    transition-colors shadow-lg shadow-amber-700/25 hover:-translate-y-0.5 duration-200"
                            >
                                Attiva Premium — 15€/mese
                                <ArrowRight size={14} />
                            </button>
                            <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                Disdici in qualsiasi momento
                            </span>
                        </motion.div>
                    </div>

                    {/* Visual card */}
                    <motion.div
                        {...fadeUp(0.12)}
                        className={`rounded-2xl border p-8 space-y-6 ${card}`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                Live analysis engine
                            </span>
                        </div>
                        <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Output del report
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Mappatura dello stato attuale dei processi",
                                "Valutazione del livello di digitalizzazione",
                                "Analisi dei colli di bottiglia",
                                "Opportunità di automazione",
                                "Roadmap suggerita a breve e medio termine",
                            ].map(item => (
                                <li key={item} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    <ArrowRight size={12} className="text-amber-600 mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>

                {/* WHAT YOU GET */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        {...fadeUp(0)}
                        className="space-y-5"
                    >
                        <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Cosa include il piano Premium
                        </h2>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Non un semplice riepilogo automatico. Ogni report viene generato con un modello
                            avanzato di sintesi per offrire chiarezza decisionale e priorità operative.
                        </p>
                        <ul className="space-y-3">
                            {FEATURES.map(({ icon, text }) => (
                                <li key={text} className={`flex items-center gap-3 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                    <span className={`shrink-0 ${isDark ? "text-amber-500" : "text-amber-600"}`}>{icon}</span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className="grid gap-4">
                        {VALUE_CARDS.map((v, i) => (
                            <motion.div
                                key={v.title}
                                {...fadeUp(i * 0.08)}
                                className={`rounded-2xl border p-6 ${card}`}
                            >
                                <h3 className={`font-semibold mb-1.5 text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                    {v.title}
                                </h3>
                                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PRICING */}
                <motion.section
                    {...fadeUp(0)}
                    className="flex justify-center"
                >
                    <div className={`w-full max-w-lg rounded-2xl border p-10 text-center space-y-6 ${card}`}>
                        <div className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                            Premium
                        </div>
                        <div className={`text-6xl font-semibold tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            15€
                            <span className={`text-base font-normal ml-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                / mese
                            </span>
                        </div>
                        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Accesso illimitato ai report avanzati generati dopo ogni compilazione del survey.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl
                                bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                                transition-colors shadow-lg shadow-amber-700/25 hover:-translate-y-0.5 duration-200"
                        >
                            Attiva ora
                            <ArrowRight size={14} />
                        </button>
                        <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Pagamento sicuro tramite Stripe · Nessun vincolo annuale · Disattivazione immediata
                        </p>
                    </div>
                </motion.section>
            </div>

            {error && (
                <p className="relative text-red-400 text-sm text-center pb-8">{error}</p>
            )}

            <CheckoutConfirmModal
                open={showModal}
                onConfirm={handleConfirmCheckout}
                onCancel={() => setShowModal(false)}
                loading={loading}
                variant={theme}
            />
        </main>
    );
}
