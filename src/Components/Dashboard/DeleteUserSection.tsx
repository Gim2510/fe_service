type DeleteUserSectionProps = {
    selectedUserToDelete: string,
    setSelectedUserToDelete: (selectedUserToDelete: string) => void,
    allUsers: any[],
    setShowDeleteUserModal: (showDeleteUserModal: boolean) => void,
    success: boolean
}

export function DeleteUserSection({selectedUserToDelete, setSelectedUserToDelete, allUsers, setShowDeleteUserModal, success}: DeleteUserSectionProps) {
    return (
        <>
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                <h2 className="text-2xl mb-6">Elimina utente</h2>
                <div className='flex items-center gap-5'>
                    <select
                        value={selectedUserToDelete}
                        onChange={(e) => setSelectedUserToDelete(e.target.value)}
                        className=" border border-white/[0.1] rounded-lg px-5 py-3 text-black backdrop-blur-xl
                                focus:outline-none focus:border-white/[0.2] transition w-full sm:w-96 bg-white">
                        <option value="">Seleziona utente</option>
                        {allUsers
                            .filter((u) => u.role !== "ADMIN")
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                    </select>

                    <button
                        disabled={!selectedUserToDelete}
                        onClick={() => setShowDeleteUserModal(true)}
                        className="w-40 h-12 flex items-center justify-center cursor-pointer rounded-lg bg-red-400 text-black font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-30">                        Elimina
                    </button>

                    {success &&
                        <div className='bg-green-200/40 p-2 rounded-xl border-2 border-green-600'>
                            <p className='font-bold text-green-400'>Utente eliminato con successo</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}