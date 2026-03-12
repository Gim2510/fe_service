import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { ActionCard } from "./ActionCard";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

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
    theme: string; // <-- aggiunto
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
    const cardBg = isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-white/50 border border-gray-200";
    const textHeader = isDark ? "text-white" : "text-gray-900";
    const textSub = isDark ? "text-neutral-400" : "text-gray-600";

    return (
        <div className={`relative rounded-[36px] p-4 sm:p-12 space-y-6 sm:space-y-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.04)] ${cardBg}`}>
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-0 gap-3 sm:pt-0 pt-5">
                <div>
                    <h2 className={`text-2xl font-semibold tracking-tight ${textHeader}`}>
                        Admin Control Center
                    </h2>
                    <p className={`text-sm mt-1 ${textSub}`}>
                        System privileges & user management
                    </p>
                </div>
                <span className={`uppercase text-xs tracking-widest ${textSub}`}>
                    Core Actions
                </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ActionCard title="Promote to Admin" theme={theme}>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="glass-input cursor-pointer">
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <LiquidGlassButton variant='navbar' disabled={!selectedUserId} onClick={() => setShowPromoteModal(true)} className={isDark ? "bg-indigo-100 text-indigo-900 hover:bg-indigo-200/50 hover:text-black" : "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"}>
                        Promote
                    </LiquidGlassButton>
                </ActionCard>

                <ActionCard title="Delete User" theme={theme}>
                    <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className="glass-input cursor-pointer">
                        <option value="">Select user</option>
                        {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <LiquidGlassButton variant='navbar' disabled={!selectedUserToDelete} onClick={() => setShowDeleteModal(true)} className={isDark ? "bg-red-100 text-red-800 hover:bg-red-600/50 hover:text-black" : "bg-red-100 text-red-800 hover:bg-red-200"}>
                        Delete
                    </LiquidGlassButton>
                    {deleteSuccess && <p className="text-green-600 text-sm mt-2">User deleted successfully</p>}
                </ActionCard>

                <ActionCard title="Assign VIP Status" theme={theme}>
                    <select value={selectedUserToVip} onChange={e => setSelectedUserToVip(e.target.value)} className="glass-input cursor-pointer">
                        <option value="">Select user</option>
                        {allUsers.filter(u => !u.vip).map(u => (
                            <option key={u._id} value={u._id}>{u.email}</option>
                        ))}
                    </select>
                    <LiquidGlassButton variant='navbar' disabled={!selectedUserToVip} onClick={() => setShowVipModal(true)} className={isDark ? "bg-green-100 text-green-900 hover:bg-green-200/50 hover:text-black" : "bg-green-100 text-green-900 hover:bg-green-200"}>
                        Upgrade
                    </LiquidGlassButton>
                    {vipSuccess && <p className="text-green-600 text-sm mt-2">User upgraded successfully</p>}
                </ActionCard>

                <div className="col-span-1 lg:col-span-2">{BulkEmailComponent}</div>
            </div>
        </div>
    );
}