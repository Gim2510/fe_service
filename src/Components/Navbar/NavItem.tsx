import {NavLink} from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `transition ${
                    isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                }`
            }
        >
            {label}
        </NavLink>
    )
}

type Props = {
    to: string;
    label: string;
    isPremium: boolean | null;
};

export function NavItemPremium({ to, label, isPremium = false }: Props) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide
                transition-all duration-300 backdrop-blur-md border
                ${
                isPremium
                    ? `
                            bg-gradient-to-r from-red-900 via-red-700 to-red-800
                            text-white
                            border-red-700/40
                            shadow-lg shadow-red-900/40
                          `
                    : isActive
                        ? `
                            bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500
                            text-black
                            border-transparent
                            shadow-lg shadow-indigo-500/40
                          `
                        : `
                            bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-blue-500/20
                            text-white
                            border-indigo-500/30
                            hover:shadow-md hover:shadow-indigo-500/30
                            hover:scale-[1.03]
                          `
            }
            `}
        >
            {/* Crown only if premium */}
            {isPremium && (
                <WorkspacePremiumIcon
                    className="text-red-300"
                    fontSize="small"
                />
            )}

            <span className="relative z-10">
                {label}
            </span>

            {/* Glow layer */}
            <span
                className={`absolute inset-0 rounded-full blur-xl opacity-60 pointer-events-none ${
                    isPremium
                        ? "bg-gradient-to-r from-red-900/40 via-red-700/40 to-red-800/40"
                        : "bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-blue-500/10"
                }`}
            />
        </NavLink>
    );
}