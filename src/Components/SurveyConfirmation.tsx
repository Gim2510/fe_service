import {useGenerateSurveyReport} from "../hooks/useGenerateReport.ts";

type Props = {
    surveyId: string
}

export function SurveyConfirmation({ surveyId }: Props) {
    const { generateReport, loading, error, success } =
        useGenerateSurveyReport(surveyId)

    return (
        <section className="max-w-2xl mx-auto text-center space-y-10">
            {/* Icon / Emotion anchor */}
            <div className="text-indigo-400 text-5xl">✓</div>

            {/* Headline */}
            <h2 className="text-3xl font-light text-slate-100">
                Grazie per aver completato il questionario
            </h2>

            {/* Explanation */}
            <p className="text-slate-400 leading-relaxed">
                Le tue risposte sono state raccolte con successo.
                Ora verranno analizzate attraverso modelli avanzati di sintesi e
                interpretazione, progettati per trasformare i dati in indicazioni
                chiare e utili a supporto delle decisioni.
            </p>

            <p className="text-slate-400 leading-relaxed">
                L’utilizzo di tecnologie di analisi automatizzata ci consente di
                individuare pattern e insight in modo rapido e consistente, senza
                sostituire il giudizio umano ma affiancandolo con uno strumento
                affidabile e trasparente.
            </p>

            {/* CTA */}
            <div className="pt-6">
                <button
                    onClick={generateReport}
                    disabled={loading || success}
                    className="
                        px-10 py-4 rounded-2xl
                        bg-indigo-500 text-white font-medium
                        hover:bg-indigo-400 transition
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                >
                    {loading
                        ? "Generazione report in corso…"
                        : success
                            ? "Report richiesto con successo"
                            : "Genera il report"}
                </button>
            </div>

            {/* Feedback */}
            {error && (
                <p className="text-sm text-red-400 pt-4">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-slate-500 pt-4">
                    Riceverai il report via email non appena l’analisi sarà completata.
                </p>
            )}
        </section>
    )
}
