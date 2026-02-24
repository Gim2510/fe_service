type SetUserToVipModalProps = {
    setShowUpdateUserToVipModal: (showUpdateUserToVipModal: boolean) => void,
    handleUpdateUserToVip: () => void,
    loadingUpdateToVip: boolean
}

export function SetUserToVipModal({ setShowUpdateUserToVipModal, handleUpdateUserToVip, loadingUpdateToVip}: SetUserToVipModalProps) {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">

                <div
                    className=" rounded-[32px] bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl p-10 w-[420px] shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                    <h3 className="text-2xl font-semibold mb-4">
                        Confirm Deletion
                    </h3>

                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        This action will delete the selected user.
                        The change is immediate and irreversible.
                    </p>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setShowUpdateUserToVipModal(false)}
                            className="px-6 py-2 cursor-pointer rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpdateUserToVip}
                            disabled={loadingUpdateToVip}
                            className=" px-6 py-2 cursor-pointer rounded-xl bg-white text-black font-medium hover:scale-105 transition disabled:opacity-40">
                            {loadingUpdateToVip ? "Updating..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}