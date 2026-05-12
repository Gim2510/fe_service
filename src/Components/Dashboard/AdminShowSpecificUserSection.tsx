import { motion } from "framer-motion";
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

    const border   = isDark ? "border-stone-800/30" : "border-slate-200";
    const innerBg  = isDark ? "#111110" : "#EDF2F7";
    const innerBorder = isDark ? "border-stone-800/30" : "border-slate-200";

    const selectClass = `w-full sm:w-80 h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none
        ${isDark ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-emerald-700"
                 : "bg-white border-slate-200 text-slate-900 focus:border-emerald-600"}`;

    const badgeBg = {
        VIP:       isDark ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"   : "bg-emerald-50 text-emerald-700 border-emerald-200",
        Verified:  isDark ? "bg-green-500/15 text-green-400 border-green-500/30"   : "bg-green-50 text-green-700 border-green-200",
        Suspended: isDark ? "bg-red-500/15 text-red-400 border-red-500/30"         : "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-emerald-700/40" />
            <div className="p-7 space-y-7">
                <div>
                    <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Inspect Specific User
                    </h2>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        View detailed account information
                    </p>
                </div>

                <select
                    value={selectedUserIdToShow}
                    onChange={e => setSelectedUserIdToShow(e.target.value)}
                    className={selectClass}
                >
                    <option value="">Select user</option>
                    {allUsers.filter(u => u._id !== id).map(u => (
                        <option key={u._id} value={u._id}>{u.email}</option>
                    ))}
                </select>

                {loading && (
                    <div className="flex justify-center py-8">
                        <FallingLines color={isDark ? "#fff" : "#B45309"} width="50" visible ariaLabel="loading" />
                    </div>
                )}

                {error && <p className="text-sm text-red-400">Error loading user data</p>}

                {user && !loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Profile card */}
                        <div
                            className={`rounded-2xl border p-6 flex flex-col items-center text-center ${innerBorder}`}
                            style={{ background: innerBg }}
                        >
                            <img
                                src={user.user_image || "https://via.placeholder.com/150"}
                                alt="User profile"
                                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-emerald-600/20"
                            />
                            <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                {user.given_name} {user.family_name}
                            </h3>
                            <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{user.email}</p>
                            <div className="flex gap-1.5 mt-4 flex-wrap justify-center">
                                <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                    ${isDark ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                                    {user.role}
                                </span>
                                {user.vip       && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.VIP}`}>VIP</span>}
                                {user.emailVerified && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.Verified}`}>Verified</span>}
                                {user.isSuspended   && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.Suspended}`}>Suspended</span>}
                            </div>
                        </div>

                        {/* Details */}
                        <div
                            className={`lg:col-span-2 rounded-2xl border p-6 ${innerBorder}`}
                            style={{ background: innerBg }}
                        >
                            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                {[
                                    { label: "Fiscal Code",   value: user.fiscal_code },
                                    { label: "Partita IVA",   value: user.partita_iva },
                                    { label: "Company Name",  value: user.company_name  || "—" },
                                    { label: "Company Role",  value: user.company_role },
                                    { label: "Auth Type",     value: user.auth.type },
                                    { label: "Provider",      value: user.auth.provider || "—" },
                                    { label: "Last Login",    value: user.last_login     ? new Date(user.last_login).toLocaleString()     : "—" },
                                    { label: "Expiration",    value: user.expirationDate ? new Date(user.expirationDate).toLocaleString() : "—" },
                                    { label: "Owner Score",   value: user.ownerTotalScore?.toString() || "0" },
                                    { label: "User Score",    value: user.userTotalScore?.toString()  || "0" },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-1
                                            ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                            {label}
                                        </p>
                                        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                            {value || "—"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
