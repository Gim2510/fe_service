export function DashboardCard({ title, value, theme }: { title: string; value?: number | string; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer
            ${isDark
                ? "bg-[#1C1C1A]/80 border-stone-800/20 hover:border-sky-800/30"
                : "bg-[#F8FAFB] border-slate-200 hover:border-sky-400 shadow-sm"
            }`}
        >
            <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>{title}</p>
            <p className={`text-4xl font-semibold mt-4 tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>{value ?? "-"}</p>
            <div className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 ${isDark ? "bg-sky-600/30" : "bg-sky-500/30"}`} />
        </div>
    );
}
