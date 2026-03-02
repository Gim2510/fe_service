import type { FC } from "react"
import type { PropsTextQuestion } from "../../props"

export const TextQuestion: FC<PropsTextQuestion> = ({answer, onChange,}) => {
    const value = answer ?? ""

    return (
        <div className="space-y-4 py-10">
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Scrivi qui la tua risposta…"
                className="
                    w-full min-h-[160px] p-6 rounded-2xl
                    bg-white/5 border border-white/10
                    text-white placeholder:text-white/50
                    focus:outline-none focus:ring-2 focus:ring-white/20
                    backdrop-blur-md transition
                "
            />

            <div className="text-xs text-white/50 text-right">
                {value.length} caratteri
            </div>
        </div>
    )
}