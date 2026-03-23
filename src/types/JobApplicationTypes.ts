export type CreateJobPositionDTO = {
    _id: string
    id: string;
    userId: string;

    /* Identità posizione */

    slug: string;
    title: string;
    department: string;
    team?: string;

    /* Stato */

    status: "draft" | "open" | "closed" | "archived";
    publishedAt?: Date;
    expiresAt?: Date;

    /* Localizzazione */

    location: {
        country: string;
        city?: string;
        remote: boolean;
        remotePolicy?: "full-remote" | "hybrid" | "on-site";
        timezone?: string;
    };

    /* Tipo contratto */

    employment: {
        type:
            | "full-time"
            | "part-time"
            | "contract"
            | "internship"
            | "freelance";

        seniority:
            | "intern"
            | "junior"
            | "mid"
            | "senior"
            | "lead"
            | "principal";

        salary?: {
            min?: number;
            max?: number;
            currency?: string;
            period?: "year" | "month";
            visible: boolean;
        };
    };

    /* Descrizioni */

    summary: string;          // breve descrizione lista
    description: string;      // overview ruolo

    responsibilities: string[];
    requirements: string[];
    niceToHave?: string[];

    /* Informazioni azienda */

    benefits?: string[];

    techStack?: string[];

    hiringProcess?: {
        steps: string[];
        estimatedDuration?: string;
    };

    /* Metadata */

    tags?: string[];
    priority?: number;

    /* Statistiche */

    applicationsCount?: number;
    viewsCount?: number;

    /* SEO */

    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };

    /* Timestamp */

    createdAt: Date;
    updatedAt?: Date;
};

export type CreateJobPositionInput = {
    /* Identità posizione */

    slug: string;
    title: string;
    department: string;
    team?: string;

    /* Stato */

    status: "draft" | "open" | "closed" | "archived";
    expiresAt?: Date;

    /* Localizzazione */

    location: {
        country: string;
        city?: string;
        remote: boolean;
        remotePolicy?: "full-remote" | "hybrid" | "on-site";
        timezone?: string;
    };

    /* Tipo contratto */

    employment: {
        type:
            | "full-time"
            | "part-time"
            | "contract"
            | "internship"
            | "freelance";

        seniority:
            | "intern"
            | "junior"
            | "mid"
            | "senior"
            | "lead"
            | "principal";

        salary?: {
            min?: number;
            max?: number;
            currency?: string;
            period?: "year" | "month";
            visible: boolean;
        };
    };

    /* Descrizioni */

    summary: string;
    description: string;

    responsibilities: string[];
    requirements: string[];
    niceToHave?: string[];

    /* Informazioni azienda */

    benefits?: string[];

    techStack?: string[];

    hiringProcess?: {
        steps: string[];
        estimatedDuration?: string;
    };

    /* Metadata */

    tags?: string[];
    priority?: number;

    /* Statistiche */

    applicationsCount?: number;
    viewsCount?: number;

    /* SEO */

    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
};

export type JobApplicationInput = {
    name: string;
    email: string;
    social: string;
    description: string;
    cv: File | null;
}

