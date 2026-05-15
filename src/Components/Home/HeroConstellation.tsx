import {
    motion, useMotionValue, useSpring, useTransform,
    AnimatePresence,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useState, useCallback, useRef, useEffect } from "react";
import {
    Server, BarChart3, TrendingUp, Zap, Bot, Link2, LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── HeroConstellation ──────────────────────────────────────────────────
   Cinematic hexagonal node system featuring:
   — Mouse-driven parallax depth across all nodes
   — 3D orbital rings (atom effect) around the central hub
   — Animated data packets flowing along connections
   — Interactive hover inspection with glass info-cards
   — Dramatic "system boot" entry sequence with line-draw + staggered pop
   ──────────────────────────────────────────────────────────────────── */

interface NodeDef {
    id: string;
    label: string;
    icon: LucideIcon;
    x: number;
    y: number;
    hub?: boolean;
    depth: number;
}

// Hexagonal layout — positioned within right portion of hero
const NODES: NodeDef[] = [
    { id: "hub",         label: "Data Hub",     icon: Server,          x: 52, y: 50, hub: true, depth: 0.2  },
    { id: "crm",         label: "CRM",          icon: BarChart3,       x: 52, y: 15,           depth: 0.7  },
    { id: "analytics",   label: "Analytics",    icon: TrendingUp,      x: 80, y: 30,           depth: 0.85 },
    { id: "automation",  label: "Automazione",  icon: Zap,             x: 80, y: 70,           depth: 0.6  },
    { id: "dashboard",   label: "Dashboard",    icon: LayoutDashboard, x: 52, y: 85,           depth: 0.75 },
    { id: "ai",          label: "AI",           icon: Bot,             x: 24, y: 70,           depth: 0.65 },
    { id: "integration", label: "Integrazioni", icon: Link2,           x: 24, y: 30,           depth: 0.8  },
];

const HUB = NODES[0];
const OUTER = NODES.slice(1);

const NODE_INFO: Record<string, { metric: string; desc: string }> = {
    hub:         { metric: "16 sistemi",  desc: "connessi in tempo reale" },
    crm:         { metric: "+24%",        desc: "conversione lead" },
    analytics:   { metric: "Real-time",   desc: "aggiornamenti ogni 30s" },
    automation:  { metric: "85%",         desc: "processi automatizzati" },
    dashboard:   { metric: "28 report",   desc: "generati in automatico" },
    ai:          { metric: "94%",         desc: "precisione previsioni" },
    integration: { metric: "12 sistemi",  desc: "integrati senza conflitti" },
};

const ORBITS = [
    { radius: 68,  tiltX: 72, tiltZ: 0,   duration: 14, dotSize: 4.5, dotOpacity: 0.7, ringOpacity: 0.12 },
    { radius: 52,  tiltX: 55, tiltZ: 70,  duration: 9,  dotSize: 3.5, dotOpacity: 0.6, ringOpacity: 0.08 },
    { radius: 88,  tiltX: 68, tiltZ: -30, duration: 20, dotSize: 3,   dotOpacity: 0.4, ringOpacity: 0.05 },
];

// ── Architecture-accurate connections ──────────────────────────────────
// Data sources → Hub (ingest), Hub → Outputs (distribute), Cross-links (feedback loops)
const EDGES: { from: string; to: string; type: "ingest" | "distribute" | "cross" }[] = [
    // Sources feed into hub
    { from: "crm",         to: "hub",        type: "ingest" },
    { from: "analytics",   to: "hub",        type: "ingest" },
    { from: "integration", to: "hub",        type: "ingest" },
    // Hub distributes to outputs
    { from: "hub",         to: "dashboard",  type: "distribute" },
    { from: "hub",         to: "ai",         type: "distribute" },
    { from: "hub",         to: "automation",  type: "distribute" },
    // Feedback loops (real architecture patterns)
    { from: "ai",          to: "automation",  type: "cross" },  // predictions drive actions
    { from: "automation",  to: "crm",         type: "cross" },  // actions update records
];

// Packets follow real data flow — each edge gets a packet with speed
const PACKET_EDGES = [
    // Ingest: sources → hub
    { fromId: "crm",         toId: "hub",        type: "ingest" as const,  delay: 0,    speed: 0.06 },
    { fromId: "analytics",   toId: "hub",        type: "ingest" as const,  delay: 0.33, speed: 0.05 },
    { fromId: "integration", toId: "hub",        type: "ingest" as const,  delay: 0.66, speed: 0.055 },
    // Distribute: hub → outputs
    { fromId: "hub",         toId: "dashboard",  type: "distribute" as const, delay: 0.1,  speed: 0.065 },
    { fromId: "hub",         toId: "ai",         type: "distribute" as const, delay: 0.4,  speed: 0.07 },
    { fromId: "hub",         toId: "automation",  type: "distribute" as const, delay: 0.7,  speed: 0.058 },
    // Feedback loops
    { fromId: "ai",          toId: "automation",  type: "cross" as const,   delay: 0.2,  speed: 0.08 },
    { fromId: "automation",  toId: "crm",         type: "cross" as const,   delay: 0.5,  speed: 0.045 },
];

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

/* ── Main ───────────────────────────────────────────────────────────── */

export function HeroConstellation() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Mouse parallax
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const smoothMx = useSpring(mx, { stiffness: 40, damping: 25 });
    const smoothMy = useSpring(my, { stiffness: 40, damping: 25 });

    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
    }, [mx, my]);

    const handleMouseLeave = useCallback(() => {
        mx.set(0.5);
        my.set(0.5);
        setHoveredNode(null);
    }, [mx, my]);

    // ── Canvas for comet-tail packets ──
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const packetsRef = useRef<{ t: number; speed: number; type: string; from: NodeDef; to: NodeDef }[]>([]);

    // Packet animation loop — replicates dev branch comet-tail effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf = 0;
        let last = performance.now();

        // Initialize packet positions
        packetsRef.current = PACKET_EDGES.map(pe => ({
            t: pe.delay,
            speed: pe.speed,
            type: pe.type,
            from: nodeMap[pe.fromId],
            to: nodeMap[pe.toId],
        }));

        const resize = () => {
            const dpr = window.devicePixelRatio;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Color helpers — sky for all data flow types
        const Gw = isDark ? [56, 189, 248] : [2, 132, 199];     // sky
        const Gs = isDark ? [56, 189, 248] : [2, 132, 199];     // sky
        const Ge = isDark ? [56, 189, 248] : [2, 132, 199];     // sky

        const clamp = (v: number) => Math.max(0, Math.min(1, v));
        const aM = 1.0;

        const ga = (a: number) => `rgba(${Gw[0]},${Gw[1]},${Gw[2]},${clamp(a * aM).toFixed(3)})`;
        const sa = (a: number) => `rgba(${Gs[0]},${Gs[1]},${Gs[2]},${clamp(a * aM).toFixed(3)})`;
        const ea = (a: number) => `rgba(${Ge[0]},${Ge[1]},${Ge[2]},${clamp(a * aM).toFixed(3)})`;

        const gBrt = isDark ? "#7DD3FC" : "#38BDF8";
        const sBrt = isDark ? "#7DD3FC" : "#38BDF8";
        const eBrt = isDark ? "#7DD3FC" : "#38BDF8";

        const packetColor = (type: string, bright: boolean) => {
            if (type === "ingest") return bright ? gBrt : `rgba(${Gw[0]},${Gw[1]},${Gw[2]},0.7)`;
            if (type === "cross") return bright ? eBrt : `rgba(${Ge[0]},${Ge[1]},${Ge[2]},0.7)`;
            return bright ? sBrt : `rgba(${Gs[0]},${Gs[1]},${Gs[2]},0.7)`;
        };

        const haloColor = (type: string) => {
            if (type === "ingest") return ga;
            if (type === "cross") return ea;
            return sa;
        };

        // Linear interpolation — packets travel on straight lines matching the SVG strokes
        const lerp = (ax: number, ay: number, bx: number, by: number, t: number) => [
            ax + (bx - ax) * t,
            ay + (by - ay) * t,
        ];

        const frame = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            const W = canvas.clientWidth;
            const H = canvas.clientHeight;
            ctx.clearRect(0, 0, W, H);

            // Convert % coords to pixel coords
            const px = (n: NodeDef) => [n.x / 100 * W, n.y / 100 * H];

            packetsRef.current.forEach(pkt => {
                pkt.t += pkt.speed * dt;
                if (pkt.t >= 1) pkt.t -= 1;

                const a = px(pkt.from);
                const b = px(pkt.to);

                // Comet tail — 22 segments along straight line
                const TAIL = 0.20;
                const ts = Math.max(0, pkt.t - TAIL);
                const SEGS = 22;
                for (let s = 0; s < SEGS; s++) {
                    const f0 = ts + (pkt.t - ts) * (s / SEGS);
                    const f1 = ts + (pkt.t - ts) * ((s + 1) / SEGS);
                    const frac = s / SEGS;
                    const [x0, y0] = lerp(a[0], a[1], b[0], b[1], f0);
                    const [x1, y1] = lerp(a[0], a[1], b[0], b[1], f1);
                    ctx.beginPath();
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y1);
                    ctx.strokeStyle = packetColor(pkt.type, false).replace(/[\d.]+\)$/, `${(frac * frac * 0.70).toFixed(3)})`);
                    ctx.lineWidth = 1.0 + frac * 3.0;
                    ctx.stroke();
                }

                // Head halo — radial gradient
                const [hx, hy] = lerp(a[0], a[1], b[0], b[1], pkt.t);
                const hFn = haloColor(pkt.type);
                const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 11);
                halo.addColorStop(0, hFn(0.85));
                halo.addColorStop(0.4, hFn(0.35));
                halo.addColorStop(1, hFn(0));
                ctx.beginPath();
                ctx.arc(hx, hy, 11, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();

                // Bright core
                ctx.beginPath();
                ctx.arc(hx, hy, 3.0, 0, Math.PI * 2);
                ctx.fillStyle = packetColor(pkt.type, true);
                ctx.fill();

                // White hot center
                ctx.beginPath();
                ctx.arc(hx, hy, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)";
                ctx.fill();
            });

            raf = requestAnimationFrame(frame);
        };

        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [isDark]);

    const lineColor = isDark ? "rgb(16, 185, 129)" : "rgb(5, 150, 105)";
    const crossColor = isDark ? "rgb(52, 211, 153)" : "rgb(16, 185, 129)";

    return (
        <motion.div
            className="absolute inset-0 lg:left-[45%]"
            style={{ pointerEvents: "auto", touchAction: "none" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeIn" }}
        >
            {/* ── SVG: connection lines + data packets ── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
            >
                {/* Spoke lines: hub → outer — draw on entry, then pulse */}
                {OUTER.map((node, i) => (
                    <motion.line
                        key={node.id}
                        x1={HUB.x} y1={HUB.y}
                        x2={node.x} y2={node.y}
                        stroke={lineColor}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0.06, 0.22, 0.06] }}
                        transition={{
                            pathLength: { duration: 0.6, delay: 0.9 + i * 0.12, ease: "easeOut" },
                            opacity:    { duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 + i * 0.12 },
                        }}
                    />
                ))}

                {/* Architecture-accurate cross connections */}
                {EDGES.map((edge, i) => {
                    const fromNode = nodeMap[edge.from];
                    const toNode   = nodeMap[edge.to];
                    const isCross  = edge.type === "cross";
                    return (
                        <motion.line
                            key={`edge-${edge.from}-${edge.to}`}
                            x1={fromNode.x} y1={fromNode.y}
                            x2={toNode.x} y2={toNode.y}
                            stroke={isCross ? crossColor : lineColor}
                            strokeWidth={isCross ? "0.6" : "1"}
                            strokeDasharray={isCross ? "2 2" : undefined}
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: isCross
                                    ? [0.04, 0.12, 0.04]
                                    : [0.06, 0.22, 0.06]
                            }}
                            transition={{
                                pathLength: { duration: 0.5, delay: 1.6 + i * 0.1, ease: "easeOut" },
                                opacity:    { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: 1.6 + i * 0.1 },
                            }}
                        />
                    );
                })}

            </svg>

            {/* ── Canvas: comet-tail data packets ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ left: "0", top: "0" }}
            />

            {/* ── Nodes ── */}
            {NODES.map((node, i) => (
                <NodeEl
                    key={node.id}
                    node={node}
                    index={i}
                    isDark={isDark}
                    smoothMx={smoothMx}
                    smoothMy={smoothMy}
                    isHovered={hoveredNode === node.id}
                    onHover={setHoveredNode}
                />
            ))}
        </motion.div>
    );
}

/* ── Orbital Ring ───────────────────────────────────────────────────── */

function OrbitalRing({ orbit, isDark, index }: {
    orbit: typeof ORBITS[0]; isDark: boolean; index: number;
}) {
    const rgb = isDark ? "56, 189, 248" : "2, 132, 199";

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: "50%", top: "50%",
                marginLeft: -orbit.radius, marginTop: -orbit.radius,
                width: orbit.radius * 2, height: orbit.radius * 2,
                transform: `rotateX(${orbit.tiltX}deg) rotateZ(${orbit.tiltZ}deg)`,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Ring path */}
            <div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid rgba(${rgb}, ${orbit.ringOpacity})` }}
            />

            {/* Primary particle */}
            <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotate: 360 }}
                transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear", delay: 0.7 + index * 0.8 }}
            >
                <div
                    className="absolute"
                    style={{
                        width: orbit.dotSize, height: orbit.dotSize,
                        borderRadius: "50%",
                        background: `rgba(${rgb}, ${orbit.dotOpacity})`,
                        boxShadow: `0 0 ${orbit.dotSize * 2}px rgba(${rgb}, ${orbit.dotOpacity * 0.6}), 0 0 ${orbit.dotSize * 5}px rgba(${rgb}, ${orbit.dotOpacity * 0.15})`,
                        right: -(orbit.dotSize / 2),
                        top: `calc(50% - ${orbit.dotSize / 2}px)`,
                    }}
                />
            </motion.div>

            {/* Counter-rotating secondary particle (rings 0 & 1 only) */}
            {index < 2 && (
                <motion.div
                    className="absolute inset-0"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: orbit.duration * 1.6, repeat: Infinity, ease: "linear", delay: index * 1.2 + 3 }}
                >
                    <div
                        className="absolute"
                        style={{
                            width: orbit.dotSize * 0.6, height: orbit.dotSize * 0.6,
                            borderRadius: "50%",
                            background: `rgba(${rgb}, ${orbit.dotOpacity * 0.4})`,
                            boxShadow: `0 0 ${orbit.dotSize}px rgba(${rgb}, ${orbit.dotOpacity * 0.2})`,
                            left: -(orbit.dotSize * 0.3),
                            top: `calc(50% - ${orbit.dotSize * 0.3}px)`,
                        }}
                    />
                </motion.div>
            )}
        </div>
    );
}

/* ── Node ────────────────────────────────────────────────────────────── */

function NodeEl({ node, index, isDark, smoothMx, smoothMy, isHovered, onHover }: {
    node: NodeDef; index: number; isDark: boolean;
    smoothMx: MotionValue<number>; smoothMy: MotionValue<number>;
    isHovered: boolean;
    onHover: (id: string | null) => void;
}) {
    const Icon = node.icon;
    const isHub = !!node.hub;
    const info  = NODE_INFO[node.id];

    // Parallax: each node shifts based on its depth factor
    const px = useTransform(smoothMx, [0, 1], [-node.depth * 20, node.depth * 20]);
    const py = useTransform(smoothMy, [0, 1], [-node.depth * 14, node.depth * 14]);

    // Entry: hub pops first, outer nodes cascade after their connection lines draw
    const entryDelay = isHub ? 0.4 : 1.0 + (index - 1) * 0.12;

    return (
        /* Layer 1 — position + parallax */
        <motion.div
            className="absolute"
            style={{ left: `${node.x}%`, top: `${node.y}%`, x: px, y: py }}
        >
            {/* Layer 2 — entry animation */}
            <motion.div
                initial={{ opacity: 0, scale: isHub ? 0 : 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: isHub ? 0.8 : 0.6,
                    delay: entryDelay,
                    ease: isHub ? [0.34, 1.56, 0.64, 1] : [0.22, 1, 0.36, 1],
                }}
            >
                {/* Layer 3 — perpetual float */}
                <motion.div
                    animate={{ y: [0, isHub ? -4 : -7, 0] }}
                    transition={{
                        duration: 4.5 + index * 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: entryDelay + 1.5,
                    }}
                >
                    <div
                        className="relative -translate-x-1/2 -translate-y-1/2"
                        onMouseEnter={() => onHover(node.id)}
                        onMouseLeave={() => onHover(null)}
                    >
                        {/* ── Hub-only effects ── */}
                        {isHub && (
                            <>
                                {/* Boot flash — plays once then vanishes */}
                                <motion.div
                                    className={`absolute rounded-full blur-2xl pointer-events-none ${
                                        isDark ? "bg-sky-400/40" : "bg-sky-500/25"
                                    }`}
                                    style={{ inset: "-40px" }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 2.2] }}
                                    transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
                                />

                                {/* Ambient glow */}
                                <div
                                    className={`absolute rounded-full blur-3xl pointer-events-none ${
                                        isDark ? "bg-sky-500/[0.07]" : "bg-sky-400/[0.05]"
                                    }`}
                                    style={{ inset: "-50px" }}
                                />

                                {/* Breathing halo */}
                                <motion.div
                                    className={`absolute rounded-full pointer-events-none ${
                                        isDark ? "border border-sky-500/15" : "border border-sky-400/20"
                                    }`}
                                    style={{ inset: "-14px" }}
                                    animate={{ scale: [1, 1.22, 1], opacity: [0.12, 0.5, 0.12] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                />

                                {/* 3D orbital system */}
                                <div
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: "50%", top: "50%",
                                        width: 0, height: 0,
                                        perspective: "600px",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {ORBITS.map((orbit, oi) => (
                                        <OrbitalRing key={oi} orbit={orbit} isDark={isDark} index={oi} />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Outer-node hover glow ring */}
                        {!isHub && (
                            <motion.div
                                className={`absolute rounded-full pointer-events-none ${
                                    isDark ? "border border-sky-500/0" : "border border-sky-400/0"
                                }`}
                                style={{ inset: "-6px" }}
                                animate={isHovered
                                    ? { scale: 1.3, opacity: 1, borderColor: isDark ? "rgba(56,189,248,0.3)" : "rgba(2,132,199,0.25)" }
                                    : { scale: 1, opacity: 0, borderColor: "rgba(0,0,0,0)" }
                                }
                                transition={{ duration: 0.25 }}
                            />
                        )}

                        {/* Node body */}
                        <motion.div
                            className={`
                                relative z-10 cursor-pointer
                                ${isHub ? "w-[4.5rem] h-[4.5rem]" : "w-12 h-12"}
                                rounded-full flex items-center justify-center backdrop-blur-sm
                                transition-colors duration-200
                                ${isDark
                                    ? `bg-[#1C1C1A]/80 border ${isHovered ? "border-sky-500/50" : "border-stone-700/40"}`
                                    : `bg-white/80 border ${isHovered ? "border-sky-400/60" : "border-slate-200/60"} shadow-sm`
                                }
                            `}
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Icon
                                size={isHub ? 24 : 17}
                                className={`transition-colors duration-200 ${
                                    isHovered
                                        ? (isDark ? "text-sky-300" : "text-sky-600")
                                        : (isDark ? "text-sky-400" : "text-sky-700")
                                }`}
                            />
                        </motion.div>

                        {/* Label */}
                        <div className={`
                            relative z-10 text-center mt-2 text-[10px] font-semibold tracking-wide whitespace-nowrap
                            transition-colors duration-200
                            ${isHovered
                                ? (isDark ? "text-slate-300" : "text-slate-600")
                                : (isDark ? "text-slate-500/70" : "text-slate-400/70")
                            }
                        `}>
                            {node.label}
                        </div>

                        {/* Hover info card */}
                        <AnimatePresence>
                            {isHovered && info && (
                                <motion.div
                                    className={`
                                        absolute left-1/2 -translate-x-1/2 z-30 whitespace-nowrap
                                        ${isHub ? "bottom-full mb-5" : "top-full mt-8"}
                                        px-4 py-2.5 rounded-xl backdrop-blur-md
                                        ${isDark
                                            ? "bg-[#1C1C1A]/90 border border-sky-500/20 shadow-lg shadow-sky-900/20"
                                            : "bg-white/90 border border-sky-300/40 shadow-lg shadow-sky-100/60"
                                        }
                                    `}
                                    initial={{ opacity: 0, y: isHub ? 8 : -8, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: isHub ? 8 : -8, scale: 0.9 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <div className={`text-lg font-bold leading-none ${
                                        isDark ? "text-sky-400" : "text-sky-700"
                                    }`}>
                                        {info.metric}
                                    </div>
                                    <div className={`text-[11px] mt-1 leading-none ${
                                        isDark ? "text-slate-500" : "text-slate-400"
                                    }`}>
                                        {info.desc}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
