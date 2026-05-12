import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

export function InsightsSection({ users, surveys, theme }: any) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    const insights: { level: "high" | "medium" | "low"; text: string }[] = [];
    if (users.churnRate > 8)
        insights.push({ level: "high",   text: "High churn rate — users are leaving the platform" });
    if (users.retentionRate7Days < 30)
        insights.push({ level: "medium", text: "Low 7-day retention — onboarding may be weak" });
    if (surveys.publishedResponses < surveys.totalResponses * 0.5)
        insights.push({ level: "low",    text: "Many surveys are not being published" });

    const cfg = {
        high:   { icon: AlertTriangle, color: "#f87171", bg: isDark ? "bg-red-500/8 border-red-500/20"   : "bg-red-50 border-red-200" },
        medium: { icon: AlertTriangle, color: "#f59e0b", bg: isDark ? "bg-emerald-500/8 border-emerald-500/20": "bg-emerald-50 border-emerald-200" },
        low:    { icon: Info,          color: "#f59e0b", bg: isDark ? "bg-emerald-500/6 border-emerald-500/15": "bg-emerald-50/50 border-emerald-200/60" },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-emerald-700/40" />
            <div className="p-7">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    System Insights
                </p>

                {insights.length === 0 ? (
                    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3
                        ${isDark ? "bg-green-500/8 border-green-500/20" : "bg-green-50 border-green-200"}`}>
                        <CheckCircle size={14} className="text-green-400 shrink-0" />
                        <span className="text-sm text-green-400">All systems healthy</span>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {insights.map((item, i) => {
                            const { icon: Icon, color, bg } = cfg[item.level];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.35 + i * 0.06 }}
                                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${bg}`}
                                >
                                    <Icon size={14} style={{ color }} className="shrink-0 mt-0.5" />
                                    <span className="text-sm" style={{ color }}>{item.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
