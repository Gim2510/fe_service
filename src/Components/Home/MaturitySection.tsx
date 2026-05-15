import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "./GlassCard.tsx";

/* ── MaturitySection ─────────────────────────────────────────────────────────
   Visual meter that fills as user scrolls. Level cards scale in from
   different distances. Weight progress bars animate with scroll position
   rather than intersection, creating smooth fill effect.
   ────────────────────────────────────────────────────────────────────────── */

const livelli = [
    {
        level: "Base",
        score: "0\u201330%",
        description: "Operativit\u00E0 prevalentemente manuale. Alto rischio di errori, dati non strutturati e decisioni prese senza dati affidabili. Potenziale di miglioramento massimo.",
        accent: "#38BDF8",
        fillPercent: 25,
    },
    {
        level: "Intermedio",
        score: "31\u201360%",
        description: "Digitalizzazione parziale con isole non integrate. Alcuni KPI monitorati, ma processi ancora dipendenti da intervento manuale e riconciliazioni frequenti.",
        accent: "#38BDF8",
        fillPercent: 50,
    },
    {
        level: "Avanzato",
        score: "61\u201385%",
        description: "Processi chiave digitalizzati e dati centralizzati. Dashboard operative attive. Margini di ottimizzazione su automazione avanzata e AI applicata.",
        accent: "#38BDF8",
        fillPercent: 75,
    },
    {
        level: "Eccellente",
        score: "86\u2013100%",
        description: "Ecosistema digitale integrato, KPI predittivi e automazione intelligente su processi core. Competitive advantage sostenibile nel tempo.",
        accent: "#38BDF8",
        fillPercent: 100,
    },
];

const pesi = [
    { label: "Processi",          weight: 0.4 },
    { label: "Tecnologia",        weight: 0.3 },
    { label: "Dati & KPI",        weight: 0.2 },
    { label: "Automazione & AI",  weight: 0.1 },
];

function WeightBar({ p, index, isDark, scrollYProgress }: {
    p: typeof pesi[0]; index: number; isDark: boolean;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const barStart = 0.25 + index * 0.04;
    const barEnd   = barStart + 0.12;
    const barWidth = useSpring(useTransform(scrollYProgress, [barStart, barEnd], ["0%", `${p.weight * 100}%`]), { stiffness: 80, damping: 28, mass: 0.8 });

    return (
        <div>
            <div className={`flex justify-between mb-2 text-sm font-medium ${
                isDark ? "text-slate-300" : "text-slate-700"
            }`}>
                <span>{p.label}</span>
                <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                    {Math.round(p.weight * 100)}%
                </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
                isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"
            }`}>
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-700 to-sky-500"
                    style={{ width: barWidth }}
                />
            </div>
        </div>
    );
}

function LevelCard({ lvl, index, isDark, theme, sectionProgress }: {
    lvl: typeof livelli[0]; index: number; isDark: boolean; theme: string;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const scale   = useSpring(useTransform(scrollYProgress, [0, 0.7], [0.85, 1]), sp);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25, 0.7], [0, 0.5, 1]), sp);
    const y       = useSpring(useTransform(scrollYProgress, [0, 0.7], [25 + index * 8, 0]), sp);

    // Fill bar animates with section scroll — triggers earlier for visibility
    const fillStart = 0.12 + index * 0.07;
    const fillEnd   = fillStart + 0.14;
    const fillWidth = useSpring(useTransform(sectionProgress, [fillStart, fillEnd], ["0%", `${lvl.fillPercent}%`]), { stiffness: 80, damping: 28, mass: 0.8 });

    return (
        <motion.div ref={ref} style={{ scale, opacity, y }}>
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

                {/* Animated fill bar */}
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"}`}>
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            width: fillWidth,
                            backgroundColor: lvl.accent,
                            opacity: 0.7,
                        }}
                    />
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
    );
}

export function MaturitySection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY       = useSpring(useTransform(scrollYProgress, [0, 0.15], [30, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.1], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    style={{ y: headerY, opacity: headerOpacity }}
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
                            maturit\u00E0 digitale misurabile.
                        </span>
                    </h2>
                    <p className={`mt-5 text-lg max-w-2xl mx-auto ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Il nostro assessment misura processi, tecnologia, dati e automazione con un modello strutturato. Il risultato non \u00E8 un numero generico \u2014 \u00E8 una mappa precisa di dove intervenire per ottenere il massimo impatto nel minor tempo.
                    </p>
                </motion.div>

                {/* Level cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {livelli.map((lvl, index) => (
                        <LevelCard
                            key={lvl.level}
                            lvl={lvl}
                            index={index}
                            isDark={isDark}
                            theme={theme}
                            sectionProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Weight factors — scroll-driven bars */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <GlassCard theme={theme} hover={false} className="p-8 sm:p-10 max-w-3xl mx-auto">
                        <h3 className={`text-xl font-semibold mb-8 text-center ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Come calcoliamo il tuo score
                        </h3>

                        <div className="space-y-5">
                            {pesi.map((p, i) => (
                                <WeightBar
                                    key={p.label}
                                    p={p}
                                    index={i}
                                    isDark={isDark}
                                    scrollYProgress={scrollYProgress}
                                />
                            ))}
                        </div>

                        <p className={`mt-8 text-xs text-center ${
                            isDark ? "text-slate-600" : "text-slate-400"
                        }`}>
                            I pesi sono calibrati su dati reali di PMI italiane. I processi pesano di pi\u00F9 perch\u00E9 \u00E8 l\u00EC che si genera \u2014 o si perde \u2014 il margine operativo.
                        </p>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
