import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    label: string;
    closeMenu: () => void;
};

export function MobileNavItem({ to, label, closeMenu }: Props) {
    return (
        <NavLink
            to={to}
            onClick={closeMenu}
            className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-600/20"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
                }`
            }
        >
            {label}
        </NavLink>
    );
}
