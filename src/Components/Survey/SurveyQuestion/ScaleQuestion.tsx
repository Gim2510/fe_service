import type { FC } from "react"
import type { PropsScaleQuestion } from "../../../props.ts"
import {useTheme} from "../../../Context/ThemeContext.tsx";

export const ScaleQuestion: FC<PropsScaleQuestion> = ({min = 1, max = 5, answer, onChange,}) => {
    const {theme} = useTheme()
    const value =
        typeof answer === "number"
            ? answer
            : Math.round((min + max) / 2)

    return (
        <div className="space-y-6 py-10">
            <div className={`text-center text-4xl font-light ${theme === "dark" ? "text-white/50" : "text-black"}`}>
                {value}
            </div>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className={`w-full accent-white/60 cursor-pointer`}
            />

            <div className={`flex justify-between text-sm ${theme === "dark" ? "text-white/50" : "text-black"}`}>
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    )
}