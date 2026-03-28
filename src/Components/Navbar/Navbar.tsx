import { useState, useEffect } from "react";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarActions } from "./NavbarActions";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "../../Context/ThemeContext";

export function Navbar() {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const headerBg = theme === "dark"
        ? "bg-white/5 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        : "bg-neutral-50/40 border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.15)]";

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className={`mt-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${headerBg}`}>
                        <div className="flex items-center justify-between h-16 px-6">
                            <NavbarLogo/>
                            <div className="hidden lg:flex items-center gap-10 w-fit">
                                <NavbarDesktopMenu theme={theme}/>
                                <div className="h-6 w-px bg-gray-400/50"/>
                                <NavbarActions/>
                            </div>
                            <button onClick={() => setOpen(true)} className={`lg:hidden justify-self-end ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                <MenuIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <NavbarMobileMenu open={open} closeMenu={() => setOpen(false)} />
        </>
    );
}