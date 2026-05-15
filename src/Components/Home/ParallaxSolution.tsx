import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { GlassCard } from "./GlassCard.tsx";

const punti = [
    "CRM costruiti sul tuo processo di vendita reale",
    "Automazioni che eliminano il lavoro ripetitivo",
    "Integrazione dei tuoi software senza sostituire tutto",
    "Dashboard operative con i KPI che contano",
    "AI applicata dove genera ROI misurabile",
    "Data warehouse e data lake per dati centralizzati",
    "Soluzioni che scalano con la tua crescita",
];

export function ParallaxSolution() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Background layers
    const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const clipPath = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["inset(0 0 100% 0)", "inset(0 0 50% 0)", "inset(0 0 10% 0)", "inset(0 0 0 0)"]);

    // Decorative elements
    const deco1Y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const deco1X = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const deco1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
    const deco2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const deco2X = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const deco2Rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    // Left side (illustration) - deeper layer, slower
    const leftY = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const leftX = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const leftRotate = useTransform(scrollYProgress, [0, 1], [3, -3]);
    const leftScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.85, 1, 0.95]);
    const leftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 1]);

    // Right side (text) - faster layer
    const rightY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const rightX = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    const rightOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 1]);

    // Checklist items - staggered parallax
    const checklistOpacities = punti.map((_, i) => {
        const start = 0.2 + i * 0.06;
        return useTransform(scrollYProgress, [0, start, start + 0.15], [0, 0, 1]);
    });
    const checklistXs = punti.map((_, i) => {
        const base = i % 2 === 0 ? 20 : -20;
        return useTransform(scrollYProgress, [0, 1], [base, -base]);
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
                className={`absolute inset-0 pointer-events-none ${
                    isDark ? "bg-[#1C1C1A]/30" : "bg-[#F8FAFB]/50"
                }`}
                style={{ clipPath }}
            />

            {/* Decorative floating elements */}
            <motion.div
                className="absolute top-16 right-20 w-48 h-48 pointer-events-none"
                style={{ y: deco1Y, x: deco1X, scale: deco1Scale, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.04, 0]) }}
            >
                <div className={`w-full h-full rounded-full border ${isDark ? "border-sky-700/15" : "border-sky-400/15"}`} />
            </motion.div>
            <motion.div
                className="absolute bottom-24 left-16 w-36 h-36 pointer-events-none"
                style={{ y: deco2Y, x: deco2X, rotate: deco2Rotate, opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0]) }}
            >
                <div className={`w-full h-full rounded-xl border ${isDark ? "border-stone-700/20" : "border-stone-300/20"}`} />
            </motion.div>

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Illustration card - deeper parallax layer */}
                    <motion.div
                        style={{ y: leftY, x: leftX, rotate: leftRotate, scale: leftScale, opacity: leftOpacity }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -40, rotateY: 15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{ perspective: "1000px" }}
                        >
                            <GlassCard theme={theme} hover={false} className="overflow-hidden">
                                <div className={`aspect-[4/3] rounded-2xl flex items-center justify-center p-6 ${
                                    isDark ? "bg-[#161614]" : "bg-[#F7F4F0]"
                                }`}>
                                    <svg viewBox="0 0 380 284" fill="none" className="w-full h-full">
                                        <defs>
                                            <radialGradient id="hubGlow2" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#6B8E7B" stopOpacity="0.55"/>
                                                <stop offset="60%" stopColor="#6B8E7B" stopOpacity="0.18"/>
                                                <stop offset="100%" stopColor="#6B8E7B" stopOpacity="0"/>
                                            </radialGradient>
                                        </defs>
                                        <circle cx="190" cy="142" r="130" fill="url(#hubGlow2)">
                                            <animate attributeName="opacity" values="0.18;0.35;0.18" dur="2.4s" repeatCount="indefinite"/>
                                        </circle>
                                        <circle cx="190" cy="142" r="36" fill={isDark ? "#1C1C1A" : "#FFFFFF"} stroke="#6B8E7B" strokeWidth="2.5" strokeOpacity="0.9"/>
                                        <circle cx="190" cy="142" r="28" stroke="#6B8E7B" strokeWidth="0.8" strokeOpacity="0.25"/>
                                        <text x="190" y="136" fontSize="11" fill="#6B8E7B" fontFamily="system-ui" fontWeight="700" textAnchor="middle" letterSpacing="1">PMI</text>
                                        <text x="190" y="150" fontSize="7.5" fill={isDark ? "#78716C" : "#7C6F60"} fontFamily="system-ui" textAnchor="middle">Digital Core</text>
                                    </svg>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>

                    {/* Text content - faster parallax layer */}
                    <motion.div className="flex flex-col gap-7" style={{ y: rightY, x: rightX, opacity: rightOpacity }}>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <span className={`text-xs font-semibold uppercase tracking-widest ${
                                isDark ? "text-sky-500" : "text-sky-700"
                            }`}>
                                Soluzioni su misura
                            </span>
                            <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight mt-3 ${
                                isDark ? "text-slate-100" : "text-slate-900"
                            }`}>
                                Non vendiamo software. Risolviamo problemi.
                            </h2>
                            <p className={`mt-4 text-base leading-relaxed ${
                                isDark ? "text-slate-400" : "text-slate-600"
                            }`}>
                                Partiamo dai tuoi processi reali — non da un catalogo. Ogni soluzione è progettata per il tuo contesto, integrata con ciò che già usi e misurabile dal primo giorno.
                            </p>
                        </motion.div>

                        {/* Checklist - staggered parallax */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {punti.map((item, i) => (
                                <motion.div
                                    key={item}
                                    className={`flex items-start gap-3 text-sm ${
                                        isDark ? "text-slate-400" : "text-slate-600"
                                    }`}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                                    style={{ x: checklistXs[i], opacity: checklistOpacities[i] }}
                                >
                                    <CheckCircle2 size={15} className="text-sky-600 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
