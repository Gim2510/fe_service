import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    theme: string;
};

export function LogoutConfirmModal({ open, onConfirm, onCancel, theme }: Props) {
    const isDark = theme === "dark";

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className={`absolute inset-0 ${isDark ? "bg-black/75" : "bg-slate-900/40"} backdrop-blur-md`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <motion.div
                        className={`relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl border ${
                            isDark
                                ? "bg-[#1C1C1A] border-stone-800/30 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
                                : "bg-[#F8FAFB] border-slate-200 shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
                        }`}
                        initial={{ opacity: 0, scale: 0.94, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
                            isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-100"
                        }`}>
                            <LogOut size={18} className="text-red-500" />
                        </div>

                        <h2 className={`text-lg font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Conferma logout
                        </h2>
                        <p className={`text-sm leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            Verrai disconnesso dalla piattaforma e dovrai effettuare nuovamente l'accesso.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onCancel}
                                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                    isDark
                                        ? "border-stone-800/30 text-slate-300 hover:bg-[#F8FAFB]/5 hover:border-stone-700/40"
                                        : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                }`}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium
                                    bg-red-600 hover:bg-red-500 text-white
                                    transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
