import { Check, X } from "lucide-react";
import type { InputConfirmProps } from "../../types/InputTypes.ts";

export function InputConfirm({ form, handleChange, theme, passwordsMatch }: InputConfirmProps) {
    const isDark = theme === "dark";

    return (
        <div className="relative">
            <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 pr-10 rounded-xl border outline-none transition text-sm
                    ${isDark ? "bg-[#111110] text-slate-200" : "bg-white text-slate-900"}
                    ${form.confirmPassword
                        ? passwordsMatch
                            ? "border-green-500/60 focus:ring-green-500/15"
                            : "border-red-500/60 focus:ring-red-500/15"
                        : isDark
                            ? "border-stone-800/30 focus:border-emerald-700"
                            : "border-slate-200 focus:border-emerald-600"
                    } focus:ring-1 focus:outline-none`}
            />
            {form.confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch
                        ? <Check size={14} className="text-green-500" />
                        : <X      size={14} className="text-red-400" />
                    }
                </div>
            )}
        </div>
    );
}
