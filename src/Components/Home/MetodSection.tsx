import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";
import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Analisi",
        text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento.",
    },
    {
        step: "02",
        title: "Progettazione",
        text: "Definiamo un'architettura solida, sostenibile e allineata agli obiettivi di business.",
    },
    {
        step: "03",
        title: "Implementazione",
        text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili.",
    },
];

export function MetodSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme} className={isDark ? "" : "!bg-white"}>
            {/* Header */}
            <motion.div
                className="mb-16 text-center sm:text-left max-w-2xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-blue-400" : "text-blue-600"
                }`}>
                    Il nostro metodo
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    Un approccio strutturato
                    <span className={`block mt-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        orientato ai risultati.
                    </span>
                </h2>
                <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Ogni progetto segue tre fasi distinte per garantire risultati concreti e misurabili.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((item, index) => (
                    <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
                    >
                        <GlassCard theme={theme} className="p-8 h-full">
                            {/* Step number */}
                            <div className="flex items-start justify-between mb-6">
                                <span className={`font-mono text-4xl font-bold tracking-tight ${
                                    isDark ? "text-blue-900/60" : "text-blue-100"
                                }`}>
                                    {item.step}
                                </span>
                                {/* Accent line */}
                                <div className="w-8 h-0.5 bg-blue-500/60 mt-3" />
                            </div>

                            <h3 className={`text-xl font-semibold mb-3 ${
                                isDark ? "text-slate-100" : "text-slate-900"
                            }`}>
                                {item.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${
                                isDark ? "text-slate-500" : "text-slate-500"
                            }`}>
                                {item.text}
                            </p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </SectionBase>
    );
}
