import { useState } from "react";
import { useCreateJobApplication } from "../../../hooks/useCreateJobApplication";
import type { CreateJobPositionInput } from "../../../types/JobApplicationTypes";
import { CreateJobConfirmModal } from "../DashboardModals/CreateJobConfirmModal";
import { TagInput } from "../TagInput.tsx";

export function CreateJobApplicationPanel({ theme, token }: {
    theme: string;
    token: string | null;
}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const isDark = theme === "dark";

    const cardBg = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";
    const textColor = isDark ? "text-slate-100" : "text-slate-900";

    const inputStyle = `w-full rounded-xl border px-3 py-2 text-sm focus:outline-none transition-colors ${
        isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-amber-700"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-amber-600"
    }`;

    const { createJobApplication, loading, error, success } = useCreateJobApplication();

    const [form, setForm] = useState<CreateJobPositionInput>({
        slug: "",
        title: "",
        department: "",
        team: "",
        status: "draft",

        location: {
            country: "",
            city: "",
            remote: false,
            remotePolicy: "hybrid",
            timezone: "",
        },

        employment: {
            type: "full-time",
            seniority: "mid",
            salary: {
                visible: false,
                min: undefined,
                max: undefined,
                currency: "EUR",
                period: "year",
            },
        },

        summary: "",
        description: "",

        responsibilities: [],
        requirements: [],
        niceToHave: [],

        benefits: [],
        techStack: [],

        hiringProcess: {
            steps: [],
            estimatedDuration: "",
        },

        tags: [],

        seo: {
            metaTitle: "",
            metaDescription: "",
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmCreate = async () => {
        await createJobApplication(token, form);
        setShowConfirmModal(false);
    };

    return (
        <div className="space-y-8">
            <div className={`rounded-2xl border ${cardBg} p-6 sm:p-8`}>
                <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>
                    Create Job Application
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* BASIC INFO */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input
                            className={inputStyle}
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Slug"
                            value={form.slug}
                            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Department"
                            value={form.department}
                            onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Team"
                            value={form.team}
                            onChange={(e) => setForm((p) => ({ ...p, team: e.target.value }))}
                        />
                    </div>

                    {/* LOCATION */}
                    <div className="grid sm:grid-cols-4 gap-4">
                        <input
                            className={inputStyle}
                            placeholder="Country"
                            value={form.location.country}
                            onChange={(e) => setForm((p) => ({ ...p, location: { ...p.location, country: e.target.value } }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="City"
                            value={form.location.city}
                            onChange={(e) => setForm((p) => ({ ...p, location: { ...p.location, city: e.target.value } }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Timezone"
                            value={form.location.timezone}
                            onChange={(e) => setForm((p) => ({ ...p, location: { ...p.location, timezone: e.target.value } }))}
                        />
                        <select
                            className={inputStyle + " appearance-none cursor-pointer"}
                            value={form.location.remotePolicy}
                            onChange={(e) => setForm((p) => ({ ...p, location: { ...p.location, remotePolicy: e.target.value as any } }))}
                        >
                            <option value="full-remote">Full Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="on-site">On Site</option>
                        </select>
                    </div>

                    {/* REMOTE CHECK */}
                    <label className={`flex items-center gap-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        <input
                            type="checkbox"
                            checked={form.location.remote}
                            onChange={(e) => setForm((p) => ({ ...p, location: { ...p.location, remote: e.target.checked } }))}
                        />
                        Remote position
                    </label>

                    {/* EMPLOYMENT */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <select
                            className={inputStyle + " appearance-none cursor-pointer"}
                            value={form.employment.type}
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, type: e.target.value as any } }))}
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="freelance">Freelance</option>
                        </select>
                        <select
                            className={inputStyle + " appearance-none cursor-pointer"}
                            value={form.employment.seniority}
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, seniority: e.target.value as any } }))}
                        >
                            <option value="intern">Intern</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                            <option value="lead">Lead</option>
                            <option value="principal">Principal</option>
                        </select>
                    </div>

                    {/* SALARY */}
                    <div className="grid sm:grid-cols-4 gap-4">
                        <input
                            type="number"
                            className={inputStyle}
                            placeholder="Min Salary"
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, salary: { ...p.employment.salary!, min: Number(e.target.value) } } }))}
                        />
                        <input
                            type="number"
                            className={inputStyle}
                            placeholder="Max Salary"
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, salary: { ...p.employment.salary!, max: Number(e.target.value) } } }))}
                        />
                        <input
                            className={inputStyle}
                            placeholder="Currency"
                            value={form.employment.salary?.currency}
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, salary: { ...p.employment.salary!, currency: e.target.value } } }))}
                        />
                        <select
                            className={inputStyle + " appearance-none cursor-pointer"}
                            value={form.employment.salary?.period}
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, salary: { ...p.employment.salary!, period: e.target.value as any } } }))}
                        >
                            <option value="year">Year</option>
                            <option value="month">Month</option>
                        </select>
                    </div>

                    {/* SALARY VISIBILITY */}
                    <label className={`flex items-center gap-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        <input
                            type="checkbox"
                            checked={form.employment.salary?.visible}
                            onChange={(e) => setForm((p) => ({ ...p, employment: { ...p.employment, salary: { ...p.employment.salary!, visible: e.target.checked } } }))}
                        />
                        Show salary publicly
                    </label>

                    {/* DESCRIPTION */}
                    <textarea
                        className={inputStyle}
                        placeholder="Summary"
                        rows={2}
                        value={form.summary}
                        onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                    />
                    <textarea
                        className={inputStyle}
                        placeholder="Description"
                        rows={5}
                        value={form.description}
                        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    />

                    {/* TAG INPUTS */}
                    <TagInput label="Responsibilities" values={form.responsibilities} setValues={(v: string[]) => setForm((p) => ({ ...p, responsibilities: v }))} theme={theme} />
                    <TagInput label="Requirements" values={form.requirements} setValues={(v: string[]) => setForm((p) => ({ ...p, requirements: v }))} theme={theme} />
                    <TagInput label="Nice To Have" values={form.niceToHave ?? []} setValues={(v: string[]) => setForm((p) => ({ ...p, niceToHave: v }))} theme={theme} />
                    <TagInput label="Tech Stack" values={form.techStack ?? []} setValues={(v: string[]) => setForm((p) => ({ ...p, techStack: v }))} theme={theme} />
                    <TagInput label="Benefits" values={form.benefits ?? []} setValues={(v: string[]) => setForm((p) => ({ ...p, benefits: v }))} theme={theme} />
                    <TagInput label="Hiring Steps" values={form.hiringProcess?.steps ?? []} setValues={(v: string[]) => setForm((p) => ({ ...p, hiringProcess: { ...p.hiringProcess!, steps: v } }))} theme={theme} />
                    <TagInput label="Tags" values={form.tags ?? []} setValues={(v: string[]) => setForm((p) => ({ ...p, tags: v }))} theme={theme} />

                    {/* SEO */}
                    <input
                        className={inputStyle}
                        placeholder="SEO Title"
                        value={form.seo?.metaTitle}
                        onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo!, metaTitle: e.target.value } }))}
                    />
                    <textarea
                        className={inputStyle}
                        placeholder="SEO Description"
                        rows={2}
                        value={form.seo?.metaDescription}
                        onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo!, metaDescription: e.target.value } }))}
                    />

                    {/* SUBMIT */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                        >
                            Create Job
                        </button>
                        {success && <span className="text-green-400 text-sm">Job created successfully</span>}
                        {error && <span className="text-red-400 text-sm">{error}</span>}
                    </div>
                </form>
            </div>

            {showConfirmModal && (
                <CreateJobConfirmModal
                    setShowModal={setShowConfirmModal}
                    handleConfirm={handleConfirmCreate}
                    loading={loading}
                    theme={theme}
                />
            )}
        </div>
    );
}
