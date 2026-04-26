import { useEffect, useRef } from "react";

interface LiquidTextBannerProps {
    theme: string;
    messages: string[];
    logos?: string[];
    speed?: number;
}

export function LiquidTextBanner({ theme, messages, logos = [], speed = 50 }: LiquidTextBannerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDark = theme === "dark";

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let offset = 0;
        let rafId: number;
        const totalWidth = container.scrollWidth;

        const animate = () => {
            offset += speed / 70;
            if (offset >= totalWidth / 2) offset = 0;
            container.style.transform = `translateX(-${offset}px)`;
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, [speed, messages, logos]);

    const items = [
        ...messages.map((msg) => ({ type: "text", content: msg })),
        ...logos.map((logo) => ({ type: "logo", content: logo })),
    ];

    const scrollItems = [...items, ...items];

    return (
        <div className={`relative overflow-hidden border-y py-5 ${
            isDark
                ? "bg-[#1C1C1A]/60 border-stone-800/20"
                : "bg-white/60 border-white/80 backdrop-blur-sm"
        }`}>
            {/* Fade edges */}
            <div className={`absolute inset-y-0 left-0 w-20 z-10 pointer-events-none ${
                isDark
                    ? "bg-gradient-to-r from-[#111110] to-transparent"
                    : "bg-gradient-to-r from-white to-transparent"
            }`} />
            <div className={`absolute inset-y-0 right-0 w-20 z-10 pointer-events-none ${
                isDark
                    ? "bg-gradient-to-l from-[#111110] to-transparent"
                    : "bg-gradient-to-l from-white to-transparent"
            }`} />

            <div
                ref={containerRef}
                className={`flex gap-10 items-center whitespace-nowrap ${
                    isDark ? "text-slate-600" : "text-slate-400"
                }`}
            >
                {scrollItems.map((item, idx) =>
                    item.type === "text" ? (
                        <span
                            key={idx}
                            className={`px-6 text-sm font-semibold uppercase tracking-widest ${
                                isDark ? "text-slate-700" : "text-slate-400"
                            }`}
                        >
                            {item.content}
                        </span>
                    ) : (
                        <img
                            key={idx}
                            src={item.content}
                            alt="Tech logo"
                            className="h-8 object-contain opacity-40"
                        />
                    )
                )}
            </div>
        </div>
    );
}
