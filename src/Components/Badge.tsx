import { motion } from "framer-motion";

type BadgeProps = {
    label: string;
    color?: "sky" | "red" | "amber" | "orange" | "rose" | "yellow" | "pink" | "cyan" | "violet" | "emerald" | "green";
    theme?: "light" | "dark";
    pulse?: boolean;
    className?: string;
};

const colorMap = {
    sky: { dark: "text-sky-400 border-stone-700/40 bg-stone-800/20", dot: "bg-sky-500", light: "text-sky-600 border-sky-300 bg-sky-50", dotLight: "bg-sky-500" },
    red: { dark: "text-red-400 border-stone-700/40 bg-stone-800/20", dot: "bg-red-500", light: "text-red-600 border-red-300 bg-red-50", dotLight: "bg-red-500" },
    amber: { dark: "text-amber-400 border-stone-700/40 bg-stone-800/20", dot: "bg-amber-500", light: "text-amber-600 border-amber-300 bg-amber-50", dotLight: "bg-amber-500" },
    orange: { dark: "text-orange-400 border-stone-700/40 bg-stone-800/20", dot: "bg-orange-500", light: "text-orange-600 border-orange-300 bg-orange-50", dotLight: "bg-orange-500" },
    rose: { dark: "text-rose-400 border-stone-700/40 bg-stone-800/20", dot: "bg-rose-500", light: "text-rose-600 border-rose-300 bg-rose-50", dotLight: "bg-rose-500" },
    yellow: { dark: "text-yellow-400 border-stone-700/40 bg-stone-800/20", dot: "bg-yellow-500", light: "text-yellow-600 border-yellow-300 bg-yellow-50", dotLight: "bg-yellow-500" },
    pink: { dark: "text-pink-400 border-stone-700/40 bg-stone-800/20", dot: "bg-pink-500", light: "text-pink-600 border-pink-300 bg-pink-50", dotLight: "bg-pink-500" },
    cyan: { dark: "text-cyan-400 border-stone-700/40 bg-stone-800/20", dot: "bg-cyan-500", light: "text-cyan-600 border-cyan-300 bg-cyan-50", dotLight: "bg-cyan-500" },
    violet: { dark: "text-violet-400 border-stone-700/40 bg-stone-800/20", dot: "bg-violet-500", light: "text-violet-600 border-violet-300 bg-violet-50", dotLight: "bg-violet-500" },
    emerald: { dark: "text-emerald-400 border-stone-700/40 bg-stone-800/20", dot: "bg-emerald-500", light: "text-emerald-600 border-emerald-300 bg-emerald-50", dotLight: "bg-emerald-500" },
    green: { dark: "text-green-400 border-stone-700/40 bg-stone-800/20", dot: "bg-green-500", light: "text-green-600 border-green-300 bg-green-50", dotLight: "bg-green-500" },
};

export function Badge({ label, color = "sky", theme = "dark", pulse = true, className = "" }: BadgeProps) {
    const isDark = theme === "dark";
    const colors = colorMap[color];
    const classes = isDark ? colors.dark : colors.light;
    const dotColor = isDark ? colors.dot : colors.dotLight;

    return (
        <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${classes} ${className}`}>
            {pulse && (
                <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
            {label}
        </span>
    );
}
