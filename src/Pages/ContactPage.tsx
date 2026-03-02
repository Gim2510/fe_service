import { Mail, Phone, MapPin } from "lucide-react"
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx"
import { useTheme } from "../Context/ThemeContext.tsx"
import type {ReactNode} from "react";

export function ContactPage() {
    const { theme } = useTheme()

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
                        Contatti
                    </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Parliamo del tuo
                        <br />
                        <span
                            className={theme === "dark" ? "text-neutral-400" : "text-black"}
                        >
                            prossimo passo digitale.
                        </span>
                    </h1>

                    <p
                        className={`text-lg max-w-lg ${
                            theme === "dark" ? "text-neutral-300" : "text-black"
                        }`}
                    >
                        Se hai domande, vuoi approfondire una soluzione o capire
                        come possiamo aiutarti, scrivici.
                        Ti risponderemo il prima possibile.
                    </p>

                    <div
                        className={`text-sm ${
                            theme === "dark" ? "text-neutral-500" : "text-black"
                        }`}
                    >
                        Risposta media: entro 24 ore
                    </div>
                </div>

                {/* CONTACT CARD */}
                <div>
                    <div
                        className={`rounded-3xl backdrop-blur-xl p-10 shadow-2xl flex flex-col gap-8 ${
                            theme === "dark"
                                ? "bg-neutral-900/70 border border-neutral-800"
                                : "bg-white/40 shadow-3xl"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            I nostri riferimenti
                        </h2>

                        <ContactItem
                            theme={theme}
                            icon={<Mail size={20} />}
                            label="Email"
                            value="support@myapp.com"
                            href="mailto:support@myapp.com"
                        />

                        <ContactItem
                            theme={theme}
                            icon={<Phone size={20} />}
                            label="Telefono"
                            value="+39 012 345 6789"
                        />

                        <ContactItem
                            theme={theme}
                            icon={<MapPin size={20} />}
                            label="Sede"
                            value="Via Roma 123, Milano, Italy"
                        />

                        <LiquidGlassButton
                            onClick={() =>
                                (window.location.href = "mailto:support@myapp.com")
                            }
                        >
                            Scrivici ora
                        </LiquidGlassButton>
                    </div>
                </div>

            </div>
        </main>
    )
}

function ContactItem({icon, label, value, href, theme,}: { icon: ReactNode, label: string, value: string, href?: string, theme: string }) {
    return (
        <div
            className={`flex items-start gap-4 p-4 rounded-xl border transition ${
                theme === "dark"
                    ? "bg-neutral-800/60 border-neutral-700 hover:border-neutral-500"
                    : "bg-white/60 border-neutral-300 hover:border-neutral-400"
            }`}
        >
            <div
                className={`mt-1 ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
            >
                {icon}
            </div>

            <div className="flex flex-col">
                <span
                    className={`text-sm ${
                        theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                    }`}
                >
                    {label}
                </span>

                {href ? (
                    <a
                        href={href}
                        className={`transition ${
                            theme === "dark"
                                ? "text-white hover:text-neutral-300"
                                : "text-black hover:text-neutral-500"
                        }`}
                    >
                        {value}
                    </a>
                ) : (
                    <span
                        className={theme === "dark" ? "text-white" : "text-black"}
                    >
                        {value}
                    </span>
                )}
            </div>
        </div>
    )
}