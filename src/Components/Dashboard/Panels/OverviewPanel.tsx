import { motion } from "framer-motion";
import { DetailItem } from "../DetailItem.tsx";
import { DashboardCard } from "../DashboardCard.tsx";
import { Users, Mail, Shield, UserCheck } from "lucide-react";

export function OverviewPanel({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className="space-y-6">
            {/* User Distribution */}
            <DashboardCard title="Distribuzione Utenti" theme={theme} glow="sky" delay={0.1} icon={<Users size={14} />}>
                <div className="grid grid-cols-2 gap-6">
                    <DetailItem label="Admin" value={users?.usersByRole?.admin} theme={theme} />
                    <DetailItem label="User" value={users?.usersByRole?.user} theme={theme} />
                    <DetailItem label="Verificate" value={users?.verifiedEmails} theme={theme} />
                    <DetailItem label="Non verificate" value={users?.unverifiedEmails} theme={theme} />
                </div>
            </DashboardCard>

            {/* Auth Methods */}
            <DashboardCard title="Metodi di Autenticazione" theme={theme} glow="violet" delay={0.15} icon={<Shield size={14} />}>
                <div className="grid grid-cols-2 gap-6">
                    <DetailItem label="Email/Password" value={users?.authDistribution?.email} theme={theme} />
                    <DetailItem label="Google OAuth" value={users?.authDistribution?.google} theme={theme} />
                </div>
            </DashboardCard>

            {/* Survey Trend */}
            <DashboardCard title="Trend Survey" theme={theme} glow="emerald" delay={0.2} icon={<Mail size={14} />}>
                <div className="space-y-0">
                    {surveys?.responsesByMonth?.map((item: any, i: number) => (
                        <motion.div
                            key={item.month}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.04 }}
                            className={`flex justify-between items-center py-2.5 border-b last:border-none text-xs
                                ${isDark ? "border-stone-800/20" : "border-slate-100"}`}
                        >
                            <span className={`font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>{item.month}</span>
                            <span className={`font-semibold tabular-nums ${isDark ? "text-slate-200" : "text-slate-800"}`}>{item.count}</span>
                        </motion.div>
                    ))}
                    {(!surveys?.responsesByMonth || surveys.responsesByMonth.length === 0) && (
                        <p className={`text-sm text-center py-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                            Nessun dato disponibile
                        </p>
                    )}
                </div>
            </DashboardCard>

            {/* Growth & Retention */}
            <DashboardCard title="Crescita e Retention" theme={theme} glow="amber" delay={0.25} icon={<UserCheck size={14} />}>
                <div className="grid grid-cols-2 gap-6">
                    <DetailItem label="Nuovi (7g)" value={users?.newUsersLast7Days} theme={theme} />
                    <DetailItem label="Nuovi (30g)" value={users?.newUsersLast30Days} theme={theme} />
                    <DetailItem label="Retention 7g" value={`${users?.retentionRate7Days || 0}%`} theme={theme} />
                    <DetailItem label="Churn Rate" value={`${users?.churnRate || 0}%`} theme={theme} />
                </div>
            </DashboardCard>
        </div>
    );
}
