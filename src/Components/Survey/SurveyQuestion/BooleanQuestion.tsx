import type { FC } from "react"
import type { PropsBooleanQuestion } from "../../../props.ts"
import { useTheme } from "../../../Context/ThemeContext.tsx"

const OPTIONS = [
    { label: "Sì", value: true },
    { label: "No", value: false },
]

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({ answer, onChange }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className="grid grid-cols-2 gap-6 py-10">
            {OPTIONS.map(({ label, value }) => {
                const isSelected = answer === value
                const selectedClasses = isDark
                    ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                    : "bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] border-neutral-300 text-black backdrop-blur-md"
                const unselectedClasses = isDark
                    ? "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                    : "bg-white border-neutral-200 text-black/70 hover:bg-gray-100 hover:border-neutral-300"

                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => onChange(value)}
                        className={`px-8 py-6 rounded-2xl border text-lg font-medium transition-all duration-300 cursor-pointer ${
                            isSelected ? selectedClasses : unselectedClasses
                        }`}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}