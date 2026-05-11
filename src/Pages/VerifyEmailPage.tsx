import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function VerifyEmailPage() {
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
        <main className="min-h-screen flex items-center justify-center bg-[#111110] px-6">
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='%23F59E0B' stroke-width='0.5'/%3E%3C/svg%3E\")",
                    backgroundSize: "40px 40px",
                }}
            />

            <motion.div
                className="relative z-10 w-full max-w-sm text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="rounded-2xl border border-stone-800/20 bg-[#1C1C1A]/80 backdrop-blur-xl p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5)] flex flex-col items-center gap-6">
                    {status === "loading" && (
                        <>
                            <Loader2 size={40} className="text-emerald-500 animate-spin" />
                            <p className="text-slate-400 text-sm">Verifica in corso…</p>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <CheckCircle size={32} className="text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-100">Email verificata</h2>
                                <p className="text-sm text-slate-500 mt-1">Verrai reindirizzato al login tra 5 secondi.</p>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                            >
                                Vai al login
                            </button>
                        </>
                    )}
                    {status === "error" && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <XCircle size={32} className="text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-100">Verifica fallita</h2>
                                <p className="text-sm text-slate-500 mt-1">Il link non è valido o è scaduto.</p>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2.5 rounded-xl border border-stone-800/30 text-slate-400 hover:text-slate-200 text-sm transition-colors"
                            >
                                Torna al login
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        </main>
    );
}
