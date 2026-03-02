import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";

export function DigitalMaturitySection({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    const livelli = [
        {
            level: "Base",
            score: "0-30%",
            description:
                "Processi ancora manuali o parzialmente digitalizzati. Dati sparsi e decisioni basate su intuizione.",
            color: "#A5010480"
        },
        {
            level: "Intermedio",
            score: "31-60%",
            description:
                "Parte dei processi digitalizzata e integrata. KPI iniziali monitorati.",
            color: "#F7B32B80"
        },
        {
            level: "Avanzato",
            score: "61-85%",
            description:
                "Processi digitali consolidati, dati centralizzati e dashboard operative.",
            color: "#A9E5BB80"
        },
        {
            level: "Eccellente",
            score: "86-100%",
            description:
                "Processi completamente digitalizzati, KPI predittivi e automazione intelligente.",
            color: "#7AE58280"
        }
    ];

    const pesi = [
        { label: "Processi", weight: 0.4 },
        { label: "Tecnologia", weight: 0.3 },
        { label: "Dati & KPI", weight: 0.2 },
        { label: "Automazione & AI", weight: 0.1 }
    ];

    return (
        <SectionBase theme={theme}>
            {/* HEADER */}
            <div className="text-center mb-24">
                <span className={`text-sm uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Maturità digitale
                </span>
                <h2 className={`${isDark ? "text-white" : "text-neutral-900"} text-4xl font-semibold mt-2`}>
                    Comprendere il tuo livello di maturità digitale
                </h2>
                <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} mt-4 text-lg max-w-2xl mx-auto`}>
                    Valutiamo i tuoi processi, tecnologia e dati secondo standard strutturati,
                    generando un punteggio chiaro e operativo.
                </p>
            </div>

            {/* LIVELLI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {livelli.map((lvl) => (
                    <GlassCard
                        theme={theme}
                        key={lvl.level}
                        className={`p-6 ${isDark ? "" : "bg-white/5 border-black/10"}`}
                    >
                        <h3 className={`${isDark ? "text-white" : "text-neutral-900"} text-xl font-semibold mb-3`}>
                            {lvl.level}
                        </h3>

                        <div className={`h-2 rounded-full mb-4`} style={{ backgroundColor: lvl.color }} />

                        <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} text-sm mb-4`}>
                            {lvl.description}
                        </p>

                        <div className={`${isDark ? "text-neutral-300" : "text-neutral-600"} text-sm`}>
                            Score: {lvl.score}
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* PESI */}
            <GlassCard theme={theme} className={`p-10 max-w-4xl mx-auto ${isDark ? "" : "bg-white/5 border-black/10"}`}>
                <h3 className={`${isDark ? "text-white" : "text-neutral-900"} text-2xl font-semibold mb-8 text-center`}>
                    Peso dei fattori nella valutazione
                </h3>

                <div className="space-y-6">
                    {pesi.map((p) => (
                        <div key={p.label}>
                            <div className={`flex justify-between mb-2 text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                                <span>{p.label}</span>
                                <span>{Math.round(p.weight * 100)}%</span>
                            </div>

                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                                    style={{ width: `${p.weight * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"} mt-8 text-sm text-center`}>
                    I pesi riflettono l'importanza relativa di ogni dimensione
                    nella determinazione del livello di maturità digitale.
                </p>
            </GlassCard>
        </SectionBase>
    );
}