import { useEffect, useState } from "react";
import {useTheme} from "../../Context/ThemeContext.tsx";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

type Job = {
    id: string;
    title: string;
    location: string;
    type: string;
    description: string;
};

export function CareersPage() {

    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [jobs, setJobs] = useState<Job[]>([]);

    // placeholder fino a integrazione BE
    useEffect(() => {
        setJobs([
            {
                id: "1",
                title: "Frontend Engineer (React)",
                location: "Remote / Europe",
                type: "Full-time",
                description:
                    "Sviluppo dell’interfaccia della piattaforma e collaborazione con il team prodotto."
            },
            {
                id: "2",
                title: "AI Product Analyst",
                location: "Remote",
                type: "Contract",
                description:
                    "Analisi dei dati delle survey e progettazione degli insight generati dai modelli."
            }
        ]);
    }, []);

    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-white text-black";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";

    const textClass = isDark ? "text-neutral-300" : "text-neutral-700";
    const cardTextClass = isDark ? "text-neutral-400" : "text-neutral-800";

    return (
        <main className={`relative min-h-screen overflow-hidden ${bgClass}`}>

            {isDark && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />
            )}

            <div className="relative max-w-6xl mx-auto px-8 py-32 space-y-20">

                <section className="space-y-6 max-w-3xl">
                    <h1 className="text-5xl font-semibold">
                        Lavora con noi
                    </h1>

                    <p className={`text-lg ${textClass}`}>
                        Stiamo costruendo strumenti che trasformano i dati delle survey
                        in insight operativi per le aziende.
                        Se vuoi contribuire alla costruzione della piattaforma,
                        guarda le posizioni aperte.
                    </p>
                </section>

                <section className="grid gap-10">

                    {jobs.map(job => (
                        <div
                            key={job.id}
                            className={`p-10 rounded-3xl backdrop-blur-xl shadow-2xl ${cardBgClass}`}
                        >

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                <div className="space-y-3 max-w-3xl">

                                    <h2 className="text-2xl font-medium">
                                        {job.title}
                                    </h2>

                                    <div className={`text-sm ${cardTextClass}`}>
                                        {job.location} · {job.type}
                                    </div>

                                    <p className={`text-sm leading-relaxed ${textClass}`}>
                                        {job.description}
                                    </p>

                                </div>

                                <LiquidGlassButton
                                    onClick={() => {
                                        window.location.href = `/careers/apply/${job.id}`;
                                    }}
                                >
                                    Candidati
                                </LiquidGlassButton>

                            </div>
                        </div>
                    ))}

                </section>

            </div>
        </main>
    );
}