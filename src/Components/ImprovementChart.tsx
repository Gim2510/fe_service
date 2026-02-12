export function DigitalMaturitySection() {
    const livelli = [
        {
            level: "Base",
            score: "0-30%",
            description:
                "Processi ancora manuali o parzialmente digitalizzati. Dati sparsi e decisioni basate su intuizione. Necessità di consolidamento delle informazioni.",
            color: "bg-red-500/30"
        },
        {
            level: "Intermedio",
            score: "31-60%",
            description:
                "Parte dei processi digitalizzata e integrata. KPI iniziali monitorati, ma manca automazione avanzata e analisi predittiva.",
            color: "bg-yellow-400/30"
        },
        {
            level: "Avanzato",
            score: "61-85%",
            description:
                "Processi digitali consolidati, dati centralizzati e dashboard operative. Automazione diffusa e analisi dati regolari.",
            color: "bg-green-400/30"
        },
        {
            level: "Eccellente",
            score: "86-100%",
            description:
                "Processi completamente digitalizzati, dati in tempo reale, KPI predittivi e automazione intelligente. Decisioni basate su insight accurati.",
            color: "bg-blue-400/30"
        }
    ];

    const pesi = [
        { label: "Processi", weight: 0.4, color: "#34d399" },
        { label: "Tecnologia", weight: 0.3, color: "#60a5fa" },
        { label: "Dati & KPI", weight: 0.2, color: "#facc15" },
        { label: "Automazione & AI", weight: 0.1, color: "#f472b6" }
    ];

    return (
        <section className="relative bg-neutral-950 text-white py-32 overflow-hidden">
            {/* Texture a punti */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative mx-auto max-w-7xl px-8">
                {/* Header */}
                <div className="text-center mb-24">
                    <span className="text-sm uppercase tracking-widest text-neutral-400">
                        Maturità digitale
                    </span>
                    <h2 className="text-4xl font-semibold mt-2 leading-tight">
                        Comprendere il tuo livello di maturità digitale
                    </h2>
                    <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
                        Valutiamo i tuoi processi, i dati e la tecnologia secondo standard odierni per le PMI,
                        assegnando punteggi e livelli chiari. Affianchiamo questi processi di analisi con IA
                        per generare report accurati, assegnare un punteggio a ogni cliente e sviluppare
                        strategie vincenti per massimizzare efficienza e sicurezza.
                    </p>
                </div>

                {/* Livelli */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {livelli.map((lvl) => (
                        <div key={lvl.level} className={`rounded-2xl p-6 ${lvl.color} backdrop-blur-xl border border-neutral-800`}>
                            <h3 className="text-xl font-semibold mb-2">{lvl.level}</h3>
                            <p className="text-sm text-neutral-300 mb-4">{lvl.description}</p>
                            <div className="text-sm font-medium text-neutral-200">Score: {lvl.score}</div>
                        </div>
                    ))}
                </div>

                {/* Pesi dei fattori - versione barra compatta */}
                <div className="max-w-4xl mx-auto mt-12">
                    <h3 className="text-2xl font-semibold mb-6 text-center">Peso dei fattori principali</h3>

                    <div className="space-y-4">
                        {pesi.map((p) => (
                            <div key={p.label}>
                                <div className="flex justify-between mb-1 text-sm text-neutral-300">
                                    <span>{p.label}</span>
                                    <span>{Math.round(p.weight * 100)}%</span>
                                </div>
                                <div className="w-full h-4 bg-neutral-800 rounded-full">
                                    <div
                                        className="h-4 rounded-full"
                                        style={{ width: `${p.weight * 100}%`, backgroundColor: "white" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-neutral-400 text-sm text-center max-w-2xl mx-auto">
                        Questi pesi indicano l'importanza relativa di ogni dimensione nella valutazione complessiva della maturità digitale.
                        La combinazione di processi, tecnologia, dati e automazione permette di creare strategie su misura per incrementare
                        l'efficienza operativa e la sicurezza dei dati aziendali.
                    </p>
                </div>
            </div>
        </section>
    );
}
