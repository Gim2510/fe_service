import { useState } from "react";
import {useTheme} from "../../Context/ThemeContext.tsx";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

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
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFile = (e: any) => {
        setForm({
            ...form,
            cv: e.target.files[0]
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("linkedin", form.linkedin);
        data.append("message", form.message);

        if (form.cv) {
            data.append("cv", form.cv);
        }

        await fetch("/api/careers/apply", {
            method: "POST",
            body: data
        });

        alert("Candidatura inviata!");
    };

    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-white text-black";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";

    const inputClass =
        "w-full p-4 rounded-xl bg-transparent border border-neutral-600 focus:outline-none";

    return (
        <main className={`min-h-screen flex justify-center items-center px-8 ${bgClass}`}>

            <div className={`max-w-2xl w-full p-12 rounded-3xl backdrop-blur-xl ${cardBgClass}`}>

                <h1 className="text-4xl font-semibold mb-10">
                    Invia la tua candidatura
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <input
                        name="name"
                        placeholder="Nome completo"
                        className={inputClass}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        className={inputClass}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="linkedin"
                        placeholder="LinkedIn / Portfolio"
                        className={inputClass}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        placeholder="Perché vuoi lavorare con noi?"
                        rows={5}
                        className={inputClass}
                        onChange={handleChange}
                    />

                    <div className="space-y-2">
                        <label className="text-sm opacity-70">
                            Carica il CV
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFile}
                        />
                    </div>

                    <LiquidGlassButton>
                        Invia candidatura
                    </LiquidGlassButton>

                </form>

            </div>

        </main>
    );
}