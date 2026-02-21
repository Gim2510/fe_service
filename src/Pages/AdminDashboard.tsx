import {useUsersDashboard} from "../hooks/useUserDarshboard.ts";
import {useSurveyDashboard} from "../hooks/useSurveyDashboard.ts";
import {DashboardCard} from "../Components/Dashboard/DashboardCard.tsx";
import {DetailItem} from "../Components/Dashboard/DetailItem.tsx";
import {useEffect, useState} from "react";
import {useSetUserAdmin} from "../hooks/useSetUserAdmin.ts";
import {useGetAllUsers} from "../hooks/useGetAllUsers.ts";


export function AdminDashboard() {
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();
    const { doSetUserRoleToAdmin, loading: loadingSetAdmin } = useSetUserAdmin();

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getAllUsers();
                setAllUsers(data);
            } catch (e) {
                console.error(e);
            }
        }

        loadUsers();
    }, []);

    async function handleConfirmSetAdmin() {
        try {
            await doSetUserRoleToAdmin(selectedUserId);

            // Aggiorna lista utenti dopo promozione
            const updatedUsers = await getAllUsers();
            setAllUsers(updatedUsers);

            setShowModal(false);
            setSelectedUserId("");
        } catch (e) {
            console.error(e);
        }
    }

    if (loadingUsers || loadingSurveys) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
                Caricamento dashboard...
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white px-8 py-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* TITLE */}
                <div>
                    <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
                    <p className="text-neutral-400 mt-2">
                        Monitoraggio utenti e survey in tempo reale
                    </p>
                </div>

                {/* USER KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Utenti Totali" value={users?.totalUsers}/>
                    <DashboardCard title="Utenti Attivi" value={users?.activeUsers}/>
                    <DashboardCard title="VIP Attivi" value={users?.vipActive}/>
                    <DashboardCard title="Nuovi (30gg)" value={users?.newUsersLast30Days}/>
                </div>

                {/* SURVEY KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Survey Totali" value={surveys?.totalResponses}/>
                    <DashboardCard title="Published" value={surveys?.publishedResponses}/>
                    <DashboardCard title="Draft" value={surveys?.draftResponses}/>
                    <DashboardCard
                        title="Score Medio"
                        value={surveys?.averageScore?.toFixed(2)}
                    />
                </div>

                {/* USERS DETAIL */}
                <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                    <h2 className="text-2xl mb-6">Distribuzione Utenti</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <DetailItem label="Admin" value={users?.usersByRole.admin}/>
                        <DetailItem label="User" value={users?.usersByRole.user}/>
                        <DetailItem label="Email Verificate" value={users?.verifiedEmails}/>
                        <DetailItem label="Non Verificate" value={users?.unverifiedEmails}/>
                    </div>
                </div>

                {/* ADMIN MANAGEMENT */}
                <div className="relative rounded-[32px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl p-10">

                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                            Privilege Management
                        </h2>
                        <span className="text-xs sm:block hidden uppercase tracking-widest text-neutral-500">
            System Control
        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">

                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className=" border border-white/[0.1] rounded-2xl px-5 py-3 text-black backdrop-blur-xl
                            focus:outline-none focus:border-white/[0.2] transition w-full sm:w-96 bg-white">
                            <option value="">Seleziona utente</option>
                            {allUsers
                                .filter((u) => u.role !== "ADMIN")
                                .map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.email}
                                    </option>
                                ))}
                        </select>

                        <button
                            disabled={!selectedUserId}
                            onClick={() => setShowModal(true)}
                            className=" relative cursor-pointer px-8 py-3 rounded-2xl bg-white text-black font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-30 ">
                            Promote to Admin
                        </button>
                    </div>
                </div>


                {/* SURVEY DETAIL */}
                <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                    <h2 className="text-2xl mb-6">Andamento Survey per Mese</h2>

                    <div className="flex flex-col gap-2">
                        {surveys?.responsesByMonth.map((item) => (
                            <div
                                key={item.month}
                                className="flex justify-between border-b border-neutral-700 pb-2"
                            >
                                <span>{item.month}</span>
                                <span>{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">

                    <div className=" rounded-[32px] bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl p-10 w-[420px] shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                        <h3 className="text-2xl font-semibold mb-4">
                            Confirm Elevation
                        </h3>

                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            This action will grant administrative privileges to the selected user.
                            The change is immediate and irreversible.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-2 cursor-pointer rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmSetAdmin}
                                disabled={loadingSetAdmin}
                                className=" px-6 py-2 cursor-pointer rounded-xl bg-white text-black font-medium hover:scale-105 transition disabled:opacity-40">
                                {loadingSetAdmin ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </section>
    );
}
