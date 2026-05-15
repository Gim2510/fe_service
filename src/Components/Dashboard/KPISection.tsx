import { KPIBox } from "./KPIBox.tsx";

export function KPISection({ users, surveys, theme }: any) {
    if (!users || !surveys) return null;
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIBox label="Total Users"  value={users.totalUsers}            sub={`+${users.newUsersLast30Days} last 30d`}  theme={theme} index={0} />
            <KPIBox label="Active Users" value={users.activeUsers}           sub={`${users.dau} daily active`}              theme={theme} index={1} />
            <KPIBox label="Surveys"      value={surveys.totalResponses}      sub={`${surveys.publishedResponses} published`} theme={theme} index={2} />
            <KPIBox label="Conversion"   value={`${users.vipConversionRate}%`} sub="VIP conversion rate"                   theme={theme} index={3} />
        </div>
    );
}
