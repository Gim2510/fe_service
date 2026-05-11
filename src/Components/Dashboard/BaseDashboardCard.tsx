import type { ReactNode } from "react";

export function BaseDashboardCard({ title, children, theme }: { title: string; children?: ReactNode; theme?: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5
            ${isDark
                ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-rose-800/30"
                : "bg-[#F8FAFB] border-slate-200 hover:border-rose-400 shadow-sm"
            }`}
        >
            <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {title}
            </p>
            {children}
            <div className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 ${isDark ? "bg-rose-600/30" : "bg-rose-500/30"}`} />
        </div>
    );
}
