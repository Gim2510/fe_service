import type { ArticleCategory } from "../../types/ArticleDTO";

const categories: { label: string; value: ArticleCategory | undefined }[] = [
    { label: "Tutti", value: undefined },
    { label: "IT", value: "IT" },
    { label: "AI", value: "AI" },
    { label: "CloudOps", value: "CloudOps" },
];

export function CategoryFilter({ active, onChange, theme }: { active: ArticleCategory | undefined; onChange: (cat: ArticleCategory | undefined) => void; theme: string }) {
    const isDark = theme === "dark";

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
                const isActive = active === cat.value;
                return (
                    <button
                        key={cat.label}
                        onClick={() => onChange(cat.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                            isActive
                                ? isDark
                                    ? "bg-sky-700/15 border-sky-600/30 text-sky-400"
                                    : "bg-sky-50 border-sky-400 text-sky-800"
                                : isDark
                                    ? "border-stone-800/20 text-slate-500 hover:text-slate-300 hover:border-stone-800/40"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
}
