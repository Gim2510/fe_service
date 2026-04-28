import { motion } from "framer-motion";

export function SurveySection({ surveys, theme }: any) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    const stats = [
        { label: "Total Responses",  value: surveys.totalResponses },
        { label: "Published",        value: surveys.publishedResponses },
        { label: "Average Score",    value: surveys.averageScore != null ? `${surveys.averageScore.toFixed(1)}%` : "—" },
    ];

    const publishRate = surveys.totalResponses > 0
        ? Math.round((surveys.publishedResponses / surveys.totalResponses) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-amber-700/40" />
            <div className="p-7">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-6
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Survey Performance
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1.5
                                ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                {s.label}
                            </p>
                            <p className={`text-2xl font-semibold tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                {s.value ?? "—"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* publish rate bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Publish rate
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {publishRate}%
                        </span>
                    </div>
                    <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                        <motion.div
                            className="h-full rounded-full bg-amber-600"
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
