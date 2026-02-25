import { useNavigate } from "react-router-dom";
import { HeroGlobe } from "../HeroGlobe";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";
import {useInitSurvey} from "../../hooks/useInitSurvey.ts";
import {HeroOperationalSnapshot} from "./HeroOperationalSnapshot.tsx";

export function HeroSection() {
    const navigate = useNavigate();
    const template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID
    useInitSurvey(template_id, 'it', true)

    const goToSurvey = () => navigate("/survey/start");

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden sm:pt-0 pt-10">
            {/* Background */}
            <div className="absolute inset-0 bg-neutral-950" />

            {/* Globe */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <HeroGlobe />
            </div>

            {/* Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative mx-auto max-w-7xl px-8 pb-18 pt-8 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white z-10">

                {/* LEFT */}
                <div className="flex flex-col gap-10">

                    <span className="text-sm uppercase tracking-widest text-neutral-400">
                        Consulenza digitale per PMI
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-semibold leading-tight">
                        Il tuo business
                        <br />
                        <span className="text-neutral-400">genera dati.</span>
                        <br />
                        <span className="text-3xl sm:text-5xl">sei in grado di gestirli?</span>
                    </h1>

                    <p className="text-lg text-neutral-300 max-w-xl">
                        Aiutiamo le aziende a trasformare operazioni, vendite e relazioni con i clienti
                        in sistemi chiari, misurabili e automatizzati.
                        Meno caos. Più controllo.
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-8">
                        <LiquidGlassButton onClick={goToSurvey}>
                            Scopri cosa stai perdendo
                        </LiquidGlassButton>
                        <span className="text-sm text-neutral-400 text-center">
                            Analisi guidata • Nessun impegno
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative z-20">
                    <div
                        className="group relative mt-8 rounded-3xl border border-neutral-700 bg-neutral-900/80
                                    sm:py-8 sm:px-10 shadow-2xl backdrop-blur opacity-100 sm:opacity-20 sm:hover:opacity-100
                                    transition-all duration-700 ease-out cursor-pointer">
                        <HeroOperationalSnapshot/>
                    </div>
                </div>

            </div>
        </section>
    );
}
