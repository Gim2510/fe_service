import { motion } from "framer-motion";

interface DashboardCardProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    className?: string;
    theme: string;
    delay?: number;
    glow?: "sky" | "emerald" | "violet" | "amber" | "rose" | "cyan";
}

const glowColors = {
    sky: "shadow-sky-500/10 border-sky-500/20",
    emerald: "shadow-emerald-500/10 border-emerald-500/20",
    violet: "shadow-violet-500/10 border-violet-500/20",
    amber: "shadow-amber-500/10 border-amber-500/20",
    rose: "shadow-rose-500/10 border-rose-500/20",
    cyan: "shadow-cyan-500/10 border-cyan-500/20",
};

const glowBorders = {
    sky: "hover:border-sky-500/40",
    emerald: "hover:border-emerald-500/40",
    violet: "hover:border-violet-500/40",
    amber: "hover:border-amber-500/40",
    rose: "hover:border-rose-500/40",
    cyan: "hover:border-cyan-500/40",
};

export function DashboardCard({ children, title, icon, className = "", theme, delay = 0, glow = "sky" }: DashboardCardProps) {
    const isDark = theme === "dark";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                isDark
                    ? `bg-[#161614]/80 border-stone-800/30 hover:border-stone-700/50 shadow-lg ${glowColors[glow]} hover:${glowBorders[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg`
            } ${className}`}
        >
            {isDark && (
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${glow}-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            )}

            {(title || icon) && (
                <div className={`px-5 py-3.5 border-b ${isDark ? "border-stone-800/30" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2.5">
                        {icon && <span className={isDark ? `text-${glow}-400` : `text-${glow}-600`}>{icon}</span>}
                        {title && (
                            <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                                isDark ? "text-slate-300" : "text-slate-700"
                            }`}>
                                {title}
                            </h3>
                        )}
                    </div>
                </div>
            )}

            <div className="p-5">
                {children}
            </div>
        </motion.div>
    );
}
