import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    theme: string;
    hover?: boolean;
}

export function GlassCard({ children, className = "", theme, hover = true }: GlassCardProps) {
    const isDark = theme === "dark";

    const base = isDark
        ? "bg-[#1C1C1A]/80 border border-stone-800/20 hover:border-emerald-800/30"
        : "bg-white border border-slate-200 hover:border-emerald-400";

    return (
        <motion.div
            className={`relative rounded-2xl transition-colors duration-300 ${base} ${className}`}
            whileHover={hover ? { y: -4, transition: { duration: 0.2, ease: "easeOut" } } : {}}
        >
            {children}
        </motion.div>
    );
}
