import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

export function InsightsSection({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    const insights: { level: "high" | "medium" | "low"; text: string }[] = [];
    if (users.churnRate > 8)
        insights.push({ level: "high",   text: "Alto churn rate — gli utenti stanno abbandonando la piattaforma" });
    if (users.retentionRate7Days < 30)
        insights.push({ level: "medium", text: "Bassa retention a 7 giorni — l'onboarding potrebbe essere debole" });
    if (surveys.publishedResponses < surveys.totalResponses * 0.5)
        insights.push({ level: "low",    text: "Molti survey non vengono pubblicati" });

    const cfg = {
        high:   { icon: AlertTriangle, color: "#f87171", bg: isDark ? "bg-red-500/8 border-red-500/20"   : "bg-red-50 border-red-200" },
        medium: { icon: AlertTriangle, color: "#f59e0b", bg: isDark ? "bg-amber-500/8 border-amber-500/20": "bg-amber-50 border-amber-200" },
        low:    { icon: Info,          color: "#f59e0b", bg: isDark ? "bg-sky-500/6 border-sky-500/15": "bg-sky-50/50 border-sky-200/60" },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? "bg-[#0E0E0D]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg"
            }`}
        >
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent group-hover:via-amber-400/70 transition-all" />
            <div className="p-5">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    System Insights
                </p>

                {insights.length === 0 ? (
                    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3
                        ${isDark ? "bg-emerald-500/8 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}>
                        <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                        <span className="text-sm text-emerald-400">Tutti i sistemi sono operativi</span>
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
