import React from "react";
import { NavLink } from "react-router-dom";

interface LiquidGlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
    variant?: "default" | "navbar";
    className?: string;
    color_text?: "white" | "black";
    type?: 'submit' | 'button';
    disabled?: boolean;
}

export function LiquidGlassButton({children, onClick, to, type = 'button', variant = "default", className = "", color_text = "white", disabled = false}: LiquidGlassButtonProps) {
    const baseStyle =
        `relative cursor-pointer rounded-2xl text-${color_text} backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden transition-all duration-300 group`;

    const sizeStyle =
        variant === "navbar"
            ? "px-5 py-2 text-sm font-medium hover:scale-105"
            : "px-10 py-4 text-sm sm:text-lg font-medium hover:scale-105 active:scale-95";

    const glowStyle =
        variant === "navbar"
            ? "shadow-md"
            : "shadow-[0_8px_32px_rgba(0,0,0,0.37)]";

    const content = (
        <>
            <span className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
            <span className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-cyan-400/30 via-red-400/30 to-yellow-400/30 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <span className="relative z-10 tracking-wide">{children}</span>
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
        <button disabled={disabled} onClick={onClick} className={`${baseStyle} ${sizeStyle} ${glowStyle} ${className}`} type={type}>
            {content}
        </button>
    );
}