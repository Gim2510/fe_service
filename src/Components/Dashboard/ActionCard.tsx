import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ActionCard({ title, children, theme, index = 0 }: { title: string; children: ReactNode; theme: string; index?: number; glow?: string }) {
    const isDark = theme === "dark";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
                isDark ? "bg-[#0E0E0D]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/5" : "bg-white/80 border-sky-200 shadow-sm"
            }`}>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="p-5">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{title}</h3>
                <div className="flex flex-col gap-3">{children}</div>
            </div>
        </motion.div>
    );
}
