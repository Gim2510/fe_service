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

export function CookiePolicy() {
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
                        Cookie Policy
                    </h1>
                    <p className={`text-sm leading-relaxed max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Questa Cookie Policy descrive l'utilizzo dei cookie e tecnologie simili
                        da parte di TechBridgeGroup SRL nell'ambito della piattaforma.
                    </p>
                </div>

                <div className={`rounded-2xl border p-7 ${card} space-y-0`}>
                    <PolicySection isDark={isDark} title="1. Cosa sono i cookie">
                        <p>I cookie sono piccoli file di testo memorizzati sul dispositivo dell'utente durante la navigazione e permettono al sito di funzionare correttamente e migliorare l'esperienza utente.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="2. Tipologie di cookie utilizzati">
                        <p>Attualmente utilizziamo esclusivamente cookie tecnici, necessari al funzionamento della piattaforma.</p>
                        <ul className="space-y-1">
                            {["Cookie di sessione", "Cookie di autenticazione", "Cookie per preferenze utente (es. tema dark/light)"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="3. Finalità dei cookie">
                        <ul className="space-y-1">
                            {["Garantire il corretto funzionamento del sito", "Gestire l'accesso e l'autenticazione", "Salvare preferenze dell'utente", "Migliorare stabilità e sicurezza"].map(item => (
                                <li key={item} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">•</span>{item}</li>
                            ))}
                        </ul>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="4. Cookie di terze parti">
                        <p>Al momento non utilizziamo cookie di profilazione o tracciamento di terze parti.</p>
                        <p>Eventuali integrazioni future (es. analytics o marketing) saranno comunicate aggiornando questa policy.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="5. Base giuridica">
                        <p>I cookie tecnici sono utilizzati sulla base del legittimo interesse del titolare a garantire il funzionamento del servizio.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="6. Gestione dei cookie">
                        <p>L'utente può gestire o disabilitare i cookie attraverso le impostazioni del proprio browser.</p>
                        <p>La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="7. Conservazione">
                        <p>I cookie tecnici sono conservati per il tempo strettamente necessario al funzionamento del servizio o fino alla chiusura della sessione.</p>
                    </PolicySection>

                    <PolicySection isDark={isDark} title="8. Aggiornamenti">
                        <p>La presente Cookie Policy può essere aggiornata nel tempo. Gli utenti saranno informati in caso di modifiche rilevanti.</p>
                    </PolicySection>
                </div>
            </div>
        </main>
    );
}
