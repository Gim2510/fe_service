import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { ActionCard } from "./ActionCard";

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
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-emerald-700"
            : "bg-white border-slate-200 text-slate-900 focus:border-emerald-600"
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
                <ActionCard title="Promote to Admin" theme={theme} index={0}>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserId}
                        onClick={() => setShowPromoteModal(true)}
                        className="h-11 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40
                            text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200"
                    >
                        Promote
                    </button>
                </ActionCard>

                <ActionCard title="Delete User" theme={theme} index={1}>
                    <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserToDelete}
                        onClick={() => setShowDeleteModal(true)}
                        className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40
                            text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200"
                    >
                        Delete
                    </button>
                    {deleteSuccess && <p className="text-green-400 text-xs mt-1">User deleted successfully</p>}
                </ActionCard>

                <ActionCard title="Assign VIP Status" theme={theme} index={2}>
                    <select value={selectedUserToVip} onChange={e => setSelectedUserToVip(e.target.value)} className={selectClass}>
                        <option value="">Select user</option>
                        {allUsers.filter(u => !u.vip).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedUserToVip}
                        onClick={() => setShowVipModal(true)}
                        className="h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40
                            text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200"
                    >
                        Upgrade
                    </button>
                    {vipSuccess && <p className="text-green-400 text-xs mt-1">User upgraded successfully</p>}
                </ActionCard>

                <div className="col-span-1 lg:col-span-2">{BulkEmailComponent}</div>
            </div>
        </>
    );
}
