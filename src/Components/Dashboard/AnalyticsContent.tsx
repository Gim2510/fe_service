import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";
import { DashboardCard } from "../DashboardCard.tsx";
import { BarChart3, Monitor, Smartphone, Tablet, TrendingUp } from "lucide-react";

const DASHBOARD_BASE = import.meta.env.VITE_DASHBOARD_BASE_URL || "http://localhost:3006";

interface OverviewStats {
    totalViews: number;
    uniqueSessions: number;
    avgDuration: number;
    bounceRate: number;
    days: number;
}

interface TopPage {
    path: string;
    views: number;
    avgDuration: number;
    uniqueSessions: number;
}

interface DeviceStat {
    device: string;
    count: number;
}

interface DailyVisit {
    date: string;
    views: number;
    sessions: number;
}

export function AnalyticsContent() {
    const { theme } = useTheme();
    const { token } = useAuth();
    const isDark = theme === "dark";
    const [days, setDays] = useState(30);
    const [overview, setOverview] = useState<OverviewStats | null>(null);
    const [topPages, setTopPages] = useState<TopPage[]>([]);
    const [devices, setDevices] = useState<DeviceStat[]>([]);
    const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        Promise.all([
            fetch(`${DASHBOARD_BASE}v1/dashboard/analytics/overview?days=${days}`, { headers }).then(r => r.json()),
            fetch(`${DASHBOARD_BASE}v1/dashboard/analytics/top-pages?days=${days}`, { headers }).then(r => r.json()),
            fetch(`${DASHBOARD_BASE}v1/dashboard/analytics/devices?days=${days}`, { headers }).then(r => r.json()),
            fetch(`${DASHBOARD_BASE}v1/dashboard/analytics/daily-visits?days=${days}`, { headers }).then(r => r.json()),
        ]).then(([ov, tp, dv, dv2]) => {
            setOverview(ov);
            setTopPages(tp);
            setDevices(dv);
            setDailyVisits(dv2);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [token, days]);

    if (loading) return <div className="text-center py-12 text-slate-500">Caricamento analytics...</div>;

    const deviceIcons: Record<string, React.ReactNode> = {
        mobile: <Smartphone size={14} />,
        tablet: <Tablet size={14} />,
        desktop: <Monitor size={14} />,
    };

    return (
        <div className="space-y-6">
            {/* Period selector */}
            <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    <BarChart3 size={18} className="text-sky-500" />
                    Analytics Navigazione
                </h2>
                <div className="flex gap-2">
                    {[7, 30, 90].map(d => (
                        <button
                            key={d}
                            onClick={() => setDays(d)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                days === d
                                    ? "bg-sky-700 text-white border-transparent shadow-sm"
                                    : isDark
                                        ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {d}g
                        </button>
                    ))}
                </div>
            </div>

            {/* Overview cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Visite Totali", value: overview?.totalViews || 0, color: "sky" },
                    { label: "Utenti Unici", value: overview?.uniqueSessions || 0, color: "emerald" },
                    { label: "Durata Media", value: `${Math.round(overview?.avgDuration || 0)}s`, color: "amber" },
                    { label: "Bounce Rate", value: `${overview?.bounceRate || 0}%`, color: "rose" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className={`relative rounded-2xl border backdrop-blur-sm p-4 overflow-hidden transition-all duration-300 ${
                            isDark
                                ? "bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg"
                                : "bg-white/80 border-slate-200 shadow-md"
                        }`}
                    >
                        {isDark && (
                            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${stat.color}-500/40 to-transparent opacity-0 hover:opacity-100 transition-opacity`} />
                        )}
                        <p className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {stat.label}
                        </p>
                        <p className={`text-2xl font-bold font-fjalla mt-1 ${
                            isDark ? `text-${stat.color}-400` : `text-${stat.color}-700`
                        }`}>
                            {stat.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Top pages + Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard title="Top Pagine" theme={theme} glow="sky" delay={0.15} icon={<TrendingUp size={14} />}>
                    <div className="space-y-2">
                        {topPages.slice(0, 8).map((p, i) => (
                            <div key={p.path} className="flex justify-between items-center py-1.5">
                                <span className={`text-xs truncate max-w-[200px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-mono mr-2 ${
                                        isDark ? "bg-stone-800/50 text-slate-500" : "bg-slate-100 text-slate-500"
                                    }`}>{i + 1}</span>
                                    {p.path}
                                </span>
                                <span className={`text-xs font-mono font-bold ${isDark ? "text-sky-400" : "text-sky-700"}`}>{p.views}</span>
                            </div>
                        ))}
                        {topPages.length === 0 && (
                            <p className={`text-sm text-center py-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Nessun dato</p>
                        )}
                    </div>
                </DashboardCard>

                <DashboardCard title="Dispositivi" theme={theme} glow="violet" delay={0.2} icon={<Monitor size={14} />}>
                    <div className="space-y-3">
                        {devices.map(d => {
                            const total = devices.reduce((s, x) => s + x.count, 0);
                            const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                            return (
                                <div key={d.device}>
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                        <span className={`flex items-center gap-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                            {deviceIcons[d.device?.toLowerCase()] || <Monitor size={14} />}
                                            {d.device || "Unknown"}
                                        </span>
                                        <span className={`font-mono font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{pct}%</span>
                                    </div>
                                    <div className={`h-2 rounded-full ${isDark ? "bg-stone-800" : "bg-slate-100"}`}>
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {devices.length === 0 && (
                            <p className={`text-sm text-center py-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Nessun dato</p>
                        )}
                    </div>
                </DashboardCard>
            </div>

            {/* Daily visits chart */}
            <DashboardCard title="Visite Giornaliere" theme={theme} glow="emerald" delay={0.25} icon={<BarChart3 size={14} />}>
                <div className="flex items-end gap-1 h-32">
                    {dailyVisits.slice(-30).map((d, i) => {
                        const max = Math.max(...dailyVisits.map(x => x.views), 1);
                        const h = Math.max(4, Math.round((d.views / max) * 100));
                        return (
                            <motion.div
                                key={d.date}
                                className="flex-1 flex flex-col items-center justify-end h-full"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.02 }}
                            >
                                <div
                                    className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-500/80 hover:from-emerald-500 hover:to-emerald-400/80 transition-colors cursor-pointer"
                                    style={{ height: `${h}%` }}
                                    title={`${d.date}: ${d.views} visite`}
                                />
                            </motion.div>
                        );
                    })}
                    {dailyVisits.length === 0 && (
                        <p className={`text-sm text-center py-4 w-full ${isDark ? "text-slate-600" : "text-slate-400"}`}>Nessun dato</p>
                    )}
                </div>
                {dailyVisits.length > 0 && (
                    <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                        <span>{dailyVisits.slice(-30)[0]?.date || ""}</span>
                        <span>{dailyVisits[dailyVisits.length - 1]?.date || ""}</span>
                    </div>
                )}
            </DashboardCard>
        </div>
    );
}
