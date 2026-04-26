import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import type { UserType } from "../types/userTypes";

import { useUsersDashboard } from "../hooks/useUserDarshboard";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { type AdminTab, SidebarNavigation } from "../Components/Dashboard/SidebarNavigation.tsx";
import { DashboardHeader } from "../Components/Dashboard/DashboardHeader.tsx";
import { DashboardContent } from "../Components/Dashboard/DashboardContent.tsx";
import { useTheme } from "../Context/ThemeContext.tsx";
import { useAuth } from "../auth/AuthContext.tsx";

export function AdminDashboard() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();
    const { token } = useAuth();

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
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <FallingLines color={isDark ? "#fff" : "#3B82F6"} width="60" visible />
            </div>
        );
    }

    return (
        <section className={`min-h-screen py-16 ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            {/* Grid bg */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#0F172A"} 1px, transparent 0)`, backgroundSize: "28px 28px" }} />

            <div className="relative max-w-7xl mx-auto px-6 py-12">
                <DashboardHeader users={users} surveys={surveys} theme={theme} />

                <div className="flex gap-8 mt-10 sm:flex-row flex-col">
                    <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

                    <DashboardContent
                        activeTab={activeTab}
                        users={users}
                        surveys={surveys}
                        allUsers={allUsers}
                        refreshUsers={refreshUsers}
                        theme={theme}
                        token={token}
                    />
                </div>
            </div>
        </section>
    );
}
