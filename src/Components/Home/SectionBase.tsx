import type { ReactNode } from "react";

interface SectionBaseProps {
    children: ReactNode;
    theme: string;
    className?: string;
}

export function SectionBase({ children, theme, className = "" }: SectionBaseProps) {
    const isDark = theme === "dark";

    return (
        <section
            className={`relative overflow-hidden ${
                isDark ? "bg-[#111110] text-white" : "bg-transparent text-[#162031]"
            } ${className}`}
        >
            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`,
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Blue glow accent in dark mode */}
            {isDark && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent pointer-events-none" />
            )}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-32">
                {children}
            </div>
        </section>
    );
}
