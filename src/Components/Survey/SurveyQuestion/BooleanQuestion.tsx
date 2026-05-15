import type { FC } from "react";
import type { PropsBooleanQuestion } from "../../../props.ts";

const OPTIONS = [
    { label: "Sì", value: true },
    { label: "No", value: false },
];

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({ answer, onChange, isDark, onAutoSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {OPTIONS.map(({ label, value }) => {
                const isSelected = answer === value;

                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => { onChange(value); onAutoSelect?.(value); }}
                        className={`px-8 py-6 rounded-xl border text-base font-semibold
                            transition-all duration-200 cursor-pointer
                            ${isSelected
                                ? isDark
                                    ? "bg-sky-700/15 border-sky-600/40 text-sky-400"
                                    : "bg-sky-50 border-sky-500 text-sky-800"
                                : isDark
                                    ? "bg-[#1C1C1A]/60 border-stone-800/20 text-slate-400 hover:border-sky-800/30 hover:text-slate-200"
                                    : "bg-[#F8FAFB] border-slate-200 text-slate-600 hover:border-sky-400 hover:bg-sky-50/50"
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
