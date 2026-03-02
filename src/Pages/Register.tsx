import {type ChangeEvent, type ChangeEventHandler, type FormEvent, useEffect, useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../hooks/useRegister"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx"
import { CompanyRoles } from "../types/CompanyRoles.ts"
import { FallingLines } from "react-loader-spinner"
import { useTheme } from "../Context/ThemeContext.tsx"

export function Register() {
    const { theme } = useTheme()
    const navigate = useNavigate()
    const { register, loading, error, success } = useRegister()

    const successRef = useRef<HTMLDivElement | null>(null)

    const companyRoles: CompanyRoles[] = [
        CompanyRoles.Founder,
        CompanyRoles.CEO,
        CompanyRoles.Employee,
        CompanyRoles.CTO,
        CompanyRoles.Manager,
    ]

    const [form, setForm] = useState({
        given_name: "",
        family_name: "",
        email: "",
        password: "",
        fiscal_code: "",
        partita_iva: "",
        company_name: "",
        company_role: CompanyRoles.Employee,
    })

    useEffect(() => {
        if (success && successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [success])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await register(form)
            setTimeout(() => navigate("/login"), 5000)
        } catch (_) {}
    }

    return (
        <main className="relative min-h-screen flex items-center overflow-hidden">

            {/* Background */}
            <div
                className={`absolute inset-0 ${
                    theme === "dark"
                        ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800"
                        : "bg-white"
                }`}
            />

            {/* Grid texture */}
            <div
                className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                    theme === "dark"
                        ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                        : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                }`}
            />

            <div
                className={`relative z-10 mx-auto w-full max-w-6xl px-8 py-24 grid lg:grid-cols-2 gap-20 items-center ${
                    theme === "dark" ? "text-white" : "text-black"
                }`}
            >

                {/* LEFT COPY */}
                <div className="flex flex-col gap-8">
                    <span
                        className={`text-sm uppercase tracking-widest ${
                            theme === "dark" ? "text-neutral-400" : "text-black"
                        }`}
                    >
                        Accesso piattaforma
                    </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Inizia a costruire
                        <br />
                        <span
                            className={theme === "dark" ? "text-neutral-400" : "text-black"}
                        >
                            un sistema sotto controllo.
                        </span>
                    </h1>

                    <p
                        className={`text-lg max-w-lg ${
                            theme === "dark" ? "text-neutral-300" : "text-black"
                        }`}
                    >
                        Registrati per accedere agli strumenti di analisi e trasformare
                        i tuoi dati in decisioni misurabili.
                    </p>

                    <div
                        className={`text-sm ${
                            theme === "dark" ? "text-neutral-500" : "text-black"
                        }`}
                    >
                        Nessun abbonamento automatico • Attivazione immediata
                    </div>
                </div>

                {/* FORM CARD */}
                <div>
                    <div
                        className={`rounded-3xl backdrop-blur-xl p-10 shadow-2xl ${
                            theme === "dark"
                                ? "bg-neutral-900/70 border border-neutral-800"
                                : "bg-white/40 shadow-3xl"
                        }`}
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="text-center mb-2">
                                <h2 className="text-2xl font-semibold">Crea account</h2>
                                <p className="text-sm text-neutral-500 mt-1">
                                    Inserisci i tuoi dati
                                </p>
                            </div>

                            {error && (
                                <div className="text-sm px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div
                                    ref={successRef}
                                    className="text-sm px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
                                >
                                    {success}
                                    <p className="mt-2 text-neutral-300">
                                        Controlla la tua email per verificare l’account.
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input theme={theme} label="Nome" name="given_name" value={form.given_name} onChange={handleChange} />
                                <Input theme={theme} label="Cognome" name="family_name" value={form.family_name} onChange={handleChange} />
                            </div>

                            <Input theme={theme} label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                            <Input theme={theme} label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
                            <Input theme={theme} label="Company name" name="company_name" value={form.company_name} onChange={handleChange} />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-neutral-400">Company role</label>
                                <select
                                    name="company_role"
                                    value={form.company_role}
                                    onChange={handleChange}
                                    className={`px-4 py-3 rounded-xl border outline-none transition ${
                                        theme === "dark"
                                            ? "bg-neutral-800 border-neutral-700 text-white focus:border-white focus:ring-white"
                                            : "bg-white border-neutral-300 text-black focus:border-black focus:ring-black"
                                    } focus:ring-1`}
                                >
                                    {companyRoles.map(role => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input theme={theme} label="Codice fiscale" name="fiscal_code" value={form.fiscal_code.toUpperCase()} onChange={handleChange} />
                            <Input theme={theme} label="Partita IVA" name="partita_iva" value={form.partita_iva} onChange={handleChange} />

                            <LiquidGlassButton type="submit" disabled={loading}>
                                {loading ? (
                                    <FallingLines width="30" color="#fff" visible />
                                ) : (
                                    "Crea account"
                                )}
                            </LiquidGlassButton>

                            <div className="text-center text-sm text-neutral-500 mt-4">
                                Hai già un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className={`transition cursor-pointer ${
                                        theme === "dark"
                                            ? "text-neutral-300 hover:text-white"
                                            : "text-black hover:text-neutral-400"
                                    }`}
                                >
                                    Accedi
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </main>
    )
}

/* Input */
function Input({label, name, type = "text", value, onChange, theme,}: { label: string, name: string, type?: string, value: string, onChange: ChangeEventHandler<HTMLInputElement>, theme: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                className={`px-4 py-3 rounded-xl border outline-none transition ${
                    theme === "dark"
                        ? "bg-neutral-800 border-neutral-700 text-white focus:border-white focus:ring-white"
                        : "bg-white border-neutral-300 text-black focus:border-black focus:ring-black"
                } focus:ring-1`}
            />
        </div>
    )
}