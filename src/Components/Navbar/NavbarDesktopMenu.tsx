import { NavItem, NavItemPremium } from "./NavItem";
import { useAuth } from "../../auth/AuthContext";
import { usePremium } from "../../Context/PremiumContext";

interface NavbarDesktopMenuProps {
    theme: string;
}

export function NavbarDesktopMenu({ theme }: NavbarDesktopMenuProps) {
    const { isAuthenticated, role } = useAuth();
    const { isPremium } = usePremium();

    return (
        <div className={`hidden lg:flex items-center gap-10 text-sm tracking-wide ${theme === "dark" ? "text-white" : "text-neutral-700"}`}>
            {isAuthenticated && <NavItemPremium theme={theme} isPremium={isPremium} to="/premium" label="Premium" />}
            {isAuthenticated && role === "ADMIN" && <NavItem theme={theme} to="/dashboard" label="Dashboard" />}
            <NavItem theme={theme} to="/survey/start" label="Survey" />
            <NavItem theme={theme} to="/contact" label="Contacts" />
            <NavItem theme={theme} to="/careers" label="Careers" />
            {isAuthenticated && <NavItem theme={theme} to="/user" label="Account"/>}
        </div>
    );
}