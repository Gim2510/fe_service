import type { FC } from "react";
import type { PropsScaleQuestion } from "../../../props.ts";
import { useTheme } from "../../../Context/ThemeContext.tsx";

export const ScaleQuestion: FC<PropsScaleQuestion> = ({ min = 1, max = 5, answer, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const value = typeof answer === "number" ? answer : Math.round((min + max) / 2);

    const pct = ((value - min) / (max - min)) * 100;

    return (
        <div className="space-y-6 py-8">
            <div className={`text-center text-5xl font-semibold tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {value}
            </div>

            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-amber-600
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:cursor-pointer"
                    style={{
                        background: isDark
                            ? `linear-gradient(to right, #3B82F6 ${pct}%, #1e3a5f ${pct}%)`
                            : `linear-gradient(to right, #3B82F6 ${pct}%, #e2e8f0 ${pct}%)`,
                    }}
                />
            </div>

            <div className={`flex justify-between text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};
