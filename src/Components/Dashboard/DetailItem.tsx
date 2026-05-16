export function DetailItem({ label, value, theme }: { label: string; value?: number | string; theme: string }) {
    const isDark = theme === "dark";
    return (
        <div className={`flex justify-between items-center py-3 border-b last:border-none
            ${isDark ? "border-stone-800/20" : "border-slate-100"}`}>
            <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{label}</span>
            <span className={`text-sm font-semibold font-mono tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {value ?? "—"}
            </span>
        </div>
    );
}
