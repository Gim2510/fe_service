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
    sky: "from-transparent via-sky-500/40 to-transparent group-hover:via-sky-400/60",
    emerald: "from-transparent via-emerald-500/40 to-transparent group-hover:via-emerald-400/60",
    violet: "from-transparent via-violet-500/40 to-transparent group-hover:via-violet-400/60",
    amber: "from-transparent via-amber-500/40 to-transparent group-hover:via-amber-400/60",
    rose: "from-transparent via-rose-500/40 to-transparent group-hover:via-rose-400/60",
    cyan: "from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400/60",
};

const glowIconColors = {
    sky: "text-sky-400",
    emerald: "text-emerald-400",
    violet: "text-violet-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    cyan: "text-cyan-400",
};

const borderColors = {
    sky: "border-stone-800/20 hover:border-stone-700/40",
    emerald: "border-stone-800/20 hover:border-stone-700/40",
    violet: "border-stone-800/20 hover:border-stone-700/40",
    amber: "border-stone-800/20 hover:border-stone-700/40",
    rose: "border-stone-800/20 hover:border-stone-700/40",
    cyan: "border-stone-800/20 hover:border-stone-700/40",
};

const lightBorders = {
    sky: "border-slate-200 hover:border-slate-300",
    emerald: "border-slate-200 hover:border-slate-300",
    violet: "border-slate-200 hover:border-slate-300",
    amber: "border-slate-200 hover:border-slate-300",
    rose: "border-slate-200 hover:border-slate-300",
    cyan: "border-slate-200 hover:border-slate-300",
};

export function DashboardCard({ children, title, icon, className = "", theme, delay = 0, glow = "sky" }: DashboardCardProps) {
    const isDark = theme === "dark";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
            className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                    ? `bg-[#0E0E0D]/80 ${borderColors[glow]} shadow-lg ${glowColors[glow]}`
                    : `bg-white/80 ${lightBorders[glow]} shadow-md`
            } ${className}`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r ${glowTopGradients[glow]} transition-all`} />

            {(title || icon) && (
                <div className={`px-5 py-3.5 border-b ${isDark ? "border-stone-800/20" : "border-slate-100"}`}>
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
