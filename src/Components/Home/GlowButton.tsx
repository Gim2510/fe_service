import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps {
    children: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
    className?: string;
}

export function GlowButton({ children, onClick, variant = "primary", className = "" }: GlowButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <motion.button
            onClick={onClick}
            className={`group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                text-sm font-semibold transition-all duration-300
                hover:-translate-y-0.5 active:translate-y-0
                ${isPrimary
                    ? "bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white"
                    : "bg-transparent text-sky-400 border border-sky-600/40"
                }
                ${className}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Glow background */}
            <motion.div
                className={`absolute inset-0 rounded-xl ${
                    isPrimary ? "shadow-sky-500/30" : "shadow-sky-400/15"
                }`}
                animate={{
                    boxShadow: isPrimary
                        ? [
                            "0 0 20px rgba(14,165,233,0.25)",
                            "0 0 35px rgba(14,165,233,0.4)",
                            "0 0 20px rgba(14,165,233,0.25)",
                          ]
                        : [
                            "0 0 15px rgba(14,165,233,0.1)",
                            "0 0 25px rgba(14,165,233,0.2)",
                            "0 0 15px rgba(14,165,233,0.1)",
                          ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Border glow pulse */}
            {isPrimary && (
                <motion.div
                    className="absolute inset-0 rounded-xl border border-sky-400/50"
                    animate={{
                        borderColor: [
                            "rgba(56,189,248,0.3)",
                            "rgba(56,189,248,0.7)",
                            "rgba(56,189,248,0.3)",
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Content */}
            <span className="relative z-10">{children}</span>
            <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
            />
        </motion.button>
    );
}
