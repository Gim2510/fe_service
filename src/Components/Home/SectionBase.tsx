import type {ReactNode} from "react";

export function SectionBase({ children, theme }: { children: ReactNode; theme: string }) {
    const isDark = theme === "dark";

    return (
        <section className={`relative overflow-hidden ${isDark ? "bg-neutral-950 text-white" : "bg-white text-neutral-900"}`}>
            <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,${isDark ? "white" : "black"}_1px,transparent_0)] bg-[size:32px_32px] opacity-5`}
            />
            <div className="relative mx-auto max-w-7xl px-8 py-32">
                {children}
            </div>
        </section>
    );
}