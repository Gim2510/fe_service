type SetVipSectionProps = {
    selectedUserToUpdateToVip: string;
    allUsers: any[];
    setShowUpdateUserToVipModal: (showUpdateUserToVipModal: boolean) => void;
    setSelectedUserToUpdateToVip: (selectedUserToUpdateToVip: string) => void;
    success: boolean
}

export function SetVipSection({selectedUserToUpdateToVip, setSelectedUserToUpdateToVip, allUsers, setShowUpdateUserToVipModal, success}: SetVipSectionProps) {
    return (
        <>
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                <h2 className="text-2xl mb-6">Assegna status: VIP</h2>
                <div className='flex items-center gap-5'>
                    <select
                        value={selectedUserToUpdateToVip}
                        onChange={(e) => setSelectedUserToUpdateToVip(e.target.value)}
                        className=" border border-white/[0.1] rounded-2xl px-5 py-3 text-black backdrop-blur-xl
                                focus:outline-none focus:border-white/[0.2] transition w-full sm:w-96 bg-white">
                        <option value="">Seleziona utente</option>
                        {allUsers
                            .filter((u) => !u.vip)
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                    </select>

                    <button
                        disabled={!selectedUserToUpdateToVip}
                        onClick={() => setShowUpdateUserToVipModal(true)}
                        className=" relative cursor-pointer px-8 py-3 rounded-2xl bg-green-400 text-black font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-30 ">
                        Aggiorna
                    </button>

                    {success &&
                        <div className='bg-green-200/40 p-2 rounded-xl border-2 border-green-600'>
                            <p className='font-bold text-green-400'>Utente aggiornato con successo</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}