import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import { Input } from "../Components/Inputs/Input.tsx";
import { GoogleLogin } from "@react-oauth/google";
import { BarChart2, ShieldCheck, TrendingUp } from "lucide-react";

type RestoreInfo = {
    restored: boolean;
    daysSinceDeletion?: number;
};

const FEATURES = [
    { icon: BarChart2,   text: "Survey di maturità digitale" },
    { icon: TrendingUp,  text: "Score e analisi per categoria" },
    { icon: ShieldCheck, text: "Report operativi personalizzati" },
];

export function Login() {
    const { theme } = useTheme();
    const navigate   = useNavigate();
    const { doLogin, loading, error }                          = useLogin();
    const { doGoogleLogin, loading: googleLoading, error: googleError } = useGoogleLogin();
    const isDark = theme === "dark";

    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [restoreInfo, setRestoreInfo] = useState<RestoreInfo | null>(null);

    const border    = isDark ? "border-stone-800/30" : "border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";

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
        <main className={`relative min-h-screen flex items-center overflow-hidden
            ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>

            {/* grid bg */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />
                {isDark && (
                    <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.04] bg-amber-700" />
                )}
            </div>

            <div className={`relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8 pt-28 pb-16
                grid lg:grid-cols-2 gap-12 items-center
                ${isDark ? "text-white" : "text-slate-900"}`}>

                {/* Left — copy */}
                <motion.div
                    className="hidden lg:flex flex-col gap-7"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="space-y-4">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.22em]
                            ${isDark ? "text-amber-600" : "text-amber-700"}`}>
                            Bentornato
                        </span>
                        <h1 className={`font-fjalla text-5xl font-semibold leading-tight
                            ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Accedi al tuo
                            <span className="block text-amber-600 mt-1">spazio di controllo.</span>
                        </h1>
                        <p className={`text-base leading-relaxed max-w-md
                            ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Visualizza dati, analisi e strumenti progettati per rendere
                            il tuo business più chiaro, misurabile e scalabile.
                        </p>
                    </div>

                    {/* feature pills */}
                    <div className="space-y-2.5">
                        {FEATURES.map(({ icon: Icon, text }, i) => (
                            <motion.div
                                key={text}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className={`flex items-center gap-3 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                    ${isDark ? "bg-amber-700/10 border border-amber-700/20" : "bg-amber-50 border border-amber-200"}`}>
                                    <Icon size={13} className={isDark ? "text-amber-600" : "text-amber-700"} />
                                </div>
                                {text}
                            </motion.div>
                        ))}
                    </div>

                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                        Analisi guidata · Nessun impegno
                    </p>
                </motion.div>

                {/* Right — form card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    className={`rounded-2xl border overflow-hidden ${border}`}
                    style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                >
                    <div className="h-[2px] w-full bg-amber-700/60" />

                    <div className="p-7 sm:p-8">
                        {/* Restore banner */}
                        {restoreInfo?.restored && (
                            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400 flex flex-col gap-3">
                                <p>
                                    Bentornato! Account ripristinato
                                    {restoreInfo.daysSinceDeletion !== undefined && (
                                        <span> dopo <b>{restoreInfo.daysSinceDeletion}</b> giorni</span>
                                    )}.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="self-end px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 transition text-xs"
                                >
                                    Chiudi e continua
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* header */}
                            <div className="mb-1">
                                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-1 ${mutedText}`}>
                                    Accesso piattaforma
                                </p>
                                <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Accedi
                                </h2>
                            </div>

                            {(error || googleError) && (
                                <div className="text-xs px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/8 text-red-400">
                                    {error || googleError}
                                </div>
                            )}

                            <Input name="email"    type="email"    label="Email"    value={email}    onChange={e => setEmail(e.target.value)}    theme={theme} />
                            <Input name="password" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} theme={theme} />

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-1 w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-50
                                    text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200
                                    shadow-lg shadow-amber-700/20 flex items-center justify-center"
                            >
                                {loading
                                    ? <FallingLines color="white" width="20" visible ariaLabel="loading" />
                                    : "Accedi"
                                }
                            </button>

                            {/* divider */}
                            <div className="flex items-center gap-3">
                                <div className={`flex-1 h-px ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                                <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${mutedText}`}>oppure</span>
                                <div className={`flex-1 h-px ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                            </div>

                            {googleLoading ? (
                                <div className="flex justify-center py-1">
                                    <FallingLines color={isDark ? "white" : "#B45309"} width="20" visible ariaLabel="loading" />
                                </div>
                            ) : (
                                <GoogleLogin
                                    onSuccess={async cr => { await doGoogleLogin(cr.credential!); navigate("/"); }}
                                    onError={() => console.log("Google login failed")}
                                    theme={isDark ? "filled_black" : "outline"}
                                    size="large"
                                    width="100%"
                                    text="continue_with"
                                />
                            )}

                            {/* footer links */}
                            <div className="flex flex-col items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={() => navigate("/password-reset")}
                                    className={`text-xs transition ${mutedText} hover:${isDark ? "text-slate-300" : "text-slate-700"}`}
                                >
                                    Password dimenticata?
                                </button>
                                <span className={`text-xs ${mutedText}`}>
                                    Non hai un account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/register")}
                                        className={`font-semibold transition
                                            ${isDark ? "text-amber-500 hover:text-amber-400" : "text-amber-700 hover:text-amber-600"}`}
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
