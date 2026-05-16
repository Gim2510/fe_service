import { GlassCard } from "./GlassCard.tsx";
import { SectionBase } from "./SectionBase.tsx";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const cardVariants = (reduceMotion: boolean): Variants => ({
    hidden: { opacity: 0, y: reduceMotion ? 12 : 36 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.3 : 0.55, ease: [0.22, 1, 0.36, 1] } },
});

const problemi = [
    { title: "«I dati ci sono, ma non li usiamo»", text: "Ogni reparto lavora per conto suo: Excel, CRM parziali, gestionali non collegati. Le decisioni si prendono a sensazione — e il costo di ogni errore si accumula in silenzio." },
    { title: "«Sprechiamo ore in attività manuali»", text: "Processi ripetitivi che tolgono tempo alle persone chiave. Ogni ora persa a inserire dati o riconciliare fogli è un'ora tolta alla crescita." },
    { title: "«Non sappiamo dove andremo a fine mese»", text: "Pipeline commerciale opaca, previsioni inaffidabili, opportunità che scivolano via. Senza visibilità, il fatturato diventa una sorpresa." },
    { title: "«Reagiamo sempre, non anticipiamo mai»", text: "La relazione con i clienti è gestita a emergenza. Manca un sistema che ti dica cosa succederà prima che succeda." },
    { title: "«I costi crescono, i margini no»", text: "Senza controllo su produzione, acquisti e logistica, è impossibile capire dove si perde margine — e quindi impossibile recuperarlo." },
    { title: "«Abbiamo software ovunque, integrazione zero»", text: "Ogni strumento aggiunto ha creato un ecosistema frammentato. Nessuno parla con nessuno, e l'unico collante è il lavoro manuale." },
];

export function ProblemiSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const reduceMotion = useReducedMotion() ?? false;
    const variants = cardVariants(reduceMotion);

    return (
        <SectionBase theme={theme}>
            {/* Header */}
            <motion.div
                className="mb-16 max-w-2xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-sky-500" : "text-sky-700"
                }`}>
                    Ti riconosci?
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    Non sono problemi tecnici.
                    <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                        Sono problemi di business.
                    </span>
                </h2>
                <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Ogni PMI che incontriamo ha una storia diversa, ma racconta sempre le stesse frustrazioni. Se almeno una ti suona familiare, hai già un motivo per parlare con noi.
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
                        variants={variants}
                        transition={{ delay: index * (reduceMotion ? 0.05 : 0.1) }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <GlassCard theme={theme} className="p-7 h-full">
                            {/* Number badge */}
                            <span className={`text-xs font-mono font-medium mb-4 block ${
                                isDark ? "text-sky-700" : "text-sky-500"
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
