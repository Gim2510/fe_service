import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

import { HeroGlobeDark } from "./HeroGlobeDark.tsx";
import { useNavigate } from "react-router-dom";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
});

export function HeroSection({ theme }: { theme: string }) {
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");
    const isDark = theme === "dark";

    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">

            {/* ── Background ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 ${isDark ? "bg-[#060D1B]" : "bg-[#F8FAFC]"}`} />
                <HeroGlobeDark />

                {/* Grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Corporate blue glow */}
                {isDark && (
                    <>
                        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] bg-blue-600 pointer-events-none" />
                        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] bg-blue-400 pointer-events-none" />
                    </>
                )}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pb-20 pt-32 sm:pt-24 w-full">

                {/* Tag line */}
                <motion.div {...fadeUp(0.05)} className="mb-6">
                    <span className={`
                        inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                        px-3 py-1.5 rounded-full border
                        ${isDark
                            ? "text-blue-400 border-blue-800/40 bg-blue-900/20"
                            : "text-blue-600 border-blue-200 bg-blue-50"
                        }
                    `}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Consulenza digitale per PMI
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    {...fadeUp(0.15)}
                    className={`font-fjalla text-5xl sm:text-7xl font-semibold leading-tight max-w-2xl ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                >
                    <span className="hero-line reveal delay-1 block">
                        Il tuo business
                    </span>
                    <span className="hero-line reveal delay-2 block text-blue-500">
                        genera dati.
                    </span>
                    <span className="hero-line reveal delay-3 block text-4xl sm:text-5xl mt-2">
                        Sei in grado di gestirli?
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    {...fadeUp(0.28)}
                    className={`mt-8 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                    Aiutiamo le aziende a trasformare operazioni, vendite e relazioni
                    con i clienti in sistemi chiari, misurabili e automatizzati.
                </motion.p>

                {/* Trust signals */}
                <motion.div {...fadeUp(0.35)} className="mt-6 flex flex-wrap gap-4">
                    {["Analisi guidata", "Nessun impegno", "Risultati immediati"].map((item) => (
                        <span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}
                        >
                            <CheckCircle size={14} className="text-blue-500 shrink-0" />
                            {item}
                        </span>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div {...fadeUp(0.42)} className="mt-10 flex flex-wrap items-center gap-4">
                    <button
                        onClick={goToSurvey}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                            bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
                            transition-all duration-200 shadow-lg shadow-blue-600/25
                            hover:shadow-blue-500/35 hover:-translate-y-0.5"
                    >
                        Scopri cosa stai perdendo
                        <ArrowRight size={16} />
                    </button>

                    <button
                        onClick={goToSurvey}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5
                            border-blue-900/30 text-slate-300 hover:border-blue-500 hover:text-slate-100"
                    >
                        Avvia l'analisi
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
