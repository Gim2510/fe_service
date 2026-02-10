import { useNavigate } from "react-router-dom"
import {HeroGlobe} from "../Components/HeroGlobe.tsx";

export function Home() {
    const navigate = useNavigate()

    const goToSurvey = () => navigate("/survey/start")

    return (
        <main className="flex flex-col ">

            {/* HERO */}
            <section className="relative min-h-[100vh] flex items-center overflow-hidden">
                {/* Background texture / gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800"/>

                {/* Animated globe */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <HeroGlobe/>
                </div>

                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"
                />

                <div
                    className="relative mx-auto max-w-7xl px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white z-10">

                    {/* Copy */}
                    <div className="flex flex-col gap-10">
                <span className="text-sm uppercase tracking-widest text-neutral-400">
                    Consulenza digitale per PMI
                </span>

                        <h1 className="text-6xl font-semibold leading-tight">
                            Il tuo business
                            <br/>
                            <span className="text-neutral-400">genera dati.</span>
                            <br/>
                            <span className='text-5xl'>sei in grado di gestirli?</span>

                        </h1>

                        <p className="text-lg text-neutral-300 max-w-xl">
                            Aiutiamo le aziende a trasformare operazioni, vendite e relazioni con i clienti
                            in sistemi chiari, misurabili e automatizzati.
                            Meno caos. Più controllo.
                        </p>

                        <div className="flex items-center gap-8">
                            <button
                                onClick={goToSurvey}
                                className="group hover:scale-110 active:scale-90 transition-all ease-in-out relative px-2 py-1 lg:px-12 lg:py-5 rounded-full bg-white text-neutral-900 font-medium lg:text-lg overflow-hidden cursor-pointer"
                            >
          <span className="relative z-10">
            Scopri cosa stai perdendo
          </span>
                                <span
                                    className="absolute inset-0 bg-[#FF6B6B] translate-y-full group-hover:translate-y-0 transition-transform"/>
                            </button>

                            <span className="text-sm text-neutral-400">
          Analisi guidata • Nessun impegno
        </span>
                        </div>
                    </div>

                    {/* Visual metaphor */}
                    <div className="relative z-20">
                        <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 shadow-2xl">
                            <div className="text-neutral-400 text-sm mb-4">
                                Esempio di output
                            </div>

                            <div className="space-y-4">
                                <div className="h-4 bg-neutral-700 rounded w-3/4"/>
                                <div className="h-4 bg-neutral-700 rounded w-full"/>
                                <div className="h-4 bg-neutral-700 rounded w-2/3"/>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* PROBLEMI CHE RISOLVIAMO */}
            <section className="relative bg-neutral-950 text-white overflow-hidden">
                {/* Texture */}
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"
                />

                <div className="relative mx-auto max-w-7xl px-8 py-32">

                    {/* Intro */}
                    <div className="max-w-3xl mb-24">
                    <h2 className="text-4xl font-semibold leading-tight">
                            I problemi non sono isolati.
                            <br/>
                            <span className="text-neutral-400">
                                C'è sempre un filo conduttore.
                            </span>
                        </h2>

                        <p className="mt-6 text-lg text-neutral-300">
                            Nella maggior parte delle PMI che incontriamo, le difficoltà non nascono
                            da una cattiva gestione, ma da sistemi cresciuti senza una visione unica.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                title: "“I dati ci sono, ma non li vediamo”",
                                text: "Informazioni disperse tra fogli Excel, CRM parziali e strumenti che non comunicano tra loro. Il risultato è decisioni prese a sensazione."
                            },
                            {
                                title: "“Facciamo tutto a mano”",
                                text: "Processi ripetitivi che consumano tempo e attenzione, aumentando il rischio di errore e rallentando ogni attività."
                            },
                            {
                                title: "“Le vendite sono imprevedibili”",
                                text: "Mancanza di una visione chiara sul funnel, sui clienti realmente interessati e sulle opportunità che contano."
                            },
                            {
                                title: "“Corriamo sempre dietro ai problemi”",
                                text: "La gestione clienti è reattiva. Si risponde alle urgenze, ma non si anticipano bisogni e comportamenti."
                            },
                            {
                                title: "“Il magazzino non torna mai”",
                                text: "Scorte e approvvigionamenti non allineati alla domanda reale, per mancanza di dati affidabili e aggiornati."
                            },
                            {
                                title: "“Abbiamo tanti strumenti, ma poco controllo”",
                                text: "Software acquistati nel tempo, usati solo in parte e mai davvero integrati tra loro."
                            }
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 hover:bg-neutral-900 transition"
                            >
                                <h3 className="text-lg font-medium mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {item.text}
                                </p>

                                {/* Accent line */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition"/>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


            {/* COSA FACCIAMO */}
            <section className="relative">

                <div className="mx-auto max-w-7xl px-8 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual */}
                    <div className="order-2 lg:order-1">
                        <div
                            className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400 text-sm text-center p-6">
                            <p className="font-medium text-gray-500">
                                Placeholder visual
                            </p>
                            <p className="mt-2">
                                Architettura sistemi • Flussi dati • Automazioni
                            </p>
                            <p className="mt-4 text-xs">
                                (CRM · ERP · BI · AI · Tool esistenti)
                            </p>
                        </div>
                    </div>

                    {/* Copy */}
                    <div className="order-1 lg:order-2 flex flex-col gap-6">
                        <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                            Soluzioni digitali progettate intorno
                            <br className="hidden sm:block"/>
                            ai tuoi processi reali
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Ogni azienda ha flussi, vincoli e obiettivi diversi.
                            Per questo non proponiamo piattaforme standard,
                            ma costruiamo soluzioni che si adattano al tuo modo di lavorare,
                            non il contrario.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "CRM e sistemi di vendita su misura",
                                "Automazione dei processi operativi",
                                "Integrazione tra software esistenti",
                                "Analisi dati e reporting decisionale",
                                "Intelligenza artificiale applicata",
                                "Scalabilità e manutenzione nel tempo"
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-gray-600"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-900"></span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* METODO */}
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-8 py-28">
                    <h2 className="text-3xl font-semibold mb-4">
                        Un approccio strutturato, orientato ai risultati
                    </h2>

                    <p className="text-gray-400 max-w-2xl mb-20">
                        Ogni progetto segue un percorso chiaro.
                        Riduciamo l’incertezza, aumentiamo la visibilità
                        e trasformiamo le decisioni in dati concreti.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                        {[
                            {
                                step: "01",
                                title: "Analisi",
                                text: "Comprendiamo i processi, individuiamo colli di bottiglia e opportunità di miglioramento."
                            },
                            {
                                step: "02",
                                title: "Progettazione",
                                text: "Definiamo un’architettura solida, sostenibile e allineata agli obiettivi di business."
                            },
                            {
                                step: "03",
                                title: "Implementazione",
                                text: "Costruiamo soluzioni operative che trasformano i dati in azioni misurabili."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col gap-4">
                    <span className="text-gray-500 text-sm tracking-wide">
                        {item.step}
                    </span>

                                <h3 className="text-xl font-medium">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA FINALE */}
            <section>
                <div className="mx-auto max-w-7xl px-8 py-32 text-center flex flex-col items-center gap-8">
                    <h2 className="text-4xl font-semibold text-gray-900 leading-tight">
                        Trasforma i tuoi processi in un vantaggio competitivo
                    </h2>

                    <p className="text-gray-600 max-w-2xl">
                        Rispondi a poche domande mirate.
                        Otterrai una prima fotografia del livello di maturità digitale
                        della tua azienda e delle aree con il maggiore potenziale di miglioramento.
                    </p>

                    <button
                        onClick={goToSurvey}
                        className="px-12 py-5 rounded-full bg-gray-900 text-white text-lg font-medium hover:bg-gray-800 transition cursor-pointer"
                    >
                        Inizia l’analisi
                    </button>

                    <span className="text-sm text-gray-400">
            Nessun impegno • Tempo stimato: pochi minuti
        </span>
                </div>
            </section>


        </main>
    )
}
