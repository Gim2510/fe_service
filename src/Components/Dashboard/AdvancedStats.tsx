import { GlassCard } from "./GlassCard";
import {MetricRow} from "./MetricRow.tsx";

export function AdvancedStats({ data, theme }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            {/* USERS */}
            <GlassCard title="Users Overview" theme={theme}>
                <MetricRow label="Total" value={data.totalUsers} />
                <MetricRow label="Active" value={data.activeUsers} />
                <MetricRow label="Suspended" value={data.suspendedUsers} />
                <MetricRow label="VIP" value={data.vipUsers} />
            </GlassCard>

            {/* GROWTH */}
            <GlassCard title="Growth" theme={theme}>
                <MetricRow label="Last 7 days" value={data.newUsersLast7Days} />
                <MetricRow label="Last 30 days" value={data.newUsersLast30Days} />
            </GlassCard>

            {/* AUTH */}
            <GlassCard title="Auth & Verification" theme={theme}>
                <MetricRow label="Verified" value={data.verifiedEmails} />
                <MetricRow label="Unverified" value={data.unverifiedEmails} />
                <MetricRow label="Password" value={data.authDistribution.password} />
                <MetricRow label="Google" value={data.authDistribution.google} />
            </GlassCard>

            {/* ENGAGEMENT */}
            <GlassCard title="Engagement" theme={theme}>
                <MetricRow label="DAU" value={data.dau} />
                <MetricRow label="WAU" value={data.wau} />
                <MetricRow label="MAU" value={data.mau} />
                <MetricRow label="Stickiness" value={`${data.stickiness}%`} />
                <MetricRow label="Retention (7d)" value={`${data.retentionRate7Days}%`} />
                <MetricRow label="Churn" value={`${data.churnRate}%`} />
            </GlassCard>

            {/* SOCIAL */}
            <GlassCard title="User Behavior" theme={theme}>
                <MetricRow label="Avg Friends" value={data.averageFriends} />
                <MetricRow label="Avg Favorites" value={data.averageFavorites} />
                <MetricRow label="Network Density" value={data.networkDensity} />
            </GlassCard>

            {/* BUSINESS */}
            <GlassCard title="Business" theme={theme}>
                <MetricRow label="VIP Active" value={data.vipActive} />
                <MetricRow label="VIP Expired" value={data.vipExpired} />
                <MetricRow label="Conversion" value={`${data.vipConversionRate}%`} />
            </GlassCard>

        </div>
    );
}