import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "./GlassCard.tsx";

/* ── DepthMethod ─────────────────────────────────────────────────────────────
   Vertical timeline that fills with scroll progress. Each step card zooms
   in from the distance (scale + blur) as it becomes active. The active step
   has a glowing accent. The timeline connector line draws progressively.
   ────────────────────────────────────────────────────────────────────────── */

const steps = [
    {
        step: "01",
        title: "Diagnosi",
        text: "Mappiamo i tuoi processi, analizziamo i flussi di dati e gli strumenti in uso. Identifichiamo dove perdi tempo, margine e controllo \u2014 con dati concreti, non supposizioni.",
        duration: "1\u20132 settimane",
    },
    {
        step: "02",
        title: "Progettazione",
        text: "Disegniamo l\u2019architettura della soluzione: cosa integrare, cosa costruire, cosa eliminare. Ogni scelta \u00E8 guidata dal ROI atteso e validata con te prima di procedere.",
        duration: "2\u20134 settimane",
    },
    {
        step: "03",
        title: "Attivazione",
        text: "Implementiamo, formiamo il team e misuriamo i risultati. Non consegniamo e spariremo: restiamo finch\u00E9 il cambiamento \u00E8 consolidato e i numeri parlano da soli.",
        duration: "4\u20138 settimane",
    },
];

function StepCard({ step, index, isDark, theme }: {
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

    return (
        <motion.div
            ref={ref}
            className="relative"
            style={{ scale, opacity, y, rotateX, transformStyle: "preserve-3d", perspective: "1000px" }}
        >
            <GlassCard theme={theme} className="p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* Glowing step number */}
                        <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
                            isDark ? "bg-sky-900/30" : "bg-sky-50"
                        }`}>
                            <span className={`font-mono text-2xl font-bold tracking-tight ${
                                isDark ? "text-sky-500" : "text-sky-700"
                            }`}>
                                {step.step}
                            </span>
                            {/* Glow ring */}
                            <motion.div
                                className={`absolute inset-0 rounded-2xl border-2 ${
                                    isDark ? "border-sky-500/30" : "border-sky-400/40"
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
                            <span className={`text-xs ${isDark ? "text-sky-600" : "text-sky-500"}`}>
                                {step.duration}
                            </span>
                        </div>
                    </div>
                    <div className="w-8 h-0.5 bg-sky-600/60 mt-3" />
                </div>
                <p className={`text-sm leading-relaxed ${
                    isDark ? "text-slate-500" : "text-slate-500"
                }`}>
                    {step.text}
                </p>
            </GlassCard>
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
    // Timeline fill progress
    const timelineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]), sp);
    const headerY        = useSpring(useTransform(scrollYProgress, [0, 0.25], [35, 0]), sp);
    const headerOpacity  = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                {/* Header */}
                <motion.div
                    className="mb-16 text-center sm:text-left max-w-2xl"
                    style={{ y: headerY, opacity: headerOpacity }}
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
                    <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Ogni progetto segue un percorso chiaro. Deliverable definiti, tempi trasparenti, un obiettivo verificabile — così sai sempre dove siamo e cosa aspettarti.
                    </p>
                </motion.div>

                {/* Timeline + Steps */}
                <div className="relative">
                    {/* Vertical timeline line (background) */}
                    <div className={`absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 ${
                        isDark ? "bg-stone-800" : "bg-slate-200"
                    }`}>
                        {/* Filled portion — animated with scroll */}
                        <motion.div
                            className="w-full bg-gradient-to-b from-sky-500 to-sky-700 rounded-full"
                            style={{ height: timelineHeight }}
                        />
                    </div>

                    {/* Step cards */}
                    <div className="flex flex-col gap-12 pl-20 sm:pl-28">
                        {steps.map((step, i) => (
                            <div key={step.step} className="relative">
                                {/* Timeline dot */}
                                <motion.div
                                    className={`absolute -left-[52px] sm:-left-[68px] top-8 w-4 h-4 rounded-full border-2 z-10 ${
                                        isDark
                                            ? "bg-[#0E0E0D] border-sky-500"
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
