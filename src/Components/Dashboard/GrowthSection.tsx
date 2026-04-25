import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function GrowthSection({ users, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200"}`}>
            <div className={`mb-4 text-xs font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                User Growth
            </div>
            <div className="h-56">
                <ResponsiveContainer>
                    <LineChart data={users.growthByMonth}>
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
