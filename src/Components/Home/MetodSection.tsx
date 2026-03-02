// MetodSection.tsx
import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";

export function MetodSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const steps = [
        { step: "01", title: "Analisi", text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento." },
        { step: "02", title: "Progettazione", text: "Definiamo un’architettura solida, sostenibile e allineata agli obiettivi di business." },
        { step: "03", title: "Implementazione", text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili." }
    ];

    return (
        <SectionBase theme={theme}>
            <div className="max-w-3xl mb-24">
                <span className={`text-sm uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Metodo
                </span>
                <h2 className={`${isDark ? "text-white" : "text-neutral-900"} text-4xl font-semibold mt-4`}>
                    Un approccio strutturato
                    <br />
                    <span className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                        orientato ai risultati concreti.
                    </span>
                </h2>
                <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} mt-6 text-lg`}>
                    Ogni progetto segue...
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((item) => (
                    <GlassCard
                        key={item.step}
                        theme={theme}
                        className={`p-10 ${isDark ? "" : "bg-white/5 border-black/10"}`}
                    >
                        <div className={`${isDark ? "text-white/10" : "text-black/10"} text-5xl font-semibold mb-6`}>
                            {item.step}
                        </div>
                        <h3 className={`${isDark ? "text-white" : "text-neutral-900"} text-xl font-medium mb-4`}>
                            {item.title}
                        </h3>
                        <p className={`${isDark ? "text-neutral-400" : "text-neutral-700"} text-sm leading-relaxed`}>
                            {item.text}
                        </p>
                    </GlassCard>
                ))}
            </div>
        </SectionBase>
    );
}