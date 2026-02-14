import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordResetRequest } from "../hooks/usePasswordResetRequest";

export function PasswordResetRequest() {
    const navigate = useNavigate();
    const { requestReset, loading, error, success } =
        usePasswordResetRequest();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await requestReset(email);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
            <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl">

                <h1 className="text-2xl font-semibold text-center">
                    Reset password
                </h1>

                <p className="text-sm text-neutral-400 text-center mt-2">
                    Inserisci la tua email. Se esiste un account, riceverai un link.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">

                    {success && (
                        <div className="text-sm px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                            Se l’email è registrata, riceverai un messaggio a breve.
                        </div>
                    )}

                    {error && (
                        <div className="text-sm px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                            {error}
                        </div>
                    )}

                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 px-6 py-4 rounded-full font-medium transition cursor-pointer ${
                            loading
                                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                : "bg-white text-neutral-900 hover:scale-105 active:scale-95"
                        }`}
                    >
                        {loading ? "Invio in corso…" : "Invia link di reset"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm text-neutral-400 hover:text-white transition"
                    >
                        Torna al login
                    </button>

                </form>
            </div>
        </main>
    );
}

function Input({
                   label,
                   type,
                   value,
                   onChange,
               }: {
    label: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
                className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition text-white"
            />
        </div>
    );
}
