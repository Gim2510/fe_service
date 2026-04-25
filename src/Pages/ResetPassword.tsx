import { type ChangeEventHandler, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfirmPasswordReset } from "../hooks/useConfirmPasswordReset";

export function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const { confirmReset, loading, error, success } = useConfirmPasswordReset();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060D1B] text-slate-400">
                Link non valido o scaduto.
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) return;
        await confirmReset(token, password);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#060D1B] px-6">
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="rounded-2xl border border-blue-900/20 bg-[#0D1A30]/80 backdrop-blur-xl p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                    <h1 className="text-2xl font-semibold text-center text-slate-100">Nuova password</h1>
                    <p className="text-sm text-slate-500 text-center mt-2">
                        Inserisci una nuova password per il tuo account
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
                        {error && (
                            <div className="text-sm px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-sm px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                Password aggiornata con successo.
                            </div>
                        )}

                        {!success && (
                            <>
                                <FieldInput label="Nuova password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <FieldInput label="Conferma password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

                                {password && confirm && password !== confirm && (
                                    <p className="text-xs text-red-400">Le password non coincidono.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50
                                        text-white text-sm font-semibold transition-colors duration-200 mt-1"
                                >
                                    {loading ? "Aggiornamento…" : "Aggiorna password"}
                                </button>
                            </>
                        )}

                        {success && (
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-sm text-blue-400 hover:text-blue-300 transition text-center"
                            >
                                Torna al login
                            </button>
                        )}
                    </form>
                </div>
            </motion.div>
        </main>
    );
}

function FieldInput({ label, type, value, onChange }: {
    label: string; type: string; value: string; onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">{label}</label>
            <input
                type={type} value={value} onChange={onChange}
                required minLength={8}
                className="px-4 py-2.5 rounded-lg border border-blue-900/30 bg-[#060D1B]
                    text-slate-200 text-sm outline-none transition
                    focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30"
            />
        </div>
    );
}
