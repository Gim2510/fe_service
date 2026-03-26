import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

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
        <div className="flex items-center gap-6">
            {isAuthenticated && (
                <>
                    <Link to="/user" onClick={closeMenu} className="text-sm">Account</Link>
                    <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 transition">
                        Logout
                    </button>
                </>
            )}

            <ThemeToggle />
        </div>
    );
}