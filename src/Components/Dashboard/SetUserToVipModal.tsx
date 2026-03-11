import { FallingLines } from "react-loader-spinner";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

type SetUserToVipModalProps = {
    setShowUpdateUserToVipModal: (show: boolean) => void;
    handleUpdateUserToVip: () => Promise<void>;
    loadingUpdateToVip: boolean;
    theme: string
};

export function SetUserToVipModal({setShowUpdateUserToVipModal, handleUpdateUserToVip, loadingUpdateToVip, theme}: SetUserToVipModalProps) {
    const isDark = theme === 'dark';
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center ${isDark ? 'bg-black/60' : 'bg-white/30'} backdrop-blur-md z-50`}>
            <div
                className={`rounded-[32px] bg-white/[0.05] border ${isDark ? 'border-white/[0.1] shadow-[0_0_80px_rgba(255,255,255,0.05)]' : 'border-black/[0.1] shadow-lg'} backdrop-blur-2xl p-10 w-[420px] `}>

                <h3 className="text-2xl font-semibold mb-4">Assign VIP Status</h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                    This action will upgrade the selected user to VIP. The change is immediate.
                </p>

                <div className="flex justify-end gap-4">
                    <LiquidGlassButton
                        onClick={() => setShowUpdateUserToVipModal(false)}
                        disabled={loadingUpdateToVip}
                        variant='navbar'
                    >
                        Cancel
                    </LiquidGlassButton>

                    <LiquidGlassButton
                        onClick={handleUpdateUserToVip}
                        disabled={loadingUpdateToVip}
                        variant='navbar'
                    >
                        {loadingUpdateToVip ? <FallingLines color="#000" width="30" visible={true}
                                                            ariaLabel="falling-circles-loading"/> : "Confirm"}
                    </LiquidGlassButton>
                </div>
            </div>
        </div>
    );
}