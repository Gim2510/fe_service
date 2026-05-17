import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

    const [step,        setStep]        = useState<Step>("list");
    const [selectedJob, setSelectedJob] = useState<CreateJobPositionDTO | null>(null);
    const [jobs,        setJobs]        = useState<CreateJobPositionDTO[]>([]);

    const { getAllJobOffers, loading, error } = useGetAllJobOffers();

    useEffect(() => {
        getAllJobOffers().then(setJobs).catch(console.error);
    }, []);

    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText  = isDark ? "text-slate-400" : "text-slate-600";

    const displayLocation = (loc: CreateJobPositionDTO["location"]) => {
        const policy = loc.remote
            ? (loc.remotePolicy === "full-remote" ? "Remote" : "Remote / Hybrid")
            : null;
        const place = `${loc.country}${loc.city ? ", " + loc.city : ""}`;
        return policy ? `${policy} · ${place}` : place;
    };

    const displayEmploymentType = (emp: CreateJobPositionDTO["employment"]) => ({
        "full-time": "Full-time", "part-time": "Part-time",
        "contract": "Contratto", "internship": "Stage", "freelance": "Freelance",
    }[emp.type] ?? emp.type);

    const displaySalary = (emp: CreateJobPositionDTO["employment"]) => {
        if (!emp.salary?.visible) return null;
        const { min, max, currency, period } = emp.salary;
        if (!min && !max) return null;
        return `${min ? min.toLocaleString() : ""}${min && max ? " – " : ""}${max ? max.toLocaleString() : ""} ${currency || ""} / ${period || ""}`;
    };

    const sectionLabel = (text: string) => (
        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-3 ${mutedText}`}>{text}</p>
    );

    return (
        <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
            {/* Grid background — same as homepage */}
            <div
                className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 space-y-12">

                {/* Hero */}
                <motion.section
                    className="max-w-2xl space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border text-cyan-400 border-cyan-500/20 bg-cyan-950/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Carriere
                    </span>
                    <h1 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Lavora <span className={isDark ? "text-cyan-400" : "text-cyan-700"}>con noi</span>
                    </h1>
                    <p className={`text-base leading-relaxed ${bodyText}`}>
                        Stiamo costruendo strumenti che trasformano i dati delle survey
                        in insight operativi per le aziende.
                    </p>
                </motion.section>

                {/* Main card */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${
                        isDark
                            ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10"
                            : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"
                    }`}
                >
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

                    {/* Back nav */}
                    {step !== "list" && (
                        <div className={`px-8 py-4 border-b ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                            <button
                                onClick={() => {
                                    if (step === "details") setStep("list");
                                    if (step === "apply")   setStep("details");
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
                                <FallingLines color={isDark ? "#fff" : "#B45309"} width="50" visible ariaLabel="loading" />
                            </div>
                        )}

                        {/* Error */}
                        {error && <p className="text-sm text-red-400">Errore nel caricamento delle posizioni.</p>}

                        <AnimatePresence mode="wait">

                            {/* STEP 1 — Job list */}
                            {step === "list" && !loading && (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {jobs.length === 0 ? (
                                        <p className={`text-sm py-8 text-center ${mutedText}`}>
                                            Nessuna posizione aperta al momento.
                                        </p>
                                    ) : (
                                        <div className="space-y-0">
                                            {jobs.map((job, i) => (
                                                <motion.div
                                                    key={job.id}
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.06 }}
                                                    className={`py-7 flex flex-col md:flex-row md:items-center justify-between gap-5
                                                        border-b last:border-none
                                                        ${isDark ? "border-stone-800/20" : "border-slate-100"}`}
                                                >
                                                    <div className="space-y-2">
                                                        <h2 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                                            {job.title}
                                                        </h2>
                                                        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono ${mutedText}`}>
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
                                                        <p className={`text-sm ${bodyText}`}>{job.summary}</p>
                                                    </div>

                                                    <button
                                                        onClick={() => { setSelectedJob(job); setStep("details"); }}
                                                        className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border
                                                            text-xs font-medium transition-all hover:-translate-y-0.5 duration-200
                                                            ${isDark
                                                                ? "border-cyan-500/20 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400"
                                                                : "border-cyan-200 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50"
                                                            }`}
                                                    >
                                                        Dettagli <ChevronRight size={12} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 2 — Job details */}
                            {step === "details" && selectedJob && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-8"
                                >
                                    {/* title + meta */}
                                    <div className="space-y-2">
                                        <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                            {selectedJob.title}
                                        </h2>
                                        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono ${mutedText}`}>
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
                                        <p className={`text-sm leading-relaxed pt-1 ${bodyText}`}>
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {/* responsibilities + requirements */}
                                    <div className={`rounded-xl border p-6 grid md:grid-cols-2 gap-8
                                        ${isDark ? "border-cyan-500/20 bg-white/[0.02]" : "border-cyan-200/60 bg-cyan-50/30"}`}>
                                        <div>
                                            {sectionLabel("Responsabilità")}
                                            <ul className="space-y-1.5">
                                                {selectedJob.responsibilities.map(r => (
                                                    <li key={r} className={`flex items-start gap-2 text-sm ${bodyText}`}>
                                                        <span className="text-cyan-400 mt-0.5 shrink-0">•</span>{r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            {sectionLabel("Requisiti")}
                                            <ul className="space-y-1.5">
                                                {selectedJob.requirements.map(r => (
                                                    <li key={r} className={`flex items-start gap-2 text-sm ${bodyText}`}>
                                                        <span className="text-cyan-400 mt-0.5 shrink-0">•</span>{r}
                                                    </li>
                                                ))}
                                                {selectedJob.niceToHave?.map(r => (
                                                    <li key={r} className={`flex items-start gap-2 text-sm ${mutedText}`}>
                                                        <span className="mt-0.5 shrink-0">◦</span>
                                                        {r} <span className="opacity-60">(nice to have)</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* benefits */}
                                    {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                                        <div>
                                            {sectionLabel("Benefit")}
                                            <ul className="flex flex-wrap gap-2">
                                                {selectedJob.benefits.map(b => (
                                                    <li key={b} className={`px-3 py-1.5 rounded-lg text-xs font-medium border
                                                        ${isDark ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400" : "border-cyan-300 bg-cyan-50 text-cyan-800"}`}>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* tech stack */}
                                    {selectedJob.techStack && selectedJob.techStack.length > 0 && (
                                        <div>
                                            {sectionLabel("Tech Stack")}
                                            <ul className="flex flex-wrap gap-2">
                                                {selectedJob.techStack.map(t => (
                                                    <li key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium border
                                                        ${isDark ? "border-stone-800/30 text-slate-300" : "border-slate-200 text-slate-700"}`}>
                                                        {t}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* hiring process */}
                                    {selectedJob.hiringProcess && selectedJob.hiringProcess.steps.length > 0 && (
                                        <div>
                                            {sectionLabel("Processo di selezione")}
                                            <ol className="space-y-2">
                                                {selectedJob.hiringProcess.steps.map((s, i) => (
                                                    <li key={i} className={`flex items-start gap-3 text-sm ${bodyText}`}>
                                                        <span className={`font-mono text-xs mt-0.5 shrink-0 ${isDark ? "text-cyan-600" : "text-cyan-500"}`}>
                                                            {String(i + 1).padStart(2, "0")}
                                                        </span>
                                                        {s}
                                                    </li>
                                                ))}
                                            </ol>
                                            {selectedJob.hiringProcess.estimatedDuration && (
                                                <p className={`text-xs mt-3 font-mono ${mutedText}`}>
                                                    Durata stimata: {selectedJob.hiringProcess.estimatedDuration}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setStep("apply")}
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                                            bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold
                                            transition-all shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 duration-200"
                                    >
                                        Candidati per questa posizione
                                        <ChevronRight size={14} />
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 3 — Apply */}
                            {step === "apply" && selectedJob && (
                                <motion.div
                                    key="apply"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ApplicationForm jobId={selectedJob._id} jobTitle={selectedJob.title} />
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
