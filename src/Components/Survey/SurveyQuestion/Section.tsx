import type { ReactNode } from "react";

type SectionProps = {
    title: string;
    children: ReactNode;
    theme?: "light" | "dark"; // opzionale, default dark
    bgSection?: string;       // opzionale: permette di passare direttamente il bg
    textPrimary?: string;     // opzionale: colore testo titolo
    textSecondary?: string;   // opzionale: colore testo dei children
};

export function Section({
                            title,
                            children,
                            theme = "dark",
                            bgSection,
                            textPrimary,
                            textSecondary,
                        }: SectionProps) {
    const bg = bgSection ?? (theme === "dark" ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200");
    const titleColor = textPrimary ?? (theme === "dark" ? "text-slate-100" : "text-slate-900");

    return (
        <section className={`${bg} border rounded-3xl p-10 space-y-6`}>
            <h2 className={`text-2xl font-medium ${titleColor}`}>{title}</h2>
            <div className={`${textSecondary ?? ""} sm:block flex flex-col gap-6`}>{children}</div>
        </section>
    );
}