import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { usePremium } from "../../Context/PremiumContext.tsx";
import { useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";

export function PaymentSuccess() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { refreshPremium } = usePremium();
    const isDark = theme === "dark";

    useEffect(() => { refreshPremium(); }, []);

    return (
        <main className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${isDark ? "bg-[#060D1B]" : "bg-[#F8FAFC]"}`}>
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.06] bg-green-500" />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={`rounded-2xl border p-10 flex flex-col items-center gap-6 ${
                    isDark
                        ? "bg-[#0D1A30]/80 border-blue-900/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                        : "bg-white border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                }`}>
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle size={32} className="text-green-400" />
                    </div>

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
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Vai alla Dashboard
                        <ArrowRight size={14} />
                    </button>

                    <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Riceverai una email di conferma con i dettagli dell'abbonamento.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
