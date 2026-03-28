import {useTheme} from "../../Context/ThemeContext.tsx";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";


export function SurveyIntro() {
    const {theme} = useTheme();
    const isDark = theme === "dark";

    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-primary-white text-black";
    const textMainClass = isDark ? "text-neutral-300" : "text-neutral-700";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";
    const cardTextClass = isDark ? "text-white" : "text-neutral-800";

    return (
        <main className={`relative min-h-screen overflow-hidden ${bgClass} px-6 py-32`}>

            {/* Background grid */}
            {isDark && (
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"/>
            )}

            {/* Hero Section */}
            <section className="relative max-w-4xl mx-auto space-y-8 z-10 text-center flex flex-col">
                <h1 className={`text-4xl sm:text-6xl font-semibold leading-tight ${cardTextClass}`}>
                    Inizia il tuo <span className='text-main-red'>assessment</span> digitale
                </h1>

                <p className={`text-md sm:text-xl max-w-3xl mx-auto leading-relaxed ${textMainClass}`}>
                    Compila il questionario per raccogliere informazioni chiave sulla tua azienda e generare un report
                    preliminare personalizzato.
                    L’analisi sarà ulteriormente arricchita da un consulente esperto per offrirti raccomandazioni
                    strategiche operative.
                </p>

                <LiquidGlassButton to="/register" className={`${isDark ? "" : "!bg-white"} !rounded-4xl`}>
                    Registrati per iniziare
                </LiquidGlassButton>
            </section>

            {/* Survey Info Section */}
            <section className="relative max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 z-10">

                <div className={`space-y-6 ${cardTextClass}`}>
                    <h2 className="text-3xl font-semibold">Obiettivo del survey</h2>
                    <p className={textMainClass}>
                        Questo questionario raccoglie informazioni strutturate sulle tue esigenze aziendali in ambito
                        CRM, ERP ed E-commerce.
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

                <div className={`relative p-10 rounded-3xl ${cardBgClass} backdrop-blur-xl shadow-2xl`}>
                    <h3 className={`text-2xl font-medium mb-6 ${cardTextClass}`}>Cosa otterrai</h3>
                    <div className={`space-y-4 text-sm leading-relaxed ${cardTextClass}`}>
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