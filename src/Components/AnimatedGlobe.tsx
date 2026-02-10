export function AnimatedGlobe() {
    return (
        <svg
            viewBox="0 0 600 600"
            className="absolute inset-0 m-auto w-[900px] h-[900px] opacity-25"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Rotating globe */}
            <g>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 300 300"
                    to="360 300 300"
                    dur="160s"
                    repeatCount="indefinite"
                />

                {/* Outer glow */}
                <circle cx="300" cy="300" r="220" fill="url(#glow)" />

                {/* Globe outline */}
                <circle
                    cx="300"
                    cy="300"
                    r="220"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                />

                {/* Longitudes */}
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                    <ellipse
                        key={deg}
                        cx="300"
                        cy="300"
                        rx="220"
                        ry="80"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                        transform={`rotate(${deg} 300 300)`}
                    />
                ))}

                {/* Latitudes */}
                {[ -120, -60, 0, 60, 120 ].map((y, i) => (
                    <ellipse
                        key={i}
                        cx="300"
                        cy={300 + y / 3}
                        rx={180 - Math.abs(y) / 2}
                        ry="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                    />
                ))}

                {/* Nodes */}
                {[
                    [300, 160],
                    [360, 260],
                    [240, 340],
                    [300, 440],
                    [420, 300],
                ].map(([cx, cy], i) => (
                    <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="rgba(255,255,255,0.5)"
                    />
                ))}
            </g>
        </svg>
    )
}
