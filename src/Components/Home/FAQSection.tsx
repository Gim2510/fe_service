import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionBase } from "./SectionBase.tsx";

const faqs = [
    {
        q: "Quanto costa un progetto?",
        a: "Non esiste un listino fisso: ogni progetto dipende dalla complessità dei processi, dal numero di sistemi da integrare e dagli obiettivi. Il punto di partenza è sempre l'assessment gratuito, che ci permette di darti una stima precisa prima di qualsiasi impegno.",
    },
    {
        q: "Quanto tempo ci vuole per vedere i primi risultati?",
        a: "I primi risultati misurabili arrivano in media entro 4–8 settimane dall'avvio. Non promettiamo trasformazioni overnight, ma definiamo KPI chiari prima di iniziare — così sai esattamente cosa aspettarti e quando.",
    },
    {
        q: "Dobbiamo sostituire i software che già usiamo?",
        a: "Quasi mai. Il nostro approccio parte da ciò che hai già: ERP, CRM, gestionali, fogli Excel. Integriamo, ottimizziamo e aggiungiamo solo dove c'è un gap reale. Cambiare tutto non è quasi mai la soluzione giusta.",
    },
    {
        q: "Cosa succede dopo l'implementazione?",
        a: "Non spariremo dopo la consegna. Affianchiamo il team durante l'adozione, monitoriamo i KPI concordati e rimaniamo disponibili per aggiustamenti. Il progetto si chiude solo quando i risultati sono consolidati, non quando il codice è in produzione.",
    },
    {
        q: "Avete esperienza nel nostro settore specifico?",
        a: "Operiamo su 12 settori — manifatturiero, distribuzione, servizi professionali, retail, impiantistica e altri. Prima di proporti qualsiasi soluzione, facciamo un'analisi dei tuoi processi specifici: il metodo è collaudato, l'implementazione è sempre contestualizzata.",
    },
    {
        q: "Come funziona l'assessment gratuito?",
        a: "Completi il questionario online in 10–15 minuti: domande sui tuoi processi, strumenti usati, KPI monitorati e principali punti di attrito. Ricevi un report personalizzato con il tuo score di maturità digitale, le aree critiche e un piano d'azione prioritizzato — senza impegno di acquisto.",
    },
];

function FAQItem({ faq, isDark, isOpen, onToggle }: {
    faq: { q: string; a: string };
    isDark: boolean;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className={`border-b last:border-b-0 ${isDark ? "border-stone-800/40" : "border-slate-100"}`}>
            <button
                onClick={onToggle}
                className={`w-full flex items-start justify-between gap-4 py-6 text-left transition-colors duration-200 group ${
                    isDark ? "hover:text-amber-400" : "hover:text-amber-700"
                }`}
                aria-expanded={isOpen}
            >
                <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${
                    isOpen
                        ? isDark ? "text-amber-400" : "text-amber-700"
                        : isDark ? "text-slate-200" : "text-slate-800"
                }`}>
                    {faq.q}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`shrink-0 mt-0.5 transition-colors duration-200 ${
                        isOpen
                            ? isDark ? "text-amber-400" : "text-amber-600"
                            : isDark ? "text-stone-600" : "text-slate-400"
                    }`}
                >
                    <Plus size={18} />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className={`pb-6 text-sm leading-relaxed ${
                            isDark ? "text-slate-500" : "text-slate-600"
                        }`}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

                {/* Left label */}
                <motion.div
                    className="lg:sticky lg:top-32"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-amber-500" : "text-amber-700"
                    }`}>
                        Domande frequenti
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Hai dubbi?{" "}
                        <span className={`block mt-1 ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                            Rispondiamo.
                        </span>
                    </h2>
                    <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Se non trovi la risposta che cerchi, scrivici — rispondiamo entro 24 ore.
                    </p>
                </motion.div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    className={`rounded-2xl border px-8 ${
                        isDark
                            ? "bg-[#1C1C1A]/80 border-stone-800/20"
                            : "bg-white border-slate-200"
                    }`}
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={faq.q}
                            faq={faq}
                            isDark={isDark}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </SectionBase>
    );
}
