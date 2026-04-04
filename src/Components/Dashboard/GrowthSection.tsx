import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export function GrowthSection({ users, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`p-6 rounded-2xl border backdrop-blur-xl
            ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-gray-200"}`}
        >
            <div className="mb-4 text-sm opacity-70">
                User Growth
            </div>

            <div className="h-64">
                <ResponsiveContainer>
                    <LineChart data={users.growthByMonth}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#BD1E1E"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}