import type { ReactNode } from "react";

type SectionProps = {
    title: string;
    children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
    return (
        <section className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-10 space-y-6">
            <h2 className="text-2xl font-medium">{title}</h2>
            {children}
        </section>
    );
}
