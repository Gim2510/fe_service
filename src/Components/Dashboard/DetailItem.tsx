export function DetailItem({ label, value, theme }: { label: string; value?: number; theme: string }) {
    const isDark = theme === "dark";
    return (
        <div className={`flex justify-between items-center py-3 border-b ${isDark ? "border-blue-900/20" : "border-slate-200"} last:border-none`}>
            <span className={isDark ? "text-slate-400" : "text-slate-600"}>{label}</span>
            <span className={isDark ? "text-slate-100" : "text-slate-900"}>{value ?? "-"}</span>
        </div>
    );
}