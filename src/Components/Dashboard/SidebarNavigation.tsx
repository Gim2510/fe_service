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
            ${isDark ? "bg-[#0D1A30]/80 border-blue-900/20" : "bg-white border-slate-200"}`}>
            {TABS.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-colors border
                        ${activeTab === tab.key
                            ? isDark
                                ? "bg-blue-600/15 border-blue-500/30 text-blue-300"
                                : "bg-blue-50 border-blue-300 text-blue-700"
                            : isDark
                                ? "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
