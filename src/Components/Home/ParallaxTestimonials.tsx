import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";

/* ── ParallaxTestimonials ────────────────────────────────────────────────────
   Cards enter with 3D perspective rotation — left card rotates from left,
   center comes straight, right rotates from right. As the section scrolls,
   cards float at different vertical speeds, creating depth.
   Dark mode: neon glow borders with glowing quote icons and result badges.
   ────────────────────────────────────────────────────────────────────────── */

const testimonials = [
    {
        quote: "In tre mesi abbiamo eliminato il 40% delle attivit\u00E0 manuali nel reparto logistica. I dati ora fluiscono in automatico e il mio team si concentra su ci\u00F2 che conta davvero.",
        name: "Marco Ferretti",
        role: "Operations Director",
        company: "Ferretti Distribuzione Srl",
        sector: "Distribuzione",
        result: "\u221240% attivit\u00E0 manuali",
        resultColor: "text-cyan-400",
    },
    {
        quote: "Avevamo dati ovunque e visibilit\u00E0 zero. Oggi ho una dashboard che mi dice ogni mattina dove siamo sul budget, il forecast e le priorit\u00E0 del team. Non torno indietro.",
        name: "Giulia Marchetti",
        role: "CFO",
        company: "Marchetti & Partners",
        sector: "Servizi professionali",
        result: "Forecast accuracy +68%",
        resultColor: "text-violet-400",
    },
    {
        quote: "Il nostro CRM era un cimitero di contatti. Ora il funnel \u00E8 vivo, il team commerciale sa esattamente su chi lavorare e il tasso di chiusura \u00E8 raddoppiato in sei mesi.",
        name: "Luca Bianchi",
        role: "CEO",
        company: "Bianchi Impianti SpA",
        sector: "Impiantistica industriale",
        result: "\u00D72 tasso di chiusura",
        resultColor: "text-emerald-400",
    },
];

const cardDepths = [0.05, -0.03, 0.07];
const cardRotations = [-4, 0, 4];

const neonTestimonialColors = [
    { border: "border-cyan-500/50", glow: "shadow-cyan-500/15", quote: "text-cyan-400/60", badgeBg: "bg-cyan-500/10", badgeBorder: "border-cyan-500/20", dotBg: "bg-cyan-400", sector: "text-cyan-400/70", lightBorder: "border-cyan-500/60", lightQuote: "text-cyan-600/60", lightBadgeBg: "bg-cyan-50", lightBadgeBorder: "border-cyan-500/30", lightDotBg: "bg-cyan-500", lightSector: "text-cyan-600" },
    { border: "border-violet-500/50", glow: "shadow-violet-500/15", quote: "text-violet-400/60", badgeBg: "bg-violet-500/10", badgeBorder: "border-violet-500/20", dotBg: "bg-violet-400", sector: "text-violet-400/70", lightBorder: "border-violet-500/60", lightQuote: "text-violet-600/60", lightBadgeBg: "bg-violet-50", lightBadgeBorder: "border-violet-500/30", lightDotBg: "bg-violet-500", lightSector: "text-violet-600" },
    { border: "border-emerald-500/50", glow: "shadow-emerald-500/15", quote: "text-emerald-400/60", badgeBg: "bg-emerald-500/10", badgeBorder: "border-emerald-500/20", dotBg: "bg-emerald-400", sector: "text-emerald-400/70", lightBorder: "border-emerald-500/60", lightQuote: "text-emerald-600/60", lightBadgeBg: "bg-emerald-50", lightBadgeBorder: "border-emerald-500/30", lightDotBg: "bg-emerald-500", lightSector: "text-emerald-600" },
];

function TestimonialCard({ t, i, isDark, theme: _theme, scrollYProgress }: {
    t: typeof testimonials[0]; i: number; isDark: boolean; theme: string;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, cardDepths[i] * 140]), { stiffness: 80, damping: 28, mass: 0.8 });
    const colors = neonTestimonialColors[i % neonTestimonialColors.length];

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
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm p-7 h-full flex flex-col gap-5 transition-all duration-300 ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg ${colors.glow}`
                        : `bg-white ${colors.lightBorder} shadow-md shadow-stone-200/50`
                }`}
                whileHover={isDark ? { y: -4, borderColor: colors.border.replace("/50", "/80") } : { y: -4, borderColor: colors.lightBorder.replace("/60", "/90") }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {isDark && (
                    <div className={`absolute top-0 right-0 w-14 h-14 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-15 ${colors.quote}`} />
                )}
                {!isDark && (
                    <div className={`absolute top-0 right-0 w-14 h-14 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-10 ${colors.lightQuote}`} />
                )}

                <Quote
                    size={20}
                    className={`shrink-0 ${isDark ? colors.quote : colors.lightQuote}`}
                />
                <p className={`text-sm leading-relaxed flex-1 italic ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    &ldquo;{t.quote}&rdquo;
                </p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${
                    isDark
                        ? `${colors.badgeBg} border ${colors.badgeBorder}`
                        : `${colors.lightBadgeBg} border ${colors.lightBadgeBorder}`
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? colors.dotBg : colors.lightDotBg}`} />
                    <span className={isDark ? t.resultColor : t.resultColor}>{t.result}</span>
                </div>
                <div className={`border-t pt-5 ${isDark ? "border-stone-800/40" : "border-stone-200"}`}>
                    <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                        {t.name}
                    </p>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                        {t.role} · {t.company}
                    </p>
                    <span className={`mt-2 inline-block text-xs font-medium uppercase tracking-wider ${
                        isDark ? colors.sector : colors.lightSector
                    }`}>
                        {t.sector}
                    </span>
                </div>
            </motion.div>
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
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                <motion.div
                    className="text-center mb-16"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                    }`}>
                        Casi reali
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        PMI che hanno smesso{" "}
                        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
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
