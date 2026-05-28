import { motion } from "framer-motion";

const CAT_LABELS: Record<string, string> = {
    leadership: "Leadership", azienda: "Maturità aziendale", software: "Software & Strumenti",
    processi: "Processi operativi", integrazione: "Integrazione sistemi", it_security: "Sicurezza IT", budget: "Readiness investimenti",
};

export function SurveySection({ surveys, theme }: { surveys: any; theme: string }) {
    const isDark = theme === "dark";
    const dist = surveys?.scoreDistribution ?? [];
    const maxDist = Math.max(...dist.map((d: any) => d.count), 1);
    const catAvgs = surveys?.averageScoreByCategory ?? [];

    const stats = [
        { label: "Risposte Totali", value: surveys.totalResponses },
        { label: "Pubblicate", value: surveys.publishedResponses },
        { label: "Punteggio Medio", value: surveys.averageScore != null ? `${surveys.averageScore.toFixed(1)}%` : "—" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${isDark ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"}`}>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
            <div className="p-6 space-y-5">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Performance Survey</p>

                <div className="grid grid-cols-3 gap-4">
                    {stats.map(s => (
                        <div key={s.label}>
                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{s.label}</p>
                            <p className={`text-xl font-semibold tabular-nums ${isDark ? "text-cyan-400" : "text-cyan-700"}`}>{s.value ?? "—"}</p>
                        </div>
                    ))}
                </div>

                {/* Score distribution */}
                {dist.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-stone-800/20">
                        <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Distribuzione score</p>
                        {dist.map((d: any) => {
                            const pct = Math.round((d.count / maxDist) * 100);
                            return (
                                <div key={d.range} className="flex items-center gap-2">
                                    <span className={`text-[10px] font-mono w-14 text-right ${isDark ? "text-slate-500" : "text-slate-400"}`}>{d.range}</span>
                                    <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/5">
                                        <motion.div className="h-full rounded-full bg-cyan-500/60" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                                    </div>
                                    <span className={`text-[10px] font-mono tabular-nums w-6 text-right ${isDark ? "text-slate-500" : "text-slate-400"}`}>{d.count}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Category averages */}
                {catAvgs.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-stone-800/20">
                        <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Score medio per categoria</p>
                        {catAvgs.slice(0, 7).map((c: any) => (
                            <div key={c.category} className="flex items-center gap-2">
                                <span className={`text-[10px] font-medium w-24 truncate ${isDark ? "text-slate-400" : "text-slate-600"}`}>{CAT_LABELS[c.category] ?? c.category}</span>
                                <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-white/5">
                                    <motion.div className="h-full rounded-full bg-cyan-500/60" initial={{ width: 0 }} animate={{ width: `${c.averagePercentage}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                                </div>
                                <span className={`text-[10px] font-mono tabular-nums w-9 text-right ${isDark ? "text-slate-500" : "text-slate-400"}`}>{Math.round(c.averagePercentage)}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
