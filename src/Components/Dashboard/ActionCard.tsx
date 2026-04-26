import type { ReactNode } from "react";

export function ActionCard({ title, children, theme }: { title: string; children: ReactNode; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-0.5
            ${isDark
                ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-amber-800/30"
                : "bg-[#F8FAFB] border-slate-200 hover:border-amber-400"
            }`}
        >
            <h3 className={`text-base font-semibold mb-6 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h3>
            <div className="flex flex-col gap-4 relative z-10">{children}</div>
        </div>
    );
}
