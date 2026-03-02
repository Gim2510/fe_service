import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import type { UserType } from "../types/userTypes";

import { useUsersDashboard } from "../hooks/useUserDarshboard";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { type AdminTab, SidebarNavigation } from "../Components/Dashboard/SidebarNavigation.tsx";
import { DashboardHeader } from "../Components/Dashboard/DashboardHeader.tsx";
import { DashboardContent } from "../Components/Dashboard/DashboardContent.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";

export function AdminDashboard() {
    const { theme } = useTheme();
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();

    const [activeTab, setActiveTab] = useState<AdminTab>("overview");
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    async function refreshUsers() {
        const data = await getAllUsers();
        setAllUsers(data);
    }

    useEffect(() => {
        refreshUsers();
    }, []);

    if (loadingUsers || loadingSurveys) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-neutral-950" : "bg-gray-100"}`}>
                <FallingLines color={theme === "dark" ? "#fff" : "#1f2937"} width="150" visible />
            </div>
        );
    }

    return (
        <section className={`min-h-screen py-16 ${theme === "dark" ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white" : "bg-white text-gray-900"}`}>
            <div className="max-w-7xl mx-auto px-8 py-12">

                <DashboardHeader users={users} surveys={surveys} theme={theme} />

                <div className="flex gap-10 mt-12 sm:flex-row flex-col">
                    <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

                    <DashboardContent
                        activeTab={activeTab}
                        users={users}
                        surveys={surveys}
                        allUsers={allUsers}
                        refreshUsers={refreshUsers}
                        theme={theme}
                    />
                </div>

            </div>
        </section>
    );
}