
export type AdminTab =
    | "overview"
    | "users"
    | "inspect"
    | "messaging";

export function SidebarNavigation({ activeTab, setActiveTab, theme }: { activeTab: string; setActiveTab: any; theme: string }) {
    const isDark = theme === "dark";

    const tabs = [
        { key: "overview", label: "Overview" },
        { key: "users", label: "User Management" },
        { key: "inspect", label: "Inspect User" },
        { key: "messaging", label: "Messaging" },
    ];

    return (
        <div className={`md:w-64 h-fit sm:sticky top-24 rounded-[32px] p-6 space-y-2 flex flex-col backdrop-blur-3xl transition-colors
            ${isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-white/50 border border-gray-200"}`}>
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`sm:px-4 sm:py-3 mt-2 mx-2 px-1 rounded-sm transition cursor-pointer sm:text-base text-sm sm:w-auto min-w-24 sm:h-auto h-11
                        ${activeTab === tab.key
                        ? `${isDark ? "bg-white/80 text-black" : "bg-indigo-200/50 text-indigo-900"} font-medium backdrop-blur-xl`
                        : `${isDark ? "text-neutral-400 hover:text-white" : "text-gray-700 hover:text-gray-900"}`
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}