import {LiquidGlassButton} from "../Buttons/LiquidGlassButton";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function LogoutConfirmModal({open, onConfirm, onCancel}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">

            {/* Overlay */}
            <div
                onClick={onCancel}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-md p-10 rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] text-white space-y-8">

                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-semibold">
                        Confermare il logout?
                    </h2>

                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Verrai disconnesso dalla piattaforma e dovrai
                        effettuare nuovamente l’accesso per continuare.
                    </p>
                </div>

                <div className="flex gap-4">
                    <LiquidGlassButton
                        onClick={onConfirm}
                        className="flex-1"
                    >
                        Conferma
                    </LiquidGlassButton>

                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-neutral-300"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
}