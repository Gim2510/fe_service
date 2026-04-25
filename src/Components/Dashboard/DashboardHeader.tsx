import { KPISection } from "./KPISection";
import { GrowthSection } from "./GrowthSection";
import { SurveySection } from "./SurveySection";
import { InsightsSection } from "./InsightsSection";
import { AdvancedStats } from "./AdvancedStats";

export function DashboardHeader({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className="space-y-10">
            <div>
                <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    Pannello amministrativo
                </span>
                <h1 className={`text-3xl font-semibold mt-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Admin <span className="text-blue-500">Dashboard</span>
                </h1>
                <p className={`mt-1.5 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Monitor growth, engagement and system health
                </p>
            </div>

            <KPISection users={users} surveys={surveys} theme={theme} />
            <GrowthSection users={users} theme={theme} />
            <SurveySection surveys={surveys} theme={theme} />
            <InsightsSection users={users} surveys={surveys} theme={theme} />
            <AdvancedStats data={users} theme={theme} />
        </div>
    );
}
