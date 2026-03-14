import { useState } from "react";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton";
import { useSendApplication } from "../../hooks/useSendApplication";
import type { JobApplicationInput } from "../../types/JobApplicationTypes";

type Props = {
    jobId: string;
    jobTitle: string;
};

export function ApplicationForm({ jobId, jobTitle }: Props) {
    const { sendApplication, loading, error, success } = useSendApplication();

    const [form, setForm] = useState<JobApplicationInput>({
        name: "",
        email: "",
        social: "",
        description: "",
        cv: null
    });

    const updateField = (field: keyof JobApplicationInput, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        await sendApplication(jobId, token, form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

            <h2 className="text-2xl font-semibold">
                Candidati — {jobTitle}
            </h2>

            <input
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-4 rounded-xl border bg-transparent"
                required
            />

            <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full p-4 rounded-xl border bg-transparent"
                required
            />

            <input
                placeholder="LinkedIn / Portfolio"
                value={form.social}
                required
                onChange={(e) => updateField("social", e.target.value)}
                className="w-full p-4 rounded-xl border bg-transparent"
            />

            <textarea
                placeholder="Perché vuoi lavorare con noi?"
                rows={5}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full p-4 rounded-xl border bg-transparent"
                required
            />

            <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => updateField("cv", e.target.files?.[0] || null)}
            />

            <LiquidGlassButton type="submit" variant='navbar' className='sm:ml-10'>
                {loading ? "Invio..." : "Invia candidatura"}
            </LiquidGlassButton>

            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-green-500 text-sm">
                    Candidatura inviata con successo.
                </p>
            )}

        </form>
    );
}