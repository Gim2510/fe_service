import { Mail, Phone, MapPin } from "lucide-react"
import {LiquidGlassButton} from "../Components/Buttons/LiquidGlassButton.tsx";

export function ContactPage() {
    return (
        <main className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800" />

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

                {/* LEFT COPY */}
                <div className="flex flex-col gap-8">
          <span className="text-sm uppercase tracking-widest text-neutral-400">
            Contatti
          </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Parliamo del tuo
                        <br />
                        <span className="text-neutral-400">
              prossimo passo digitale.
            </span>
                    </h1>

                    <p className="text-lg text-neutral-300 max-w-lg">
                        Se hai domande, vuoi approfondire una soluzione o
                        capire come possiamo aiutarti, scrivici.
                        Ti risponderemo il prima possibile.
                    </p>

                    <div className="text-sm text-neutral-500">
                        Risposta media: entro 24 ore
                    </div>
                </div>

                {/* CONTACT CARD */}
                <div>
                    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl flex flex-col gap-8">

                        <h2 className="text-2xl font-semibold mb-2">
                            I nostri riferimenti
                        </h2>

                        <ContactItem
                            icon={<Mail size={20} />}
                            label="Email"
                            value="support@myapp.com"
                            href="mailto:support@myapp.com"
                        />

                        <ContactItem
                            icon={<Phone size={20} />}
                            label="Telefono"
                            value="+39 012 345 6789"
                        />

                        <ContactItem
                            icon={<MapPin size={20} />}
                            label="Sede"
                            value="Via Roma 123, Milano, Italy"
                        />

                        {/* CTA */}
                        <LiquidGlassButton onClick={() => window.location.href = "mailto:support@myapp.com"}>
                            Scrivici ora
                        </LiquidGlassButton>

                    </div>
                </div>

            </div>
        </main>
    )
}

function ContactItem({
                         icon,
                         label,
                         value,
                         href,
                     }: {
    icon: React.ReactNode
    label: string
    value: string
    href?: string
}) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 hover:border-neutral-500 transition">

            <div className="text-neutral-400 mt-1">
                {icon}
            </div>

            <div className="flex flex-col">
                <span className="text-sm text-neutral-400">{label}</span>

                {href ? (
                    <a
                        href={href}
                        className="text-white hover:text-neutral-300 transition"
                    >
                        {value}
                    </a>
                ) : (
                    <span className="text-white">{value}</span>
                )}
            </div>
        </div>
    )
}
