import {HeroSection} from "../Components/HomeComponents/HeroSection.tsx";
import {ProblemiSection} from "../Components/HomeComponents/ProblemSection.tsx";
import {ImprovementChart} from "../Components/ImprovementChart.tsx";
import {CosaFacciamoSection} from "../Components/HomeComponents/CosaFacciamoSection.tsx";
import {MetodoSection} from "../Components/HomeComponents/MetodoSection.tsx";
import {CTASection} from "../Components/HomeComponents/CTASection.tsx";

export function Home() {
    return (
        <main className="flex flex-col">
            <HeroSection />
            <ProblemiSection />
            <ImprovementChart />
            <CosaFacciamoSection />
            <MetodoSection />
            <CTASection />
        </main>
    );
}
