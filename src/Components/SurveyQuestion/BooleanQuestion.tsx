import type { FC } from "react"
import type { PropsBooleanQuestion } from "../../props"

const OPTIONS = [
    { label: "Sì", value: true },
    { label: "No", value: false },
]

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({answer, onChange,}) => {
    return (
        <div className="grid grid-cols-2 gap-6 py-10">
            {OPTIONS.map(({ label, value }) => {
                const isSelected = answer === value

                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => onChange(value)}
                        className={`
                            px-8 py-6 rounded-2xl border text-lg font-medium
                            transition-all duration-300 cursor-pointer
                            ${
                            isSelected
                                ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                        }
                        `}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}