import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";

export function PaymentCancel() {
    const navigate = useNavigate();

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#111110] px-6">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='%230EA5E9' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "40px 40px" }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full blur-[140px] opacity-[0.05] bg-red-500 pointer-events-none" />

            <motion.div
                className="relative z-10 w-full max-w-md text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="rounded-2xl border border-stone-800/20 bg-[#1C1C1A]/80 backdrop-blur-xl p-10 flex flex-col items-center gap-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <XCircle size={32} className="text-red-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-slate-100">Pagamento annullato</h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Il pagamento non è stato completato. Nessun importo è stato addebitato.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-stone-800/30 text-slate-300 hover:text-white hover:border-sky-800/40 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Torna alla Home
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
