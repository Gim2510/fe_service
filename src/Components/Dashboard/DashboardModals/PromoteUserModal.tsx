import { FallingLines } from "react-loader-spinner";
import { ShieldCheck } from "lucide-react";

type Props = {
    onConfirm: () => Promise<void>;
    onClose: () => void;
    loading?: boolean;
    userEmail?: string;
    theme: string;
};

export function PromoteUserModal({ onConfirm, onClose, loading = false, userEmail, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#0D1A30] border-blue-900/30" : "bg-white border-slate-200";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-5 ${card}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-600/15 border border-blue-600/20" : "bg-blue-50 border border-blue-200"}`}>
                    <ShieldCheck size={18} className="text-blue-500" />
                </div>
                <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Confirm Promotion</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Are you sure you want to promote{" "}
                        {userEmail ? <strong className={isDark ? "text-slate-200" : "text-slate-800"}>{userEmail}</strong> : "this user"}{" "}
                        to <strong className={isDark ? "text-slate-200" : "text-slate-800"}>Admin</strong>? This action is immediate and cannot be undone.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                            ${isDark ? "border-blue-900/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
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
