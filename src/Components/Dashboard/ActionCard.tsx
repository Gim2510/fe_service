import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ActionCard({ title, children, theme, index = 0 }: { title: string; children: ReactNode; theme: string; index?: number }) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-sky-700/40" />
            <div className="p-7">
                <h3 className={`text-xs font-semibold uppercase tracking-widest mb-6
                    ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {title}
                </h3>
                <div className="flex flex-col gap-3.5">{children}</div>
            </div>
        </motion.div>
    );
}
