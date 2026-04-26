export function KPIBox({ label, value, sub, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-0.5 duration-200
            ${isDark
                ? "bg-[#1C1C1A]/80 border-stone-800/20"
                : "bg-[#F8FAFB] border-slate-200 shadow-sm"
            }`}
        >
            <div className={`text-xs font-medium uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {label}
            </div>
            <div className={`text-3xl font-semibold mt-2 tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {value}
            </div>
            {sub && (
                <div className={`text-xs mt-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    {sub}
                </div>
            )}
        </div>
    );
}
