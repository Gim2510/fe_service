import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton";
import { useTheme } from "../../Context/ThemeContext";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

interface NavbarActionsProps {
    closeMenu?: () => void;
}

export function NavbarActions({ closeMenu }: NavbarActionsProps) {
    const { isAuthenticated, logout } = useAuth();
    const { theme } = useTheme();

    const [modalOpen, setModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
        setModalOpen(false);
        closeMenu?.();
    };

    const handleCancelLogout = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex items-center gap-6 text-sm">
            {!isAuthenticated ? (
                <>
                    <LiquidGlassButton
                        to="/login"
                        variant="navbar"
                        onClick={closeMenu}
                        className="!text-xs !min-w-23 active:!shadow-inner"
                        scale={false}
                    >
                        Login
                    </LiquidGlassButton>
                    <LiquidGlassButton
                        to="/register"
                        variant="navbar"
                        onClick={closeMenu}
                        className="!text-xs !min-w-23 active:!shadow-inner"
                        scale={false}
                    >
                        Registrati
                    </LiquidGlassButton>
                </>
            ) : (
                <>
                    <Link
                        to="/user"
                        onClick={closeMenu}
                        className={`${
                            theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
                        } cursor-pointer transition-all ease-in-out`}
                    >
                        Account
                    </Link>
                    <LiquidGlassButton
                        onClick={handleLogoutClick}
                        variant="navbar"
                        scale={false}
                        className="!text-xs !min-w-23 active:!shadow-inner"
                    >
                        Logout
                    </LiquidGlassButton>
                </>
            )}

            <ThemeToggle />

            {/* Modale di conferma logout */}
            <LogoutConfirmModal
                open={modalOpen}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
                theme={theme}
            />
        </div>
    );
}