import { useGenerateSurveyReport } from "../hooks/useGenerateReport.ts";
import { useNavigate } from "react-router-dom";
import { LiquidGlassButton } from "./Buttons/LiquidGlassButton.tsx";
import {FallingLines} from "react-loader-spinner";
import {useTheme} from "../Context/ThemeContext.tsx";

type Props = {
    surveyId: string;
};

export function SurveyConfirmation({ surveyId }: Props) {
    const {theme} = useTheme()
    const isDark = theme === "dark";
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
        <main className={`relative min-h-screen ${isDark ? "bg-neutral-950" : "bg-white"} flex items-center justify-center rounded-3xl overflow-hidden`}>

            {/* Background soft radial blur + subtle dots */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[80px] pointer-events-none" />
            <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-500/20 blur-3xl opacity-30" />
            <div className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-red-400/20 blur-3xl opacity-30" />

            {/* Content container */}
            <section className={`relative z-10 max-w-3xl text-center px-8 sm:py-32 py-16 ${isDark ? "bg-white/5" : "bg-primary-white"} backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl space-y-10`}>

                {/* Success Icon */}
                <div className={`mx-auto ${isDark ? "text-white ring-white/20 bg-white/10" : "text-green-600 ring-black/50 bg-white"} w-24 h-24 flex items-center justify-center rounded-full backdrop-blur-lg ring-2 text-6xl font-bold animate-pulse`}>
                    ✓
                </div>

                <div className={`${isDark ? "text-white" : "text-black"} tracking-[8px]`}>
                    <p><span className='text-xl font-semibold'>1</span> <span>•••••••••••••••••</span> <span className={` font-semibold ${success ? "text-xl" : "text-3xl"}`}>2</span> <span>•••••••••••••••••</span> <span className={`${success ? "text-3xl" : "text-xl"} font-semibold`}>3</span></p>
                </div>

                {/* Heading */}
                <h2 className={`text-4xl md:text-5xl font-semibold ${isDark ? "text-white" : "text-black"} leading-tight`}>
                    Grazie per aver completato il questionario
                </h2>

                {/* Description */}
                <div className={`space-y-4 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
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
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 items-center">
                    <LiquidGlassButton
                        onClick={() => success ? window.location.reload() : handleGenerateSurveyReport()}
                        disabled={loading || success}
                        className={`flex-1 ${isDark ? "" : "bg-white"}`}
                    >
                        {loading
                            ? <FallingLines
                                color={isDark? "#fff" : "#000"}
                                width="50"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                            />
                            : success
                                ? "guarda i risultati"
                                : "Genera il report"}
                    </LiquidGlassButton>

                    {success && (
                        <LiquidGlassButton
                            onClick={handleBookAppointment}
                            className={`flex-1 ${isDark ? "" : "bg-white"}`}
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