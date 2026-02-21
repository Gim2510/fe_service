import type {PropsTextQuestion} from "../../props.ts";
import type {FC} from "react";

export const TextQuestion: FC<PropsTextQuestion> = ({ answer, onChange }) => (
    <div className="space-y-4 py-10">
    <textarea
        className="
        w-full min-h-[160px] p-6 rounded-2xl
        bg-white/5 border border-white/10
        text-white placeholder:text-white/50
        focus:outline-none focus:ring-2 focus:ring-white/20
        backdrop-blur-md transition
      "
        placeholder="Scrivi qui la tua risposta…"
        value={answer ?? ""}
        onChange={e => onChange(e.target.value)}
    />
        <div className="text-xs text-white/50 text-right">
            {answer?.length ?? 0} caratteri
        </div>
    </div>
)