import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    AlertTriangle, Route, BrainCircuit, ShieldCheck,
    Gauge, BarChart3, MessageSquare, Play, HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface Solution {
    title: string;
    desc: string;
    icon: LucideIcon;
    accent: string;
    sectionId: string;
}

const solutions: Solution[] = [
    { title: "Problemi reali", desc: "Le inefficienze che frenano la crescita delle PMI ogni giorno", icon: AlertTriangle, accent: "#ef4444", sectionId: "section-problems" },
    { title: "Il nostro metodo", desc: "Diagnosi, progettazione e attivazione: un percorso in 3 fasi", icon: Route, accent: "#06b6d4", sectionId: "section-method" },
    { title: "AI su misura", desc: "Agenti autonomi, workflow automatizzati e modelli sui tuoi dati", icon: BrainCircuit, accent: "#8b5cf6", sectionId: "section-ai" },
    { title: "AI privata", desc: "Infrastruttura dedicata, zero cloud esterni, dati sotto controllo", icon: ShieldCheck, accent: "#f59e0b", sectionId: "section-private-ai" },
    { title: "Maturità digitale", desc: "Assessment per misurare il livello di digitalizzazione aziendale", icon: Gauge, accent: "#10b981", sectionId: "section-maturity" },
    { title: "I numeri che contano", desc: "100% su misura, zero template, affiancamento post-lancio", icon: BarChart3, accent: "#f43f5e", sectionId: "section-stats" },
    { title: "Chi ci ha scelto", desc: "PMI che hanno smesso di perdere margine con le nostre soluzioni", icon: MessageSquare, accent: "#a855f7", sectionId: "section-testimonials" },
    { title: "Come funziona", desc: "Dal problema al risultato in tre passi concreti", icon: Play, accent: "#3b82f6", sectionId: "section-video" },
    { title: "Domande frequenti", desc: "Risposte chiare ai dubbi più comuni sul nostro approccio", icon: HelpCircle, accent: "#f97316", sectionId: "section-faq" },
];

/* ── Geometry constants ── */
const NODE_GAP = 120;
const TRACE_W = 280;
const CENTER_X = TRACE_W / 2;
const AMPLITUDE = 80;
const NODE_R = 22;
const TOTAL_H = (solutions.length - 1) * NODE_GAP + 80;

/* Build the zigzag path + node positions */
function buildCircuit() {
    const nodes: { x: number; y: number }[] = [];
    let d = `M ${CENTER_X} 20`;

    for (let i = 0; i < solutions.length; i++) {
        const y = 40 + i * NODE_GAP;
        const x = i % 2 === 0
            ? CENTER_X - AMPLITUDE
            : CENTER_X + AMPLITUDE;

        if (i === 0) {
            d += ` L ${CENTER_X} ${y} L ${x} ${y}`;
        } else {
            const prevY = 40 + (i - 1) * NODE_GAP;
            const prevX = (i - 1) % 2 === 0
                ? CENTER_X - AMPLITUDE
                : CENTER_X + AMPLITUDE;
            const midY = prevY + NODE_GAP / 2;
            d += ` L ${prevX} ${midY} L ${x} ${midY} L ${x} ${y}`;
        }
        nodes.push({ x, y });
    }

    return { pathD: d, nodes };
}

const { pathD, nodes } = buildCircuit();

/* ── Component ── */
export function MobileCircuitSolutions({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end center"],
    });

    // Smooth spring for fluid trace — like DepthMethod
    const traceDraw = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]),
        { stiffness: 50, damping: 30, mass: 1 }
    );

    return (
        <section className={`relative overflow-hidden ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
            {/* Background atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(6,182,212,0.06)_0%,transparent_70%)]" />
                {isDark && (
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='%2306B6D4' stroke-width='0.3'/%3E%3C/svg%3E")`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                )}
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
                {/* Header */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-4 ${
                        isDark
                            ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30"
                            : "text-cyan-600 border-cyan-300 bg-cyan-50"
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Esplora la pagina
                    </span>
                    <h2 className={`font-fjalla text-2xl sm:text-3xl font-semibold leading-tight ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Cosa troverai{" "}
                        <span className={isDark ? "text-cyan-400" : "text-cyan-700"}>
                            in questa pagina.
                        </span>
                    </h2>
                    <p className={`mt-3 text-sm leading-relaxed max-w-md ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Esplora ogni sezione per scoprire metodo, strumenti
                        e risultati concreti che offriamo alle PMI.
                    </p>
                </motion.div>

                {/* Circuit board */}
                <div ref={containerRef} className="relative" style={{ minHeight: TOTAL_H + 40 }}>
                    {/* SVG trace */}
                    <svg
                        className="absolute left-1/2 -translate-x-1/2 top-0"
                        width={TRACE_W}
                        height={TOTAL_H + 40}
                        viewBox={`0 0 ${TRACE_W} ${TOTAL_H + 40}`}
                        fill="none"
                        style={{ overflow: "visible" }}
                    >
                        {/* Background trace (dim) */}
                        <path
                            d={pathD}
                            stroke={isDark ? "rgba(6,182,212,0.08)" : "rgba(6,182,212,0.12)"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        {/* Illuminated trace */}
                        <motion.path
                            d={pathD}
                            stroke="url(#circuit-grad)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            style={{ pathLength: traceDraw }}
                        />
                        {/* Glow layer */}
                        <motion.path
                            d={pathD}
                            stroke="url(#circuit-grad)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            style={{ pathLength: traceDraw, opacity: 0.3 }}
                            filter="url(#glow)"
                        />
                        <defs>
                            <linearGradient id="circuit-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>

                    {/* Nodes + cards */}
                    {solutions.map((sol, i) => (
                        <CircuitNode
                            key={sol.title}
                            solution={sol}
                            index={i}
                            nodePos={nodes[i]}
                            scrollProgress={scrollYProgress}
                            isDark={isDark}
                        />
                    ))}
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes circuit-pulse {
                    0%, 100% { box-shadow: 0 0 8px var(--accent), 0 0 20px color-mix(in srgb, var(--accent) 30%, transparent); }
                    50% { box-shadow: 0 0 14px var(--accent), 0 0 32px color-mix(in srgb, var(--accent) 45%, transparent); }
                }
            `}</style>
        </section>
    );
}

/* ── Circuit Node ── */
function CircuitNode({
    solution,
    index,
    nodePos,
    scrollProgress,
    isDark,
}: {
    solution: Solution;
    index: number;
    nodePos: { x: number; y: number };
    scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    isDark: boolean;
}) {
    const Icon = solution.icon;
    const isLeft = index % 2 === 0;

    // Node activates when trace reaches it — spread evenly across scroll range
    const activateAt = (index + 0.3) / solutions.length;
    const nodeOpacity = useSpring(
        useTransform(scrollProgress, [activateAt - 0.06, activateAt], [0, 1]),
        { stiffness: 80, damping: 25 }
    );
    const nodeScale = useSpring(
        useTransform(scrollProgress, [activateAt - 0.06, activateAt], [0.5, 1]),
        { stiffness: 80, damping: 25 }
    );

    const handleClick = () => {
        const el = document.getElementById(solution.sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <motion.div
            className="absolute left-1/2"
            style={{
                x: nodePos.x - TRACE_W / 2,
                y: nodePos.y,
                opacity: nodeOpacity,
                scale: nodeScale,
            }}
        >
            {/* Glow ring */}
            <div
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: NODE_R * 2 + 12,
                    height: NODE_R * 2 + 12,
                    left: 0,
                    top: 0,
                    ["--accent" as string]: solution.accent,
                    animation: "circuit-pulse 2.5s ease-in-out infinite",
                    animationDelay: `${index * 0.3}s`,
                }}
            />

            {/* Node circle */}
            <div
                className="absolute rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                    width: NODE_R * 2,
                    height: NODE_R * 2,
                    left: 0,
                    top: 0,
                    background: isDark
                        ? `radial-gradient(circle, ${solution.accent}30 0%, rgba(14,14,13,0.9) 70%)`
                        : `radial-gradient(circle, ${solution.accent}20 0%, rgba(255,255,255,0.95) 70%)`,
                    border: `1.5px solid ${solution.accent}50`,
                    boxShadow: `0 0 12px ${solution.accent}25`,
                }}
                onClick={handleClick}
            >
                <Icon size={18} style={{ color: solution.accent }} />
            </div>

            {/* Card — positioned to the opposite side of the zigzag */}
            <motion.div
                className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
                    isLeft ? "left-[34px]" : "right-[34px]"
                }`}
                style={{ width: 170 }}
                onClick={handleClick}
                whileTap={{ scale: 0.97 }}
            >
                <div className={`rounded-xl border p-3 backdrop-blur-sm transition-all ${
                    isDark
                        ? "bg-[#0E0E0D]/80 border-stone-800/30"
                        : "bg-white/80 border-slate-200/60"
                }`}
                    style={{
                        borderColor: `${solution.accent}20`,
                        boxShadow: `0 2px 12px ${solution.accent}08`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-1.5">
                        <span
                            className="text-[10px] font-mono font-bold"
                            style={{ color: solution.accent }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className={`text-xs font-semibold leading-tight ${
                            isDark ? "text-slate-200" : "text-slate-800"
                        }`}>
                            {solution.title}
                        </h3>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                        isDark ? "text-slate-500" : "text-slate-500"
                    }`}>
                        {solution.desc}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
