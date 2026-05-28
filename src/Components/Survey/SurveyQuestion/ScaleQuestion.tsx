import type { FC } from "react";
import type { PropsScaleQuestion } from "../../../props.ts";

export const ScaleQuestion: FC<PropsScaleQuestion> = ({ min = 1, max = 5, answer, onChange, isDark, onAutoSelect }) => {
    const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const isWide = steps.length > 7;

    return (
        <div className="space-y-4">
            <div className={`flex ${isWide ? "flex-wrap" : ""} gap-2`}>
                {steps.map(n => {
                    const isSelected = answer === n;
                    return (
                        <button
                            key={n}
                            type="button"
                            onClick={() => { onChange(n); onAutoSelect?.(n); }}
                            className={`
                                ${isWide ? "min-w-[2.75rem]" : "flex-1"}
                                py-3 rounded-xl border text-sm font-semibold
                                transition-all duration-200 cursor-pointer
                                ${isSelected
                                    ? isDark
                                        ? "bg-sky-700/20 border-sky-500/50 text-sky-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                        : "bg-sky-50 border-sky-500 text-sky-800"
                                    : isDark
                                        ? "bg-[#111110] border-stone-800/40 text-slate-400 hover:border-stone-700/60 hover:text-slate-200"
                                        : "bg-[#F8FAFB] border-slate-200 text-slate-600 hover:border-sky-400 hover:bg-sky-50/50"
                                }`}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>
            <div className={`flex justify-between text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                <span>{min} — minimo</span>
                <span>massimo — {max}</span>
            </div>
        </div>
    );
};
