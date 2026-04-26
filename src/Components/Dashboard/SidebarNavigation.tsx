export type AdminTab =
    | "overview"
    | "users"
    | "inspect"
    | "messaging"
    | "careers"
    | "update job offers";

const TABS = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "User Management" },
    { key: "inspect", label: "Inspect User" },
    { key: "messaging", label: "Messaging" },
    { key: "careers", label: "Careers" },
    { key: "update job", label: "Update Job Offers" },
];

export function SidebarNavigation({ activeTab, setActiveTab, theme }: { activeTab: string; setActiveTab: any; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className={`md:w-56 h-fit sm:sticky top-24 rounded-2xl border p-4 space-y-1 flex flex-col
            ${isDark ? "bg-[#1C1C1A]/80 border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"}`}>
            {TABS.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-colors border
                        ${activeTab === tab.key
                            ? isDark
                                ? "bg-amber-700/15 border-amber-600/30 text-amber-400"
                                : "bg-amber-50 border-amber-400 text-amber-800"
                            : isDark
                                ? "border-transparent text-slate-500 hover:text-slate-300 hover:bg-[#F8FAFB]/5"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-[#EDF2F7]"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
