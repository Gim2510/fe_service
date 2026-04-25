import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FallingLines } from "react-loader-spinner";
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, ChevronRight } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useGetAllJobOffers } from "../../hooks/useGetJobOffers.ts";
import { ApplicationForm } from "./ApplicationForm.tsx";

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

    const displayLocation = (location: CreateJobPositionDTO["location"]) => {
        if (location.remote) {
            const policy = location.remotePolicy === "full-remote"
                ? "Remote"
                : location.remotePolicy === "hybrid"
                    ? "Remote / Hybrid"
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
        return `${minStr}${min && max ? " – " : ""}${maxStr} ${currency || ""} / ${period || ""}`;
    };

    const card = isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200";

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#060D1B] text-white" : "bg-[#F8FAFC] text-slate-900"}`}>
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`, backgroundSize: "28px 28px" }} />

            <div className="relative max-w-5xl mx-auto px-6 py-32 space-y-12">

                {/* Hero */}
                <motion.section
                    className="max-w-2xl space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        Carriere
                    </span>
                    <h1 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Lavora{" "}
                        <span className="text-blue-500">con noi</span>
                    </h1>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Stiamo costruendo strumenti che trasformano i dati delle survey
                        in insight operativi per le aziende.
                    </p>
                </motion.section>

                {/* Main card */}
                <div className={`rounded-2xl border ${card}`}>
                    {/* Back nav */}
                    {step !== "list" && (
                        <div className={`px-8 py-4 border-b ${isDark ? "border-blue-900/20" : "border-slate-100"}`}>
                            <button
                                onClick={() => {
                                    if (step === "details") setStep("list");
                                    if (step === "apply") setStep("details");
                                }}
                                className={`inline-flex items-center gap-2 text-xs font-medium transition-colors
                                    ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"}`}
                            >
                                <ArrowLeft size={13} /> Torna indietro
                            </button>
                        </div>
                    )}

                    <div className="p-8">
                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-center py-12">
                                <FallingLines color={isDark ? "#fff" : "#3B82F6"} width="50" visible ariaLabel="loading" />
                            </div>
                        )}

                        {/* Error */}
                        {error && <p className="text-sm text-red-400">Errore nel caricamento delle posizioni.</p>}

                        {/* STEP 1 — Job list */}
                        {step === "list" && !loading && (
                            <div className="divide-y">
                                {jobs.length === 0 && (
                                    <p className={`text-sm py-8 text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                        Nessuna posizione aperta al momento.
                                    </p>
                                )}
                                {jobs.map(job => (
                                    <div
                                        key={job.id}
                                        className={`py-7 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-5
                                            ${isDark ? "divide-blue-900/20" : "divide-slate-100"}`}
                                    >
                                        <div className="space-y-2">
                                            <h2 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                                {job.title}
                                            </h2>
                                            <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={11} /> {displayLocation(job.location)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={11} /> {displayEmploymentType(job.employment)}
                                                </span>
                                                {displaySalary(job.employment) && (
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign size={11} /> {displaySalary(job.employment)}
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                {job.summary}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => { setSelectedJob(job); setStep("details"); }}
                                            className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors
                                                ${isDark
                                                    ? "border-blue-900/30 text-slate-300 hover:border-blue-700/40 hover:text-slate-100"
                                                    : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                                }`}
                                        >
                                            Dettagli <ChevronRight size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* STEP 2 — Job details */}
                        {step === "details" && selectedJob && (
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                        {selectedJob.title}
                                    </h2>
                                    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={11} /> {displayLocation(selectedJob.location)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={11} /> {displayEmploymentType(selectedJob.employment)}
                                        </span>
                                        {displaySalary(selectedJob.employment) && (
                                            <span className="flex items-center gap-1">
                                                <DollarSign size={11} /> {displaySalary(selectedJob.employment)}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                        {selectedJob.description}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Responsabilità
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {selectedJob.responsibilities.map(r => (
                                                <li key={r} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                    <span className="text-blue-400 mt-0.5">•</span>{r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Requisiti
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {selectedJob.requirements.map(r => (
                                                <li key={r} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                    <span className="text-blue-400 mt-0.5">•</span>{r}
                                                </li>
                                            ))}
                                            {selectedJob.niceToHave?.map(r => (
                                                <li key={r} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                    <span className="mt-0.5">◦</span>{r}{" "}
                                                    <span className="opacity-60">(Nice to have)</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                                    <div>
                                        <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Benefit
                                        </h3>
                                        <ul className="flex flex-wrap gap-2">
                                            {selectedJob.benefits.map(b => (
                                                <li key={b} className={`px-3 py-1.5 rounded-lg text-xs font-medium border
                                                    ${isDark ? "border-blue-900/20 bg-blue-600/10 text-blue-300" : "border-blue-200 bg-blue-50 text-blue-700"}`}>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedJob.techStack && selectedJob.techStack.length > 0 && (
                                    <div>
                                        <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Tech Stack
                                        </h3>
                                        <ul className="flex flex-wrap gap-2">
                                            {selectedJob.techStack.map(t => (
                                                <li key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium border
                                                    ${isDark ? "border-blue-900/20 text-slate-300" : "border-slate-200 text-slate-700"}`}>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedJob.hiringProcess && (
                                    <div>
                                        <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Processo di selezione
                                        </h3>
                                        <ol className="space-y-1.5">
                                            {selectedJob.hiringProcess.steps.map((s, i) => (
                                                <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                    <span className={`font-mono text-xs mt-0.5 ${isDark ? "text-blue-600" : "text-blue-400"}`}>
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ol>
                                        {selectedJob.hiringProcess.estimatedDuration && (
                                            <p className={`text-xs mt-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                                Durata stimata: {selectedJob.hiringProcess.estimatedDuration}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <button
                                    onClick={() => setStep("apply")}
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                                        bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
                                        transition-colors shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 duration-200"
                                >
                                    Candidati per questa posizione
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        )}

                        {/* STEP 3 — Apply */}
                        {step === "apply" && selectedJob && (
                            <ApplicationForm jobId={selectedJob._id} jobTitle={selectedJob.title} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
