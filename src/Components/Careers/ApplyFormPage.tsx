import { useState } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";
import { Upload } from "lucide-react";

export function ApplyFormPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [form, setForm] = useState({
        name: "",
        email: "",
        linkedin: "",
        message: "",
        cv: null as File | null
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e: any) => {
        setForm({ ...form, cv: e.target.files[0] });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("linkedin", form.linkedin);
        data.append("message", form.message);
        if (form.cv) data.append("cv", form.cv);

        await fetch("/api/careers/apply", { method: "POST", body: data });
        alert("Candidatura inviata!");
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
        isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-sky-600"
    }`;

    return (
        <main className={`min-h-screen flex justify-center items-center px-8 ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
            <div className={`max-w-2xl w-full p-12 rounded-2xl border ${isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"}`}>
                <h1 className={`text-3xl font-semibold mb-10 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Invia la tua candidatura
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input name="name" placeholder="Nome completo" className={inputClass} onChange={handleChange} required />
                    <input name="email" placeholder="Email" type="email" className={inputClass} onChange={handleChange} required />
                    <input name="linkedin" placeholder="LinkedIn / Portfolio" className={inputClass} onChange={handleChange} />
                    <textarea name="message" placeholder="Perché vuoi lavorare con noi?" rows={5} className={inputClass} onChange={handleChange} />

                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Carica il CV
                        </label>
                        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                            isDark
                                ? "border-stone-800/30 text-slate-400 hover:border-sky-700 hover:text-slate-200"
                                : "border-slate-200 text-slate-500 hover:border-sky-600 hover:text-slate-700"
                        }`}>
                            <Upload size={15} />
                            <span className="text-sm">{form.cv ? form.cv.name : "Seleziona file (.pdf, .doc, .docx)"}</span>
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
                    >
                        Invia candidatura
                    </button>
                </form>
            </div>
        </main>
    );
}
