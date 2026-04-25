import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, ArrowRight, AlertCircle, X } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";

export function SurveyConfirmation({ survey_id }: { survey_id: string }) {
    const [consultationBooked, setConsultationBooked] = useState(false);
    const [showLeavePageModal, setShowLeavePageModal] = useState(false);

    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const handleBookAppointment = () => {
        setConsultationBooked(true);
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
    };

    const handleViewNextStep = () => {
        if (!consultationBooked) setShowLeavePageModal(true);
        else navigate(`/survey/${survey_id}/recap`);
    };

    const handleProceedAnyway = () => {
        setShowLeavePageModal(false);
        navigate(`/survey/${survey_id}/recap`);
    };

    const card = isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200";

    return (
        <div className="flex flex-col items-center gap-8 text-center">
            {/* Status icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" as const }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center
                    ${consultationBooked
                        ? isDark ? "bg-green-500/15 border border-green-500/30" : "bg-green-50 border border-green-200"
                        : isDark ? "bg-blue-600/15 border border-blue-600/20" : "bg-blue-50 border border-blue-200"
                    }`}
            >
                <CheckCircle size={28} className={consultationBooked ? "text-green-400" : "text-blue-500"} />
            </motion.div>

            {/* Step badges */}
            <div className="flex items-center gap-3 text-xs font-medium">
                <span className={`px-3 py-1.5 rounded-full
                    ${isDark ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-green-50 text-green-600 border border-green-200"}`}>
                    1. Questionario
                </span>
                <span className={`w-6 h-px ${isDark ? "bg-blue-900/40" : "bg-slate-200"}`} />
                <span className={`px-3 py-1.5 rounded-full transition-colors duration-300
                    ${consultationBooked
                        ? isDark ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-green-50 text-green-600 border border-green-200"
                        : isDark ? "bg-[#0D1A30] text-slate-500 border border-blue-900/20" : "bg-slate-50 text-slate-400 border border-slate-200"
                    }`}>
                    2. Consulenza
                </span>
            </div>

            {/* Title */}
            <div className="space-y-3 max-w-lg">
                <h2 className={`text-3xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Grazie per aver completato il questionario
                </h2>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Le tue risposte sono state registrate. Il prossimo step è una{" "}
                    <strong className={isDark ? "text-slate-200" : "text-slate-800"}>consulenza gratuita 1:1</strong>{" "}
                    per analizzare insieme i risultati e preparare, se necessario, un preventivo personalizzato.
                </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <button
                    onClick={handleViewNextStep}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                        border text-sm font-medium transition-colors
                        ${isDark
                            ? "border-blue-900/30 text-slate-300 hover:border-blue-700/40 hover:text-slate-100"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                >
                    Vai allo step successivo
                    <ArrowRight size={14} />
                </button>

                {!consultationBooked && (
                    <button
                        onClick={handleBookAppointment}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                            bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
                            transition-colors shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 duration-200"
                    >
                        <Calendar size={14} />
                        Prenota consulenza
                    </button>
                )}
            </div>

            {/* Leave page modal */}
            <AnimatePresence>
                {showLeavePageModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLeavePageModal(false)}
                        />
                        <motion.div
                            className={`relative z-10 w-full max-w-md rounded-2xl border p-8 space-y-5 ${card}`}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" as const }}
                        >
                            <button
                                onClick={() => setShowLeavePageModal(false)}
                                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                                    ${isDark ? "text-slate-500 hover:text-slate-300 hover:bg-white/5" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"}`}
                            >
                                <X size={16} />
                            </button>

                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl
                                ${isDark ? "bg-amber-500/15 border border-amber-500/30" : "bg-amber-50 border border-amber-200"}`}>
                                <AlertCircle size={22} className="text-amber-400" />
                            </div>

                            <div className="space-y-2">
                                <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Consulenza non ancora prenotata
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    Ti consigliamo di prenotare una consulenza gratuita 1:1 prima di procedere,
                                    per analizzare il questionario e preparare un preventivo su misura.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={() => setShowLeavePageModal(false)}
                                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                        ${isDark
                                            ? "border-blue-900/30 text-slate-400 hover:text-slate-200"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleProceedAnyway}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
                                        text-white text-sm font-semibold transition-colors"
                                >
                                    Procedi comunque
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
