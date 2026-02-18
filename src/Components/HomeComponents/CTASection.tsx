import { useNavigate } from "react-router-dom";

export function CTASection() {
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");

    return (
        <section>
            <div className="mx-auto max-w-7xl px-8 py-32 text-center flex flex-col items-center gap-8 bg-white">
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
                    className="group hover:scale-110 border-4 border-black hover:text-white active:scale-90 transition-all ease-in-out relative px-2 py-1 lg:px-12 lg:py-5 rounded-full bg-white text-neutral-900 font-medium lg:text-lg overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10">Inizia l'analisi</span>
                    <span className="absolute inset-0 bg-[#000000] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                </button>

                <span className="text-sm text-gray-400">Nessun impegno • Tempo stimato: pochi minuti</span>
            </div>
        </section>
    );
}
