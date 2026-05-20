import { NavLink } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { motion } from "framer-motion";

type Props = {
    to: string;
    label: string;
    isPremium?: boolean | null;
    theme: string;
};

export function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <span
                    className={`
                        relative px-1 py-1 text-sm font-medium tracking-wide
                        transition-all duration-200
                        ${isActive
                            ? "text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                            : "text-slate-400 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                        }
                    `}
                >
                    {label}
                    <motion.span
                        className={`
                            absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full
                            bg-sky-600 shadow-[0_0_8px_rgba(56,189,248,0.6)]
                        `}
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </span>
            )}
        </NavLink>
    );
}

export function NavItemPremium({ to, label, isPremium = false, theme }: Props) {
    const activeBg = theme === "dark"
        ? "bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-600 text-black border-transparent shadow-lg shadow-indigo-500/40"
        : "bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-500 text-black border-transparent shadow-lg shadow-indigo-400/40";

    const inactiveBg = theme === "dark"
        ? "bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-sky-600/20 text-white border-indigo-500/30 hover:shadow-md hover:shadow-indigo-500/30 hover:scale-[1.03]"
        : "bg-gradient-to-r from-indigo-200/20 via-cyan-200/20 to-sky-300/20 text-black border-indigo-300/30 hover:shadow-md hover:shadow-indigo-300/30 hover:scale-[1.03]";

    const premiumBg = "bg-gradient-to-r from-red-900 via-red-700 to-red-800 text-white border-red-700/40 shadow-lg shadow-red-900/40";
    const premiumGlow = "bg-gradient-to-r from-red-900/40 via-red-700/40 to-red-800/40";
    const normalGlow = theme === "dark"
        ? "bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-sky-600/10"
        : "bg-gradient-to-r from-indigo-200/10 via-cyan-200/10 to-sky-300/10";

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md border
                ${isPremium ? premiumBg : isActive ? activeBg : inactiveBg}`
            }
        >
            {isPremium && (
                <WorkspacePremiumIcon className="text-red-300" fontSize="small" />
            )}
            <span className="relative z-10">{label}</span>
            <span
                className={`absolute inset-0 rounded-full blur-xl opacity-60 pointer-events-none ${
                    isPremium ? premiumGlow : normalGlow
                }`}
            />
        </NavLink>
    );
}
