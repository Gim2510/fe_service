import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../../Context/ThemeContext";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

interface NavbarActionsProps {
    closeMenu?: () => void;
}

export function NavbarActions({ closeMenu }: NavbarActionsProps) {
    const { isAuthenticated, logout } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogoutClick = () => setModalOpen(true);
    const handleConfirmLogout = () => {
        logout();
        setModalOpen(false);
        closeMenu?.();
    };
    const handleCancelLogout = () => setModalOpen(false);

    return (
        <div className="flex items-center gap-3">
            {!isAuthenticated ? (
                <>
                    <Link
                        to="/login"
                        onClick={closeMenu}
                        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                            isDark
                                ? "text-slate-300 hover:text-white hover:bg-[#F8FAFB]/5"
                                : "text-slate-600 hover:text-slate-900 hover:bg-[#EDF2F7]"
                        }`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        onClick={closeMenu}
                        className={`relative text-sm font-semibold px-5 py-1.5 rounded-xl text-white
                            transition-all duration-300 hover:-translate-y-0.5
                            ${isDark
                                ? "bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-400/30 hover:border-sky-400/60"
                                : "bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 shadow-lg shadow-sky-700/20 hover:shadow-sky-600/35 border border-sky-500/20 hover:border-sky-400/40"
                            }`}
                    >
                        Registrati
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/user"
                        onClick={closeMenu}
                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                            isDark
                                ? "text-slate-400 hover:text-white hover:bg-[#F8FAFB]/5"
                                : "text-slate-500 hover:text-slate-900 hover:bg-[#EDF2F7]"
                        }`}
                    >
                        <User size={14} />
                        Account
                    </Link>
                    <button
                        onClick={handleLogoutClick}
                        className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                            isDark
                                ? "text-slate-400 border-stone-800/30 hover:text-red-400 hover:border-red-900/40 hover:bg-red-900/10"
                                : "text-slate-500 border-slate-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
                        }`}
                    >
                        Logout
                    </button>
                </>
            )}

            <ThemeToggle />

            <LogoutConfirmModal
                open={modalOpen}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
                theme={theme}
            />
        </div>
    );
}
