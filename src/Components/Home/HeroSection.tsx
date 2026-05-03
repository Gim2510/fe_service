import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

import { HeroNetwork } from "./HeroNetwork.tsx";
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
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`} />
                <div className="hidden lg:block"><HeroNetwork /></div>

                {/* Readability gradient — on mobile the globe sits full-screen behind the text;
                    this overlay fades from solid bg on the left (text area) to transparent on the right.
                    On desktop the globe is already pushed to lg:left-140 so we lighten it significantly. */}
                <div
                    className={`absolute inset-0 pointer-events-none ${isDark
                        ? "bg-gradient-to-r from-[#111110] via-[#111110]/80 to-transparent lg:via-[#111110]/25"
                        : "bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/80 to-transparent lg:via-[#FAF8F4]/25"
                    }`}
                    style={{ zIndex: 21 }}
                />

                {/* Hex grid texture */}
                <div
                    className={`absolute inset-0 ${isDark ? "opacity-[0.05]" : "opacity-[0.08]"}`}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3Cpath d='M28 66 L56 50 L56 84 L28 100 L0 84 L0 50 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3C/svg%3E")`,
                        backgroundSize: "56px 100px",
                    }}
                />

                {/* Corporate blue glow */}
                {isDark && (
                    <>
                        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] bg-amber-700 pointer-events-none" />
                        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] bg-amber-500 pointer-events-none" />
                    </>
                )}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pb-20 pt-32 sm:pt-24 w-full pointer-events-none">

                {/* Tag line */}
                <motion.div {...fadeUp(0.05)} className="mb-6">
                    <span className={`
                        inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                        px-3 py-1.5 rounded-full border
                        ${isDark
                            ? "text-amber-500 border-stone-700/40 bg-stone-800/20"
                            : "text-amber-700 border-amber-300 bg-amber-50"
                        }
                    `}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                        Consulenza digitale per PMI italiane
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
                        La tua azienda
                    </span>
                    <span className="hero-line reveal delay-2 block text-amber-600">
                        perde margine
                    </span>
                    <span className="hero-line reveal delay-3 block text-4xl sm:text-5xl mt-2">
                        ogni giorno che non è digitale.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    {...fadeUp(0.28)}
                    className={`mt-8 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                    Progettiamo sistemi su misura che eliminano sprechi operativi,
                    aumentano la visibilità sui dati e accelerano le decisioni
                    che contano davvero per il tuo business.
                </motion.p>

                {/* Trust signals */}
                <motion.div {...fadeUp(0.35)} className="mt-6 flex flex-wrap gap-4">
                    {["Report personalizzato incluso", "Nessun impegno iniziale", "Risultati verificabili"].map((item) => (
                        <span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}
                        >
                            <CheckCircle size={14} className="text-amber-600 shrink-0" />
                            {item}
                        </span>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div {...fadeUp(0.42)} className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
                    <button
                        onClick={goToSurvey}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                            bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                            transition-all duration-200 shadow-lg shadow-amber-700/25
                            hover:shadow-amber-600/35 hover:-translate-y-0.5"
                    >
                        Misura il tuo gap digitale
                        <ArrowRight size={16} />
                    </button>

                    <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Circa 10–15 minuti
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
