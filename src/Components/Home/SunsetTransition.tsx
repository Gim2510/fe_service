interface SunsetTransitionProps {
    theme: string;
}

export function SunsetTransition({ theme }: SunsetTransitionProps) {
    const isDark = theme === "dark";
    const bgColor = isDark ? "#111110" : "#E8EDF3";
    const bgRgb = isDark ? "17,17,16" : "232,237,243";

    return (
        <div className="relative z-10 h-48 sm:h-64 pointer-events-none">

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
