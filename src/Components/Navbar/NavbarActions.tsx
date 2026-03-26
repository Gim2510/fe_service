import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import {LiquidGlassButton} from "../Buttons/LiquidGlassButton.tsx";
import {useTheme} from "../../Context/ThemeContext.tsx";

interface NavbarActionsProps {
    closeMenu?: () => void;
}

export function NavbarActions({ closeMenu }: NavbarActionsProps) {
    const { isAuthenticated, logout } = useAuth();
    const {theme} = useTheme()

    const handleLogout = () => {
        logout();
        closeMenu?.();
    };

    return (
        <div className="flex items-center gap-6 text-sm">
            {!isAuthenticated ? (
                <>
                    <Link to="/login" onClick={closeMenu} className="hover:text-white transition text-neutral-400 cursor-pointer">
                        Login
                    </Link>
                    <LiquidGlassButton variant='navbar' to="/register" onClick={closeMenu} className="!text-xs" scale={false}>
                        Registrati
                    </LiquidGlassButton>
                </>
            ) : (
                <>
                    <Link to="/user" onClick={closeMenu} className={`${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} text-neutral-400 transition cursor-pointer transition-all ease-in-out`}>
                        Account
                    </Link>
                    <LiquidGlassButton
                        onClick={handleLogout}
                        variant='navbar'
                        scale={false}
                    >
                        Logout
                    </LiquidGlassButton>
                </>
            )}

            <ThemeToggle />
        </div>
    );
}