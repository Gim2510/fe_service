import { motion, AnimatePresence } from "framer-motion";
import { MobileNavItem } from "./MobileNavItem";
import { useAuth } from "../../auth/AuthContext";
import { Sun, Moon, X } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

interface NavbarMobileMenuProps {
    open: boolean;
    closeMenu: () => void;
}

export function NavbarMobileMenu({ open, closeMenu }: NavbarMobileMenuProps) {
    const { isAuthenticated, role, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    const isDark = theme === "dark";

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-60">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeMenu}
                    />

                    {/* Drawer */}
                    <motion.div
                        className={`absolute right-0 top-0 h-full w-80 flex flex-col border-l ${
                            isDark
                                ? "bg-[#060D1B] border-blue-900/20"
                                : "bg-white border-slate-200"
                        }`}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-5 border-b ${
                            isDark ? "border-blue-900/20" : "border-slate-100"
                        }`}>
                            <span className={`text-xs uppercase tracking-widest font-medium ${
                                isDark ? "text-slate-500" : "text-slate-400"
                            }`}>
                                Menu
                            </span>
                            <button
                                onClick={closeMenu}
                                className={`p-1.5 rounded-lg transition-colors ${
                                    isDark
                                        ? "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col gap-1 px-4 pt-6">
                            {isAuthenticated && role === "ADMIN" && (
                                <MobileNavItem to="/dashboard" label="Dashboard" closeMenu={closeMenu} />
                            )}
                            <MobileNavItem to="/survey/start" label="Survey" closeMenu={closeMenu} />
                            <MobileNavItem to="/contact" label="Contacts" closeMenu={closeMenu} />
                            <MobileNavItem to="/careers" label="Careers" closeMenu={closeMenu} />
                            {isAuthenticated && (
                                <MobileNavItem to="/user" label="Account" closeMenu={closeMenu} />
                            )}
                        </div>

                        {/* Divider */}
                        <div className={`mx-4 mt-6 border-t ${isDark ? "border-blue-900/20" : "border-slate-100"}`} />

                        {/* Auth actions */}
                        <div className="flex flex-col gap-2 px-4 pt-4">
                            {!isAuthenticated ? (
                                <>
                                    <MobileNavItem to="/login" label="Login" closeMenu={closeMenu} />
                                    <MobileNavItem to="/register" label="Registrati" closeMenu={closeMenu} />
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent ${
                                        isDark
                                            ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            : "text-red-500 hover:text-red-600 hover:bg-red-50"
                                    }`}
                                >
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* Theme toggle */}
                        <div className="px-4 mt-4">
                            <button
                                onClick={toggleTheme}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                    isDark
                                        ? "text-slate-400 bg-white/3 border-blue-900/20 hover:border-blue-800/40 hover:text-slate-200"
                                        : "text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100"
                                }`}
                            >
                                <span>Tema</span>
                                {isDark ? <Moon size={16} /> : <Sun size={16} />}
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto px-6 py-6">
                            <span className={`text-xs ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                                © {new Date().getFullYear()} TechBridgeGroup
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
