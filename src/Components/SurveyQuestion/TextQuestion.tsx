import type {PropsTextQuestion} from "../../props.ts";
import type {FC} from "react";

export const TextQuestion: FC<PropsTextQuestion> = ({
                                                        answer,
                                                        onChange,
                                                    }) => (
    <div className="space-y-4">
        <textarea
            className="
                w-full min-h-[160px] p-6 rounded-2xl
                bg-gray-200 border border-slate-700
                text-black placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]
                transition
            "
            placeholder="Scrivi qui la tua risposta…"
            value={answer ?? ""}
            onChange={e => onChange(e.target.value)}
        />
        <div className="text-xs text-slate-500 text-right">
            {answer?.length ?? 0} caratteri
        </div>
    </div>
)
