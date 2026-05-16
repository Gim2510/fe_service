import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import {
    Workflow,
    Plug,
    BrainCircuit,
    LayoutDashboard,
    Repeat,
    Server,
    Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useEffect } from "react";

/* ── Orbital Solutions ───────────────────────────────────────────────────────
   Solar-system parallax with morphing planet cards. Each solution orbits as
   a 3D sphere; when it reaches the front it expands into a readable card.
   Depth drives scale, opacity, size, border-radius, and layer crossfade.
   ──────────────────────────────────────────────────────────────────────── */

interface Solution {
    title: string;
    desc: string;
    icon: LucideIcon;
    accent: string;
}

const solutions: Solution[] = [
    {
        title: "Processi digitalizzati",
        desc: "Workflow cartacei trasformati in flussi digitali automatici",
        icon: Workflow,
        accent: "#06b6d4",
    },
    {
        title: "Integrazioni intelligenti",
        desc: "Tutti i tuoi software collegati, zero doppia digitazione",
        icon: Plug,
        accent: "#8b5cf6",
    },
    {
        title: "AI predittiva",
        desc: "Modelli che anticipano domanda, anomalie e opportunità",
        icon: BrainCircuit,
        accent: "#f59e0b",
    },
    {
        title: "Business Intelligence",
        desc: "Cruscotti real-time che trasformano dati in decisioni",
        icon: LayoutDashboard,
        accent: "#10b981",
    },
    {
        title: "Automazione end-to-end",
        desc: "Dal preventivo alla fattura, senza intervento manuale",
        icon: Repeat,
        accent: "#f43f5e",
    },
    {
        title: "Infrastruttura dati",
        desc: "Data lake centralizzato, sempre accessibile e governato",
        icon: Server,
        accent: "#3b82f6",
    },
    {
        title: "Scalabilità garantita",
        desc: "Architetture cloud-native che crescono col tuo business",
        icon: Cloud,
        accent: "#f97316",
    },
];

const TOTAL = solutions.length;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ── Responsive orbit dimensions (synced with Tailwind breakpoints) ── */
interface Dims {
    rx: number;
    ry: number;
    cardW: number;
    cardH: number;
    sphere: number;
}

function useDims() {
    const ref = useRef<Dims>({ rx: 380, ry: 140, cardW: 220, cardH: 200, sphere: 68 });
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 640) ref.current = { rx: 150, ry: 60, cardW: 185, cardH: 185, sphere: 48 };
            else if (w < 768) ref.current = { rx: 210, ry: 80, cardW: 200, cardH: 192, sphere: 56 };
            else if (w < 1024) ref.current = { rx: 280, ry: 105, cardW: 210, cardH: 196, sphere: 62 };
            else ref.current = { rx: 380, ry: 140, cardW: 220, cardH: 200, sphere: 68 };
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return ref;
}

/* ── Main export ── */
export function HorizontalSolutions({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLElement>(null);
    const dims = useDims();

    /* Track from section entering viewport to leaving it */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    /* With 300vh section + this offset:
       p ≈ 0.00 → section top at viewport bottom (approaching)
       p ≈ 0.25 → section top at viewport top (sticky pins)
       p ≈ 0.75 → section bottom at viewport bottom (sticky unpins)
       p ≈ 1.00 → section bottom at viewport top (gone) */

    const sp = { stiffness: 55, damping: 26, mass: 1 };

    /* ── ENTRANCE: implosion — system forms from scattered explosion ── */
    /* formProgress: 0 = fully scattered, 1 = formed */
    const formProgress = useSpring(
        useTransform(scrollYProgress, [0.04, 0.17], [0, 1]),
        { stiffness: 40, damping: 22, mass: 1.2 }
    );

    const sunScale = useSpring(
        useTransform(scrollYProgress, [0.06, 0.16], [2.5, 1]),
        sp
    );
    const sunOpacity = useSpring(
        useTransform(scrollYProgress, [0.04, 0.12], [0, 1]),
        sp
    );
    /* Sun flare: bright flash during formation then settle */
    const sunFlare = useSpring(
        useTransform(scrollYProgress, [0.04, 0.10, 0.17], [0, 1, 0]),
        sp
    );
    /* Orbit rings: fade in on entrance, fade out on exit */
    const orbitOpacity = useSpring(
        useTransform(scrollYProgress, [0.10, 0.18, 0.72, 0.82], [0, 1, 1, 0]),
        sp
    );

    /* ── EXIT: explosion outward — system bursts apart ── */
    const exitSp = { stiffness: 35, damping: 18, mass: 1.4 };
    /* exitProgress: 0 = formed, 1 = fully exploded */
    const exitProgress = useSpring(
        useTransform(scrollYProgress, [0.72, 0.92], [0, 1]),
        exitSp
    );
    const exitSunScale = useSpring(
        useTransform(scrollYProgress, [0.72, 0.80, 0.92], [1, 1.8, 3.5]),
        exitSp
    );
    const exitSunOpacity = useSpring(
        useTransform(scrollYProgress, [0.72, 0.82, 0.92], [1, 0.9, 0]),
        exitSp
    );
    /* Sun exit flare (bright burst before vanishing) */
    const exitSunFlare = useSpring(
        useTransform(scrollYProgress, [0.72, 0.80, 0.90], [0, 1, 0]),
        exitSp
    );

    return (
        <section
            ref={containerRef}
            className="relative"
            style={{ height: "300vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* ── Background atmosphere ── */}
                {isDark ? (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_55%,rgba(6,182,212,0.07)_0%,transparent_70%)] pointer-events-none" />
                        <div
                            className="absolute inset-0 pointer-events-none opacity-30"
                            style={{
                                backgroundImage: [
                                    "radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                                    "radial-gradient(1px 1px at 45% 12%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                                    "radial-gradient(1.2px 1.2px at 72% 38%, rgba(255,255,255,0.14) 50%, transparent 100%)",
                                    "radial-gradient(0.8px 0.8px at 88% 62%, rgba(255,255,255,0.10) 50%, transparent 100%)",
                                    "radial-gradient(1px 1px at 30% 78%, rgba(255,255,255,0.09) 50%, transparent 100%)",
                                    "radial-gradient(1.5px 1.5px at 62% 85%, rgba(255,255,255,0.07) 50%, transparent 100%)",
                                    "radial-gradient(0.8px 0.8px at 8% 55%, rgba(255,255,255,0.11) 50%, transparent 100%)",
                                    "radial-gradient(1px 1px at 95% 20%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                                ].join(","),
                            }}
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_55%,rgba(14,165,233,0.04)_0%,transparent_70%)] pointer-events-none" />
                )}

                {/* ── Header ── */}
                <motion.div style={{ opacity: exitSunOpacity }} className="absolute top-[12vh] sm:top-[10vh] left-0 right-0 z-30">
                <motion.div
                    className="mx-auto max-w-7xl px-6 sm:px-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                            isDark
                                ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30"
                                : "text-sky-600 border-sky-200 bg-sky-50"
                        }`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Soluzioni su misura
                    </span>
                    <h2
                        className={`font-fjalla text-xl sm:text-3xl md:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                    >
                        Non vendiamo software.{" "}
                        <span
                            className={
                                isDark ? "text-cyan-400" : "text-sky-700"
                            }
                        >
                            Risolviamo problemi.
                        </span>
                    </h2>
                    <p
                        className={`mt-3 text-base leading-relaxed max-w-xl ${
                            isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                        Ogni soluzione orbita intorno al tuo business,
                        progettata per il tuo contesto, integrata con ciò che
                        già usi.
                    </p>
                </motion.div>
                </motion.div>

                {/* ── Orbital system ── */}
                <div className="absolute inset-0">
                    {/* Orbital ring — inner */}
                    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                            className="w-[300px] h-[120px] sm:w-[420px] sm:h-[160px] md:w-[560px] md:h-[210px] lg:w-[760px] lg:h-[280px]
                                rounded-[50%]"
                            style={{
                                border: `1px dashed ${
                                    isDark
                                        ? "rgba(6,182,212,0.22)"
                                        : "rgba(14,165,233,0.16)"
                                }`,
                                opacity: orbitOpacity,
                            }}
                        />
                    </div>
                    {/* Orbital ring — outer halo */}
                    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                            className="w-[340px] h-[136px] sm:w-[462px] sm:h-[176px] md:w-[616px] md:h-[232px] lg:w-[836px] lg:h-[308px]
                                rounded-[50%]"
                            style={{
                                border: `0.5px solid ${
                                    isDark
                                        ? "rgba(6,182,212,0.08)"
                                        : "rgba(14,165,233,0.06)"
                                }`,
                                opacity: orbitOpacity,
                            }}
                        />
                    </div>

                    {/* ── Central Sun ── */}
                    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-[60]">
                        <motion.div
                            style={{ scale: exitSunScale, opacity: exitSunOpacity }}
                        >
                        <motion.div
                            style={{ scale: sunScale, opacity: sunOpacity }}
                        >
                            <motion.div
                                className="relative w-20 h-20 sm:w-28 sm:h-28"
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                {/* Outermost glow */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: isDark
                                            ? "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)"
                                            : "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
                                        transform: "scale(3)",
                                        filter: "blur(20px)",
                                    }}
                                />
                                {/* Mid glow */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: isDark
                                            ? "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)"
                                            : "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
                                        transform: "scale(1.8)",
                                        filter: "blur(12px)",
                                    }}
                                />
                                {/* Core sphere */}
                                <div
                                    className={`absolute inset-0 rounded-full ${
                                        isDark
                                            ? "bg-gradient-to-br from-cyan-300 via-cyan-500 to-blue-600"
                                            : "bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500"
                                    }`}
                                    style={{
                                        boxShadow: isDark
                                            ? "0 0 40px rgba(6,182,212,0.5), 0 0 100px rgba(6,182,212,0.2), inset 0 -8px 20px rgba(0,0,0,0.3), inset 0 4px 12px rgba(255,255,255,0.15)"
                                            : "0 0 30px rgba(14,165,233,0.3), 0 0 60px rgba(14,165,233,0.1), inset 0 -6px 16px rgba(0,0,0,0.1), inset 0 4px 10px rgba(255,255,255,0.3)",
                                    }}
                                >
                                    <div
                                        className="absolute rounded-full bg-white/25"
                                        style={{
                                            width: "40%",
                                            height: "25%",
                                            top: "14%",
                                            left: "18%",
                                            filter: "blur(5px)",
                                        }}
                                    />
                                </div>
                                {/* Label */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <span
                                        className={`text-[10px] sm:text-xs font-bold tracking-widest ${
                                            isDark
                                                ? "text-white/90"
                                                : "text-white"
                                        }`}
                                    >
                                        PMI
                                    </span>
                                    <span
                                        className={`text-[7px] sm:text-[9px] tracking-wider mt-0.5 ${
                                            isDark
                                                ? "text-cyan-100/50"
                                                : "text-white/60"
                                        }`}
                                    >
                                        DIGITAL CORE
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                        {/* Entrance implosion flare — bright ring during formation */}
                        <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                opacity: sunFlare,
                                boxShadow: isDark
                                    ? "0 0 80px 30px rgba(6,182,212,0.6), 0 0 160px 60px rgba(6,182,212,0.2)"
                                    : "0 0 60px 20px rgba(14,165,233,0.4), 0 0 120px 50px rgba(14,165,233,0.1)",
                                transform: "scale(1.5)",
                            }}
                        />
                        {/* Exit explosion flare — supernova burst */}
                        <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                opacity: exitSunFlare,
                                boxShadow: isDark
                                    ? "0 0 120px 50px rgba(6,182,212,0.8), 0 0 250px 100px rgba(6,182,212,0.3), 0 0 400px 150px rgba(6,182,212,0.1)"
                                    : "0 0 100px 40px rgba(14,165,233,0.6), 0 0 200px 80px rgba(14,165,233,0.2)",
                                transform: "scale(2.5)",
                            }}
                        />
                        </motion.div>{/* end exitSunScale wrapper */}
                    </div>

                    {/* ── Orbital Cards (planet ↔ card morph) ── */}
                    {solutions.map((sol, i) => (
                        <OrbitalCard
                            key={sol.title}
                            solution={sol}
                            index={i}
                            isDark={isDark}
                            scrollProgress={scrollYProgress}
                            dims={dims}
                            formProgress={formProgress}
                            exitProgress={exitProgress}
                        />
                    ))}
                </div>

                {/* ── Scroll progress arc ── */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <svg width="100" height="50" viewBox="0 0 100 50">
                        <path
                            d="M 8 46 A 42 42 0 0 1 92 46"
                            fill="none"
                            stroke={isDark ? "#1e293b" : "#e2e8f0"}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <motion.path
                            d="M 8 46 A 42 42 0 0 1 92 46"
                            fill="none"
                            stroke={isDark ? "#06b6d4" : "#0ea5e9"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{ pathLength: scrollYProgress }}
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}

/* ── Orbital Card — morphing planet ↔ info card ──────────────────────────── */

function OrbitalCard({
    solution,
    index,
    isDark,
    scrollProgress,
    dims,
    formProgress,
    exitProgress,
}: {
    solution: Solution;
    index: number;
    isDark: boolean;
    scrollProgress: MotionValue<number>;
    dims: { current: Dims };
    formProgress: MotionValue<number>;
    exitProgress: MotionValue<number>;
}) {
    /* Card 0 starts at front (π/2), rotation goes forward (1→2→3…) */
    const baseAngle = (index / TOTAL) * Math.PI * 2 + Math.PI / 2;
    const sp = { stiffness: 45, damping: 24, mass: 1.2 };

    /* Unique scatter direction per card (deterministic from index) */
    const scatterAngle = baseAngle + Math.PI; // scatter outward from orbit position
    const scatterDistance = 600 + (index % 3) * 200; // varied distances
    const scatterRotation = (index % 2 === 0 ? 1 : -1) * (90 + index * 30);

    /* Entrance scatter offset: 1 = fully scattered, 0 = in position */
    const entranceScatterX = useSpring(
        useTransform(formProgress, (f) => Math.cos(scatterAngle) * scatterDistance * (1 - f)),
        sp
    );
    const entranceScatterY = useSpring(
        useTransform(formProgress, (f) => Math.sin(scatterAngle) * scatterDistance * (1 - f)),
        sp
    );
    const entranceRotate = useSpring(
        useTransform(formProgress, (f) => scatterRotation * (1 - f)),
        sp
    );
    const entranceScale = useSpring(
        useTransform(formProgress, (f) => lerp(0.3, 1, f)),
        sp
    );

    /* Exit explosion offset: 0 = in position, 1 = fully scattered */
    const exitScatterX = useSpring(
        useTransform(exitProgress, (e) => Math.cos(scatterAngle) * scatterDistance * 1.3 * e),
        sp
    );
    const exitScatterY = useSpring(
        useTransform(exitProgress, (e) => Math.sin(scatterAngle) * scatterDistance * 1.3 * e),
        sp
    );
    const exitRotate = useSpring(
        useTransform(exitProgress, (e) => -scatterRotation * e),
        sp
    );
    const exitCardScale = useSpring(
        useTransform(exitProgress, (e) => e < 0.3 ? lerp(1, 1.15, e / 0.3) : lerp(1.15, 0.2, (e - 0.3) / 0.7)),
        sp
    );
    const exitCardOpacity = useSpring(
        useTransform(exitProgress, (e) => 1 - clamp01(e * 1.3)),
        sp
    );

    /** Compute orbital state from scroll progress
     *  expand: 0.12→0.20 (cards bloom from center)
     *  rotation: 0.18→0.70 (full 360° orbit) */
    const orbital = (p: number) => {
        const expand = clamp01((p - 0.12) / 0.08);
        const rot = clamp01((p - 0.18) / 0.52) * Math.PI * 2;
        const angle = baseAngle - rot;
        const d = Math.sin(angle);
        // morph: only the single frontmost card opens (d > 0.85)
        const morph = clamp01((d - 0.85) / 0.15);
        return { expand, angle, d, morph };
    };

    /* ── Position (centered on current size) ── */
    const cardX = useSpring(
        useTransform(scrollProgress, (p) => {
            const { rx, cardW, sphere } = dims.current;
            const { expand, angle, morph } = orbital(p);
            const w = lerp(sphere, cardW, morph);
            return rx * Math.cos(angle) * expand - w / 2;
        }),
        sp
    );

    const cardY = useSpring(
        useTransform(scrollProgress, (p) => {
            const { ry, cardH, sphere } = dims.current;
            const { expand, angle, morph } = orbital(p);
            const h = lerp(sphere, cardH, morph);
            return ry * Math.sin(angle) * expand - h / 2;
        }),
        sp
    );

    /* ── Size & shape morph ── */
    const width = useSpring(
        useTransform(scrollProgress, (p) => {
            const { cardW, sphere } = dims.current;
            const { morph } = orbital(p);
            return lerp(sphere, cardW, morph);
        }),
        sp
    );

    const height = useSpring(
        useTransform(scrollProgress, (p) => {
            const { cardH, sphere } = dims.current;
            const { morph } = orbital(p);
            return lerp(sphere, cardH, morph);
        }),
        sp
    );

    const borderRadius = useSpring(
        useTransform(scrollProgress, (p) => {
            const { sphere } = dims.current;
            const { morph } = orbital(p);
            return lerp(sphere / 2, 16, morph);
        }),
        sp
    );

    /* ── Depth-driven properties ── */
    const cardScale = useSpring(
        useTransform(scrollProgress, (p) => {
            const { expand, d } = orbital(p);
            return (0.60 + (d + 1) * 0.20) * Math.max(expand, 0.001);
        }),
        sp
    );

    const cardOpacity = useSpring(
        useTransform(scrollProgress, (p) => {
            const { expand, d } = orbital(p);
            // Back spheres stay visible (min 0.55), front = 1.0
            return (0.55 + (d + 1) * 0.225) * expand;
        }),
        sp
    );

    /* ── Layer crossfade (sphere ↔ card) — tight swap ── */
    const sphereLayerOpacity = useSpring(
        useTransform(scrollProgress, (p) => {
            const { morph } = orbital(p);
            return 1 - clamp01(morph * 2.5);
        }),
        sp
    );

    const cardLayerOpacity = useSpring(
        useTransform(scrollProgress, (p) => {
            const { morph } = orbital(p);
            return clamp01((morph - 0.25) / 0.75);
        }),
        sp
    );

    /* ── 3D flip during morph (sphere rotates open) ── */
    const morphRotateX = useSpring(
        useTransform(scrollProgress, (p) => {
            const { morph } = orbital(p);
            // 0→1 morph: rotateX goes 0° → -8° → 0° (tilt forward then settle)
            if (morph < 0.5) return morph * -16;  // tilt forward
            return (1 - morph) * -16;              // settle back
        }),
        sp
    );

    const morphScalePop = useSpring(
        useTransform(scrollProgress, (p) => {
            const { morph } = orbital(p);
            // brief scale pop at morph midpoint
            if (morph < 0.01) return 1;
            const peak = 1 + Math.sin(morph * Math.PI) * 0.06;
            return peak;
        }),
        sp
    );

    const zIndex = useTransform(scrollProgress, (p) => {
        const { d } = orbital(p);
        return Math.round((d + 1) * 50) + 1;
    });

    const Icon = solution.icon;
    const num = String(index + 1).padStart(2, "0");
    const { accent } = solution;

    return (
        /* Outer scatter layer — entrance implosion + exit explosion */
        <motion.div
            className="absolute left-1/2 top-[55%]"
            style={{
                x: cardX,
                y: cardY,
                zIndex,
            }}
        >
            <motion.div
                style={{
                    x: entranceScatterX,
                    y: entranceScatterY,
                    rotate: entranceRotate,
                    scale: entranceScale,
                }}
            >
            <motion.div
                style={{
                    x: exitScatterX,
                    y: exitScatterY,
                    rotate: exitRotate,
                    scale: exitCardScale,
                    opacity: exitCardOpacity,
                }}
            >
            <motion.div
                style={{
                    scale: cardScale,
                    opacity: cardOpacity,
                }}
            >
            <motion.div
                className="relative overflow-hidden"
                style={{
                    width,
                    height,
                    borderRadius,
                    rotateX: morphRotateX,
                    scale: morphScalePop,
                    transformPerspective: 800,
                }}
            >
                {/* ── Layer 1: Glass-orb planet ── */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-full"
                    style={{ opacity: sphereLayerOpacity }}
                >
                    {/* Base fill — deep tinted glass */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: isDark
                                ? `radial-gradient(circle at 50% 50%, ${accent}30 0%, ${accent}10 50%, rgba(0,0,0,0.5) 100%)`
                                : `radial-gradient(circle at 50% 50%, ${accent}18 0%, ${accent}08 50%, rgba(0,0,0,0.04) 100%)`,
                            border: `1px solid ${isDark ? `${accent}25` : `${accent}15`}`,
                        }}
                    />
                    {/* Crescent highlight — sharp specular on upper-left */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: "70%",
                            height: "70%",
                            top: "4%",
                            left: "4%",
                            background: isDark
                                ? `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`
                                : `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
                        }}
                    />
                    {/* Outer atmosphere halo */}
                    <div
                        className="absolute inset-[-3px] rounded-full pointer-events-none"
                        style={{
                            boxShadow: isDark
                                ? `0 0 12px ${accent}20, 0 0 4px ${accent}10`
                                : `0 0 8px ${accent}10`,
                        }}
                    />
                    {/* Bottom rim light — ground reflection */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: "50%",
                            height: "15%",
                            bottom: "8%",
                            left: "25%",
                            background: isDark
                                ? `radial-gradient(ellipse, ${accent}15 0%, transparent 70%)`
                                : `radial-gradient(ellipse, ${accent}08 0%, transparent 70%)`,
                            filter: "blur(2px)",
                        }}
                    />
                    {/* Drop shadow underneath */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: "60%",
                            height: "10%",
                            bottom: "-8%",
                            left: "20%",
                            background: isDark
                                ? "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)"
                                : "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)",
                            filter: "blur(3px)",
                        }}
                    />
                    {/* Icon — etched inside the glass */}
                    <Icon
                        size={22}
                        className="relative z-10"
                        style={{
                            color: isDark ? `${accent}` : `${accent}`,
                            opacity: isDark ? 0.85 : 0.75,
                            filter: isDark
                                ? `drop-shadow(0 0 5px ${accent}50)`
                                : "none",
                        }}
                    />
                </motion.div>

                {/* ── Layer 2: Expanded info card ── */}
                <motion.div
                    className="absolute inset-0 flex flex-col overflow-hidden"
                    style={{
                        opacity: cardLayerOpacity,
                        borderRadius,
                        background: isDark
                            ? "rgba(14,14,13,0.88)"
                            : "rgba(255,255,255,0.93)",
                        boxShadow: isDark
                            ? `0 0 28px ${accent}10, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
                            : "0 4px 28px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
                        border: `1px solid ${isDark ? `${accent}22` : "rgba(226,232,240,0.8)"}`,
                    }}
                >
                    <div className="p-5 flex flex-col h-full">
                        {/* Watermark number */}
                        <span
                            className={`absolute top-2 right-3 text-4xl font-fjalla font-bold select-none ${
                                isDark ? "text-white/[0.03]" : "text-slate-900/[0.03]"
                            }`}
                        >
                            {num}
                        </span>

                        {/* Accent top edge (dark) */}
                        {isDark && (
                            <div
                                className="absolute top-0 left-4 right-4 h-px rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
                                }}
                            />
                        )}

                        {/* Icon in box */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shrink-0"
                            style={{
                                backgroundColor: isDark
                                    ? `${accent}14`
                                    : `${accent}0C`,
                            }}
                        >
                            <Icon size={20} style={{ color: accent }} />
                        </div>

                        {/* Title */}
                        <h3
                            className={`text-sm font-semibold mb-1.5 ${
                                isDark ? "text-slate-100" : "text-slate-800"
                            }`}
                        >
                            {solution.title}
                        </h3>

                        {/* Description */}
                        <p
                            className={`text-xs leading-relaxed flex-1 ${
                                isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                        >
                            {solution.desc}
                        </p>

                        {/* Accent underline */}
                        <div
                            className="mt-auto pt-3 h-0.5 w-8 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${accent}60, ${accent}10)`,
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
            </motion.div>
            </motion.div>
            </motion.div>
        </motion.div>
    );
}
