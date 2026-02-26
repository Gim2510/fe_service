import type {ReactNode} from "react";

export function ActionCard({title, children}: { title: string; children: ReactNode; }) {
    return (
        <div className="group relative rounded-[28px] bg-white/[0.03] border border-white/[0.06] p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:scale-[1.02]">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition" />

            <h3 className="text-lg font-medium mb-6">{title}</h3>

            <div className="flex flex-col gap-4 relative z-10">
                {children}
            </div>
        </div>
    );
}