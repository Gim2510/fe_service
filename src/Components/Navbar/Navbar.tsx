import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarActions } from "./NavbarActions";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "../../Context/ThemeContext";

export function Navbar() {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isDark = theme === "dark";

    const headerBg = isDark
        ? scrolled
            ? "bg-[#060D1B]/95 border-blue-900/30 shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
            : "bg-[#060D1B]/50 border-blue-900/15 shadow-none"
        : scrolled
            ? "bg-white/97 border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-white/75 border-slate-200/60 shadow-none";

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-50"
                initial={{ y: -72, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className={`mt-3 rounded-xl border backdrop-blur-2xl transition-all duration-400 ${headerBg}`}>
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6">

                            <NavbarLogo />

                            <div className="hidden lg:flex items-center gap-8">
                                <NavbarDesktopMenu theme={theme} />
                                <div className={`h-5 w-px ${isDark ? "bg-blue-900/50" : "bg-slate-200"}`} />
                                <NavbarActions />
                            </div>

                            <button
                                onClick={() => setOpen(true)}
                                aria-label="Apri menu"
                                className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                                    isDark
                                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                                }`}
                            >
                                <MenuIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <NavbarMobileMenu open={open} closeMenu={() => setOpen(false)} />
        </>
    );
}
