import {HeroSection} from "../Components/Home/HeroSection.tsx";
import {ProblemiSection} from "../Components/Home/ProblemSection.tsx";
import {DigitalMaturitySection} from "../Components/Home/DigitalMaturitySection.tsx";
import {WAWD} from "../Components/Home/WAWD.tsx";
import {MetodSection} from "../Components/Home/MetodSection.tsx";
import {CTASection} from "../Components/Home/CTASection.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";
import {LiquidTextBanner} from "../Components/Home/LiquidTextBanner.tsx";
import {logos} from "../staticData/logos.ts";
import {SunsetTransition} from "../Components/Home/SunsetTransition.tsx";
import {AboutSection} from "../Components/Home/AboutSection.tsx";
import {VideoSection} from "../Components/Home/VideoSection.tsx";
import {TestimonialsSection} from "../Components/Home/TestimonialsSection.tsx";
import {FAQSection} from "../Components/Home/FAQSection.tsx";

export function Home() {
    const {theme} = useTheme()
    const isDark = theme === "dark";
    return (
        <main className={`flex flex-col ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
            {/* Fixed hex grid */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 ${isDark ? "opacity-[0.05]" : "opacity-[0.10]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3Cpath d='M28 66 L56 50 L56 84 L28 100 L0 84 L0 50 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3C/svg%3E")`,
                    backgroundSize: "56px 100px",
                }}
            />
            {/* Vignette — fades grid on left/right edges */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{ background: `linear-gradient(to right, ${isDark ? "#111110" : "#FAF8F4"} 0%, transparent 18%, transparent 82%, ${isDark ? "#111110" : "#FAF8F4"} 100%)` }}
            />
            <HeroSection theme={theme} />
            <SunsetTransition theme={theme} />
            <div className={`relative z-10 ${isDark ? "" : "bg-gradient-to-b from-[#FAF8F4] via-[#F0EAE0] to-[#E8DDD0]"}`}>
                <ProblemiSection theme={theme} />
                <VideoSection theme={theme} />
                <WAWD theme={theme} />
                <MetodSection theme={theme} />
                <TestimonialsSection theme={theme} />
                <AboutSection theme={theme} />
                <LiquidTextBanner
                    theme={theme}
                    messages={[
                        "Diagnosi in 48h",
                        "ROI misurabile dal primo mese",
                        "Zero template generici",
                        "Integrazione con i tuoi sistemi esistenti",
                        "Affiancamento fino ai risultati",
                        "Soluzioni su misura per PMI italiane",
                        "KPI definiti prima di iniziare",
                        "Nessun impegno iniziale",
                    ]}
                    logos={logos}
                />
                <DigitalMaturitySection theme={theme} />
                <FAQSection theme={theme} />
            </div>
            <CTASection theme={theme} />
        </main>
    );
}
