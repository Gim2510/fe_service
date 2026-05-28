import { motion } from "framer-motion";

function MetricGroup({ title, items, isDark }: { title: string; items: { label: string; value: string | number }[]; isDark: boolean }) {
    return (
        <div>
            <p className={`text-[11px] font-mono uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{title}</p>
            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.label}</span>
                        <span className={`text-xs font-semibold tabular-nums ${isDark ? "text-slate-200" : "text-slate-700"}`}>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function AdvancedStats({ data, theme }: { data: any; theme: string }) {
    const A = theme === "dark";
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
            className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${A ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"}`}>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="p-6">
                <p className={`text-[11px] font-mono uppercase tracking-[0.15em] mb-5 ${A ? "text-cyan-500" : "text-cyan-600"}`}>Metriche Utenti</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MetricGroup title="Overview" items={[
                        { label: "Totali", value: data.totalUsers }, { label: "Attivi", value: data.activeUsers },
                        { label: "Sospesi", value: data.suspendedUsers }, { label: "VIP", value: data.vipUsers },
                    ]} isDark={A} />
                    <MetricGroup title="Crescita" items={[
                        { label: "Ultimi 7 giorni", value: data.newUsersLast7Days }, { label: "Ultimi 30 giorni", value: data.newUsersLast30Days },
                    ]} isDark={A} />
                    <MetricGroup title="Autenticazione" items={[
                        { label: "Verificati", value: data.verifiedEmails }, { label: "Non verificati", value: data.unverifiedEmails },
                        { label: "Password", value: data.authDistribution?.password ?? 0 }, { label: "Google", value: data.authDistribution?.google ?? 0 },
                    ]} isDark={A} />
                    <MetricGroup title="Engagement" items={[
                        { label: "DAU", value: data.dau }, { label: "WAU", value: data.wau }, { label: "MAU", value: data.mau },
                        { label: "Stickiness", value: `${data.stickiness}%` }, { label: "Retention 7d", value: `${data.retentionRate7Days}%` },
                        { label: "Churn", value: `${data.churnRate}%` },
                    ]} isDark={A} />
                    <MetricGroup title="Comportamento" items={[
                        { label: "Avg Amici", value: data.averageFriends }, { label: "Avg Preferiti", value: data.averageFavorites },
                        { label: "Network Density", value: data.networkDensity },
                    ]} isDark={A} />
                    <MetricGroup title="Business" items={[
                        { label: "VIP Attivi", value: data.vipActive }, { label: "VIP Scaduti", value: data.vipExpired },
                        { label: "Conversione VIP", value: `${data.vipConversionRate}%` },
                    ]} isDark={A} />
                </div>
            </div>
        </motion.div>
    );
}
