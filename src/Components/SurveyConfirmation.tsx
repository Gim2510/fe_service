import { useGenerateSurveyReport } from "../hooks/useGenerateReport.ts";
import { useNavigate } from "react-router-dom";
import { LiquidGlassButton } from "./Buttons/LiquidGlassButton.tsx";

type Props = {
    surveyId: string;
};

export function SurveyConfirmation({ surveyId }: Props) {
    const { generateReport, loading, error, success } =
        useGenerateSurveyReport(surveyId);
    const navigate = useNavigate();

    const handleGenerateSurveyReport = async () => {
        await generateReport();
    };

    const handleBookAppointment = () => {
        window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
        navigate("/survey");
    };

    return (
        <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center rounded-2xl overflow-hidden">

            {/* Background soft radial blur + subtle dots */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[80px] pointer-events-none" />
            <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-500/20 blur-3xl opacity-30" />
            <div className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-red-400/20 blur-3xl opacity-30" />

            {/* Content container */}
            <section className="relative z-10 max-w-3xl text-center px-8 sm:py-32 py-16 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl space-y-10">

                {/* Success Icon */}
                <div className="mx-auto text-white w-24 h-24 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg ring-2 ring-white/20 text-6xl font-bold animate-pulse">
                    ✓
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                    Grazie per aver completato il questionario
                </h2>

                {/* Description */}
                <div className="space-y-4 text-neutral-300">
                    <p>
                        Le tue risposte sono state raccolte con successo. Ora verranno
                        analizzate attraverso modelli avanzati di sintesi e interpretazione.
                    </p>
                    <p>
                        L’utilizzo di tecnologie di analisi automatizzata ci consente di
                        individuare insight in modo rapido e consistente.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
                    <LiquidGlassButton
                        onClick={handleGenerateSurveyReport}
                        disabled={loading || success}
                        color_text="white"
                        className="flex-1"
                    >
                        {loading
                            ? "Generazione report in corso…"
                            : success
                                ? "Report richiesto con successo"
                                : "Genera il report"}
                    </LiquidGlassButton>

                    {success && (
                        <LiquidGlassButton
                            onClick={handleBookAppointment}
                            color_text="white"
                            className="flex-1"
                        >
                            Prenota una consulenza
                        </LiquidGlassButton>
                    )}
                </div>

                {/* Feedback messages */}
                {error && (
                    <p className="text-sm text-red-500 pt-4">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-neutral-400 pt-4">
                        Riceverai il report via email non appena l’analisi sarà completata.
                    </p>
                )}
            </section>
        </main>
    );
}