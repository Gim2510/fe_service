export function CosaFacciamoSection() {
    const punti = [
        "CRM e sistemi di vendita su misura",
        "Automazione dei processi operativi",
        "Integrazione tra software esistenti",
        "Analisi dati e reporting decisionale",
        "Intelligenza artificiale applicata",
        "Scalabilità e manutenzione nel tempo"
    ];

    return (
        <section className="relative bg-abstract-grey overflow-hidden">
            {/* System grid background */}
            <div className="mx-auto max-w-7xl px-8 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Visual */}
                <div className="order-2 lg:order-1">
                    <div
                        className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center text-gray-400 text-sm text-center p-6">
                        <p className="font-medium text-gray-500">Placeholder visual</p>
                        <p className="mt-2">Architettura sistemi • Flussi dati • Automazioni</p>
                        <p className="mt-4 text-xs">(CRM · ERP · BI · AI · Tool esistenti)</p>
                    </div>
                </div>

                {/* Copy */}
                <div className="order-1 lg:order-2 flex flex-col gap-6">
                    <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                        Soluzioni digitali progettate intorno
                        <br/>
                        ai tuoi processi reali
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Ogni azienda ha flussi, vincoli e obiettivi diversi.
                        Per questo non proponiamo piattaforme standard,
                        ma costruiamo soluzioni che si adattano al tuo modo di lavorare,
                        non il contrario.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {punti.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-900"></span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
