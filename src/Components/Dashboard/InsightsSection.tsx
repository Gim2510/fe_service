export function InsightsSection({ users, surveys, theme }: any) {
    const isDark = theme === "dark";
    const insights: { level: string; text: string }[] = [];

    if (users.churnRate > 8) insights.push({ level: "high", text: "High churn rate — users are leaving the platform" });
    if (users.retentionRate7Days < 30) insights.push({ level: "medium", text: "Low 7-day retention — onboarding may be weak" });
    if (surveys.publishedResponses < surveys.totalResponses * 0.5) insights.push({ level: "low", text: "Many surveys are not being published" });

    return (
        <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"}`}>
            <div className={`mb-4 text-xs font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                System Insights
            </div>
            <div className="space-y-2">
                {insights.length === 0 && <div className="text-sm text-emerald-400">All systems healthy</div>}
                {insights.map((item, idx) => (
                    <div key={idx} className={`text-sm ${
                        item.level === "high" ? "text-red-400" :
                        item.level === "medium" ? "text-amber-400" : "text-amber-500"
                    }`}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
