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

/* ── HorizontalSolutions ─────────────────────────────────────────────────────
   Sticky container: as the user scrolls vertically, the content scrolls
   horizontally. The section "pins" while the cards slide left.
   Each solution card scales up from 0.8 as it enters the viewport center.
   Dark mode: futuristic neon aesthetic with glow effects.
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

    // Header: title always visible from start
    const headerScale   = useSpring(useTransform(scrollYProgress, [0, 0.03], [0.98, 1]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.03], [0.95, 1]), sp);

    // Cards appear almost immediately, slightly after header
    const cardsRevealStart = 0.03;
    const cardsRevealEnd   = 0.10;
    const cardsOpacity = useSpring(
        useTransform(scrollYProgress, [cardsRevealStart, cardsRevealEnd], [0, 1]),
        sp
    );

    // Horizontal scroll starts earlier
    const x = useSpring(
        useTransform(scrollYProgress, [0.13, 1], ["35%", "-72%"]),
        sp
    );

    return (
        <section
            ref={containerRef}
            className="relative"
            style={{ height: "300vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {isDark && (
                    <>
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
                        {/* Ambient glow background */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
                    </>
                )}

                {/* Section header */}
                <motion.div
                    className="mx-auto max-w-7xl px-6 sm:px-8 mb-12"
                    style={{ scale: headerScale, opacity: headerOpacity }}
                >
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        isDark
                            ? "text-cyan-400 border-stone-700/40 bg-stone-800/20"
                            : "text-cyan-600 border-cyan-300 bg-cyan-50"
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Soluzioni su misura
                    </span>
                    <h2 className={`font-fjalla text-3xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non vendiamo software.{" "}
                        <span className={isDark ? "text-cyan-400" : "text-sky-700"}>
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
                <motion.div
                    className="relative w-full overflow-visible"
                    style={{ opacity: cardsOpacity }}
                >
                    {/* Edge fades */}
                    <div className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none ${
                        isDark
                            ? "bg-gradient-to-r from-[#0E0E0D] to-transparent"
                            : "bg-gradient-to-r from-[#FAFAF8] to-transparent"
                    }`} />
                    <div className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none ${
                        isDark
                            ? "bg-gradient-to-l from-[#0E0E0D] to-transparent"
                            : "bg-gradient-to-l from-[#FAFAF8] to-transparent"
                    }`} />

                    <motion.div
                        className="flex gap-10 px-8 sm:px-20"
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
                </motion.div>

                {/* Scroll progress indicator */}
                <div className="mx-auto max-w-7xl px-6 sm:px-8 mt-10">
                    <div className={`h-0.5 rounded-full max-w-xs ${isDark ? "bg-stone-800" : "bg-slate-200"}`}>
                        <motion.div
                            className="h-full rounded-full bg-cyan-500"
                            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolutionCard({ item, index, isDark, theme: _theme, progress }: {
    item: typeof punti[0];
    index: number;
    isDark: boolean;
    theme: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    
    // Card activation ranges — earlier, right after cards container appears
    const cardStart = 0.12 + index * 0.10;
    const cardEnd   = cardStart + 0.14;
    const scale     = useSpring(useTransform(progress, [cardStart, cardEnd], [0.92, 1]), sp);
    const rotateY   = useSpring(useTransform(progress, [cardStart, cardEnd], [6, 0]), sp);

    const Icon = item.icon;

    // Neon glow colors per card (cycling through cyan, violet, emerald)
    const neonColors = [
        { border: "border-cyan-500/50", glow: "shadow-cyan-500/20", icon: "text-cyan-400", bg: "bg-cyan-950/40", badge: "text-cyan-400" },
        { border: "border-violet-500/50", glow: "shadow-violet-500/20", icon: "text-violet-400", bg: "bg-violet-950/40", badge: "text-violet-400" },
        { border: "border-emerald-500/50", glow: "shadow-emerald-500/20", icon: "text-emerald-400", bg: "bg-emerald-950/40", badge: "text-emerald-400" },
    ];
    const colors = neonColors[index % neonColors.length];

    return (
        <motion.div
            className="shrink-0 w-[300px] sm:w-[360px]"
            style={{
                scale,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm p-8 h-full min-h-[240px] flex flex-col gap-5 transition-all duration-300 ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} hover:${colors.border.replace("/50", "/80")} shadow-lg ${colors.glow}`
                        : "bg-white border border-slate-200 hover:border-sky-400"
                }`}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            >
                {/* Neon corner accent */}
                {isDark && (
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-20 ${colors.icon}`} />
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? colors.bg : "bg-sky-50"
                }`}>
                    <Icon size={22} className={isDark ? colors.icon : "text-sky-700"} />
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
                    <CheckCircle2 size={14} className={isDark ? colors.badge : "text-sky-700"} />
                    <span className={`text-xs ${isDark ? colors.badge : "text-sky-700"}`}>
                        Su misura per PMI
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

