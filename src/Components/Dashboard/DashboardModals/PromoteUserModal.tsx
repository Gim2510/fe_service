import { FallingLines } from "react-loader-spinner";
import {LiquidGlassButton} from "../../Buttons/LiquidGlassButton.tsx";

type Props = {
    onConfirm: () => Promise<void>;
    onClose: () => void;
    loading?: boolean;
    userEmail?: string;
    theme: string
};

export function PromoteUserModal({ onConfirm, onClose, loading = false, userEmail, theme }: Props) {
    const isDark = theme === 'dark';
    return (
        <div className={`fixed inset-0 flex items-center justify-center ${ isDark ? 'bg-black/60' : 'bg-white/30'} backdrop-blur-md z-50`}>
            <div className={`rounded-[32px] bg-white/[0.05] border ${ isDark ? 'border-white/[0.1] shadow-[0_0_80px_rgba(255,255,255,0.05)]' : 'border-black/[0.1] shadow-lg'} backdrop-blur-2xl p-10 w-[420px] `}>

                <h3 className="text-2xl font-semibold mb-4">Confirm Promotion</h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                    Are you sure you want to promote {userEmail ? <strong>{userEmail}</strong> : "this user"} to <strong>Admin</strong>?
                    This action is immediate and cannot be undone.
                </p>

                <div className="flex justify-end gap-4">
                    <LiquidGlassButton
                        onClick={onClose}
                        disabled={loading}
                        variant='navbar'
                    >
                        Cancel
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        onClick={onConfirm}
                        disabled={loading}
                        variant='navbar'
                    >
                        {loading ? <FallingLines color={isDark ? "#fff" : "#000"} width="15" visible={true} ariaLabel="falling-circles-loading" /> : "Confirm"}
                    </LiquidGlassButton>
                </div>
            </div>
        </div>
    );
}