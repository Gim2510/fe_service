import { motion } from "framer-motion";
import { Badge } from "../Badge.tsx";
import { Users, TrendingUp, Activity, CheckCircle2 } from "lucide-react";

export function DashboardHeader({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    const stats = [
        { label: "Utenti Totali", value: users?.totalUsers || 0, icon: Users, color: "sky" },
        { label: "Utenti Attivi", value: users?.activeUsers || 0, icon: Activity, color: "emerald" },
        { label: "VIP", value: users?.vipUsers || 0, icon: TrendingUp, color: "amber" },
        { label: "Email Verificate", value: users?.verifiedEmails || 0, icon: CheckCircle2, color: "violet" },
    ];

    return (
        <div className="space-y-6">
            {/* Page title */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <Badge label="Pannello amministrativo" color="sky" theme={theme} />
                <h1 className={`text-2xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Admin Dashboard
                </h1>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                    Monitora crescita, engagement e salute del sistema
                </p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={`relative rounded-2xl border backdrop-blur-sm p-4 overflow-hidden transition-all duration-300 ${
                                isDark
                                    ? "bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg"
                                    : "bg-white/80 border-slate-200 shadow-md"
                            }`}
                        >
                            {isDark && (
                                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${stat.color}-500/40 to-transparent opacity-0 hover:opacity-100 transition-opacity`} />
                            )}
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                        {stat.label}
                                    </p>
                                    <p className={`text-2xl font-bold font-fjalla mt-1 ${
                                        isDark ? `text-${stat.color}-400` : `text-${stat.color}-700`
                                    }`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-2 rounded-lg ${
                                    isDark ? `bg-${stat.color}-950/40 text-${stat.color}-400` : `bg-${stat.color}-50 text-${stat.color}-600`
                                }`}>
                                    <Icon size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
