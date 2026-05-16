import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";

/* â”€â”€ CinematicFAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Left label sticks during scroll. FAQ items slide in from right with
   staggered delays. Each item has a subtle parallax offset. The accordion
   animation uses spring physics for natural feel.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const faqs = [
    {
        q: "Quanto costa un progetto?",
        a: "Non esiste un listino fisso. Ogni progetto dipende dalla complessità dei processi e dagli obiettivi. Il punto di partenza è l'assessment gratuito: con i dati del tuo report ti diamo una stima precisa prima di qualsiasi impegno.",
    },
    {
        q: "Quanto tempo per vedere i primi risultati?",
        a: "I primi risultati misurabili arrivano in 4-8 settimane dall'avvio. Non promettiamo miracoli overnight, ma definiamo KPI chiari prima di iniziare , così sai cosa aspettarti e quando.",
    },
    {
        q: "Dobbiamo sostituire i software che già usiamo?",
        a: "Quasi mai. Partiamo da ciò che hai già: ERP, CRM, gestionali, fogli Excel. Integriamo, ottimizziamo e aggiungiamo solo dove c'è un gap reale. Cambiare tutto non è quasi mai la soluzione giusta.",
    },
    {
        q: "Cosa succede dopo l'implementazione?",
        a: "Non spariremo dopo la consegna. Affianchiamo il team durante l'adozione, monitoriamo i KPI e restiamo disponibili per aggiustamenti. Il progetto si chiude quando i risultati sono consolidati.",
    },
    {
        q: "Chi siete?",
        a: "Due fratelli: uno sviluppatore fullstack con esperienza in startup e come consulente backend/DevOps per progetti enterprise (Eni Open-ES), l'altro specializzato in AI e automazioni complesse con formazione diretta dai migliori provider del settore. Costruiamo, integriamo, automatizziamo.",
    },
    {
        q: "Come funziona l'assessment gratuito?",
        a: "Compili il questionario in 10-15 minuti. Ricevi un report con il tuo score di maturità digitale, le aree critiche e un piano d'azione prioritizzato. Senza impegno, senza carta di credito.",
    },
];

function FAQItem({ faq, isDark, isOpen, onToggle, index }: {
    faq: { q: string; a: string };
    isDark: boolean;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    return (
        <motion.div
            className={`border-b last:border-b-0 ${isDark ? "border-stone-800/40" : "border-slate-100"}`}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <button
                onClick={onToggle}
                className={`w-full flex items-start justify-between gap-4 py-6 text-left transition-colors duration-200 group ${
                    isDark ? "hover:text-sky-400" : "hover:text-sky-700"
                }`}
                aria-expanded={isOpen}
            >
                <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${
                    isOpen
                        ? isDark ? "text-sky-400" : "text-sky-700"
                        : isDark ? "text-slate-200" : "text-slate-800"
                }`}>
                    {faq.q}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
                    className={`shrink-0 mt-0.5 transition-colors duration-200 ${
                        isOpen
                            ? isDark ? "text-sky-400" : "text-sky-600"
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
                        transition={{
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, delay: 0.05 },
                        }}
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
        </motion.div>
    );
}

export function CinematicFAQ({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const leftY       = useSpring(useTransform(scrollYProgress, [0, 0.25], [35, 0]), sp);
    const leftOpacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

                    {/* Left label â€” sticky with parallax */}
                    <motion.div
                        className="lg:sticky lg:top-32"
                        style={{ y: leftY, opacity: leftOpacity }}
                    >
                        <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                            isDark
                                ? "text-sky-400 border-stone-700/40 bg-stone-800/20"
                                : "text-sky-700 border-sky-300 bg-sky-50"
                        }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            Domande frequenti
                        </span>
                        <h2 className={`font-fjalla text-xl sm:text-3xl md:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Hai dubbi?{" "}
                            <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                                Rispondiamo.
                            </span>
                        </h2>
                        <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Se non trovi la risposta che cerchi, scrivici â€” rispondiamo entro 24 ore.
                        </p>
                    </motion.div>

                    {/* Accordion â€” items slide in from right */}
                    <div className={`rounded-2xl border px-8 ${
                        isDark
                            ? "bg-[#1C1C1A]/80 border-stone-800/20"
                            : "bg-white border-slate-200"
                    }`}>
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={faq.q}
                                faq={faq}
                                isDark={isDark}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
