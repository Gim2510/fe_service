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

export function TermsOfService() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const card = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />

            <div className="relative max-w-3xl mx-auto px-6 py-32">
                <div className="mb-10 space-y-3">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                        Legale
                    </span>
                    <h1 className={`text-3xl sm:text-4xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Termini di Servizio
                    </h1>
                    <p className={`text-sm leading-relaxed max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        I presenti Termini disciplinano l'accesso e l'utilizzo della piattaforma
                        offerta da TechBridgeGroup SRL.
                    </p>
                </div>

                <div className={`rounded-2xl border p-7 ${card} space-y-0`}>
                    <PolicySection isDark={isDark} title="1. Accettazione dei termini">
                        <p>Utilizzando la piattaforma, l'utente accetta integralmente i presenti Termini. Se non si accettano, non è possibile utilizzare il servizio.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="2. Descrizione del servizio">
                        <p>La piattaforma fornisce strumenti digitali per la raccolta di dati tramite questionari e la generazione di report analitici avanzati.</p>
                        <p>Il servizio può evolversi nel tempo e includere funzionalità basate su intelligenza artificiale.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="3. Creazione account">
                        <p>Per accedere al servizio è necessario creare un account fornendo informazioni veritiere e aggiornate.</p>
                        <p>L'utente è responsabile della sicurezza delle proprie credenziali.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="4. Utilizzo consentito">
                        <ul className="space-y-1">
                            {["Utilizzare il servizio solo per scopi leciti", "Non violare diritti di terzi", "Non introdurre dati illegali o non autorizzati"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="5. Dati inseriti dall'utente">
                        <p>L'utente è l'unico responsabile dei dati inseriti nella piattaforma, inclusi dati relativi a terzi (es. clienti).</p>
                        <p>L'utente garantisce di avere le basi legali per trattare tali dati.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="6. Pagamenti e abbonamenti">
                        <p>Alcune funzionalità sono accessibili tramite abbonamento a pagamento.</p>
                        <p>I pagamenti sono gestiti tramite Stripe e sono soggetti alle relative condizioni.</p>
                        <p>L'abbonamento è mensile e può essere cancellato in qualsiasi momento.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="7. Proprietà intellettuale">
                        <p>Tutti i diritti relativi alla piattaforma sono di proprietà di TechBridgeGroup SRL.</p>
                        <p>È vietata la copia, distribuzione o modifica non autorizzata.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="8. Limitazione di responsabilità">
                        <p>Il servizio è fornito "così com'è" senza garanzie di risultati specifici.</p>
                        <p>I report generati tramite AI rappresentano supporto decisionale e non costituiscono consulenza professionale vincolante.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="9. Disponibilità del servizio">
                        <p>Non garantiamo disponibilità continua o priva di errori del servizio. Potrebbero verificarsi interruzioni per manutenzione o aggiornamenti.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="10. Risoluzione e sospensione">
                        <p>Possiamo sospendere o terminare l'accesso in caso di violazione dei Termini.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="11. Legge applicabile">
                        <p>I presenti Termini sono regolati dalla legge italiana.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="12. Modifiche">
                        <p>I Termini possono essere aggiornati nel tempo. L'uso continuato del servizio implica l'accettazione delle modifiche.</p>
                    </PolicySection>
                </div>
            </div>
        </main>
    );
}
