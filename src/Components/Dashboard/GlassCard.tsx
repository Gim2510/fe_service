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
        sky: "shadow-sky-500/10 hover:shadow-sky-500/20",
        emerald: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
        violet: "shadow-violet-500/10 hover:shadow-violet-500/20",
        amber: "shadow-amber-500/10 hover:shadow-amber-500/20",
        cyan: "shadow-cyan-500/10 hover:shadow-cyan-500/20",
        rose: "shadow-rose-500/10 hover:shadow-rose-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? `bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg ${glowShadows[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md ${glowShadows[glow]}`
            }`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r ${topGlows[glow]} transition-all`} />
            <div className="p-5">
                {title && (
                    <h3 className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4
                        ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {title}
                    </h3>
                )}
                {children}
            </div>
        </motion.div>
    );
}
