import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";

export function WAWD({ theme }: { theme: string }) {
    const punti = [
        "CRM e sistemi di vendita su misura",
        "Automazione dei processi operativi",
        "Integrazione tra software esistenti",
        "Analisi dati e reporting decisionale",
        "Intelligenza artificiale applicata",
        "Scalabilità e manutenzione nel tempo"
    ];

    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                <GlassCard
                    theme={theme}
                    className={`p-12 ${isDark ? "" : "bg-white/5 border-black/10"}`}
                >
                    <div className={`aspect-[4/3] flex items-center justify-center ${isDark ? "text-neutral-500" : "text-neutral-700"} text-sm`}>
                        Placeholder visual
                    </div>
                </GlassCard>

                <div className="flex flex-col gap-6">
                    <h2 className={`${isDark ? "text-white" : "text-neutral-900"} text-3xl font-semibold leading-tight`}>
                        Soluzioni digitali progettate intorno
                        ai tuoi processi reali
                    </h2>

                    <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                        Ogni azienda ha flussi...
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {punti.map((item) => (
                            <div key={item} className={`flex items-start gap-3 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionBase>
    );
}