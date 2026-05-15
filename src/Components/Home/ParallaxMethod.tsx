import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { GlassCard } from "./GlassCard.tsx";

const steps = [
    {
        step: "01",
        title: "Diagnosi",
        text: "Mappiamo i tuoi processi, analizziamo i flussi di dati e gli strumenti in uso. Identifichiamo dove perdi tempo, margine e controllo — con dati concreti, non supposizioni.",
    },
    {
        step: "02",
        title: "Progettazione",
        text: "Disegniamo l'architettura della soluzione: cosa integrare, cosa costruire, cosa eliminare. Ogni scelta è guidata dal ROI atteso e validata con te prima di procedere.",
    },
    {
        step: "03",
        title: "Attivazione",
        text: "Implementiamo, formiamo il team e misuriamo i risultati. Non consegniamo e spariremo: restiamo finché il cambiamento è consolidato e i numeri parlano da soli.",
    },
];

export function ParallaxMethod() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Background layers
    const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const gradientX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    // Decorative elements
    const deco1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const deco1X = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const deco1Rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const deco2Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const deco2X = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const deco3Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const deco3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.2, 0.7]);

    // Timeline vertical line
    const timelineY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const timelineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Header
    const headerY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1]);
    const headerScale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);

    // Cards - each with unique depth, rotation, and horizontal movement
    const cardY0 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const cardX0 = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const cardRotate0 = useTransform(scrollYProgress, [0, 1], [3, -3]);
    const cardScale0 = useTransform(scrollYProgress, [0, 0.3, 1], [0.9, 1, 0.95]);

    const cardY1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
    const cardX1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const cardRotate1 = useTransform(scrollYProgress, [0, 1], [-4, 4]);
    const cardScale1 = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 0.9]);

    const cardY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const cardX2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const cardRotate2 = useTransform(scrollYProgress, [0, 1], [2, -2]);
    const cardScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.92]);

    const cardTransforms = [
        { y: cardY0, x: cardX0, rotate: cardRotate0, scale: cardScale0 },
        { y: cardY1, x: cardX1, rotate: cardRotate1, scale: cardScale1 },
        { y: cardY2, x: cardX2, rotate: cardRotate2, scale: cardScale2 },
    ];

    // Staggered card opacity
    const cardOpacities = steps.map((_, i) => {
        const start = 0.15 + i * 0.12;
        return useTransform(scrollYProgress, [0, start, start + 0.2], [0, 0, 1]);
    });

    return (
        <section ref={containerRef} className="relative py-24 sm:py-36 overflow-hidden">
            {/* Background layer */}
            <motion.div
                className={`absolute inset-0 pointer-events-none ${
                    isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"
                }`}
                style={{ y: bgY, opacity: bgOpacity }}
            />
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ x: gradientX, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]) }}
            >
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] bg-sky-700/5" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-600/5" />
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
                className="absolute top-24 left-16 w-36 h-36 pointer-events-none"
                style={{ y: deco1Y, x: deco1X, rotate: deco1Rotate, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.06, 0.06, 0]) }}
            >
                <div className={`w-full h-full rounded-full border-2 ${isDark ? "border-sky-700/20" : "border-sky-400/20"}`} />
            </motion.div>
            <motion.div
                className="absolute bottom-20 right-24 w-28 h-28 pointer-events-none"
                style={{ y: deco2Y, x: deco2X, opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0]) }}
            >
                <div className={`w-full h-full rounded-lg border ${isDark ? "border-stone-700/25" : "border-stone-300/25"}`} />
            </motion.div>
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none"
                style={{ y: deco3Y, scale: deco3Scale, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.04, 0]) }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,5 95,75 5,75" fill="none" stroke={isDark ? "rgba(107,142,123,0.15)" : "rgba(107,142,123,0.2)"} strokeWidth="1" />
                </svg>
            </motion.div>

            {/* Header */}
            <motion.div
                className="relative mx-auto max-w-7xl px-6 sm:px-8"
                style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
            >
                <motion.div
                    className="mb-20 text-center sm:text-left max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-sky-500" : "text-sky-700"
                    }`}>
                        Il nostro metodo
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Tre fasi. Zero improvvisazione.
                        <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            Risultati misurabili dal giorno uno.
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline line */}
                <motion.div
                    className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
                    style={{
                        y: timelineY,
                        opacity: timelineOpacity,
                        background: `linear-gradient(to bottom, transparent, ${isDark ? "rgba(107, 142, 123, 0.3)" : "rgba(107, 142, 123, 0.4)"}, transparent)`,
                    }}
                />

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            style={{
                                y: cardTransforms[index].y,
                                x: cardTransforms[index].x,
                                rotate: cardTransforms[index].rotate,
                                scale: cardTransforms[index].scale,
                                opacity: cardOpacities[index],
                            }}
                        >
                            <GlassCard theme={theme} className="p-8 h-full relative">
                                <div className="flex items-start justify-between mb-6">
                                    <span className={`font-mono text-4xl font-bold tracking-tight ${
                                        isDark ? "text-sky-700" : "text-sky-300"
                                    }`}>
                                        {item.step}
                                    </span>
                                    <div className="w-8 h-0.5 bg-sky-600/60 mt-3" />
                                </div>

                                <h3 className={`text-xl font-semibold mb-3 ${
                                    isDark ? "text-slate-100" : "text-slate-900"
                                }`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${
                                    isDark ? "text-slate-500" : "text-slate-500"
                                }`}>
                                    {item.text}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
