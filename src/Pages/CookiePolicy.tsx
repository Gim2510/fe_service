import { useTheme } from "../Context/ThemeContext.tsx";
import {type ReactNode, useState} from "react";

function Section({ title, children }: { title?: string; children?: ReactNode }) {
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

export function CookiePolicy() {
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
                        Cookie Policy
                    </h1>
                    <p className={`${textMainClass} max-w-2xl`}>
                        Questa Cookie Policy descrive l’utilizzo dei cookie e tecnologie simili
                        da parte di TechBridgeGroup SRL nell’ambito della piattaforma.
                    </p>
                </div>

                <div className={`p-6 rounded-3xl ${cardBgClass} backdrop-blur-xl space-y-2`}>

                    <Section title="1. Cosa sono i cookie">
                        <p>
                            I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo
                            dell’utente durante la navigazione e permettono al sito di funzionare correttamente
                            e migliorare l’esperienza utente.
                        </p>
                    </Section>

                    <Section title="2. Tipologie di cookie utilizzati">
                        <p>
                            Attualmente utilizziamo esclusivamente cookie tecnici, necessari al funzionamento
                            della piattaforma.
                        </p>
                        <ul className="space-y-1">
                            <li>• Cookie di sessione</li>
                            <li>• Cookie di autenticazione</li>
                            <li>• Cookie per preferenze utente (es. tema dark/light)</li>
                        </ul>
                    </Section>

                    <Section title="3. Finalità dei cookie">
                        <ul className="space-y-1">
                            <li>• Garantire il corretto funzionamento del sito</li>
                            <li>• Gestire l’accesso e l’autenticazione</li>
                            <li>• Salvare preferenze dell’utente</li>
                            <li>• Migliorare stabilità e sicurezza</li>
                        </ul>
                    </Section>

                    <Section title="4. Cookie di terze parti">
                        <p>
                            Al momento non utilizziamo cookie di profilazione o tracciamento di terze parti.
                        </p>
                        <p>
                            Eventuali integrazioni future (es. analytics o marketing) saranno comunicate
                            aggiornando questa policy.
                        </p>
                    </Section>

                    <Section title="5. Base giuridica">
                        <p>
                            I cookie tecnici sono utilizzati sulla base del legittimo interesse del titolare
                            a garantire il funzionamento del servizio.
                        </p>
                    </Section>

                    <Section title="6. Gestione dei cookie">
                        <p>
                            L’utente può gestire o disabilitare i cookie attraverso le impostazioni del
                            proprio browser.
                        </p>
                        <p>
                            La disabilitazione dei cookie tecnici potrebbe compromettere il corretto
                            funzionamento del sito.
                        </p>
                    </Section>

                    <Section title="7. Conservazione">
                        <p>
                            I cookie tecnici sono conservati per il tempo strettamente necessario al
                            funzionamento del servizio o fino alla chiusura della sessione.
                        </p>
                    </Section>

                    <Section title="8. Aggiornamenti">
                        <p>
                            La presente Cookie Policy può essere aggiornata nel tempo. Gli utenti saranno
                            informati in caso di modifiche rilevanti.
                        </p>
                    </Section>

                </div>
            </div>
        </main>
    );
}