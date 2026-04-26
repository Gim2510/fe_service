import { GlassCard } from "./GlassCard.tsx";
import { SectionBase } from "./SectionBase.tsx";
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const problemi = [
    { title: "«I dati ci sono, ma non li vediamo»", text: "Informazioni disperse tra fogli Excel, CRM parziali e strumenti che non comunicano tra loro. Il risultato: decisioni prese a sensazione." },
    { title: "«Facciamo tutto a mano»", text: "Processi ripetitivi che consumano tempo e attenzione, aumentando il rischio di errore e rallentando ogni attività." },
    { title: "«Le vendite sono imprevedibili»", text: "Mancanza di una visione chiara sul funnel, sui clienti realmente interessati e sulle opportunità che contano." },
    { title: "«Corriamo sempre dietro ai problemi»", text: "La gestione clienti è reattiva. Si risponde alle urgenze, ma non si anticipano bisogni e comportamenti." },
    { title: "«Il magazzino non torna mai»", text: "Scorte e approvvigionamenti non allineati alla domanda reale, per mancanza di dati affidabili e aggiornati." },
    { title: "«Tanti strumenti, poco controllo»", text: "Software acquistati nel tempo, usati solo in parte e mai davvero integrati tra loro." },
];

export function ProblemiSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            {/* Header */}
            <motion.div
                className="mb-16 max-w-2xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-amber-500" : "text-amber-700"
                }`}>
                    Scenari comuni
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    I problemi non sono isolati.
                    <span className={`block mt-1 ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                        C'è sempre un filo conduttore.
                    </span>
                </h2>
                <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Nella maggior parte delle PMI troviamo le stesse frizioni.
                </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problemi.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={cardVariants}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard theme={theme} className="p-7 h-full">
                            {/* Number badge */}
                            <span className={`text-xs font-mono font-medium mb-4 block ${
                                isDark ? "text-amber-700" : "text-amber-500"
                            }`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className={`text-base font-semibold mb-3 leading-snug ${
                                isDark ? "text-slate-100" : "text-slate-800"
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
