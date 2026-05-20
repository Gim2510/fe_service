import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export function useSavedArticles() {
    const { id, token } = useAuth();
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Load from localStorage on mount (fallback for unauthenticated users)
    useEffect(() => {
        const saved = localStorage.getItem("saved_articles");
        if (saved) {
            setSavedSlugs(JSON.parse(saved));
        }
    }, []);

    const fetchSaved = useCallback(async () => {
        if (!token || !id) return;
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/articles/saved/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedSlugs(data.saved_articles || []);
            } else {
                console.warn("Failed to fetch saved articles:", response.status);
            }
        } catch (err) {
            console.error("Failed to fetch saved articles", err);
        } finally {
            setLoading(false);
        }
    }, [token, id]);

    const toggleSave = useCallback(async (slug: string) => {
        if (!token || !id) {
            // Fallback to localStorage for unauthenticated users
            const saved = localStorage.getItem("saved_articles");
            let articles: string[] = saved ? JSON.parse(saved) : [];
            const isSaved = articles.includes(slug);
            if (isSaved) {
                articles = articles.filter((s: string) => s !== slug);
            } else {
                articles.push(slug);
            }
            localStorage.setItem("saved_articles", JSON.stringify(articles));
            setSavedSlugs(articles);
            return;
        }

        const isSaved = savedSlugs.includes(slug);
        const endpoint = isSaved ? "unsave" : "save";

        try {
            const response = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/articles/${endpoint}/${id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedSlugs(data.saved_articles || []);
            } else {
                const errorText = await response.text();
                console.error("Failed to toggle save:", response.status, errorText);
            }
        } catch (err) {
            console.error("Failed to toggle save article", err);
        }
    }, [token, id, savedSlugs]);

    return { savedSlugs, loading, fetchSaved, toggleSave, isSaved: (slug: string) => savedSlugs.includes(slug) };
}
