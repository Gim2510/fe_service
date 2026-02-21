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
            transition-all duration-300 cursor-pointer
            ${selected
                        ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"}
          `}
                >
                    <span className="text-lg font-medium">{opt}</span>
                </button>
            )
        })}
    </div>
)