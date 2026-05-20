import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ current, total, onChange, theme }: { current: number; total: number; onChange: (page: number) => void; theme: string }) {
    const isDark = theme === "dark";

    if (total <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 pt-8">
            <button
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
                className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark ? "border-stone-800/20 text-slate-400 hover:text-white" : "border-slate-200 text-slate-500 hover:text-slate-900"
                }`}
            >
                <ChevronLeft size={16} />
            </button>

            {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all border ${
                        current === page
                            ? isDark
                                ? "bg-sky-700/15 border-sky-600/30 text-sky-400"
                                : "bg-sky-50 border-sky-400 text-sky-800"
                            : isDark
                                ? "border-stone-800/20 text-slate-500 hover:text-slate-300"
                                : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onChange(current + 1)}
                disabled={current === total}
                className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark ? "border-stone-800/20 text-slate-400 hover:text-white" : "border-slate-200 text-slate-500 hover:text-slate-900"
                }`}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
