import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { FloatingShapes, shapesCyan, lightShapes } from "./FloatingShapes.tsx";

const problemi = [
    {
        title: "I dati ci sono, ma non li usiamo",
        text: "Ogni reparto lavora per conto suo: Excel, CRM parziali, gestionali non collegati. Le decisioni si prendono a sensazione e il costo di ogni errore si accumula in silenzio.",
        stat: "73%",
        statLabel: "delle PMI non ha una visione unificata dei dati",
    },
    {
        title: "Sprechiamo ore in attivit\u00e0 manuali",
        text: "Processi ripetitivi che tolgono tempo alle persone chiave. Ogni ora persa a inserire dati o riconciliare fogli \u00e8 un\u2019ora tolta alla crescita.",
        stat: "15h",
        statLabel: "a settimana perse in attivit\u00e0 ripetitive per dipendente",
    },
    {
        title: "Non sappiamo dove andremo a fine mese",
        text: "Pipeline commerciale opaca, previsioni inaffidabili, opportunit\u00e0 che scivolano via. Senza visibilit\u00e0, il fatturato diventa una sorpresa.",
        stat: "68%",
        statLabel: "delle previsioni di vendita si rivelano inaccurate",
    },
    {
        title: "Reagiamo sempre, non anticipiamo mai",
        text: "La relazione con i clienti \u00e8 gestita a emergenza. Manca un sistema che ti dica cosa succeder\u00e0 prima che succeda.",
        stat: "4x",
        statLabel: "pi\u00f9 costoso acquisire un cliente che trattenerlo",
    },
    {
        title: "I costi crescono, i margini no",
        text: "Senza controllo su produzione, acquisti e logistica, \u00e8 impossibile capire dove si perde margine e quindi impossibile recuperarlo.",
        stat: "22%",
        statLabel: "di margine perso per inefficienze non tracciate",
    },
    {
        title: "Abbiamo software ovunque, integrazione zero",
        text: "Ogni strumento aggiunto ha creato un ecosistema frammentato. Nessuno parla con nessuno, e l\u2019unico collante \u00e8 il lavoro manuale.",
        stat: "12+",
        statLabel: "software mediamente usati senza integrazione tra loro",
    },
];

const neonColors = [
    { border: "border-sky-500/50", glow: "shadow-sky-500/20", badge: "text-sky-400", bg: "bg-sky-950/40", dot: "border-sky-500", line: "from-sky-500", statColor: "text-sky-400", lightBadge: "text-sky-600", lightDot: "border-sky-500", lightStat: "text-sky-600", lightBg: "bg-sky-50" },
    { border: "border-emerald-500/50", glow: "shadow-emerald-500/20", badge: "text-emerald-400", bg: "bg-emerald-950/40", dot: "border-emerald-500", line: "from-emerald-500", statColor: "text-emerald-400", lightBadge: "text-emerald-600", lightDot: "border-emerald-500", lightStat: "text-emerald-600", lightBg: "bg-emerald-50" },
    { border: "border-violet-500/50", glow: "shadow-violet-500/20", badge: "text-violet-400", bg: "bg-violet-950/40", dot: "border-violet-500", line: "from-violet-500", statColor: "text-violet-400", lightBadge: "text-violet-600", lightDot: "border-violet-500", lightStat: "text-violet-600", lightBg: "bg-violet-50" },
    { border: "border-sky-500/50", glow: "shadow-sky-500/20", badge: "text-sky-400", bg: "bg-sky-950/40", dot: "border-sky-500", line: "from-sky-500", statColor: "text-sky-400", lightBadge: "text-sky-600", lightDot: "border-sky-500", lightStat: "text-sky-600", lightBg: "bg-sky-50" },
    { border: "border-emerald-500/50", glow: "shadow-emerald-500/20", badge: "text-emerald-400", bg: "bg-emerald-950/40", dot: "border-emerald-500", line: "from-emerald-500", statColor: "text-emerald-400", lightBadge: "text-emerald-600", lightDot: "border-emerald-500", lightStat: "text-emerald-600", lightBg: "bg-emerald-50" },
    { border: "border-violet-500/50", glow: "shadow-violet-500/20", badge: "text-violet-400", bg: "bg-violet-950/40", dot: "border-violet-500", line: "from-violet-500", statColor: "text-violet-400", lightBadge: "text-violet-600", lightDot: "border-violet-500", lightStat: "text-violet-600", lightBg: "bg-violet-50" },
];

function ProblemCard({ item, index, isDark }: {
    item: typeof problemi[0];
    index: number;
    isDark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const colors = neonColors[index % neonColors.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm transition-all duration-300 p-5 sm:p-8 ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg hover:shadow-xl`
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
                }`}
                whileHover={{
                    y: -6,
                    boxShadow: isDark
                        ? `0 0 30px rgba(var(--tw-shadow-color), 0.15)`
                        : undefined,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {isDark && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            boxShadow: `0 0 40px -10px currentColor`,
                            color: colors.badge.startsWith("text-")
                                ? `var(--color-${colors.badge.replace("text-", "")})`
                                : undefined,
                        }}
                    />
                )}

                {/* Top accent line */}
                {isDark && (
                    <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${colors.line} to-transparent opacity-40`} />
                )}

                {/* Header row: badge + title */}
                <div className="flex items-center gap-4 sm:gap-5 mb-4">
                    <div className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                        isDark ? colors.bg : colors.lightBg
                    }`}>
                        <span className={`font-mono text-xl sm:text-2xl font-bold tracking-tight ${
                            isDark ? colors.badge : colors.lightBadge
                        }`}>
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        {isDark && (
                            <motion.div
                                className={`absolute inset-0 rounded-2xl border-2 ${colors.border}`}
                                animate={{ opacity: [0.2, 0.6, 0.2] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                            />
                        )}
                    </div>

                    <h3 className={`flex-1 text-base sm:text-xl font-semibold leading-snug ${
                        isDark ? colors.badge : colors.lightBadge
                    }`}>
                        {item.title}
                    </h3>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-5 ml-16 sm:ml-[4.5rem] ${
                    isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                    {item.text}
                </p>

                {/* Divider */}
                <div className={`border-t mb-5 ml-16 sm:ml-[4.5rem] ${
                    isDark ? "border-stone-800/40" : "border-slate-100"
                }`} />

                {/* Stat highlight */}
                <div className="flex items-center gap-3 sm:gap-4 ml-16 sm:ml-[4.5rem]">
                    <span className={`text-2xl sm:text-3xl font-bold font-mono ${
                        isDark ? colors.statColor : colors.lightStat
                    }`}>
                        {item.stat}
                    </span>
                    <span className={`text-xs sm:text-sm leading-tight ${
                        isDark ? "text-slate-500" : "text-slate-500"
                    }`}>
                        {item.statLabel}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function TimelineProblems({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY       = useSpring(useTransform(scrollYProgress, [0, 0.2], [35, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.12], [0, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Background decorations */}
            {isDark ? (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/10 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
                        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.6) 0%, rgba(14,165,233,0) 70%)" }} />
                    <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
                        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)" }} />
                    <div className="absolute inset-0 hidden md:block pointer-events-none">
                        <FloatingShapes shapes={shapesCyan} isDark={true} />
                    </div>
                    <div className="absolute inset-0 md:hidden pointer-events-none">
                        <FloatingShapes shapes={[shapesCyan[0]]} isDark={true} mobileScale={0.5} />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
                        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.6) 0%, rgba(14,165,233,0) 70%)" }} />
                    <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.045]"
                        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)" }} />
                    <div className="absolute inset-0 hidden md:block pointer-events-none">
                        <FloatingShapes shapes={lightShapes(shapesCyan)} isDark={false} />
                    </div>
                    <div className="absolute inset-0 md:hidden pointer-events-none">
                        <FloatingShapes shapes={lightShapes([shapesCyan[0]])} isDark={false} mobileScale={0.5} />
                    </div>
                </>
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                {/* Header */}
                <motion.div
                    className="mb-12 sm:mb-16 max-w-2xl"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <span className={`inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border ${
                        isDark
                            ? "text-sky-400 border-stone-700/40 bg-stone-800/20"
                            : "text-sky-600 border-sky-300 bg-sky-50"
                    }`}>
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-500 animate-pulse" />
                        Ti riconosci?
                    </span>
                    <h2 className={`font-fjalla text-lg sm:text-3xl md:text-5xl font-semibold leading-tight mt-2 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non sono problemi tecnici.{" "}
                        <span className={isDark ? "text-sky-400" : "text-sky-600"}>
                            Sono problemi di business.
                        </span>
                    </h2>
                    <p className={`mt-2 md:mt-4 text-xs md:text-base leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Ogni PMI che incontriamo ha una storia diversa, ma racconta sempre le stesse frustrazioni.
                    </p>
                </motion.div>

                {/* Problems grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {problemi.map((item, i) => (
                        <ProblemCard
                            key={item.title}
                            item={item}
                            index={i}
                            isDark={isDark}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
