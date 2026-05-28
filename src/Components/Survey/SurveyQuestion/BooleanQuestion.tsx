import type { FC } from "react";
import type { PropsBooleanQuestion } from "../../../props.ts";
import { Check, X } from "lucide-react";

const OPTIONS = [
    { label: "Sì", value: true, desc: "La misura è attiva e implementata in azienda" },
    { label: "No", value: false, desc: "La misura non è ancora presente" },
];

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({ answer, onChange, isDark, onAutoSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            {OPTIONS.map(({ label, value, desc }) => {
                const isSelected = answer === value;

                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => { onChange(value); onAutoSelect?.(value); }}
                        className={`px-4 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group
                            ${isSelected
                                ? isDark
                                    ? "bg-sky-700/20 border-sky-500/50 text-sky-300 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                                    : "bg-sky-50 border-sky-500 text-sky-800"
                                : isDark
                                    ? "bg-[#111110] border-stone-800/40 text-slate-400 hover:border-stone-700/60 hover:text-slate-300"
                                    : "bg-[#F8FAFB] border-slate-200 text-slate-600 hover:border-sky-400 hover:bg-sky-50/50"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <span className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${isSelected
                                    ? "border-sky-500 bg-sky-500"
                                    : isDark ? "border-stone-700" : "border-slate-300"
                                }`}>
                                {isSelected && (
                                    value ? <Check size={10} className="text-white" /> : <X size={10} className="text-white" />
                                )}
                            </span>
                            <span className={`text-sm font-medium ${isSelected ? "" : ""}`}>{label}</span>
                        </div>
                        <p className={`text-[11px] mt-1.5 leading-relaxed pl-6 ${isSelected
                            ? isDark ? "text-sky-400/60" : "text-sky-600/70"
                            : isDark ? "text-slate-600" : "text-slate-400"
                        }`}>
                            {desc}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};
