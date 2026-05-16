import { KPIBox } from "./KPIBox.tsx";

export function KPISection({ users, surveys, theme }: any) {
    if (!users || !surveys) return null;
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIBox label="Utenti Totali"  value={users.totalUsers}            sub={`+${users.newUsersLast30Days} ultimi 30g`}  theme={theme} index={0} glow="sky" />
            <KPIBox label="Utenti Attivi" value={users.activeUsers}           sub={`${users.dau} attivi oggi`}              theme={theme} index={1} glow="emerald" />
            <KPIBox label="Survey"      value={surveys.totalResponses}      sub={`${surveys.publishedResponses} pubblicati`} theme={theme} index={2} glow="violet" />
            <KPIBox label="Conversione"   value={`${users.vipConversionRate}%`} sub="tasso VIP"                   theme={theme} index={3} glow="amber" />
        </div>
    );
}
