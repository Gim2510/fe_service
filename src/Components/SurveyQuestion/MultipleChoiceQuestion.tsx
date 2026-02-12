import type {PropsMultipleChoiceQuestion} from "../../props.ts";
import type {FC} from "react";

export const MultipleChoiceQuestion: FC<PropsMultipleChoiceQuestion> = ({
                                                                            options,
                                                                            answer,
                                                                            onChange,
                                                                        }) => (
    <div className="grid gap-4 py-10">
        {options.map(opt => {
            const selected = answer === opt

            return (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`
                        w-full text-left px-6 py-5 rounded-2xl border
                        transition-all duration-200 cursor-pointer
                        ${
                        selected
                            ? "bg-[#FFD93D] text-black border-[#FFD93D] ring-2 ring-[#FFD93D]"
                            : "bg-white border-slate-700 hover:border-slate-500"
                    }
                    `}
                >
                    <span className="text-lg font-medium text-black">
                        {opt}
                    </span>
                </button>
            )
        })}
    </div>
)
