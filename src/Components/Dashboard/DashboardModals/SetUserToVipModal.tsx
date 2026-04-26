import { FallingLines } from "react-loader-spinner";
import { Star } from "lucide-react";

type Props = {
    setShowUpdateUserToVipModal: (show: boolean) => void;
    handleUpdateUserToVip: () => Promise<void>;
    loadingUpdateToVip: boolean;
    theme: string;
};

export function SetUserToVipModal({ setShowUpdateUserToVipModal, handleUpdateUserToVip, loadingUpdateToVip, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#1C1C1A] border-stone-800/30" : "bg-[#F8FAFB] border-slate-200";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-5 ${card}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? "bg-amber-500/15 border border-amber-500/30" : "bg-amber-50 border border-amber-200"}`}>
                    <Star size={18} className="text-amber-400" />
                </div>
                <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Assign VIP Status</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        This action will upgrade the selected user to VIP. The change is immediate.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowUpdateUserToVipModal(false)}
                        disabled={loadingUpdateToVip}
                        className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                            ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateUserToVip}
                        disabled={loadingUpdateToVip}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                    >
                        {loadingUpdateToVip
                            ? <span className="flex justify-center"><FallingLines color="#fff" width="15" visible ariaLabel="loading" /></span>
                            : "Confirm"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
