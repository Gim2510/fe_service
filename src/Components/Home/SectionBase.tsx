import type {ReactNode} from "react";

export function SectionBase({ children, theme }: { children: ReactNode; theme: string }) {
    const isDark = theme === "dark";

    return (
        <section
            className={`relative overflow-hidden ${
                isDark ? "bg-neutral-950 text-white" : "bg-white text-neutral-900"
            }`}
        >
            <div
                className="absolute top-4 left-0 right-0 bottom-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(
                                      circle at 1px 1px,
                                      ${isDark ? "white" : "rgb(24,24,27)"} 1px,
                                      transparent 0
                                    )`,
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="relative mx-auto max-w-7xl px-8 py-32">
                {children}
            </div>
        </section>
    );
}