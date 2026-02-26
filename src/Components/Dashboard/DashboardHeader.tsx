import {DashboardCard} from "./DashboardCard.tsx";

type Props = {
    users: any;
    surveys: any;
};

export function DashboardHeader({ users, surveys }: Props) {
    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
                <p className="text-neutral-400 mt-2">
                    System monitoring & user control center
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mt-10">
                <DashboardCard title="Users" value={users?.totalUsers} />
                <DashboardCard title="Active" value={users?.activeUsers} />
                <DashboardCard title="VIP" value={users?.vipActive} />
                <DashboardCard title="Surveys" value={surveys?.totalResponses} />
                <DashboardCard title="Published" value={surveys?.publishedResponses} />
                <DashboardCard
                    title="Avg Score"
                    value={surveys?.averageScore?.toFixed(2)}
                />
            </div>
        </>
    );
}