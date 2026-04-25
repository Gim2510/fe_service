type Props = {
    selectedUserToDelete: string;
    setSelectedUserToDelete: (v: string) => void;
    allUsers: any[];
    setShowDeleteUserModal: (show: boolean) => void;
    success: boolean;
    theme?: string;
};

export function DeleteUserSection({ selectedUserToDelete, setSelectedUserToDelete, allUsers, setShowDeleteUserModal, success, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200";
    const selectClass = `w-full sm:w-80 h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none
        ${isDark ? "bg-[#060D1B] border-blue-900/30 text-slate-200 focus:border-blue-600" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"}`;

    return (
        <div className={`rounded-2xl border p-7 ${card}`}>
            <h2 className={`text-base font-semibold mb-5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>Elimina utente</h2>
            <div className="flex flex-wrap items-center gap-4">
                <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className={selectClass}>
                    <option value="">Seleziona utente</option>
                    {allUsers.filter(u => u.role !== "ADMIN").map(user => (
                        <option key={user._id} value={user._id}>{user.email}</option>
                    ))}
                </select>
                <button
                    disabled={!selectedUserToDelete}
                    onClick={() => setShowDeleteUserModal(true)}
                    className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                >
                    Elimina
                </button>
                {success && <span className="text-sm text-green-400">Utente eliminato con successo</span>}
            </div>
        </div>
    );
}
