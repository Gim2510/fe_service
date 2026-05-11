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
                isDark ? "text-white" : "bg-transparent text-[#162031]"
            } ${className}`}
        >
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
