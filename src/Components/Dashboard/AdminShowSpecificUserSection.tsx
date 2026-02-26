import type {UserType} from "../../types/userTypes.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useSelectedUser} from "../../hooks/useUserById.ts";
import {FallingLines} from "react-loader-spinner";

type Props = {
    allUsers: UserType[];
    selectedUserIdToShow: string;
    setSelectedUserIdToShow: (selectedUserIdToShow: string) => void;
};

export function AdminShowSpecificUserSection({allUsers, selectedUserIdToShow, setSelectedUserIdToShow}: Props) {

    const { id } = useAuth();
    const { user, loading, error } = useSelectedUser(selectedUserIdToShow);

    return (
        <div className="relative rounded-[36px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-3xl sm:p-12 space-y-12 shadow-[0_0_80px_rgba(255,255,255,0.04)]">

            {/* HEADER */}
            <div className='p-8 sm:p-0 gap-8 sm:flex flex-col'>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Inspect Specific User
                        </h2>
                        <p className="text-neutral-500 text-sm mt-1">
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
                        color="#fff"
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
                    <div className="col-span-1 bg-neutral-900/60 rounded-2xl p-6 border border-neutral-700 flex flex-col items-center text-center">

                        <img
                            src={
                                user.user_image ||
                                "https://via.placeholder.com/150"
                            }
                            alt="User profile"
                            className="w-32 h-32 rounded-full object-cover border border-neutral-700 mb-4"
                        />

                        <h3 className="text-xl font-semibold">
                            {user.given_name} {user.family_name}
                        </h3>

                        <p className="text-neutral-400 text-sm">
                            {user.email}
                        </p>

                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                            <span className="px-3 py-1 text-xs rounded-full bg-neutral-800 border border-neutral-700">
                                {user.role}
                            </span>

                            {user.vip && (
                                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                    VIP
                                </span>
                            )}

                            {user.emailVerified && (
                                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                    Verified
                                </span>
                            )}

                            {user.isSuspended && (
                                <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                                    Suspended
                                </span>
                            )}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="col-span-2 bg-neutral-900/60 rounded-2xl p-6 border border-neutral-700 space-y-4">

                        <div className="grid grid-cols-2 gap-4 text-sm">

                            <Detail label="Fiscal Code" value={user.fiscal_code} />
                            <Detail label="Partita IVA" value={user.partita_iva} />
                            <Detail label="Company Name" value={user.company_name || "-"} />
                            <Detail label="Company Role" value={user.company_role} />
                            <Detail label="Auth Type" value={user.auth.type} />
                            <Detail label="Provider" value={user.auth.provider || "-"} />
                            <Detail label="Last Login" value={formatDate(user.last_login)} />
                            <Detail label="Expiration Date" value={formatDate(user.expirationDate)} />
                            <Detail label="Owner Score" value={user.ownerTotalScore?.toString() || "0"} />
                            <Detail label="User Score" value={user.userTotalScore?.toString() || "0"} />

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* Utility components */

function Detail({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-neutral-500 text-xs uppercase tracking-wider">
                {label}
            </span>
            <span className="text-white mt-1">
                {value || "-"}
            </span>
        </div>
    );
}

function formatDate(date?: Date | string) {
    if (!date) return "-";
    return new Date(date).toLocaleString();
}