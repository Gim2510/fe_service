import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

export function Login() {
    const navigate = useNavigate()
    const { doLogin, loading, error } = useLogin()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await doLogin({ email, password })
            navigate("/")
        } catch (_) {}
    }

    return (
        <main className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white">

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />

            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

                {/* LEFT COPY */}
                <div className="hidden lg:flex flex-col gap-8">
          <span className="text-sm uppercase tracking-widest text-neutral-400">
            Bentornato
          </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Accedi al tuo
                        <br />
                        <span className="text-neutral-400">
              spazio di controllo.
            </span>
                    </h1>

                    <p className="text-lg text-neutral-300 max-w-lg">
                        Visualizza dati, analisi e strumenti progettati per
                        rendere il tuo business più chiaro, misurabile e scalabile.
                    </p>
                </div>

                {/* LOGIN CARD */}
                <div className="relative">
                    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="text-center mb-2">
                                <h2 className="text-2xl font-semibold">
                                    Accedi
                                </h2>
                                <p className="text-sm text-neutral-500 mt-1">
                                    Inserisci le tue credenziali
                                </p>
                            </div>

                            {error && (
                                <div className="text-sm px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                                    {error}
                                </div>
                            )}

                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative mt-4 px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all ${
                                    loading
                                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                        : "bg-white text-neutral-900 hover:scale-105 active:scale-95"
                                }`}
                            >
                <span className="relative z-10">
                  {loading ? "Accesso in corso…" : "Accedi"}
                </span>

                                {!loading && (
                                    <span className="absolute inset-0 bg-[#FF6B6B] translate-y-full group-hover:translate-y-0 transition-transform" />
                                )}
                            </button>

                            <div className="text-center text-sm text-neutral-500 mt-4">
                                Non hai un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="text-neutral-300 hover:text-white transition"
                                >
                                    Registrati
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </main>
    )
}

function Input({
                   label,
                   type,
                   value,
                   onChange,
               }: {
    label: string
    type: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
                className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition text-white placeholder-neutral-500"
            />
        </div>
    )
}
