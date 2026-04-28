import { GlassCard } from "./GlassCard";
import { MetricRow } from "./MetricRow.tsx";

export function AdvancedStats({ data, theme }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            <GlassCard title="Users Overview" theme={theme} index={0}>
                <MetricRow label="Total"     value={data.totalUsers}     theme={theme} />
                <MetricRow label="Active"    value={data.activeUsers}    theme={theme} />
                <MetricRow label="Suspended" value={data.suspendedUsers} theme={theme} />
                <MetricRow label="VIP"       value={data.vipUsers}       theme={theme} />
            </GlassCard>

            <GlassCard title="Growth" theme={theme} index={1}>
                <MetricRow label="Last 7 days"  value={data.newUsersLast7Days}  theme={theme} />
                <MetricRow label="Last 30 days" value={data.newUsersLast30Days} theme={theme} />
            </GlassCard>

            <GlassCard title="Auth & Verification" theme={theme} index={2}>
                <MetricRow label="Verified"   value={data.verifiedEmails}          theme={theme} />
                <MetricRow label="Unverified" value={data.unverifiedEmails}        theme={theme} />
                <MetricRow label="Password"   value={data.authDistribution.password} theme={theme} />
                <MetricRow label="Google"     value={data.authDistribution.google}   theme={theme} />
            </GlassCard>

            <GlassCard title="Engagement" theme={theme} index={3}>
                <MetricRow label="DAU"          value={data.dau}                      theme={theme} />
                <MetricRow label="WAU"          value={data.wau}                      theme={theme} />
                <MetricRow label="MAU"          value={data.mau}                      theme={theme} />
                <MetricRow label="Stickiness"   value={`${data.stickiness}%`}         theme={theme} />
                <MetricRow label="Retention 7d" value={`${data.retentionRate7Days}%`} theme={theme} />
                <MetricRow label="Churn"        value={`${data.churnRate}%`}          theme={theme} />
            </GlassCard>

            <GlassCard title="User Behavior" theme={theme} index={4}>
                <MetricRow label="Avg Friends"   value={data.averageFriends}   theme={theme} />
                <MetricRow label="Avg Favorites" value={data.averageFavorites} theme={theme} />
                <MetricRow label="Network Density" value={data.networkDensity}  theme={theme} />
            </GlassCard>

            <GlassCard title="Business" theme={theme} index={5}>
                <MetricRow label="VIP Active"  value={data.vipActive}              theme={theme} />
                <MetricRow label="VIP Expired" value={data.vipExpired}             theme={theme} />
                <MetricRow label="Conversion"  value={`${data.vipConversionRate}%`} theme={theme} />
            </GlassCard>

        </div>
    );
}
