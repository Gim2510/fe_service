import { useState, useEffect } from "react";
import type { ArticleDTO, ArticleCategory } from "../types/ArticleDTO";

export function useArticles(category?: ArticleCategory, page: number = 1, limit: number = 9) {
    const [articles, setArticles] = useState<ArticleDTO[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const article_base_url = import.meta.env.VITE_ARTICLE_BASE_URL;

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                });
                if (category) params.append("category", category);

                const response = await fetch(`${article_base_url}/v1/articles?${params}`);
                if (!response.ok) throw new Error("Failed to fetch articles");
                
                const data = await response.json();
                setArticles(data.items);
                setTotal(data.total);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, page, limit]);

    return { articles, total, loading, error };
}
