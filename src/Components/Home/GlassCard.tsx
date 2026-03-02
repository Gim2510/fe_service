import type { ReactNode } from "react";

export function GlassCard({ children, className = "", theme }: { children: ReactNode; className?: string, theme: string }) {
    const isDark = theme === "dark";

    return (
        <div
            className={`relative rounded-3xl transition-all duration-500
                backdrop-blur-xl
                ${isDark
                ? "bg-white/[0.04] border border-white/10 hover:border-white/20"
                : "bg-black/[0.04] border border-black/10 hover:border-black/20"
            } 
                ${className}`}
        >
            {children}
        </div>
    );
}