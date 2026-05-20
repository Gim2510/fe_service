export type ArticleCategory = "IT" | "AI" | "CloudOps";
export type ArticleStatus = "draft" | "published";

export type ArticleDTO = {
    _id: string;
    title: string;
    slug: string;
    content: string;
    category: ArticleCategory;
    author: string;
    date: string;
    tags: string[];
    status: ArticleStatus;
    created_at: string;
    updated_at: string;
};
