import {NavLink} from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

type Props = {
    theme: string;
    to: string;
    label: string;
    isPremium: boolean | null;
    closeMenu: () => void;
};

export function MobileNavItemPremium({theme, to, label, isPremium, closeMenu,}: Props) {
    return (
        <NavLink
            to={to}
            onClick={closeMenu}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                transition-all duration-300 border backdrop-blur-md
                ${
                isPremium
                    ? `
                            bg-gradient-to-r from-red-900 via-red-700 to-red-800
                            text-white border-red-700/40
                          `
                    : `
                            bg-gradient-to-r 
                            border-indigo-500/30 ${theme === "dark" ? "text-white from-indigo-500/20 via-cyan-500/20 to-blue-500/20" : "text-black from-indigo-500/50 via-cyan-500/50 to-blue-500/50"}
                          `
            }
            `}
        >
            {isPremium && (
                <WorkspacePremiumIcon
                    fontSize="small"
                    className="text-red-300"
                />
            )}
            {label}
        </NavLink>
    );
}