import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
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
    const { data: users,   loading: loadingUsers }   = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();
    const { token } = useAuth();

    const [activeTab, setActiveTab] = useState<AdminTab>("overview");
    const [allUsers,  setAllUsers]  = useState<UserType[]>([]);

    async function refreshUsers() {
        const data = await getAllUsers();
        setAllUsers(data);
    }

    useEffect(() => { refreshUsers(); }, []);

    if (loadingUsers || loadingSurveys) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width="60" visible />
            </div>
        );
    }

    return (
        <main className={`min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>

            {/* subtle grid bg */}
            <div
                className="fixed inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <DashboardHeader users={users} surveys={surveys} theme={theme} />
                </motion.div>

                {/* divider */}
                <div className={`my-10 h-px ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />

                <div className="flex gap-6 sm:flex-row flex-col">
                    <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2, ease: "easeOut" as const }}
                            >
                                <DashboardContent
                                    activeTab={activeTab}
                                    users={users}
                                    surveys={surveys}
                                    allUsers={allUsers}
                                    refreshUsers={refreshUsers}
                                    theme={theme}
                                    token={token}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
