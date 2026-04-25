import type { ReactNode } from "react";

export function ActionCard({ title, children, theme }: { title: string; children: ReactNode; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-0.5
            ${isDark
                ? "bg-[#0D1A30]/80 border-blue-900/20 hover:border-blue-700/30"
                : "bg-white border-slate-200 hover:border-blue-200"
            }`}
        >
            <h3 className={`text-base font-semibold mb-6 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h3>
            <div className="flex flex-col gap-4 relative z-10">{children}</div>
        </div>
    );
}
