import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { useSurvey } from "../hooks/useSurvey";
import { useInitSurvey } from "../hooks/useInitSurvey";
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import { SurveyIntro } from "../Components/Survey/SurveyIntro.tsx";

export function SurveyStart() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { isAuthenticated, emailVer } = useAuth();

    const templateId = import.meta.env.VITE_SURVEY_TEMPLATE_ID;
    const locale: "it" = "it";

    const { surveyId, loading: loadingSurveyId } = useUserSurvey();
    const { survey, loading: loadingSurvey } = useSurvey(surveyId);
    const { initSurvey, loading: initLoading } = useInitSurvey();

    const handleStart = async () => {
        try {
            // Survey già esistente → vai al recap
            if (survey?._id) {
                navigate(`/survey/${survey._id}/recap`);
                return;
            }

            // Survey nuovo → inizializza e vai alle domande
            const newSurveyId = await initSurvey(templateId, locale);

            if (newSurveyId) {
                navigate(`/survey`);
            } else {
                // fallback generico
                navigate("/survey");
            }
        } catch (e) {
            console.error("Errore avvio survey:", e);
        }
    };

    // ---------------------------
    // UNAUTHENTICATED VIEW
    // ---------------------------
    if (!isAuthenticated) {
        return <SurveyIntro />;
    }

    // ---------------------------
    // AUTHENTICATED VIEW
    // ---------------------------
    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-neutral-950" : "bg-primary-white"} px-6 py-32`}>

            {/* Loader full-screen durante init */}
            {initLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <FallingLines width="60" color="#fff" visible />
                </div>
            )}

            {/* Background grid */}
            <div
                className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                    isDark
                        ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                        : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                }`}
            />

            {/* Hero / conferma */}
            <section className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
                <h1 className={`text-5xl font-light leading-tight ${isDark ? "text-white" : "text-black"}`}>
                    Inizia la tua analisi
                </h1>

                <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Raccogli informazioni strutturate e avvia un processo di analisi mirato.
                    Ottieni subito una panoramica chiara del livello di maturità digitale
                    della tua azienda.
                </p>

                {emailVer ? (
                    <LiquidGlassButton
                        className={`min-w-60 ${isDark ? "" : "!bg-white"}`}
                        onClick={handleStart}
                        disabled={initLoading || loadingSurvey || loadingSurveyId}
                    >
                        {initLoading ? (
                            <FallingLines width="30" color={isDark ? "#fff" : "000"} visible />
                        ) : (
                            survey ? "Riprendi" : "Avvia il questionario"
                        )}
                    </LiquidGlassButton>
                ) : (
                    <LiquidGlassButton disabled>
                        Verifica la tua email
                    </LiquidGlassButton>
                )}
            </section>

            {/* Info aggiuntiva sul survey */}
            <section className={`relative max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-16`}>
                <div className={`space-y-6 ${isDark ? "text-white" : "text-black"}`}>
                    <h2 className="text-3xl font-semibold">Obiettivo del survey</h2>
                    <p className={isDark ? "text-neutral-300" : "text-neutral-700"}>
                        Questo questionario raccoglie informazioni strutturate sulle tue esigenze aziendali in ambito CRM, ERP ed E-commerce.
                        Serve a comprendere il livello di digitalizzazione e le aree di miglioramento.
                    </p>
                    <ul className="space-y-2">
                        <li>• Analisi dei processi aziendali</li>
                        <li>• Identificazione delle inefficienze operative</li>
                        <li>• Prioritizzazione delle funzionalità e integrazioni software</li>
                        <li>• Generazione di un report preliminare tramite AI</li>
                        <li>• Successivo approfondimento da un consulente</li>
                    </ul>
                </div>

                <div className={`relative p-10 rounded-3xl ${isDark ? "bg-neutral-900/70 border border-neutral-800 text-neutral-400" : "bg-white/90 border border-neutral-300 text-neutral-800"} backdrop-blur-xl shadow-2xl`}>
                    <h3 className="text-2xl font-medium mb-6">Cosa otterrai</h3>
                    <div className="space-y-4 text-sm leading-relaxed">
                        <p>→ Panoramica chiara del livello di maturità digitale della tua azienda</p>
                        <p>→ Identificazione dei punti di forza e delle aree critiche</p>
                        <p>→ Suggerimenti operativi basati sui dati raccolti</p>
                        <p>→ Report preliminare pronto per l’analisi approfondita del consulente</p>
                    </div>
                </div>
            </section>
        </main>
    );
}