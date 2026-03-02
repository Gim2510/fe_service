import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

interface LiquidGlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
    variant?: "default" | "navbar";
    className?: string;
    type?: 'submit' | 'button';
    disabled?: boolean;
}

export function LiquidGlassButton({children, onClick, to, type = 'button', variant = "default", className = "", disabled = false}: LiquidGlassButtonProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Base style con tema automatico
    const baseStyle = `
        relative ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
        rounded-2xl text-${isDark ? "white" : "black"} 
        backdrop-blur-xl bg-${isDark ? "white/10" : "white/30"} 
        border border-${isDark ? "white/20" : "white/40"} 
        overflow-hidden transition-all duration-300 group
    `;

    const sizeStyle = variant === "navbar"
        ? "px-5 py-2 text-sm font-medium hover:scale-105"
        : `sm:px-10 px-2 py-4 text-sm sm:text-lg font-medium ${disabled ? "" : "hover:scale-105 active:scale-95"}`;

    const glowStyle = variant === "navbar"
        ? "shadow-md"
        : `shadow-[0_8px_32px_rgba(0,0,0,${isDark ? "0.37" : "0.15"})]`;

    const content = (
        <>
            <span className={`
                absolute inset-0 bg-gradient-to-br 
                from-white/${isDark ? "30" : "50"} 
                via-white/${isDark ? "10" : "30"} 
                to-transparent opacity-40 
                ${disabled ? "" : "group-hover:opacity-70"} 
                transition-opacity
            `} />
            <span className={`
                absolute -inset-[2px] rounded-full 
                bg-gradient-to-r 
                from-${isDark ? "cyan-400/30" : "cyan-200/40"} 
                via-${isDark ? "red-400/30" : "pink-200/30"} 
                to-${isDark ? "yellow-400/30" : "yellow-200/30"} 
                blur-xl opacity-0 
                ${disabled ? "" : "group-hover:opacity-50"} 
                transition-opacity duration-500
            `} />
            <span className="relative z-10 tracking-wide flex justify-center items-center">
                {children}
            </span>
        </>
    );

    if (to) {
        return (
            <NavLink to={to} className={`${baseStyle} ${sizeStyle} ${glowStyle} ${className}`}>
                {content}
            </NavLink>
        );
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyle} ${sizeStyle} ${glowStyle} ${className}`}
            type={type}
        >
            {content}
        </button>
    );
}