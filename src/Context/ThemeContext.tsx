import {createContext, type ReactNode, useContext, useEffect, useState} from "react"

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "light",
    toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light")

    // All’avvio, leggi dal localStorage o preferenza OS
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = (savedTheme || (prefersDark ? "dark" : "light")) as Theme
        setTheme(initialTheme)
        document.documentElement.classList.toggle("dark", initialTheme === "dark")
    }, [])

    const toggleTheme = () => {
        setTheme((prev: Theme) => {
            const next = prev === "dark" ? "light" : "dark"
            document.documentElement.classList.toggle("dark", next === "dark")
            localStorage.setItem("theme", next)
            return next
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)