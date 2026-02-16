import {NavLink} from "react-router-dom";

export function NavItem({
                     to,
                     label,
                     closeMenu,
                 }: {
    to: string;
    label: string;
    closeMenu: () => void;
}) {
    return (
        <NavLink
            to={to}
            onClick={closeMenu}
            className={({ isActive }) =>
                `group relative px-4 py-3 cursor-pointer rounded-2xl transition ${
                    isActive
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`
            }
        >
            <span className="relative z-10">{label}</span>

            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-neutral-700 transition" />
        </NavLink>
    );
}
