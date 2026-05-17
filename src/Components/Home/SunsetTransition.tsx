interface SunsetTransitionProps {
    theme: string;
}

export function SunsetTransition({ theme }: SunsetTransitionProps) {
    const isDark = theme === "dark";
    const bgColor = isDark ? "#0E0E0D" : "#FAFAF8";
    const bgRgb = isDark ? "14,14,13" : "250,250,248";

    return (
        <div className="relative z-10 h-4 sm:h-6 pointer-events-none">

            {/* Bg rising from bottom */}
            <div
                className="absolute inset-x-0 bottom-0 w-full h-full"
                style={{
                    background: `linear-gradient(to bottom,
                        transparent 0%,
                        rgba(${bgRgb}, 0.4) 45%,
                        rgba(${bgRgb}, 0.85) 70%,
                        ${bgColor} 100%
                    )`,
                }}
            />
        </div>
    );
}
