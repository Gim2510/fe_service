import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        given_name: "",
        family_name: "",
        email: "",
        password: "",
        fiscal_code: "",
        partita_iva: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <main className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white pb-10">

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />

            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]"
            />

            <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

                {/* LEFT COPY */}
                <div className="flex flex-col gap-8">

          <span className="text-sm uppercase tracking-widest text-neutral-400">
            Accesso piattaforma
          </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Inizia a costruire
                        <br />
                        <span className="text-neutral-400">
              un sistema sotto controllo.
            </span>
                    </h1>

                    <p className="text-lg text-neutral-300 max-w-lg">
                        Registrati per accedere agli strumenti di analisi e
                        iniziare a trasformare i tuoi dati in decisioni misurabili.
                    </p>

                    <div className="text-sm text-neutral-500">
                        Nessun abbonamento automatico • Attivazione immediata
                    </div>
                </div>

                {/* FORM CARD */}
                <div className="relative">
                    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Name Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input
                                    label="Nome"
                                    name="given_name"
                                    value={form.given_name}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Cognome"
                                    name="family_name"
                                    value={form.family_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <Input
                                label="Codice Fiscale"
                                name="fiscal_code"
                                value={form.fiscal_code}
                                onChange={handleChange}
                            />

                            <Input
                                label="Partita IVA"
                                name="partita_iva"
                                value={form.partita_iva}
                                onChange={handleChange}
                            />

                            {/* CTA */}
                            <button
                                type="submit"
                                className="group relative mt-4 px-8 py-4 rounded-full bg-white text-neutral-900 font-medium text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                            >
                <span className="relative z-10">
                  Crea account
                </span>
                                <span className="absolute inset-0 bg-[#FF6B6B] translate-y-full group-hover:translate-y-0 transition-transform" />
                            </button>

                            <div className="text-center text-sm text-neutral-500 mt-4">
                                Hai già un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-neutral-300 hover:text-white transition"
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


/* Reusable Input component */
function Input({
                   label,
                   name,
                   type = "text",
                   value,
                   onChange,
               }: {
    label: string
    name: string
    type?: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition text-white placeholder-neutral-500"
            />
        </div>
    )
}
