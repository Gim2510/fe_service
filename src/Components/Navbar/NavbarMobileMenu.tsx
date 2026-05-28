import { motion, AnimatePresence } from "framer-motion";
import { MobileNavItem } from "./MobileNavItem";
import { useAuth } from "../../auth/AuthContext";
import { Sun, Moon, X } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useClientData } from "../../hooks/useClientData";

interface NavbarMobileMenuProps {
    open: boolean;
    closeMenu: () => void;
}

export function NavbarMobileMenu({ open, closeMenu }: NavbarMobileMenuProps) {
    const { isAuthenticated, role, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { client } = useClientData();

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
                        className={`absolute right-0 top-0 h-full w-80 flex flex-col border-l bg-[#0E0E0D] border-stone-800/20`}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-5 border-b border-stone-800/20`}>
                            <span className={`text-xs uppercase tracking-widest font-medium text-slate-500`}>
                                Menu
                            </span>
                            <button
                                onClick={closeMenu}
                                className={`p-1.5 rounded-lg transition-colors text-slate-500 hover:text-slate-200 hover:bg-[#F8FAFB]/5`}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col gap-1 px-4 pt-6">
                            {isAuthenticated && role === "ADMIN" && (
                                <MobileNavItem to="/dashboard" label="Dashboard" closeMenu={closeMenu} />
                            )}
                            {client && (
                                <MobileNavItem to="/client/all_projects" label="I Miei Progetti" closeMenu={closeMenu} />
                            )}
                            <MobileNavItem to="/survey/start" label="Survey" closeMenu={closeMenu} />
                            <MobileNavItem to="/blog" label="Blog" closeMenu={closeMenu} />
                            <MobileNavItem to="/contact" label="Contacts" closeMenu={closeMenu} />
                            <MobileNavItem to="/careers" label="Careers" closeMenu={closeMenu} />
                            {isAuthenticated && (
                                <MobileNavItem to="/user" label="Account" closeMenu={closeMenu} />
                            )}
                        </div>

                        {/* Divider */}
                        <div className={`mx-4 mt-6 border-t border-stone-800/20`} />

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
                                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent text-red-400 hover:text-red-300 hover:bg-red-500/10`}
                                >
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* Theme toggle */}
                        <div className="px-4 mt-4">
                            <button
                                onClick={toggleTheme}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border text-slate-400 bg-[#F8FAFB]/3 border-stone-800/20 hover:border-stone-700/40 hover:text-slate-200`}
                            >
                                <span>Tema</span>
                                {isDark ? <Moon size={16} /> : <Sun size={16} />}
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto px-6 py-6">
                            <span className={`text-xs text-slate-700`}>
                                © {new Date().getFullYear()} AxiomLab
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
