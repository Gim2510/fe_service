import {Check, X} from "lucide-react";
import type {InputConfirmProps} from "../../types/InputTypes.ts";

export function InputConfirm({form, handleChange, theme, passwordsMatch}: InputConfirmProps) {
    return (
        <div className="relative">

            <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-1 pr-10 rounded-xl border outline-none transition
                ${
                    theme === "dark"
                        ? "bg-neutral-800 text-white"
                        : "bg-white text-black"
                }
                ${
                    form.confirmPassword
                        ? passwordsMatch
                            ? "border-green-500"
                            : "border-red-500"
                        : theme === "dark"
                            ? "border-neutral-700"
                            : "border-neutral-300"
                }
            `}
            />

            {form.confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                        <Check className="w-5 h-5 text-green-500"/>
                    ) : (
                        <X className="w-5 h-5 text-red-500"/>
                    )}
                </div>
            )}

        </div>
    )
}