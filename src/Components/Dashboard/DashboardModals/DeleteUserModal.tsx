import { FallingLines } from "react-loader-spinner";
import { Trash2 } from "lucide-react";

type Props = {
    setShowDeleteUserModal: (show: boolean) => void;
    handleConfirmDeleteUser: () => Promise<void>;
    loadingDeleteUser: boolean;
    theme: string;
};

export function DeleteUserModal({ setShowDeleteUserModal, handleConfirmDeleteUser, loadingDeleteUser, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#1C1C1A] border-stone-800/30" : "bg-[#F8FAFB] border-slate-200";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-5 ${card}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? "bg-red-500/15 border border-red-500/30" : "bg-red-50 border border-red-200"}`}>
                    <Trash2 size={18} className="text-red-400" />
                </div>
                <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Confirm Deletion</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        This action will delete the selected user. The change is immediate and irreversible.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowDeleteUserModal(false)}
                        disabled={loadingDeleteUser}
                        className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                            ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmDeleteUser}
                        disabled={loadingDeleteUser}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                    >
                        {loadingDeleteUser
                            ? <span className="flex justify-center"><FallingLines color="#fff" width="15" visible ariaLabel="loading" /></span>
                            : "Confirm"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
