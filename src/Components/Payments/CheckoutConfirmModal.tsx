import { motion, AnimatePresence } from "framer-motion";
import { FallingLines } from "react-loader-spinner";
import { X, CreditCard, ShieldCheck } from "lucide-react";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
    variant?: string;
};

export function CheckoutConfirmModal({ open, onConfirm, onCancel, loading, variant }: Props) {
    const isDark = variant !== "light";

    const card = isDark
        ? "bg-[#1C1C1A] border-stone-800/30"
        : "bg-[#F8FAFB] border-slate-200";

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={loading ? undefined : onCancel}
                    />

                    <motion.div
                        className={`relative z-10 w-full max-w-md rounded-2xl border p-8 space-y-6 ${card}`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                    >
                        {/* Close */}
                        <button
                            onClick={loading ? undefined : onCancel}
                            className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                                ${isDark ? "text-slate-500 hover:text-slate-300 hover:bg-[#F8FAFB]/5" : "text-slate-400 hover:text-slate-700 hover:bg-[#EDF2F7]"}`}
                        >
                            <X size={16} />
                        </button>

                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                            ${isDark ? "bg-emerald-700/15 border border-emerald-700/20" : "bg-emerald-50 border border-emerald-300"}`}>
                            <CreditCard size={20} className="text-emerald-600" />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                Conferma attivazione Premium
                            </h2>
                            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                Verrai reindirizzato alla pagina di pagamento sicura gestita da Stripe
                                per completare l'abbonamento mensile da <strong className={isDark ? "text-slate-200" : "text-slate-800"}>15€</strong>.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onCancel}
                                disabled={loading}
                                className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                    disabled:opacity-40
                                    ${isDark
                                        ? "border-stone-800/30 text-slate-400 hover:text-slate-200"
                                        : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                    }`}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600
                                    disabled:opacity-40 text-white text-sm font-semibold transition-colors
                                    shadow-lg shadow-emerald-700/25"
                            >
                                {loading
                                    ? <span className="flex justify-center"><FallingLines color="#fff" width="20" visible /></span>
                                    : "Procedi al pagamento"
                                }
                            </button>
                        </div>

                        {/* Trust */}
                        <p className={`flex items-center justify-center gap-1.5 text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            <ShieldCheck size={12} className="text-emerald-600" />
                            Pagamento sicuro · Nessun vincolo annuale · Disattiva quando vuoi
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
