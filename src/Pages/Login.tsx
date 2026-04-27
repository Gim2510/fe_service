import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import { Input } from "../Components/Inputs/Input.tsx";
import { GoogleLogin } from "@react-oauth/google";

type RestoreInfo = {
    restored: boolean;
    daysSinceDeletion?: number;
};

export function Login() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { doLogin, loading, error } = useLogin();
    const { doGoogleLogin, loading: googleLoading, error: googleError } = useGoogleLogin();
    const isDark = theme === "dark";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [restoreInfo, setRestoreInfo] = useState<RestoreInfo | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await doLogin({ email, password });
            if (res?.restored) {
                setRestoreInfo({ restored: true, daysSinceDeletion: res.daysSinceDeletion });
                return;
            }
            navigate("/");
        } catch (_) {}
    };

    return (
        <main className={`relative min-h-screen flex items-center overflow-hidden ${
            isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"
        }`}>
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />
                {isDark && (
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05] bg-amber-700" />
                )}
            </div>

            <div className={`relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-10 items-center ${
                isDark ? "text-white" : "text-slate-900"
            }`}>

                {/* Left copy */}
                <motion.div
                    className="hidden lg:flex flex-col gap-6"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? "text-amber-500" : "text-amber-700"
                    }`}>
                        Bentornato
                    </span>
                    <h1 className={`font-fjalla text-5xl font-semibold leading-tight ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        Accedi al tuo
                        <span className="block text-amber-600 mt-1">spazio di controllo.</span>
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-md ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Visualizza dati, analisi e strumenti progettati per rendere
                        il tuo business più chiaro, misurabile e scalabile.
                    </p>
                    <div className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Analisi guidata · Nessun impegno
                    </div>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                >
                    <div className={`rounded-2xl border backdrop-blur-xl p-6 sm:p-8 ${
                        isDark
                            ? "bg-[#1C1C1A]/80 border-stone-800/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                            : "bg-[#F8FAFB] border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                    }`}>

                        {/* Restore banner */}
                        {restoreInfo?.restored && (
                            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400 flex flex-col gap-3">
                                <div>
                                    Bentornato! Il tuo account è stato ripristinato
                                    {restoreInfo.daysSinceDeletion !== undefined && (
                                        <span> dopo <b>{restoreInfo.daysSinceDeletion}</b> giorni</span>
                                    )}.
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="self-end px-4 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition text-xs"
                                >
                                    Chiudi e continua
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="text-center mb-1">
                                <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Accedi
                                </h2>
                                <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Inserisci le tue credenziali
                                </p>
                            </div>

                            {(error || googleError) && (
                                <div className="text-sm px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                    {error || googleError}
                                </div>
                            )}

                            <Input name="email" type="email" label="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} theme={theme} />
                            <Input name="password" type="password" label="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} theme={theme} />

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-50
                                    text-white text-sm font-semibold transition-colors duration-200
                                    shadow-lg shadow-amber-700/20 flex items-center justify-center"
                            >
                                {loading
                                    ? <FallingLines color="white" width="20" visible ariaLabel="loading" />
                                    : "Accedi"
                                }
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className={`flex-1 h-px ${isDark ? "bg-stone-800/30" : "bg-slate-200"}`} />
                                <span className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>oppure</span>
                                <div className={`flex-1 h-px ${isDark ? "bg-stone-800/30" : "bg-slate-200"}`} />
                            </div>

                            {googleLoading ? (
                                <div className="flex justify-center">
                                    <FallingLines color={isDark ? "white" : "black"} width="20" visible ariaLabel="loading" />
                                </div>
                            ) : (
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        await doGoogleLogin(credentialResponse.credential!);
                                        navigate("/");
                                    }}
                                    onError={() => console.log("Google login failed")}
                                    theme={isDark ? "filled_black" : "outline"}
                                    size="large"
                                    width="100%"
                                    text="continue_with"
                                />
                            )}

                            <div className="text-center text-sm mt-1 flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/password-reset")}
                                    className={`transition ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
                                >
                                    Password dimenticata?
                                </button>
                                <span className={isDark ? "text-slate-600" : "text-slate-400"}>
                                    Non hai un account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/register")}
                                        className={`font-medium transition ${isDark ? "text-amber-500 hover:text-amber-400" : "text-amber-700 hover:text-amber-600"}`}
                                    >
                                        Registrati
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
