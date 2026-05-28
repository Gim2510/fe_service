import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
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
import { Search, Users, Send, Briefcase, Calendar, BarChart3, ChevronDown } from "lucide-react";

type Section = "growth" | "users" | "inspect" | "messaging" | "careers" | "calendar" | "analytics";

export function AdminDashboard() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data: users, loading: loadingUsers } = useUsersDashboard();
    const { data: surveys, loading: loadingSurveys } = useSurveyDashboard();
    const { getAllUsers } = useGetAllUsers();
    const { token } = useAuth();
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [expandedSections, setExpandedSections] = useState<Set<Section>>(new Set(["growth", "users", "inspect"]));

    async function refreshUsers() { const data = await getAllUsers(); setAllUsers(data); }
    useEffect(() => { refreshUsers(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleSection = (s: Section) => setExpandedSections(prev => { const next = new Set(prev); if (next.has(s)) next.delete(s); else next.add(s); return next; });

    const A = isDark;

    if (loadingUsers || loadingSurveys) return <div className={`min-h-screen flex items-center justify-center ${A ? "bg-[#0E0E0D]" : "bg-[#FAF8F4]"}`}><FallingLines color={A ? "#fff" : "#B45309"} width="60" visible /></div>;

    return (
        <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='%2306B6D4' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
            {A && <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent" />}

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-8">

                {/* ═══ HEADER ═══ */}
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${A ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />Admin Panel
                    </span>
                    <h1 className={`text-2xl font-semibold mt-3 ${A ? "text-slate-100" : "text-slate-900"}`}>Dashboard</h1>
                </motion.div>

                {/* ═══ KPI STRIP ═══ */}
                <KPISection users={users} surveys={surveys} theme={theme} />

                {/* ═══ GROWTH + SURVEY ═══ */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <GrowthSection users={users} theme={theme} />
                    <SurveySection surveys={surveys} theme={theme} />
                </div>

                {/* ═══ ADVANCED STATS ═══ */}
                <AdvancedStats data={users} theme={theme} />

                {/* ═══ INSIGHTS ═══ */}
                <InsightsSection users={users} surveys={surveys} theme={theme} />

                {/* ═══ SECTION: GESTIONE UTENTI ═══ */}
                <CollapsibleSection title="Gestione Utenti" icon={<Users size={14} />} isDark={A} expanded={expandedSections.has("users")} onToggle={() => toggleSection("users")}>
                    <UserManagementPanel allUsers={allUsers} refreshUsers={refreshUsers} theme={theme} />
                </CollapsibleSection>

                {/* ═══ SECTION: ISPEZIONE UTENTI ═══ */}
                <CollapsibleSection title="Ispezione Utenti" icon={<Search size={14} />} isDark={A} expanded={expandedSections.has("inspect")} onToggle={() => toggleSection("inspect")}>
                    <UserInspectionPanel allUsers={allUsers} theme={theme} />
                </CollapsibleSection>

                {/* ═══ SECTION: MESSAGING ═══ */}
                <CollapsibleSection title="Comunicazioni" icon={<Send size={14} />} isDark={A} expanded={expandedSections.has("messaging")} onToggle={() => toggleSection("messaging")}>
                    <MessagingPanel theme={theme} />
                </CollapsibleSection>

                {/* ═══ SECTION: CAREERS ═══ */}
                <CollapsibleSection title="Posizioni Lavorative" icon={<Briefcase size={14} />} isDark={A} expanded={expandedSections.has("careers")} onToggle={() => toggleSection("careers")}>
                    <CreateJobApplicationPanel theme={theme} token={token} />
                </CollapsibleSection>

                {/* ═══ SECTION: CALENDAR ═══ */}
                <CollapsibleSection title="Calendario" icon={<Calendar size={14} />} isDark={A} expanded={expandedSections.has("calendar")} onToggle={() => toggleSection("calendar")}>
                    <CalendarView theme={theme} />
                </CollapsibleSection>

                {/* ═══ SECTION: ANALYTICS ═══ */}
                <CollapsibleSection title="Analytics" icon={<BarChart3 size={14} />} isDark={A} expanded={expandedSections.has("analytics")} onToggle={() => toggleSection("analytics")}>
                    <AnalyticsContent />
                </CollapsibleSection>

            </div>
        </main>
    );
}

function CollapsibleSection({ title, icon, children, isDark, expanded, onToggle }: { title: string; icon: React.ReactNode; children: React.ReactNode; isDark: boolean; expanded: boolean; onToggle: () => void }) {
    return (
        <div className="space-y-3">
            <button onClick={onToggle} className={`flex items-center gap-3 w-full group ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}>
                <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-r from-cyan-500/20 to-transparent" : ""}`} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                    <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>{icon}</span>
                    {title}
                    <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                </span>
                <div className={`h-px flex-1 ${isDark ? "bg-gradient-to-l from-cyan-500/20 to-transparent" : ""}`} />
            </button>
            {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    {children}
                </motion.div>
            )}
        </div>
    );
}
