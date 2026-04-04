export function InsightsSection({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    const insights = [];

    if (users.churnRate > 8) {
        insights.push({
            level: "high",
            text: "High churn rate — users are leaving the platform"
        });
    }

    if (users.retentionRate7Days < 30) {
        insights.push({
            level: "medium",
            text: "Low 7-day retention — onboarding may be weak"
        });
    }

    if (surveys.publishedResponses < surveys.totalResponses * 0.5) {
        insights.push({
            level: "low",
            text: "Many surveys are not being published"
        });
    }

    return (
        <div className={`p-6 rounded-2xl border backdrop-blur-xl
            ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-gray-200"}`}
        >
            <div className="mb-4 text-sm opacity-70">
                System Insights
            </div>

            <div className="space-y-2">
                {insights.length === 0 && (
                    <div className="text-emerald-500 text-sm">
                        All systems healthy
                    </div>
                )}

                {insights.map((i, idx) => (
                    <div key={idx} className={`text-sm
                        ${i.level === "high" ? "text-red-500" :
                        i.level === "medium" ? "text-yellow-500" :
                            "text-blue-400"}`}
                    >
                        {i.text}
                    </div>
                ))}
            </div>
        </div>
    );
}