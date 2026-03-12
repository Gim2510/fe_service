type Props = {
    users: any;
    surveys: any;
    theme: string;
};

export function DashboardStatsTable({ users, surveys, theme }: Props) {

    const isDark = theme === "dark";

    const container = isDark
        ? "bg-white/[0.04] border border-white/[0.08]"
        : "bg-white border border-gray-200";

    const head = isDark
        ? "text-neutral-400"
        : "text-gray-500";

    const row = isDark
        ? "border-white/[0.06]"
        : "border-gray-200";

    return (
        <div className={`rounded-2xl overflow-hidden ${container}`}>

            <table className="w-full text-sm">

                <thead className={`${head}`}>
                <tr className="border-b">
                    <th className="text-left p-4">Metric</th>
                    <th className="text-right p-4">Value</th>
                </tr>
                </thead>

                <tbody>

                <tr className={`border-b ${row}`}>
                    <td className="p-4">Total Users</td>
                    <td className="p-4 text-right font-semibold">
                        {users?.totalUsers}
                    </td>
                </tr>

                <tr className={`border-b ${row}`}>
                    <td className="p-4">Active Users</td>
                    <td className="p-4 text-right font-semibold">
                        {users?.activeUsers}
                    </td>
                </tr>

                <tr className={`border-b ${row}`}>
                    <td className="p-4">VIP Users</td>
                    <td className="p-4 text-right font-semibold">
                        {users?.vipActive}
                    </td>
                </tr>

                <tr className={`border-b ${row}`}>
                    <td className="p-4">Total Surveys</td>
                    <td className="p-4 text-right font-semibold">
                        {surveys?.totalResponses}
                    </td>
                </tr>

                <tr className={`border-b ${row}`}>
                    <td className="p-4">Published</td>
                    <td className="p-4 text-right font-semibold">
                        {surveys?.publishedResponses}
                    </td>
                </tr>

                <tr>
                    <td className="p-4">Average Score</td>
                    <td className="p-4 text-right font-semibold">
                        {surveys?.averageScore?.toFixed(2)}
                    </td>
                </tr>

                </tbody>

            </table>

        </div>
    );
}