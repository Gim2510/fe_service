import {useTheme} from "../../../Context/ThemeContext.tsx";
import type {FC} from "react";
import type {PropsMultipleChoiceQuestion} from "../../../props.ts";

type MultipleChoiceQuestionProps = PropsMultipleChoiceQuestion & { multiple?: boolean }

export const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({options, answer, onChange, multiple = false}) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const handleClick = (option: string) => {
        if (multiple) {
            // assicuriamoci di avere sempre un array
            const current = Array.isArray(answer) ? answer : []
            if (current.includes(option)) onChange(current.filter(a => a !== option))
            else onChange([...current, option])
        } else {
            onChange(option)
        }
    }

    return (
        <div className="grid gap-4 py-10">
            {options.map(option => {
                const isSelected = multiple
                    ? Array.isArray(answer) && answer.includes(option)
                    : answer === option

                const baseClasses = `
                    w-full text-left px-6 py-5 rounded-2xl border
                    transition-all duration-300 cursor-pointer
                `

                const selectedClasses = isDark
                    ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                    : "bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] border-neutral-300 text-black backdrop-blur-md"

                const unselectedClasses = isDark
                    ? "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                    : "bg-white border-neutral-200 text-black/70 hover:bg-gray-100 hover:border-neutral-300"

                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                    >
                        <span className="text-lg font-medium">{option}</span>
                    </button>
                )
            })}
        </div>
    )
}