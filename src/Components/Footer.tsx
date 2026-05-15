import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "./Badge.tsx";
import type { Theme } from "../types/InputTypes.ts";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
    }),
};

export function Footer({ theme }: { theme: Theme }) {
    const isDark = theme === "dark";

    return (
        <footer className={`relative overflow-hidden ${
            isDark
                ? "bg-[#111110] text-slate-400 border-t border-stone-800/20"
                : "bg-gradient-to-b from-[#FAF8F4] to-[#F0EAE0] text-stone-500 border-t border-sky-200/60"
        }`}>

            {/* Top glow line */}
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />
            )}
            {!isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
            )}

            <div className="relative mx-auto max-w-7xl px-8 pt-20 pb-12">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand — spans 4 cols */}
                    <motion.div
                        className="md:col-span-4 flex flex-col gap-5"
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <div className="flex items-center gap-3">
                            {/* Mark */}
                            <div className={`w-16 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                                isDark ? "bg-[rgba(201,168,76,0.10)] border-[rgba(201,168,76,0.35)]" : "bg-[rgba(201,168,76,0.12)] border-[rgba(201,168,76,0.4)]"
                            }`}>
                                <img src="/logoicon.png" alt="AxiomLab" className="w-12 h-7 object-contain"/>
                            </div>
                            <div>
                                <h3 className={`text-base font-bold tracking-tight leading-none ${isDark ? "text-white" : "text-stone-900"}`}>
                                    Axiom<span className="text-sky-600">Lab</span>
                                </h3>
                                <p className={`text-xs mt-1 uppercase tracking-widest ${isDark ? "text-slate-600" : "text-stone-400"}`}>
                                    Digital Consulting
                                </p>
                            </div>
                        </div>

                        <p className={`text-sm leading-relaxed max-w-xs ${isDark ? "text-slate-500" : "text-stone-500"}`}>
                            Soluzioni digitali progettate per trasformare
                            dati, processi e decisioni in vantaggio competitivo.
                        </p>

                        {/* Contact inline */}
                        <div className="flex flex-col gap-2.5 text-sm">
                            <a
                                href="mailto:service@axiomlab.it"
                                className={`flex items-center gap-2.5 transition-all duration-200 ${
                                    isDark ? "text-slate-500 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]" : "text-stone-500 hover:text-sky-700"
                                }`}
                            >
                                <Mail size={14} className="shrink-0" />
                                service@axiomlab.it
                            </a>
                            <span className={`flex items-center gap-2.5 ${isDark ? "text-slate-500" : "text-stone-500"}`}>
                                <Phone size={14} className="shrink-0" />
                                +39 331 5338917
                            </span>
                            <span className={`flex items-center gap-2.5 ${isDark ? "text-slate-500" : "text-stone-500"}`}>
                                <MapPin size={14} className="shrink-0" />
                                Milano, Italia
                            </span>
                        </div>
                    </motion.div>

                    {/* Spacer */}
                    <div className="hidden md:block md:col-span-2" />

                    {/* Navigation */}
                    <motion.div
                        className="md:col-span-2 flex flex-col gap-4"
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <Badge label="Piattaforma" color="sky" theme={theme} pulse={false} />
                        <nav className="flex flex-col gap-2.5">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/about", label: "Chi siamo" },
                                { to: "/survey/start", label: "Analisi" },
                                { to: "/register", label: "Registrati" },
                                { to: "/login", label: "Accedi" },
                                { to: "/careers", label: "Careers" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`text-sm w-fit transition-all duration-200 ${
                                        isDark
                                            ? "text-slate-500 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                                            : "text-stone-500 hover:text-sky-700"
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        className="md:col-span-2 flex flex-col gap-4"
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <Badge label="Legale" color="violet" theme={theme} pulse={false} />
                        <nav className="flex flex-col gap-2.5">
                            {[
                                { to: "/privacy", label: "Privacy Policy" },
                                { to: "/terms", label: "Termini di servizio" },
                                { to: "/cookies", label: "Cookie Policy" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`text-sm w-fit transition-all duration-200 ${
                                        isDark
                                            ? "text-slate-500 hover:text-violet-400 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]"
                                            : "text-stone-500 hover:text-violet-700"
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* CTA column */}
                    <motion.div
                        className="md:col-span-2 flex flex-col gap-4"
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <Badge label="Inizia ora" color="emerald" theme={theme} pulse={false} />
                        <Link
                            to="/survey/start"
                            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                                isDark ? "text-sky-500 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]" : "text-sky-700 hover:text-sky-600"
                            }`}
                        >
                            Avvia l'analisi
                            <ArrowUpRight size={14} />
                        </Link>
                        <Link
                            to="/contact"
                            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                                isDark ? "text-slate-500 hover:text-slate-200" : "text-stone-500 hover:text-stone-800"
                            }`}
                        >
                            Contattaci
                            <ArrowUpRight size={14} />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom strip */}
                <div className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isDark ? "border-stone-800/20" : "border-sky-200/50"
                }`}>
                    <span className={`text-xs ${isDark ? "text-slate-700" : "text-stone-400"}`}>
                        © {new Date().getFullYear()} AxiomLab — Tutti i diritti riservati
                    </span>
                    <span className={`text-xs ${isDark ? "text-slate-700" : "text-stone-400"}`}>
                        P.IVA 00000000000
                    </span>
                </div>
            </div>
        </footer>
    );
}
