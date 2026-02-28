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
                `
                block px-4 py-3 rounded-xl transition-all duration-200
                ${
                    isActive
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                }
                `
            }
        >
            {label}
        </NavLink>
    );
}