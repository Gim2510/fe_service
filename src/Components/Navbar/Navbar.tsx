import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react"

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
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="mx-auto px-2 sm:px-8 flex items-center justify-between">

                {/* Brand */}
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-tight text-gray-900 flex justify-center items-center gap-2"
                >
                    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="10" fill="#0E1A2B"/>
                        <path d="M10 14 H34 V18 H24 V34 H20 V18 H10 Z" fill="#FFFFFF"/>
                        <path d="M24 20 H32 C35 20 35 26 32 26 H24 Z" fill="#1D4ED8"/>
                        <path d="M24 26 H34 C37 26 37 34 34 34 H24 Z" fill="#1D4ED8"/>
                    </svg>
                    <svg width="160" height="50" viewBox="0 0 360 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="50"
                              font-family="Sora, Inter, Arial, sans-serif"
                              font-size="34"
                              font-weight="600"
                              letter-spacing="3"
                              fill="#0E1A2B">
                            TECHBRIDGE
                        </text>
                        <rect x="0" y="60" width="140" height="4" fill="#1D4ED8"/>
                    </svg>
                </Link>

                <div className="flex items-center gap-6">
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({isActive}) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900"
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
                                                ? "text-gray-900"
                                                : "text-gray-500 hover:text-gray-900"
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
                                                ? "text-gray-900"
                                                : "text-gray-500 hover:text-gray-900"
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
                                                ? "text-gray-900"
                                                : "text-gray-500 hover:text-gray-900"
                                        }`
                                    }
                                >
                                    Account
                                </NavLink>

                                <button
                                    onClick={logout}
                                    className="text-sm cursor-pointer font-medium text-gray-500 hover:text-red-600"
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
                        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
                            open ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <div className="p-6 flex flex-col gap-6">

                            {/* Close */}
                            <div className="flex justify-end">
                                <button onClick={closeMenu}>
                                    <CloseIcon />
                                </button>
                            </div>

                            <NavLink
                                to="/survey/start"
                                onClick={closeMenu}
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                            >
                                Survey
                            </NavLink>

                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                            >
                                Contacts
                            </NavLink>

                            <NavLink
                                to="/user"
                                onClick={closeMenu}
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                            >
                                Account
                            </NavLink>

                            <button
                                onClick={() => {
                                    logout()
                                    closeMenu()
                                }}
                                className="text-lg cursor-pointer font-medium text-red-500 hover:text-red-600 text-left"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
