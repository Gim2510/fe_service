import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";
import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Diagnosi",
        text: "Analizziamo i tuoi processi, flussi di dati e strumenti esistenti. Identifichiamo dove perdi margine, tempo e controllo — con dati, non supposizioni.",
    },
    {
        step: "02",
        title: "Progettazione",
        text: "Progettiamo un'architettura digitale su misura: integrata con ciò che già hai, scalabile, e con KPI definiti prima ancora di iniziare a costruire.",
    },
    {
        step: "03",
        title: "Attivazione",
        text: "Implementiamo, formiamo il team e misuriamo i risultati. Non consegniamo un sistema — affiancamo l'azienda finché il cambiamento è consolidato.",
    },
];

export function MetodSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            {/* Header */}
            <motion.div
                className="mb-16 text-center sm:text-left max-w-2xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-rose-500" : "text-rose-700"
                }`}>
                    Il nostro metodo
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    Tre fasi. Zero improvvisazione.
                    <span className={`block mt-1 ${isDark ? "text-rose-500" : "text-rose-700"}`}>
                        Risultati misurabili dal giorno uno.
                    </span>
                </h2>
                <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Lavoriamo con un metodo collaudato su decine di PMI italiane. Ogni fase ha deliverable chiari, tempi definiti e un obiettivo verificabile — così sai sempre dove siamo e cosa aspettarti.
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
                                    isDark ? "text-rose-700" : "text-rose-300"
                                }`}>
                                    {item.step}
                                </span>
                                {/* Accent line */}
                                <div className="w-8 h-0.5 bg-rose-600/60 mt-3" />
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
