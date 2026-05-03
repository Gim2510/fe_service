import { type ChangeEvent, type SubmitEventHandler, useEffect, useRef, useState } from "react";
import { validateRegisterForm, type RegisterFormErrors } from "../utils/validation.ts";
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
import { CheckCircle } from "lucide-react";

export function Register() {
    const { theme } = useTheme();
    const navigate  = useNavigate();
    const { register, loading, error, success }                        = useRegister();
    const { doGoogleLogin, loading: googleLoading, error: googleError } = useGoogleLogin();
    const isDark     = theme === "dark";
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
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

    const passwordScore   = zxcvbn(form.password).score;
    const passwordsMatch  = form.password === form.confirmPassword;

    const border    = isDark ? "border-stone-800/30" : "border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";

    useEffect(() => {
        if (success && successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [success]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (formErrors[name as keyof RegisterFormErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!passwordsMatch || passwordScore < 2) return;
        const errors = validateRegisterForm(form);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        try {
            await register(form);
            setTimeout(() => navigate("/login"), 5000);
        } catch (_) {}
    };

    const selectClass = `px-4 py-2.5 rounded-xl border outline-none transition text-sm appearance-none cursor-pointer
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-600/20"
            : "bg-white border-slate-200 text-slate-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/15"
        }`;

    return (
        <main className={`relative min-h-screen flex items-start overflow-hidden
            ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}
            style={{ scrollbarWidth: "none" }}>

            {/* grid bg */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3Cpath d='M28 66 L56 50 L56 84 L28 100 L0 84 L0 50 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3C/svg%3E")`,
                        backgroundSize: "56px 100px",
                    }}
                />
                {isDark && (
                    <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.04] bg-amber-700" />
                )}
            </div>

            <div className={`relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8 pt-28 pb-16
                grid lg:grid-cols-2 gap-12 items-start
                ${isDark ? "text-white" : "text-slate-900"}`}>

                {/* Left — copy (sticky) */}
                <motion.div
                    className="hidden lg:flex flex-col gap-7 sticky top-28"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="space-y-4">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.22em]
                            ${isDark ? "text-amber-600" : "text-amber-700"}`}>
                            Accesso piattaforma
                        </span>
                        <h1 className={`font-fjalla text-5xl font-semibold leading-tight
                            ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Inizia a costruire
                            <span className="block text-amber-600 mt-1">un sistema sotto controllo.</span>
                        </h1>
                        <p className={`text-base leading-relaxed max-w-md
                            ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Registrati per accedere agli strumenti di analisi e trasformare
                            i tuoi dati in decisioni misurabili.
                        </p>
                    </div>

                    {/* mini step guide */}
                    <div className={`rounded-xl border p-5 space-y-3 ${border}`}
                         style={{ background: isDark ? "#111110" : "#F0EDE8" }}>
                        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                            Come funziona
                        </p>
                        {["Crea il tuo account gratuito", "Compila il questionario di maturità", "Ricevi score e analisi dettagliate"].map((step, i) => (
                            <div key={step} className="flex items-start gap-3">
                                <span className={`text-[10px] font-mono shrink-0 mt-0.5
                                    ${isDark ? "text-amber-700" : "text-amber-600"}`}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{step}</span>
                            </div>
                        ))}
                    </div>

                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${mutedText}`}>
                        Nessun abbonamento automatico · Attivazione immediata
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
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* header */}
                            <div className="mb-1">
                                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-1 ${mutedText}`}>
                                    Nuovo account
                                </p>
                                <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Crea account
                                </h2>
                            </div>

                            {(error || googleError) && (
                                <div className="text-xs px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/8 text-red-400">
                                    {error || googleError}
                                </div>
                            )}

                            {success && (
                                <div ref={successRef} className="flex items-start gap-3 text-xs px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/8 text-green-400">
                                    <CheckCircle size={14} className="shrink-0 mt-0.5" />
                                    <div>
                                        <p>{success}</p>
                                        <p className={`mt-1 ${mutedText}`}>Controlla la tua email per verificare l'account.</p>
                                    </div>
                                </div>
                            )}

                            {/* name */}
                            <div className="grid grid-cols-2 gap-3">
                                <Input theme={theme} label="Nome"    name="given_name"  value={form.given_name}  onChange={handleChange} error={formErrors.given_name} />
                                <Input theme={theme} label="Cognome" name="family_name" value={form.family_name} onChange={handleChange} error={formErrors.family_name} />
                            </div>

                            <Input theme={theme} label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={formErrors.email} />

                            {/* password + strength */}
                            <div className="flex flex-col gap-2">
                                <Input theme={theme} label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={formErrors.password} />
                                {form.password && (
                                    <div className="flex flex-col gap-1.5">
                                        <div className={`w-full h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(passwordScore)}`}
                                                style={{ width: `${(passwordScore + 1) * 20}%` }}
                                            />
                                        </div>
                                        <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${mutedText}`}>
                                            Sicurezza: {getStrengthText(passwordScore)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* confirm password */}
                            <div className="flex flex-col gap-1.5">
                                <label className={`text-[10px] font-mono uppercase tracking-[0.15em] ${mutedText}`}>
                                    Conferma password
                                </label>
                                <InputConfirm form={form} handleChange={handleChange} theme={theme} passwordsMatch={passwordsMatch} />
                            </div>

                            {/* company */}
                            <div className="grid grid-cols-2 gap-3">
                                <Input theme={theme} label="Nome azienda" name="company_name" value={form.company_name} onChange={handleChange} error={formErrors.company_name} />
                                <div className="flex flex-col gap-1.5">
                                    <label className={`text-[10px] font-mono uppercase tracking-[0.15em] ${mutedText}`}>
                                        Ruolo aziendale
                                    </label>
                                    <select name="company_role" value={form.company_role} onChange={handleChange} className={selectClass}>
                                        {companyRoles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* fiscal */}
                            <div className="grid grid-cols-2 gap-3">
                                <Input theme={theme} label="Codice fiscale" name="fiscal_code"  value={form.fiscal_code.toUpperCase()} onChange={handleChange} error={formErrors.fiscal_code} />
                                <Input theme={theme} label="Partita IVA"    name="partita_iva"  value={form.partita_iva}               onChange={handleChange} error={formErrors.partita_iva} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !passwordsMatch || passwordScore < 2}
                                className="mt-2 w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200
                                    shadow-lg shadow-amber-700/20 flex items-center justify-center"
                            >
                                {loading
                                    ? <FallingLines width="20" color="white" visible />
                                    : "Crea account"
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

                            <p className={`text-center text-xs mt-1 ${mutedText}`}>
                                Hai già un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className={`font-semibold transition
                                        ${isDark ? "text-amber-500 hover:text-amber-400" : "text-amber-700 hover:text-amber-600"}`}
                                >
                                    Accedi
                                </button>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
