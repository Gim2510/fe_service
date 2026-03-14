import { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";
import { useGetAllJobOffers } from "../../hooks/useGetJobOffers.ts";
import {FallingLines} from "react-loader-spinner";
import {ApplicationForm} from "./ApplicationForm.tsx";

export type CreateJobPositionDTO = {
    _id: string;
    id: string;
    title: string;
    slug: string;
    status: "draft" | "open" | "closed" | "archived";
    publishedAt?: Date;
    expiresAt?: Date;
    location: {
        country: string;
        city?: string;
        remote: boolean;
        remotePolicy?: "full-remote" | "hybrid" | "on-site";
        timezone?: string;
    };
    employment: {
        type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
        seniority: "intern" | "junior" | "mid" | "senior" | "lead" | "principal";
        salary?: {
            min?: number;
            max?: number;
            currency?: string;
            period?: "year" | "month";
            visible: boolean;
        };
    };
    summary: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave?: string[];
    benefits?: string[];
    techStack?: string[];
    hiringProcess?: { steps: string[]; estimatedDuration?: string };
    createdAt: Date;
    updatedAt?: Date;
};

type Step = "list" | "details" | "apply";

export function CareersFlowPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [step, setStep] = useState<Step>("list");
    const [selectedJob, setSelectedJob] = useState<CreateJobPositionDTO | null>(null);
    const [jobs, setJobs] = useState<CreateJobPositionDTO[]>([]);

    const { getAllJobOffers, loading, error } = useGetAllJobOffers();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobOffers();
                setJobs(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    // Helpers per mostrare location e tipo contratto
    const displayLocation = (location: CreateJobPositionDTO["location"]) => {
        if (location.remote) {
            const policy = location.remotePolicy === "full-remote"
                ? "Remote"
                : location.remotePolicy === "hybrid"
                    ? "Remote/Hybrid"
                    : "Remote";
            return `${policy} · ${location.country}${location.city ? ", " + location.city : ""}`;
        }
        return `${location.country}${location.city ? ", " + location.city : ""}`;
    };

    const displayEmploymentType = (employment: CreateJobPositionDTO["employment"]) => {
        const typeMap: Record<typeof employment.type, string> = {
            "full-time": "Full-time",
            "part-time": "Part-time",
            "contract": "Contratto",
            "internship": "Stage",
            "freelance": "Freelance",
        };
        return typeMap[employment.type] || employment.type;
    };

    const displaySalary = (employment: CreateJobPositionDTO["employment"]) => {
        if (!employment.salary?.visible) return null;
        const { min, max, currency, period } = employment.salary;
        if (!min && !max) return null;
        const minStr = min ? min.toLocaleString() : "";
        const maxStr = max ? max.toLocaleString() : "";
        return `${minStr}${min && max ? " - " : ""}${maxStr} ${currency || ""} / ${period || ""}`;
    };

    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-white text-black";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";
    const textClass = isDark ? "text-neutral-300" : "text-neutral-700";

    return (
        <main className={`min-h-screen ${bgClass}`}>
            <div className="max-w-6xl mx-auto px-8 py-32 space-y-16">

                {/* HERO */}
                <section className="max-w-3xl space-y-6">
                    <h1 className="text-5xl font-semibold">Lavora con noi</h1>
                    <p className={`text-lg ${textClass}`}>
                        Stiamo costruendo strumenti che trasformano i dati delle
                        survey in insight operativi per le aziende.
                    </p>
                </section>

                {/* MAIN CARD */}
                <section className={`p-12 rounded-3xl backdrop-blur-xl shadow-2xl ${cardBgClass}`}>

                    {/* BACK NAV */}
                    {step !== "list" && (
                        <button
                            onClick={() => {
                                if (step === "details") setStep("list");
                                if (step === "apply") setStep("details");
                            }}
                            className="mb-10 text-sm opacity-70 hover:opacity-100"
                        >
                            ← Torna indietro
                        </button>
                    )}

                    {/* LOADING */}
                    {loading && <div className='w-full h-full flex justify-center items-center'><FallingLines color="#fff" width={50} visible={true} ariaLabel="loading" /></div>}

                    {/* ERROR */}
                    {error && <p className="text-red-500">Errore nel caricamento delle posizioni.</p>}

                    {/* STEP 1 — JOB LIST */}
                    {step === "list" && !loading && (
                        <div className="space-y-10">
                            {jobs.length === 0 && <p className="opacity-70">Nessuna posizione aperta al momento.</p>}

                            {jobs.map(job => (
                                <div key={job.id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-neutral-800 pb-8">

                                    <div className="space-y-2">
                                        <h2 className="text-xl font-medium">{job.title}</h2>
                                        <p className="text-sm opacity-70">
                                            {displayLocation(job.location)} · {displayEmploymentType(job.employment)}
                                        </p>
                                        {displaySalary(job.employment) && (
                                            <p className="text-sm opacity-70">{displaySalary(job.employment)}</p>
                                        )}
                                        <p className={`text-sm ${textClass}`}>{job.summary}</p>
                                    </div>

                                    <LiquidGlassButton
                                        onClick={() => {
                                            setSelectedJob(job);
                                            setStep("details");
                                        }}
                                    >
                                        Dettagli
                                    </LiquidGlassButton>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* STEP 2 — JOB DETAILS */}
                    {step === "details" && selectedJob && (
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-semibold">{selectedJob.title}</h2>
                                <p className="text-sm opacity-70">
                                    {displayLocation(selectedJob.location)} · {displayEmploymentType(selectedJob.employment)}
                                </p>
                                {displaySalary(selectedJob.employment) && (
                                    <p className="text-sm opacity-70">{displaySalary(selectedJob.employment)}</p>
                                )}
                                <p className={`text-lg ${textClass}`}>{selectedJob.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">

                                {/* RESPONSIBILITIES */}
                                <div>
                                    <h3 className="font-medium mb-4">Responsabilità</h3>
                                    <ul className="space-y-2 text-sm opacity-80">
                                        {selectedJob.responsibilities.map(r => <li key={r}>• {r}</li>)}
                                    </ul>
                                </div>

                                {/* REQUIREMENTS */}
                                <div>
                                    <h3 className="font-medium mb-4">Requisiti</h3>
                                    <ul className="space-y-2 text-sm opacity-80">
                                        {selectedJob.requirements.map(r => <li key={r}>• {r}</li>)}
                                        {selectedJob.niceToHave?.map(r => <li key={r} className="opacity-60">• {r} (Nice to have)</li>)}
                                    </ul>
                                </div>

                            </div>

                            {/* BENEFITS */}
                            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-4">Benefit</h3>
                                    <ul className="space-y-2 text-sm opacity-80">
                                        {selectedJob.benefits.map(b => <li key={b}>• {b}</li>)}
                                    </ul>
                                </div>
                            )}

                            {/* TECH STACK */}
                            {selectedJob.techStack && selectedJob.techStack.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-4">Tech Stack</h3>
                                    <ul className="flex flex-wrap gap-2 text-sm opacity-80">
                                        {selectedJob.techStack.map(t => (
                                            <li key={t} className="px-2 py-1 bg-blue-600/20 rounded">{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* HIRING PROCESS */}
                            {selectedJob.hiringProcess && (
                                <div>
                                    <h3 className="font-medium mb-4">Processo di selezione</h3>
                                    <ul className="space-y-2 text-sm opacity-80">
                                        {selectedJob.hiringProcess.steps.map((s, i) => <li key={i}>• {s}</li>)}
                                    </ul>
                                    {selectedJob.hiringProcess.estimatedDuration && (
                                        <p className="text-sm opacity-70 mt-2">
                                            Durata stimata: {selectedJob.hiringProcess.estimatedDuration}
                                        </p>
                                    )}
                                </div>
                            )}

                            <LiquidGlassButton onClick={() => setStep("apply")}>
                                Candidati per questa posizione
                            </LiquidGlassButton>
                        </div>
                    )}

                    {/* STEP 3 — APPLY FORM */}
                    {step === "apply" && selectedJob && (
                        <ApplicationForm
                            jobId={selectedJob._id}
                            jobTitle={selectedJob.title}
                        />
                    )}

                </section>
            </div>
        </main>
    );
}