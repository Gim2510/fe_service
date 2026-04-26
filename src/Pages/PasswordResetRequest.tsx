import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePasswordResetRequest } from "../hooks/usePasswordResetRequest";

export function PasswordResetRequest() {
    const navigate = useNavigate();
    const { requestReset, loading, error, success } = usePasswordResetRequest();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await requestReset(email);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#111110] px-6">
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
                <div className="rounded-2xl border border-stone-800/20 bg-[#1C1C1A]/80 backdrop-blur-xl p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                    <h1 className="text-2xl font-semibold text-center text-slate-100">Reset password</h1>
                    <p className="text-sm text-slate-500 text-center mt-2">
                        Inserisci la tua email. Se esiste un account, riceverai un link.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
                        {success && (
                            <div className="text-sm px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                Se l'email è registrata, riceverai un messaggio a breve.
                            </div>
                        )}
                        {error && (
                            <div className="text-sm px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-400">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="px-4 py-2.5 rounded-lg border border-stone-800/30 bg-[#111110]
                                    text-slate-200 text-sm outline-none transition
                                    focus:border-amber-700 focus:ring-1 focus:ring-amber-600/30"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-50
                                text-white text-sm font-semibold transition-colors duration-200 mt-1"
                        >
                            {loading ? "Invio in corso…" : "Invia link di reset"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-sm text-slate-500 hover:text-slate-300 transition text-center"
                        >
                            Torna al login
                        </button>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
