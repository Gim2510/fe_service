import { motion } from "framer-motion";
import { DetailItem } from "../DetailItem.tsx";

export function OverviewPanel({ users, surveys, theme }: any) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    return (
        <div className="space-y-4">
            {/* User Distribution */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border overflow-hidden ${border}`}
                style={{ background: isDark ? "#161614" : "#FAFAF8" }}
            >
                <div className="h-[2px] w-full bg-amber-700/40" />
                <div className="p-7">
                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        User Distribution
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                        <DetailItem label="Admin"      value={users?.usersByRole.admin}  theme={theme} />
                        <DetailItem label="User"       value={users?.usersByRole.user}   theme={theme} />
                        <DetailItem label="Verified"   value={users?.verifiedEmails}     theme={theme} />
                        <DetailItem label="Unverified" value={users?.unverifiedEmails}   theme={theme} />
                    </div>
                </div>
            </motion.div>

            {/* Survey Trend */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className={`rounded-2xl border overflow-hidden ${border}`}
                style={{ background: isDark ? "#161614" : "#FAFAF8" }}
            >
                <div className="h-[2px] w-full bg-amber-700/40" />
                <div className="p-7">
                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Survey Trend
                    </p>
                    <div className="space-y-0">
                        {surveys?.responsesByMonth.map((item: any, i: number) => (
                            <motion.div
                                key={item.month}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.04 }}
                                className={`flex justify-between items-center py-2.5 border-b last:border-none text-xs
                                    ${isDark ? "border-stone-800/20" : "border-slate-100"}`}
                            >
                                <span className={`font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>{item.month}</span>
                                <span className={`font-semibold tabular-nums ${isDark ? "text-slate-200" : "text-slate-800"}`}>{item.count}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
