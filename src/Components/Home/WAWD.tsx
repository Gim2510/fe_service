import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";

const punti = [
    "CRM e sistemi di vendita su misura",
    "Automazione dei processi operativi",
    "Integrazione tra software esistenti",
    "Analisi dati e reporting decisionale",
    "Intelligenza artificiale applicata",
    "Scalabilità e manutenzione nel tempo",
];

export function WAWD({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Image card */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <GlassCard theme={theme} hover={false} className="overflow-hidden">
                        <div className="aspect-[4/3] bg-center bg-cover bg-[url(/bgContainer.png)] rounded-2xl" />
                    </GlassCard>
                </motion.div>

                {/* Text content */}
                <motion.div
                    className="flex flex-col gap-7"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    <div>
                        <span className={`text-xs font-semibold uppercase tracking-widest ${
                            isDark ? "text-amber-500" : "text-amber-700"
                        }`}>
                            Cosa facciamo
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Soluzioni digitali progettate intorno ai tuoi processi reali
                        </h2>
                        <p className={`mt-4 text-base leading-relaxed ${
                            isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
                            Ogni azienda ha flussi unici. Costruiamo strumenti che si adattano
                            a come lavori davvero, non il contrario.
                        </p>
                    </div>

                    {/* Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {punti.map((item, i) => (
                            <motion.div
                                key={item}
                                className={`flex items-start gap-3 text-sm ${
                                    isDark ? "text-slate-400" : "text-slate-600"
                                }`}
                                initial={{ opacity: 0, x: 12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                            >
                                <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionBase>
    );
}
