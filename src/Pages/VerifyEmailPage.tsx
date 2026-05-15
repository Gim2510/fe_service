import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useTheme } from "../Context/ThemeContext.tsx";
import { Badge } from "../Components/Badge.tsx";

export function VerifyEmailPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { _id } = useParams<{ _id: string }>();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "success") {
            setTimeout(() => navigate("/login"), 5000);
        }
    }, [status]);

    useEffect(() => {
        if (!_id) return;
        fetch(`${import.meta.env.VITE_USER_BASE_URL}/v1/user/verify/${_id}`)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Verification failed");
            })
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"));
    }, [_id]);

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
                className="relative z-10 w-full max-w-sm text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
                    isDark
                        ? "border-stone-800/20 bg-[#1C1C1A]/80 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                        : "border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
                }`}>
                    {isDark && <div className="h-[2px] w-full bg-sky-700/60" />}

                    <div className="p-10 flex flex-col items-center gap-6">
                        {status === "loading" && (
                            <>
                                <Badge label="Verifica email" color="sky" theme={theme} />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader2 size={40} className="text-sky-500" />
                                </motion.div>
                                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Verifica in corso…</p>
                            </>
                        )}
                        {status === "success" && (
                            <>
                                <Badge label="Verifica completata" color="green" theme={theme} />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                                >
                                    <CheckCircle size={32} className="text-green-400" />
                                </motion.div>
                                <div>
                                    <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Email verificata</h2>
                                    <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Verrai reindirizzato al login tra 5 secondi.</p>
                                </div>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200 shadow-lg shadow-sky-700/20"
                                >
                                    Vai al login
                                </button>
                            </>
                        )}
                        {status === "error" && (
                            <>
                                <Badge label="Verifica fallita" color="red" theme={theme} />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
                                >
                                    <XCircle size={32} className="text-red-400" />
                                </motion.div>
                                <div>
                                    <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Verifica fallita</h2>
                                    <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Il link non è valido o è scaduto.</p>
                                </div>
                                <button
                                    onClick={() => navigate("/login")}
                                    className={`px-6 py-2.5 rounded-xl border text-sm transition-all hover:-translate-y-0.5 duration-200 ${
                                        isDark
                                            ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50"
                                            : "border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300"
                                    }`}
                                >
                                    Torna al login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
