import { useTheme } from "../Context/ThemeContext.tsx";

// Cinematic parallax components
import { CinematicHero } from "../Components/Home/CinematicHero.tsx";
import { SunsetTransition } from "../Components/Home/SunsetTransition.tsx";
import { TimelineProblems } from "../Components/Home/TimelineProblems.tsx";
import { VideoSection } from "../Components/Home/VideoSection.tsx";
import { HorizontalSolutions } from "../Components/Home/HorizontalSolutions.tsx";
import { DepthMethod } from "../Components/Home/DepthMethod.tsx";
import { AICapabilities } from "../Components/Home/AICapabilities.tsx";
import { PrivateAIFlow } from "../Components/Home/PrivateAIFlow.tsx";
import { ParallaxTestimonials } from "../Components/Home/ParallaxTestimonials.tsx";
import { StatsReveal } from "../Components/Home/StatsReveal.tsx";
import { LiquidTextBanner } from "../Components/Home/LiquidTextBanner.tsx";
import { MaturitySection } from "../Components/Home/MaturitySection.tsx";
import { CinematicFAQ } from "../Components/Home/CinematicFAQ.tsx";
import { CinematicCTA } from "../Components/Home/CinematicCTA.tsx";

export function Home() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <main className={`flex flex-col ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
            {/* Fixed grid background — z-0 for hero area */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%23A8A39A' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />
            {/* Vignette — fades grid on edges */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: `linear-gradient(to right, ${isDark ? "#0E0E0D" : "#FAFAF8"} 0%, transparent 18%, transparent 82%, ${isDark ? "#0E0E0D" : "#FAFAF8"} 100%)`,
                }}
            />

            {/* ── Cinematic Hero — multi-layer parallax, scales down on exit ── */}
            <CinematicHero theme={theme} />

            {/* ── Gradient transition ── */}
            <SunsetTransition theme={theme} />

            {/* ── Content sections — optimized funnel order (TBDO-44 analysis) ── */}
            <div className={`relative z-10 ${isDark ? "" : ""}`}>

                {/* 1. Problem recognition — PAS pattern: agitate pain points */}
                <TimelineProblems theme={theme} />

                {/* 2. Solutions — immediately after problems (Problem→Solve) */}
                <HorizontalSolutions theme={theme} />

                {/* 3. Method — "here's HOW we do it" */}
                <div id="section-method"><DepthMethod theme={theme} /></div>

                {/* 4. AI Capabilities — "and with WHAT tools" — differentiator */}
                <div id="section-ai"><AICapabilities theme={theme} /></div>

                {/* 5. Private AI — closes AI block: "your data stays yours" */}
                <div id="section-private-ai"><PrivateAIFlow theme={theme} /></div>

                {/* 6. Self-assessment — interactive engagement before social proof */}
                <div id="section-maturity"><MaturitySection theme={theme} /></div>

                {/* 7. Stats — validate the assessment just completed */}
                <div id="section-stats"><StatsReveal theme={theme} /></div>

                {/* 8. Social proof — "others like you got results" */}
                <ParallaxTestimonials theme={theme} />

                {/* 9. Video — reinforcement for already-interested users */}
                <VideoSection theme={theme} />

                {/* 10. Scrolling marquee — transition to close */}
                <LiquidTextBanner
                    theme={theme}
                    messages={[
                        "Diagnosi in 48h",
                        "ROI misurabile dal primo mese",
                        "Zero template generici",
                        "Integrazione con i tuoi sistemi",
                        "Affiancamento fino ai risultati",
                        "Soluzioni su misura per PMI",
                        "KPI definiti prima di iniziare",
                        "Nessun impegno iniziale",
                    ]}
                />

                {/* 11. FAQ — handle last objections */}
                <CinematicFAQ theme={theme} />
            </div>

            {/* ── CTA — scales up from miniature on scroll ── */}
            <CinematicCTA theme={theme} />
        </main>
    );
}
