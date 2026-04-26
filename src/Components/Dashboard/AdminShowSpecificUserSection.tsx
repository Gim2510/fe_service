import type { UserType } from "../../types/userTypes.ts";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useSelectedUser } from "../../hooks/useUserById.ts";
import { FallingLines } from "react-loader-spinner";

type Props = {
    allUsers: UserType[];
    selectedUserIdToShow: string;
    setSelectedUserIdToShow: (v: string) => void;
    theme: string;
};

export function AdminShowSpecificUserSection({ allUsers, selectedUserIdToShow, setSelectedUserIdToShow, theme }: Props) {
    const { id } = useAuth();
    const { user, loading, error } = useSelectedUser(selectedUserIdToShow);
    const isDark = theme === "dark";

    const card = isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200";
    const innerCard = isDark ? "bg-[#111110] border-stone-800/20" : "bg-[#EDF2F7] border-slate-200";

    const selectClass = `w-full sm:w-80 h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none
        ${isDark ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-amber-700" : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-amber-600"}`;

    const badgeBg = {
        VIP: isDark ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" : "bg-amber-50 text-amber-700 border border-amber-200",
        Verified: isDark ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-green-50 text-green-700 border border-green-200",
        Suspended: isDark ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-red-50 text-red-700 border border-red-200",
    };

    return (
        <div className={`rounded-2xl border p-7 space-y-7 ${card}`}>
            <div>
                <h2 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Inspect Specific User</h2>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>View detailed account information</p>
            </div>

            <select value={selectedUserIdToShow} onChange={e => setSelectedUserIdToShow(e.target.value)} className={selectClass}>
                <option value="">Select user</option>
                {allUsers.filter(u => u._id !== id).map(u => (
                    <option key={u._id} value={u._id}>{u.email}</option>
                ))}
            </select>

            {loading && (
                <div className="flex justify-center py-8">
                    <FallingLines color={isDark ? "#fff" : "#3B82F6"} width="50" visible ariaLabel="loading" />
                </div>
            )}

            {error && <p className="text-sm text-red-400">Error loading user data</p>}

            {user && !loading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile card */}
                    <div className={`rounded-2xl border p-6 flex flex-col items-center text-center ${innerCard}`}>
                        <img
                            src={user.user_image || "https://via.placeholder.com/150"}
                            alt="User profile"
                            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-amber-600/20"
                        />
                        <h3 className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            {user.given_name} {user.family_name}
                        </h3>
                        <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{user.email}</p>
                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                            <span className={`px-2.5 py-1 text-xs rounded-full border ${isDark ? "border-stone-800/30 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                                {user.role}
                            </span>
                            {user.vip && <span className={`px-2.5 py-1 text-xs rounded-full ${badgeBg.VIP}`}>VIP</span>}
                            {user.emailVerified && <span className={`px-2.5 py-1 text-xs rounded-full ${badgeBg.Verified}`}>Verified</span>}
                            {user.isSuspended && <span className={`px-2.5 py-1 text-xs rounded-full ${badgeBg.Suspended}`}>Suspended</span>}
                        </div>
                    </div>

                    {/* Details */}
                    <div className={`lg:col-span-2 rounded-2xl border p-6 ${innerCard}`}>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            {[
                                { label: "Fiscal Code", value: user.fiscal_code },
                                { label: "Partita IVA", value: user.partita_iva },
                                { label: "Company Name", value: user.company_name || "-" },
                                { label: "Company Role", value: user.company_role },
                                { label: "Auth Type", value: user.auth.type },
                                { label: "Provider", value: user.auth.provider || "-" },
                                { label: "Last Login", value: user.last_login ? new Date(user.last_login).toLocaleString() : "-" },
                                { label: "Expiration", value: user.expirationDate ? new Date(user.expirationDate).toLocaleString() : "-" },
                                { label: "Owner Score", value: user.ownerTotalScore?.toString() || "0" },
                                { label: "User Score", value: user.userTotalScore?.toString() || "0" },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                                    <p className={`text-sm mt-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{value || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
