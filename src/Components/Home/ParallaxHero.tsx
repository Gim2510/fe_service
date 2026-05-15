import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type Easing } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { HeroNetwork } from "./HeroNetwork.tsx";

const easeCustom: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: easeCustom, delay },
});

const particleConfigs = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 4,
    speed: 0.1 + Math.random() * 0.6,
    opacity: 0.03 + Math.random() * 0.12,
    duration: 5 + Math.random() * 6,
    depth: 0.2 + Math.random() * 0.8,
}));

function FloatingParticles({ isDark, scrollY }: { isDark: boolean; scrollY: number }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particleConfigs.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${isDark ? "bg-sky-500" : "bg-sky-600"}`}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        y: -scrollY * p.speed * p.depth,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [p.opacity, p.opacity * 2, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function ParallaxHero() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Layer 1: Background - slowest
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    // Layer 2: Grid - medium speed
    const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.7], [isDark ? 0.06 : 0.1, 0]);
    const gridX = useTransform(scrollYProgress, [0, 1], [0, -60]);

    // Layer 3: Particles - variable depth
    const particleScrollY = useTransform(scrollYProgress, [0, 1], [0, 250]);

    // Layer 4: HeroNetwork - parallax with horizontal drift
    const networkY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const networkX = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const networkOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const networkScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
    const networkRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

    // Layer 5: Content - fastest (foreground)
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 350]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    // Mouse parallax for glow elements
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

    // Glow elements with scroll + mouse parallax
    const glow1X = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const glow1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const glow2X = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const glow3X = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const glow3Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

    // Scroll indicator
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.15], [0, 30]);

    // Decorative floating shapes
    const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const shape1X = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const shape1Rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const shape2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const shape2X = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const shape2Rotate = useTransform(scrollYProgress, [0, 1], [0, -30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const nx = (e.clientX - rect.left) / rect.width - 0.5;
                const ny = (e.clientY - rect.top) / rect.height - 0.5;
                mouseX.set(nx);
                mouseY.set(ny);
                setMousePos({ x: nx, y: ny });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const goToSurvey = () => navigate("/survey/start");

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] flex items-center overflow-hidden"
            style={{ perspective: "1200px" }}
        >
            {/* Layer 1: Background */}
            <motion.div
                className={`absolute inset-0 ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}
                style={{ y: bgY, scale: bgScale }}
            />

            {/* Layer 2: Grid */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: gridY, x: gridX, opacity: gridOpacity }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </motion.div>

            {/* Layer 3: Floating decorative shapes */}
            <motion.div
                className="absolute top-20 right-20 w-32 h-32 pointer-events-none"
                style={{
                    y: shape1Y,
                    x: shape1X,
                    rotate: shape1Rotate,
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.08, 0]),
                }}
            >
                <div className={`w-full h-full rounded-full border ${isDark ? "border-sky-700/30" : "border-sky-400/30"}`} />
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-16 w-24 h-24 pointer-events-none"
                style={{
                    y: shape2Y,
                    x: shape2X,
                    rotate: shape2Rotate,
                    opacity: useTransform(scrollYProgress, [0, 0.6], [0.06, 0]),
                }}
            >
                <div className={`w-full h-full rounded-lg border ${isDark ? "border-sky-600/20" : "border-sky-500/20"}`} />
            </motion.div>

            {/* Layer 4: Particles */}
            <FloatingParticles isDark={isDark} scrollY={particleScrollY.get() + mousePos.y * 50} />

            {/* Layer 5: HeroNetwork - visible on right, no overlay */}
            <motion.div
                className="hidden lg:block absolute inset-0 pointer-events-none"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [springX.get() * 30, networkX.get()]),
                    y: useTransform(scrollYProgress, [0, 1], [springY.get() * 30, networkY.get()]),
                    scale: networkScale,
                    opacity: networkOpacity,
                    rotate: networkRotate,
                }}
            >
                <HeroNetwork />
            </motion.div>

            {/* Layer 6: Glow elements */}
            {isDark && (
                <>
                    <motion.div
                        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] bg-sky-700 pointer-events-none"
                        style={{ x: glow1X, y: glow1Y }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] bg-sky-500 pointer-events-none"
                        style={{ x: glow2X, y: glow2Y }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.03] bg-sky-600 pointer-events-none"
                        style={{ x: glow3X, y: glow3Y }}
                    />
                </>
            )}

            {/* Layer 7: Content - foreground */}
            <motion.div
                className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pb-20 pt-32 sm:pt-24 w-full pointer-events-none"
                style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
            >
                <motion.div {...fadeUp(0.05)} className="mb-6">
                    <span className={`
                        inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                        px-3 py-1.5 rounded-full border
                        ${isDark
                            ? "text-sky-500 border-stone-700/40 bg-stone-800/20"
                            : "text-sky-700 border-sky-300 bg-sky-50"
                        }
                    `}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                        Consulenza digitale per PMI
                    </span>
                </motion.div>

                <motion.h1
                    {...fadeUp(0.15)}
                    className={`font-fjalla text-5xl sm:text-7xl font-semibold leading-tight max-w-2xl ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                >
                    <span className="hero-line reveal delay-1 block">
                        Il digitale nelle PMI
                    </span>
                    <span className="hero-line reveal delay-2 block text-sky-600">
                        non è un problema di tecnologia.
                    </span>
                    <span className="hero-line reveal delay-3 block text-4xl sm:text-5xl mt-2">
                        È un problema di metodo.
                    </span>
                </motion.h1>

                <motion.p
                    {...fadeUp(0.28)}
                    className={`mt-8 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                    Portiamo nelle PMI l'approccio che funziona nei grandi clienti: analisi, metodo, automazione mirata. Senza stravolgere quello che già funziona.
                </motion.p>

                <motion.div {...fadeUp(0.35)} className="mt-6 flex flex-wrap gap-4">
                    {["Report personalizzato incluso", "Nessun impegno iniziale", "ROI misurabile"].map((item) => (
                        <span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}
                        >
                            <CheckCircle size={14} className="text-sky-600 shrink-0" />
                            {item}
                        </span>
                    ))}
                </motion.div>

                <motion.div {...fadeUp(0.42)} className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
                    <button
                        onClick={goToSurvey}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                            bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold
                            transition-all duration-200 shadow-lg shadow-sky-700/25
                            hover:shadow-sky-600/35 hover:-translate-y-0.5"
                    >
                        Misura il tuo gap digitale
                        <ArrowRight size={16} />
                    </button>

                    <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Circa 10–15 minuti
                    </span>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
            >
                <motion.div
                    className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${
                        isDark ? "border-stone-700" : "border-slate-300"
                    }`}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className={`w-1 h-2 rounded-full ${isDark ? "bg-stone-600" : "bg-slate-400"}`}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
