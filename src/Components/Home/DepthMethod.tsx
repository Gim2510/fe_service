import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

/* ── DepthMethod ─────────────────────────────────────────────────────────────
   Vertical timeline that fills with scroll progress. Each step card zooms
   in from the distance (scale + blur) as it becomes active. The active step
   has a glowing accent. The timeline connector line draws progressively.
   Dark mode: neon glow on step numbers, timeline, and card borders.
   ────────────────────────────────────────────────────────────────────────── */

const steps = [
    {
        step: "01",
        title: "Diagnosi",
        text: "Mappiamo i tuoi processi, analizziamo i flussi di dati e gli strumenti in uso. Identifichiamo dove perdi tempo, margine e controllo , con dati concreti, non supposizioni.",
        duration: "1-2 settimane",
    },
    {
        step: "02",
        title: "Progettazione",
        text: "Disegniamo l'architettura della soluzione: cosa integrare, cosa costruire, cosa eliminare. Ogni scelta è guidata dal ROI atteso e validata con te prima di procedere.",
        duration: "2-4 settimane",
    },
    {
        step: "03",
        title: "Attivazione",
        text: "Implementiamo, formiamo il team e misuriamo i risultati. Non consegniamo e spariremo: restiamo finché il cambiamento è consolidato e i numeri parlano da soli.",
        duration: "4-8 settimane",
    },
];

const neonStepColors = [
    { border: "border-cyan-500/50", glow: "shadow-cyan-500/20", badge: "text-cyan-400", bg: "bg-cyan-950/40", ring: "border-cyan-500/30", line: "from-cyan-500 to-cyan-700", dot: "border-cyan-500", dotBg: "bg-[#0E0E0D]" },
    { border: "border-violet-500/50", glow: "shadow-violet-500/20", badge: "text-violet-400", bg: "bg-violet-950/40", ring: "border-violet-500/30", line: "from-violet-500 to-violet-700", dot: "border-violet-500", dotBg: "bg-[#0E0E0D]" },
    { border: "border-emerald-500/50", glow: "shadow-emerald-500/20", badge: "text-emerald-400", bg: "bg-emerald-950/40", ring: "border-emerald-500/30", line: "from-emerald-500 to-emerald-700", dot: "border-emerald-500", dotBg: "bg-[#0E0E0D]" },
];

function StepCard({ step, index, isDark, theme: _theme }: {
    step: typeof steps[0]; index: number; isDark: boolean; theme: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const scale   = useSpring(useTransform(scrollYProgress, [0, 0.7], [0.85, 1]), sp);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0.5, 1]), sp);
    const y       = useSpring(useTransform(scrollYProgress, [0, 0.7], [35, 0]), sp);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.7], [8, 0]), sp);

    const colors = neonStepColors[index % neonStepColors.length];

    return (
        <motion.div
            ref={ref}
            className="relative"
            style={{ scale, opacity, y, rotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
        >
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm p-8 h-full transition-all duration-300 ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg ${colors.glow}`
                        : "bg-white border border-slate-200 hover:border-sky-400"
                }`}
                whileHover={isDark ? { y: -6, borderColor: colors.border.replace("/50", "/80") } : { y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {isDark && (
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-15 ${colors.badge}`} />
                )}

                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
                            isDark ? colors.bg : "bg-sky-50"
                        }`}>
                            <span className={`font-mono text-2xl font-bold tracking-tight ${
                                isDark ? colors.badge : "text-sky-700"
                            }`}>
                                {step.step}
                            </span>
                            <motion.div
                                className={`absolute inset-0 rounded-2xl border-2 ${
                                    isDark ? colors.ring : "border-sky-400/40"
                                }`}
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            />
                        </div>
                        <div>
                            <h3 className={`text-xl font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                            }`}>
                                {step.title}
                            </h3>
                            <span className={`text-xs ${isDark ? colors.badge : "text-sky-500"}`}>
                                {step.duration}
                            </span>
                        </div>
                    </div>
                    <div className={`w-8 h-0.5 ${isDark ? `bg-gradient-to-r ${colors.line}` : "bg-sky-600/60"} mt-3`} />
                </div>
                <p className={`text-sm leading-relaxed ${
                    isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                    {step.text}
                </p>
            </motion.div>
        </motion.div>
    );
}

export function DepthMethod({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const timelineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]), sp);
    const headerY        = useSpring(useTransform(scrollYProgress, [0, 0.25], [35, 0]), sp);
    const headerOpacity  = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                <motion.div
                    className="mb-16 text-center sm:text-left max-w-2xl"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        isDark
                            ? "text-cyan-400 border-stone-700/40 bg-stone-800/20"
                            : "text-cyan-600 border-cyan-300 bg-cyan-50"
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Il nostro metodo
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Tre fasi. Zero improvvisazione.
                        <span className={`block mt-1 ${isDark ? "text-cyan-400" : "text-sky-700"}`}>
                            Risultati misurabili dal giorno uno.
                        </span>
                    </h2>
                    <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Ogni progetto segue un percorso chiaro. Deliverable definiti, tempi trasparenti, un obiettivo verificabile , così sai sempre dove siamo e cosa aspettarti.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className={`absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 ${
                        isDark ? "bg-stone-800" : "bg-slate-200"
                    }`}>
                        <motion.div
                            className="w-full bg-gradient-to-b from-cyan-500 to-violet-600 rounded-full shadow-lg shadow-cyan-500/20"
                            style={{ height: timelineHeight }}
                        />
                    </div>

                    <div className="flex flex-col gap-12 pl-20 sm:pl-28">
                        {steps.map((step, i) => (
                            <div key={step.step} className="relative">
                                <motion.div
                                    className={`absolute -left-[52px] sm:-left-[68px] top-8 w-4 h-4 rounded-full border-2 z-10 ${
                                        isDark
                                            ? `${neonStepColors[i].dotBg} ${neonStepColors[i].dot}`
                                            : "bg-[#FAFAF8] border-sky-600"
                                    }`}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.15 }}
                                />
                                <StepCard step={step} index={i} isDark={isDark} theme={theme} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
