import type {UserRoles} from "./userRoles.ts";

export type UserType = {
    _id: string;
    id: string;
    password: string;
    email: string;
    fiscal_code: string;
    partita_iva: string;
    user_image?: string;
    given_name: string;
    family_name: string;
    favorites?: string[];
    last_login?: Date;
    lastEmailChange?: Date;
    emailVerified: boolean;
    isSuspended?: boolean;
    friends?: string[];
    pendingFriendshipRequests?: string[];
    vip: boolean;
    expirationDate?: Date;
    ownerTotalScore?: number;
    userTotalScore?: number;
    role: UserRoles;
    auth: {
        type: "password" | "oauth";
        provider?: "google";
        providerUserId?: string;
    };
    emailVerificationToken: string | null;
    deleted?: {
        emailBeforeDeletion: string;
        deletedAt: Date;
        authIdBeforeDeletion: string;
    };
    lastLogIn?: Date;
    relations?: string[];
    pendingRequests?: string[];
    deposit?: string[];
    inactive?: boolean;
}