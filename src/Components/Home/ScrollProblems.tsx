import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

/* â”€â”€ ScrollProblems â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Each card has a unique 3D entrance: they rotate in from different angles as
   the section scrolls into view. The header text parallaxes at a different
   speed. Cards stagger in a masonry-like pattern with perspective transforms.
   Dark mode: neon glow borders with numbered badges.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const problemi = [
    { title: "\u00ABi dati ci sono, ma non li usiamo\u00BB", text: "Ogni reparto lavora per conto suo: Excel, CRM parziali, gestionali non collegati. Le decisioni si prendono a sensazione \u2014 e il costo di ogni errore si accumula in silenzio." },
    { title: "\u00ABSprechiamo ore in attivit\u00E0 manuali\u00BB", text: "Processi ripetitivi che tolgono tempo alle persone chiave. Ogni ora persa a inserire dati o riconciliare fogli \u00E8 un\u2019ora tolta alla crescita." },
    { title: "\u00ABNon sappiamo dove andremo a fine mese\u00BB", text: "Pipeline commerciale opaca, previsioni inaffidabili, opportunit\u00E0 che scivolano via. Senza visibilit\u00E0, il fatturato diventa una sorpresa." },
    { title: "\u00ABReagiamo sempre, non anticipiamo mai\u00BB", text: "La relazione con i clienti \u00E8 gestita a emergenza. Manca un sistema che ti dica cosa succeder\u00E0 prima che succeda." },
    { title: "\u00ABI costi crescono, i margini no\u00BB", text: "Senza controllo su produzione, acquisti e logistica, \u00E8 impossibile capire dove si perde margine \u2014 e quindi impossibile recuperarlo." },
    { title: "\u00ABAbbiamo software ovunque, integrazione zero\u00BB", text: "Ogni strumento aggiunto ha creato un ecosistema frammentato. Nessuno parla con nessuno, e l\u2019unico collante \u00E8 il lavoro manuale." },
];

const cardTransforms = [
    { rotateY: -8,  rotateX: 5,  x: -30 },
    { rotateY: 6,   rotateX: -3, x: 20  },
    { rotateY: -5,  rotateX: 7,  x: -15 },
    { rotateY: 7,   rotateX: -5, x: 25  },
    { rotateY: -6,  rotateX: 4,  x: -20 },
    { rotateY: 5,   rotateX: -6, x: 15  },
];

const neonColors = [
    { border: "border-red-500/50", glow: "shadow-red-500/15", badge: "text-red-400", bg: "bg-red-950/30", badgeBg: "bg-red-500/10" },
    { border: "border-amber-500/50", glow: "shadow-amber-500/15", badge: "text-amber-400", bg: "bg-amber-950/30", badgeBg: "bg-amber-500/10" },
    { border: "border-orange-500/50", glow: "shadow-orange-500/15", badge: "text-orange-400", bg: "bg-orange-950/30", badgeBg: "bg-orange-500/10" },
    { border: "border-rose-500/50", glow: "shadow-rose-500/15", badge: "text-rose-400", bg: "bg-rose-950/30", badgeBg: "bg-rose-500/10" },
    { border: "border-yellow-500/50", glow: "shadow-yellow-500/15", badge: "text-yellow-400", bg: "bg-yellow-950/30", badgeBg: "bg-yellow-500/10" },
    { border: "border-pink-500/50", glow: "shadow-pink-500/15", badge: "text-pink-400", bg: "bg-pink-950/30", badgeBg: "bg-pink-500/10" },
];

function ParallaxCard({ item, index, isDark }: {
    item: typeof problemi[0]; index: number; isDark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const t = cardTransforms[index];
    const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [t.rotateY, 0]), sp);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [t.rotateX, 0]), sp);
    const x       = useSpring(useTransform(scrollYProgress, [0, 1], [t.x, 0]), sp);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0.6, 1]), sp);
    const scale   = useSpring(useTransform(scrollYProgress, [0, 0.7], [0.9, 1]), sp);

    const colors = neonColors[index % neonColors.length];

    return (
        <motion.div
            ref={ref}
            style={{
                rotateY,
                rotateX,
                x,
                opacity,
                scale,
                perspective: 1200,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className={`relative rounded-2xl border backdrop-blur-sm p-7 h-full transition-all duration-300 ${
                    isDark
                        ? `bg-[#0E0E0D]/70 ${colors.border} shadow-lg ${colors.glow}`
                        : "bg-white border border-slate-200 hover:border-sky-400"
                }`}
                whileHover={isDark ? { y: -4, borderColor: colors.border.replace("/50", "/80") } : { y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {isDark && (
                    <div className={`absolute top-0 right-0 w-14 h-14 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-current to-transparent opacity-15 ${colors.badge}`} />
                )}

                <span className={`text-xs font-mono font-medium mb-4 block ${
                    isDark ? colors.badge : "text-sky-500"
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
            </motion.div>
        </motion.div>
    );
}

export function ScrollProblems({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start 0.3"],
    });

    const sp = { stiffness: 80, damping: 28, mass: 0.8 };
    const headerY       = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), sp);
    const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.6, 1]), sp);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {isDark && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">

                <motion.div
                    className="mb-16 max-w-2xl"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-red-400" : "text-sky-600"
                    }`}>
                        Ti riconosci?
                    </span>
                    <h2 className={`font-fjalla text-4xl font-semibold leading-tight mt-3 ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Non sono problemi tecnici.
                        <span className={`block mt-1 ${isDark ? "text-red-400" : "text-sky-600"}`}>
                            Sono problemi di business.
                        </span>
                    </h2>
                    <p className={`mt-5 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Ogni PMI che incontriamo ha una storia diversa, ma racconta sempre le stesse frustrazioni. Se almeno una ti suona familiare, hai gi\u00E0 un motivo per parlare con noi.
                    </p>
                </motion.div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    style={{ perspective: "1200px" }}
                >
                    {problemi.map((item, index) => (
                        <ParallaxCard
                            key={item.title}
                            item={item}
                            index={index}
                            isDark={isDark}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
