import { motion } from "framer-motion";

export function SurveySection({ surveys, theme }: any) {
    const isDark = theme === "dark";

    const stats = [
        { label: "Risposte Totali",  value: surveys.totalResponses },
        { label: "Pubblicate",        value: surveys.publishedResponses },
        { label: "Punteggio Medio",    value: surveys.averageScore != null ? `${surveys.averageScore.toFixed(1)}%` : "—" },
    ];

    const publishRate = surveys.totalResponses > 0
        ? Math.round((surveys.publishedResponses / surveys.totalResponses) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? "bg-[#0E0E0D]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg"
            }`}
        >
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent group-hover:via-violet-400/70 transition-all" />
            <div className="p-5">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Performance Survey
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1
                                ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                {s.label}
                            </p>
                            <p className={`text-xl font-semibold font-fjalla tabular-nums ${isDark ? "text-violet-400" : "text-violet-700"}`}>
                                {s.value ?? "—"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* publish rate bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Tasso pubblicazione
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {publishRate}%
                        </span>
                    </div>
                    <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${publishRate}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
