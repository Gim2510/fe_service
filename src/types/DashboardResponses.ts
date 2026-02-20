

export type SurveyDashboardStats = {
    totalResponses: number;

    draftResponses: number;
    publishedResponses: number;

    responsesLast7Days: number;
    responsesLast30Days: number;

    averageScore: number;
    minScore: number | null;
    maxScore: number | null;

    responsesByMonth: {
        month: string;
        count: number;
    }[];

    responsesBySurvey: {
        surveyId: string;
        count: number;
    }[];
};

export type UsersDashboardStats = {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    vipUsers: number;

    verifiedEmails: number;
    unverifiedEmails: number;

    newUsersLast7Days: number;
    newUsersLast30Days: number;

    usersByRole: {
        admin: number;
        user: number;
    };

    authDistribution: {
        password: number;
        google: number;
    };

    vipActive: number;
    vipExpired: number;

    averageFriends: number;
    averageFavorites: number;

    growthByMonth: {
        month: string;
        count: number;
    }[];
};
