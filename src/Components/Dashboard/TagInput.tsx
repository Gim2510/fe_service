import { useState } from "react";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

export function TagInput({label, values, setValues, theme}: any) {
    const [input, setInput] = useState("");

    const isDark = theme === "dark";

    const inputStyle = `w-full rounded-xl border px-3 py-2 text-sm ${
        isDark
            ? "bg-neutral-800 border-neutral-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
    }`;

    const addTag = () => {
        if (!input.trim()) return;

        setValues([...values, input.trim()]);
        setInput("");
    };

    const removeTag = (index: number) => {
        setValues(values.filter((_: any, i: number) => i !== index));
    };

    return (
        <div className="space-y-3">

            <label className="text-sm font-medium">{label}</label>

            <div className="flex gap-2">
                <input
                    className={inputStyle}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <LiquidGlassButton
                    variant='navbar'
                    scale={false}
                    onClick={addTag}
                    className="px-3 py-2 bg-blue-500 rounded-lg text-white"
                >
                    Add
                </LiquidGlassButton>
            </div>

            <div className="flex flex-wrap gap-2">
                {values.map((tag: string, i: number) => (
                    <LiquidGlassButton
                        variant='navbar'
                        key={i}
                        className=' !px-2'
                        scale={false}
                    >
                        {tag}

                        <button
                            type="button"
                            onClick={() => removeTag(i)}
                            className="text-red-400 ml-3 cursor-pointer"
                        >
                            ✕
                        </button>
                    </LiquidGlassButton>
                ))}
            </div>
        </div>
    );
}