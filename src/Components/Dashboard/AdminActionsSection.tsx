import { useState } from "react";
import { UserRoles } from "../../types/userRoles";
import type { UserType } from "../../types/userTypes";
import { Shield, Trash2, Crown, Send, Building2 } from "lucide-react";
import { useAuth } from "../../auth/AuthContext.tsx";

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
    const { token } = useAuth();
    const [selectedUserToClient, setSelectedUserToClient] = useState("");
    const [clientSuccess, setClientSuccess] = useState(false);
    const [clientLoading, setClientLoading] = useState(false);

    const userBaseUrl = import.meta.env.VITE_USER_BASE_URL;

    const handleToggleClient = async () => {
        if (!selectedUserToClient || !token) return;
        setClientLoading(true);
        try {
            const user = allUsers.find((u) => u._id === selectedUserToClient);
            const newValue = !(user as Record<string, unknown>)?.client;
            await fetch(`${userBaseUrl}/v1/user/set_client/${selectedUserToClient}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ client: newValue }),
            });
            setClientSuccess(true);
            setTimeout(() => setClientSuccess(false), 3000);
            setSelectedUserToClient("");
        } catch { /* ignore */ }
        finally { setClientLoading(false); }
    };

    const selectClass = `w-full h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none transition-colors
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700"
            : "bg-white border-slate-200 text-slate-900 focus:border-sky-600"
        }`;

    return (
        <div className="space-y-3">
            <div className={`text-[11px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Admin Control Center</div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <button
                    disabled={!selectedUserId}
                    onClick={() => setShowPromoteModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserId
                            ? (isDark ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]" : "bg-cyan-50 border-cyan-400 text-cyan-800")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Shield size={16} />
                    Promote
                    {selectedUserId && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />}
                </button>

                <button
                    disabled={!selectedUserToDelete}
                    onClick={() => setShowDeleteModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserToDelete
                            ? (isDark ? "bg-red-500/15 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]" : "bg-red-50 border-red-400 text-red-700")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Trash2 size={16} />
                    Delete
                    {selectedUserToDelete && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />}
                </button>

                <button
                    disabled={!selectedUserToVip}
                    onClick={() => setShowVipModal(true)}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserToVip
                            ? (isDark ? "bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]" : "bg-amber-50 border-amber-400 text-amber-700")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Crown size={16} />
                    VIP
                    {selectedUserToVip && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />}
                </button>

                <button
                    disabled={!selectedUserToClient || clientLoading}
                    onClick={handleToggleClient}
                    className={`relative inline-flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                        ${selectedUserToClient
                            ? (isDark ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]" : "bg-emerald-50 border-emerald-400 text-emerald-700")
                            : (isDark ? "border-stone-800/30 text-slate-600 cursor-not-allowed" : "border-slate-200 text-slate-400 cursor-not-allowed")
                        }`}>
                    <Building2 size={16} />
                    Toggle Client
                    {selectedUserToClient && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />}
                </button>

                <div className={`relative inline-flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${isDark ? "border-stone-800/30 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                    <Send size={16} />
                    Notifiche
                    {BulkEmailComponent}
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
                <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className={selectClass + " flex-1 min-w-[150px]"}>
                    <option value="">Promote user</option>
                    {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
                <select value={selectedUserToDelete} onChange={e => setSelectedUserToDelete(e.target.value)} className={selectClass + " flex-1 min-w-[150px]"}>
                    <option value="">Delete user</option>
                    {allUsers.filter(u => u.role !== UserRoles.Admin).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
                <select value={selectedUserToVip} onChange={e => setSelectedUserToVip(e.target.value)} className={selectClass + " flex-1 min-w-[150px]"}>
                    <option value="">VIP user</option>
                    {allUsers.filter(u => !u.vip).map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
                <select value={selectedUserToClient} onChange={e => setSelectedUserToClient(e.target.value)} className={selectClass + " flex-1 min-w-[150px]"}>
                    <option value="">Toggle client</option>
                    {allUsers.map(u => (<option key={u._id} value={u._id}>{u.email}</option>))}
                </select>
            </div>
            {deleteSuccess && <p className="text-emerald-400 text-xs mt-1">User deleted successfully</p>}
            {vipSuccess && <p className="text-emerald-400 text-xs mt-1">User upgraded successfully</p>}
            {clientSuccess && <p className="text-emerald-400 text-xs mt-1">Client status toggled successfully</p>}
        </div>
    );
}
