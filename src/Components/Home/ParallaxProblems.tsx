import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { GlassCard } from "./GlassCard.tsx";

const problemi = [
    { title: "«I dati ci sono, ma non li usiamo»", text: "Ogni reparto lavora per conto suo: Excel, CRM parziali, gestionali non collegati. Le decisioni si prendono a sensazione — e il costo di ogni errore si accumula in silenzio." },
    { title: "«Sprechiamo ore in attività manuali»", text: "Processi ripetitivi che tolgono tempo alle persone chiave. Ogni ora persa a inserire dati o riconciliare fogli è un'ora tolta alla crescita." },
    { title: "«Non sappiamo dove andremo a fine mese»", text: "Pipeline commerciale opaca, previsioni inaffidabili, opportunità che scivolano via. Senza visibilità, il fatturato diventa una sorpresa." },
    { title: "«Reagiamo sempre, non anticipiamo mai»", text: "La relazione con i clienti è gestita a emergenza. Manca un sistema che ti dica cosa succederà prima che succeda." },
    { title: "«I costi crescono, i margini no»", text: "Senza controllo su produzione, acquisti e logistica, è impossibile capire dove si perde margine — e quindi impossibile recuperarlo." },
    { title: "«Abbiamo software ovunque, integrazione zero»", text: "Ogni strumento aggiunto ha creato un ecosistema frammentato. Nessuno parla con nessuno, e l'unico collante è il lavoro manuale." },
];

export function ParallaxProblems() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Background layers
    const bgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const gradientX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    // Decorative floating elements
    const deco1Y = useTransform(scrollYProgress, [0, 1], [-120, 120]);
    const deco1X = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const deco1Rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const deco2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const deco2X = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const deco2Rotate = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const deco3Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const deco3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    // Header parallax
    const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
    const headerScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

    // Cards - each with unique depth and movement
    const cardY0 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const cardX0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const cardRotate0 = useTransform(scrollYProgress, [0, 1], [2, -2]);

    const cardY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const cardX1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const cardRotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);

    const cardY2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const cardX2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const cardRotate2 = useTransform(scrollYProgress, [0, 1], [1, -1]);

    const cardY3 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const cardX3 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const cardRotate3 = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    const cardY4 = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const cardX4 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const cardRotate4 = useTransform(scrollYProgress, [0, 1], [3, -3]);

    const cardY5 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const cardX5 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    const cardRotate5 = useTransform(scrollYProgress, [0, 1], [-1, 1]);

    const cardTransforms = [
        { y: cardY0, x: cardX0, rotate: cardRotate0 },
        { y: cardY1, x: cardX1, rotate: cardRotate1 },
        { y: cardY2, x: cardX2, rotate: cardRotate2 },
        { y: cardY3, x: cardX3, rotate: cardRotate3 },
        { y: cardY4, x: cardX4, rotate: cardRotate4 },
        { y: cardY5, x: cardX5, rotate: cardRotate5 },
    ];

    // Staggered card opacity reveals
    const cardOpacities = problemi.map((_, i) => {
        const start = 0.1 + i * 0.08;
        const end = start + 0.2;
        return useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);
    });

    return (
        <section ref={containerRef} className="relative py-24 sm:py-36 overflow-hidden">
            {/* Background layer - slow parallax */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY, opacity: bgOpacity }}
            >
                <div className={`absolute inset-0 ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`} />
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ x: gradientX }}
                >
                    <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-sky-700/5" />
                    <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-600/5" />
                </motion.div>
            </motion.div>

            {/* Decorative floating shapes */}
            <motion.div
                className="absolute top-20 right-10 w-40 h-40 pointer-events-none"
                style={{ y: deco1Y, x: deco1X, rotate: deco1Rotate, opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0]) }}
            >
                <div className={`w-full h-full rounded-full border-2 ${isDark ? "border-sky-700/20" : "border-sky-400/20"}`} />
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-20 w-28 h-28 pointer-events-none"
                style={{ y: deco2Y, x: deco2X, rotate: deco2Rotate, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0]) }}
            >
                <div className={`w-full h-full rounded-lg border ${isDark ? "border-stone-700/30" : "border-stone-300/30"}`} />
            </motion.div>
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
                style={{ y: deco3Y, scale: deco3Scale, opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.03, 0.03, 0]) }}
            >
                <div className={`w-full h-full rounded-full ${isDark ? "bg-sky-800/10" : "bg-sky-200/20"}`} />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative mx-auto max-w-7xl px-6 sm:px-8"
                style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
            >
                <motion.div
                    className="mb-20 max-w-2xl"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-sky-500" : "text-sky-700"
                    }`}>
                        Ti riconosci?
                    </span>
                    <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non sono problemi tecnici.
                        <span className={`block mt-1 ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                            Sono problemi di business.
                        </span>
                    </h2>
                    <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Ogni PMI che incontriamo ha una storia diversa, ma racconta sempre le stesse frustrazioni.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {problemi.map((item, index) => (
                        <motion.div
                            key={item.title}
                            style={{
                                y: cardTransforms[index].y,
                                x: cardTransforms[index].x,
                                rotate: cardTransforms[index].rotate,
                                opacity: cardOpacities[index],
                            }}
                        >
                            <GlassCard theme={theme} className="p-7 h-full">
                                <span className={`text-xs font-mono font-medium mb-4 block ${
                                    isDark ? "text-sky-700" : "text-sky-500"
                                }`}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className={`text-base font-semibold mb-3 leading-snug ${
                                    isDark ? "text-slate-100" : "text-slate-800"
                                }`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${
                                    isDark ? "text-slate-500" : "text-slate-500"
                                }`}>
                                    {item.text}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
