import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react"
import {NavItem} from "./NavItem.tsx";
import logo from '/logo1.png'

export function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open])

    const closeMenu = () => setOpen(false)

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
            <nav className="mx-auto py-2 px-2 sm:px-8 flex items-center justify-between">

                {/* Brand */}
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-tight text-gray-900 flex justify-center items-center"
                >
                    <img src={logo} alt='logo' width={200} height={70} className=''/>
                </Link>

                <div className="flex items-center gap-6">
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({isActive}) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-500"
                                            : "text-gray-200 hover:text-gray-500"
                                    }`
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="text-sm font-medium px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
                            >
                                Inizia ora
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {/* MOBILE HAMBURGER */}
                            <button
                                className="lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <MenuIcon />
                            </button>

                            {/* DESKTOP MENU */}
                            <div className="hidden lg:flex gap-6 items-center">
                                <NavLink
                                    to="/survey/start"
                                    className={({ isActive }) =>
                                        `text-sm font-medium ${
                                            isActive
                                                ? "text-gray-500"
                                                : "text-gray-200 hover:text-gray-500"
                                        }`
                                    }
                                >
                                    Survey
                                </NavLink>

                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `text-sm font-medium ${
                                            isActive
                                                ? "text-gray-500"
                                                : "text-gray-200 hover:text-gray-500"
                                        }`
                                    }
                                >
                                    Contacts
                                </NavLink>

                                <NavLink
                                    to="/user"
                                    className={({ isActive }) =>
                                        `text-sm font-medium ${
                                            isActive
                                                ? "text-gray-500"
                                                : "text-gray-200 hover:text-gray-500"
                                        }`
                                    }
                                >
                                    Account
                                </NavLink>

                                <button
                                    onClick={logout}
                                    className="text-sm cursor-pointer font-medium text-gray-200 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {/* ================= MOBILE DRAWER ================= */}
            {isAuthenticated && (
                <>
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
                            open
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        }`}
                        onClick={closeMenu}
                    />

                    {/* Drawer */}
                    <div
                        className={`fixed inset-0 z-50 ${
                            open ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                    >
                        {/* Overlay */}
                        <div
                            onClick={closeMenu}
                            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                                open ? "opacity-100" : "opacity-0"
                            }`}
                        />

                        {/* Side panel */}
                        <div
                            className={`absolute top-0 left-0 h-full w-72 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-r border-neutral-800 shadow-2xl transform transition-transform duration-300 ${
                                open ? "translate-x-0" : "-translate-x-full"
                            }`}
                        >
                            <div className="h-full flex flex-col p-8">

                                {/* Header */}
                                <div className="flex items-center justify-between mb-12">
        <span className="text-sm uppercase tracking-widest text-neutral-500">
          Area riservata
        </span>

                                    <button
                                        onClick={closeMenu}
                                        className="text-neutral-400 hover:text-white transition"
                                    >
                                        <CloseIcon/>
                                    </button>
                                </div>

                                {/* Navigation */}
                                <nav className="flex flex-col gap-4 text-lg">

                                    <NavItem to="/survey/start" label="Survey" closeMenu={closeMenu}/>
                                    <NavItem to="/contact" label="Contatti" closeMenu={closeMenu}/>
                                    <NavItem to="/user" label="Account" closeMenu={closeMenu}/>

                                </nav>

                                {/* Divider */}
                                <div
                                    className="mt-10 mb-6 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"/>

                                {/* Logout */}
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="group flex items-center gap-3 text-neutral-400 hover:text-red-400 transition"
                                >
                                    <span className="text-lg">Logout</span>
                                    <div className="flex-1 h-px bg-neutral-800 group-hover:bg-red-500 transition"/>
                                </button>

                                {/* Footer */}
                                <div className="mt-auto pt-10 text-xs text-neutral-600">
                                    © {new Date().getFullYear()} Digital Advisory
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
