import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
    }),
};

export function Footer() {
    return (
        <footer className="relative bg-[#111110] text-slate-400 border-t border-stone-800/20 overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:28px_28px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-5 bg-amber-600" />
            </div>

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
                        <div>
                            <h3 className="text-white text-lg font-semibold tracking-tight">
                                TechBridgeGroup
                                <span className="text-amber-600">.</span>
                            </h3>
                            <p className="text-xs text-slate-600 mt-0.5 uppercase tracking-widest">
                                Digital Consulting
                            </p>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                            Soluzioni digitali progettate per trasformare
                            dati, processi e decisioni in vantaggio competitivo.
                        </p>

                        {/* Contact inline */}
                        <div className="flex flex-col gap-2.5 text-sm">
                            <a
                                href="mailto:service@techbridgegroup.it"
                                className="flex items-center gap-2.5 text-slate-500 hover:text-amber-500 transition-colors duration-200"
                            >
                                <Mail size={14} className="shrink-0" />
                                service@techbridgegroup.it
                            </a>
                            <span className="flex items-center gap-2.5 text-slate-500">
                                <Phone size={14} className="shrink-0" />
                                +39 331 5338917
                            </span>
                            <span className="flex items-center gap-2.5 text-slate-500">
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
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest">
                            Piattaforma
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/survey/start", label: "Analisi" },
                                { to: "/register", label: "Registrati" },
                                { to: "/login", label: "Accedi" },
                                { to: "/careers", label: "Careers" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="corp-link text-sm text-slate-500 hover:text-slate-200 w-fit"
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
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest">
                            Legale
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {[
                                { to: "/privacy", label: "Privacy Policy" },
                                { to: "/terms", label: "Termini di servizio" },
                                { to: "/cookies", label: "Cookie Policy" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="corp-link text-sm text-slate-500 hover:text-slate-200 w-fit"
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
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest">
                            Inizia ora
                        </h4>
                        <Link
                            to="/survey/start"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors duration-200"
                        >
                            Avvia l'analisi
                            <ArrowUpRight size={14} />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-200 transition-colors duration-200"
                        >
                            Contattaci
                            <ArrowUpRight size={14} />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom strip */}
                <div className="border-t border-stone-800/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-700">
                        © {new Date().getFullYear()} TechBridgeGroup — Tutti i diritti riservati
                    </span>
                    <span className="text-xs text-slate-700">
                        P.IVA 00000000000
                    </span>
                </div>
            </div>
        </footer>
    );
}
