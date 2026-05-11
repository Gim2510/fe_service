export function MetricRow({ label, value, theme }: { label: string; value: any; theme?: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`flex justify-between items-center py-2.5 border-b last:border-none
            ${isDark ? "border-stone-800/20" : "border-slate-100"}`}>
            <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{label}</span>
            <span className={`text-xs font-semibold font-mono tabular-nums ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                {value}
            </span>
        </div>
    );
}
