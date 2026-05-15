import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { HeroConstellation } from "./HeroConstellation.tsx";
import { useNavigate } from "react-router-dom";

/* â”€â”€ Cinematic Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Multi-layer parallax hero: background grid drifts slowly, text staggers in,
   network visualization parallaxes at a different rate, gradient overlays shift
   with scroll. On exit the entire section scales down and fades, revealing
   the next section underneath.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function ScrollRevealText({ text, className, delay = 0 }: {
    text: string; className?: string; delay?: number;
}) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

export function CinematicHero({ theme }: { theme: string }) {
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");
    const isDark = theme === "dark";

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Hero exit effects â€” spring-smoothed for buttery scroll
    const springCfg = { stiffness: 80, damping: 28, mass: 0.8 };

    const scaleRaw   = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.94]);
    const opacityRaw = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
    const bgYRaw     = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const networkYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const textYRaw   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    const smoothScale   = useSpring(scaleRaw,   springCfg);
    const smoothOpacity = useSpring(opacityRaw, springCfg);
    const bgY           = useSpring(bgYRaw,     springCfg);
    const networkY      = useSpring(networkYRaw, springCfg);
    const textY         = useSpring(textYRaw,   springCfg);

    return (
        <motion.section
            ref={sectionRef}
            className="relative min-h-[110dvh] flex items-center overflow-hidden"
            style={{
                scale: smoothScale,
                opacity: smoothOpacity,
            }}
        >
            {/* â”€â”€ Parallax background layer (slowest) â”€â”€ */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{ y: bgY }}
            >
                <div className={`absolute inset-0 ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`} />

                {/* Grid texture â€” drifts slowly */}
                <div
                    className={`absolute inset-0 ${isDark ? "opacity-[0.04]" : "opacity-[0.06]"}`}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Ambient glows â€” subtle, slow-moving */}
                {isDark && (
                    <>
                    <motion.div
                        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.04] bg-sky-700 pointer-events-none"
                        animate={{
                            x: [0, 30, -15, 0],
                            y: [0, -20, 15, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full blur-[120px] opacity-[0.03] bg-sky-600 pointer-events-none"
                        animate={{
                            x: [0, -20, 15, 0],
                            y: [0, 15, -20, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    </>
                )}
            </motion.div>

            {/* â”€â”€ Network layer (medium parallax) â€” contained in right half â”€â”€ */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[20]"
                style={{ y: networkY }}
            >
                <div className="hidden lg:block">
                    {/* Subtle vignette around network to ground it */}
                    <div
                        className="absolute inset-0 pointer-events-none z-[1]"
                        style={{
                        background: isDark
                            ? "radial-gradient(ellipse 60% 70% at 65% 50%, transparent 40%, #0E0E0D 85%)"
                            : "radial-gradient(ellipse 60% 70% at 65% 50%, transparent 40%, #FAFAF8 85%)",
                        }}
                    />
                    <HeroConstellation />
                </div>
            </motion.div>

            {/* â”€â”€ Readability gradient â€” stronger for cleaner text/network separation â”€â”€ */}
            <div
                className="absolute inset-0 pointer-events-none z-[21]"
                style={{
                background: isDark
                    ? "linear-gradient(to right, #0E0E0D 0%, #0E0E0D 5%, rgba(14,14,13,0.92) 20%, rgba(14,14,13,0.65) 40%, rgba(14,14,13,0.15) 55%, transparent 70%)"
                    : "linear-gradient(to right, #FAFAF8 0%, #FAFAF8 5%, rgba(250,250,248,0.92) 20%, rgba(250,250,248,0.65) 40%, rgba(250,250,248,0.15) 55%, transparent 70%)",
                }}
            />

            {/* â”€â”€ Bottom fade for section transition â”€â”€ */}
            <div
                className={`absolute inset-x-0 bottom-0 h-48 z-[22] pointer-events-none ${isDark
                    ? "bg-gradient-to-t from-[#0E0E0D] via-[#0E0E0D]/60 to-transparent"
                    : "bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/60 to-transparent"
                }`}
            />

            {/* â”€â”€ Content layer (fastest parallax) â”€â”€ */}
            <motion.div
                className="relative z-[25] mx-auto max-w-7xl px-6 sm:px-8 pb-20 pt-32 sm:pt-24 w-full pointer-events-none"
                style={{ y: textY }}
            >
                {/* Tag line */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`
                        inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                        px-3 py-1.5 rounded-full border
                        ${isDark
                            ? "text-sky-400 border-stone-700/40 bg-stone-800/20"
                            : "text-sky-700 border-sky-300 bg-sky-50"
                        }
                    `}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                        Consulenza digitale per PMI
                    </span>
                </motion.div>

                {/* Headline â€” word-by-word reveal, clean Y-only animation */}
                <div
                    className={`font-fjalla text-5xl font-semibold leading-[1.1] max-w-2xl ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                >
                    <div className="block overflow-hidden">
                        <ScrollRevealText text="Strumenti da grande impresa." delay={0.25} />
                    </div>
                    <div className="block overflow-hidden mt-1">
                        <span className="text-sky-500">
                            <ScrollRevealText text="Risultati per la tua PMI." delay={0.55} />
                        </span>
                    </div>
                </div>

                {/* Subheadline */}
                <motion.p
                    className={`mt-8 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                    Metodi, automazioni e architetture dati dei grandi player â€” adattati alla tua scala e ai tuoi processi reali.
                </motion.p>

                {/* Trust signals */}
                <motion.div
                    className="mt-6 flex flex-wrap gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                >
                    {["Report personalizzato incluso", "Nessun impegno iniziale", "ROI misurabile"].map((item, i) => (
                        <motion.span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 1.1 + i * 0.08 }}
                        >
                            <CheckCircle size={14} className="text-sky-500 shrink-0" />
                            {item}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                >
                    <button
                        onClick={goToSurvey}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                            bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold
                            transition-all duration-200 shadow-lg shadow-sky-700/25
                            hover:shadow-sky-600/35 hover:-translate-y-0.5"
                    >
                        Misura il tuo gap digitale
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </button>
                    <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Circa 10-15 minuti
                    </span>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.6 }}
                >
                    <span className={`text-xs uppercase tracking-widest ${isDark ? "text-stone-600" : "text-stone-400"}`}>
                        Scorri
                    </span>
                    <motion.div
                        className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 ${
                            isDark ? "border-stone-700" : "border-slate-300"
                        }`}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className={`w-1 h-1.5 rounded-full ${isDark ? "bg-sky-500" : "bg-sky-600"}`}
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
