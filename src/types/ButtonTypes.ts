import React from "react";

export interface LiquidGlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
    variant?: "default" | "navbar";
    className?: string;
    type?: "submit" | "button";
    disabled?: boolean;
    scale?: boolean;

    fillBackground?: "main" | "cta" | "secondary" | "none"
}