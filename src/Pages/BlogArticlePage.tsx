import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, BookmarkCheck, Check } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useArticle } from "../hooks/useArticle";
import { useSavedArticles } from "../hooks/useSavedArticles";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { MarkdownTable } from "../Components/Blog/MarkdownTable";

function ReadingProgress() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(currentProgress, 100));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 z-[9999] h-[2px] ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
            <motion.div
                className="h-full bg-gradient-to-r from-cyan-600 to-sky-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

function ShareButton({ title, isDark }: { title: string; isDark: boolean }) {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (err) {
                // User cancelled or share failed
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isDark ? "hover:bg-stone-800/50 text-slate-500 hover:text-slate-300" : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            }`}
        >
            {copied ? (
                <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-xs text-emerald-500">Copiato!</span>
                </>
            ) : (
                <Share2 size={16} />
            )}
        </button>
    );
}

function ArticleHero({ article, date, readTime }: { article: any; date: string; readTime: string }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { toggleSave, isSaved, fetchSaved } = useSavedArticles();

    useEffect(() => {
        fetchSaved();
    }, [fetchSaved]);

    const handleToggleSave = () => {
        toggleSave(article.slug);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative pt-8 pb-10 sm:pt-12 sm:pb-14"
        >
            {/* Category badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
            >
                <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                    isDark
                        ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30"
                        : "text-cyan-700 border-cyan-300 bg-cyan-50"
                }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    {article.category}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`font-fjalla text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight max-w-4xl ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}
            >
                {article.title}
            </motion.h1>

            {/* Subtitle/Abstract if present */}
            {article.abstract && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`mt-8 text-lg sm:text-xl leading-relaxed max-w-3xl ${
                        isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                    {article.abstract}
                </motion.p>
            )}

            {/* Meta bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`mt-6 flex flex-wrap items-center gap-6 text-sm ${
                    isDark ? "text-slate-500" : "text-slate-400"
                }`}
            >
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-50 text-cyan-700"
                    }`}>
                        {article.author.charAt(0)}
                    </div>
                    <span className={isDark ? "text-slate-300" : "text-slate-700"}>{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {date}
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {readTime} min di lettura
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                    <button
                        onClick={handleToggleSave}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                            isSaved(article.slug)
                                ? isDark ? "bg-cyan-950/30 text-cyan-400" : "bg-cyan-50 text-cyan-700"
                                : isDark ? "hover:bg-stone-800/50 text-slate-500 hover:text-slate-300" : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        {isSaved(article.slug) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>
                    <ShareButton title={article.title} isDark={isDark} />
                </div>
            </motion.div>

            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`mt-8 h-px w-full origin-left ${
                    isDark
                        ? "bg-gradient-to-r from-cyan-500/40 via-cyan-500/20 to-transparent"
                        : "bg-gradient-to-r from-cyan-400/40 via-cyan-400/20 to-transparent"
                }`}
            />
        </motion.div>
    );
}

function ArticleContent({ article, isDark }: { article: any; isDark: boolean }) {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`font-recursive text-base sm:text-lg leading-[1.8] ${
                isDark ? "text-slate-300" : "text-slate-700"
            }`}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className={`font-fjalla text-3xl sm:text-4xl font-semibold mt-12 mb-5 leading-tight tracking-tight ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className={`font-fjalla text-2xl sm:text-3xl font-semibold mt-10 mb-4 leading-tight tracking-tight ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`} {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className={`font-fjalla text-xl sm:text-2xl font-semibold mt-8 mb-3 leading-snug ${
                            isDark ? "text-slate-200" : "text-slate-800"
                        }`} {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4 className={`font-fjalla text-lg font-semibold mt-6 mb-2 ${
                            isDark ? "text-slate-200" : "text-slate-800"
                        }`} {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="mb-6" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`} {...props} />
                    ),
                    em: ({ node, ...props }) => (
                        <em className={isDark ? "text-slate-400" : "text-slate-600"} {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className={`underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-500 transition-colors ${
                            isDark ? "text-cyan-400" : "text-cyan-700"
                        }`} {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-none space-y-2 mb-6 pl-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-none space-y-2 mb-6 pl-2 counter-reset-item" {...props} />
                    ),
                    li: ({ node, children, ...props }) => (
                        <li className={`flex items-start gap-3 ${isDark ? "text-slate-300" : "text-slate-700"}`} {...props}>
                            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                                isDark ? "bg-cyan-500/60" : "bg-cyan-600"
                            }`} />
                            <span>{children}</span>
                        </li>
                    ),
                    img: ({ node, ...props }) => (
                        <span className="block my-8 -mx-6 sm:-mx-12">
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    {...props}
                                    className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 hover:scale-[1.02]"
                                    loading="lazy"
                                />
                                <div className={`absolute inset-0 pointer-events-none rounded-2xl ${
                                    isDark
                                        ? "shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]"
                                        : "shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]"
                                }`} />
                            </div>
                            {props.alt && (
                                <span className={`block text-center text-sm mt-4 italic font-recursive ${
                                    isDark ? "text-slate-500" : "text-slate-500"
                                }`}>
                                    {props.alt}
                                </span>
                            )}
                        </span>
                    ),
                    table: ({ children }) => (
                        <div className="my-10">
                            <MarkdownTable>{children}</MarkdownTable>
                        </div>
                    ),
                    blockquote: ({ node, children, ...props }) => (
                        <blockquote
                            className={`relative my-8 pl-8 pr-4 py-5 border-l-2 italic ${
                                isDark
                                    ? "border-cyan-500/40 bg-cyan-950/20 text-slate-400"
                                    : "border-cyan-500 bg-cyan-50/50 text-slate-600"
                            }`}
                            {...props}
                        >
                            <span className={`absolute top-3 left-3 text-4xl leading-none ${
                                isDark ? "text-cyan-500/20" : "text-cyan-500/30"
                            }`}>
                                "
                            </span>
                            <div className="relative z-10">{children}</div>
                        </blockquote>
                    ),
                    hr: ({ node, ...props }) => (
                        <div className={`my-12 h-px ${
                            isDark
                                ? "bg-gradient-to-r from-transparent via-stone-800/50 to-transparent"
                                : "bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                        }`} {...props} />
                    ),
                    code: ({ node, className, children, ...props }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                                isDark
                                    ? "bg-stone-800/50 text-cyan-400"
                                    : "bg-slate-100 text-cyan-700"
                            }`} {...props}>{children}</code>
                        ) : (
                            <pre className={`my-8 p-6 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed ${
                                isDark
                                    ? "bg-[#0A0A09] border border-stone-800/30 text-slate-300"
                                    : "bg-slate-50 border border-slate-200 text-slate-800"
                            }`}><code className={className} {...props}>{children}</code></pre>
                        );
                    },
                }}
            >
                {article.content}
            </ReactMarkdown>
        </motion.article>
    );
}

function ArticleFooter({ article, isDark }: { article: any; isDark: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mt-20 pt-10 border-t ${isDark ? "border-stone-800/30" : "border-slate-200"}`}
        >
            {/* Tags */}
            <div className="mb-8">
                <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    Tag
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                isDark
                                    ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50"
                                    : "border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Author box */}
            <div className={`rounded-2xl border p-8 ${
                isDark
                    ? "bg-[#0E0E0D]/80 border-stone-800/20"
                    : "bg-white border-slate-200 shadow-sm"
            }`}>
                <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shrink-0 ${
                        isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-50 text-cyan-700"
                    }`}>
                        {article.author.charAt(0)}
                    </div>
                    <div>
                        <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            {article.author}
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                            Team Engineering di AxiomLab. Costruiamo ponti tra tecnologia e imprese.
                        </p>
                    </div>
                </div>
            </div>

            {/* Back to blog */}
            <div className="mt-12 text-center">
                <Link
                    to="/blog"
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                        isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-700 hover:text-cyan-600"
                    }`}
                >
                    <ArrowLeft size={14} />
                    Torna a tutti gli articoli
                </Link>
            </div>
        </motion.div>
    );
}

export function BlogArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { article, loading, error } = useArticle(slug || "");
    const navigate = useNavigate();

    // Calculate read time (rough estimate: 200 words per minute)
    const readTime = article ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200)).toString() : "0";
    const date = article ? new Date(article.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : "";

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <div className={`w-10 h-10 border-2 border-t-cyan-500 rounded-full animate-spin ${isDark ? "border-stone-800" : "border-slate-200"}`} />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
                <div className="text-center space-y-6">
                    <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>{error || "Articolo non trovato"}</p>
                    <button
                        onClick={() => navigate("/blog")}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200 ${
                            isDark
                                ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                                : "bg-cyan-700 hover:bg-cyan-600 text-white"
                        }`}
                    >
                        Torna al blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className={`relative min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <ReadingProgress />

            {/* Grid background */}
            <div
                className={`fixed inset-0 pointer-events-none ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Vignette */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(to right, ${isDark ? "#111110" : "#FAF8F4"} 0%, transparent 15%, transparent 85%, ${isDark ? "#111110" : "#FAF8F4"} 100%)`,
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 pb-20">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pt-24"
                >
                    <Link
                        to="/blog"
                        className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                            isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                        }`}
                    >
                        <ArrowLeft size={12} /> Archivio
                    </Link>
                </motion.div>

                <ArticleHero article={article} date={date} readTime={readTime} />
                <ArticleContent article={article} isDark={isDark} />
                <ArticleFooter article={article} isDark={isDark} />
            </div>
        </main>
    );
}
