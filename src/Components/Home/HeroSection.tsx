import { useNavigate } from "react-router-dom";
import { HeroGlobeDark } from "./HeroGlobeDark.tsx";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";
import { useInitSurvey } from "../../hooks/useInitSurvey.ts";
import { HeroOperationalSnapshot } from "./HeroOperationalSnapshot.tsx";

export function HeroSection({theme}: {theme: string}) {
    const navigate = useNavigate();
    const template_id = import.meta.env.VITE_SURVEY_TEMPLATE_ID;
    useInitSurvey(template_id, 'it', true);

    const goToSurvey = () => navigate("/survey/start");

    const isDark = theme === "dark";

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden sm:pt-0 pt-20">
            {/* Background */}
            <div className={`absolute inset-0 ${isDark ? "bg-neutral-950" : "bg-gray-100"}`} />

            {/* Globe */}
            <div className="absolute inset-0 pointer-events-none z-10">
               <HeroGlobeDark/>
            </div>

            {/* Grid Overlay */}
            <div className={`absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,${isDark ? "white" : "black"}_1px,transparent_0)] bg-[size:32px_32px]`} />

            <div className="relative mx-auto max-w-7xl px-8 pb-18 pt-8 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">

                {/* LEFT */}
                <div className="flex flex-col gap-10">
                    <span className={`${isDark ? "text-neutral-400" : "text-neutral-600"} text-sm uppercase tracking-widest`}>
                        Consulenza digitale per PMI
                    </span>

                    <h1 className={`${isDark ? "text-white" : "text-neutral-900 sm:text-neutral-900 text-white sm:text-neutral-900"} text-4xl sm:text-6xl font-semibold leading-tight`}>
                        Il tuo business
                        <br/>
                        <span
                            className={`${isDark ? "text-neutral-400" : "text-neutral-600 sm:text-neutral-600 text-white sm:text-neutral-600"}`}>genera dati.</span>
                        <br/>
                        <span className="text-3xl sm:text-5xl">sei in grado di gestirli?</span>
                    </h1>

                    <p className={`${isDark ? "text-neutral-300" : "text-neutral-700 sm:text-neutral-700 text-white"} text-lg max-w-xl`}>
                        Aiutiamo le aziende a trasformare operazioni, vendite e relazioni con i clienti
                        in sistemi chiari, misurabili e automatizzati.
                        Meno caos. Più controllo.
                    </p>

                    <div className="flex items-center sm:gap-8 gap-4">
                        <LiquidGlassButton onClick={goToSurvey}>
                            Scopri cosa stai perdendo
                        </LiquidGlassButton>
                        <span
                            className={`${isDark ? "text-neutral-400" : "text-neutral-500 sm:text-neutral-500 text-white"} text-sm text-center`}>
                            Analisi guidata • Nessun impegno
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative z-20">
                    <div
                        className={`group relative mt-8 rounded-3xl border ${
                            isDark ? "border-neutral-700 bg-neutral-900/80" : "border-neutral-300 bg-white/80"
                        } sm:py-8 sm:px-10 shadow-2xl backdrop-blur opacity-100 sm:opacity-20 sm:hover:opacity-100
                            transition-all duration-700 ease-out cursor-pointer`}
                    >
                        <HeroOperationalSnapshot theme={theme} />
                    </div>
                </div>
            </div>
        </section>
    );
}