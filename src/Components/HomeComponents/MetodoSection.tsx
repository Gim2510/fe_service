export function MetodoSection() {
    const steps = [
        { step: "01", title: "Analisi", text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento." },
        { step: "02", title: "Progettazione", text: "Definiamo un’architettura solida, sostenibile e allineata agli obiettivi di business." },
        { step: "03", title: "Implementazione", text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili." }
    ];

    return (
        <section className="relative bg-neutral-950 text-white border-t border-neutral-800">
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
                        <div key={item.step} className="group relative p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md transition-all hover:border-neutral-700 hover:bg-neutral-900">
                            <div className="text-6xl font-semibold text-neutral-800 group-hover:text-neutral-700 transition">{item.step}</div>
                            <div className="mt-6">
                                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
