import { DashboardStatsTable } from "./DashboardStatsTable";

type Props = {
    users: any;
    surveys: any;
    theme: string;
};

export function DashboardHeader({ users, surveys, theme }: Props) {

    const isDark = theme === "dark";

    return (
        <div className="space-y-8">

            <div>
                <h1 className={`text-3xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Admin Dashboard
                </h1>

                <p className={`${isDark ? "text-neutral-400" : "text-gray-600"} mt-2`}>
                    System monitoring & user control center
                </p>
            </div>

            <DashboardStatsTable
                users={users}
                surveys={surveys}
                theme={theme}
            />

        </div>
    );
}