import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext.tsx";
import type { ReactNode } from "react";

export function ContactPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <main className={`relative min-h-screen flex items-center overflow-hidden ${
            isDark ? "bg-[#111110]" : "bg-[#E8EDF3]"
        }`}>
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />
                {isDark && (
                    <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05] bg-amber-700" />
                )}
            </div>

            <div className={`relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center ${
                isDark ? "text-white" : "text-slate-900"
            }`}>

                {/* Left copy */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                        Contatti
                    </span>
                    <h1 className={`font-fjalla text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Parliamo del tuo
                        <span className="block text-amber-600 mt-1">prossimo passo digitale.</span>
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-md ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Se hai domande, vuoi approfondire una soluzione o capire
                        come possiamo aiutarti, scrivici. Ti risponderemo il prima possibile.
                    </p>
                    <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Risposta media: entro 24 ore
                    </p>
                </motion.div>

                {/* Contact card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                >
                    <div className={`rounded-2xl border p-8 sm:p-10 flex flex-col gap-5 ${
                        isDark
                            ? "bg-[#1C1C1A]/80 border-stone-800/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                            : "bg-[#F8FAFB] border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                    }`}>
                        <h2 className={`text-xl font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            I nostri riferimenti
                        </h2>

                        <ContactItem isDark={isDark} icon={<Mail size={16} />} label="Email" value="service@techbridgegroup.it"
                            href="mailto:service@techbridgegroup.it" />
                        <ContactItem isDark={isDark} icon={<Phone size={16} />} label="Telefono" value="+39 331 5338917" />
                        <ContactItem isDark={isDark} icon={<MapPin size={16} />} label="Sede" value="Milano, Italia" />

                        <a
                            href="mailto:service@techbridgegroup.it"
                            className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                                transition-colors duration-200 shadow-lg shadow-amber-700/20 self-start"
                        >
                            Scrivici ora
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

function ContactItem({ icon, label, value, href, isDark }: {
    icon: ReactNode; label: string; value: string; href?: string; isDark: boolean;
}) {
    return (
        <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors duration-200 ${
            isDark
                ? "bg-[#F8FAFB]/3 border-stone-800/20 hover:border-stone-700/30"
                : "bg-[#EDF2F7] border-slate-200 hover:border-amber-400"
        }`}>
            <div className={`mt-0.5 ${isDark ? "text-amber-500" : "text-amber-600"}`}>{icon}</div>
            <div className="flex flex-col gap-0.5">
                <span className={`text-xs font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {label}
                </span>
                {href ? (
                    <a href={href} className={`text-sm font-medium transition-colors ${
                        isDark ? "text-slate-200 hover:text-amber-500" : "text-slate-800 hover:text-amber-700"
                    }`}>{value}</a>
                ) : (
                    <span className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>{value}</span>
                )}
            </div>
        </div>
    );
}
