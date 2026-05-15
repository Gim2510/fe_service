import type { ReactNode } from "react";
import { Badge } from "../Badge.tsx";

type SectionProps = {
    title: string;
    children: ReactNode;
    theme?: "light" | "dark";
    bgSection?: string;
    textPrimary?: string;
    textSecondary?: string;
    badgeColor?: "sky" | "red" | "amber" | "orange" | "rose" | "yellow" | "pink" | "cyan" | "violet" | "emerald" | "green";
    showBadge?: boolean;
};

export function Section({
    title,
    children,
    theme = "dark",
    bgSection,
    textPrimary,
    textSecondary,
    badgeColor = "sky",
    showBadge = true,
}: SectionProps) {
    const isDark = theme === "dark";
    const bg = bgSection ?? (isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200");
    const titleColor = textPrimary ?? (isDark ? "text-slate-100" : "text-slate-900");

    return (
        <section className={`${bg} border rounded-2xl backdrop-blur-sm overflow-hidden`}>
            {isDark && (
                <div className="h-[2px] w-full bg-sky-700/60" />
            )}
            <div className="p-8 sm:p-10 space-y-6">
                <div className="space-y-3">
                    {showBadge && (
                        <Badge label={title} color={badgeColor} theme={theme} />
                    )}
                    {!showBadge && (
                        <h2 className={`text-2xl font-medium ${titleColor}`}>{title}</h2>
                    )}
                </div>
                <div className={`${textSecondary ?? ""} sm:block flex flex-col gap-6`}>{children}</div>
            </div>
        </section>
    );
}
