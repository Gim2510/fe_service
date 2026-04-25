import { useTheme } from "../../../Context/ThemeContext.tsx";
import type { FC } from "react";
import type { PropsMultipleChoiceQuestion } from "../../../props.ts";

type MultipleChoiceQuestionProps = PropsMultipleChoiceQuestion & { multiple?: boolean }

export const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({ options, answer, onChange, multiple = false }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleClick = (option: string) => {
        if (multiple) {
            const current = Array.isArray(answer) ? answer : [];
            if (current.includes(option)) onChange(current.filter(a => a !== option));
            else onChange([...current, option]);
        } else {
            onChange(option);
        }
    };

    return (
        <div className="grid gap-3 py-8">
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
                                    ? "bg-blue-600/15 border-blue-500/40 text-blue-300"
                                    : "bg-blue-50 border-blue-400 text-blue-700"
                                : isDark
                                    ? "bg-[#0D1A30]/60 border-blue-900/20 text-slate-300 hover:border-blue-700/30 hover:bg-[#0D1A30]"
                                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                    >
                        <span className="flex items-center gap-3">
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                ${isSelected
                                    ? "border-blue-500 bg-blue-500"
                                    : isDark ? "border-blue-900/40" : "border-slate-300"
                                }`}
                            >
                                {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
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
