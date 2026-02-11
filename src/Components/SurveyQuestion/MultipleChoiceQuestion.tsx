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
                        transition-all duration-200
                        ${
                        selected
                            ? "bg-gray-200 border-[#FF6B6B] ring-2 ring-[#FF6B6B]"
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
