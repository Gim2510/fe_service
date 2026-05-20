import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import { useArticles } from "../hooks/useArticles";
import { useSavedArticles } from "../hooks/useSavedArticles";
import { ArticleCard } from "../Components/Blog/ArticleCard";
import { CategoryFilter } from "../Components/Blog/CategoryFilter";
import { Pagination } from "../Components/Blog/Pagination";
import type { ArticleCategory } from "../types/ArticleDTO";
import { Badge } from "../Components/Badge";
import { Bookmark } from "lucide-react";

export function BlogPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [category, setCategory] = useState<ArticleCategory | undefined>(undefined);
    const [showSaved, setShowSaved] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 9;

    const { articles, total, loading } = useArticles(category, page, limit);
    const { savedSlugs, fetchSaved } = useSavedArticles();
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        fetchSaved();
    }, [fetchSaved]);

    const handleCategoryChange = (cat: ArticleCategory | undefined) => {
        setCategory(cat);
        setShowSaved(false);
        setPage(1);
        
        const duration = 1200;
        const start = window.scrollY;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, start * (1 - ease));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    const handleShowSaved = () => {
        setShowSaved(true);
        setCategory(undefined);
        setPage(1);
        
        const duration = 1200;
        const start = window.scrollY;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, start * (1 - ease));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    const filteredArticles = showSaved
        ? articles.filter(a => savedSlugs.includes(a.slug))
        : articles;

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

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-12">
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

                {/* Intro Section (Hidden when category selected) */}
                {!category && !showSaved && (
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className={`relative rounded-2xl border backdrop-blur-sm p-7 transition-all duration-300 ${
                                isDark
                                    ? "bg-[#0E0E0D]/70 border-cyan-500/50 shadow-lg shadow-cyan-500/15"
                                    : "bg-white/80 border-sky-400/50 shadow-sm shadow-sky-400/15 hover:border-sky-400/80 hover:shadow-md hover:shadow-sky-400/25"
                            }`}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {isDark && <div className="absolute top-0 right-0 w-14 h-14 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-bl from-cyan-400 to-transparent opacity-15" />}
                            <div className="max-w-3xl">
                                <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    Benvenuto nel Blog Tecnico
                                </h2>
                                <p className={`text-base leading-relaxed mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    Qui condividiamo le nostre esperienze reali nello sviluppo di soluzioni AI e infrastrutturali. 
                                    Ogni articolo è un "paper" pratico: documenta il problema, la metodologia scelta, 
                                    gli ostacoli incontrati e la soluzione implementata.
                                </p>
                                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Seleziona una categoria per filtrare i contenuti o esplora tutti gli articoli.
                                </p>
                            </div>
                        </motion.div>
                    </motion.section>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <CategoryFilter active={category} onChange={handleCategoryChange} theme={theme} />
                    <button
                        onClick={handleShowSaved}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            showSaved
                                ? isDark
                                    ? "bg-cyan-950/30 text-cyan-400 border border-cyan-500/30"
                                    : "bg-cyan-50 text-cyan-700 border border-cyan-200"
                                : isDark
                                    ? "bg-stone-900/50 text-slate-400 border border-stone-800/30 hover:text-slate-200"
                                    : "bg-white text-slate-500 border border-slate-200 hover:text-slate-700"
                        }`}
                    >
                        <Bookmark size={16} />
                        Salvati ({savedSlugs.length})
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className={`w-10 h-10 border-2 border-t-sky-500 rounded-full animate-spin ${isDark ? "border-stone-800" : "border-slate-200"}`} />
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className={`text-lg ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {showSaved ? "Nessun articolo salvato." : "Nessun articolo trovato."}
                        </p>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {filteredArticles.map((article, i) => (
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
                {!showSaved && totalPages > 1 && (
                    <Pagination current={page} total={totalPages} onChange={setPage} theme={theme} />
                )}
            </div>
        </main>
    );
}
