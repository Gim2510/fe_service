import {HeroSection} from "../Components/Home/HeroSection.tsx";
import {ProblemiSection} from "../Components/Home/ProblemSection.tsx";
import {DigitalMaturitySection} from "../Components/Home/DigitalMaturitySection.tsx";
import {WAWD} from "../Components/Home/WAWD.tsx";
import {MetodSection} from "../Components/Home/MetodSection.tsx";
import {CTASection} from "../Components/Home/CTASection.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";
import {LiquidTextBanner} from "../Components/Home/LiquidTextBanner.tsx";
import {logos} from "../staticData/logos.ts";

export function Home() {
    const {theme} = useTheme()
    return (
        <main className={`flex flex-col ${theme === "dark" ? "bg-black" : "bg-primary-white"}`}>
            <HeroSection theme={theme} />
            <LiquidTextBanner
                theme={theme}
                messages={[
                ]}
                logos={logos}
            />
            <ProblemiSection theme={theme} />
            <DigitalMaturitySection theme={theme} />
            <WAWD theme={theme} />
            <MetodSection theme={theme} />
            <CTASection theme={theme} />
        </main>
    );
}
