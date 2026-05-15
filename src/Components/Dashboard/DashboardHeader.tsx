import { motion } from "framer-motion";
import { KPISection } from "./KPISection";
import { GrowthSection } from "./GrowthSection";
import { SurveySection } from "./SurveySection";
import { InsightsSection } from "./InsightsSection";
import { AdvancedStats } from "./AdvancedStats";
import { Badge } from "../Badge.tsx";

export function DashboardHeader({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className="space-y-8">
            {/* page title */}
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
                    Monitor growth, engagement and system health
                </p>
            </motion.div>

            <KPISection users={users} surveys={surveys} theme={theme} />

            <div className="grid lg:grid-cols-2 gap-4">
                <GrowthSection users={users} theme={theme} />
                <SurveySection surveys={surveys} theme={theme} />
            </div>

            <InsightsSection users={users} surveys={surveys} theme={theme} />
            <AdvancedStats data={users} theme={theme} />
        </div>
    );
}
