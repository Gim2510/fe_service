import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { CheckCircle, Upload } from "lucide-react";
import { useSendApplication } from "../../hooks/useSendApplication";
import type { JobApplicationInput } from "../../types/JobApplicationTypes";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";

type Props = {
    jobId: string;
    jobTitle: string;
};

export function ApplicationForm({ jobId, jobTitle }: Props) {
    const { sendApplication, loading, error, success } = useSendApplication();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { token } = useAuth();

    const [form, setForm] = useState<JobApplicationInput>({
        name: "",
        email: "",
        social: "",
        description: "",
        cv: null,
    });

    const updateField = (field: keyof JobApplicationInput, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendApplication(jobId, token, form);
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border text-sm
        transition-colors focus:outline-none focus:ring-2 placeholder:text-slate-500
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700 focus:ring-sky-600/20"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-sky-600 focus:ring-sky-600/10"
        }`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
            <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                Candidati — {jobTitle}
            </h2>

            <input
                placeholder="Nome completo"
                value={form.name}
                onChange={e => updateField("name", e.target.value)}
                className={inputClass}
                required
            />

            <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => updateField("email", e.target.value)}
                className={inputClass}
                required
            />

            <input
                placeholder="LinkedIn / Portfolio"
                value={form.social}
                onChange={e => updateField("social", e.target.value)}
                className={inputClass}
                required
            />

            <textarea
                placeholder="Perché vuoi lavorare con noi?"
                rows={5}
                value={form.description}
                onChange={e => updateField("description", e.target.value)}
                className={inputClass + " resize-none"}
                required
            />

            <div>
                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer
                    transition-colors
                    ${isDark
                        ? "border-stone-800/30 text-slate-400 hover:border-sky-800/40 hover:text-slate-200"
                        : "border-slate-200 text-slate-500 hover:border-sky-400 hover:bg-sky-50/50"
                    }`}>
                    <Upload size={14} className="shrink-0" />
                    <span className="text-sm">
                        {form.cv ? (form.cv as File).name : "Allega CV (.pdf, .doc, .docx)"}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={e => updateField("cv", e.target.files?.[0] || null)}
                    />
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                    bg-sky-700 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed
                    text-white text-sm font-semibold transition-colors
                    shadow-lg shadow-sky-700/25 hover:-translate-y-0.5 duration-200"
            >
                {loading
                    ? <FallingLines color="#fff" width="20" visible />
                    : "Invia candidatura"
                }
            </button>

            {error && <p className="text-sm text-red-400">{error}</p>}

            {success && (
                <p className={`flex items-center gap-2 text-sm ${isDark ? "text-green-400" : "text-green-600"}`}>
                    <CheckCircle size={14} />
                    Candidatura inviata con successo.
                </p>
            )}
        </form>
    );
}
