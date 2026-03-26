import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-9 rounded-full p-1 backdrop-blur-xl bg-white/40 border border-white/30 shadow-inner transition-all duration-500 cursor-pointer"
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-transparent opacity-30 pointer-events-none" />
            <div
                className={`absolute top-1 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-xl shadow-lg transition-all duration-500 ${
                    theme === "dark"
                        ? "translate-x-7 shadow-[0_0_18px_rgba(255,255,255,0.25)] bg-neutral-900"
                        : "translate-x-0 shadow-[0_0_18px_rgba(0,0,0,0.15)] bg-neutral-50"
                }`}
            >
                <Sun
                    size={14}
                    className={`absolute transition-all duration-300 ${theme === "light" ? "opacity-100 scale-100 text-yellow-500" : "opacity-0 scale-75"}`}
                />
                <Moon
                    size={14}
                    className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 scale-100 text-white" : "opacity-0 scale-75"}`}
                />
            </div>
        </button>
    );
}