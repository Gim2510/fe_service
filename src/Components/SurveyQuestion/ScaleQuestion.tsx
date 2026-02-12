import type {PropsScaleQuestion} from "../../props.ts";
import type {FC} from "react";

export const ScaleQuestion: FC<PropsScaleQuestion> = ({
                                                          min = 1,
                                                          max = 5,
                                                          answer,
                                                          onChange,
                                                      }) => {
    const value = answer ?? Math.round((min + max) / 2)

    return (
        <div className="space-y-6 py-10">
            <div className="text-center text-4xl font-light text-white">
                {value}
            </div>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full accent-[#FFD93D] cursor-pointer"
            />

            <div className="flex justify-between text-sm text-slate-500">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    )
}
