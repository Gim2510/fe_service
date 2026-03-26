import { MobileNavItem } from "./MobileNavItem";
import { useAuth } from "../../auth/AuthContext";
import { usePremium } from "../../Context/PremiumContext";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import {MobileNavItemPremium} from "./MobileNavItemPremium.tsx";

interface NavbarMobileMenuProps {
    open: boolean;
    closeMenu: () => void;
}

export function NavbarMobileMenu({ open, closeMenu }: NavbarMobileMenuProps) {
    const { isAuthenticated, role, logout } = useAuth();
    const { isPremium } = usePremium();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    const mobileDrawerBg = theme === "dark" ? "bg-neutral-950/90 border-white/10" : "bg-neutral-50/95 border-gray-200";
    const mobileToggleBg = theme === "dark" ? "bg-white/5 border-white/10" : "bg-neutral-100 border-gray-200";

    return (
        <div className={`fixed inset-0 z-60 transition ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
            <div onClick={closeMenu} className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 cursor-pointer" />
            <div className={`absolute right-0 top-0 h-full w-80 backdrop-blur-2xl border-l transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"} ${mobileDrawerBg}`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex items-center justify-between mb-12">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Navigation</span>
                        <button onClick={closeMenu} className="cursor-pointer text-neutral-500">X</button>
                    </div>

                    <div className="flex flex-col gap-8 text-base text-neutral-700">
                        {isAuthenticated && <MobileNavItemPremium to="/premium" label={isPremium ? "Premium Attivo" : "Premium"} isPremium={isPremium} closeMenu={closeMenu} />}
                        {isAuthenticated && role === "ADMIN" && <MobileNavItem to="/dashboard" label="Dashboard" closeMenu={closeMenu} />}
                        <MobileNavItem to="/survey/start" label="Survey" closeMenu={closeMenu} />
                        <MobileNavItem to="/contact" label="Contacts" closeMenu={closeMenu} />
                        <MobileNavItem to="/careers" label="Careers" closeMenu={closeMenu} />

                        <button onClick={toggleTheme} className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${mobileToggleBg}`}>
                            <span>Tema</span>
                            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <div className="flex flex-col gap-8 text-base text-neutral-700">
                            {/* NAV LINKS */}

                            <div className="mt-8 border-t border-neutral-200 pt-6 flex flex-col gap-4">
                                {!isAuthenticated ? (
                                    <>
                                        <MobileNavItem to="/login" label="Login" closeMenu={closeMenu} />
                                        <MobileNavItem to="/register" label="Registrati" closeMenu={closeMenu} />
                                    </>
                                ) : (
                                    <button onClick={handleLogout} className="...">
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 text-xs text-neutral-500">
                        © {new Date().getFullYear()} TechBridge
                    </div>
                </div>
            </div>
        </div>
    );
}