export function DashboardCard({ title, value, theme }: { title: string; value?: number | string; theme: string }) {
    const isDark = theme === "dark";

    const bgClass = isDark
        ? "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15]"
        : "bg-white/50 border border-gray-200 hover:border-gray-300";

    const textClass = isDark ? "text-neutral-400" : "text-gray-700";

    return (
        <div className={`group relative overflow-hidden rounded-[28px] backdrop-blur-2xl p-8 transition-all duration-500 hover:scale-[1.03] cursor-pointer ${bgClass}`}>

            <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

            <p className={`text-sm tracking-wide uppercase ${textClass}`}>
                {title}
            </p>

            <p className={`text-4xl font-semibold mt-4 tracking-tight ${textClass}`}>
                {value ?? "-"}
            </p>

            <div className={`absolute bottom-0 left-0 h-[2px] w-0 ${isDark ? "bg-white/40" : "bg-gray-400/40"} group-hover:w-full transition-all duration-700`} />
        </div>
    );
}