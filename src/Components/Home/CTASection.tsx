import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTASection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");

    return (
        <section className="relative overflow-hidden">
            {/* Corporate gradient background */}
            <div className={`absolute inset-0 ${
                isDark
                    ? "bg-gradient-to-br from-[#060D1B] via-[#0A1628] to-[#060D1B]"
                    : "bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800"
            }`} />

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {isDark && (
                    <>
                        {/* Blue gradient accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] opacity-10 bg-blue-500" />
                        {/* Grid */}
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                backgroundSize: "28px 28px",
                            }}
                        />
                        {/* Top border glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-700/60 to-transparent" />
                    </>
                )}
                {!isDark && (
                    <>
                        {/* Subtle grid on light */}
                        <div
                            className="absolute inset-0 opacity-[0.08]"
                            style={{
                                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                backgroundSize: "28px 28px",
                            }}
                        />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-blue-400" />
                    </>
                )}
            </div>

            <div className="relative mx-auto max-w-4xl px-6 sm:px-8 py-28 sm:py-36 text-center flex flex-col items-center">

                {/* Badge */}
                <motion.span
                    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-8 ${
                        isDark
                            ? "text-blue-400 border-blue-800/40 bg-blue-900/20"
                            : "text-blue-100 border-white/20 bg-white/10"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Inizia oggi
                </motion.span>

                {/* Headline */}
                <motion.h2
                    className={`font-fjalla text-4xl md:text-5xl font-semibold leading-tight max-w-3xl ${
                        isDark ? "text-slate-100" : "text-white"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    Trasforma i tuoi processi in un{" "}
                    <span className={isDark ? "text-blue-400" : "text-blue-200"}>
                        vantaggio competitivo misurabile.
                    </span>
                </motion.h2>

                {/* Sub */}
                <motion.p
                    className={`mt-6 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-blue-100"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    In poche ore ottieni una valutazione strutturata del livello
                    di maturità digitale della tua azienda, con indicazioni concrete
                    sulle priorità di intervento.
                </motion.p>

                {/* Micro-benefits */}
                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                >
                    {["Analisi strutturata", "Nessun impegno", "Risultati immediati"].map((item) => (
                        <span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-blue-200"
                            }`}
                        >
                            <CheckCircle size={13} className={isDark ? "text-blue-600" : "text-blue-300"} />
                            {item}
                        </span>
                    ))}
                </motion.div>

                {/* CTA button */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.28 }}
                >
                    <button
                        onClick={goToSurvey}
                        className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                            text-sm font-semibold transition-all duration-200
                            shadow-xl hover:-translate-y-0.5
                            ${isDark
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 hover:shadow-blue-900/60"
                                : "bg-white hover:bg-blue-50 text-blue-700 shadow-blue-900/20 hover:shadow-blue-900/30"
                            }
                        `}
                    >
                        Avvia l'analisi strategica
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </button>
                </motion.div>

                {/* Trust note */}
                <motion.p
                    className={`mt-5 flex items-center gap-1.5 text-xs ${
                        isDark ? "text-slate-600" : "text-blue-300"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <Clock size={11} />
                    Tempo stimato: 3–5 minuti • registrazione richiesta
                </motion.p>
            </div>
        </section>
    );
}
