import type { FC } from "react"
import type { PropsTextQuestion } from "../../../props.ts"
import { useTheme } from "../../../Context/ThemeContext.tsx"

export const TextQuestion: FC<PropsTextQuestion> = ({ answer, onChange }) => {
    const { theme } = useTheme()
    const value = answer ?? ""
    const isDark = theme === "dark"

    return (
        <div className="space-y-4 py-10">
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Scrivi qui la tua risposta…"
                className={`w-full min-h-[160px] p-6 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md transition ${
                    isDark ? "bg-white/5 border-white/10 text-white placeholder:text-white" : "bg-white border-neutral-200 text-black placeholder:text-black"
                }`}
            />
            <div className={`text-xs text-right ${isDark ? "text-white" : "text-black"}`}>
                {value.length} caratteri
            </div>
        </div>
    )
}