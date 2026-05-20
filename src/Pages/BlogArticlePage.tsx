import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useArticle } from "../hooks/useArticle";
import ReactMarkdown from "react-markdown";
import { Badge } from "../Components/Badge";

export function BlogArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { article, loading, error } = useArticle(slug || "");

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <div className={`w-10 h-10 border-2 border-t-sky-500 rounded-full animate-spin ${isDark ? "border-stone-800" : "border-slate-200"}`} />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
                <div className="text-center space-y-4">
                    <p className="text-red-400">{error || "Articolo non trovato"}</p>
                    <Link to="/blog" className="text-sky-500 hover:underline">Torna al blog</Link>
                </div>
            </div>
        );
    }

    const date = new Date(article.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

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

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
                {/* Back button */}
                <Link
                    to="/blog"
                    className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${
                        isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                    }`}
                >
                    <ArrowLeft size={14} /> Tutti gli articoli
                </Link>

                {/* Header */}
                <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit mb-4 ${
                        isDark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-sky-50 text-sky-700 border border-sky-200"
                    }`}>
                        {article.category}
                    </span>
                    <h1 className={`text-3xl sm:text-4xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        {article.title}
                    </h1>
                    
                    <div className={`flex flex-wrap items-center gap-4 mt-6 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        <div className="flex items-center gap-1.5">
                            <User size={14} />
                            {article.author}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Tag size={14} />
                            {article.tags.join(", ")}
                        </div>
                    </div>
                </motion.header>

                {/* Divider */}
                <div className={`my-8 h-px ${isDark ? "bg-stone-800/30" : "bg-slate-200"}`} />

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`prose prose-lg max-w-none ${
                        isDark ? "prose-invert prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-sky-400" : "prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-sky-600"
                    }`}
                >
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </motion.article>
            </div>
        </main>
    );
}
