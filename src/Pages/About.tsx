import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext.tsx";
import { CheckCircle2, Zap, Shield, BarChart2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Components/Badge.tsx";
import { GlowButton } from "../Components/Home/GlowButton.tsx";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const tecnologie = [
    {
        category: "CRM & Sales",
        items: ["HubSpot", "Salesforce", "CRM custom su misura"],
        color: "#6B8E7B",
    },
    {
        category: "ERP & Gestionali",
        items: ["SAP Business One", "Odoo", "Fatture in Cloud", "Gestionale 1"],
        color: "#60A5FA",
    },
    {
        category: "Data & Analytics",
        items: ["Power BI", "Metabase", "Google Looker Studio", "Dashboard custom"],
        color: "#4ADE80",
    },
    {
        category: "Automazione",
        items: ["Make (ex Integromat)", "n8n", "Zapier", "Workflow custom"],
        color: "#A78BFA",
    },
    {
        category: "Intelligenza Artificiale",
        items: ["OpenAI API", "LangChain", "RAG su documenti aziendali", "Modelli predittivi custom"],
        color: "#F87171",
    },
    {
        category: "Infrastruttura",
        items: ["AWS", "Azure", "Docker & CI/CD", "Architetture serverless"],
        color: "#6B8E7B",
    },
];

const valori = [
    {
        icon: BarChart2,
        title: "Misurazione prima di tutto",
        text: "Non iniziamo nessun progetto senza KPI definiti. Ogni intervento ha un punto di partenza misurabile e un obiettivo verificabile. Se non possiamo misurarlo, non lo proponiamo.",
    },
    {
        icon: Shield,
        title: "Proprietà del cliente",
        text: "Il sistema che costruiamo è tuo. Ti formiamo, ti documentiamo tutto, ti lasciamo in grado di gestirlo autonomamente. Non creiamo dipendenze: creiamo competenza interna.",
    },
    {
        icon: Zap,
        title: "Semplicità operativa",
        text: "La complessità tecnologica resta dietro le quinte. Quello che vede il tuo team deve essere chiaro, usabile e adottato davvero — altrimenti non serve a niente.",
    },
    {
        icon: Users,
        title: "Affiancamento reale",
        text: "Non consegniamo e sparamo. Restiamo durante il rollout, formiamo le persone, misuriamo i primi risultati e aggiustiamo il tiro. Il progetto non finisce con il go-live.",
    },
];

const metodoDettaglio = [
    {
        step: "01",
        title: "Diagnosi operativa",
        duration: "1–2 settimane",
        description: "Mappatura completa dei processi esistenti, audit degli strumenti in uso e analisi dei flussi di dati. Identifichiamo i colli di bottiglia, le duplicazioni e i punti di perdita di margine con dati concreti — non supposizioni.",
        output: "Report diagnostico con priorità di intervento e stima dell'impatto economico recuperabile.",
    },
    {
        step: "02",
        title: "Progettazione su misura",
        duration: "2–4 settimane",
        description: "Definiamo l'architettura della soluzione: quali strumenti integrare, quali costruire da zero, quali eliminare. Ogni scelta è motivata dal ROI atteso e validata con il team operativo prima di scrivere una riga di codice.",
        output: "Blueprint tecnico, piano di implementazione a fasi, KPI target per ogni intervento.",
    },
    {
        step: "03",
        title: "Implementazione e attivazione",
        duration: "4–12 settimane",
        description: "Costruiamo, integriamo e testiamo in ambiente reale. Affiancamento diretto al team durante il rollout, formazione operativa e documentazione completa. Non rilasciamo nulla che non sia stabile e adottato.",
        output: "Sistema operativo, team formato, dashboard attive, piano di monitoraggio post-lancio.",
    },
    {
        step: "04",
        title: "Monitoraggio e ottimizzazione",
        duration: "Continuativo",
        description: "Nelle prime settimane post-lancio monitoriamo i KPI, raccogliamo feedback dal team e ottimizziamo dove necessario. L'obiettivo è che il sistema migliori nel tempo, non che venga abbandonato dopo il primo mese.",
        output: "Report mensili, sessioni di ottimizzazione, supporto prioritario al team.",
    },
];

export function About() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const card = isDark
        ? "bg-[#1C1C1A]/80 border-stone-800/20"
        : "bg-white border-slate-200";

    return (
        <main className={`min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>

            {/* Dot grid */}
            <div
                className={`fixed inset-0 pointer-events-none ${isDark ? "opacity-[0.08]" : "opacity-[0.14]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-5xl mx-auto px-6 sm:px-8 pt-32 pb-24 space-y-32">

                {/* ── Hero ── */}
                <section className="max-w-3xl">
                    <motion.div {...fadeUp(0)}>
                        <Badge label="Chi siamo" color="sky" theme={theme} />
                        <h1 className={`font-fjalla text-5xl sm:text-6xl font-semibold leading-tight mt-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Colmiamo il gap tra
                            <span className={` block ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                                tecnologia enterprise e PMI.
                            </span>
                        </h1>
                        <p className={`mt-6 text-lg leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            AxiomLab è una realtà di consulenza digitale specializzata nelle piccole
                            e medie imprese italiane. Non siamo un'agenzia di sviluppo, non siamo un system
                            integrator, non siamo vendor di prodotti. Siamo il partner operativo che ti aiuta
                            a capire dove perdi efficienza e a recuperarla — con soluzioni costruite
                            specificamente per come lavora la tua azienda.
                        </p>
                    </motion.div>
                </section>

                {/* ── La nostra storia ── */}
                <section>
                    <motion.div {...fadeUp(0)} className="mb-12">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            La nostra storia
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Perché esiste AxiomLab
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div {...fadeUp(0.05)} className={`rounded-2xl border backdrop-blur-sm p-8 ${isDark ? `${card} shadow-lg shadow-sky-700/5` : `${card} shadow-lg shadow-sky-700/3`}`}>
                            <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                AxiomLab nasce dall'incontro di due competenze complementari e di una
                                frustrazione condivisa: le grandi aziende hanno accesso a metodologie,
                                strumenti e risorse che le PMI non possono permettersi — eppure i problemi
                                operativi sono esattamente gli stessi.
                            </p>
                            <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                Da una parte c'è chi ha costruito il suo background come sviluppatore
                                fullstack in startup come Norma's Teaching, e oggi è consulente backend
                                e DevOps per Avvale, seguendo progetti di grandi player come Eni (Open-ES).
                                Dall'altra c'è chi si specializza in AI e automazioni complesse con
                                formazione diretta dai migliori provider del settore, tra cui Anthropic.
                            </p>
                        </motion.div>

                        <motion.div {...fadeUp(0.1)} className={`rounded-2xl border backdrop-blur-sm p-8 ${isDark ? `${card} shadow-lg shadow-sky-700/5` : `${card} shadow-lg shadow-sky-700/3`}`}>
                            <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                Il risultato è un team piccolo ma estremamente efficace: niente burocrazia,
                                niente intermediari, due persone che conoscono il tuo progetto dalla diagnosi
                                al risultato. I consulenti tradizionali propongono soluzioni standardizzate.
                                I vendor vendono prodotti che richiedono mesi di implementazione. Noi facciamo
                                diversamente.
                            </p>
                            <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                Partiamo dalla diagnosi dei processi reali, progettiamo soluzioni che si
                                integrano con ciò che già esiste, e restiamo finché il team adotta davvero
                                il cambiamento. Non consegniamo e spariremo: l'affiancamento post-lancio
                                è parte del metodo, non un servizio opzionale.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Metodo in dettaglio ── */}
                <section>
                    <motion.div {...fadeUp(0)} className="mb-12">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            Il metodo
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Come lavoriamo, nel dettaglio
                        </h2>
                        <p className={`mt-4 text-base max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Ogni progetto segue quattro fasi con deliverable chiari e tempistiche definite.
                            Nessuna sorpresa, nessun scope creep silenzioso.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {metodoDettaglio.map((m, i) => (
                            <motion.div
                                key={m.step}
                                {...fadeUp(i * 0.08)}
                                className={`rounded-2xl border backdrop-blur-sm p-8 ${isDark ? `${card} shadow-lg shadow-sky-700/5` : `${card} shadow-lg shadow-sky-700/3`}`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                                    <div className="shrink-0">
                                        <span className={`font-mono text-5xl font-bold tracking-tight ${
                                            isDark ? "text-stone-800/60" : "text-sky-300"
                                        }`}>
                                            {m.step}
                                        </span>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                                {m.title}
                                            </h3>
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                                                isDark
                                                    ? "border-stone-700/40 text-slate-500 bg-stone-800/20"
                                                    : "border-sky-200 text-sky-700 bg-sky-50"
                                            }`}>
                                                {m.duration}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                            {m.description}
                                        </p>
                                        <div className={`flex items-start gap-2 pt-1`}>
                                            <CheckCircle2 size={14} className="text-sky-600 shrink-0 mt-0.5" />
                                            <span className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                                Output: {m.output}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Tecnologie ── */}
                <section>
                    <motion.div {...fadeUp(0)} className="mb-12">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            Stack tecnologico
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Le tecnologie che usiamo
                        </h2>
                        <p className={`mt-4 text-base max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Non siamo legati a nessun vendor. Scegliamo gli strumenti giusti per il contesto
                            specifico — non quelli più convenienti per noi o più facili da vendere.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tecnologie.map((t, i) => (
                            <motion.div
                                key={t.category}
                                {...fadeUp(i * 0.07)}
                                className={`rounded-2xl border backdrop-blur-sm p-6 space-y-4 ${isDark ? `${card} shadow-lg shadow-sky-700/5` : `${card} shadow-lg shadow-sky-700/3`}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                                    <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                        {t.category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {t.items.map(item => (
                                        <span
                                            key={item}
                                            className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                                                isDark
                                                    ? "border-stone-700/40 text-slate-400 bg-stone-800/30"
                                                    : "border-slate-200 text-slate-600 bg-slate-50"
                                            }`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Valori ── */}
                <section>
                    <motion.div {...fadeUp(0)} className="mb-12">
                        <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            I nostri principi
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Cosa ci guida ogni giorno
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {valori.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div
                                    key={v.title}
                                    {...fadeUp(i * 0.08)}
                                    className={`rounded-2xl border backdrop-blur-sm p-8 space-y-4 ${isDark ? `${card} shadow-lg shadow-sky-700/5` : `${card} shadow-lg shadow-sky-700/3`}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                        isDark ? "bg-sky-700/10" : "bg-sky-50"
                                    }`}>
                                        <Icon size={18} className={isDark ? "text-sky-500" : "text-sky-700"} />
                                    </div>
                                    <h3 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                        {v.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                        {v.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── CTA ── */}
                <motion.section
                    {...fadeUp(0)}
                    className={`rounded-2xl border backdrop-blur-sm p-10 sm:p-14 text-center flex flex-col items-center gap-6 ${
                        isDark
                            ? "bg-gradient-to-br from-[#0C0C0B] via-[#161410] to-[#0C0C0B] border-stone-800/20 shadow-lg shadow-sky-700/10"
                            : "bg-gradient-to-br from-[#FDFAF4] via-[#F2E8D5] to-[#FDFAF4] border-sky-200/60 shadow-lg shadow-sky-700/5"
                    }`}
                >
                    <Badge label="Inizia da qui" color="emerald" theme={theme} />
                    <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold max-w-xl leading-tight ${isDark ? "text-slate-100" : "text-stone-900"}`}>
                        Vuoi capire dove interveniamo sulla tua azienda?
                    </h2>
                    <p className={`text-base max-w-lg ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                        Completa il nostro assessment gratuito in 10 minuti. Ricevi un report
                        personalizzato con le priorità di intervento per il tuo contesto specifico.
                    </p>
                    <GlowButton onClick={() => navigate("/survey/start")}>
                        Ottieni il tuo report gratuito
                    </GlowButton>
                    <span className={`text-xs ${isDark ? "text-slate-600" : "text-stone-400"}`}>
                        10–15 minuti · nessun impegno · nessuna carta di credito
                    </span>
                </motion.section>

            </div>
        </main>
    );
}
