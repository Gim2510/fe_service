import { useNavigate } from "react-router-dom";
import {HeroGlobe} from "../HeroGlobe.tsx";

export function HeroSection() {
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />

            {/* Animated globe */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <HeroGlobe />
            </div>

            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative mx-auto max-w-7xl px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white z-10">
                <div className="flex flex-col gap-10">
                    <span className="text-sm uppercase tracking-widest text-neutral-400">Consulenza digitale per PMI</span>
                    <h1 className="text-6xl font-semibold leading-tight">
                        Il tuo business
                        <br />
                        <span className="text-neutral-400">genera dati.</span>
                        <br />
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
                            className="group hover:scale-110 border-4 border-black hover:text-white active:scale-90 transition-all ease-in-out relative px-2 py-1 lg:px-12 lg:py-5 rounded-full bg-white text-neutral-900 font-medium lg:text-lg overflow-hidden cursor-pointer"
                        >
                            <span className="relative z-10">Scopri cosa stai perdendo</span>
                            <span className="absolute inset-0 bg-[#000000] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                        </button>
                        <span className="text-sm text-neutral-400">Analisi guidata • Nessun impegno</span>
                    </div>
                </div>

                {/* Visual metaphor */}
                <div className="relative z-20">
                    <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 shadow-2xl">
                        <div className="text-neutral-400 text-sm mb-4">Lorem ipsum dolor sit amet</div>
                        <div className="space-y-4">
                            <div className="h-4 bg-neutral-700 rounded w-3/4" />
                            <div className="h-4 bg-neutral-700 rounded w-full" />
                            <div className="h-4 bg-neutral-700 rounded w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
