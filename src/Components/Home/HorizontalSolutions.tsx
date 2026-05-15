import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    CheckCircle2,
    BarChart3,
    Zap,
    Link2,
    TrendingUp,
    Bot,
    Database,
    Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { GlassCard } from "./GlassCard.tsx";

/* ── HorizontalSolutions ─────────────────────────────────────────────────────
   Sticky container: as the user scrolls vertically, the content scrolls
   horizontally. The section "pins" while the cards slide left.
   Each solution card scales up from 0.8 as it enters the viewport center.
   ────────────────────────────────────────────────────────────────────────── */

const punti: { title: string; desc: string; icon: LucideIcon }[] = [
    {
        title: "CRM su misura",
        desc: "CRM costruiti sul tuo processo di vendita reale",
        icon: BarChart3,
    },
    {
        title: "Automazioni mirate",
        desc: "Automazioni che eliminano il lavoro ripetitivo",
        icon: Zap,
    },
    {
        title: "Integrazione smart",
        desc: "Integrazione dei tuoi software senza sostituire tutto",
        icon: Link2,
    },
    {
        title: "Dashboard operative",
        desc: "Dashboard operative con i KPI che contano",
        icon: TrendingUp,
    },
    {
        title: "AI applicata",
        desc: "AI applicata dove genera ROI misurabile",
        icon: Bot,
    },
    {
        title: "Data warehouse",
        desc: "Data warehouse e data lake per dati centralizzati",
        icon: Database,
    },
    {
        title: "Soluzioni scalabili",
        desc: "Soluzioni che scalano con la tua crescita",
        icon: Rocket,
    },
];

export function HorizontalSolutions({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };

    // Map vertical scroll to horizontal movement — cards begin further right,
    // delayed start (0.12) so the header settles before cards begin sliding
    const x = useSpring(useTransform(scrollYProgress, [0.12, 1], ["30%", "-68%"]), sp);

    // Header parallax — fast entrance, settled well before cards move
    const headerScale   = useSpring(useTransform(scrollYProgress, [0, 0.06], [0.96, 1]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.06], [0, 1]), sp);

    return (
        <section
            ref={containerRef}
            className="relative"
            // Height determines how much vertical scroll maps to horizontal distance
            style={{ height: "300vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {isDark && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent pointer-events-none" />
                )}

                {/* Section header */}
                <motion.div
                    className="mx-auto max-w-7xl px-6 sm:px-8 mb-10"
                    style={{ scale: headerScale, opacity: headerOpacity }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-sky-500" : "text-sky-700"
                    }`}>
                        Soluzioni su misura
                    </span>
                    <h2 className={`font-fjalla text-3xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non vendiamo software.{" "}
                        <span className={isDark ? "text-sky-500" : "text-sky-700"}>
                            Risolviamo problemi.
                        </span>
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Partiamo dai tuoi processi reali — non da un catalogo. Ogni soluzione è progettata per il tuo contesto.
                    </p>
                </motion.div>

                {/* Horizontal scroll track */}
                <div className="relative w-full overflow-visible">
                    {/* Edge fades */}
                    <div className={`absolute inset-y-0 left-0 w-20 z-10 pointer-events-none ${
                        isDark
                            ? "bg-gradient-to-r from-[#0E0E0D] to-transparent"
                            : "bg-gradient-to-r from-[#FAFAF8] to-transparent"
                    }`} />
                    <div className={`absolute inset-y-0 right-0 w-20 z-10 pointer-events-none ${
                        isDark
                            ? "bg-gradient-to-l from-[#0E0E0D] to-transparent"
                            : "bg-gradient-to-l from-[#FAFAF8] to-transparent"
                    }`} />

                    <motion.div
                        className="flex gap-6 px-8 sm:px-16"
                        style={{ x }}
                    >
                        {punti.map((item, i) => (
                            <SolutionCard
                                key={item.title}
                                item={item}
                                index={i}
                                isDark={isDark}
                                theme={theme}
                                progress={scrollYProgress}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Scroll progress indicator */}
                <div className="mx-auto max-w-7xl px-6 sm:px-8 mt-8">
                    <div className={`h-0.5 rounded-full max-w-xs ${isDark ? "bg-stone-800" : "bg-slate-200"}`}>
                        <motion.div
                            className="h-full rounded-full bg-sky-600"
                            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolutionCard({ item, index, isDark, theme, progress }: {
    item: typeof punti[0];
    index: number;
    isDark: boolean;
    theme: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    // Offset card activation ranges to account for the delayed scroll start
    const cardStart = 0.14 + index * 0.09;
    const cardEnd   = cardStart + 0.12;
    const scale     = useSpring(useTransform(progress, [cardStart, cardEnd], [0.94, 1]), sp);
    const opacity   = useSpring(useTransform(progress, [cardStart, cardEnd], [0.78, 1]), sp);
    const rotateY   = useSpring(useTransform(progress, [cardStart, cardEnd], [4, 0]), sp);

    const Icon = item.icon;

    return (
        <motion.div
            className="shrink-0 w-[280px] sm:w-[320px]"
            style={{
                scale,
                opacity,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <GlassCard theme={theme} className="p-7 h-full min-h-[220px] flex flex-col gap-4">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                    isDark ? "bg-sky-900/30" : "bg-sky-50"
                }`}>
                    <Icon size={20} className={isDark ? "text-sky-400" : "text-sky-700"} />
                </div>
                <h3 className={`text-lg font-semibold ${
                    isDark ? "text-slate-100" : "text-slate-800"
                }`}>
                    {item.title}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    {item.desc}
                </p>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-sky-500 shrink-0" />
                    <span className={`text-xs ${isDark ? "text-sky-600" : "text-sky-700"}`}>
                        Su misura per PMI
                    </span>
                </div>
            </GlassCard>
        </motion.div>
    );
}
