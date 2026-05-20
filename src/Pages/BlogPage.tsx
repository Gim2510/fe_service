import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import { useArticles } from "../hooks/useArticles";
import { ArticleCard } from "../Components/Blog/ArticleCard";
import { CategoryFilter } from "../Components/Blog/CategoryFilter";
import { Pagination } from "../Components/Blog/Pagination";
import type { ArticleCategory } from "../types/ArticleDTO";
import { Badge } from "../Components/Badge";

export function BlogPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [category, setCategory] = useState<ArticleCategory | undefined>(undefined);
    const [page, setPage] = useState(1);
    const limit = 9;

    const { articles, total, loading } = useArticles(category, page, limit);
    const totalPages = Math.ceil(total / limit);

    const handleCategoryChange = (cat: ArticleCategory | undefined) => {
        setCategory(cat);
        setPage(1);
    };

    return (
        <main className={`relative min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            {/* Grid background */}
            <div
                className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-12">
                {/* Header */}
                <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Badge label="Archivio" color="sky" theme={theme} />
                    <h1 className={`text-4xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Progetti & Insights
                    </h1>
                    <p className={`mt-2 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Approfondimenti tecnici, casi studio e novità dal mondo AxiomLab.
                    </p>
                </motion.header>

                {/* Filters */}
                <CategoryFilter active={category} onChange={handleCategoryChange} theme={theme} />

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className={`w-10 h-10 border-2 border-t-sky-500 rounded-full animate-spin ${isDark ? "border-stone-800" : "border-slate-200"}`} />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className={`text-lg ${isDark ? "text-slate-500" : "text-slate-400"}`}>Nessun articolo trovato.</p>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {articles.map((article, i) => (
                            <motion.div
                                key={article._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ArticleCard article={article} theme={theme} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination current={page} total={totalPages} onChange={setPage} theme={theme} />
                )}
            </div>
        </main>
    );
}
