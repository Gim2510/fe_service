type Props = {
    selectedUserToUpdateToVip: string;
    allUsers: any[];
    setShowUpdateUserToVipModal: (show: boolean) => void;
    setSelectedUserToUpdateToVip: (v: string) => void;
    success: boolean;
    theme?: string;
};

export function SetVipSection({ selectedUserToUpdateToVip, setSelectedUserToUpdateToVip, allUsers, setShowUpdateUserToVipModal, success, theme }: Props) {
    const isDark = theme === "dark";
    const card = isDark ? "bg-[#0E0E0D]/80 border-stone-800/20" : "bg-white/80 border-slate-200";
    const selectClass = `w-full sm:w-80 h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none
        ${isDark ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700" : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-sky-600"}`;

    return (
        <div className={`rounded-2xl border p-7 ${card}`}>
            <h2 className={`text-base font-semibold mb-5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>Assegna status: VIP</h2>
            <div className="flex flex-wrap items-center gap-4">
                <select value={selectedUserToUpdateToVip} onChange={e => setSelectedUserToUpdateToVip(e.target.value)} className={selectClass}>
                    <option value="">Seleziona utente</option>
                    {allUsers.filter(u => !u.vip).map(user => (
                        <option key={user._id} value={user._id}>{user.email}</option>
                    ))}
                </select>
                <button
                    disabled={!selectedUserToUpdateToVip}
                    onClick={() => setShowUpdateUserToVipModal(true)}
                    className="h-11 px-5 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
                >
                    Aggiorna
                </button>
                {success && <span className="text-sm text-green-400">Utente aggiornato con successo</span>}
            </div>
        </div>
    );
}
