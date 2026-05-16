import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export function GrowthSection({ users, theme }: any) {
    const isDark = theme === "dark";

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload?.length) return null;
        return (
            <div className={`rounded-xl border px-3 py-2 text-xs shadow-lg backdrop-blur-sm
                ${isDark ? "bg-[#1C1C1A]/90 border-stone-800/40 text-slate-300" : "bg-white/90 border-slate-200 text-slate-700"}`}>
                <p className={`font-mono uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                <p className="font-semibold tabular-nums text-sky-500">{payload[0].value} users</p>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? "bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg"
            }`}
        >
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent group-hover:via-sky-400/70 transition-all" />
            <div className="p-5">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Crescita Utenti
                </p>
                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={users.growthByMonth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10, fontFamily: "monospace", fill: isDark ? "#6b7280" : "#94a3b8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 10, fontFamily: "monospace", fill: isDark ? "#6b7280" : "#94a3b8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", strokeWidth: 1 }} />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#0369A1"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: "#0369A1", strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}
