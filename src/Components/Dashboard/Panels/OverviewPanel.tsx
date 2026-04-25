import { DetailItem } from "../DetailItem.tsx";

export function OverviewPanel({ users, surveys, theme }: any) {
    const isDark = theme === "dark";

    const cardBg = isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200";
    const textColor = isDark ? "text-slate-100" : "text-slate-900";

    return (
        <div className="space-y-8">
            <div className={`rounded-2xl border ${cardBg} p-6 sm:p-8`}>
                <h2 className={`text-xl font-semibold mb-4 sm:mb-6 ${textColor}`}>User Distribution</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <DetailItem label="Admin" value={users?.usersByRole.admin} theme={theme} />
                    <DetailItem label="User" value={users?.usersByRole.user} theme={theme} />
                    <DetailItem label="Verified" value={users?.verifiedEmails} theme={theme} />
                    <DetailItem label="Unverified" value={users?.unverifiedEmails} theme={theme} />
                </div>
            </div>

            <div className={`rounded-2xl border ${cardBg} p-6 sm:p-8`}>
                <h2 className={`text-xl font-semibold mb-4 sm:mb-6 ${textColor}`}>Survey Trend</h2>
                <div className="space-y-2">
                    {surveys?.responsesByMonth.map((item: any) => (
                        <div key={item.month} className={`flex justify-between border-b ${isDark ? "border-blue-900/20" : "border-slate-200"} pb-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            <span>{item.month}</span>
                            <span>{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

