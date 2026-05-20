import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import type { ArticleDTO } from "../../types/ArticleDTO";

export function ArticleCard({ article, theme }: { article: ArticleDTO; theme: string }) {
    const isDark = theme === "dark";
    const date = new Date(article.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

    return (
        <Link to={`/blog/${article.slug}`}>
            <motion.div
                className={`group relative rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
                    isDark
                        ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg hover:shadow-cyan-500/10"
                        : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
                whileHover={{ y: -4 }}
            >
                {/* Top glow bar */}
                {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />}
                
                <div className="p-6 flex flex-col flex-1">
                    {/* Category Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit mb-4 ${
                        isDark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-sky-50 text-sky-700 border border-sky-200"
                    }`}>
                        {article.category}
                    </span>

                    {/* Title */}
                    <h3 className={`text-xl font-semibold mb-3 line-clamp-2 group-hover:text-sky-500 transition-colors ${
                        isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-sm leading-relaxed mb-6 line-clamp-3 flex-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                        {article.content.replace(/[#*`_]/g, "").substring(0, 150)}...
                    </p>

                    {/* Footer */}
                    <div className={`flex items-center justify-between text-xs pt-4 border-t ${
                        isDark ? "border-stone-800/20 text-slate-500" : "border-slate-100 text-slate-400"
                    }`}>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Tag size={12} />
                            {article.tags.slice(0, 2).join(", ")}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
