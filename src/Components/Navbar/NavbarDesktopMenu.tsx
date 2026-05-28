import { NavItem } from "./NavItem";
import { useAuth } from "../../auth/AuthContext";
import { useClientData } from "../../hooks/useClientData";

export function NavbarDesktopMenu() {
    const { isAuthenticated, role } = useAuth();
    const { client } = useClientData();

    return (
        <div className="hidden lg:flex items-center gap-8">
            {isAuthenticated && role === "ADMIN" && (
                <NavItem to="/dashboard" label="Dashboard" />
            )}
            {client && (
                <NavItem to="/client/all_projects" label="I Miei Progetti" />
            )}
            <NavItem to="/survey/start" label="Survey" />
            <NavItem to="/blog" label="Blog" />
            <NavItem to="/contact" label="Contacts" />
            <NavItem to="/careers" label="Careers" />
        </div>
    );
}
