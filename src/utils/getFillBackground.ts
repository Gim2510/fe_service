import type {LiquidGlassButtonProps} from "../types/ButtonTypes.ts";

export const getFillBackground = (type: LiquidGlassButtonProps["fillBackground"]) => {
    switch (type) {
        case "main":
            return `
                bg-gradient-to-br 
                from-[#2563EBFF] 
                via-[#2258CBFF] 
                to-[#1E4FB9FF]
            `;

        case "cta":
            return `
                bg-gradient-to-br 
                from-[#2563EBFF] 
                via-[#2258CBFF] 
                to-[#1E4FB9FF]
            `;

        case "secondary":
            return `
                bg-gradient-to-br 
                from-[#2563EBFF] 
                via-[#2258CBFF] 
                to-[#1E4FB9FF]
            `;

        default:
            return "";
    }
};