import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { Shield, Trash2, Crown, Send } from "lucide-react";

type Props = {
    allUsers: UserType[];
    selectedUserId: string;
    setSelectedUserId: (v: string) => void;
    setShowPromoteModal: (v: boolean) => void;
    selectedUserToDelete: string;
    setSelectedUserToDelete: (v: string) => void;
    setShowDeleteModal: (v: boolean) => void;
    deleteSuccess: boolean;
    selectedUserToVip: string;
    setSelectedUserToVip: (v: string) => void;
    setShowVipModal: (v: boolean) => void;
    vipSuccess: boolean;
    BulkEmailComponent: React.ReactNode;
    theme: string;
};

export function AdminActionsSection({
    allUsers,
    selectedUserId,
    setSelectedUserId,
    setShowPromoteModal,
    selectedUserToDelete,
    setSelectedUserToDelete,
    setShowDeleteModal,
    deleteSuccess,
    selectedUserToVip,
    setSelectedUserToVip,
    setShowVipModal,
    vipSuccess,
    BulkEmailComponent,
    theme,
}: Props) {
    const isDark = theme === "dark";

    const selectClass = `w-full h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none transition-colors
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700"
            : "bg-white border-slate-200 text-slate-900 focus:border-sky-600"
        }`;

    return (
        <div className="space-y-3">
            <div className={`text-[11px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Admin Control Center</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                    disabled={!selectedUserId}
                    onClick={() => setShowPromoteModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserId
                            ? (isDark ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]" : "bg-cyan-50 border-cyan-400 text-cyan-800")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        } ${selectedUserId && isDark ? "" : ""}`}>
                    <Shield size={16} />
                    Promote to Admin
                    {selectedUserId && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />}
                </button>

                <button
                    disabled={!selectedUserToDelete}
                    onClick={() => setShowDeleteModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserToDelete
                            ? (isDark ? "bg-red-500/15 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]" : "bg-red-50 border-red-400 text-red-700")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Trash2 size={16} />
                    Delete User
                    {selectedUserToDelete && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />}
                </button>

                <button
                    disabled={!selectedUserToVip}
                    onClick={() => setShowVipModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserToVip
                            ? (isDark ? "bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]" : "bg-amber-50 border-amber-400 text-amber-700")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Crown size={16} />
                    Assign VIP
                    {selectedUserToVip && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />}
                </button>

                <div className={`relative inline-flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${isDark ? "border-stone-800/30 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                    <Send size={16} />
                    Notifiche
                    {BulkEmailComponent}
                </div>
            </div>

            {/* Select dropdowns row */}
            <div className="flex flex-wrap gap-3 mt-3">
                <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className={selectClass + " flex-1 min-w-[200px]"}>
                    <option value="">Select user to promote</option>
                    {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
                <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className={selectClass + " flex-1 min-w-[200px]"}>
                    <option value="">Select user to delete</option>
                    {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
                <select value={selectedUserToVip} onChange={e => setSelectedUserToVip(e.target.value)} className={selectClass + " flex-1 min-w-[200px]"}>
                    <option value="">Select user for VIP</option>
                    {allUsers.filter(u => !u.vip).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
            </div>
            {deleteSuccess && <p className="text-emerald-400 text-xs mt-1">User deleted successfully</p>}
            {vipSuccess && <p className="text-emerald-400 text-xs mt-1">User upgraded successfully</p>}
        </div>
    );
}
