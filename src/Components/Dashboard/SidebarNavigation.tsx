import { motion } from "framer-motion";
import { LayoutGrid, Users, Search, Mail, Briefcase, BarChart3, Calendar } from "lucide-react";

export type AdminTab =
    | "overview"
    | "users"
    | "inspect"
    | "messaging"
    | "careers"
    | "update job offers"
    | "analytics"
    | "calendar";

const TABS = [
    { key: "overview",  label: "Overview",         icon: LayoutGrid },
    { key: "users",     label: "Utenti",           icon: Users },
    { key: "inspect",   label: "Ispeziona",        icon: Search },
    { key: "analytics", label: "Analytics",        icon: BarChart3 },
    { key: "calendar",  label: "Calendario",       icon: Calendar },
    { key: "messaging", label: "Messaggi",         icon: Mail },
    { key: "careers",   label: "Careers",          icon: Briefcase },
];

export function SidebarNavigation({ activeTab, setActiveTab, theme }: {
    activeTab: string;
    setActiveTab: any;
    theme: string;
}) {
    const isDark = theme === "dark";

    return (
        <motion.nav
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`md:w-56 h-fit sm:sticky top-24 rounded-2xl border overflow-hidden backdrop-blur-sm flex flex-col ${
                isDark
                    ? "border-stone-800/20 bg-[#0E0E0D]/80 shadow-lg shadow-sky-700/5"
                    : "border-slate-200 bg-white/80 shadow-md"
            }`}
        >
            <div className="h-[2px] w-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600" />

            <div className="p-3 space-y-1">
                <p className={`text-[9px] font-mono uppercase tracking-[0.22em] px-3 py-2
                    ${isDark ? "text-stone-600" : "text-slate-400"}`}>
                    Navigazione
                </p>

                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-xs font-medium
                                transition-all duration-200 overflow-hidden
                                ${isActive
                                    ? isDark
                                        ? "bg-sky-700/15 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.12)]"
                                        : "bg-sky-50 text-sky-700 shadow-sm"
                                    : isDark
                                        ? "text-slate-500 hover:text-sky-400 hover:bg-white/4"
                                        : "text-slate-500 hover:text-sky-700 hover:bg-slate-50"
                                }`}
                        >
                            <Icon size={14} className="shrink-0" />
                            {tab.label}

                            {isActive && isDark && (
                                <>
                                    <span className="absolute inset-y-0 left-0 w-0.5 bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                                    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-sky-500/40" />
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
        </motion.nav>
    );
}
