import { Link } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react"
import logo from "/logo1.png"
import {NavItem} from "./NavItem.tsx";
import {MobileNavItem} from "./MobileNavItem.tsx";

export function Navbar() {
    const { isAuthenticated, logout, role } = useAuth()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
    }, [open])

    const closeMenu = () => setOpen(false)

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mt-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

                        <div className="flex items-center justify-between h-16 px-6">

                            {/* Logo */}
                            <Link to="/" className="flex items-center">
                                <img src={logo} alt="TechBridge" className="h-10 object-contain" />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-10 text-sm tracking-wide">

                                {isAuthenticated && role === "ADMIN" && (
                                    <NavItem to="/dashboard" label="Dashboard" />
                                )}

                                <NavItem to="/survey/start" label="Survey" />
                                <NavItem to="/contact" label="Contacts" />

                                {isAuthenticated ? (
                                    <>
                                        <NavItem to="/user" label="Account" />

                                        <button
                                            onClick={logout}
                                            className="text-neutral-400 hover:text-white transition"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavItem to="/login" label="Login" />
                                        <Link
                                            to="/register"
                                            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition text-white"
                                        >
                                            Inizia ora
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Button */}
                            <button
                                className="lg:hidden text-neutral-300 hover:text-white transition"
                                onClick={() => setOpen(true)}
                            >
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= MOBILE DRAWER ================= */}
            <div
                className={`fixed inset-0 z-60 transition ${
                    open ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >
                {/* Overlay */}
                <div
                    onClick={closeMenu}
                    className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
                />

                {/* Panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-80 bg-neutral-950/90 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-500 ${
                        open ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full p-8">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <span className="text-xs uppercase tracking-widest text-neutral-500">
                                Navigation
                            </span>

                            <button
                                onClick={closeMenu}
                                className="text-neutral-400 hover:text-white transition"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-6 text-lg font-light tracking-wide">

                            {isAuthenticated && role === "ADMIN" && (
                                <MobileNavItem to="/dashboard" label="Dashboard" closeMenu={closeMenu} />
                            )}

                            <MobileNavItem to="/survey/start" label="Survey" closeMenu={closeMenu} />
                            <MobileNavItem to="/contact" label="Contacts" closeMenu={closeMenu} />

                            {isAuthenticated ? (
                                <>
                                    <MobileNavItem to="/user" label="Account" closeMenu={closeMenu} />

                                    <button
                                        onClick={() => {
                                            logout()
                                            closeMenu()
                                        }}
                                        className="text-neutral-400 hover:text-red-400 transition text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <MobileNavItem to="/login" label="Login" closeMenu={closeMenu} />
                                    <MobileNavItem to="/register" label="Inizia ora" closeMenu={closeMenu} />
                                </>
                            )}
                        </div>

                        <div className="mt-auto pt-10 text-xs text-neutral-600">
                            © {new Date().getFullYear()} TechBridge
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
