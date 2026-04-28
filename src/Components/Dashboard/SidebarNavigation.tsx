import { motion } from "framer-motion";
import { LayoutGrid, Users, Search, Mail, Briefcase } from "lucide-react";

export type AdminTab =
    | "overview"
    | "users"
    | "inspect"
    | "messaging"
    | "careers"
    | "update job offers";

const TABS = [
    { key: "overview",  label: "Overview",         icon: LayoutGrid },
    { key: "users",     label: "User Management",  icon: Users },
    { key: "inspect",   label: "Inspect User",      icon: Search },
    { key: "messaging", label: "Messaging",         icon: Mail },
    { key: "careers",   label: "Careers",           icon: Briefcase },
];

export function SidebarNavigation({ activeTab, setActiveTab, theme }: {
    activeTab: string;
    setActiveTab: any;
    theme: string;
}) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`md:w-52 h-fit sm:sticky top-24 rounded-2xl border overflow-hidden flex flex-col ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-amber-700/60" />
            <div className="p-3 space-y-0.5">
                <p className={`text-[9px] font-mono uppercase tracking-[0.22em] px-3 py-2
                    ${isDark ? "text-stone-600" : "text-slate-400"}`}>
                    Navigation
                </p>
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-medium
                                transition-colors border
                                ${isActive
                                    ? isDark
                                        ? "bg-amber-700/15 border-amber-600/30 text-amber-400"
                                        : "bg-amber-50 border-amber-400 text-amber-800"
                                    : isDark
                                        ? "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/4"
                                        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-[#EDF2F7]"
                                }`}
                        >
                            <Icon size={13} className="shrink-0" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
