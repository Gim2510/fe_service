import type { InputProps } from "../../types/InputTypes.ts";

export function Input({ label, name, type = "text", value, onChange, theme }: InputProps) {
    const isDark = theme === "dark";
    return (
        <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-mono uppercase tracking-[0.15em]
                ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {label}
            </label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                className={`px-4 py-2.5 rounded-xl border outline-none transition text-sm
                    ${isDark
                        ? "bg-[#111110] border-stone-800/30 text-slate-200 placeholder:text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-600/20"
                        : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/15"
                    }`}
            />
        </div>
    );
}
