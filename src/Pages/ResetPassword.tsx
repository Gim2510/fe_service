import {type ChangeEventHandler, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfirmPasswordReset } from "../hooks/useConfirmPasswordReset";

export function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const { confirmReset, loading, error, success } =
        useConfirmPasswordReset();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                Link non valido
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirm) {
            return;
        }

        await confirmReset(token, password);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
            <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl">

                <h1 className="text-2xl font-semibold text-center">
                    Nuova password
                </h1>

                <p className="text-sm text-neutral-400 text-center mt-2">
                    Inserisci una nuova password per il tuo account
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">

                    {error && (
                        <div className="text-sm px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-sm px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                            Password aggiornata con successo.
                        </div>
                    )}

                    {!success && (
                        <>
                            <Input
                                label="Nuova password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Input
                                label="Conferma password"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`mt-4 px-6 py-4 rounded-full font-medium transition ${
                                    loading
                                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                        : "bg-white text-neutral-900 hover:scale-105 active:scale-95"
                                }`}
                            >
                                {loading ? "Aggiornamento…" : "Aggiorna password"}
                            </button>
                        </>
                    )}

                    {success && (
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="mt-4 text-sm text-neutral-400 hover:text-white transition"
                        >
                            Torna al login
                        </button>
                    )}

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
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
                minLength={8}
                className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition text-white"
            />
        </div>
    );
}
