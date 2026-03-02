import type {ReactNode} from "react";

export function ActionCard({title, children, theme}: { title: string; children: ReactNode; theme: string }) {
    const isDark = theme === "dark";
    const bg = isDark ? "bg-white/[0.03] border border-white/[0.06]" : "bg-white/50 border border-gray-200";
    const hover = isDark ? "hover:border-white/[0.15]" : "hover:border-gray-300";

    return (
        <div className={`group relative rounded-[28px] p-8 backdrop-blur-xl transition-all duration-500 ${bg} ${hover} hover:scale-[1.02]`}>
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition" />

            <h3 className={`${isDark ? "text-white" : "text-gray-900"} text-lg font-medium mb-6`}>{title}</h3>

            <div className="flex flex-col gap-4 relative z-10">
                {children}
            </div>
        </div>
    );
}