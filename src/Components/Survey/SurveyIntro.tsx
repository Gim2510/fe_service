import { motion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext.tsx";
import SecurityItem from "./SecurityItem.tsx";

const steps = [
    { n: "01", title: "Raccolta informazioni", desc: "Inserisci dati su processi, strumenti e organizzazione aziendale." },
    { n: "02", title: "Analisi", desc: "Le informazioni vengono strutturate per individuare inefficienze e opportunità." },
    { n: "03", title: "Confronto", desc: "Possibilità di fissare un incontro per definire le prossime azioni operative." },
];

const securityItems = [
    { title: "Accesso e controllo interno", body: "Accesso limitato ai membri autorizzati con logging e audit delle attività. I controlli vengono applicati lato backend in base ai ruoli contenuti nei token." },
    { title: "Autenticazione e sessioni", body: "Sistema basato su JWT e refresh token con validazione server-side. Le sessioni vengono gestite in modo sicuro per prevenire accessi non autorizzati." },
    { title: "Protezione attiva", body: "Protezione da brute force, controllo automatico dei pattern anomali e blocco temporaneo delle richieste sospette." },
    { title: "Controllo traffico e abusi", body: "Rate limiting e sistemi anti-spam per prevenire richieste massive, automazioni non autorizzate e abusi delle API." },
    { title: "Monitoraggio e audit", body: "Logging continuo e audit log per tracciare accessi e attività. Monitoraggio tramite infrastruttura cloud (Railway, Vercel)." },
    { title: "Gestione dei dati", body: "Nessuna condivisione con terze parti. I dati possono essere sovrascritti dall'utente e vengono eliminati entro 60 giorni in caso di cancellazione." },
];

export function SurveyIntro() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const card = isDark
        ? "bg-[#1C1C1A]/80 border-stone-800/20"
        : "bg-[#F8FAFB] border-slate-200";

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"} px-6 py-32`}>
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3Cpath d='M28 66 L56 50 L56 84 L28 100 L0 84 L0 50 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3C/svg%3E")`, backgroundSize: "56px 100px" }} />
            {isDark && <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.05] bg-amber-700 pointer-events-none" />}

            {/* Hero */}
            <motion.section
                className="relative z-10 max-w-3xl mx-auto text-center space-y-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                    Survey digitale
                </span>
                <h1 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Struttura la tua{" "}
                    <span className="text-amber-600">crescita digitale</span>
                </h1>
                <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Compila il questionario per analizzare processi, strumenti e criticità della tua azienda.
                    Le informazioni raccolte verranno utilizzate per preparare un confronto consulenziale
                    mirato e orientato agli obiettivi di crescita.
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    <Clock size={13} className={isDark ? "text-slate-600" : "text-slate-400"} />
                    <span className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Tempo richiesto: 8–12 minuti · Nessuna condivisione con terze parti
                    </span>
                </div>

                <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                        bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                        transition-colors shadow-lg shadow-amber-700/25 hover:-translate-y-0.5 duration-200"
                >
                    Registrati per iniziare
                    <ArrowRight size={15} />
                </Link>
            </motion.section>

            {/* Steps */}
            <section className="relative z-10 max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                    <motion.div
                        key={s.n}
                        className={`rounded-2xl border p-6 ${card}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <span className={`font-mono text-xs font-medium ${isDark ? "text-amber-700" : "text-amber-500"}`}>{s.n}</span>
                        <h3 className={`font-semibold mt-2 mb-1 text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>{s.title}</h3>
                        <p className={`text-xs leading-relaxed ${isDark ? "text-slate-500" : "text-slate-500"}`}>{s.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* Objective + output */}
            <section className="relative z-10 max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Obiettivo del survey</h2>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Il questionario raccoglie informazioni su CRM, ERP ed E-commerce per comprendere il livello di
                        digitalizzazione e individuare le aree di miglioramento.
                    </p>
                    <ul className={`space-y-1.5 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                        {["Analisi dei processi aziendali", "Identificazione delle inefficienze operative", "Prioritizzazione delle esigenze software", "Preparazione di un confronto consulenziale mirato"].map(item => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className={`rounded-2xl border p-7 ${card}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                >
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Cosa otterrai</h3>
                    <div className={`space-y-2.5 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {["Visione chiara dello stato attuale", "Identificazione delle criticità principali", "Linee guida per evoluzione digitale", "Base concreta per confronto consulenziale"].map(item => (
                            <p key={item} className="flex items-start gap-2">
                                <ArrowRight size={13} className="text-amber-600 mt-0.5 shrink-0" />
                                {item}
                            </p>
                        ))}
                    </div>
                    <p className={`mt-5 text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Nessun contatto commerciale viene avviato automaticamente.
                    </p>
                </motion.div>
            </section>

            {/* Security */}
            <motion.section
                className={`relative z-10 max-w-4xl mx-auto mt-12 p-7 rounded-2xl border ${card}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <h2 className={`text-base font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Protezione dei dati</h2>
                </div>
                <div className="space-y-0">
                    {securityItems.map(item => (
                        <SecurityItem key={item.title} title={item.title}>{item.body}</SecurityItem>
                    ))}
                </div>
                <p className={`text-xs mt-5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    Infrastruttura basata su servizi cloud moderni con controlli di accesso avanzati e monitoraggio continuo.
                </p>
            </motion.section>
        </main>
    );
}
