import type {PropsBooleanQuestion} from "../../props.ts";
import type {FC} from "react";

export const BooleanQuestion: FC<PropsBooleanQuestion> = ({
                                                              answer,
                                                              onChange,
                                                          }) => {
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
                            px-8 py-6 rounded-2xl border text-lg font-medium
                            transition-all duration-200
                            ${
                            selected
                                ? "bg-gray-300 border-[#FF6B6B] ring-2 ring-[#FF6B6B] text-black"
                                : "bg-gray-200 border-slate-700 hover:border-slate-500 text-black"
                        }
                        `}
                    >
                        {opt.label}
                    </button>
                )
            })}
        </div>
    )
}
