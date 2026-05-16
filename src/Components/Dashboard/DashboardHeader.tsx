import { motion } from "framer-motion";
import { Badge } from "../Badge.tsx";
import { KPISection } from "./KPISection";
import { GrowthSection } from "./GrowthSection";
import { SurveySection } from "./SurveySection";
import { InsightsSection } from "./InsightsSection";
import { AdvancedStats } from "./AdvancedStats";

export function DashboardHeader({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

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

            {/* KPI Cards */}
            <KPISection users={users} surveys={surveys} theme={theme} />

            {/* Growth + Survey charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <GrowthSection users={users} theme={theme} />
                <SurveySection surveys={surveys} theme={theme} />
            </div>

            {/* Insights */}
            <InsightsSection users={users} surveys={surveys} theme={theme} />

            {/* Advanced Stats */}
            <AdvancedStats data={users} theme={theme} />
        </div>
    );
}
