import { motion } from "framer-motion";

export function KPIBox({ label, value, sub, theme, index = 0 }: any) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-emerald-700/50" />
            <div className="p-6">
                <div className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-3
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {label}
                </div>
                <div className={`text-3xl font-semibold tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {value}
                </div>
                {sub && (
                    <div className={`text-xs mt-2.5 font-mono ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        {sub}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
