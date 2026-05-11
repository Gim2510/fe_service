interface SunsetTransitionProps {
    theme: string;
}

export function SunsetTransition({ theme }: SunsetTransitionProps) {
    const isDark = theme === "dark";
    const bgColor = isDark ? "#111110" : "#FAF8F4";
    const bgRgb = isDark ? "17,17,16" : "250,248,244";

    return (
        <div className="relative z-10 h-10 sm:h-14 pointer-events-none">

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
