import type { InputProps } from "../../types/InputTypes.ts";

export function Input({ label, name, type = "text", value, onChange, theme }: InputProps) {
    const isDark = theme === "dark";
    return (
        <div className="flex flex-col gap-2">
            <label className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {label}
            </label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                className={`px-4 py-2.5 rounded-lg border outline-none transition text-sm ${
                    isDark
                        ? "bg-[#111110] border-stone-800/30 text-slate-200 placeholder:text-slate-600 focus:border-amber-700 focus:ring-1 focus:ring-amber-600/30"
                        : "bg-[#F8FAFB] border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/20"
                }`}
            />
        </div>
    );
}
