import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";
import { GlassCard } from "./GlassCard.tsx";

/* ── ParallaxTestimonials ────────────────────────────────────────────────────
   Cards enter with 3D perspective rotation — left card rotates from left,
   center comes straight, right rotates from right. As the section scrolls,
   cards float at different vertical speeds, creating depth.
   ────────────────────────────────────────────────────────────────────────── */

const testimonials = [
    {
        quote: "In tre mesi abbiamo eliminato il 40% delle attivit\u00E0 manuali nel reparto logistica. I dati ora fluiscono in automatico e il mio team si concentra su ci\u00F2 che conta davvero.",
        name: "Marco Ferretti",
        role: "Operations Director",
        company: "Ferretti Distribuzione Srl",
        sector: "Distribuzione",
        result: "\u221240% attivit\u00E0 manuali",
        resultColor: "text-sky-500",
    },
    {
        quote: "Avevamo dati ovunque e visibilit\u00E0 zero. Oggi ho una dashboard che mi dice ogni mattina dove siamo sul budget, il forecast e le priorit\u00E0 del team. Non torno indietro.",
        name: "Giulia Marchetti",
        role: "CFO",
        company: "Marchetti & Partners",
        sector: "Servizi professionali",
        result: "Forecast accuracy +68%",
        resultColor: "text-sky-500",
    },
    {
        quote: "Il nostro CRM era un cimitero di contatti. Ora il funnel \u00E8 vivo, il team commerciale sa esattamente su chi lavorare e il tasso di chiusura \u00E8 raddoppiato in sei mesi.",
        name: "Luca Bianchi",
        role: "CEO",
        company: "Bianchi Impianti SpA",
        sector: "Impiantistica industriale",
        result: "\u00D72 tasso di chiusura",
        resultColor: "text-sky-500",
    },
];

// Different parallax speeds per card to create depth
const cardDepths = [0.05, -0.03, 0.07];
const cardRotations = [-4, 0, 4]; // Y rotation on entry

function TestimonialCard({ t, i, isDark, theme, scrollYProgress }: {
    t: typeof testimonials[0]; i: number; isDark: boolean; theme: string;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, cardDepths[i] * 140]), { stiffness: 80, damping: 28, mass: 0.8 });

    return (
        <motion.div
            style={{ y: cardY }}
            initial={{
                opacity: 0,
                rotateY: cardRotations[i],
                scale: 0.85,
                x: cardRotations[i] * 8,
            }}
            whileInView={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
                x: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <GlassCard theme={theme} className="p-7 h-full flex flex-col gap-5">
                <Quote
                    size={20}
                    className={`shrink-0 ${isDark ? "text-sky-700/60" : "text-sky-400"}`}
                />
                <p className={`text-sm leading-relaxed flex-1 italic ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    &ldquo;{t.quote}&rdquo;
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
                    <span className={`mt-2 inline-block text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-sky-700" : "text-sky-500"
                    }`}>
                        {t.sector}
                    </span>
                </div>
            </GlassCard>
        </motion.div>
    );
}

export function ParallaxTestimonials({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY       = useSpring(useTransform(scrollYProgress, [0, 0.25], [30, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
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
                    <p className={`mt-5 text-lg max-w-2xl mx-auto ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Non promettiamo trasformazioni astratte. Questi sono risultati reali,
                        misurati nelle aziende che hanno scelto un approccio diverso.
                    </p>
                </motion.div>

                {/* Cards with depth parallax */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
                    {testimonials.map((t, i) => (
                        <TestimonialCard
                            key={t.name}
                            t={t}
                            i={i}
                            isDark={isDark}
                            theme={theme}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
