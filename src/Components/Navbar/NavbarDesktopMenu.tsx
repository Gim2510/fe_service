import { NavItem } from "./NavItem";
import { useAuth } from "../../auth/AuthContext";

interface NavbarDesktopMenuProps {
    theme: string;
}

export function NavbarDesktopMenu({ theme }: NavbarDesktopMenuProps) {
    const { isAuthenticated, role } = useAuth();

    return (
        <div className="hidden lg:flex items-center gap-8">
            {isAuthenticated && role === "ADMIN" && (
                <NavItem theme={theme} to="/dashboard" label="Dashboard" />
            )}
            <NavItem theme={theme} to="/survey/start" label="Survey" />
            <NavItem theme={theme} to="/contact" label="Contacts" />
            <NavItem theme={theme} to="/careers" label="Careers" />
        </div>
    );
}
