import { type ReactNode, useState } from "react";
import { Navbar } from "../Components/Navbar/Navbar.tsx";
import { Footer } from "../Components/Footer.tsx";
import { GDPRBanner } from "../Components/GDPRBANNER.tsx";
import { ChatWidget } from "../Components/ChatBot/ChatWidget.tsx";
import { useAuth } from "../auth/AuthContext.tsx";
import {EmailVerificationBanner} from "../Components/EmailVerificationBanner.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";

export function LayoutHomepage({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const {theme} = useTheme()

    return (
        <div className="w-full h-full relative">
            <div onClick={() => setOpen(false)}>
                <Navbar />
                {children}
                <Footer />
                <GDPRBanner />
                <EmailVerificationBanner />
            </div>
            {isAuthenticated && (
                <ChatWidget theme={theme} open={open} setOpen={setOpen} />
            )}
        </div>
    );
}