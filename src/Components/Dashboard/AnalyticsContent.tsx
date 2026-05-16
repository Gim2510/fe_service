import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";

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

    const card = isDark ? "bg-[#161614]/80 border-stone-800/20" : "bg-white border-slate-200";

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    Analytics Navigazione
                </h2>
                <div className="flex gap-2">
                    {[7, 30, 90].map(d => (
                        <button
                            key={d}
                            onClick={() => setDays(d)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                                days === d
                                    ? "bg-sky-700 text-white border-transparent"
                                    : isDark
                                        ? "border-stone-800/30 text-slate-400 hover:text-slate-200"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {d}g
                        </button>
                    ))}
                </div>
            </div>

            {/* Overview cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Visite Totali", value: overview?.totalViews || 0 },
                    { label: "Utenti Unici", value: overview?.uniqueSessions || 0 },
                    { label: "Durata Media", value: `${Math.round(overview?.avgDuration || 0)}s` },
                    { label: "Bounce Rate", value: `${overview?.bounceRate || 0}%` },
                ].map(stat => (
                    <div key={stat.label} className={`rounded-2xl border backdrop-blur-sm p-4 ${card}`}>
                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{stat.label}</p>
                        <p className={`text-2xl font-bold font-fjalla mt-1 ${isDark ? "text-sky-400" : "text-sky-700"}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Top pages + Devices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`rounded-2xl border backdrop-blur-sm p-5 ${card}`}>
                    <h3 className={`text-sm font-semibold mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Top Pagine</h3>
                    <div className="space-y-2">
                        {topPages.slice(0, 8).map((p, i) => (
                            <div key={p.path} className="flex justify-between items-center">
                                <span className={`text-xs truncate max-w-[200px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {i + 1}. {p.path}
                                </span>
                                <span className={`text-xs font-mono font-bold ${isDark ? "text-sky-400" : "text-sky-700"}`}>{p.views}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`rounded-2xl border backdrop-blur-sm p-5 ${card}`}>
                    <h3 className={`text-sm font-semibold mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Dispositivi</h3>
                    <div className="space-y-3">
                        {devices.map(d => {
                            const total = devices.reduce((s, x) => s + x.count, 0);
                            const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                            return (
                                <div key={d.device}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className={isDark ? "text-slate-400" : "text-slate-600"}>{d.device || "Unknown"}</span>
                                        <span className={isDark ? "text-slate-300" : "text-slate-700"}>{pct}%</span>
                                    </div>
                                    <div className={`h-2 rounded-full ${isDark ? "bg-stone-800" : "bg-slate-100"}`}>
                                        <div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Daily visits mini chart */}
            <div className={`rounded-2xl border backdrop-blur-sm p-5 ${card}`}>
                <h3 className={`text-sm font-semibold mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Visite Giornaliere</h3>
                <div className="flex items-end gap-1 h-32">
                    {dailyVisits.slice(-30).map(d => {
                        const max = Math.max(...dailyVisits.map(x => x.views), 1);
                        const h = Math.max(4, Math.round((d.views / max) * 100));
                        return (
                            <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full">
                                <div className="w-full rounded-t bg-sky-600/60 hover:bg-sky-500 transition-colors" style={{ height: `${h}%` }} title={`${d.date}: ${d.views}`} />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                    <span>{dailyVisits[0]?.date || ""}</span>
                    <span>{dailyVisits[dailyVisits.length - 1]?.date || ""}</span>
                </div>
            </div>
        </motion.div>
    );
}
