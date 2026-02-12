import { Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="relative bg-neutral-950 text-neutral-400 border-t border-neutral-800">

            {/* Subtle grid texture */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

            <div className="relative mx-auto max-w-7xl px-8 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white text-lg font-semibold">
                        MyApp
                    </h3>

                    <p className="text-sm leading-relaxed">
                        Soluzioni digitali progettate per trasformare
                        dati, processi e decisioni in vantaggio competitivo.
                    </p>

                    <div className="text-sm text-neutral-500 mt-2">
                        © {new Date().getFullYear()} MyApp
                        <br />
                        Tutti i diritti riservati.
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-medium">Navigazione</h4>

                    <Link to="/" className="hover:text-white transition">
                        Home
                    </Link>

                    <Link to="/survey/start" className="hover:text-white transition">
                        Analisi
                    </Link>

                    <Link to="/register" className="hover:text-white transition">
                        Registrati
                    </Link>

                    <Link to="/login" className="hover:text-white transition">
                        Accedi
                    </Link>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-medium">Legale</h4>

                    <Link to="/privacy" className="hover:text-white transition">
                        Privacy Policy
                    </Link>

                    <Link to="/terms" className="hover:text-white transition">
                        Termini di servizio
                    </Link>

                    <Link to="/cookies" className="hover:text-white transition">
                        Cookie Policy
                    </Link>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-medium">Contatti</h4>

                    <div className="flex items-center gap-3">
                        <Mail size={16} />
                        <a
                            href="mailto:support@myapp.com"
                            className="hover:text-white transition"
                        >
                            support@myapp.com
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone size={16} />
                        <span>+39 012 345 6789</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin size={16} />
                        <span>Milano, Italia</span>
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-600">
                P.IVA 00000000000 • Capitale sociale € 10.000 i.v.
            </div>
        </footer>
    )
}
