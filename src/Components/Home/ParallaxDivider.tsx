import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";

interface ParallaxDividerProps {
    type?: "gradient" | "wave" | "dots";
}

export function ParallaxDivider({ type = "gradient" }: ParallaxDividerProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const gradOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    const waveY = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const waveOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    const dotsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

    if (type === "gradient") {
        const bgColor = isDark ? "#111110" : "#FAF8F4";
        const bgRgb = isDark ? "17,17,16" : "250,248,244";

        return (
            <div ref={containerRef} className="relative z-10 h-10 sm:h-14 pointer-events-none">
                <motion.div
                    className="absolute inset-x-0 bottom-0 w-full h-full"
                    style={{
                        background: `linear-gradient(to bottom,
                            transparent 0%,
                            rgba(${bgRgb}, 0.4) 45%,
                            rgba(${bgRgb}, 0.85) 70%,
                            ${bgColor} 100%
                        )`,
                        opacity: gradOpacity,
                    }}
                />
            </div>
        );
    }

    if (type === "wave") {
        return (
            <div ref={containerRef} className="relative h-16 sm:h-20 pointer-events-none overflow-hidden">
                <motion.svg
                    className="absolute bottom-0 w-full h-full"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                    style={{ y: waveY, opacity: waveOpacity }}
                >
                    <path
                        d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,60 1440,50 L1440,100 L0,100 Z"
                        fill={isDark ? "#1C1C1A" : "#F8FAFB"}
                        opacity="0.5"
                    />
                    <path
                        d="M0,60 C240,20 480,80 720,40 C960,0 1200,70 1440,60 L1440,100 L0,100 Z"
                        fill={isDark ? "#111110" : "#FAF8F4"}
                    />
                </motion.svg>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-8 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute inset-0 flex items-center justify-center gap-2"
                style={{ opacity: dotsOpacity }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                            isDark ? "bg-stone-700" : "bg-slate-300"
                        }`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
