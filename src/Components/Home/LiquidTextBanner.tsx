import { useEffect, useRef } from "react";

interface LiquidTextBannerProps {
    theme: string;
    messages: string[];
    logos?: string[]; // array di URL delle immagini
    speed?: number;
}

export function LiquidTextBanner({ theme, messages, logos = [], speed = 50 }: LiquidTextBannerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let offset = 0;
        const totalWidth = container.scrollWidth;

        const animate = () => {
            offset += speed / 70; // 60fps
            if (offset >= totalWidth / 2) offset = 0;
            container.style.transform = `translateX(-${offset}px)`;
            requestAnimationFrame(animate);
        };
        animate();
    }, [speed, messages, logos]);

    const background = theme === "dark"
        ? "bg-black/30 border-white/20"
        : "bg-white border-black/20";
    const textColor = theme === "dark"
        ? "text-white/80"
        : "text-black/80";

    // combinare messaggi e loghi per lo scroll
    const items = [
        ...messages.map(msg => ({ type: "text", content: msg })),
        ...logos.map(logo => ({ type: "logo", content: logo }))
    ];

    // duplicare per scroll infinito
    const scrollItems = [...items, ...items];

    return (
        <div
            className={`relative overflow-hidden my-8 mx-auto w-full p-4 backdrop-blur-md shadow-lg flex items-center ${background}`}
        >
            <div
                ref={containerRef}
                className={`flex gap-12 items-center whitespace-nowrap ${textColor}`}
            >
                {scrollItems.map((item, idx) => (
                    item.type === "text" ? (
                        <span key={idx} className="px-4 text-2xl md:text-4xl font-bold">
                            {item.content}
                        </span>
                    ) : (
                        <img
                            key={idx}
                            src={item.content}
                            alt="Tech logo"
                            className="h-12 md:h-16 max-h-16 object-contain"
                        />
                    )
                ))}
            </div>
        </div>
    );
}