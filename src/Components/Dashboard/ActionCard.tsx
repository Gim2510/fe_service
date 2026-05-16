import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ActionCard({ title, children, theme, index = 0, glow = "sky" }: { title: string; children: ReactNode; theme: string; index?: number; glow?: "sky" | "emerald" | "violet" | "amber" | "rose" | "red" }) {
    const isDark = theme === "dark";

    const glowColors: Record<string, string> = {
        sky: "from-sky-600 via-sky-500 to-sky-600",
        emerald: "from-emerald-600 via-emerald-500 to-emerald-600",
        violet: "from-violet-600 via-violet-500 to-violet-600",
        amber: "from-amber-600 via-amber-500 to-amber-600",
        rose: "from-rose-600 via-rose-500 to-rose-600",
        red: "from-red-600 via-red-500 to-red-600",
    };

    const glowShadows: Record<string, string> = {
        sky: "shadow-sky-500/10 hover:shadow-sky-500/20",
        emerald: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
        violet: "shadow-violet-500/10 hover:shadow-violet-500/20",
        amber: "shadow-amber-500/10 hover:shadow-amber-500/20",
        rose: "shadow-rose-500/10 hover:shadow-rose-500/20",
        red: "shadow-red-500/10 hover:shadow-red-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                    ? `bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg ${glowShadows[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md ${glowShadows[glow]}`
            }`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-${glow}-500/60 to-transparent group-hover:via-${glow}-400/80 transition-all`} />

            <div className="p-5">
                <h3 className={`text-xs font-semibold uppercase tracking-widest mb-5 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    {title}
                </h3>
                <div className="flex flex-col gap-3.5">{children}</div>
            </div>
        </motion.div>
    );
}
