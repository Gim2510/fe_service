export const ApplicationStatus = {
    Opened: "opened",
    Draft: "draft",
    Closed: "closed",
    Pending: "pending"
} as const;

export type ApplicationStatus =
    typeof ApplicationStatus[keyof typeof ApplicationStatus];