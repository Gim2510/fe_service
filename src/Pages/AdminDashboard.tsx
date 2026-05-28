import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import type { UserType } from "../types/userTypes";
import { useUsersDashboard } from "../hooks/useUserDarshboard";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { useTheme } from "../Context/ThemeContext.tsx";
import { useAuth } from "../auth/AuthContext.tsx";
import { KPISection } from "../Components/Dashboard/KPISection";
import { GrowthSection } from "../Components/Dashboard/GrowthSection";
import { SurveySection } from "../Components/Dashboard/SurveySection";
import { InsightsSection } from "../Components/Dashboard/InsightsSection";
import { AdvancedStats } from "../Components/Dashboard/AdvancedStats";
import { UserManagementPanel } from "../Components/Dashboard/Panels/UserManagementPanel.tsx";
import { UserInspectionPanel } from "../Components/Dashboard/Panels/UserInspectionPanel.tsx";
import { MessagingPanel } from "../Components/Dashboard/Panels/MessagingPanel.tsx";
import { CreateJobApplicationPanel } from "../Components/Dashboard/Panels/JobApplicationPanel.tsx";
import { CalendarView } from "../Components/Dashboard/CalendarView.tsx";
import { AnalyticsContent } from "../Components/Dashboard/AnalyticsContent.tsx";
import { LayoutDashboard, Users, BarChart3, Send, Briefcase, Calendar, TrendingUp } from "lucide-react";

type Tab = "overview" | "users" | "surveys" | "messaging" | "careers" | "calendar" | "analytics";

const TAB_DEFS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview",   label: "Panoramica",    icon: <LayoutDashboard size={14} /> },
    { id: "users",      label: "Utenti",         icon: <Users size={14} /> },
    { id: "surveys",    label: "Survey",         icon: <BarChart3 size={14} /> },
    { id: "messaging",  label: "Messaggi",       icon: <Send size={14} /> },
    { id: "careers",    label: "Carriere",       icon: <Briefcase size={14} /> },
    { id: "calendar",   label: "Calendario",     icon: <Calendar size={14} /> },
    { id: "analytics",  label: "Analytics",      icon: <TrendingUp size={14} /> },
];

export function AdminDashboard() {
    const { theme } = useTheme();
    const A = theme === "dark";
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();
    const { token } = useAuth();
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    async function refreshUsers() { const data = await getAllUsers(); setAllUsers(data); }
    useEffect(() => { refreshUsers(); }, []); // eslint-disable-line

    if (loadingUsers || loadingSurveys) return <div className={`min-h-screen flex items-center justify-center ${A ? "bg-[#0E0E0D]" : "bg-[#FAF8F4]"}`}><FallingLines color={A ? "#fff" : "#B45309"} width="60" visible /></div>;

    return (
        <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='%2306B6D4' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
            {A && <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent" />}

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-6">

                {/* ── HEADER + KPI ── */}
                <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${A ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />Admin Panel
                        </span>
                    </motion.div>
                    <KPISection users={users} surveys={surveys} theme={theme} />
                </div>

                {/* ── TAB BAR ── */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-1 overflow-x-auto scrollbar-none">
                    {TAB_DEFS.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                                    ${isActive
                                        ? (A ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]" : "bg-cyan-50 border-cyan-400 text-cyan-800")
                                        : (A ? "border-stone-800/30 text-slate-400 hover:text-cyan-400 hover:border-stone-700/40" : "border-slate-200 text-slate-500 hover:text-cyan-700 hover:bg-[#EDF2F7]")}`}>
                                {tab.icon}{tab.label}
                                {isActive && A && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />}
                            </button>
                        );
                    })}
                </motion.div>

                {/* ── TAB CONTENT ── */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: "easeOut" as const }}>

                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <GrowthSection users={users} theme={theme} />
                                    <div className="space-y-6">
                                        <InsightsSection users={users} surveys={surveys} theme={theme} />
                                    </div>
                                </div>
                                <AdvancedStats data={users} theme={theme} />
                            </div>
                        )}

                        {activeTab === "users" && (
                            <div className="space-y-6">
                                <UserManagementPanel allUsers={allUsers} refreshUsers={refreshUsers} theme={theme} />
                                <UserInspectionPanel allUsers={allUsers} theme={theme} />
                            </div>
                        )}

                        {activeTab === "surveys" && (
                            <SurveySection surveys={surveys} theme={theme} />
                        )}

                        {activeTab === "messaging" && <MessagingPanel theme={theme} />}
                        {activeTab === "careers" && <CreateJobApplicationPanel theme={theme} token={token} />}
                        {activeTab === "calendar" && <CalendarView theme={theme} />}
                        {activeTab === "analytics" && <AnalyticsContent />}

                    </motion.div>
                </AnimatePresence>

            </div>
        </main>
    );
}
