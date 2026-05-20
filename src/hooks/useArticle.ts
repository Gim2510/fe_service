import { useState, useEffect } from "react";
import type { ArticleDTO } from "../types/ArticleDTO";

export function useArticle(slug: string) {
    const [article, setArticle] = useState<ArticleDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const article_base_url = import.meta.env.VITE_ARTICLE_BASE_URL;

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${article_base_url}/v1/articles/${slug}`);
                if (!response.ok) throw new Error("Article not found");
                const data = await response.json();
                setArticle(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchArticle();
    }, [slug]);

    return { article, loading, error };
}
