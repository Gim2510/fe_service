import { KPISection } from "./KPISection";
import { GrowthSection } from "./GrowthSection";
import { SurveySection } from "./SurveySection";
import { InsightsSection } from "./InsightsSection";
import { AdvancedStats } from "./AdvancedStats";

export function DashboardHeader({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className="space-y-10">

            {/* TITLE */}
            <div>
                <h1 className={`text-3xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Admin <span className='text-main-red'>Dashboard</span>
                </h1>

                <p className={`${isDark ? "text-neutral-400" : "text-gray-600"} mt-2`}>
                    Monitor growth, engagement and system health
                </p>
            </div>

            {/* HERO KPI */}
            <KPISection users={users} surveys={surveys} theme={theme} />

            {/* GROWTH */}
            <GrowthSection users={users} theme={theme} />

            {/* SURVEY CORE */}
            <SurveySection surveys={surveys} theme={theme} />

            {/* INSIGHTS */}
            <InsightsSection users={users} surveys={surveys} theme={theme} />

            {/* DETAILS */}
            <AdvancedStats data={users} theme={theme} />

        </div>
    );
}