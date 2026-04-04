export function KPIBox({ label, value, sub, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`p-6 rounded-2xl border backdrop-blur-xl transition-all hover:scale-[1.02]
            ${isDark ? "bg-white/[0.05] border-white/[0.1]" : "bg-white border-gray-200 shadow-sm"}`}
        >
            <div className="text-xs opacity-60">{label}</div>

            <div className="text-3xl font-semibold mt-2">
                {value}
            </div>

            {sub && (
                <div className="text-xs mt-2 opacity-60">
                    {sub}
                </div>
            )}
        </div>
    );
}