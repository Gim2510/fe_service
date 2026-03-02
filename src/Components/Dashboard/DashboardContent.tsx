import {UserManagementPanel} from "./UserManagementPanel.tsx";
import type {AdminTab} from "./SidebarNavigation.tsx";
import type {UserType} from "../../types/userTypes.ts";
import {OverviewPanel} from "./OverviewPanel.tsx";
import {UserInspectionPanel} from "./UserInspectionPanel.tsx";
import {MessagingPanel} from "./MessagingPanel.tsx";

type Props = {
    activeTab: AdminTab;
    users: any;
    surveys: any;
    allUsers: UserType[];
    refreshUsers: () => Promise<void>;
    theme: string;
};

export function DashboardContent({activeTab, users, surveys, allUsers, refreshUsers, theme}: Props) {
    return (
        <div className="flex-1 px-0 sm:px-4 md:px-8">
            {activeTab === "overview" && <OverviewPanel users={users} surveys={surveys} theme={theme} />}
            {activeTab === "users" && <UserManagementPanel allUsers={allUsers} refreshUsers={refreshUsers} theme={theme} />}
            {activeTab === "inspect" && <UserInspectionPanel allUsers={allUsers} theme={theme} />}
            {activeTab === "messaging" && <MessagingPanel theme={theme} />}
        </div>
    );
}