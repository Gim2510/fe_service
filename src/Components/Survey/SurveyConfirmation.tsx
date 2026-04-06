import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";
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

    const handleCancelModal = () => setShowLeavePageModal(false);

    return (
        <main className="relative overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[80px] pointer-events-none" />
            <div className="absolute -top-40 -left-40 sm:-top-60 sm:-left-60 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-500/20 blur-3xl opacity-30" />
            <div className="absolute -bottom-40 -right-40 sm:-bottom-60 sm:-right-60 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-red-400/20 blur-3xl opacity-30" />

            {/* CONTENT */}
            <section
                className={`relative z-10 mx-auto max-w-full sm:max-w-3xl px-4 sm:px-8 py-16 sm:py-32 text-center ${
                    isDark ? "bg-white/5" : "bg-primary-white"
                } backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl space-y-10`}
            >

                {/* ICON */}
                <div
                    className={`mx-auto w-24 h-24 flex items-center justify-center rounded-full backdrop-blur-lg ring-2 text-6xl font-bold animate-pulse ${
                        consultationBooked
                            ? "text-green-500 bg-white/10 ring-white/20"
                            : "text-amber-500 bg-white/10 ring-white/20"
                    }`}
                >
                    {consultationBooked ? "✓" : "!"}
                </div>

                {/* 2-STEP FLOW */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 text-sm">
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        1. Questionario
                    </div>
                    <div className="w-6 h-px bg-white/20" />
                    <div
                        className={`px-3 py-1 rounded-full border transition ${
                            consultationBooked
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-white/5 text-white/40 border-white/10"
                        }`}
                    >
                        2. Consulenza
                    </div>
                </div>

                {/* TITLE */}
                <h2 className={`text-4xl md:text-5xl font-semibold leading-tight ${isDark ? "text-white" : "text-black"}`}>
                    Grazie per aver completato il questionario
                </h2>

                {/* DESCRIPTION */}
                <div className={`space-y-4 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    <p>
                        Le tue risposte sono state registrate con successo. Il prossimo step è una{" "}
                        <strong>consulenza gratuita 1:1</strong> per analizzare insieme il tuo questionario.
                    </p>
                    <p>
                        Durante la call verrà effettuata una valutazione mirata delle tue esigenze e, se necessario,
                        potrà essere elaborato un <strong>preventivo personalizzato</strong> sulle soluzioni più adatte.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 items-center">
                    <LiquidGlassButton onClick={handleViewNextStep} variant="navbar" className="flex-1">
                        Vai allo step successivo
                    </LiquidGlassButton>

                    {!consultationBooked && (
                        <LiquidGlassButton onClick={handleBookAppointment} variant="navbar" fillBackground="main" className="flex-1">
                            Prenota consulenza gratuita
                        </LiquidGlassButton>
                    )}
                </div>

                {/* MODAL */}
                {showLeavePageModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
                        <div className={`rounded-xl p-6 sm:p-8 max-w-full w-full sm:max-w-lg space-y-6 ${isDark ? "bg-black/40" : "bg-white/70"}`}>
                            <h3 className="text-2xl font-semibold text-black dark:text-white">
                                Consulenza non ancora prenotata
                            </h3>
                            <p className="text-black/80 dark:text-white/80">
                                Ti consigliamo di prenotare una consulenza gratuita 1:1 prima di procedere.
                                Questo ci permette di analizzare correttamente il tuo questionario
                                e preparare, se necessario, un preventivo su misura.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-end gap-4">
                                <LiquidGlassButton variant="navbar" scale={false} onClick={handleCancelModal}>
                                    Annulla
                                </LiquidGlassButton>
                                <LiquidGlassButton variant="navbar" fillBackground="main" scale={false} onClick={handleProceedAnyway}>
                                    Procedi comunque
                                </LiquidGlassButton>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}