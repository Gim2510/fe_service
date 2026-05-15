import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const problemi = [
    {
        title: "I dati ci sono, ma non li usiamo",
        text: "Ogni reparto lavora per conto suo: Excel, CRM parziali, gestionali non collegati. Le decisioni si prendono a sensazione e il costo di ogni errore si accumula in silenzio.",
        stat: "73%",
        statLabel: "delle PMI non ha una visione unificata dei dati",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    {
        title: "Sprechiamo ore in attività manuali",
        text: "Processi ripetitivi che tolgono tempo alle persone chiave. Ogni ora persa a inserire dati o riconciliare fogli è un'ora tolta alla crescita.",
        stat: "15h",
        statLabel: "a settimana perse in attività ripetitive per dipendente",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    },
    {
        title: "Non sappiamo dove andremo a fine mese",
        text: "Pipeline commerciale opaca, previsioni inaffidabili, opportunità che scivolano via. Senza visibilità, il fatturato diventa una sorpresa.",
        stat: "68%",
        statLabel: "delle previsioni di vendita si rivelano inaccurate",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
    {
        title: "Reagiamo sempre, non anticipiamo mai",
        text: "La relazione con i clienti è gestita a emergenza. Manca un sistema che ti dica cosa succederà prima che succeda.",
        stat: "4x",
        statLabel: "più costoso acquisire un cliente che trattenerlo",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    },
    {
        title: "I costi crescono, i margini no",
        text: "Senza controllo su produzione, acquisti e logistica, è impossibile capire dove si perde margine e quindi impossibile recuperarlo.",
        stat: "22%",
        statLabel: "di margine perso per inefficienze non tracciate",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    },
    {
        title: "Abbiamo software ovunque, integrazione zero",
        text: "Ogni strumento aggiunto ha creato un ecosistema frammentato. Nessuno parla con nessuno, e l'unico collante è il lavoro manuale.",
        stat: "12+",
        statLabel: "software mediamente usati senza integrazione tra loro",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    },
];

const neonColors = [
    { border: "border-red-500/50", glow: "shadow-red-500/20", badge: "text-red-400", bg: "bg-red-950/40", accent: "from-red-500/20" },
    { border: "border-amber-500/50", glow: "shadow-amber-500/20", badge: "text-amber-400", bg: "bg-amber-950/40", accent: "from-amber-500/20" },
    { border: "border-orange-500/50", glow: "shadow-orange-500/20", badge: "text-orange-400", bg: "bg-orange-950/40", accent: "from-orange-500/20" },
    { border: "border-rose-500/50", glow: "shadow-rose-500/20", badge: "text-rose-400", bg: "bg-rose-950/40", accent: "from-rose-500/20" },
    { border: "border-yellow-500/50", glow: "shadow-yellow-500/20", badge: "text-yellow-400", bg: "bg-yellow-950/40", accent: "from-yellow-500/20" },
    { border: "border-pink-500/50", glow: "shadow-pink-500/20", badge: "text-pink-400", bg: "bg-pink-950/40", accent: "from-pink-500/20" },
];

function ProblemCard({ item, index, isDark, progress }: {
    item: typeof problemi[0];
    index: number;
    isDark: boolean;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const sp = { stiffness: 80, damping: 25, mass: 0.6 };
    const colors = neonColors[index % neonColors.length];
    const total = problemi.length;
    const step = 1 / total;

    const slotStart = index * step;
    const slotEnd = slotStart + step;

    const fadeInStart = slotStart;
    const fadeInEnd = slotStart + step * 0.25;
    const fadeOutStart = slotEnd - step * 0.25;
    const fadeOutEnd = slotEnd;

    const opacity = useSpring(
        useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [0, 1, 1, 0]),
        sp
    );
    const scale = useSpring(
        useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [0.88, 1, 1, 0.88]),
        sp
    );
    const xShift = useSpring(
        useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [200, 0, 0, -200]),
        sp
    );
    const rotateZ = useSpring(
        useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [5, 0, 0, -5]),
        sp
    );

    return (
        <motion.div
            className="absolute inset-0"
            style={{
                x: xShift,
                scale,
                opacity,
                rotateZ,
                transformOrigin: "center center",
            }}
        >
            <div
                className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden mx-auto w-full max-w-[1100px] min-h-[280px] grid grid-cols-[1fr_340px] ${
                    isDark
                        ? `bg-[#0E0E0D]/80 ${colors.border} shadow-lg ${colors.glow}`
                        : `bg-white border-${colors.border.split("-")[1]}-500/60 shadow-md shadow-stone-200/50`
                }`}
            >
                {isDark && (
                    <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${colors.accent} to-transparent opacity-40`} />
                )}

                <div className="p-10 flex flex-col justify-center gap-6">
                    <div className="flex items-start gap-6">
                        <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                            isDark ? colors.bg : `bg-${colors.border.split("-")[1]}-50`
                        }`}>
                            <span className={`font-mono text-3xl font-bold tracking-tight ${
                                isDark ? colors.badge : `text-${colors.border.split("-")[1]}-600`
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

                        <div className="flex-1 min-w-0">
                            <h3 className={`text-2xl font-semibold leading-snug mb-3 ${
                                isDark ? "text-slate-100" : "text-slate-800"
                            }`}>
                                {item.title}
                            </h3>
                            <p className={`text-base leading-relaxed ${
                                isDark ? "text-slate-400" : "text-slate-600"
                            }`}>
                                {item.text}
                            </p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-4 pt-4 border-t ${
                        isDark ? "border-stone-800" : "border-slate-100"
                    }`}>
                        <span className={`text-3xl font-bold font-mono ${colors.badge}`}>
                            {item.stat}
                        </span>
                        <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                            {item.statLabel}
                        </span>
                    </div>
                </div>

                <div className="relative h-full min-h-[280px]">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                    />
                    {isDark && (
                        <div className="absolute inset-0 bg-gradient-to-l from-[#0E0E0D]/60 to-transparent" />
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function ScrollProblems({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };

    const headerScale = useSpring(useTransform(scrollYProgress, [0, 0.03], [0.98, 1]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.03], [0.95, 1]), sp);

    return (
        <section
            ref={containerRef}
            className="relative"
            style={{ height: "300vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {isDark && (
                    <>
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-transparent to-transparent pointer-events-none" />
                    </>
                )}

                <motion.div
                    className="mx-auto max-w-7xl px-6 sm:px-8 mb-12"
                    style={{ scale: headerScale, opacity: headerOpacity }}
                >
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        isDark
                            ? "text-red-400 border-stone-700/40 bg-stone-800/20"
                            : "text-red-600 border-red-300 bg-red-50"
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Ti riconosci?
                    </span>
                    <h2 className={`font-fjalla text-3xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non sono problemi tecnici.{" "}
                        <span className={isDark ? "text-red-400" : "text-red-600"}>
                            Sono problemi di business.
                        </span>
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed max-w-xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Ogni PMI che incontriamo ha una storia diversa, ma racconta sempre le stesse frustrazioni.
                    </p>
                </motion.div>

                <div className="relative h-[320px] w-full overflow-visible" style={{ perspective: "1200px" }}>
                    {problemi.map((item, index) => (
                        <ProblemCard
                            key={item.title}
                            item={item}
                            index={index}
                            isDark={isDark}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                <div className="mx-auto max-w-7xl px-6 sm:px-8 mt-10">
                    <div className={`h-0.5 rounded-full max-w-xs ${isDark ? "bg-stone-800" : "bg-slate-200"}`}>
                        <motion.div
                            className="h-full rounded-full bg-red-500"
                            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
