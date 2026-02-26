import { useState } from "react";
import type { UserType } from "../../types/userTypes";
import {AdminShowSpecificUserSection} from "./AdminShowSpecificUserSection.tsx";

export function UserInspectionPanel({ allUsers }: { allUsers: UserType[] }) {
    const [selectedUserIdToShow, setSelectedUserIdToShow] = useState("");

    return (
        <AdminShowSpecificUserSection
            allUsers={allUsers}
            selectedUserIdToShow={selectedUserIdToShow}
            setSelectedUserIdToShow={setSelectedUserIdToShow}
        />
    );
}