import type {Dispatch, SetStateAction} from "react";

export type AdminTab =
    | "overview"
    | "users"
    | "inspect"
    | "messaging";

type Props = {
    activeTab: AdminTab;
    setActiveTab: Dispatch<SetStateAction<AdminTab>>;
};

export function SidebarNavigation({ activeTab, setActiveTab }: Props) {
    const tabs: { key: AdminTab; label: string }[] = [
        { key: "overview", label: "Overview" },
        { key: "users", label: "User Management" },
        { key: "inspect", label: "Inspect User" },
        { key: "messaging", label: "Messaging" },
    ];

    return (
        <div className="md:w-64 h-fit h-auto sm:sticky top-24 rounded-[32px] bg-white/[0.04] border border-white/[0.08] sm:rounded-none
        backdrop-blur-3xl p-6 space-y-2 flex flex-col md:flex-col">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`sm:px-4 sm:py-3 mt-2 mx-2 px-1 rounded-sm transition cursor-pointer sm:text-base text-sm sm:w-auto min-w-24 sm:h-auto h-11
            ${activeTab === tab.key
                        ? "bg-white/80 text-black font-medium backdrop-blur-xl"
                        : "text-neutral-400 hover:text-white"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}