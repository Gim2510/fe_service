import type { FC } from "react"
import type { PropsMultipleChoiceQuestion } from "../../../props.ts"

type MultipleChoiceQuestionProps = PropsMultipleChoiceQuestion & {
    variant?: string  // default = dark
}

export const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({options, answer, onChange, variant = "dark",}) => {
    const isDark = variant === "dark"

    return (
        <div className="grid gap-4 py-10">
            {options.map(option => {
                const isSelected = answer === option

                const baseClasses = `
                    w-full text-left px-6 py-5 rounded-2xl border
                    transition-all duration-300 cursor-pointer
                `

                const darkClasses = isSelected
                    ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"

                const lightClasses = isSelected
                    ? "bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] border-neutral-300 text-black backdrop-blur-md"
                    : "bg-white border-neutral-200 text-black/70 hover:bg-gray-100 hover:border-neutral-300"

                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`${baseClasses} ${isDark ? darkClasses : lightClasses}`}
                    >
                        <span className="text-lg font-medium">{option}</span>
                    </button>
                )
            })}
        </div>
    )
}