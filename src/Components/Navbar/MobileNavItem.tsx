import {NavLink} from "react-router-dom";

export function MobileNavItem({to, label, closeMenu,}: { to: string, label: string, closeMenu: () => void }) {
    return (
        <NavLink
            to={to}
            onClick={closeMenu}
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