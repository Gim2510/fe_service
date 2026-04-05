import { useTheme } from "../../Context/ThemeContext.tsx";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";
import SecurityItem from "./SecurityItem.tsx";

export function SurveyIntro() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // 🎨 THEME TOKENS (identici a SurveyStart)
    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-primary-white text-black";
    const textMainClass = isDark ? "text-neutral-300" : "text-neutral-700";
    const textSoftClass = isDark ? "text-neutral-400" : "text-neutral-600";
    const textStrongClass = isDark ? "text-white" : "text-neutral-900";

    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white border border-neutral-300";

    return (
        <main className={`relative min-h-screen overflow-hidden ${bgClass} px-6 py-32`}>

            {/* Background */}
            <div
                className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                    isDark
                        ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                        : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                }`}
            />

            {/* HERO */}
            <section className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                <h1 className={`text-4xl sm:text-5xl font-light leading-tight ${textStrongClass}`}>
                    Struttura la tua <span className="text-main-red font-semibold">crescita digitale</span>
                </h1>

                <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${textSoftClass}`}>
                    Compila il questionario per analizzare processi, strumenti e criticità della tua azienda.
                    Le informazioni raccolte verranno utilizzate per preparare un confronto consulenziale
                    mirato e orientato agli obiettivi di crescita.
                </p>

                <div className={`text-sm ${textSoftClass}`}>
                    ⏱️ Tempo richiesto: 8–12 minuti · Nessuna condivisione con terze parti
                </div>

                <LiquidGlassButton
                    to="/register"
                    className={`min-w-60 !py-3 ${isDark ? "" : "!bg-white"} !rounded-4xl`}
                    fillBackground="main"
                >
                    Registrati per iniziare
                </LiquidGlassButton>

                <p className={`text-xs ${textSoftClass}`}>
                    I dati inseriti sono accessibili solo internamente e utilizzati esclusivamente per l’analisi consulenziale.
                </p>
            </section>

            {/* COME FUNZIONA */}
            <section className="relative max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div>
                    <h3 className={`font-semibold ${textStrongClass}`}>1. Raccolta informazioni</h3>
                    <p className={`text-sm ${textSoftClass}`}>
                        Inserisci dati su processi, strumenti e organizzazione aziendale.
                    </p>
                </div>

                <div>
                    <h3 className={`font-semibold ${textStrongClass}`}>2. Analisi</h3>
                    <p className={`text-sm ${textSoftClass}`}>
                        Le informazioni vengono strutturate per individuare inefficienze e opportunità.
                    </p>
                </div>

                <div>
                    <h3 className={`font-semibold ${textStrongClass}`}>3. Confronto</h3>
                    <p className={`text-sm ${textSoftClass}`}>
                        Possibilità di fissare un incontro per definire le prossime azioni operative.
                    </p>
                </div>
            </section>

            {/* OBIETTIVO + OUTPUT */}
            <section className="relative max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">

                <div className="space-y-6">
                    <h2 className={`text-3xl font-semibold ${textStrongClass}`}>
                        Obiettivo del survey
                    </h2>

                    <p className={textMainClass}>
                        Il questionario raccoglie informazioni su CRM, ERP ed E-commerce
                        per comprendere il livello di digitalizzazione e individuare le aree di miglioramento.
                    </p>

                    <ul className={`space-y-2 text-sm ${textMainClass}`}>
                        <li>• Analisi dei processi aziendali</li>
                        <li>• Identificazione delle inefficienze operative</li>
                        <li>• Prioritizzazione delle esigenze software</li>
                        <li>• Preparazione di un confronto consulenziale mirato</li>
                    </ul>
                </div>

                <div className={`p-10 rounded-3xl ${cardBgClass}`}>
                    <h3 className={`text-2xl font-medium mb-6 ${textStrongClass}`}>
                        Cosa otterrai
                    </h3>

                    <div className={`space-y-4 text-sm ${textMainClass}`}>
                        <p>→ Visione chiara dello stato attuale</p>
                        <p>→ Identificazione delle criticità principali</p>
                        <p>→ Linee guida per evoluzione digitale</p>
                        <p>→ Base concreta per confronto consulenziale</p>
                    </div>

                    <div className={`pt-6 text-xs ${textSoftClass}`}>
                        Nessun contatto commerciale viene avviato automaticamente.
                        Potrai decidere tu se prenotare un incontro.
                    </div>
                </div>
            </section>

            {/* SICUREZZA (COMPLETA, NON BASIC) */}
            <section className={`max-w-4xl mx-auto mt-24 p-8 rounded-3xl ${cardBgClass}`}>
                <h2 className={`text-2xl font-semibold mb-6 ${textStrongClass}`}>
                    Protezione dei dati
                </h2>

                <p className={`text-sm mb-6 ${textMainClass}`}>
                    I dati vengono gestiti con accesso controllato, validazione delle richieste e sistemi di protezione attivi.
                </p>

                <div className={`space-y-6 text-sm ${textMainClass}`}>

                    <SecurityItem title="Accesso e controllo interno">
                        Accesso limitato ai membri autorizzati con logging e audit delle attività.
                        I controlli vengono applicati lato backend in base ai ruoli contenuti nei token.
                    </SecurityItem>

                    <SecurityItem title="Autenticazione e sessioni">
                        Sistema basato su JWT e refresh token con validazione server-side.
                        Le sessioni vengono gestite in modo sicuro per prevenire accessi non autorizzati.
                    </SecurityItem>

                    <SecurityItem title="Protezione attiva">
                        Protezione da brute force, controllo automatico dei pattern anomali e blocco temporaneo delle richieste sospette.
                    </SecurityItem>

                    <SecurityItem title="Controllo traffico e abusi">
                        Rate limiting e sistemi anti-spam per prevenire richieste massive, automazioni non autorizzate e abusi delle API.
                    </SecurityItem>

                    <SecurityItem title="Monitoraggio e audit">
                        Logging continuo e audit log per tracciare accessi e attività.
                        Monitoraggio tramite infrastruttura cloud (Railway, Vercel).
                    </SecurityItem>

                    <SecurityItem title="Gestione dei dati">
                        Nessuna condivisione con terze parti.
                        I dati possono essere sovrascritti dall’utente e vengono eliminati entro 60 giorni in caso di cancellazione.
                    </SecurityItem>

                </div>

                <p className={`text-xs mt-8 ${textSoftClass}`}>
                    Infrastruttura basata su servizi cloud moderni con controlli di accesso avanzati e monitoraggio continuo.
                </p>
            </section>

        </main>
    );
}