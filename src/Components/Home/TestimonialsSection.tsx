import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionBase } from "./SectionBase.tsx";
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
        resultColor: "text-amber-500",
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

export function TestimonialsSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-amber-500" : "text-amber-700"
                }`}>
                    Casi reali
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    PMI che hanno smesso{" "}
                    <span className={isDark ? "text-amber-500" : "text-amber-700"}>
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

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                    >
                        <GlassCard theme={theme} className="p-7 h-full flex flex-col gap-5">
                            {/* Quote icon */}
                            <Quote
                                size={20}
                                className={`shrink-0 ${isDark ? "text-amber-700/60" : "text-amber-400"}`}
                            />

                            {/* Quote text */}
                            <p className={`text-sm leading-relaxed flex-1 italic ${
                                isDark ? "text-slate-400" : "text-slate-600"
                            }`}>
                                "{t.quote}"
                            </p>

                            {/* Result badge */}
                            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${
                                isDark ? "bg-stone-800/60 border border-stone-700/40" : "bg-slate-50 border border-slate-200"
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${t.resultColor.replace("text-", "bg-")}`} />
                                <span className={t.resultColor}>{t.result}</span>
                            </div>

                            {/* Author */}
                            <div className={`border-t pt-5 ${isDark ? "border-stone-800/40" : "border-slate-100"}`}>
                                <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                    {t.name}
                                </p>
                                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    {t.role} · {t.company}
                                </p>
                                <span className={`mt-2 inline-block text-xs font-medium uppercase tracking-wider ${
                                    isDark ? "text-amber-700" : "text-amber-500"
                                }`}>
                                    {t.sector}
                                </span>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </SectionBase>
    );
}
