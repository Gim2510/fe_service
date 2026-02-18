import { useGenerateSurveyReport } from "../hooks/useGenerateReport.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    surveyId: string;
};

export function SurveyConfirmation({ surveyId }: Props) {
    const { generateReport, loading, error, success } =
        useGenerateSurveyReport(surveyId);
    const navigate = useNavigate()

    const handleGenerateSurveyReport = async () => {
        await generateReport();
    };

    const handleBookAppointment = () => {
        window.open(
            import.meta.env.VITE_CALENDLY_URL,
            "_blank"
        );
        navigate('/survey')

    };

    return (
        <main className="relative bg-neutral-950 text-white min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <section className="relative z-10 max-w-3xl text-center px-8 py-32 space-y-10">
                <div className="text-[#FFD93D] text-6xl">✓</div>

                <h2 className="text-4xl font-semibold text-white">
                    Grazie per aver completato il questionario
                </h2>

                <p className="text-neutral-400 leading-relaxed">
                    Le tue risposte sono state raccolte con successo. Ora verranno
                    analizzate attraverso modelli avanzati di sintesi e interpretazione.
                </p>

                <p className="text-neutral-400 leading-relaxed">
                    L’utilizzo di tecnologie di analisi automatizzata ci consente di
                    individuare insight in modo rapido e consistente.
                </p>

                {/* CTA GENERA REPORT */}
                <div className="flex gap-3 w-full max-w-xl mx-auto">
                    <button
                        onClick={handleGenerateSurveyReport}
                        disabled={loading || success}
                        className="flex-1 group relative px-10 py-4 rounded-full bg-white text-black font-medium text-lg transition disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
        <span className="relative z-10">
            {loading
                ? "Generazione report in corso…"
                : success
                    ? "Report richiesto con successo"
                    : "Genera il report"}
        </span>
                        <span
                            className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform"/>
                    </button>

                    {success && (
                        <button
                            onClick={handleBookAppointment}
                            className="flex-1 group relative cursor-pointer px-10 py-4 rounded-full bg-white text-black font-medium text-lg transition overflow-hidden"
                        >
            <span className="relative z-10">
                Prenota una consulenza
            </span>
                            <span
                                className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform"/>
                        </button>
                    )}
                </div>

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
