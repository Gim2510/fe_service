import { motion } from "framer-motion";
import { KPISection } from "./KPISection";
import { GrowthSection } from "./GrowthSection";
import { SurveySection } from "./SurveySection";
import { InsightsSection } from "./InsightsSection";
import { AdvancedStats } from "./AdvancedStats";

export function DashboardHeader({ users, surveys, theme }: { users: any; surveys: any; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${isDark ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Admin Panel
                </span>
                <h1 className={`text-2xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Dashboard</h1>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>Monitora utenti, survey, crescita e metriche di sistema</p>
            </motion.div>

            <KPISection users={users} surveys={surveys} theme={theme} />

            <div className="grid lg:grid-cols-2 gap-6">
                <GrowthSection users={users} theme={theme} />
                <SurveySection surveys={surveys} theme={theme} />
            </div>

            <InsightsSection users={users} surveys={surveys} theme={theme} />
            <AdvancedStats data={users} theme={theme} />
        </div>
    );
}
