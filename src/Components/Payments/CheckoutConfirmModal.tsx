import { FallingLines } from "react-loader-spinner";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
};

export function CheckoutConfirmModal({open, onConfirm, onCancel, loading,}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">

            {/* Overlay */}
            <div
                onClick={loading ? undefined : onCancel}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl p-12 rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] text-white space-y-8">

                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-semibold">
                        Conferma attivazione Premium
                    </h2>

                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Verrai reindirizzato alla pagina di pagamento sicura
                        gestita da Stripe per completare l’abbonamento mensile
                        da 15€.
                    </p>
                </div>

                <div className="flex gap-4">
                    <LiquidGlassButton
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? (
                            <FallingLines color="#fff" width="40" visible />
                        ) : (
                            "Procedi al pagamento"
                        )}
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 px-6 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-neutral-300"
                    >
                        Annulla
                    </LiquidGlassButton>
                </div>

                <p className="text-xs text-neutral-500 text-center">
                    Pagamento sicuro • Nessun vincolo annuale • Disattiva quando vuoi
                </p>
            </div>
        </div>
    );
}