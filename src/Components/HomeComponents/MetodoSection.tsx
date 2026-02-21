export function MetodoSection() {
    const steps = [
        { step: "01", title: "Analisi", text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento." },
        { step: "02", title: "Progettazione", text: "Definiamo un’architettura solida, sostenibile e allineata agli obiettivi di business." },
        { step: "03", title: "Implementazione", text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili." }
    ];

    return (
        <section className="relative bg-neutral-950 text-white border-t border-neutral-800">
            {/* Liquid gradient field */}
            <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[900px]
                            bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-cyan-400/20
                            rounded-full blur-3xl opacity-30" />


            {/* Glass diffusion layer */}
            <div className="absolute inset-0 backdrop-blur-[120px] bg-white/[0.02]" />
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative mx-auto max-w-7xl px-8 py-32">
                <div className="max-w-3xl mb-24">
                    <span className="text-sm uppercase tracking-widest text-neutral-500">Metodo</span>
                    <h2 className="text-4xl font-semibold mt-4 leading-tight">
                        Un approccio strutturato,
                        <br />
                        <span className="text-neutral-400">orientato ai risultati concreti.</span>
                    </h2>
                    <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
                        Ogni progetto segue un percorso chiaro e misurabile.
                        Riduciamo l’incertezza, aumentiamo la visibilità
                        e trasformiamo le decisioni in vantaggio competitivo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((item) => (
                        <div
                            key={item.step}
                            className="group relative p-10 rounded-3xl
                                       bg-white/[0.04] backdrop-blur-2xl
                                       border border-white/10
                                       hover:border-white/20
                                       transition-all duration-500 overflow-hidden">
                            <div className="absolute -top-6 -right-2 text-[120px] font-semibold
                                            text-white/[0.10] select-none pointer-events-none">
                                {item.step}
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-white/5 to-transparent"/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
