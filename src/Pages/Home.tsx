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

export function Home() {
    const {theme} = useTheme()
    return (
        <main className={`flex flex-col ${theme === "dark" ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
            <HeroSection theme={theme} />
            <SunsetTransition theme={theme} />
            <div className={`relative z-10 ${theme === "dark" ? "bg-[#111110]" : "bg-gradient-to-b from-[#FAF8F4] via-[#F0EAE0] to-[#E8DDD0]"}`}>
                <ProblemiSection theme={theme} />
                <WAWD theme={theme} />
                <MetodSection theme={theme} />
                <AboutSection theme={theme} />
                <LiquidTextBanner
                    theme={theme}
                    messages={[
                    ]}
                    logos={logos}
                />
                <DigitalMaturitySection theme={theme} />
            </div>
            <CTASection theme={theme} />
        </main>
    );
}
