type Props = { users: any; surveys: any; theme: string };

export function DashboardStatsTable({ users, surveys, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#0E0E0D]/80 border-stone-800/20" : "bg-white/80 border-slate-200";
    const rowBorder = isDark ? "border-stone-800/20" : "border-slate-200";
    const head = isDark ? "text-slate-500" : "text-slate-400";

    const rows = [
        { label: "Total Users", value: users?.totalUsers },
        { label: "Active Users", value: users?.activeUsers },
        { label: "VIP Users", value: users?.vipActive },
        { label: "Total Surveys", value: surveys?.totalResponses },
        { label: "Published", value: surveys?.publishedResponses },
        { label: "Average Score", value: surveys?.averageScore?.toFixed(2) },
    ];

    return (
        <div className={`rounded-2xl overflow-hidden border ${card}`}>
            <table className="w-full text-sm">
                <thead>
                    <tr className={`border-b ${rowBorder}`}>
                        <th className={`text-left p-4 text-xs font-semibold uppercase tracking-widest ${head}`}>Metric</th>
                        <th className={`text-right p-4 text-xs font-semibold uppercase tracking-widest ${head}`}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={row.label} className={i < rows.length - 1 ? `border-b ${rowBorder}` : ""}>
                            <td className={`p-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{row.label}</td>
                            <td className={`p-4 text-right font-semibold tabular-nums ${isDark ? "text-slate-200" : "text-slate-800"}`}>{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
