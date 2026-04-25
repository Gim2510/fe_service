import { FallingLines } from "react-loader-spinner";
import { Briefcase } from "lucide-react";

type Props = {
    setShowModal: (v: boolean) => void;
    handleConfirm: () => void;
    loading: boolean;
    theme: string;
};

export function CreateJobConfirmModal({ setShowModal, handleConfirm, loading, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#0D1A30] border-blue-900/30" : "bg-white border-slate-200";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-5 ${card}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-600/15 border border-blue-600/20" : "bg-blue-50 border border-blue-200"}`}>
                    <Briefcase size={18} className="text-blue-500" />
                </div>
                <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Confirm Job Creation</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        This will publish the new job position in the system. Please confirm you want to continue.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowModal(false)}
                        disabled={loading}
                        className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                            ${isDark ? "border-blue-900/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                    >
                        {loading
                            ? <span className="flex justify-center"><FallingLines color="#fff" width="15" visible ariaLabel="loading" /></span>
                            : "Confirm"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
