import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { GlassCard } from "./GlassCard.tsx";

const testimonials = [
    {
        quote: "In tre mesi abbiamo eliminato il 40% delle attività manuali nel reparto logistica. I dati ora fluiscono in automatico e il mio team si concentra su ciò che conta davvero.",
        name: "Marco Ferretti",
        role: "Operations Director",
        company: "Ferretti Distribuzione Srl",
        sector: "Distribuzione",
        result: "−40% attività manuali",
        resultColor: "text-green-500",
    },
    {
        quote: "Avevamo dati ovunque e visibilità zero. Oggi ho una dashboard che mi dice ogni mattina dove siamo sul budget, il forecast e le priorità del team. Non torno indietro.",
        name: "Giulia Marchetti",
        role: "CFO",
        company: "Marchetti & Partners",
        sector: "Servizi professionali",
        result: "Forecast accuracy +68%",
        resultColor: "text-sky-500",
    },
    {
        quote: "Il nostro CRM era un cimitero di contatti. Ora il funnel è vivo, il team commerciale sa esattamente su chi lavorare e il tasso di chiusura è raddoppiato in sei mesi.",
        name: "Luca Bianchi",
        role: "CEO",
        company: "Bianchi Impianti SpA",
        sector: "Impiantistica industriale",
        result: "×2 tasso di chiusura",
        resultColor: "text-blue-400",
    },
];

interface StatConfig {
    prefix: string;
    number: number;
    suffix: string;
    label: string;
}

const stats: StatConfig[] = [
    { prefix: "", number: 100, suffix: "%", label: "Progetti su misura" },
    { prefix: "", number: 0, suffix: "", label: "Template generici" },
    { prefix: "", number: 24, suffix: "h", label: "Tempo di risposta" },
    { prefix: "", number: 100, suffix: "%", label: "Affiancamento post-lancio" },
];

function AnimatedStat({ stat, delay, isDark }: { stat: StatConfig; delay: number; isDark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 1400;
                    const steps = 60;
                    const increment = stat.number / steps;
                    let step = 0;
                    const timer = setInterval(() => {
                        step++;
                        setCount(Math.min(increment * step, stat.number));
                        if (step >= steps) clearInterval(timer);
                    }, duration / steps);
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [stat.number, hasAnimated]);

    return (
        <motion.div
            ref={ref}
            className={`rounded-2xl border p-6 flex flex-col gap-2 ${
                isDark
                    ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-sky-800/30"
                    : "bg-white border-slate-200 hover:border-sky-400"
            } transition-colors duration-300`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay }}
        >
            <span className={`text-3xl font-bold tracking-tight font-fjalla ${
                isDark ? "text-sky-500" : "text-sky-700"
            }`}>
                {stat.prefix}{Math.round(count)}{stat.suffix}
            </span>
            <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                {stat.label}
            </span>
        </motion.div>
    );
}

export function ParallaxAbout() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const rightY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const tY0 = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const tY1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const tY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const tYs = [tY0, tY1, tY2];

    return (
        <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden">
            <motion.div
                className="relative mx-auto max-w-7xl px-6 sm:px-8"
                style={{ opacity }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <motion.div className="flex flex-col gap-6" style={{ y: leftY }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className={`text-xs font-semibold uppercase tracking-widest ${
                                isDark ? "text-sky-500" : "text-sky-700"
                            }`}>
                                Chi siamo
                            </span>
                            <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight mt-3 ${
                                isDark ? "text-slate-100" : "text-slate-900"
                            }`}>
                                Due fratelli. Un'idea precisa.
                                <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                                    Tecnologia enterprise per PMI.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            AxiomLab nasce da una constatazione semplice: le PMI italiane affrontano
                            gli stessi problemi delle grandi aziende, ma senza le stesse risorse.
                            Da una parte c'è chi costruisce sistemi enterprise e lavora in startup ad alto ritmo.
                            Dall'altra c'è chi studia AI e automazioni con i provider più avanzati.
                            In mezzo c'è il gap — e quello è il nostro spazio.
                        </motion.p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div className="grid grid-cols-2 gap-4" style={{ y: rightY }}>
                        {stats.map((s, i) => (
                            <AnimatedStat key={s.label} stat={s} delay={0.1 + i * 0.08} isDark={isDark} />
                        ))}
                    </motion.div>
                </div>

                {/* Testimonials */}
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <div className="text-center mb-16">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${
                            isDark ? "text-sky-500" : "text-sky-700"
                        }`}>
                            Casi reali
                        </span>
                        <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            PMI che hanno smesso{" "}
                            <span className={isDark ? "text-sky-500" : "text-sky-700"}>
                                di perdere margine.
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                                style={{ y: tYs[i] }}
                            >
                                <GlassCard theme={theme} className="p-7 h-full flex flex-col gap-5">
                                    <Quote
                                        size={20}
                                        className={`shrink-0 ${isDark ? "text-sky-700/60" : "text-sky-400"}`}
                                    />
                                    <p className={`text-sm leading-relaxed flex-1 italic ${
                                        isDark ? "text-slate-400" : "text-slate-600"
                                    }`}>
                                        "{t.quote}"
                                    </p>
                                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${
                                        isDark ? "bg-stone-800/60 border border-stone-700/40" : "bg-slate-50 border border-slate-200"
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${t.resultColor.replace("text-", "bg-")}`} />
                                        <span className={t.resultColor}>{t.result}</span>
                                    </div>
                                    <div className={`border-t pt-5 ${isDark ? "border-stone-800/40" : "border-slate-100"}`}>
                                        <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                            {t.name}
                                        </p>
                                        <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                            {t.role} · {t.company}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
