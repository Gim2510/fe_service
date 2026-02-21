import { useNavigate } from "react-router-dom";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

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

                <LiquidGlassButton color_text='black' onClick={goToSurvey} >
                    Inizia l'analisi
                </LiquidGlassButton>

                <span className="text-sm text-gray-400">Nessun impegno • Tempo stimato: pochi minuti</span>
            </div>
        </section>
    );
}
