import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StatConfig {
    prefix: string;
    number: number;
    suffix: string;
    label: string;
    parallaxSpeed: number;
    neonColor: string;
}

const stats: StatConfig[] = [
    { prefix: "", number: 100, suffix: "%", label: "Progetti su misura", parallaxSpeed: -0.08, neonColor: "cyan" },
    { prefix: "", number: 0, suffix: "", label: "Template generici", parallaxSpeed: 0.12, neonColor: "violet" },
    { prefix: "", number: 24, suffix: "h", label: "Tempo di risposta", parallaxSpeed: -0.05, neonColor: "emerald" },
    { prefix: "", number: 100, suffix: "%", label: "Affiancamento post-lancio", parallaxSpeed: 0.10, neonColor: "amber" },
];

const neonStatMap: Record<string, { border: string; glow: string; text: string }> = {
    cyan: { border: "border-cyan-500/50", glow: "shadow-cyan-500/15", text: "text-cyan-400" },
    violet: { border: "border-violet-500/50", glow: "shadow-violet-500/15", text: "text-violet-400" },
    emerald: { border: "border-emerald-500/50", glow: "shadow-emerald-500/15", text: "text-emerald-400" },
    amber: { border: "border-amber-500/50", glow: "shadow-amber-500/15", text: "text-amber-400" },
};

function AnimatedStat({ stat, isDark, sectionProgress }: { stat: StatConfig; isDark: boolean; sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [count, setCount] = useState(0);
    const y = useSpring(useTransform(sectionProgress, [0, 1], [0, stat.parallaxSpeed * 100]), { stiffness: 80, damping: 28, mass: 0.8 });

    useEffect(() => {
        if (!isInView) return;
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
    }, [isInView, stat.number]);

    const neon = neonStatMap[stat.neonColor] || neonStatMap.cyan;

    return (
        <motion.div
            ref={ref}
            className={`relative rounded-2xl border backdrop-blur-sm p-6 flex flex-col gap-2 transition-all duration-300 ${isDark ? `bg-[#0E0E0D]/70 ${neon.border} shadow-lg ${neon.glow}` : "bg-white border border-slate-200 hover:border-sky-400"}`}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={isDark ? { y: -4, borderColor: neon.border.replace("/50", "/80") } : { y: -4 }}
        >
            {isDark && (<div className={`absolute top-0 right-0 w-12 h-12 rounded-bl-xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-15 ${neon.text}`} />)}
            <span className={`text-4xl font-bold tracking-tight font-fjalla ${isDark ? neon.text : "text-sky-700"}`}>{stat.prefix}{Math.round(count)}{stat.suffix}</span>
            <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>{stat.label}</span>
        </motion.div>
    );
}

export function StatsReveal({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const textX = useSpring(useTransform(scrollYProgress, [0, 0.25], [-25, 0]), sp);
    const textOpacity = useSpring(useTransform(scrollYProgress, [0, 0.18], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}
            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div className="flex flex-col gap-6" style={{ x: textX, opacity: textOpacity }}>
                        <div>
                            <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-cyan-400" : "text-sky-700"}`}>Chi siamo</span>
                            <h2 className={`font-fjalla text-3xl font-semibold leading-tight mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                Due fratelli. Un&apos;idea precisa.<span className={`block mt-1 ${isDark ? "text-cyan-400" : "text-sky-700"}`}>Tecnologia enterprise per PMI.</span>
                            </h2>
                        </div>
                        <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>AxiomLab nasce da una constatazione semplice: le PMI italiane affrontano gli stessi problemi delle grandi aziende, ma senza le stesse risorse. Da una parte c&apos;\u00E8 chi costruisce sistemi enterprise per clienti come Eni e lavora in startup ad alto ritmo. Dall&apos;altra c&apos;\u00E8 chi studia AI e automazioni con i provider pi\u00F9 avanzati e le applica ai processi reali. In mezzo c&apos;\u00E8 il gap \u2014 e quello \u00E8 il nostro spazio.</p>
                        <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>Il nostro modello \u00E8 diverso: diagnosi reale dei processi, soluzioni cucite sul contesto, tecnologie scalabili e un affiancamento che non finisce con il rilascio. Perch\u00E9 il successo di un progetto digitale non si misura al go-live, si misura dopo sei mesi.</p>
                        <button onClick={() => navigate("/about")} className={`inline-flex items-center gap-2 text-sm font-semibold w-fit transition-all duration-200 hover:-translate-y-0.5 group ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-sky-700 hover:text-sky-600"}`}>
                            Scopri la nostra storia<ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-6" style={{ perspective: "800px" }}>
                        {stats.map((s) => (<AnimatedStat key={s.label} stat={s} isDark={isDark} sectionProgress={scrollYProgress} />))}
                    </div>
                </div>
            </div>
        </section>
    );
}
