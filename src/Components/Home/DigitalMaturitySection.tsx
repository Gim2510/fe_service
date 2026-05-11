import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";
import { motion } from "framer-motion";

const livelli = [
    {
        level: "Base",
        score: "0–30%",
        description: "Operatività prevalentemente manuale. Alto rischio di errori, dati non strutturati e decisioni prese senza dati affidabili. Potenziale di miglioramento massimo.",
        accent: "#EF4444",
        barBg: "bg-red-500/70",
    },
    {
        level: "Intermedio",
        score: "31–60%",
        description: "Digitalizzazione parziale con isole non integrate. Alcuni KPI monitorati, ma processi ancora dipendenti da intervento manuale e riconciliazioni frequenti.",
        accent: "#F59E0B",
        barBg: "bg-rose-500/70",
    },
    {
        level: "Avanzato",
        score: "61–85%",
        description: "Processi chiave digitalizzati e dati centralizzati. Dashboard operative attive. Margini di ottimizzazione su automazione avanzata e AI applicata.",
        accent: "#22C55E",
        barBg: "bg-green-500/70",
    },
    {
        level: "Eccellente",
        score: "86–100%",
        description: "Ecosistema digitale integrato, KPI predittivi e automazione intelligente su processi core. Competitive advantage sostenibile nel tempo.",
        accent: "#3B82F6",
        barBg: "bg-blue-500/70",
    },
];

const pesi = [
    { label: "Processi", weight: 0.4 },
    { label: "Tecnologia", weight: 0.3 },
    { label: "Dati & KPI", weight: 0.2 },
    { label: "Automazione & AI", weight: 0.1 },
];

export function DigitalMaturitySection({ theme }: { theme: string }) {
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
                    isDark ? "text-rose-500" : "text-rose-700"
                }`}>
                    Dove sei oggi?
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    Ogni PMI ha un livello di{" "}
                    <span className={isDark ? "text-rose-500" : "text-rose-700"}>
                        maturità digitale misurabile.
                    </span>
                </h2>
                <p className={`mt-5 text-lg max-w-2xl mx-auto ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    Il nostro assessment misura processi, tecnologia, dati e automazione con un modello strutturato. Il risultato non è un numero generico — è una mappa precisa di dove intervenire per ottenere il massimo impatto nel minor tempo.
                </p>
            </motion.div>

            {/* Level cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {livelli.map((lvl, index) => (
                    <motion.div
                        key={lvl.level}
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                    >
                        <GlassCard theme={theme} className="p-6 h-full flex flex-col gap-3">
                            {/* Accent dot + title */}
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: lvl.accent }}
                                />
                                <h3 className={`text-base font-semibold ${
                                    isDark ? "text-slate-100" : "text-slate-900"
                                }`}>
                                    {lvl.level}
                                </h3>
                            </div>

                            {/* Bar */}
                            <div className={`h-1 rounded-full ${isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"}`}>
                                <div className={`h-full rounded-full ${lvl.barBg}`} />
                            </div>

                            <p className={`text-sm leading-relaxed flex-1 ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}>
                                {lvl.description}
                            </p>

                            <span className={`text-xs font-mono font-medium ${
                                isDark ? "text-slate-600" : "text-slate-400"
                            }`}>
                                Score: {lvl.score}
                            </span>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Weight factors */}
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
                <GlassCard theme={theme} hover={false} className="p-8 sm:p-10 max-w-3xl mx-auto">
                    <h3 className={`text-xl font-semibold mb-8 text-center ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Come calcoliamo il tuo score
                    </h3>

                    <div className="space-y-5">
                        {pesi.map((p) => (
                            <div key={p.label}>
                                <div className={`flex justify-between mb-2 text-sm font-medium ${
                                    isDark ? "text-slate-300" : "text-slate-700"
                                }`}>
                                    <span>{p.label}</span>
                                    <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                                        {Math.round(p.weight * 100)}%
                                    </span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${
                                    isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"
                                }`}>
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-rose-700 to-rose-500"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${p.weight * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className={`mt-8 text-xs text-center ${
                        isDark ? "text-slate-600" : "text-slate-400"
                    }`}>
                        I pesi sono calibrati su dati reali di PMI italiane. I processi pesano di più perché è lì che si genera — o si perde — il margine operativo.
                    </p>
                </GlassCard>
            </motion.div>
        </SectionBase>
    );
}
