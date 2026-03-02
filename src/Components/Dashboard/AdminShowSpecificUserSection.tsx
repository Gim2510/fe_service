import type {UserType} from "../../types/userTypes.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useSelectedUser} from "../../hooks/useUserById.ts";
import {FallingLines} from "react-loader-spinner";

type Props = {
    allUsers: UserType[];
    selectedUserIdToShow: string;
    setSelectedUserIdToShow: (selectedUserIdToShow: string) => void;
    theme: string;
};

export function AdminShowSpecificUserSection({allUsers, selectedUserIdToShow, setSelectedUserIdToShow, theme}: Props) {

    const { id } = useAuth();
    const { user, loading, error } = useSelectedUser(selectedUserIdToShow);

    const isDark = theme === "dark";

    const glassBg = isDark
        ? "bg-white/[0.04] border border-white/[0.08]"
        : "bg-white/50 border border-gray-200";

    const textPrimary = isDark ? "text-white" : "text-gray-900";
    const textSecondary = isDark ? "text-neutral-500" : "text-gray-500";
    const badgeBg = {
        VIP: isDark ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-yellow-100 text-yellow-800 border border-yellow-200",
        Verified: isDark ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-green-100 text-green-800 border border-green-200",
        Suspended: isDark ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-red-100 text-red-800 border border-red-200"
    }

    return (
        <div className={`relative rounded-[36px] p-8 sm:p-12 space-y-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.04)] ${glassBg}`}>

            {/* HEADER */}
            <div className='p-8 sm:p-0 gap-8 sm:flex flex-col'>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className={`text-2xl font-semibold tracking-tight ${textPrimary}`}>
                            Inspect Specific User
                        </h2>
                        <p className={`${textSecondary} text-sm mt-1`}>
                            View detailed account information
                        </p>
                    </div>
                </div>

                {/* SELECT USER */}
                <div className="space-y-6">
                    <select
                        value={selectedUserIdToShow}
                        onChange={(e) => setSelectedUserIdToShow(e.target.value)}
                        className="glass-input w-full cursor-pointer"
                    >
                        <option value="">Select user</option>
                        {allUsers
                            .filter((u) => u._id !== id)
                            .map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.email}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {/* LOADING */}
            {loading && (
                <div className='w-full h-full flex justify-center items-center'>
                    <FallingLines
                        color={isDark ? "#fff" : "#111"}
                        width="50"
                        visible={true}
                        ariaLabel="falling-circles-loading"
                    />
                </div>
            )}

            {/* ERROR */}
            {error && (
                <p className="text-red-400">Error loading user data</p>
            )}

            {/* USER DETAILS */}
            {user && !loading && (
                <div className="flex flex-col justify-center items-center sm:grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">

                    {/* PROFILE CARD */}
                    <div className={`col-span-1 rounded-2xl p-6 border flex flex-col items-center text-center ${isDark ? "bg-neutral-900/60 border-neutral-700" : "bg-white/60 border-gray-200"}`}>
                        <img
                            src={user.user_image || "https://via.placeholder.com/150"}
                            alt="User profile"
                            className={`w-32 h-32 rounded-full object-cover mb-4 ${isDark ? "border-neutral-700" : "border-gray-200"}`}
                        />

                        <h3 className={`text-xl font-semibold ${textPrimary}`}>
                            {user.given_name} {user.family_name}
                        </h3>

                        <p className={`${textSecondary} text-sm`}>
                            {user.email}
                        </p>

                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                            <span className={`px-3 py-1 text-xs rounded-full ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-gray-100 border-gray-200"}`}>
                                {user.role}
                            </span>

                            {user.vip && <span className={`px-3 py-1 text-xs rounded-full ${badgeBg.VIP}`}>VIP</span>}
                            {user.emailVerified && <span className={`px-3 py-1 text-xs rounded-full ${badgeBg.Verified}`}>Verified</span>}
                            {user.isSuspended && <span className={`px-3 py-1 text-xs rounded-full ${badgeBg.Suspended}`}>Suspended</span>}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className={`col-span-2 rounded-2xl p-6 space-y-4 border ${isDark ? "bg-neutral-900/60 border-neutral-700" : "bg-white/60 border-gray-200"}`}>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <Detail label="Fiscal Code" value={user.fiscal_code} theme={theme}/>
                            <Detail label="Partita IVA" value={user.partita_iva} theme={theme}/>
                            <Detail label="Company Name" value={user.company_name || "-"} theme={theme}/>
                            <Detail label="Company Role" value={user.company_role} theme={theme}/>
                            <Detail label="Auth Type" value={user.auth.type} theme={theme}/>
                            <Detail label="Provider" value={user.auth.provider || "-"} theme={theme}/>
                            <Detail label="Last Login" value={formatDate(user.last_login)} theme={theme}/>
                            <Detail label="Expiration Date" value={formatDate(user.expirationDate)} theme={theme}/>
                            <Detail label="Owner Score" value={user.ownerTotalScore?.toString() || "0"} theme={theme}/>
                            <Detail label="User Score" value={user.userTotalScore?.toString() || "0"} theme={theme}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* Utility components */
function Detail({ label, value, theme }: { label: string; value?: string; theme: string }) {
    const isDark = theme === "dark";
    return (
        <div className="flex flex-col">
            <span className={`text-xs uppercase tracking-wider ${isDark ? "text-neutral-500" : "text-gray-500"}`}>
                {label}
            </span>
            <span className={`${isDark ? "text-white" : "text-gray-900"} mt-1`}>
                {value || "-"}
            </span>
        </div>
    );
}

function formatDate(date?: Date | string) {
    if (!date) return "-";
    return new Date(date).toLocaleString();
}