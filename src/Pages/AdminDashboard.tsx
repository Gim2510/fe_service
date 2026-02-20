import {useUsersDashboard} from "../hooks/useUserDarshboard.ts";
import {useSurveyDashboard} from "../hooks/useSurveyDashboard.ts";
import {DashboardCard} from "../Components/Dashboard/DashboardCard.tsx";
import {DetailItem} from "../Components/Dashboard/DetailItem.tsx";


export function AdminDashboard() {
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();

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
                    <DashboardCard title="Utenti Totali" value={users?.totalUsers} />
                    <DashboardCard title="Utenti Attivi" value={users?.activeUsers} />
                    <DashboardCard title="VIP Attivi" value={users?.vipActive} />
                    <DashboardCard title="Nuovi (30gg)" value={users?.newUsersLast30Days} />
                </div>

                {/* SURVEY KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Survey Totali" value={surveys?.totalResponses} />
                    <DashboardCard title="Published" value={surveys?.publishedResponses} />
                    <DashboardCard title="Draft" value={surveys?.draftResponses} />
                    <DashboardCard
                        title="Score Medio"
                        value={surveys?.averageScore?.toFixed(2)}
                    />
                </div>

                {/* USERS DETAIL */}
                <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                    <h2 className="text-2xl mb-6">Distribuzione Utenti</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <DetailItem label="Admin" value={users?.usersByRole.admin} />
                        <DetailItem label="User" value={users?.usersByRole.user} />
                        <DetailItem label="Email Verificate" value={users?.verifiedEmails} />
                        <DetailItem label="Non Verificate" value={users?.unverifiedEmails} />
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
        </section>
    );
}
