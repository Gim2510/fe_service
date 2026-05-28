import { motion } from "framer-motion";
import { Users, ClipboardList, Target, TrendingUp } from "lucide-react";

function KpiCard({ label, value, sub, icon, delay }: { label: string; value: string | number; sub?: string; icon: React.ReactNode; delay: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm bg-[#0E0E0D]/60 border-cyan-500/20">
            <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10">
                <span className="text-cyan-400">{icon}</span>
            </div>
            <div className="min-w-0">
                <p className="text-lg font-semibold tabular-nums text-slate-100">{value}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{label}</p>
                {sub && <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>}
            </div>
        </motion.div>
    );
}

export function KPISection({ users, surveys }: { users: any; surveys: any }) {
    if (!users || !surveys) return null;
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard icon={<Users size={15} />} label="Utenti Totali" value={users.totalUsers} sub={`+${users.newUsersLast30Days} ultimi 30g`} delay={0.05} />
            <KpiCard icon={<TrendingUp size={15} />} label="Utenti Attivi" value={users.activeUsers} sub={`DAU: ${users.dau}`} delay={0.1} />
            <KpiCard icon={<ClipboardList size={15} />} label="Survey" value={surveys.totalResponses} sub={`${surveys.publishedResponses} pubblicati`} delay={0.15} />
            <KpiCard icon={<Target size={15} />} label="Score Medio" value={surveys.averageScore != null ? `${Math.round(surveys.averageScore)}%` : "—"} sub={`Max: ${surveys.maxScore ?? "—"}%`} delay={0.2} />
        </div>
    );
}
