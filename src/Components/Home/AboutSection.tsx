import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionBase } from "./SectionBase.tsx";
import { useNavigate } from "react-router-dom";

const stats = [
    { value: "47+",    label: "PMI seguite"         },
    { value: "12",     label: "Settori presidiati"   },
    { value: "€4.1M",  label: "Margine recuperato"   },
    { value: "96%",    label: "Clienti fidelizzati"  },
];

export function AboutSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <span className={`text-xs font-semibold uppercase tracking-widest ${
                            isDark ? "text-amber-500" : "text-amber-700"
                        }`}>
                            Chi siamo
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Nati per colmare il gap
                            <span className={`block mt-1 ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                                tra enterprise e PMI.
                            </span>
                        </h2>
                    </div>

                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        TechBridgeGroup nasce da una constatazione precisa: le PMI italiane affrontano
                        gli stessi problemi operativi delle grandi aziende, ma non hanno accesso alle
                        stesse soluzioni. Metodologie enterprise rigide, costi proibitivi, consulenti
                        che spariscono dopo la consegna.
                    </p>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        La nostra risposta è un modello diverso: diagnosi reale dei processi,
                        soluzioni progettate sul contesto specifico, tecnologie scalabili — e un
                        affiancamento che non finisce con l'implementazione.
                    </p>

                    <button
                        onClick={() => navigate("/about")}
                        className={`inline-flex items-center gap-2 text-sm font-semibold w-fit transition-all duration-200 hover:-translate-y-0.5 group ${
                            isDark ? "text-amber-500 hover:text-amber-400" : "text-amber-700 hover:text-amber-600"
                        }`}
                    >
                        Scopri la nostra storia
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </motion.div>

                {/* Stats grid */}
                <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            className={`rounded-2xl border p-6 flex flex-col gap-2 ${
                                isDark
                                    ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-amber-800/30"
                                    : "bg-white border-slate-200 hover:border-amber-400"
                            } transition-colors duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                        >
                            <span className={`text-3xl font-bold tracking-tight font-fjalla ${
                                isDark ? "text-amber-500" : "text-amber-700"
                            }`}>
                                {s.value}
                            </span>
                            <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionBase>
    );
}
