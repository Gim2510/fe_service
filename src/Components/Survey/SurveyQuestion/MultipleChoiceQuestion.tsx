import type { FC } from "react";
import type { PropsMultipleChoiceQuestion } from "../../../props.ts";
import { Check } from "lucide-react";

export const MultipleChoiceQuestion: FC<PropsMultipleChoiceQuestion> = ({ options, descriptions, answer, onChange, isDark, multiple = false, onAutoSelect }) => {
    const handleClick = (option: string) => {
        if (multiple) {
            const current = Array.isArray(answer) ? answer : [];
            const next = current.includes(option)
                ? current.filter(a => a !== option)
                : [...current, option];
            onChange(next);
        } else {
            onChange(option);
            onAutoSelect?.(option);
        }
    };

    return (
        <div className="grid gap-2">
            {options.map((option, idx) => {
                const isSelected = multiple
                    ? Array.isArray(answer) && answer.includes(option)
                    : answer === option;
                const desc = descriptions?.[idx];

                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer group
                            ${isSelected
                                ? isDark
                                    ? "bg-sky-700/20 border-sky-500/50 shadow-[0_0_10px_rgba(6,182,212,0.08)]"
                                    : "bg-sky-50 border-sky-500 text-sky-800"
                                : isDark
                                    ? "bg-[#111110] border-stone-800/40 hover:border-stone-700/60"
                                    : "bg-[#F8FAFB] border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${isSelected
                                    ? "border-sky-500 bg-sky-500"
                                    : isDark ? "border-stone-700" : "border-slate-300"
                                }`}>
                                {isSelected && <Check size={10} className="text-white" />}
                            </span>
                            <div className="min-w-0">
                                <span className={`text-sm font-medium leading-snug ${isSelected
                                    ? isDark ? "text-sky-300" : "text-sky-800"
                                    : isDark ? "text-slate-300" : "text-slate-700"
                                }`}>
                                    {option}
                                </span>
                                {desc && (
                                    <p className={`text-[11px] mt-1 leading-relaxed ${isSelected
                                        ? isDark ? "text-sky-400/60" : "text-sky-600/70"
                                        : isDark ? "text-slate-600" : "text-slate-400"
                                    }`}>
                                        {desc}
                                    </p>
                                )}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};
