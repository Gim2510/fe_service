import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Bot, Workflow, BrainCircuit, Database,
    BookOpen, ServerCog, ChevronRight, Sparkles,
    Zap, Target, Layers, Search, Library, Gauge,
} from "lucide-react";

/* ── AICapabilities ──────────────────────────────────────────────────────
   Showcases 6 AI capability areas for SMEs. Each card is an expandable
   node in a neural-mesh grid. Scroll-driven reveal, neon accents,
   fully aligned with the cinematic homepage design system.
   ────────────────────────────────────────────────────────────────────── */

interface Capability {
    icon: LucideIcon;
    title: string;
    tagline: string;
    description: string;
    highlights: { icon: LucideIcon; text: string }[];
    color: "cyan" | "violet" | "emerald";
}

const capabilities: Capability[] = [
    {
        icon: Bot,
        title: "Agenti AI",
        tagline: "Collaboratori digitali che lavorano per te",
        description:
            "Agenti autonomi che gestiscono attività ripetitive, rispondono a domande complesse e coordinano processi tra i tuoi reparti — senza pause, senza errori umani.",
        highlights: [
            { icon: Zap, text: "Attivi 24/7 sui tuoi processi critici" },
            { icon: Target, text: "Addestrati sulle regole della tua azienda" },
            { icon: Layers, text: "Si integrano con i sistemi che già usi" },
        ],
        color: "cyan",
    },
    {
        icon: Workflow,
        title: "Workflow Automatizzati",
        tagline: "Processi che si eseguono da soli",
        description:
            "Pipeline end-to-end che collegano i tuoi strumenti: dal trigger iniziale fino al risultato finale. Niente più copia-incolla tra software, niente più passaggi manuali.",
        highlights: [
            { icon: Zap, text: "Trigger automatici da email, CRM, gestionale" },
            { icon: Target, text: "Orchestrazione multi-step con logica condizionale" },
            { icon: Layers, text: "Monitoring in tempo reale di ogni esecuzione" },
        ],
        color: "violet",
    },
    {
        icon: BrainCircuit,
        title: "Modelli su Misura",
        tagline: "L'AI giusta per ogni esigenza",
        description:
            "Non tutti i problemi richiedono lo stesso modello. Valutiamo dimensione, costo e performance per scegliere — o istruire — quello perfetto per il tuo caso.",
        highlights: [
            { icon: Gauge, text: "Da 7B a 70B+ parametri, in base al compito" },
            { icon: Target, text: "Fine-tuning mirato quando serve davvero" },
            { icon: Zap, text: "Ottimizzazione costo/risultato continua" },
        ],
        color: "emerald",
    },
    {
        icon: Database,
        title: "RAG Intelligente",
        tagline: "La tua azienda diventa la fonte",
        description:
            "Alimentiamo l'AI con i tuoi dati reali senza riaddestrare il modello. RAG classico per ricerche puntuali, agentico quando servono ragionamenti multi-step sui tuoi documenti.",
        highlights: [
            { icon: Search, text: "Ricerca semantica su documenti e database" },
            { icon: Layers, text: "Agentic RAG per analisi complesse multi-fonte" },
            { icon: Target, text: "Risposte accurate con citazione delle fonti" },
        ],
        color: "cyan",
    },
    {
        icon: BookOpen,
        title: "Knowledge Base",
        tagline: "Tutta la conoscenza, sempre disponibile",
        description:
            "Strutturiamo il sapere aziendale in una base consultabile dall'AI. Con LLMwiki e Obsidian generiamo contesto ricco che trasforma informazioni sparse in intelligenza operativa.",
        highlights: [
            { icon: Library, text: "Wiki strutturate per contesto AI ottimale" },
            { icon: Zap, text: "Aggiornamento automatico da fonti esistenti" },
            { icon: Search, text: "Ogni dipendente trova risposte in secondi" },
        ],
        color: "violet",
    },
    {
        icon: ServerCog,
        title: "Gestione Continua",
        tagline: "Monitoriamo, ottimizziamo, evolviamo",
        description:
            "Non ci fermiamo al deploy. Gestiamo infrastruttura, aggiorniamo modelli, monitoriamo performance e interveniamo prima che un problema diventi visibile.",
        highlights: [
            { icon: Gauge, text: "Dashboard real-time su costi e performance" },
            { icon: Target, text: "Alert proattivi e intervento rapido" },
            { icon: Layers, text: "Evoluzione continua con le tue esigenze" },
        ],
        color: "emerald",
    },
];

const neonColors = {
    cyan: {
        border: "border-cyan-500/40",
        borderHover: "border-cyan-500/70",
        glow: "shadow-cyan-500/15",
        glowHover: "shadow-cyan-500/30",
        badge: "text-cyan-400",
        badgeLight: "text-cyan-600",
        bg: "bg-cyan-950/40",
        bgLight: "bg-cyan-50",
        iconLight: "text-cyan-700",
        tagBg: "bg-cyan-500/10",
        tagBgLight: "bg-cyan-100",
        tagText: "text-cyan-400",
        tagTextLight: "text-cyan-700",
        highlight: "text-cyan-400",
        highlightLight: "text-cyan-600",
        cornerGrad: "from-cyan-500",
        dotColor: "bg-cyan-500",
        lineBg: "bg-cyan-500/20",
        lineFill: "bg-cyan-500",
    },
    violet: {
        border: "border-violet-500/40",
        borderHover: "border-violet-500/70",
        glow: "shadow-violet-500/15",
        glowHover: "shadow-violet-500/30",
        badge: "text-violet-400",
        badgeLight: "text-violet-600",
        bg: "bg-violet-950/40",
        bgLight: "bg-violet-50",
        iconLight: "text-violet-700",
        tagBg: "bg-violet-500/10",
        tagBgLight: "bg-violet-100",
        tagText: "text-violet-400",
        tagTextLight: "text-violet-700",
        highlight: "text-violet-400",
        highlightLight: "text-violet-600",
        cornerGrad: "from-violet-500",
        dotColor: "bg-violet-500",
        lineBg: "bg-violet-500/20",
        lineFill: "bg-violet-500",
    },
    emerald: {
        border: "border-emerald-500/40",
        borderHover: "border-emerald-500/70",
        glow: "shadow-emerald-500/15",
        glowHover: "shadow-emerald-500/30",
        badge: "text-emerald-400",
        badgeLight: "text-emerald-600",
        bg: "bg-emerald-950/40",
        bgLight: "bg-emerald-50",
        iconLight: "text-emerald-700",
        tagBg: "bg-emerald-500/10",
        tagBgLight: "bg-emerald-100",
        tagText: "text-emerald-400",
        tagTextLight: "text-emerald-700",
        highlight: "text-emerald-400",
        highlightLight: "text-emerald-600",
        cornerGrad: "from-emerald-500",
        dotColor: "bg-emerald-500",
        lineBg: "bg-emerald-500/20",
        lineFill: "bg-emerald-500",
    },
};

/* ── Capability Card ── */

function CapabilityCard({
    cap,
    index,
    isDark,
    isExpanded,
    onToggle,
}: {
    cap: Capability;
    index: number;
    isDark: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const scale = useSpring(useTransform(scrollYProgress, [0, 0.7], [0.88, 1]), sp);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25, 0.7], [0, 0.4, 1]), sp);
    const y = useSpring(useTransform(scrollYProgress, [0, 0.7], [40, 0]), sp);

    const colors = neonColors[cap.color];

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity, y }}
            className="relative"
        >
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg ${colors.glow}`
                        : "bg-white/80 border-slate-200 shadow-sm hover:shadow-md"
                }`}
                onClick={onToggle}
                whileHover={
                    isDark
                        ? { y: -4, transition: { duration: 0.25 } }
                        : { y: -4, transition: { duration: 0.25 } }
                }
                animate={
                    isExpanded && isDark
                        ? { borderColor: "rgba(0,0,0,0)" }
                        : {}
                }
                layout
            >
                {/* Neon corner accent — dark mode */}
                {isDark && (
                    <div
                        className={`absolute top-0 right-0 w-20 h-20 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-bl ${colors.cornerGrad} to-transparent opacity-[0.08] pointer-events-none`}
                    />
                )}

                {/* Animated top border glow on expand */}
                {isDark && isExpanded && (
                    <motion.div
                        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                            cap.color === "cyan"
                                ? "via-cyan-500/60"
                                : cap.color === "violet"
                                ? "via-violet-500/60"
                                : "via-emerald-500/60"
                        } to-transparent`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {/* Icon container */}
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                    isDark ? colors.bg : colors.bgLight
                                }`}
                            >
                                <cap.icon
                                    size={22}
                                    className={isDark ? colors.badge : colors.iconLight}
                                />
                            </div>
                            <div className="min-w-0">
                                <h3
                                    className={`text-base font-semibold ${
                                        isDark ? "text-slate-100" : "text-slate-900"
                                    }`}
                                >
                                    {cap.title}
                                </h3>
                                <span
                                    className={`text-[11px] font-medium ${
                                        isDark ? colors.tagText : colors.tagTextLight
                                    }`}
                                >
                                    {cap.tagline}
                                </span>
                            </div>
                        </div>

                        {/* Expand indicator */}
                        <motion.div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                isDark ? "bg-white/[0.03]" : "bg-slate-100"
                            }`}
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ChevronRight
                                size={14}
                                className={isDark ? "text-slate-500" : "text-slate-400"}
                            />
                        </motion.div>
                    </div>

                    {/* Expanded content */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-5">
                            {/* Description */}
                            <p
                                className={`text-sm leading-relaxed mb-5 ${
                                    isDark ? "text-slate-400" : "text-slate-500"
                                }`}
                            >
                                {cap.description}
                            </p>

                            {/* Highlights */}
                            <div className="flex flex-col gap-2.5">
                                {cap.highlights.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${
                                            isDark
                                                ? "bg-white/[0.02] border border-white/[0.04]"
                                                : "bg-slate-50 border border-slate-100"
                                        }`}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={
                                            isExpanded
                                                ? { opacity: 1, x: 0 }
                                                : { opacity: 0, x: -8 }
                                        }
                                        transition={{
                                            duration: 0.3,
                                            delay: isExpanded ? 0.1 + i * 0.06 : 0,
                                        }}
                                    >
                                        <h.icon
                                            size={14}
                                            className={`shrink-0 ${
                                                isDark
                                                    ? colors.highlight
                                                    : colors.highlightLight
                                            }`}
                                        />
                                        <span
                                            className={`text-[13px] ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            {h.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Subtle pulse indicator when collapsed — hints at expandability */}
                {!isExpanded && (
                    <motion.div
                        className={`absolute bottom-0 inset-x-0 h-0.5 ${colors.lineBg}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        style={{ transformOrigin: "left" }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
}

/* ── Neural Mesh SVG — decorative connector between cards ── */

function NeuralMesh({ isDark }: { isDark: boolean }) {
    return (
        <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="mesh-grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0" />
                        <stop offset="50%" stopColor="rgb(6,182,212)" stopOpacity={isDark ? "0.08" : "0.06"} />
                        <stop offset="100%" stopColor="rgb(6,182,212)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="mesh-grad-violet" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0" />
                        <stop offset="50%" stopColor="rgb(139,92,246)" stopOpacity={isDark ? "0.08" : "0.06"} />
                        <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Horizontal connector lines */}
                <line x1="33.3%" y1="30%" x2="66.6%" y2="30%" stroke="url(#mesh-grad-cyan)" strokeWidth="1" />
                <line x1="33.3%" y1="70%" x2="66.6%" y2="70%" stroke="url(#mesh-grad-cyan)" strokeWidth="1" />
                {/* Vertical connector lines */}
                <line x1="33.3%" y1="20%" x2="33.3%" y2="80%" stroke="url(#mesh-grad-violet)" strokeWidth="1" />
                <line x1="66.6%" y1="20%" x2="66.6%" y2="80%" stroke="url(#mesh-grad-violet)" strokeWidth="1" />
            </svg>
        </div>
    );
}

/* ── Main Section ── */

export function AICapabilities({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY = useSpring(useTransform(scrollYProgress, [0, 0.2], [40, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.13], [0, 1]), sp);

    const handleToggle = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Background accents */}
            {isDark ? (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/10 via-transparent to-transparent pointer-events-none" />
                    {/* Ambient mesh gradient orbs */}
                    <div
                        className="absolute top-[15%] -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
                        }}
                    />
                    <div
                        className="absolute bottom-[10%] -right-16 w-[420px] h-[420px] rounded-full pointer-events-none opacity-[0.025]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0) 70%)",
                        }}
                    />
                </>
            ) : (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent pointer-events-none" />
                    <div
                        className="absolute top-[15%] -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
                        }}
                    />
                    <div
                        className="absolute bottom-[10%] -right-16 w-[420px] h-[420px] rounded-full pointer-events-none opacity-[0.035]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0) 70%)",
                        }}
                    />
                </>
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center max-w-3xl mx-auto"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                            isDark
                                ? "text-violet-400 border-stone-700/40 bg-stone-800/20"
                                : "text-violet-600 border-violet-300 bg-violet-50"
                        }`}
                    >
                        <Sparkles
                            size={12}
                            className={isDark ? "text-violet-400" : "text-violet-500"}
                        />
                        Capacità AI
                    </span>
                    <h2
                        className={`font-fjalla text-xl sm:text-3xl md:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                    >
                        Quello che l'AI può fare
                        <span
                            className={`block mt-1 ${
                                isDark ? "text-violet-400" : "text-violet-600"
                            }`}
                        >
                            per la tua azienda.
                        </span>
                    </h2>
                    <p
                        className={`mt-5 text-lg ${
                            isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                        Agenti, automazioni, modelli su misura — senza che tu debba
                        diventare un esperto. Ecco come trasformiamo la complessità
                        dell'AI in risultati concreti.
                    </p>
                </motion.div>

                {/* Neural mesh connectors (desktop decoration) */}
                <div className="relative">
                    <NeuralMesh isDark={isDark} />

                    {/* Card grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {capabilities.map((cap, i) => (
                            <CapabilityCard
                                key={cap.title}
                                cap={cap}
                                index={i}
                                isDark={isDark}
                                isExpanded={expandedIndex === i}
                                onToggle={() => handleToggle(i)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom tagline */}
                <motion.p
                    className={`mt-14 text-center text-sm ${
                        isDark ? "text-slate-600" : "text-slate-400"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Ogni soluzione è modulare — attivi solo quello che serve,
                    quando serve.
                </motion.p>
            </div>
        </section>
    );
}
