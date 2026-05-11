import type { FC } from "react";
import type { PropsMultipleChoiceQuestion } from "../../../props.ts";

export const MultipleChoiceQuestion: FC<PropsMultipleChoiceQuestion> = ({ options, answer, onChange, isDark, multiple = false, onAutoSelect }) => {
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
        <div className="grid gap-3">
            {options.map(option => {
                const isSelected = multiple
                    ? Array.isArray(answer) && answer.includes(option)
                    : answer === option;

                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium
                            transition-all duration-200 cursor-pointer
                            ${isSelected
                                ? isDark
                                    ? "bg-rose-700/15 border-rose-600/40 text-rose-400"
                                    : "bg-rose-50 border-rose-500 text-rose-800"
                                : isDark
                                    ? "bg-[#1C1C1A]/60 border-stone-800/20 text-slate-300 hover:border-rose-800/30 hover:bg-[#1C1C1A]"
                                    : "bg-[#F8FAFB] border-slate-200 text-slate-700 hover:border-rose-400 hover:bg-rose-50/50"
                            }`}
                    >
                        <span className="flex items-center gap-3">
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                ${isSelected
                                    ? "border-rose-600 bg-rose-600"
                                    : isDark ? "border-stone-800/40" : "border-slate-300"
                                }`}
                            >
                                {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F8FAFB]" />
                                )}
                            </span>
                            {option}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
