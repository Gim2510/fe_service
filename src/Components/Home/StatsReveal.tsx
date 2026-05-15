import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── StatsReveal ─────────────────────────────────────────────────────────────
   Giant stat numbers parallax at different speeds — some rise, some fall.
   Text content slides in from the left. Stats counter-animate on scroll
   trigger. The whole section has a subtle perspective tilt on scroll.
   ────────────────────────────────────────────────────────────────────────── */

interface StatConfig {
    prefix: string;
    number: number;
    suffix: string;
    label: string;
    parallaxSpeed: number;
}

const stats: StatConfig[] = [
    { prefix: "",  number: 100, suffix: "%",  label: "Progetti su misura",        parallaxSpeed: -0.08 },
    { prefix: "",  number: 0,   suffix: "",   label: "Template generici",         parallaxSpeed: 0.12  },
    { prefix: "",  number: 24,  suffix: "h",  label: "Tempo di risposta",         parallaxSpeed: -0.05 },
    { prefix: "",  number: 100, suffix: "%",  label: "Affiancamento post-lancio", parallaxSpeed: 0.10  },
];

function AnimatedStat({ stat, isDark, sectionProgress }: {
    stat: StatConfig; isDark: boolean;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [count, setCount] = useState(0);

    const y = useSpring(useTransform(sectionProgress, [0, 1], [0, stat.parallaxSpeed * 100]), { stiffness: 80, damping: 28, mass: 0.8 });

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

    return (
        <motion.div
            ref={ref}
            className={`rounded-2xl border p-6 flex flex-col gap-2 ${
                isDark
                    ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-sky-800/30"
                    : "bg-white border-slate-200 hover:border-sky-400"
            } transition-colors duration-300`}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className={`text-4xl font-bold tracking-tight font-fjalla ${
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

export function StatsReveal({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const textX       = useSpring(useTransform(scrollYProgress, [0, 0.25], [-25, 0]), sp);
    const textOpacity = useSpring(useTransform(scrollYProgress, [0, 0.18], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text — slides in from left */}
                    <motion.div
                        className="flex flex-col gap-6"
                        style={{ x: textX, opacity: textOpacity }}
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
                                Due fratelli. Un&apos;idea precisa.
                                <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                                    Tecnologia enterprise per PMI.
                                </span>
                            </h2>
                        </div>

                        <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            AxiomLab nasce da una constatazione semplice: le PMI italiane affrontano
                            gli stessi problemi delle grandi aziende, ma senza le stesse risorse.
                            Da una parte c&apos;è chi costruisce sistemi enterprise per clienti come Eni
                            e lavora in startup ad alto ritmo. Dall&apos;altra c&apos;è chi studia AI e
                            automazioni con i provider più avanzati e le applica ai processi reali.
                            In mezzo c&apos;è il gap — e quello è il nostro spazio.
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

                    {/* Stats — each at different parallax speed */}
                    <div className="grid grid-cols-2 gap-4" style={{ perspective: "800px" }}>
                        {stats.map((s) => (
                            <AnimatedStat
                                key={s.label}
                                stat={s}
                                isDark={isDark}
                                sectionProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
