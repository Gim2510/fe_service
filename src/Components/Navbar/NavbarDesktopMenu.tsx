import { NavItem } from "./NavItem";
import { useAuth } from "../../auth/AuthContext";

export function NavbarDesktopMenu() {
    const { isAuthenticated, role } = useAuth();

    return (
        <div className="hidden lg:flex items-center gap-8">
            {isAuthenticated && role === "ADMIN" && (
                <NavItem to="/dashboard" label="Dashboard" />
            )}
            <NavItem to="/survey/start" label="Survey" />
            <NavItem to="/blog" label="Blog" />
            <NavItem to="/contact" label="Contacts" />
            <NavItem to="/careers" label="Careers" />
        </div>
    );
}
