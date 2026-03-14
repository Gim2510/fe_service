import { useState } from "react";
import { useSetUserAdmin } from "../../../hooks/useSetUserAdmin.ts";
import { useDeleteUser } from "../../../hooks/useDeleteUser.ts";
import { useUpdateUserToVip } from "../../../hooks/useSetVip.ts";
import { useAuth } from "../../../auth/AuthContext.tsx";

import type { UserType } from "../../../types/userTypes.ts";
import {AdminActionsSection} from "../AdminActionsSection.tsx";
import {DeleteUserModal} from "../DashboardModals/DeleteUserModal.tsx";
import {SetUserToVipModal} from "../DashboardModals/SetUserToVipModal.tsx";
import {PromoteUserModal} from "../DashboardModals/PromoteUserModal.tsx";

type Props = {
    allUsers: UserType[];
    refreshUsers: () => Promise<void>;
    theme: string
};

export function UserManagementPanel({ allUsers, refreshUsers, theme }: Props) {
    const { token } = useAuth();
    const { doSetUserRoleToAdmin} = useSetUserAdmin();
    const { deleteUser, success } = useDeleteUser();
    const { setVip, success: vipSuccess } = useUpdateUserToVip();

    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUserToDelete, setSelectedUserToDelete] = useState("");
    const [selectedUserToVip, setSelectedUserToVip] = useState("");

    const [loadingPromote, setLoadingPromote] = useState(false);
    const [loadingDeleteState, setLoadingDeleteState] = useState(false);
    const [loadingVipState, setLoadingVipState] = useState(false);

    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVipModal, setShowVipModal] = useState(false);

    const isDark = theme === "dark";
    const glassBg = isDark
        ? "bg-white/[0.04] border border-white/[0.08]"  // dark glass
        : "bg-white/50 border border-gray-200";        // light glass premium

    async function handleConfirmSetAdmin(setLoading: (value: boolean) => void) {
        setLoading(true); // mostra spinner e disabilita pulsanti
        try {
            await doSetUserRoleToAdmin(selectedUserId);
            await refreshUsers();
            setShowPromoteModal(false); // chiude il modale solo dopo il completamento
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleConfirmDeleteUser(setLoading: (value: boolean) => void) {
        setLoading(true);
        try {
            await deleteUser(selectedUserToDelete, token);
            await refreshUsers();
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleConfirmVip(setLoading: (value: boolean) => void) {
        setLoading(true);
        try {
            await setVip(selectedUserToVip, token);
            await refreshUsers();
            setShowVipModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div
                className={`relative rounded-[36px] sm:p-12 space-y-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.04)] ${glassBg}`}>
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
                    theme={theme}  // <-- passiamo theme
                />

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
            </div>
        </>
    );
}