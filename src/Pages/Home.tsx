import { useTheme } from "../Context/ThemeContext.tsx";

// Cinematic parallax components
import { CinematicHero } from "../Components/Home/CinematicHero.tsx";
import { SunsetTransition } from "../Components/Home/SunsetTransition.tsx";
import { ScrollProblems } from "../Components/Home/ScrollProblems.tsx";
import { VideoSection } from "../Components/Home/VideoSection.tsx";
import { HorizontalSolutions } from "../Components/Home/HorizontalSolutions.tsx";
import { DepthMethod } from "../Components/Home/DepthMethod.tsx";
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

            {/* ── Content sections — each with unique scroll effects ── */}
            <div className={`relative z-10 ${isDark ? "" : ""}`}>

                {/* 3D card reveals on scroll */}
                <ScrollProblems theme={theme} />

                {/* Video section (kept as-is) */}
                <VideoSection theme={theme} />

                {/* Horizontal scroll gallery — sticky container */}
                <HorizontalSolutions theme={theme} />

                {/* Timeline with scroll-driven fill */}
                <DepthMethod theme={theme} />

                {/* Private AI infrastructure flow — layered architecture diagram */}
                <PrivateAIFlow theme={theme} />

                {/* 3D perspective card parallax */}
                <ParallaxTestimonials theme={theme} />

                {/* Stats with different parallax speeds */}
                <StatsReveal theme={theme} />

                {/* Scrolling marquee */}
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
                <MaturitySection theme={theme} />

                {/* Sticky FAQ with stagger slide-in */}
                <CinematicFAQ theme={theme} />
            </div>

            {/* ── CTA — scales up from miniature on scroll ── */}
            <CinematicCTA theme={theme} />
        </main>
    );
}
