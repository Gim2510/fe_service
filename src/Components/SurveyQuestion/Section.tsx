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
    const bg = bgSection ?? (theme === "dark" ? "bg-neutral-900/70 border-neutral-800" : "bg-white/70 border-gray-200");
    const titleColor = textPrimary ?? (theme === "dark" ? "text-white" : "text-neutral-900");

    return (
        <section className={`${bg} border rounded-3xl p-10 space-y-6`}>
            <h2 className={`text-2xl font-medium ${titleColor}`}>{title}</h2>
            <div className={`${textSecondary ?? ""}`}>{children}</div>
        </section>
    );
}