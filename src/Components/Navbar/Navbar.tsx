import { Link } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect } from "react"
import logo from "/logo1.png"
import { NavItem, NavItemPremium } from "./NavItem"
import { MobileNavItem } from "./MobileNavItem"
import { LogoutConfirmModal } from "./LogoutConfirmModal"
import { MobileNavItemPremium } from "./MobileNavItemPremium"
import { usePremium } from "../../Context/PremiumContext"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../Context/ThemeContext"

export function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const { isAuthenticated, logout, role } = useAuth()
    const { isPremium } = usePremium()

    const [open, setOpen] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleLogout = () => {
        logout()
        setShowLogoutModal(false)
    }

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
    }, [open])

    const closeMenu = () => setOpen(false)

    // Variabili di stile basate sul tema
    const headerBg = theme === "dark"
        ? "bg-white/5 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        : "bg-neutral-50/90 border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.15)]"

    const textColor = theme === "dark" ? "text-white" : "text-neutral-700"
    const hoverColor = theme === "dark" ? "hover:text-white" : "hover:text-black"
    const registerBtn = theme === "dark"
        ? "bg-white/10 hover:bg-white/20 border-white/20"
        : "bg-neutral-100 hover:bg-neutral-200 border-gray-200"
    const mobileDrawerBg = theme === "dark"
        ? "bg-neutral-950/90 border-white/10"
        : "bg-neutral-50/95 border-gray-200"
    const mobileToggleBg = theme === "dark"
        ? "bg-white/5 border-white/10"
        : "bg-neutral-100 border-gray-200"

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className={`mt-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${headerBg}`}>
                        <div className="flex items-center justify-between h-16 px-6">

                            {/* Logo */}
                            <Link to="/" className="flex items-center cursor-pointer">
                                <img src={logo} alt="TechBridge" className="h-10 object-contain" />
                            </Link>

                            {/* Desktop */}
                            <div className={`hidden lg:flex items-center gap-10 text-sm tracking-wide ${textColor}`}>

                                {isAuthenticated && (
                                    <NavItemPremium theme={theme} isPremium={isPremium} to="/premium" label="Premium" />
                                )}

                                {isAuthenticated && role === "ADMIN" && (
                                    <NavItem theme={theme} to="/dashboard" label="Dashboard" />
                                )}

                                <NavItem theme={theme} to="/survey/start" label="Survey" />
                                <NavItem theme={theme} to="/contact" label="Contacts" />

                                {isAuthenticated ? (
                                    <>
                                        <NavItem theme={theme} to="/user" label="Account" />
                                        <button
                                            onClick={() => setShowLogoutModal(true)}
                                            className={`cursor-pointer text-neutral-500 transition ${hoverColor}`}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavItem theme={theme} to="/login" label="Login" />
                                        <Link
                                            to="/register"
                                            className={`cursor-pointer px-5 py-2 rounded-xl border backdrop-blur-md transition ${registerBtn}`}
                                        >
                                            Inizia ora
                                        </Link>
                                    </>
                                )}

                                {/* Liquid Glass Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="relative w-16 h-9 rounded-full p-1 backdrop-blur-xl bg-white/40 border border-white/30 shadow-inner transition-all duration-500 cursor-pointer"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-transparent opacity-30 pointer-events-none" />
                                    <div
                                        className={`absolute top-1 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-xl shadow-lg transition-all duration-500 ${
                                            theme === "dark"
                                                ? "translate-x-7 shadow-[0_0_18px_rgba(255,255,255,0.25)] bg-neutral-900"
                                                : "translate-x-0 shadow-[0_0_18px_rgba(0,0,0,0.15)] bg-neutral-50"
                                        }`}
                                    >
                                        <Sun
                                            size={14}
                                            className={`absolute transition-all duration-300 ${theme === "light" ? "opacity-100 scale-100 text-yellow-500" : "opacity-0 scale-75"}`}
                                        />
                                        <Moon
                                            size={14}
                                            className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 scale-100 text-white" : "opacity-0 scale-75"}`}
                                        />
                                    </div>
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setOpen(true)}
                                className={`lg:hidden cursor-pointer ${textColor} ${hoverColor} transition`}
                            >
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE DRAWER */}
            <div className={`fixed inset-0 z-60 transition ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div
                    onClick={closeMenu}
                    className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
                />

                <div className={`absolute right-0 top-0 h-full w-80 backdrop-blur-2xl border-l transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"} ${mobileDrawerBg}`}>
                    <div className="flex flex-col h-full p-8">

                        <div className="flex items-center justify-between mb-12">
                            <span className="text-xs uppercase tracking-widest text-neutral-500">Navigation</span>
                            <button
                                onClick={closeMenu}
                                className={`cursor-pointer text-neutral-500 ${hoverColor} transition`}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 text-base text-neutral-700">

                            <div className="space-y-4">
                                {isAuthenticated && (
                                    <MobileNavItemPremium
                                        to="/premium"
                                        label={isPremium ? "Premium Attivo" : "Premium"}
                                        isPremium={isPremium}
                                        closeMenu={closeMenu}
                                    />
                                )}

                                {isAuthenticated && role === "ADMIN" && (
                                    <MobileNavItem to="/dashboard" label="Dashboard" closeMenu={closeMenu} />
                                )}

                                <MobileNavItem to="/survey/start" label="Survey" closeMenu={closeMenu} />
                                <MobileNavItem to="/contact" label="Contacts" closeMenu={closeMenu} />
                            </div>

                            <div className="h-px bg-gray-200" />

                            <div className="space-y-4">

                                {/* Mobile theme toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${mobileToggleBg}`}
                                >
                                    <span>Tema</span>
                                    {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                                </button>

                                {isAuthenticated ? (
                                    <>
                                        <MobileNavItem to="/user" label="Account" closeMenu={closeMenu} />
                                        <button
                                            onClick={() => {
                                                closeMenu()
                                                setShowLogoutModal(true)
                                            }}
                                            className="cursor-pointer w-full text-left px-4 py-3 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-500/10 transition"
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
                        </div>

                        <div className="mt-auto pt-10 text-xs text-neutral-500">
                            © {new Date().getFullYear()} TechBridge
                        </div>
                    </div>
                </div>
            </div>

            <LogoutConfirmModal
                open={showLogoutModal}
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutModal(false)}
            />
        </>
    )
}