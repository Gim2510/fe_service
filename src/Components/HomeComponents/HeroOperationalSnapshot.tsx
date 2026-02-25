type Metric = {
    label: string
    value: number // 0–100
    note: string
}

const metrics: Metric[] = [
    { label: "Process control", value: 45, note: "Partially structured" },
    { label: "Data reliability", value: 35, note: "Fragmented sources" },
    { label: "Security posture", value: 50, note: "Baseline measures" },
    { label: "Automation level", value: 25, note: "Mostly manual" },
]

export function HeroOperationalSnapshot() {
    return (
        <div className="group relative rounded-3xl border border-white/10 p-8 space-y-6 bg-neutral-900/70
                        backdrop-blur-sm opacity-100 sm:opacity-20 sm:hover:opacity-100 transition-all duration-700 ease-out
                        shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-white">
                    Digital Operations Snapshot
                </h3>
                <span className="text-xs text-white/40">
          Estimated • non-intrusive
        </span>
            </div>

            <div className="space-y-5">
                {metrics.map(metric => (
                    <div key={metric.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/70">{metric.label}</span>
                            <span className="text-white/40">{metric.note}</span>
                        </div>

                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/20 transition-all duration-[2000ms]"
                                style={{width: `${metric.value}%`}}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-sm text-white/60">
                Estimated maturity: <span className="text-white">Early stage</span>
            </div>
        </div>
    )
}