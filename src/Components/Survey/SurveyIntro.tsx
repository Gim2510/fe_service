import {useTheme} from "../../Context/ThemeContext.tsx";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";
import SecurityItem from "./SecurityItem.tsx";

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

            {isDark && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"/>
            )}

            {/* HERO */}
            <section className="relative max-w-4xl mx-auto space-y-8 z-10 text-center flex flex-col">
                <h1 className={`text-4xl sm:text-6xl font-semibold leading-tight ${cardTextClass}`}>
                    Inizia il tuo <span className='text-main-red'>assessment</span> digitale
                </h1>

                <p className={`text-md sm:text-xl max-w-3xl mx-auto leading-relaxed ${textMainClass}`}>
                    Compila il questionario per analizzare processi, strumenti e criticità della tua azienda.
                    Riceverai una valutazione preliminare utile per individuare opportunità concrete di crescita e ottimizzazione.
                </p>

                <LiquidGlassButton to="/register" className={`${isDark ? "" : "!bg-white hover:!text-white"} !rounded-4xl`} scale={false} fillBackground='main'>
                    Registrati per iniziare
                </LiquidGlassButton>
            </section>

            {/* COME FUNZIONA */}
            <section className="max-w-5xl mx-auto mt-20 grid backdrop-blur-sm md:grid-cols-3 gap-8 text-center">
                {[
                    {
                        title: "1. Compila il survey",
                        desc: "Rispondi a domande mirate su azienda, processi e strumenti"
                    },
                    {
                        title: "2. Analisi",
                        desc: "I dati vengono analizzati per individuare inefficienze e opportunità"
                    },
                    {
                        title: "3. Consulenza",
                        desc: "Puoi prenotare una call per approfondire e definire una roadmap"
                    }
                ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl ${cardBgClass}`}>
                        <h3 className={`font-semibold mb-2 ${cardTextClass}`}>{item.title}</h3>
                        <p className={`text-sm ${textMainClass}`}>{item.desc}</p>
                    </div>
                ))}
            </section>

            {/* INFO */}
            <section className="relative max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 z-10">

                <div className={`space-y-6 ${cardTextClass}`}>
                    <h2 className="text-3xl font-semibold">Cosa otterrai</h2>
                    <ul className="space-y-2">
                        <li>• Analisi del livello di digitalizzazione</li>
                        <li>• Identificazione dei colli di bottiglia operativi</li>
                        <li>• Valutazione dei software e integrazioni</li>
                        <li>• Indicazioni concrete per migliorare processi e performance</li>
                        <li>• Base per una consulenza strategica personalizzata</li>
                    </ul>

                    <div className="pt-4">
                        <h3 className="font-semibold mb-2">⏱️ Tempo richiesto</h3>
                        <p className={textMainClass}>
                            Circa 5–8 minuti. Le domande sono rapide ma progettate per raccogliere informazioni ad alto valore.
                        </p>
                    </div>
                </div>

                <div className={`relative p-10 rounded-3xl ${cardBgClass} backdrop-blur-sm shadow-2xl`}>
                    <h3 className={`text-2xl font-medium mb-6 ${cardTextClass}`}>A chi è rivolto</h3>
                    <div className={`space-y-4 text-sm ${cardTextClass}`}>
                        <p>✔ Aziende che vogliono migliorare processi e organizzazione</p>
                        <p>✔ Realtà che utilizzano (o vogliono introdurre) CRM, ERP o e-commerce</p>
                        <p>✔ Team che stanno crescendo e incontrano inefficienze operative</p>

                        <p className="pt-4 opacity-70">
                            Non è pensato per uso personale o progetti non strutturati.
                        </p>
                    </div>
                </div>
            </section>

            {/* DOPO IL SURVEY */}
            <section className="max-w-4xl mx-auto mt-20 text-center space-y-6">
                <h2 className={`text-3xl font-semibold ${cardTextClass}`}>Cosa succede dopo</h2>
                <p className={textMainClass}>
                    Le risposte vengono analizzate per preparare una valutazione preliminare.
                    Se lo desideri, potrai prenotare una call con un consulente per approfondire i risultati
                    e definire possibili interventi.
                </p>
                <p className={`text-sm ${textMainClass}`}>
                    La consulenza è gratuita e finalizzata a comprendere obiettivi, priorità e possibili sviluppi progettuali.
                </p>
            </section>

            {/* SICUREZZA */}
            <section className={`max-w-4xl mx-auto mt-20 p-8 rounded-3xl ${cardBgClass}`}>
                <h2 className={`text-2xl font-semibold mb-6 ${cardTextClass}`}>
                    Gestione e protezione dei dati
                </h2>

                <p className={`text-sm mb-6 ${textMainClass}`}>
                    Le informazioni inserite vengono gestite con un approccio strutturato alla sicurezza.
                    L’accesso è controllato, le richieste sono validate e sono attivi sistemi di protezione contro
                    utilizzi impropri o accessi non autorizzati.
                </p>

                <div className={`space-y-6 text-sm ${textMainClass}`}>

                    <SecurityItem title="Accesso ai dati e controllo interno">
                        <p>
                            L’accesso ai dati è limitato esclusivamente ai membri autorizzati dell’organizzazione.
                            Non esistono accessi pubblici o condivisi.
                        </p>
                        <p>
                            I permessi non sono gestiti in modo statico ma applicati dinamicamente tramite controlli
                            lato backend,
                            basati sulle informazioni contenute nei token di autenticazione.
                        </p>
                        <p>
                            Ogni accesso rilevante viene registrato tramite sistemi di logging e audit.
                        </p>
                    </SecurityItem>

                    <SecurityItem title="Autenticazione e gestione delle sessioni">
                        <p>
                            L’accesso ai sistemi avviene tramite autenticazione basata su token (JWT),
                            con gestione delle sessioni tramite refresh token.
                        </p>
                        <p>
                            Questo approccio permette di mantenere sessioni sicure nel tempo,
                            riducendo il rischio di accessi non autorizzati o session hijacking.
                        </p>
                        <p>
                            Tutte le richieste vengono validate lato server prima di accedere a qualsiasi dato.
                        </p>
                    </SecurityItem>

                    <SecurityItem title="Protezione da accessi non autorizzati">
                        <p>
                            Sono implementati meccanismi di protezione contro tentativi di accesso forzato (brute
                            force),
                            con controlli automatici sul comportamento delle richieste.
                        </p>
                        <p>
                            In caso di attività sospette, il sistema limita o blocca temporaneamente le richieste.
                        </p>
                        <p>
                            Questo riduce drasticamente il rischio di compromissione degli account.
                        </p>
                    </SecurityItem>

                    <SecurityItem title="Controllo del traffico e prevenzione abusi">
                        <p>
                            Sono attivi sistemi di rate limiting e controllo del traffico per evitare utilizzi impropri
                            delle API e del form.
                        </p>
                        <p>
                            Questo include protezione contro richieste massive, automazioni non autorizzate e tentativi
                            di spam.
                        </p>
                        <p>
                            I pattern anomali vengono intercettati e gestiti automaticamente.
                        </p>
                    </SecurityItem>

                    <SecurityItem title="Monitoraggio e audit">
                        <p>
                            L’infrastruttura è monitorata tramite sistemi di logging e osservabilità,
                            con analisi continua delle richieste e degli accessi.
                        </p>
                        <p>
                            Sono disponibili audit log per tracciare le attività rilevanti e garantire visibilità su
                            eventuali anomalie.
                        </p>
                        <p>
                            Il monitoraggio è gestito tramite piattaforme cloud come Railway e Vercel.
                        </p>
                    </SecurityItem>

                    <SecurityItem title="Gestione e ciclo di vita dei dati">
                        <p>
                            I dati raccolti vengono utilizzati esclusivamente per finalità consulenziali
                            e non vengono condivisi o venduti a terze parti.
                        </p>
                        <p>
                            L’utente può aggiornare o sovrascrivere i dati in qualsiasi momento tramite il questionario.
                        </p>
                        <p>
                            In caso di cancellazione, i dati vengono rimossi definitivamente dai sistemi entro 60
                            giorni.
                        </p>
                    </SecurityItem>

                </div>

                <p className={`text-xs opacity-60 mt-8 ${textMainClass}`}>
                    Infrastruttura basata su servizi cloud moderni con controlli di accesso, validazione delle richieste
                    e monitoraggio continuo.
                </p>
            </section>

        </main>
    );
}