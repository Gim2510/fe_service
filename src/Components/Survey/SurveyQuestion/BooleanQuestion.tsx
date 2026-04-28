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
                                    ? "bg-amber-700/15 border-amber-600/40 text-amber-400"
                                    : "bg-amber-50 border-amber-500 text-amber-800"
                                : isDark
                                    ? "bg-[#1C1C1A]/60 border-stone-800/20 text-slate-400 hover:border-amber-800/30 hover:text-slate-200"
                                    : "bg-[#F8FAFB] border-slate-200 text-slate-600 hover:border-amber-400 hover:bg-amber-50/50"
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
