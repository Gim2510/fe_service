import { useTheme } from "../Context/ThemeContext.tsx";
import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

function PolicySection({ title, children, isDark }: { title?: string; children?: ReactNode; isDark: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`border-b ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex justify-between items-center py-4 gap-4"
            >
                <h2 className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h2>
                <ChevronDown
                    size={15}
                    className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <div className={`pb-5 space-y-3 text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {children}
                </div>
            )}
        </div>
    );
}

export function PrivacyPolicy() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const card = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />

            <div className="relative max-w-3xl mx-auto px-6 py-32">
                <div className="mb-10 space-y-3">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-rose-500" : "text-rose-700"}`}>
                        Legale
                    </span>
                    <h1 className={`text-3xl sm:text-4xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Privacy Policy
                    </h1>
                    <p className={`text-sm leading-relaxed max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Questa informativa descrive come TechBridgeGroup SRL raccoglie, utilizza e protegge
                        i dati personali degli utenti nell'ambito dei propri servizi digitali.
                    </p>
                </div>

                <div className={`rounded-2xl border p-7 ${card} space-y-0`}>
                    <PolicySection isDark={isDark} title="1. Titolare del trattamento">
                        <p>Il titolare del trattamento è TechBridgeGroup SRL, responsabile delle decisioni relative alle finalità e modalità del trattamento dei dati personali.</p>
                        <p>Email di contatto: guglielmino2510@gmail.com</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="2. Tipologie di dati raccolti">
                        <p>Raccogliamo dati personali forniti direttamente dagli utenti e dati generati durante l'utilizzo della piattaforma.</p>
                        <ul className="space-y-1">
                            {["Dati identificativi (nome, cognome, email)", "Informazioni aziendali e ruolo professionale", "Risposte a questionari e contenuti inseriti", "Dati di clienti inseriti dagli utenti", "Dati di fatturazione e pagamento", "Dati tecnici e di utilizzo (log, IP, device)"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="3. Finalità del trattamento">
                        <p>I dati sono trattati per finalità strettamente connesse al servizio:</p>
                        <ul className="space-y-1">
                            {["Creazione e gestione account utente", "Generazione di report avanzati tramite AI", "Analisi e miglioramento dei processi aziendali", "Gestione pagamenti e abbonamenti", "Supporto tecnico e assistenza", "Comunicazioni operative e marketing (previo consenso)"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="4. Utilizzo di intelligenza artificiale">
                        <p>La piattaforma utilizza sistemi di intelligenza artificiale per elaborare le informazioni fornite dagli utenti e generare report strutturati.</p>
                        <p>Tali processi possono includere attività di analisi automatizzata e profilazione. Le decisioni finali restano comunque sotto il controllo dell'utente.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="5. Base giuridica">
                        <p>Il trattamento si basa su diverse basi giuridiche, tra cui:</p>
                        <ul className="space-y-1">
                            {["Esecuzione di un contratto", "Consenso dell'interessato", "Obblighi legali", "Legittimo interesse del titolare"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="6. Condivisione dei dati">
                        <p>I dati possono essere condivisi con fornitori esterni che supportano l'erogazione del servizio:</p>
                        <ul className="space-y-1">
                            {["Stripe (pagamenti)", "SendGrid (email)", "Calendly (prenotazioni)", "Hosting cloud (Vercel, Railway)", "Database (MongoDB, Redis)", "AI providers (DeepSeek)"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="7. Trasferimento dati extra UE">
                        <p>Alcuni fornitori potrebbero trattare dati al di fuori dello Spazio Economico Europeo. In tali casi adottiamo garanzie adeguate come le Clausole Contrattuali Standard (SCC).</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="8. Conservazione dei dati">
                        <p>I dati vengono conservati per tutta la durata del rapporto contrattuale e per un periodo massimo di 60 giorni successivi alla cancellazione dell'account, salvo obblighi legali differenti.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="9. Sicurezza">
                        <p>Adottiamo misure tecniche e organizzative per proteggere i dati personali, inclusi sistemi di autenticazione, controllo accessi e protezione infrastrutturale.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="10. Diritti dell'utente">
                        <p>Gli utenti possono esercitare i diritti previsti dal GDPR, tra cui accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="11. Cookie">
                        <p>Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento della piattaforma e alla gestione delle preferenze utente.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="12. Modifiche alla policy">
                        <p>La presente informativa può essere aggiornata nel tempo. Le modifiche rilevanti saranno comunicate agli utenti attraverso i canali appropriati.</p>
                    </PolicySection>
                </div>
            </div>
        </main>
    );
}
