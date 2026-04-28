import { useState } from "react";
import { motion } from "framer-motion";
import { useSetUserAdmin } from "../../../hooks/useSetUserAdmin.ts";
import { useDeleteUser } from "../../../hooks/useDeleteUser.ts";
import { useUpdateUserToVip } from "../../../hooks/useSetVip.ts";
import { useAuth } from "../../../auth/AuthContext.tsx";

import type { UserType } from "../../../types/userTypes.ts";
import { AdminActionsSection } from "../AdminActionsSection.tsx";
import { DeleteUserModal } from "../DashboardModals/DeleteUserModal.tsx";
import { SetUserToVipModal } from "../DashboardModals/SetUserToVipModal.tsx";
import { PromoteUserModal } from "../DashboardModals/PromoteUserModal.tsx";

type Props = {
    allUsers: UserType[];
    refreshUsers: () => Promise<void>;
    theme: string;
};

export function UserManagementPanel({ allUsers, refreshUsers, theme }: Props) {
    const { token } = useAuth();
    const { doSetUserRoleToAdmin } = useSetUserAdmin();
    const { deleteUser, success }  = useDeleteUser();
    const { setVip, success: vipSuccess } = useUpdateUserToVip();

    const [selectedUserId,       setSelectedUserId]       = useState("");
    const [selectedUserToDelete, setSelectedUserToDelete] = useState("");
    const [selectedUserToVip,    setSelectedUserToVip]    = useState("");

    const [loadingPromote,      setLoadingPromote]     = useState(false);
    const [loadingDeleteState,  setLoadingDeleteState]  = useState(false);
    const [loadingVipState,     setLoadingVipState]    = useState(false);

    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showDeleteModal,  setShowDeleteModal]  = useState(false);
    const [showVipModal,     setShowVipModal]     = useState(false);

    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    async function handleConfirmSetAdmin(setLoading: (v: boolean) => void) {
        setLoading(true);
        try { await doSetUserRoleToAdmin(selectedUserId); await refreshUsers(); setShowPromoteModal(false); }
        catch (err) { console.error(err); } finally { setLoading(false); }
    }

    async function handleConfirmDeleteUser(setLoading: (v: boolean) => void) {
        setLoading(true);
        try { await deleteUser(selectedUserToDelete, token); await refreshUsers(); setShowDeleteModal(false); }
        catch (err) { console.error(err); } finally { setLoading(false); }
    }

    async function handleConfirmVip(setLoading: (v: boolean) => void) {
        setLoading(true);
        try { await setVip(selectedUserToVip, token); await refreshUsers(); setShowVipModal(false); }
        catch (err) { console.error(err); } finally { setLoading(false); }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl border overflow-hidden p-7 ${border}`}
                style={{ background: isDark ? "#161614" : "#FAFAF8" }}
            >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-700/40" />

                <AdminActionsSection
                    allUsers={allUsers}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                    setShowPromoteModal={setShowPromoteModal}
                    selectedUserToDelete={selectedUserToDelete}
                    setSelectedUserToDelete={setSelectedUserToDelete}
                    setShowDeleteModal={setShowDeleteModal}
                    deleteSuccess={success}
                    selectedUserToVip={selectedUserToVip}
                    setSelectedUserToVip={setSelectedUserToVip}
                    setShowVipModal={setShowVipModal}
                    vipSuccess={vipSuccess}
                    BulkEmailComponent={null}
                    theme={theme}
                />
            </motion.div>

            {showPromoteModal && (
                <PromoteUserModal
                    userEmail={allUsers.find(u => u._id === selectedUserId)?.email}
                    onConfirm={() => handleConfirmSetAdmin(setLoadingPromote)}
                    loading={loadingPromote}
                    onClose={() => setShowPromoteModal(false)}
                    theme={theme}
                />
            )}
            {showDeleteModal && (
                <DeleteUserModal
                    setShowDeleteUserModal={setShowDeleteModal}
                    handleConfirmDeleteUser={() => handleConfirmDeleteUser(setLoadingDeleteState)}
                    loadingDeleteUser={loadingDeleteState}
                    theme={theme}
                />
            )}
            {showVipModal && (
                <SetUserToVipModal
                    setShowUpdateUserToVipModal={setShowVipModal}
                    handleUpdateUserToVip={() => handleConfirmVip(setLoadingVipState)}
                    loadingUpdateToVip={loadingVipState}
                    theme={theme}
                />
            )}
        </>
    );
}
