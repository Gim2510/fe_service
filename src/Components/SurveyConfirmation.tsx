import { useGenerateSurveyReport } from "../hooks/useGenerateReport.ts";

type Props = {
    surveyId: string;
};

export function SurveyConfirmation({ surveyId }: Props) {
    const { generateReport, loading, error, success } =
        useGenerateSurveyReport(surveyId);

    const handleGenerateSurveyReport = async () => {
        await generateReport();
        window.location.reload();
    };

    return (
        <main className="relative bg-neutral-950 text-white min-h-screen flex items-center justify-center">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <section className="relative z-10 max-w-3xl text-center px-8 py-32 space-y-10">
                {/* Icon / Emotion anchor */}
                <div className="text-[#FFD93D] text-6xl">✓</div>

                {/* Headline */}
                <h2 className="text-4xl font-semibold text-white">
                    Grazie per aver completato il questionario
                </h2>

                {/* Explanation */}
                <p className="text-neutral-400 leading-relaxed">
                    Le tue risposte sono state raccolte con successo. Ora verranno
                    analizzate attraverso modelli avanzati di sintesi e interpretazione,
                    progettati per trasformare i dati in indicazioni chiare e utili a
                    supporto delle decisioni.
                </p>

                <p className="text-neutral-400 leading-relaxed">
                    L’utilizzo di tecnologie di analisi automatizzata ci consente di
                    individuare pattern e insight in modo rapido e consistente, senza
                    sostituire il giudizio umano ma affiancandolo con uno strumento
                    affidabile e trasparente.
                </p>

                {/* CTA */}
                <div>
                    <button
                        onClick={handleGenerateSurveyReport}
                        disabled={loading || success}
                        className="group relative px-12 py-4 rounded-full hover:text-white cursor-pointer bg-white text-black font-medium text-lg transition disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
            <span className="relative z-10">
              {loading
                  ? "Generazione report in corso…"
                  : success
                      ? "Report richiesto con successo"
                      : "Genera il report"}
            </span>
                        <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>
                </div>

                {/* Feedback */}
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
