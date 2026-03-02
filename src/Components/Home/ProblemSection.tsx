import {GlassCard} from "./GlassCard.tsx";
import {SectionBase} from "./SectionBase.tsx";

export function ProblemiSection({theme}: {theme: string}) {
    const isDark = theme === "dark";

    const problemi = [
        { title: "“I dati ci sono, ma non li vediamo”", text: "Informazioni disperse tra fogli Excel, CRM parziali e strumenti che non comunicano tra loro. Il risultato è decisioni prese a sensazione." },
        { title: "“Facciamo tutto a mano”", text: "Processi ripetitivi che consumano tempo e attenzione, aumentando il rischio di errore e rallentando ogni attività." },
        { title: "“Le vendite sono imprevedibili”", text: "Mancanza di una visione chiara sul funnel, sui clienti realmente interessati e sulle opportunità che contano." },
        { title: "“Corriamo sempre dietro ai problemi”", text: "La gestione clienti è reattiva. Si risponde alle urgenze, ma non si anticipano bisogni e comportamenti." },
        { title: "“Il magazzino non torna mai”", text: "Scorte e approvvigionamenti non allineati alla domanda reale, per mancanza di dati affidabili e aggiornati." },
        { title: "“Abbiamo tanti strumenti, ma poco controllo”", text: "Software acquistati nel tempo, usati solo in parte e mai davvero integrati tra loro." },
    ];

    return (
        <SectionBase theme={theme}>
            <div className="max-w-3xl mb-24">
                <h2 className={`text-4xl font-semibold leading-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                    I problemi non sono isolati.
                    <br />
                    <span className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>C'è sempre un filo conduttore.</span>
                </h2>
                <p className={`mt-6 text-lg ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    Nella maggior parte delle PMI...
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {problemi.map((item) => (
                    <GlassCard theme={theme} key={item.title} className={`p-8 ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-white/80 border-neutral-300 text-neutral-900"}`}>
                        <h3 className="text-lg font-medium mb-4">{item.title}</h3>
                        <p className="text-sm leading-relaxed">{item.text}</p>
                    </GlassCard>
                ))}
            </div>
        </SectionBase>
    );
}