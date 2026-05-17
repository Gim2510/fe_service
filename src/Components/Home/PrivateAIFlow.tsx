import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Fragment, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Database, FileText, Mail, BarChart3,
    HardDrive, Cpu, Settings, Server,
    Workflow, MessageSquare, Bot,
    ShieldCheck, Lock, ChevronDown, ArrowRight,
    CloudOff, Eye,
} from "lucide-react";

interface FlowItem {
    icon: LucideIcon;
    label: string;
    sublabel: string;
}

const dataSources: FlowItem[] = [
    { icon: Database, label: "CRM", sublabel: "Pipeline vendite" },
    { icon: FileText, label: "Gestionale", sublabel: "ERP e ordini" },
    { icon: Mail, label: "Comunicazioni", sublabel: "Email e ticket" },
    { icon: BarChart3, label: "Report", sublabel: "Dati operativi" },
];

const infraSteps: FlowItem[] = [
    { icon: HardDrive, label: "Ingestione", sublabel: "Raccolta sicura" },
    { icon: Cpu, label: "Training", sublabel: "Apprendimento mirato" },
    { icon: Settings, label: "Fine-tuning", sublabel: "Calibrazione" },
    { icon: Server, label: "Deploy", sublabel: "Server privato" },
];

const aiAgents: FlowItem[] = [
    { icon: BarChart3, label: "Previsioni", sublabel: "Analisi predittiva" },
    { icon: Workflow, label: "Automazione", sublabel: "Processi ripetitivi" },
    { icon: MessageSquare, label: "Assistente", sublabel: "Chat AI interno" },
    { icon: Bot, label: "Agenti", sublabel: "Task autonomi" },
];

const guarantees = [
    { icon: CloudOff, title: "Zero cloud esterni", desc: "Il modello gira solo sulla tua macchina. Nessun fornitore terzo tocca i tuoi dati." },
    { icon: Lock, title: "Proprietà assoluta", desc: "Le tue informazioni non escono mai dal tuo perimetro. Per nessun motivo." },
    { icon: Eye, title: "Controllo totale", desc: "Accesso, audit e configurazione: sempre e solo in mano tua." },
];

const neonGuaranteeColors = [
    { border: "border-cyan-500/50", glow: "shadow-cyan-500/15", badge: "text-cyan-400", bg: "bg-cyan-950/40" },
    { border: "border-violet-500/50", glow: "shadow-violet-500/15", badge: "text-violet-400", bg: "bg-violet-950/40" },
    { border: "border-emerald-500/50", glow: "shadow-emerald-500/15", badge: "text-emerald-400", bg: "bg-emerald-950/40" },
];

function FlowChip({ item, isDark, delay }: { item: FlowItem; isDark: boolean; delay: number }) {
    return (
        <motion.div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isDark ? "bg-[#0E0E0D]/70 border border-cyan-500/30 hover:border-cyan-500/60 shadow-sm shadow-cyan-500/10" : "bg-white/80 border border-sky-400/50 hover:border-sky-400/80 shadow-sm shadow-sky-400/15"
            }`}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-cyan-950/40" : "bg-sky-50"}`}>
                <item.icon size={18} className={isDark ? "text-cyan-400" : "text-sky-700"} />
            </div>
            <div className="min-w-0">
                <div className={`text-sm font-semibold truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>{item.label}</div>
                <div className={`text-[11px] truncate ${isDark ? "text-slate-500" : "text-slate-500"}`}>{item.sublabel}</div>
            </div>
        </motion.div>
    );
}

function FlowConnector({ isDark }: { isDark: boolean }) {
    return (
        <div className="flex justify-center gap-5 py-4" aria-hidden>
            {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ y: [0, 5, 0], opacity: [0.25, 0.8, 0.25] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}>
                    <ChevronDown size={18} className={isDark ? "text-cyan-400/50" : "text-sky-600/50"} />
                </motion.div>
            ))}
        </div>
    );
}

function LayerLabel({ label, sublabel, isDark }: { label: string; sublabel: string; isDark: boolean }) {
    return (
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <div className={`h-px w-8 ${isDark ? "bg-cyan-500/30" : "bg-sky-600/20"}`} />
            <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${isDark ? "text-cyan-400/60" : "text-sky-700/50"}`}>{label}</span>
            <span className={`text-[11px] ${isDark ? "text-slate-600" : "text-slate-400"}`}> , {sublabel}</span>
        </motion.div>
    );
}

export function PrivateAIFlow({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY = useSpring(useTransform(scrollYProgress, [0, 0.2], [40, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.13], [0, 1]), sp);
    const diagramY = useSpring(useTransform(scrollYProgress, [0.06, 0.3], [50, 0]), sp);
    const diagramOpacity = useSpring(useTransform(scrollYProgress, [0.06, 0.2], [0, 1]), sp);
    const diagramScale = useSpring(useTransform(scrollYProgress, [0.06, 0.3], [0.97, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}
            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                <motion.div className="mb-16 text-center max-w-3xl mx-auto" style={{ y: headerY, opacity: headerOpacity }}>
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDark ? "text-cyan-400 border-stone-700/40 bg-stone-800/20" : "text-cyan-600 border-cyan-300 bg-cyan-50"}`}><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />AI privata</span>
                    <h2 className={`font-fjalla text-xl sm:text-3xl md:text-4xl font-semibold leading-tight mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        I tuoi dati restano tuoi.<span className={`block mt-1 ${isDark ? "text-cyan-400" : "text-sky-700"}`}>Sempre.</span>
                    </h2>
                    <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>Modelli AI che girano sulla tua infrastruttura. Agenti costruiti sui tuoi processi. Nessun dato condiviso con terze parti , mai.</p>
                </motion.div>

                <motion.div className="relative mb-16" style={{ y: diagramY, opacity: diagramOpacity, scale: diagramScale }}>
                    <div className={`relative rounded-3xl border px-5 sm:px-10 pt-12 pb-10 ${isDark ? "border-cyan-500/40 bg-cyan-950/30 shadow-lg shadow-cyan-500/10" : "border-sky-600/30 bg-sky-50/70 shadow-md shadow-sky-100/50"}`}>
                        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                            <div className={isDark ? "opacity-[0.02]" : "opacity-[0.04]"} style={{ width: "100%", height: "100%", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect x='0' y='0' width='20' height='20' fill='none' stroke='%2310B981' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "20px 20px" }} />
                        </div>
                        <motion.div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${isDark ? "bg-[#0E0E0D] text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10" : "bg-[#FAFAF8] text-sky-700 border border-sky-600/30"}`} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Lock size={12} /> Il tuo perimetro sicuro
                        </motion.div>

                        <div className="relative z-10">
                            <LayerLabel label="Le tue fonti dati" sublabel="Sistemi già in uso nella tua azienda" isDark={isDark} />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">{dataSources.map((item, i) => (<FlowChip key={item.label} item={item} isDark={isDark} delay={i * 0.08} />))}</div>
                        </div>
                        <FlowConnector isDark={isDark} />

                        <div className="relative z-10">
                            <LayerLabel label="Elaborazione privata" sublabel="On-premise o VPS dedicato" isDark={isDark} />
                            <div className={`rounded-2xl p-4 mt-4 ${isDark ? "bg-cyan-950/[0.08] border border-cyan-500/10" : "bg-sky-50/60 border border-sky-200/40"}`}>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {infraSteps.map((item, i) => (
                                        <Fragment key={item.label}>
                                            <FlowChip item={item} isDark={isDark} delay={0.15 + i * 0.1} />
                                            {i < infraSteps.length - 1 && (<motion.div className="hidden sm:flex" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}><ArrowRight size={16} className={isDark ? "text-cyan-400/40" : "text-sky-600/40"} /></motion.div>)}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <FlowConnector isDark={isDark} />

                        <div className="relative z-10">
                            <LayerLabel label="Agenti AI su misura" sublabel="Costruiti per le tue operazioni" isDark={isDark} />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">{aiAgents.map((item, i) => (<FlowChip key={item.label} item={item} isDark={isDark} delay={0.3 + i * 0.08} />))}</div>
                        </div>

                        <motion.div className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${isDark ? "bg-[#0E0E0D] text-cyan-400/70 border border-cyan-500/20" : "bg-[#FAFAF8] text-sky-600/70 border border-sky-600/20"}`} initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                            <ShieldCheck size={12} /> Nessun dato esce da questo perimetro
                        </motion.div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {guarantees.map((g, i) => {
                        const colors = neonGuaranteeColors[i % neonGuaranteeColors.length];
                        return (
                            <motion.div key={g.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}>
                                <motion.div className={`relative rounded-2xl border backdrop-blur-sm p-6 h-full transition-all duration-300 ${isDark ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg ${colors.glow}` : "bg-white/80 border-sky-400/50 shadow-sm shadow-sky-400/15 hover:border-sky-400/80 hover:shadow-md hover:shadow-sky-400/25"}`} whileHover={isDark ? { y: -6, borderColor: colors.border.replace("/50", "/80") } : { y: -6 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                                    {isDark && (<div className={`absolute top-0 right-0 w-14 h-14 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-15 ${colors.badge}`} />)}
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${isDark ? colors.bg : "bg-sky-50"}`}><g.icon size={20} className={isDark ? colors.badge : "text-sky-700"} /></div>
                                    <h3 className={`text-base font-semibold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>{g.title}</h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{g.desc}</p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
