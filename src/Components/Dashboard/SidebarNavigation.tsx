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
        <div className="w-64 h-fit sticky top-24
      rounded-[32px]
      bg-white/[0.04]
      border border-white/[0.08]
      backdrop-blur-3xl
      p-6 space-y-2"
        >
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer
            ${activeTab === tab.key
                        ? "bg-white text-black font-medium"
                        : "text-neutral-400 hover:text-white"}
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}