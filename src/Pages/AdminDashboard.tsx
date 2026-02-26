import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import type { UserType } from "../types/userTypes";

import { useUsersDashboard } from "../hooks/useUserDarshboard";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import {type AdminTab, SidebarNavigation} from "../Components/Dashboard/SidebarNavigation.tsx";
import {DashboardHeader} from "../Components/Dashboard/DashboardHeader.tsx";
import {DashboardContent} from "../Components/Dashboard/DashboardContent.tsx";


export function AdminDashboard() {
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
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <FallingLines color="#fff" width="150" visible />
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-8 py-12">

                <DashboardHeader users={users} surveys={surveys} />

                <div className="flex gap-10 mt-12 sm:flex-row flex-col">
                    <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                    <DashboardContent
                        activeTab={activeTab}
                        users={users}
                        surveys={surveys}
                        allUsers={allUsers}
                        refreshUsers={refreshUsers}
                    />
                </div>

            </div>
        </section>
    );
}