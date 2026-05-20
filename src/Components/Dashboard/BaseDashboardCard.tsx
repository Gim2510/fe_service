import type { ReactNode } from "react";

export function BaseDashboardCard({ title, children, theme }: { title: string; children?: ReactNode; theme?: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5
            ${isDark
                ? "bg-[#0E0E0D]/80 border-stone-800/20 hover:border-stone-700/40 shadow-lg shadow-sky-500/10"
                : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-md"
            }`}
        >
            <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent group-hover:via-sky-400/60 transition-all`} />
            <div className="p-5">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {title}
                </p>
                {children}
            </div>
        </div>
    );
}
