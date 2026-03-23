import {UserManagementPanel} from "./Panels/UserManagementPanel.tsx";
import type {AdminTab} from "./SidebarNavigation.tsx";
import type {UserType} from "../../types/userTypes.ts";
import {OverviewPanel} from "./Panels/OverviewPanel.tsx";
import {UserInspectionPanel} from "./Panels/UserInspectionPanel.tsx";
import {MessagingPanel} from "./Panels/MessagingPanel.tsx";
import {CreateJobApplicationPanel} from "./Panels/JobApplicationPanel.tsx";
import {UpdateJobApplicationPanel} from "./Panels/UpdateJobApplicationPanel.tsx";

type Props = {
    activeTab: AdminTab;
    users: any;
    surveys: any;
    allUsers: UserType[];
    refreshUsers: () => Promise<void>;
    theme: string;
    token: string | null;
};

export function DashboardContent({activeTab, users, surveys, allUsers, refreshUsers, theme, token}: Props) {
    return (
        <div className="flex-1 px-0 sm:px-4 md:px-8">
            {activeTab === "overview" && <OverviewPanel users={users} surveys={surveys} theme={theme} />}
            {activeTab === "users" && <UserManagementPanel allUsers={allUsers} refreshUsers={refreshUsers} theme={theme} />}
            {activeTab === "inspect" && <UserInspectionPanel allUsers={allUsers} theme={theme} />}
            {activeTab === "messaging" && <MessagingPanel theme={theme} />}
            {activeTab === "careers" && <CreateJobApplicationPanel theme={theme} token={token} />}
            {activeTab === "update job offers" && <UpdateJobApplicationPanel theme={theme} />}
        </div>
    );
}