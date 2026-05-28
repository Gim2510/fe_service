import type { FC } from "react";
import type { PropsTextQuestion } from "../../../props.ts";

export const TextQuestion: FC<PropsTextQuestion> = ({ answer, onChange, isDark }) => {
    const value = answer ?? "";

    return (
        <div className="space-y-2">
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Scrivi qui la tua risposta…"
                rows={6}
                className={`w-full p-4 rounded-2xl border text-sm leading-relaxed resize-none
                    focus:outline-none focus:ring-2 transition-colors duration-200 backdrop-blur-sm
                    placeholder:text-slate-500
                    ${isDark
                        ? "bg-[#0E0E0D]/80 border-cyan-500/20 text-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/10"
                        : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-sky-600 focus:ring-sky-600/10"
                    }`}
            />
            <div className={`text-xs text-right tabular-nums ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                {value.length} caratteri
            </div>
        </div>
    );
};
