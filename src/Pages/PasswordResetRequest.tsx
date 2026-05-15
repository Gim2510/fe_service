import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePasswordResetRequest } from "../hooks/usePasswordResetRequest";
import { useTheme } from "../Context/ThemeContext.tsx";
import { Badge } from "../Components/Badge.tsx";

export function PasswordResetRequest() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { requestReset, loading, error, success } = usePasswordResetRequest();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await requestReset(email);
    };

    return (
        <main className={`min-h-screen flex items-center justify-center px-6 ${
            isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"
        }`}>
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                }}
            />
            {isDark && (
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.04] bg-sky-700 pointer-events-none" />
            )}

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
                    isDark
                        ? "border-stone-800/20 bg-[#1C1C1A]/80 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                        : "border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
                }`}>
                    {isDark && <div className="h-[2px] w-full bg-sky-700/60" />}

                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <Badge label="Recupero password" color="amber" theme={theme} />
                            <h1 className={`text-2xl font-semibold mt-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                Reset password
                            </h1>
                            <p className={`text-sm mt-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                Inserisci la tua email. Se esiste un account, riceverai un link.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                                <label className={`text-[10px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`px-4 py-2.5 rounded-xl border backdrop-blur-sm outline-none transition-all duration-200 text-sm
                                        ${isDark
                                            ? "bg-[#111110]/80 border-stone-800/30 text-slate-200 placeholder:text-slate-700 focus:border-sky-700 focus:ring-2 focus:ring-sky-700/20"
                                            : "bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-600/15"
                                        }`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50
                                    text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200
                                    shadow-lg shadow-sky-700/20"
                            >
                                {loading ? "Invio in corso…" : "Invia link di reset"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className={`text-sm transition ${isDark ? "text-slate-500 hover:text-sky-400" : "text-slate-500 hover:text-sky-700"}`}
                            >
                                Torna al login
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
