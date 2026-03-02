type Metric = { label: string; value: number; note: string };
const metrics: Metric[] = [
    { label: "Process control", value: 45, note: "Partially structured" },
    { label: "Data reliability", value: 35, note: "Fragmented sources" },
    { label: "Security posture", value: 50, note: "Baseline measures" },
    { label: "Automation level", value: 25, note: "Mostly manual" },
];

export function HeroOperationalSnapshot({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`group relative rounded-3xl border p-8 space-y-6 backdrop-blur-sm opacity-100 sm:opacity-20 sm:hover:opacity-100 transition-all duration-700 ease-out
                         shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                         ${isDark ? "bg-neutral-900/70 border-white/10" : "bg-white/70 border-neutral-300"}`}>
            <div className="flex justify-between items-baseline">
                <h3 className={`${isDark ? "text-white" : "text-neutral-900"} text-lg font-medium`}>
                    Digital Operations Snapshot
                </h3>
                <span className={`${isDark ? "text-white/40" : "text-neutral-500"} text-xs`}>
                    Estimated • non-intrusive
                </span>
            </div>

            <div className="space-y-5">
                {metrics.map(metric => (
                    <div key={metric.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className={`${isDark ? "text-white/70" : "text-neutral-700"}`}>{metric.label}</span>
                            <span className={`${isDark ? "text-white/40" : "text-neutral-500"}`}>{metric.note}</span>
                        </div>

                        <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${isDark ? "from-white/40 to-white/20" : "from-black/40 to-black/20"} transition-all duration-[2000ms]`}
                                style={{ width: `${metric.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={`pt-4 border-t text-sm ${isDark ? "border-white/10 text-white/60" : "border-neutral-300 text-neutral-700"}`}>
                Estimated maturity: <span className={isDark ? "text-white" : "text-neutral-900"}>Early stage</span>
            </div>
        </div>
    );
}