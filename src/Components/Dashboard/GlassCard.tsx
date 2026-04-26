export function GlassCard({ title, children, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`rounded-2xl p-6 border transition-all
            ${isDark
                ? "bg-[#1C1C1A]/80 border-stone-800/20"
                : "bg-[#F8FAFB] border-slate-200 shadow-sm"
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
