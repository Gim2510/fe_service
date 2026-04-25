export function GlassCard({ title, children, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`rounded-2xl p-6 border transition-all
            ${isDark
                ? "bg-[#0D1A30]/80 border-blue-900/20"
                : "bg-white border-slate-200 shadow-sm"
            }`}
        >
            {title && (
                <h3 className={`text-xs font-semibold uppercase tracking-widest mb-5
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
