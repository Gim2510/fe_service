import { Link } from "react-router-dom";
import logo from "/logo1.png";
import logodark from "/logo1-black.png";
import { useTheme } from "../../Context/ThemeContext";

export function NavbarLogo() {
    const { theme } = useTheme();
    return (
        <Link to="/" className="flex items-center cursor-pointer">
            <img src={theme === "dark" ? logo : logodark} alt="TechBridge" className="h-15 w-22 object-contain" />
        </Link>
    );
}