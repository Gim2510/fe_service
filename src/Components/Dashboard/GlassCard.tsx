import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function GlassCard({ title, children, theme, index = 0, glow = "sky" }: { title?: string; children: ReactNode; theme: string; index?: number; glow?: "sky" | "emerald" | "violet" | "amber" | "cyan" | "rose" }) {
    const isDark = theme === "dark";

    const topGlows: Record<string, string> = {
        sky: "from-transparent via-sky-500/40 to-transparent group-hover:via-sky-400/60",
        emerald: "from-transparent via-emerald-500/40 to-transparent group-hover:via-emerald-400/60",
        violet: "from-transparent via-violet-500/40 to-transparent group-hover:via-violet-400/60",
        amber: "from-transparent via-amber-500/40 to-transparent group-hover:via-amber-400/60",
        cyan: "from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400/60",
        rose: "from-transparent via-rose-500/40 to-transparent group-hover:via-rose-400/60",
    };

    const glowShadows: Record<string, string> = {
        sky: "shadow-sky-500/10",
        emerald: "shadow-emerald-500/10",
        violet: "shadow-violet-500/10",
        amber: "shadow-amber-500/10",
        cyan: "shadow-cyan-500/10",
        rose: "shadow-rose-500/10",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                    ? `bg-[#0E0E0D]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg ${glowShadows[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md`
            }`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r ${topGlows[glow]} transition-all`} />
            <div className="p-5">
                {title && (
                    <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4
                        ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {title}
                    </h3>
                )}
                {children}
            </div>
        </motion.div>
    );
}
