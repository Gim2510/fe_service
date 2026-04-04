export function GlassCard({ title, children, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-2xl p-5 backdrop-blur-xl border transition-all
            ${isDark
                ? "bg-white/[0.04] border-white/[0.08]"
                : "bg-white/70 border-gray-200 shadow-md"
            }`}
        >
            <h3 className={`text-sm mb-4 font-medium ${isDark ? "text-white/80" : "text-gray-700"}`}>
                {title}
            </h3>

            {children}
        </div>
    );
}