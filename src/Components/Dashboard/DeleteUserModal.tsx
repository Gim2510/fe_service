import { FallingLines } from "react-loader-spinner";

type DeleteUserModalProps = {
    setShowDeleteUserModal: (show: boolean) => void;
    handleConfirmDeleteUser: () => Promise<void>;
    loadingDeleteUser: boolean;
};

export function DeleteUserModal({
                                    setShowDeleteUserModal,
                                    handleConfirmDeleteUser,
                                    loadingDeleteUser,
                                }: DeleteUserModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
            <div className="rounded-[32px] bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl p-10 w-[420px] shadow-[0_0_80px_rgba(255,255,255,0.05)]">

                <h3 className="text-2xl font-semibold mb-4">Confirm Deletion</h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                    This action will delete the selected user. The change is immediate and irreversible.
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setShowDeleteUserModal(false)}
                        disabled={loadingDeleteUser}
                        className="px-6 py-2 cursor-pointer rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition disabled:opacity-40"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirmDeleteUser}
                        disabled={loadingDeleteUser}
                        className="px-6 py-2 cursor-pointer rounded-xl bg-white text-black font-medium hover:scale-105 transition disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        {loadingDeleteUser ? <FallingLines color="#000" width="30" visible={true} ariaLabel="falling-circles-loading" />: "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}