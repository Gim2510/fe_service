import { FallingLines } from "react-loader-spinner";

type Props = {
    onConfirm: () => Promise<void>;
    onClose: () => void;
    loading?: boolean;
    userEmail?: string;
};

export function PromoteUserModal({ onConfirm, onClose, loading = false, userEmail }: Props) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
            <div className="rounded-[32px] bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl p-10 w-[420px] shadow-[0_0_80px_rgba(255,255,255,0.05)]">

                <h3 className="text-2xl font-semibold mb-4">Confirm Promotion</h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                    Are you sure you want to promote {userEmail ? <strong>{userEmail}</strong> : "this user"} to <strong>Admin</strong>?
                    This action is immediate and cannot be undone.
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-2 cursor-pointer rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition disabled:opacity-40"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-6 py-2 cursor-pointer rounded-xl bg-white text-black font-medium hover:scale-105 transition disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        {loading ? <FallingLines color="#000" width="30" visible={true} ariaLabel="falling-circles-loading" /> : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}