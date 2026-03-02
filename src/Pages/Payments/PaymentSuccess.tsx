import { useNavigate } from "react-router-dom";
import {LiquidGlassButton} from "../../Components/Buttons/LiquidGlassButton.tsx";
import {usePremium} from "../../Context/PremiumContext.tsx";
import {useEffect} from "react";

export function PaymentSuccess() {
    const navigate = useNavigate();
    const { refreshPremium } = usePremium();

    useEffect(() => {
        refreshPremium();
    }, []);

    const handleGoToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center rounded-2xl overflow-hidden py-32">

            {/* Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[80px] pointer-events-none" />
            <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-400/20 via-green-400/20 to-cyan-500/20 blur-3xl opacity-30" />
            <div className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-3xl opacity-30" />

            {/* Content */}
            <section className="relative z-10 max-w-3xl text-center px-8 sm:px-16 sm:py-16 py-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl space-y-10">

                {/* Success Icon */}
                <div className="mx-auto text-white w-24 h-24 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg ring-2 ring-emerald-400/40 text-6xl font-bold animate-pulse">
                    ✓
                </div>

                <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                    Benvenuto in Premium
                </h2>

                <div className="space-y-4 text-neutral-300">
                    <p>
                        Il pagamento è stato completato con successo.
                    </p>
                    <p>
                        Ora hai accesso a tutte le funzionalità premium della piattaforma.
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <LiquidGlassButton
                        onClick={handleGoToDashboard}
                    >
                        Vai alla Dashboard
                    </LiquidGlassButton>
                </div>

                <p className="text-sm text-neutral-400 pt-4">
                    Riceverai una email di conferma con i dettagli dell’abbonamento.
                </p>
            </section>
        </main>
    );
}