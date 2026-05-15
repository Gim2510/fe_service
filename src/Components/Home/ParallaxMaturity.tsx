import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { GlassCard } from "./GlassCard.tsx";

const livelli = [
    {
        level: "Base",
        score: "0–30%",
        description: "Operatività prevalentemente manuale. Alto rischio di errori, dati non strutturati e decisioni prese senza dati affidabili.",
        accent: "#EF4444",
        barBg: "bg-red-500/70",
    },
    {
        level: "Intermedio",
        score: "31–60%",
        description: "Digitalizzazione parziale con isole non integrate. Alcuni KPI monitorati, ma processi ancora dipendenti da intervento manuale.",
        accent: "#0EA5E9",
        barBg: "bg-sky-500/70",
    },
    {
        level: "Avanzato",
        score: "61–85%",
        description: "Processi chiave digitalizzati e dati centralizzati. Dashboard operative attive. Margini di ottimizzazione su automazione avanzata.",
        accent: "#22C55E",
        barBg: "bg-green-500/70",
    },
    {
        level: "Eccellente",
        score: "86–100%",
        description: "Ecosistema digitale integrato, KPI predittivi e automazione intelligente su processi core. Competitive advantage sostenibile.",
        accent: "#3B82F6",
        barBg: "bg-blue-500/70",
    },
];

const pesi = [
    { label: "Processi", weight: 0.4 },
    { label: "Tecnologia", weight: 0.3 },
    { label: "Dati & KPI", weight: 0.2 },
    { label: "Automazione & AI", weight: 0.1 },
];

export function ParallaxMaturity() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const cardY0 = useTransform(scrollYProgress, [0, 1], [25, -25]);
    const cardY1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
    const cardY2 = useTransform(scrollYProgress, [0, 1], [25, -25]);
    const cardY3 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
    const cardYs = [cardY0, cardY1, cardY2, cardY3];
    const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
        <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden">
            {isDark && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at 70% 30%, rgba(107, 142, 123, 0.06) 0%, transparent 60%)",
                        y: bgY,
                    }}
                />
            )}

            <motion.div
                className="relative mx-auto max-w-7xl px-6 sm:px-8"
                style={{ opacity }}
            >
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-sky-500" : "text-sky-700"
                    }`}>
                        Dove sei oggi?
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Ogni PMI ha un livello di{" "}
                        <span className={isDark ? "text-sky-500" : "text-sky-700"}>
                            maturità digitale misurabile.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {livelli.map((lvl, index) => (
                        <motion.div
                            key={lvl.level}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                            style={{ y: cardYs[index] }}
                        >
                            <GlassCard theme={theme} className="p-6 h-full flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: lvl.accent }}
                                    />
                                    <h3 className={`text-base font-semibold ${
                                        isDark ? "text-slate-100" : "text-slate-900"
                                    }`}>
                                        {lvl.level}
                                    </h3>
                                </div>
                                <div className={`h-1 rounded-full ${isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"}`}>
                                    <div className={`h-full rounded-full ${lvl.barBg}`} />
                                </div>
                                <p className={`text-sm leading-relaxed flex-1 ${
                                    isDark ? "text-slate-500" : "text-slate-500"
                                }`}>
                                    {lvl.description}
                                </p>
                                <span className={`text-xs font-mono font-medium ${
                                    isDark ? "text-slate-600" : "text-slate-400"
                                }`}>
                                    Score: {lvl.score}
                                </span>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <GlassCard theme={theme} hover={false} className="p-8 sm:p-10 max-w-3xl mx-auto">
                        <h3 className={`text-xl font-semibold mb-8 text-center ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Come calcoliamo il tuo score
                        </h3>

                        <div className="space-y-5">
                            {pesi.map((p) => (
                                <div key={p.label}>
                                    <div className={`flex justify-between mb-2 text-sm font-medium ${
                                        isDark ? "text-slate-300" : "text-slate-700"
                                    }`}>
                                        <span>{p.label}</span>
                                        <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                                            {Math.round(p.weight * 100)}%
                                        </span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full ${
                                        isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"
                                    }`}>
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-sky-700 to-sky-500"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${p.weight * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </section>
    );
}
