import type { FC } from "react";
import type { PropsBooleanQuestion } from "../../../props.ts";
import { useTheme } from "../../../Context/ThemeContext.tsx";

const OPTIONS = [
    { label: "Sì", value: true },
    { label: "No", value: false },
];

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({ answer, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="grid grid-cols-2 gap-4 py-8">
            {OPTIONS.map(({ label, value }) => {
                const isSelected = answer === value;

                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => onChange(value)}
                        className={`px-8 py-6 rounded-xl border text-base font-semibold
                            transition-all duration-200 cursor-pointer
                            ${isSelected
                                ? isDark
                                    ? "bg-blue-600/15 border-blue-500/40 text-blue-300"
                                    : "bg-blue-50 border-blue-400 text-blue-700"
                                : isDark
                                    ? "bg-[#0D1A30]/60 border-blue-900/20 text-slate-400 hover:border-blue-700/30 hover:text-slate-200"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
