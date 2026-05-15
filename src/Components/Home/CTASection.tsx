import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const PARTICLE_COUNT = 22;

function FloatingParticles({ isDark }: { isDark: boolean }) {
    const particles = useMemo(() =>
        Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2.5,
            duration: 6 + Math.random() * 10,
            delay: Math.random() * 8,
            opacity: 0.08 + Math.random() * 0.18,
        })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${isDark ? "bg-sky-500" : "bg-sky-600"}`}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -28, 0],
                        x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                        opacity: [p.opacity, p.opacity * 2.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function CTASection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");

    return (
        <section className="relative overflow-hidden">
            {/* Corporate gradient background */}
            <div className={`absolute inset-0 ${
                isDark
                    ? "bg-gradient-to-br from-[#0C0C0B] via-[#161410] to-[#0C0C0B]"
                    : "bg-gradient-to-br from-[#FDFAF4] via-[#F2E8D5] to-[#FDFAF4]"
            }`} />

            {/* Floating particles */}
            <FloatingParticles isDark={isDark} />

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {isDark && (
                    <>
                        {/* Blue gradient accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-stone-800/30 via-transparent to-stone-800/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] opacity-10 bg-sky-600" />
                        {/* Top border glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-800/60 to-transparent" />
                    </>
                )}
                {!isDark && (
                    <>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-sky-300" />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                    </>
                )}
            </div>

            <div className="relative mx-auto max-w-4xl px-6 sm:px-8 py-28 sm:py-36 text-center flex flex-col items-center">

                {/* Badge */}
                <motion.span
                    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-8 ${
                        isDark
                            ? "text-sky-500 border-stone-700/40 bg-stone-800/20"
                            : "text-sky-800 border-sky-300 bg-sky-50"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                    Assessment gratuito
                </motion.span>

                {/* Headline */}
                <motion.h2
                    className={`font-fjalla text-4xl md:text-5xl font-semibold leading-tight max-w-3xl ${
                        isDark ? "text-slate-100" : "text-stone-900"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    Scopri esattamente dove la tua azienda{" "}
                    <span className={isDark ? "text-sky-500" : "text-sky-700"}>
                        perde efficienza — e come recuperarla.
                    </span>
                </motion.h2>

                {/* Sub */}
                <motion.p
                    className={`mt-6 text-lg leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-stone-600"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    In 10 minuti ottieni un report personalizzato sul livello di maturità digitale della tua azienda: punti critici, opportunità prioritarie e un piano d'azione concreto.
                </motion.p>

                {/* Micro-benefits */}
                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                >
                    {["Report personalizzato incluso", "Nessun impegno o costo", "Piano d'azione concreto"].map((item) => (
                        <span
                            key={item}
                            className={`flex items-center gap-1.5 text-sm ${
                                isDark ? "text-slate-500" : "text-stone-500"
                            }`}
                        >
                            <CheckCircle size={13} className={isDark ? "text-sky-700" : "text-sky-600"} />
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
                                ? "bg-sky-700 hover:bg-sky-600 text-white shadow-stone-800/40 hover:shadow-stone-800/60"
                                : "bg-[#F8FAFB] hover:bg-sky-50 text-sky-800 shadow-stone-800/20 hover:shadow-stone-800/30"
                            }
                        `}
                    >
                        Ottieni il tuo report gratuito
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </button>
                </motion.div>

                {/* Trust note */}
                <motion.p
                    className={`mt-5 flex items-center gap-1.5 text-xs ${
                        isDark ? "text-slate-600" : "text-stone-400"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <Clock size={11} />
                    10–15 minuti • report personalizzato • nessuna carta di credito
                </motion.p>
            </div>
        </section>
    );
}
