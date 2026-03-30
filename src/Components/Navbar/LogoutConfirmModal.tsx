import {LiquidGlassButton} from "../Buttons/LiquidGlassButton";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    theme: string
};

export function LogoutConfirmModal({open, onConfirm, onCancel, theme}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen">

            {/* Overlay */}
            <div
                onClick={onCancel}
                className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/80' : 'bg-white/50'} backdrop-blur-xl`}
            />

            {/* Modal */}
            <div
                className={`relative z-10 w-full max-w-md -translate-x-3/4 p-10 rounded-3xl border ${theme === 'dark' ? 'bg-neutral-900/80 shadow-[0_20px_80px_rgba(0,0,0,0.6)] text-white border-white/10' : 'bg-white shadow-lg text-black border-black/10'}  backdrop-blur-2xl space-y-8`}>

                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-semibold">
                        Confermare il logout?
                    </h2>

                    <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-black'} text-sm leading-relaxed`}>
                        Verrai disconnesso dalla piattaforma e dovrai
                        effettuare nuovamente l’accesso per continuare.
                    </p>
                </div>

                <div className="flex gap-4 justify-around">
                    <LiquidGlassButton
                        onClick={onCancel}
                        variant='navbar'
                    >
                        Annulla
                    </LiquidGlassButton>
                    <LiquidGlassButton
                        onClick={onConfirm}
                        className=""
                        variant='navbar'
                    >
                        Conferma
                    </LiquidGlassButton>
                </div>
            </div>
        </div>
    );
}