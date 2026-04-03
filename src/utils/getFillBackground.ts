import type {LiquidGlassButtonProps} from "../types/ButtonTypes.ts";

export const getFillBackground = (type: LiquidGlassButtonProps["fillBackground"]) => {
    switch (type) {
        case "main":
            return `
                bg-gradient-to-br 
                from-[#BD1E1E] 
                via-[#8F1616] 
                to-[#E23A3A]
            `;

        case "cta":
            return `
                bg-gradient-to-br 
                from-[#BD1E1E] 
                via-[#E7A1A1] 
                to-[#F6E2E2]
            `;

        case "secondary":
            return `
                bg-gradient-to-br 
                from-red-700 
                via-red-800 
                to-red-700
            `;

        default:
            return "";
    }
};