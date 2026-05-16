import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { ActionCard } from "./ActionCard";
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
    const textSub = isDark ? "text-slate-500" : "text-slate-400";

    const selectClass = `w-full h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none transition-colors
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700"
            : "bg-white border-slate-200 text-slate-900 focus:border-sky-600"
        }`;

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                    <h2 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Admin Control Center
                    </h2>
                    <p className={`text-xs mt-0.5 ${textSub}`}>
                        System privileges &amp; user management
                    </p>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${textSub}`}>
                    Core Actions
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ActionCard title="Promote to Admin" theme={theme} index={0} glow="sky">
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} className={isDark ? "text-sky-400" : "text-sky-600"} />
                        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Select user to promote</span>
                    </div>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserId}
                        onClick={() => setShowPromoteModal(true)}
                        className={`group relative h-9 px-4 rounded-lg text-xs font-semibold transition-all duration-300 overflow-hidden
                            ${isDark
                                ? "bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 hover:from-sky-600 hover:via-sky-500 hover:to-sky-600 text-white shadow-md shadow-sky-500/20 hover:shadow-sky-500/30"
                                : "bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white shadow-sm hover:shadow-md"
                            } disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                            Promote
                            <Shield size={12} />
                        </span>
                    </button>
                </ActionCard>

                <ActionCard title="Delete User" theme={theme} index={1} glow="red">
                    <div className="flex items-center gap-2 mb-1">
                        <Trash2 size={14} className={isDark ? "text-red-400" : "text-red-600"} />
                        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Select user to delete</span>
                    </div>
                    <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserToDelete}
                        onClick={() => setShowDeleteModal(true)}
                        className={`group relative h-9 px-4 rounded-lg text-xs font-semibold transition-all duration-300 overflow-hidden
                            ${isDark
                                ? "bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-white shadow-md shadow-red-500/20 hover:shadow-red-500/30"
                                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-sm hover:shadow-md"
                            } disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                            Delete
                            <Trash2 size={12} />
                        </span>
                    </button>
                    {deleteSuccess && <p className="text-emerald-400 text-xs mt-1">User deleted successfully</p>}
                </ActionCard>

                <ActionCard title="Assign VIP Status" theme={theme} index={2} glow="amber">
                    <div className="flex items-center gap-2 mb-1">
                        <Crown size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />
                        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Select user to upgrade</span>
                    </div>
                    <select value={selectedUserToVip} onChange={e => setSelectedUserToVip(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => !u.vip).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserToVip}
                        onClick={() => setShowVipModal(true)}
                        className={`group relative h-9 px-4 rounded-lg text-xs font-semibold transition-all duration-300 overflow-hidden
                            ${isDark
                                ? "bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 hover:shadow-amber-500/30"
                                : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-sm hover:shadow-md"
                            } disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                            Upgrade
                            <Crown size={12} />
                        </span>
                    </button>
                    {vipSuccess && <p className="text-emerald-400 text-xs mt-1">User upgraded successfully</p>}
                </ActionCard>

                <ActionCard title="Bulk Notifications" theme={theme} index={3} glow="violet">
                    <div className="flex items-center gap-2 mb-1">
                        <Send size={14} className={isDark ? "text-violet-400" : "text-violet-600"} />
                        <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Send notifications to users</span>
                    </div>
                    {BulkEmailComponent}
                </ActionCard>
            </div>
        </>
    );
}
