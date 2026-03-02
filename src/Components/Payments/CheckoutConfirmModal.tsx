import { FallingLines } from "react-loader-spinner";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
    variant?: string // default = dark
};

export function CheckoutConfirmModal({open, onConfirm, onCancel, loading, variant}: Props) {
    if (!open) return null;

    const isDark = variant === "dark";

    const overlayClass = isDark
        ? "absolute inset-0 bg-black/70 backdrop-blur-md"
        : "absolute inset-0 bg-white/40 backdrop-blur-sm";

    const modalClass = isDark
        ? "relative z-10 w-full max-w-2xl p-12 rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] text-white space-y-8"
        : "relative z-10 w-full max-w-2xl p-12 rounded-3xl border border-neutral-300 bg-white/90 backdrop-blur-md shadow-lg text-black space-y-8";

    const cancelBtnClass = isDark
        ? "flex-1 px-6 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-neutral-300"
        : "flex-1 px-6 py-2 rounded-xl border border-neutral-400 bg-neutral-100 hover:bg-neutral-200 transition text-black/70";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">

            {/* Overlay */}
            <div
                onClick={loading ? undefined : onCancel}
                className={overlayClass}
            />

            {/* Modal */}
            <div className={modalClass}>
                <div className="space-y-4 text-center">
                    <h2 className={isDark ? "text-3xl font-semibold" : "text-3xl font-semibold text-black"}>
                        Conferma attivazione Premium
                    </h2>

                    <p className={isDark ? "text-neutral-400 text-sm leading-relaxed" : "text-neutral-700 text-sm leading-relaxed"}>
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
                        {loading ? <FallingLines color={isDark ? "#fff" : "#000"} width="40" visible /> : "Procedi al pagamento"}
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        onClick={onCancel}
                        disabled={loading}
                        className={cancelBtnClass}
                    >
                        Annulla
                    </LiquidGlassButton>
                </div>

                <p className={isDark ? "text-xs text-neutral-500 text-center" : "text-xs text-neutral-600 text-center"}>
                    Pagamento sicuro • Nessun vincolo annuale • Disattiva quando vuoi
                </p>
            </div>
        </div>
    );
}