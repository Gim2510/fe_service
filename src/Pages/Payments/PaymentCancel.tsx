import {useNavigate} from "react-router-dom";
import {LiquidGlassButton} from "../../Components/Buttons/LiquidGlassButton.tsx";

export function PaymentCancel() {
    const navigate = useNavigate();

    return (
        <main
            className="relative min-h-screen bg-neutral-950 flex items-center justify-center rounded-2xl overflow-hidden py-32">

            {/* Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[80px] pointer-events-none"/>
            <div
                className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-400/20 via-orange-400/20 to-pink-500/20 blur-3xl opacity-30"/>
            <div
                className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-400/20 via-rose-400/20 to-red-400/20 blur-3xl opacity-30"/>

            {/* Content */}
            <section
                className="relative z-10 max-w-3xl text-center px-8 sm:py-16 py-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl space-y-10">

                {/* Cancel Icon */}
                <div
                    className="mx-auto text-white w-24 h-24 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg ring-2 ring-red-400/40 text-6xl font-bold">
                    ✕
                </div>

                <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                    Pagamento annullato
                </h2>

                <div className="space-y-4 text-neutral-300">
                    <p>
                        Il pagamento non è stato completato.
                    </p>
                    <p>
                        Nessun importo è stato addebitato.
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <LiquidGlassButton
                        onClick={() => navigate("/")}
                        color_text="white"
                    >
                        Torna alla Home
                    </LiquidGlassButton>
                </div>
            </section>
        </main>
    );
}