export function HeroSystemPreview({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    const primary = "#BD1E1E";
    const accent = "#4ade80";

    const glassFill = isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.7)";

    const stroke = isDark
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.12)";

    return (
        <div
            className={`relative rounded-3xl p-6 overflow-hidden backdrop-blur-2xl border
            ${isDark
                ? "bg-white/5 border-white/10"
                : "bg-white/60 border-white/30 shadow-xl"
            }`}
        >
            {/* 🌈 ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#BD1E1E]/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/10 blur-3xl rounded-full" />
            </div>

            <svg viewBox="0 0 300 200" className="w-full h-full relative z-10">

                <defs>
                    {/* glass gradient */}
                    <radialGradient id="glass">
                        <stop offset="0%" stopColor={glassFill} />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                    </radialGradient>

                    <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={primary} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0.6" />
                    </linearGradient>

                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 🔗 FLOWS (all through center) */}
                <g stroke="url(#flow)" strokeWidth="1.2" fill="none" opacity="0.6">

                    {/* LEFT → CENTER */}
                    <path d="M40 50 L150 100" />
                    <path d="M40 100 L150 100" />
                    <path d="M40 150 L150 100" />

                    {/* CENTER → RIGHT */}
                    <path d="M150 100 L260 40" />
                    <path d="M150 100 L260 80" />
                    <path d="M150 100 L260 120" />
                    <path d="M150 100 L260 160" />

                    {/* return feedback loops */}
                    <path d="M260 80 L150 100" opacity="0.3" />
                    <path d="M260 120 L150 100" opacity="0.3" />
                </g>

                {/* ⚡ animated flows */}
                <g filter="url(#softGlow)">
                    <circle r="2.5" fill={primary}>
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path="M40 100 L150 100 L260 80"
                        />
                    </circle>

                    <circle r="2.5" fill={accent}>
                        <animateMotion
                            dur="5s"
                            repeatCount="indefinite"
                            path="M40 150 L150 100 L260 160"
                        />
                    </circle>
                </g>

                {/* 🧩 NODES */}

                {/* LEFT (3 input systems) */}
                <g filter="url(#softGlow)">
                    <circle cx="40" cy="50" r="10" fill="url(#glass)" stroke={stroke} />
                    <circle cx="40" cy="100" r="11" fill="url(#glass)" stroke={stroke} />
                    <circle cx="40" cy="150" r="10" fill="url(#glass)" stroke={stroke} />
                </g>

                {/* CENTER (orchestrator - BIG BRAIN) */}
                <g filter="url(#softGlow)">
                    <circle cx="150" cy="100" r="16" fill={primary} opacity="0.9" />
                    <circle cx="150" cy="100" r="26" fill={primary} opacity="0.12" />
                </g>

                {/* RIGHT (4 output systems) */}
                <g filter="url(#softGlow)">
                    <circle cx="260" cy="40" r="10" fill="url(#glass)" stroke={stroke} />
                    <circle cx="260" cy="80" r="11" fill="url(#glass)" stroke={stroke} />
                    <circle cx="260" cy="120" r="11" fill="url(#glass)" stroke={stroke} />
                    <circle cx="260" cy="160" r="10" fill="url(#glass)" stroke={stroke} />
                </g>

            </svg>

            {/* 🧠 caption */}
            <div
                className={`mt-6 text-sm leading-relaxed
                ${isDark ? "text-white/60" : "text-neutral-700"}`}
            >
                Tutti i sistemi convergono in un layer di orchestrazione centrale che normalizza, trasforma e sincronizza i flussi operativi.
            </div>
        </div>
    );
}