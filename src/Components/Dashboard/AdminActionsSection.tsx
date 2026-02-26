import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { ActionCard } from "./ActionCard";

type Props = {
    allUsers: UserType[];

    // Promote
    selectedUserId: string;
    setSelectedUserId: (v: string) => void;
    setShowPromoteModal: (v: boolean) => void;

    // Delete
    selectedUserToDelete: string;
    setSelectedUserToDelete: (v: string) => void;
    setShowDeleteModal: (v: boolean) => void;
    deleteSuccess: boolean;

    // VIP
    selectedUserToVip: string;
    setSelectedUserToVip: (v: string) => void;
    setShowVipModal: (v: boolean) => void;
    vipSuccess: boolean;

    // Bulk Email component
    BulkEmailComponent: React.ReactNode;
};

export function AdminActionsSection({allUsers, selectedUserId, setSelectedUserId, setShowPromoteModal, selectedUserToDelete,
                                        setSelectedUserToDelete, setShowDeleteModal, deleteSuccess, selectedUserToVip,
                                        setSelectedUserToVip, setShowVipModal, vipSuccess, BulkEmailComponent}: Props) {
    return (
        <div className="relative rounded-[36px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-3xl p-12 space-y-12 shadow-[0_0_80px_rgba(255,255,255,0.04)]">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Admin Control Center
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                        System privileges & user management
                    </p>
                </div>
                <span className="uppercase text-xs tracking-widest text-neutral-600">
                    Core Actions
                </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* PROMOTE */}
                <ActionCard title="Promote to Admin">
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="glass-input cursor-pointer"
                    >
                        <option value="">Select user</option>
                        {allUsers
                            .filter((u) => u.role !== UserRoles.Admin)
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                    </select>

                    <button
                        disabled={!selectedUserId}
                        onClick={() => setShowPromoteModal(true)}
                        className="glass-button cursor-pointer"
                    >
                        Promote
                    </button>
                </ActionCard>

                {/* DELETE */}
                <ActionCard title="Delete User">
                    <select
                        value={selectedUserToDelete}
                        onChange={(e) => setSelectedUserToDelete(e.target.value)}
                        className="glass-input cursor-pointer"
                    >
                        <option value="">Select user</option>
                        {allUsers
                            .filter((u) => u.role !== UserRoles.Admin)
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                    </select>

                    <button
                        disabled={!selectedUserToDelete}
                        onClick={() => setShowDeleteModal(true)}
                        className="glass-button-danger cursor-pointer"
                    >
                        Delete
                    </button>

                    {deleteSuccess && (
                        <p className="text-green-400 text-sm mt-2">
                            User deleted successfully
                        </p>
                    )}
                </ActionCard>

                {/* VIP */}
                <ActionCard title="Assign VIP Status">
                    <select
                        value={selectedUserToVip}
                        onChange={(e) => setSelectedUserToVip(e.target.value)}
                        className="glass-input cursor-pointer"
                    >
                        <option value="">Select user</option>
                        {allUsers
                            .filter((u) => !u.vip)
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.email}
                                </option>
                            ))}
                    </select>

                    <button
                        disabled={!selectedUserToVip}
                        onClick={() => setShowVipModal(true)}
                        className="glass-button-success cursor-pointer"
                    >
                        Upgrade
                    </button>

                    {vipSuccess && (
                        <p className="text-green-400 text-sm mt-2">
                            User upgraded successfully
                        </p>
                    )}
                </ActionCard>

                {/* BULK EMAIL */}
                <div className="col-span-1 lg:col-span-2">
                    {BulkEmailComponent}
                </div>

            </div>
        </div>
    );
}
