import { useTheme } from "../Context/ThemeContext.tsx";
import {type ReactNode, useState} from "react";

function Section({ title, children }: {title?: string; children?: ReactNode }) {
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

export function TermsOfService() {
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
                        Termini di Servizio
                    </h1>
                    <p className={`${textMainClass} max-w-2xl`}>
                        I presenti Termini disciplinano l’accesso e l’utilizzo della piattaforma
                        offerta da TechBridgeGroup SRL.
                    </p>
                </div>

                <div className={`p-6 rounded-3xl ${cardBgClass} backdrop-blur-xl space-y-2`}>

                    <Section title="1. Accettazione dei termini">
                        <p>
                            Utilizzando la piattaforma, l’utente accetta integralmente i presenti Termini.
                            Se non si accettano, non è possibile utilizzare il servizio.
                        </p>
                    </Section>

                    <Section title="2. Descrizione del servizio">
                        <p>
                            La piattaforma fornisce strumenti digitali per la raccolta di dati tramite
                            questionari e la generazione di report analitici avanzati.
                        </p>
                        <p>
                            Il servizio può evolversi nel tempo e includere funzionalità basate su
                            intelligenza artificiale.
                        </p>
                    </Section>

                    <Section title="3. Creazione account">
                        <p>
                            Per accedere al servizio è necessario creare un account fornendo informazioni
                            veritiere e aggiornate.
                        </p>
                        <p>
                            L’utente è responsabile della sicurezza delle proprie credenziali.
                        </p>
                    </Section>

                    <Section title="4. Utilizzo consentito">
                        <ul className="space-y-1">
                            <li>• Utilizzare il servizio solo per scopi leciti</li>
                            <li>• Non violare diritti di terzi</li>
                            <li>• Non introdurre dati illegali o non autorizzati</li>
                        </ul>
                    </Section>

                    <Section title="5. Dati inseriti dall’utente">
                        <p>
                            L’utente è l’unico responsabile dei dati inseriti nella piattaforma,
                            inclusi dati relativi a terzi (es. clienti).
                        </p>
                        <p>
                            L’utente garantisce di avere le basi legali per trattare tali dati.
                        </p>
                    </Section>

                    <Section title="6. Pagamenti e abbonamenti">
                        <p>
                            Alcune funzionalità sono accessibili tramite abbonamento a pagamento.
                        </p>
                        <p>
                            I pagamenti sono gestiti tramite Stripe e sono soggetti alle relative condizioni.
                        </p>
                        <p>
                            L’abbonamento è mensile e può essere cancellato in qualsiasi momento.
                        </p>
                    </Section>

                    <Section title="7. Proprietà intellettuale">
                        <p>
                            Tutti i diritti relativi alla piattaforma sono di proprietà di TechBridgeGroup SRL.
                        </p>
                        <p>
                            È vietata la copia, distribuzione o modifica non autorizzata.
                        </p>
                    </Section>

                    <Section title="8. Limitazione di responsabilità">
                        <p>
                            Il servizio è fornito "così com’è" senza garanzie di risultati specifici.
                        </p>
                        <p>
                            I report generati tramite AI rappresentano supporto decisionale e non
                            costituiscono consulenza professionale vincolante.
                        </p>
                    </Section>

                    <Section title="9. Disponibilità del servizio">
                        <p>
                            Non garantiamo disponibilità continua o priva di errori del servizio.
                            Potrebbero verificarsi interruzioni per manutenzione o aggiornamenti.
                        </p>
                    </Section>

                    <Section title="10. Risoluzione e sospensione">
                        <p>
                            Possiamo sospendere o terminare l’accesso in caso di violazione dei Termini.
                        </p>
                    </Section>

                    <Section title="11. Legge applicabile">
                        <p>
                            I presenti Termini sono regolati dalla legge italiana.
                        </p>
                    </Section>

                    <Section title="12. Modifiche">
                        <p>
                            I Termini possono essere aggiornati nel tempo. L’uso continuato del servizio
                            implica l’accettazione delle modifiche.
                        </p>
                    </Section>

                </div>
            </div>
        </main>
    );
}
