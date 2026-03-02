import {createContext, type ReactNode, useContext, useEffect, useState} from "react"

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("light")

    // All’avvio, leggi dal localStorage o preferenza OS
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
        setTheme(initialTheme)
        document.documentElement.classList.toggle("dark", initialTheme === "dark")
    }, [])

    const toggleTheme = () => {
        setTheme(prev => {
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