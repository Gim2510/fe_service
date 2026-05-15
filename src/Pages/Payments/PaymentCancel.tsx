import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { Badge } from "../../Components/Badge.tsx";

export function PaymentCancel() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    return (
        <main className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
            isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"
        }`}>
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full blur-[140px] opacity-[0.05] ${isDark ? "bg-red-500" : "bg-red-300"} pointer-events-none`} />

            <motion.div
                className="relative z-10 w-full max-w-md text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
                    isDark
                        ? "border-stone-800/20 bg-[#1C1C1A]/80 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                        : "border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
                }`}>
                    {isDark && <div className="h-[2px] w-full bg-red-700/60" />}

                    <div className="p-10 flex flex-col items-center gap-6">
                        <Badge label="Pagamento annullato" color="red" theme={theme} />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
                        >
                            <XCircle size={32} className="text-red-400" />
                        </motion.div>

                        <div>
                            <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Pagamento annullato</h2>
                            <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Il pagamento non è stato completato. Nessun importo è stato addebitato.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/")}
                            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 ${
                                isDark
                                    ? "border-stone-800/30 text-slate-300 hover:text-white hover:border-sky-800/40"
                                    : "border-slate-200 text-slate-600 hover:text-slate-800 hover:border-sky-300"
                            }`}
                        >
                            <ArrowLeft size={14} />
                            Torna alla Home
                        </button>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
