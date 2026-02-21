import type {PropsBooleanQuestion} from "../../props.ts";
import type {FC} from "react";

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({ answer, onChange }) => {
    const options = [
        { label: "Sì", value: true },
        { label: "No", value: false },
    ]

    return (
        <div className="grid grid-cols-2 gap-6 py-10">
            {options.map(opt => {
                const selected = answer === opt.value
                return (
                    <button
                        key={opt.label}
                        onClick={() => onChange(opt.value)}
                        className={`
              px-8 py-6 rounded-2xl border text-lg font-medium transition-all duration-300 cursor-pointer
              ${selected
                            ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"}
            `}
                    >
                        {opt.label}
                    </button>
                )
            })}
        </div>
    )
}