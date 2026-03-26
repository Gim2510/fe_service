import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";

interface NavbarActionsProps {
    closeMenu?: () => void;
}

export function NavbarActions({ closeMenu }: NavbarActionsProps) {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        closeMenu?.();
    };

    return (
        <div className="flex items-center gap-6 text-sm">
            {!isAuthenticated ? (
                <>
                    <Link to="/login" onClick={closeMenu} className="hover:text-white transition text-neutral-400">
                        Login
                    </Link>
                    <LiquidGlassButton variant='navbar' to="/register" onClick={closeMenu} className="!text-xs" scale={false}>
                        Registrati
                    </LiquidGlassButton>
                </>
            ) : (
                <>
                    <Link to="/user" onClick={closeMenu} className="hover:opacity-70 transition">
                        Account
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-600 transition"
                    >
                        Logout
                    </button>
                </>
            )}

            <ThemeToggle />
        </div>
    );
}