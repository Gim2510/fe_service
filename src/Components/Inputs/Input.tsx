import type {InputProps} from "../../types/InputTypes.ts";

export function Input({label, name, type = "text", value, onChange, theme,}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                className={`px-4 py-1 rounded-xl border outline-none transition ${
                    theme === "dark"
                        ? "bg-neutral-800 border-neutral-700 text-white focus:border-white focus:ring-white"
                        : "bg-white border-neutral-300 text-black focus:border-black focus:ring-black"
                } focus:ring-1`}
            />
        </div>
    )
}