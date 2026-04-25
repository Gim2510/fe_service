import { useState } from "react";
import { X, Plus } from "lucide-react";

export function TagInput({label, values, setValues, theme}: any) {
    const [input, setInput] = useState("");

    const isDark = theme === "dark";

    const inputStyle = `flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none transition-colors ${
        isDark
            ? "bg-[#060D1B] border-blue-900/30 text-slate-200 focus:border-blue-600"
            : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"
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
            <label className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{label}</label>

            <div className="flex gap-2">
                <input
                    className={inputStyle}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                >
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {values.map((tag: string, i: number) => (
                    <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                            isDark
                                ? "bg-blue-600/10 border-blue-900/30 text-blue-400"
                                : "bg-blue-50 border-blue-200 text-blue-700"
                        }`}
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(i)}
                            className="hover:text-red-400 transition-colors cursor-pointer"
                        >
                            <X size={11} />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
