// MetodSection.tsx
import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";
import { motion } from "framer-motion"; // <-- import motion

export function MetodSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const steps = [
        { step: "01", title: "Analisi", text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento." },
        { step: "02", title: "Progettazione", text: "Definiamo un’architettura solida, sostenibile e allineata agli obiettivi di business." },
        { step: "03", title: "Implementazione", text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili." }
    ];

    // Variants per animazione
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <SectionBase theme={theme}>
            <div className="max-w-3xl mb-24 text-center sm:text-start">
                <span className={`text-sm uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-600"} `}>
                    Metodo
                </span>
                <h2 className={`${isDark ? "text-white" : "text-neutral-900"} text-4xl sm:text-5xl font-semibold mt-1 text-center sm:text-start leading-12 sm:leading-tight`}>
                    Un approccio strutturato
                    <br />
                    <span className={`${isDark ? "text-[#BD1E1E]" : "text-[#BD1E1E]"}`}>
                        orientato ai risultati concreti.
                    </span>
                </h2>
                <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} mt-6 text-lg text-center sm:text-start`}>
                    Ogni progetto segue...
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((item, index) => (
                    <motion.div
                        key={item.step}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }} // cascade
                    >
                        <GlassCard
                            theme={theme}
                            className={`p-10 ${isDark ? "" : "bg-white border-black/10"}`}
                        >
                            <div className={`${isDark ? "text-white/10" : "text-black/30"} text-5xl font-semibold mb-6`}>
                                {item.step}
                            </div>
                            <h3 className={`${isDark ? "text-white" : "text-neutral-900"} text-xl font-medium mb-4`}>
                                {item.title}
                            </h3>
                            <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} text-sm leading-relaxed`}>
                                {item.text}
                            </p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </SectionBase>
    );
}