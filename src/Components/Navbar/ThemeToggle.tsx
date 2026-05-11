import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Cambia tema"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                border transition-all duration-300 cursor-pointer
                ${isDark
                    ? "bg-[#F8FAFB]/5 border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-rose-800/40"
                    : "bg-[#EDF2F7] border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                }
            `}
        >
            <motion.span
                key={theme}
                initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.25 }}
            >
                {isDark
                    ? <Moon size={13} className="text-rose-500" />
                    : <Sun size={13} className="text-rose-500" />
                }
            </motion.span>
            <span>{isDark ? "Dark" : "Light"}</span>
        </button>
    );
}
