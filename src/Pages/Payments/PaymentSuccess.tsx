import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { usePremium } from "../../Context/PremiumContext.tsx";
import { useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { Badge } from "../../Components/Badge.tsx";

export function PaymentSuccess() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { refreshPremium } = usePremium();
    const isDark = theme === "dark";

    useEffect(() => { refreshPremium(); }, []);

    return (
        <main className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='%230EA5E9' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "40px 40px" }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.06] bg-green-500" />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
                    isDark
                        ? "bg-[#1C1C1A]/80 border-stone-800/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)] shadow-green-700/10"
                        : "bg-[#F8FAFB] border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] shadow-green-700/5"
                }`}>
                    {isDark && <div className="h-[2px] w-full bg-green-700/60" />}

                    <div className="p-10 flex flex-col items-center gap-6">
                        <Badge label="Pagamento completato" color="green" theme={theme} />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                        >
                            <CheckCircle size={32} className="text-green-400" />
                        </motion.div>

                        <div>
                            <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                Benvenuto in Premium
                            </h2>
                            <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Il pagamento è stato completato con successo.
                                Ora hai accesso a tutte le funzionalità premium.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-700/20 hover:-translate-y-0.5 duration-200"
                        >
                            Vai alla Dashboard
                            <ArrowRight size={14} />
                        </button>

                        <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Riceverai una email di conferma con i dettagli dell'abbonamento.
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
