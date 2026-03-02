// CTASection.tsx
import { useNavigate } from "react-router-dom";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";

export function CTASection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");

    return (
        <section className={`relative overflow-hidden ${isDark ? "bg-neutral-900" : "bg-gray-100"}`}>
            {/* Subtle technical grid texture */}
            <div className="absolute inset-0 opacity-[0.04]
                bg-[linear-gradient(to_right,#000_1px,transparent_1px),
                linear-gradient(to_bottom,#000_1px,transparent_1px)]
                bg-[size:60px_60px]" />

            {/* Soft radial light diffusion */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[800px] h-[800px] rounded-full blur-3xl opacity-30 ${isDark ? "bg-white/5" : "bg-black/5"}`} />

            <div className="relative mx-auto max-w-5xl px-8 py-32 text-center flex flex-col items-center">

                {/* Headline */}
                <h2 className={`${isDark ? "text-white" : "text-gray-900"} text-4xl md:text-5xl font-semibold leading-tight max-w-4xl`}>
                    Trasforma i tuoi processi in un
                    <span className={`${isDark ? "text-neutral-400" : "text-gray-500"} block`}>
                        vantaggio competitivo misurabile.
                    </span>
                </h2>

                {/* Subheadline */}
                <p className={`${isDark ? "text-neutral-400" : "text-gray-600"} mt-6 text-lg max-w-2xl leading-relaxed`}>
                    In pochi minuti ottieni una valutazione strutturata
                    del livello di maturità digitale della tua azienda,
                    con indicazioni concrete sulle priorità di intervento.
                </p>

                {/* Micro-benefits */}
                <div className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6
                                text-sm ${isDark ? "text-neutral-400" : "text-gray-500"} max-w-3xl`}>
                    <div className="flex justify-center gap-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>✓</span>
                        Analisi strutturata
                    </div>
                    <div className="flex justify-center gap-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>✓</span>
                        Nessun impegno
                    </div>
                    <div className="flex justify-center gap-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>✓</span>
                        Risultati immediati
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-14">
                    <LiquidGlassButton onClick={goToSurvey}>
                        Avvia l’analisi strategica
                    </LiquidGlassButton>
                </div>

                {/* Trust reinforcement */}
                <p className={`${isDark ? "text-neutral-400" : "text-gray-400"} mt-6 text-xs`}>
                    Tempo stimato: 3–5 minuti • Nessuna registrazione richiesta
                </p>
            </div>
        </section>
    );
}