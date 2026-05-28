import { motion } from "framer-motion";
import { Users, ClipboardList, Target, TrendingUp } from "lucide-react";

function KpiCard({ label, value, sub, icon, delay, isDark }: { label: string; value: string | number; sub?: string; icon: React.ReactNode; delay: number; isDark: boolean }) {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={`flex items-center gap-2.5 p-3 rounded-xl border backdrop-blur-sm ${isDark ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-sky-200"}`}>
            <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>{icon}</span>
            </div>
            <div className="min-w-0">
                <p className={`text-base font-semibold tabular-nums leading-tight ${isDark ? "text-slate-100" : "text-slate-800"}`}>{value}</p>
                <p className={`text-[11px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                {sub && <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{sub}</p>}
            </div>
        </motion.div>
    );
}

export function KPISection({ users, surveys, theme }: { users: any; surveys: any; theme: string }) {
    if (!users || !surveys) return null;
    const isDark = theme === "dark";
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard icon={<Users size={13} />} label="Utenti Totali" value={users.totalUsers} sub={`+${users.newUsersLast30Days} ultimi 30g`} delay={0.05} isDark={isDark} />
            <KpiCard icon={<TrendingUp size={13} />} label="Utenti Attivi" value={users.activeUsers} sub={`DAU: ${users.dau}`} delay={0.1} isDark={isDark} />
            <KpiCard icon={<ClipboardList size={13} />} label="Survey" value={surveys.totalResponses} sub={`${surveys.publishedResponses} pubblicati`} delay={0.15} isDark={isDark} />
            <KpiCard icon={<Target size={13} />} label="Score Medio" value={surveys.averageScore != null ? `${Math.round(surveys.averageScore)}%` : "—"} sub={`Max: ${surveys.maxScore ?? "—"}%`} delay={0.2} isDark={isDark} />
        </div>
    );
}
