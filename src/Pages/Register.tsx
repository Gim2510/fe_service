import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.ts";

export function Register() {
    const navigate = useNavigate();
    const { register, loading, error, success } = useRegister();

    const [form, setForm] = useState({
        email: "",
        given_name: "",
        family_name: "",
        password: "",
        fiscal_code: "",
        partita_iva: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(form);
            setTimeout(() => navigate("/login"), 3000);
        } catch (_) {}
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-main-white">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 rounded-xl shadow-lg w-96 bg-white"
            >
                <h2 className="text-2xl font-bold text-center">Registrati</h2>

                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <input
                    type="text"
                    name="given_name"
                    placeholder="Nome"
                    value={form.given_name}
                    onChange={handleChange}
                    required
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <input
                    type="text"
                    name="family_name"
                    placeholder="Cognome"
                    value={form.family_name}
                    onChange={handleChange}
                    required
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <input
                    type="text"
                    name="fiscal_code"
                    placeholder="Codice fiscale"
                    value={form.fiscal_code}
                    onChange={handleChange}
                    required
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <input
                    type="text"
                    name="partita_iva"
                    placeholder="Partita IVA"
                    value={form.partita_iva}
                    onChange={handleChange}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                />

                <div className="text-sm">
                    <input type="checkbox" required /> I accept the{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-2 py-3 rounded-xl text-white font-semibold transition-all ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-buttons hover:scale-105"
                    }`}
                >
                    {loading ? "Caricamento…" : "Registrati"}
                </button>

                <p className="text-sm text-center">
                    Hai già un account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Accedi
                    </span>
                </p>
            </form>
        </div>
    );
}
