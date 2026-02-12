export function ProblemiSection() {
    const problemi = [
        { title: "“I dati ci sono, ma non li vediamo”", text: "Informazioni disperse tra fogli Excel, CRM parziali e strumenti che non comunicano tra loro. Il risultato è decisioni prese a sensazione." },
        { title: "“Facciamo tutto a mano”", text: "Processi ripetitivi che consumano tempo e attenzione, aumentando il rischio di errore e rallentando ogni attività." },
        { title: "“Le vendite sono imprevedibili”", text: "Mancanza di una visione chiara sul funnel, sui clienti realmente interessati e sulle opportunità che contano." },
        { title: "“Corriamo sempre dietro ai problemi”", text: "La gestione clienti è reattiva. Si risponde alle urgenze, ma non si anticipano bisogni e comportamenti." },
        { title: "“Il magazzino non torna mai”", text: "Scorte e approvvigionamenti non allineati alla domanda reale, per mancanza di dati affidabili e aggiornati." },
        { title: "“Abbiamo tanti strumenti, ma poco controllo”", text: "Software acquistati nel tempo, usati solo in parte e mai davvero integrati tra loro." },
    ];

    return (
        <section className="relative bg-neutral-950 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px] bg-[position:0_40px]" />
            <div className="relative mx-auto max-w-7xl px-8 py-32">
                <div className="max-w-3xl mb-24">
                    <h2 className="text-4xl font-semibold leading-tight">
                        I problemi non sono isolati.
                        <br />
                        <span className="text-neutral-400">C'è sempre un filo conduttore.</span>
                    </h2>
                    <p className="mt-6 text-lg text-neutral-300">
                        Nella maggior parte delle PMI che incontriamo, le difficoltà non nascono da una cattiva gestione, ma da sistemi cresciuti senza una visione unica.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {problemi.map((item) => (
                        <div key={item.title} className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 hover:bg-neutral-900 transition">
                            <h3 className="text-lg font-medium mb-4">{item.title}</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">{item.text}</p>
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
