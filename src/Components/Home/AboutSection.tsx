import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionBase } from "./SectionBase.tsx";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

interface StatConfig {
    prefix: string;
    number: number;
    suffix: string;
    label: string;
    decimals?: number;
}

const stats: StatConfig[] = [
    { prefix: "",  number: 100, suffix: "%",  label: "Progetti su misura"       },
    { prefix: "",  number: 0,   suffix: "",   label: "Template generici"        },
    { prefix: "",  number: 24,  suffix: "h",  label: "Tempo di risposta"        },
    { prefix: "",  number: 100, suffix: "%",  label: "Affiancamento post-lancio"},
];

function AnimatedStat({ stat, delay, isDark }: { stat: StatConfig; delay: number; isDark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const duration = 1400;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current = Math.min(increment * step, stat.number);
            setCount(current);
            if (step >= steps) clearInterval(timer);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, stat.number]);

    const display = stat.decimals != null
        ? count.toFixed(stat.decimals)
        : Math.round(count).toString();

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
                {stat.prefix}{display}{stat.suffix}
            </span>
            <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                {stat.label}
            </span>
        </motion.div>
    );
}

export function AboutSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
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
                    </div>

                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        AxiomLab nasce da una constatazione semplice: le PMI italiane affrontano
                        gli stessi problemi delle grandi aziende, ma senza le stesse risorse.
                        Da una parte c'è chi costruisce sistemi enterprise per clienti come Eni
                        e lavora in startup ad alto ritmo. Dall'altra c'è chi studia AI e
                        automazioni con i provider più avanzati e le applica ai processi reali.
                        In mezzo c'è il gap — e quello è il nostro spazio.
                    </p>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Il nostro modello è diverso: diagnosi reale dei processi, soluzioni
                        cucite sul contesto, tecnologie scalabili e un affiancamento che non
                        finisce con il rilascio. Perché il successo di un progetto digitale
                        non si misura al go-live, si misura dopo sei mesi.
                    </p>

                    <button
                        onClick={() => navigate("/about")}
                        className={`inline-flex items-center gap-2 text-sm font-semibold w-fit transition-all duration-200 hover:-translate-y-0.5 group ${
                            isDark ? "text-sky-500 hover:text-sky-400" : "text-sky-700 hover:text-sky-600"
                        }`}
                    >
                        Scopri la nostra storia
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </motion.div>

                {/* Stats grid */}
                <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    {stats.map((s, i) => (
                        <AnimatedStat key={s.label} stat={s} delay={0.1 + i * 0.08} isDark={isDark} />
                    ))}
                </motion.div>
            </div>
        </SectionBase>
    );
}
