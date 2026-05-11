import { useState } from "react";
import { X, Plus } from "lucide-react";

export function TagInput({ label, values, setValues, theme }: any) {
    const [input, setInput] = useState("");
    const isDark = theme === "dark";

    const inputStyle = `flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none transition-colors
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-rose-700"
            : "bg-white border-slate-200 text-slate-900 focus:border-rose-600"
        }`;

    const addTag = () => {
        if (!input.trim()) return;
        setValues([...values, input.trim()]);
        setInput("");
    };

    const removeTag = (index: number) => {
        setValues(values.filter((_: any, i: number) => i !== index));
    };

    return (
        <div className="space-y-3">
            <label className={`text-[10px] font-mono uppercase tracking-[0.15em]
                ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {label}
            </label>

            <div className="flex gap-2">
                <input
                    className={inputStyle}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl
                        bg-rose-700 hover:bg-rose-600 text-white text-sm font-semibold transition-colors"
                >
                    <Plus size={13} />
                </button>
            </div>

            {values.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {values.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
                                ${isDark
                                    ? "bg-rose-700/10 border-stone-800/30 text-rose-500"
                                    : "bg-rose-50 border-rose-300 text-rose-800"
                                }`}
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(i)}
                                className="hover:text-red-400 transition-colors cursor-pointer"
                            >
                                <X size={10} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
