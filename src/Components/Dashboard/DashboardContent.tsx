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
};

export function DashboardContent({activeTab, users, surveys, allUsers, refreshUsers,}: Props) {

    return (
        <div className="flex-1">

            {activeTab === "overview" && (
                <OverviewPanel users={users} surveys={surveys} />
            )}

            {activeTab === "users" && (
                <UserManagementPanel
                    allUsers={allUsers}
                    refreshUsers={refreshUsers}
                />
            )}

            {activeTab === "inspect" && (
                <UserInspectionPanel allUsers={allUsers} />
            )}

            {activeTab === "messaging" && <MessagingPanel />}

        </div>
    );
}