import { useAuth } from "../auth/AuthContext.tsx";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const STORAGE_KEY = "emailVerificationBannerDismissed";

export function EmailVerificationBanner() {
    const { isAuthenticated, emailVer } = useAuth();

    const [dismissed, setDismissed] = useState<boolean>(() => {
        return localStorage.getItem(STORAGE_KEY) === "true";
    });

    useEffect(() => {
        if (emailVer) {
            localStorage.removeItem(STORAGE_KEY);
            setDismissed(false);
        }
    }, [emailVer]);

    const handleDismiss = () => {
        localStorage.setItem(STORAGE_KEY, "true");
        setDismissed(true);
    };

    if (!isAuthenticated || emailVer || dismissed) return null;

    return (
        <div className="w-full h-12 bg-white/20 backdrop-blur-md sticky bottom-0 z-20 flex items-center overflow-hidden border-t border-white/10 relative">

            <CloseIcon
                className="absolute left-3 cursor-pointer text-white hover:scale-110 transition"
                onClick={handleDismiss}
            />

            <div className="animate-scroll whitespace-nowrap text-center w-full text-white font-medium px-8">
                È necessario verificare la tua email per poter inizializzare il survey.
                Controlla la tua casella di posta e conferma il link di verifica.
            </div>

            <style>
                {`
                    @keyframes scroll {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }

                    .animate-scroll {
                        display: inline-block;
                        animation: scroll 30s linear infinite;
                    }
                `}
            </style>
        </div>
    );
}