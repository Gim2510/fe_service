import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";
import {HeroGlobeDark} from "./HeroGlobeDark.tsx";
import {useNavigate} from "react-router-dom";
import {HeroOperationalSnapshot} from "./HeroOperationalSnapshot.tsx";

export function HeroSection({ theme }: { theme: string }) {
    const navigate = useNavigate();
    const goToSurvey = () => navigate("/survey/start");
    const isDark = theme === "dark";

    return (
        <section className="relative min-h-[100dvh] flex items-center">

            {/* BACKGROUND FIXED */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`${isDark ? "bg-neutral-950" : "bg-primary-white"} absolute inset-0`} />
                <HeroGlobeDark />
                <div className={`absolute inset-0 opacity-10 
                    bg-[radial-gradient(circle_at_1px_1px,${isDark ? "white" : "black"}_1px,transparent_0)] 
                    bg-[size:32px_32px]`}
                />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 mx-auto max-w-7xl sm:px-8 px-4 pb-20 pt-20 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT */}
                <div className={` flex flex-col gap-10 p-6 sm:p-0 rounded-2xl ${theme === 'dark' ? 'bg-white/10' : 'bg-white/30'} backdrop-blur-lg border border-white/20 shadow-xl`}>
                    <span
                        className={`${isDark ? "text-neutral-400" : "text-black"} font-semibold text-sm uppercase tracking-widest`}>
                        Consulenza digitale per PMI
                    </span>

                    <h1 className={`${isDark ? "text-white" : "text-neutral-900"} text-4xl sm:text-6xl font-semibold leading-tight`}>
                        Il tuo business <br/>
                        <span className={`${isDark ? "text-neutral-400" : "text-[#9e0e05]"} font-bold`}> genera dati. </span>
                        <br/>
                        <span className="text-3xl sm:text-5xl"> sei in grado di gestirli? </span>
                    </h1>

                    <p className={`${isDark ? "text-neutral-300" : "text-black"} text-lg max-w-xl`}>
                        Aiutiamo le aziende a trasformare operazioni, vendite e relazioni con i clienti
                        in sistemi chiari, misurabili e automatizzati.
                        Meno caos. Più controllo.
                    </p>

                    <div className="flex items-center gap-4">
                        <LiquidGlassButton onClick={goToSurvey} variant="navbar">
                            Scopri cosa stai perdendo
                        </LiquidGlassButton>

                        <span className="text-sm text-neutral-400">
                            Analisi guidata • Nessun impegno
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative z-10 hidden lg:block">
                    <div className={`rounded-3xl border ${
                        isDark ? "border-neutral-700 bg-neutral-900/80" : "border-neutral-300 bg-white/80"
                    } p-8 shadow-2xl backdrop-blur`}>
                        <HeroOperationalSnapshot theme={theme} />
                    </div>
                </div>
            </div>
        </section>
    );
}