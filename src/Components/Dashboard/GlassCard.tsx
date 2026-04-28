import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function GlassCard({ title, children, theme, index = 0 }: { title?: string; children: ReactNode; theme: string; index?: number }) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-amber-700/35" />
            <div className="p-6">
                {title && (
                    <h3 className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5
                        ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {title}
                    </h3>
                )}
                {children}
            </div>
        </motion.div>
    );
}
