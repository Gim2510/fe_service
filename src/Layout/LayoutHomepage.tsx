import { type ReactNode, useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar/Navbar.tsx";
import { Footer } from "../Components/Footer.tsx";
import { GDPRBanner } from "../Components/GDPRBANNER.tsx";
import { ChatWidget } from "../Components/ChatBot/ChatWidget.tsx";
import { useAuth } from "../auth/AuthContext.tsx";
import {EmailVerificationBanner} from "../Components/EmailVerificationBanner.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop || document.body.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none">
            <div
                className="h-full bg-emerald-600 transition-none origin-left"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

export function LayoutHomepage({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const {theme} = useTheme()

    return (
        <div className="w-full h-full relative">
            <ScrollProgressBar />
            <div onClick={() => setOpen(false)}>
                <Navbar />
                {children}
                <Footer theme={theme} />
                <GDPRBanner />
                <EmailVerificationBanner />
            </div>
            {isAuthenticated && (
                <ChatWidget theme={theme} open={open} setOpen={setOpen} />
            )}
        </div>
    );
}