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
                className={`w-full px-4 py-2.5 pr-10 rounded-lg border outline-none transition text-sm ${
                    isDark
                        ? "bg-[#060D1B] text-slate-200"
                        : "bg-white text-slate-900"
                } ${
                    form.confirmPassword
                        ? passwordsMatch
                            ? "border-green-500 focus:ring-green-500/20"
                            : "border-red-500 focus:ring-red-500/20"
                        : isDark
                            ? "border-blue-900/30 focus:border-blue-600"
                            : "border-slate-200 focus:border-blue-500"
                } focus:ring-1`}
            />
            {form.confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch
                        ? <Check className="w-4 h-4 text-green-500" />
                        : <X className="w-4 h-4 text-red-500" />
                    }
                </div>
            )}
        </div>
    );
}
