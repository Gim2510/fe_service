export function DashboardCard({title,value,}: {title: string; value?: number | string; }) {
    return (
        <div className="group relative overflow-hidden rounded-[28px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl
        p-8 transition-all duration-500 hover:scale-[1.03] hover:border-white/[0.15] ">

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <p className="text-neutral-400 text-sm tracking-wide uppercase">
                {title}
            </p>

            <p className="text-4xl font-semibold mt-4 tracking-tight">
                {value ?? "-"}
            </p>

            {/* subtle animated line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white/40 group-hover:w-full transition-all duration-700" />
        </div>
    );
}
