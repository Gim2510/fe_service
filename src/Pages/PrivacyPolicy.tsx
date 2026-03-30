import { useTheme } from "../Context/ThemeContext.tsx";
import { useState } from "react";

function Section({ title, children }: { title?: string; children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-neutral-700/30 pb-4 cursor-pointer">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex justify-between items-center py-4"
            >
                <h2 className="text-xl font-semibold cursor-pointer">{title}</h2>
                <span className="text-sm opacity-60">{open ? "−" : "+"}</span>
            </button>

            {open && (
                <div className="pt-2 space-y-4 text-sm leading-relaxed opacity-90">
                    {children}
                </div>
            )}
        </div>
    );
}

export function PrivacyPolicy() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-primary-white text-black";
    const textMainClass = isDark ? "text-neutral-300" : "text-neutral-700";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";

    return (
        <main className={`relative min-h-screen overflow-hidden ${bgClass}`}>

            {isDark && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />
            )}

            <div className="relative max-w-4xl mx-auto px-6 py-32">

                <div className="mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-semibold">
                        Privacy Policy
                    </h1>
                    <p className={`${textMainClass} max-w-2xl`}>
                        Questa informativa descrive in modo trasparente come TechBridgeGroup SRL raccoglie,
                        utilizza e protegge i dati personali degli utenti nell’ambito dei propri servizi digitali.
                    </p>
                </div>

                <div className={`p-6 rounded-3xl ${cardBgClass} backdrop-blur-xl space-y-2`}>

                    <Section title="1. Titolare del trattamento">
                        <p>
                            Il titolare del trattamento è TechBridgeGroup SRL, responsabile delle decisioni
                            relative alle finalità e modalità del trattamento dei dati personali.
                        </p>
                        <p>Email di contatto: guglielmino2510@gmail.com</p>
                    </Section>

                    <Section title="2. Tipologie di dati raccolti">
                        <p>
                            Raccogliamo dati personali forniti direttamente dagli utenti e dati generati durante
                            l’utilizzo della piattaforma.
                        </p>
                        <ul className="space-y-1">
                            <li>• Dati identificativi (nome, cognome, email)</li>
                            <li>• Informazioni aziendali e ruolo professionale</li>
                            <li>• Risposte a questionari e contenuti inseriti</li>
                            <li>• Dati di clienti inseriti dagli utenti</li>
                            <li>• Dati di fatturazione e pagamento</li>
                            <li>• Dati tecnici e di utilizzo (log, IP, device)</li>
                        </ul>
                    </Section>

                    <Section title="3. Finalità del trattamento">
                        <p>I dati sono trattati per finalità strettamente connesse al servizio:</p>
                        <ul className="space-y-1">
                            <li>• Creazione e gestione account utente</li>
                            <li>• Generazione di report avanzati tramite AI</li>
                            <li>• Analisi e miglioramento dei processi aziendali</li>
                            <li>• Gestione pagamenti e abbonamenti</li>
                            <li>• Supporto tecnico e assistenza</li>
                            <li>• Comunicazioni operative e marketing (previo consenso)</li>
                        </ul>
                    </Section>

                    <Section title="4. Utilizzo di intelligenza artificiale">
                        <p>
                            La piattaforma utilizza sistemi di intelligenza artificiale per elaborare le
                            informazioni fornite dagli utenti e generare report strutturati.
                        </p>
                        <p>
                            Tali processi possono includere attività di analisi automatizzata e profilazione.
                            Le decisioni finali restano comunque sotto il controllo dell’utente.
                        </p>
                    </Section>

                    <Section title="5. Base giuridica">
                        <p>
                            Il trattamento si basa su diverse basi giuridiche, tra cui:
                        </p>
                        <ul className="space-y-1">
                            <li>• Esecuzione di un contratto</li>
                            <li>• Consenso dell’interessato</li>
                            <li>• Obblighi legali</li>
                            <li>• Legittimo interesse del titolare</li>
                        </ul>
                    </Section>

                    <Section title="6. Condivisione dei dati">
                        <p>
                            I dati possono essere condivisi con fornitori esterni che supportano
                            l’erogazione del servizio:
                        </p>
                        <ul className="space-y-1">
                            <li>• Stripe (pagamenti)</li>
                            <li>• SendGrid (email)</li>
                            <li>• Calendly (prenotazioni)</li>
                            <li>• Hosting cloud (Vercel, Railway)</li>
                            <li>• Database (MongoDB, Redis)</li>
                            <li>• AI providers (DeepSeek)</li>
                        </ul>
                    </Section>

                    <Section title="7. Trasferimento dati extra UE">
                        <p>
                            Alcuni fornitori potrebbero trattare dati al di fuori dello Spazio Economico Europeo.
                            In tali casi adottiamo garanzie adeguate come le Clausole Contrattuali Standard (SCC).
                        </p>
                    </Section>

                    <Section title="8. Conservazione dei dati">
                        <p>
                            I dati vengono conservati per tutta la durata del rapporto contrattuale e per un
                            periodo massimo di 60 giorni successivi alla cancellazione dell’account, salvo
                            obblighi legali differenti.
                        </p>
                    </Section>

                    <Section title="9. Sicurezza">
                        <p>
                            Adottiamo misure tecniche e organizzative per proteggere i dati personali,
                            inclusi sistemi di autenticazione, controllo accessi e protezione infrastrutturale.
                        </p>
                    </Section>

                    <Section title="10. Diritti dell’utente">
                        <p>
                            Gli utenti possono esercitare i diritti previsti dal GDPR, tra cui accesso,
                            rettifica, cancellazione, limitazione, opposizione e portabilità dei dati.
                        </p>
                    </Section>

                    <Section title="11. Cookie">
                        <p>
                            Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento della
                            piattaforma e alla gestione delle preferenze utente.
                        </p>
                    </Section>

                    <Section title="12. Modifiche alla policy">
                        <p>
                            La presente informativa può essere aggiornata nel tempo. Le modifiche rilevanti
                            saranno comunicate agli utenti attraverso i canali appropriati.
                        </p>
                    </Section>

                </div>
            </div>
        </main>
    );
}