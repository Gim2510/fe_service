import { DashboardCard } from "./DashboardCard.tsx";

type Props = {
    users: any;
    surveys: any;
    theme: string;
};

export function DashboardHeader({ users, surveys, theme }: Props) {
    return (
        <>
            <div>
                <h1 className={`text-4xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Admin Dashboard
                </h1>
                <p className={`${theme === "dark" ? "text-neutral-400" : "text-gray-600"} mt-2`}>
                    System monitoring & user control center
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mt-10">
                <DashboardCard title="Users" value={users?.totalUsers} theme={theme} />
                <DashboardCard title="Active" value={users?.activeUsers} theme={theme} />
                <DashboardCard title="VIP" value={users?.vipActive} theme={theme} />
                <DashboardCard title="Surveys" value={surveys?.totalResponses} theme={theme} />
                <DashboardCard title="Published" value={surveys?.publishedResponses} theme={theme} />
                <DashboardCard title="Avg Score" value={surveys?.averageScore?.toFixed(2)} theme={theme} />
            </div>
        </>
    );
}