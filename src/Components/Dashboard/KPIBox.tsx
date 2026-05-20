import { motion } from "framer-motion";

export function KPIBox({ label, value, sub, theme, index = 0, glow = "sky" }: any) {
    const isDark = theme === "dark";

    const glowColors: Record<string, string> = {
        sky: "shadow-sky-500/10 hover:shadow-sky-500/20",
        emerald: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
        violet: "shadow-violet-500/10 hover:shadow-violet-500/20",
        amber: "shadow-amber-500/10 hover:shadow-amber-500/20",
    };

    const topGlows: Record<string, string> = {
        sky: "from-transparent via-sky-500/50 to-transparent",
        emerald: "from-transparent via-emerald-500/50 to-transparent",
        violet: "from-transparent via-violet-500/50 to-transparent",
        amber: "from-transparent via-amber-500/50 to-transparent",
    };

    const valueColors: Record<string, string> = {
        sky: isDark ? "text-sky-400" : "text-sky-700",
        emerald: isDark ? "text-emerald-400" : "text-emerald-700",
        violet: isDark ? "text-violet-400" : "text-violet-700",
        amber: isDark ? "text-amber-400" : "text-amber-700",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? `bg-[#0E0E0D]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg ${glowColors[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md ${glowColors[glow]}`
            }`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r ${topGlows[glow]} group-hover:opacity-80 transition-opacity`} />
            <div className="p-5">
                <div className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-2
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {label}
                </div>
                <div className={`text-2xl font-semibold font-fjalla tabular-nums ${valueColors[glow]}`}>
                    {value}
                </div>
                {sub && (
                    <div className={`text-xs mt-2 font-mono ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        {sub}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
