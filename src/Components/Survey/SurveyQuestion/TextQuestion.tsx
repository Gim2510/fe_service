import type { FC } from "react";
import type { PropsTextQuestion } from "../../../props.ts";
import { useTheme } from "../../../Context/ThemeContext.tsx";

export const TextQuestion: FC<PropsTextQuestion> = ({ answer, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const value = answer ?? "";

    return (
        <div className="space-y-2 py-8">
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Scrivi qui la tua risposta…"
                rows={6}
                className={`w-full p-4 rounded-xl border text-sm leading-relaxed resize-none
                    focus:outline-none focus:ring-2 transition-colors duration-200
                    placeholder:text-slate-500
                    ${isDark
                        ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-amber-700 focus:ring-amber-600/20"
                        : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-amber-600 focus:ring-amber-600/10"
                    }`}
            />
            <div className={`text-xs text-right tabular-nums ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                {value.length} caratteri
            </div>
        </div>
    );
};
