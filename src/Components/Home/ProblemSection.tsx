import { GlassCard } from "./GlassCard.tsx";
import { SectionBase } from "./SectionBase.tsx";
import {motion, type Variants} from "framer-motion"; // <-- import motion

export function ProblemiSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    const problemi = [
        { title: "“I dati ci sono, ma non li vediamo”", text: "Informazioni disperse tra fogli Excel, CRM parziali e strumenti che non comunicano tra loro. Il risultato è decisioni prese a sensazione." },
        { title: "“Facciamo tutto a mano”", text: "Processi ripetitivi che consumano tempo e attenzione, aumentando il rischio di errore e rallentando ogni attività." },
        { title: "“Le vendite sono imprevedibili”", text: "Mancanza di una visione chiara sul funnel, sui clienti realmente interessati e sulle opportunità che contano." },
        { title: "“Corriamo sempre dietro ai problemi”", text: "La gestione clienti è reattiva. Si risponde alle urgenze, ma non si anticipano bisogni e comportamenti." },
        { title: "“Il magazzino non torna mai”", text: "Scorte e approvvigionamenti non allineati alla domanda reale, per mancanza di dati affidabili e aggiornati." },
        { title: "“Abbiamo tanti strumenti, ma poco controllo”", text: "Software acquistati nel tempo, usati solo in parte e mai davvero integrati tra loro." },
    ];

    // Variants per le animazioni
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <SectionBase theme={theme}>
            <div className="relative mb-24">
                {/* SVG FULL WIDTH */}
                <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 1200 200"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 120
                               Q 150 40 300 120
                               C 350 150, 450 150, 500 120
                               S 650 40, 700 120
                               Q 750 200, 800 120
                               T 1200 120"
                            stroke={isDark ? "#ffffff" : "#000000"}
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* CONTENUTO */}
                <div className="max-w-3xl relative z-10">
                    <h2 className={`text-4xl sm:text-5xl font-semibold leading-12 sm:leading-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                        I problemi non sono isolati.
                        <br/>
                        <span className="text-[#BD1E1E]">
                            C'è sempre un filo conduttore.
                        </span>
                    </h2>

                    <p className={`mt-6 text-lg ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                        Nella maggior parte delle PMI...
                    </p>
                </div>
            </div>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {problemi.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                        transition={{ delay: index * 0.15 }} // effetto cascade
                    >
                        <GlassCard
                            theme={theme}
                            className={`p-8 ${isDark
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-white/80 border-neutral-300 text-neutral-900"
                            }`}
                        >
                            <h3 className="text-lg font-medium mb-4">{item.title}</h3>
                            <p className="text-sm leading-relaxed">{item.text}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </SectionBase>
    );
}