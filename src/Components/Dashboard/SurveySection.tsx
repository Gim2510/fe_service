export function SurveySection({ surveys, theme }: any) {
    const isDark = theme === "dark";
    const stats = [
        { label: "Total", value: surveys.totalResponses },
        { label: "Published", value: surveys.publishedResponses },
        { label: "Avg Score", value: surveys.averageScore?.toFixed(2) },
    ];

    return (
        <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"}`}>
            <div className={`mb-5 text-xs font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Survey Performance
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map(s => (
                    <div key={s.label}>
                        <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</div>
                        <div className={`text-2xl font-semibold mt-1 tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>{s.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
