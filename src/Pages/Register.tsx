import { type ChangeEvent, type SubmitEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRegister } from "../hooks/useRegister";
import { CompanyRoles } from "../types/CompanyRoles.ts";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import zxcvbn from "zxcvbn";
import { getStrengthColor, getStrengthText } from "../utils/colorFunctions.ts";
import { Input } from "../Components/Inputs/Input.tsx";
import { InputConfirm } from "../Components/Inputs/InputConfirm.tsx";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

export function Register() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { register, loading, error, success } = useRegister();
    const { doGoogleLogin, loading: googleLoading, error: googleError } = useGoogleLogin();
    const isDark = theme === "dark";
    const successRef = useRef<HTMLDivElement | null>(null);

    const companyRoles: CompanyRoles[] = [
        CompanyRoles.Founder, CompanyRoles.CEO, CompanyRoles.Employee,
        CompanyRoles.CTO, CompanyRoles.Manager,
    ];

    const [form, setForm] = useState({
        given_name: "", family_name: "", email: "", password: "",
        confirmPassword: "", fiscal_code: "", partita_iva: "",
        company_name: "", company_role: CompanyRoles.Employee,
    });

    const passwordScore = zxcvbn(form.password).score;
    const passwordsMatch = form.password === form.confirmPassword;

    useEffect(() => {
        if (success && successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [success]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!passwordsMatch || passwordScore < 2) return;
        try {
            await register(form);
            setTimeout(() => navigate("/login"), 5000);
        } catch (_) {}
    };

    const selectClass = `px-4 py-2.5 rounded-lg border outline-none transition text-sm ${
        isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-amber-700"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-amber-600"
    } focus:ring-1 focus:ring-amber-600/30`;

    return (
        <main className={`relative min-h-screen flex items-start overflow-hidden ${isDark ? "bg-[#111110]" : "bg-[#E8EDF3]"}`}>
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
                    <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05] bg-amber-700" />
                )}
            </div>

            <div className={`relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 py-24 grid lg:grid-cols-2 gap-16 items-start ${
                isDark ? "text-white" : "text-slate-900"
            }`}>

                {/* Left copy */}
                <motion.div
                    className="flex flex-col gap-6 lg:sticky lg:top-28"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                        Accesso piattaforma
                    </span>
                    <h1 className={`font-fjalla text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Inizia a costruire
                        <span className="block text-amber-600 mt-1">un sistema sotto controllo.</span>
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-md ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Registrati per accedere agli strumenti di analisi e trasformare
                        i tuoi dati in decisioni misurabili.
                    </p>
                    <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        Nessun abbonamento automatico · Attivazione immediata
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                >
                    <div className={`rounded-2xl border backdrop-blur-xl p-8 sm:p-10 ${
                        isDark
                            ? "bg-[#1C1C1A]/80 border-stone-800/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                            : "bg-[#F8FAFB] border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                    }`}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="text-center mb-2">
                                <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Crea account</h2>
                                <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Inserisci i tuoi dati</p>
                            </div>

                            {(error || googleError) && (
                                <div className="text-sm px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                    {error || googleError}
                                </div>
                            )}
                            {success && (
                                <div ref={successRef} className="text-sm px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                    {success}
                                    <p className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                        Controlla la tua email per verificare l'account.
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input theme={theme} label="Nome" name="given_name" value={form.given_name} onChange={handleChange} />
                                <Input theme={theme} label="Cognome" name="family_name" value={form.family_name} onChange={handleChange} />
                            </div>

                            <Input theme={theme} label="Email" name="email" type="email" value={form.email} onChange={handleChange} />

                            <div className="flex flex-col gap-2">
                                <Input theme={theme} label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
                                {form.password && (
                                    <div className="flex flex-col gap-1">
                                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#F8FAFB]/5" : "bg-[#EDF2F7]"}`}>
                                            <div
                                                className={`h-full transition-all duration-300 rounded-full ${getStrengthColor(passwordScore)}`}
                                                style={{ width: `${(passwordScore + 1) * 20}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            Sicurezza: {getStrengthText(passwordScore)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>Conferma password</label>
                                <InputConfirm form={form} handleChange={handleChange} theme={theme} passwordsMatch={passwordsMatch} />
                            </div>

                            <Input theme={theme} label="Nome azienda" name="company_name" value={form.company_name} onChange={handleChange} />

                            <div className="flex flex-col gap-2">
                                <label className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>Ruolo aziendale</label>
                                <select name="company_role" value={form.company_role} onChange={handleChange} className={selectClass}>
                                    {companyRoles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <Input theme={theme} label="Codice fiscale" name="fiscal_code" value={form.fiscal_code.toUpperCase()} onChange={handleChange} />
                            <Input theme={theme} label="Partita IVA" name="partita_iva" value={form.partita_iva} onChange={handleChange} />

                            <button
                                type="submit"
                                disabled={loading || !passwordsMatch || passwordScore < 2}
                                className="mt-3 w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed
                                    text-white text-sm font-semibold transition-colors duration-200
                                    shadow-lg shadow-amber-700/20 flex items-center justify-center"
                            >
                                {loading
                                    ? <FallingLines width="20" color="white" visible />
                                    : "Crea account"
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

                            <div className={`text-center text-sm mt-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                Hai già un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className={`font-medium transition ${isDark ? "text-amber-500 hover:text-amber-400" : "text-amber-700 hover:text-amber-600"}`}
                                >
                                    Accedi
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
