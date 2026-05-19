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
    sky: "shadow-sky-500/10",
    emerald: "shadow-emerald-500/10",
    violet: "shadow-violet-500/10",
    amber: "shadow-amber-500/10",
    rose: "shadow-rose-500/10",
    cyan: "shadow-cyan-500/10",
};

const glowTopGradients = {
    sky: "from-sky-600/60 via-sky-500/40 to-sky-600/60",
    emerald: "from-emerald-600/60 via-emerald-500/40 to-emerald-600/60",
    violet: "from-violet-600/60 via-violet-500/40 to-violet-600/60",
    amber: "from-amber-600/60 via-amber-500/40 to-amber-600/60",
    rose: "from-rose-600/60 via-rose-500/40 to-rose-600/60",
    cyan: "from-cyan-600/60 via-cyan-500/40 to-cyan-600/60",
};

const glowIconColors = {
    sky: "text-sky-400",
    emerald: "text-emerald-400",
    violet: "text-violet-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    cyan: "text-cyan-400",
};

const glowHoverBorders = {
    sky: "hover:border-sky-500/30",
    emerald: "hover:border-emerald-500/30",
    violet: "hover:border-violet-500/30",
    amber: "hover:border-amber-500/30",
    rose: "hover:border-rose-500/30",
    cyan: "hover:border-cyan-500/30",
};

export function DashboardCard({ children, title, icon, className = "", theme, delay = 0, glow = "sky" }: DashboardCardProps) {
    const isDark = theme === "dark";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
            className={`group relative rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${
                isDark
                    ? `bg-[#1A1A18]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg ${glowColors[glow]} ${glowHoverBorders[glow]}`
                    : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg`
            } ${className}`}
        >
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${glowTopGradients[glow]} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {isDark && (
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            {(title || icon) && (
                <div className={`relative px-5 py-3.5 border-b ${isDark ? "border-stone-800/20" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2.5">
                        {icon && <span className={isDark ? glowIconColors[glow] : `text-${glow}-600`}>{icon}</span>}
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

            <div className="relative p-5">
                {children}
            </div>
        </motion.div>
    );
}
