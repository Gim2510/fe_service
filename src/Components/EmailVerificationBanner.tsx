import { useAuth } from "../auth/AuthContext.tsx";
import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { STORAGE_KEYS } from "../constants/storageKeys.ts";

export function EmailVerificationBanner() {
    const { isAuthenticated, emailVer } = useAuth();

    const [dismissed, setDismissed] = useState<boolean>(() =>
        localStorage.getItem(STORAGE_KEYS.EMAIL_VERIFICATION_BANNER_DISMISSED) === "true"
    );

    useEffect(() => {
        if (emailVer) {
            localStorage.removeItem(STORAGE_KEYS.EMAIL_VERIFICATION_BANNER_DISMISSED);
            setDismissed(false);
        }
    }, [emailVer]);

    const handleDismiss = () => {
        localStorage.setItem(STORAGE_KEYS.EMAIL_VERIFICATION_BANNER_DISMISSED, "true");
        setDismissed(true);
    };

    if (!isAuthenticated || emailVer || dismissed) return null;

    return (
        <div className="sticky bottom-0 z-20 w-full border-t border-stone-800/30 bg-stone-800/20 backdrop-blur-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail size={14} className="text-amber-500 shrink-0" />
                    <div className="overflow-hidden relative w-full">
                        <p className="animate-scroll whitespace-nowrap text-xs text-amber-400 font-medium">
                            Verifica la tua email per inizializzare il survey — controlla la tua casella di posta e
                            conferma il link di verifica.
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="shrink-0 p-1 rounded text-amber-500 hover:text-amber-300 transition-colors"
                    aria-label="Chiudi"
                >
                    <X size={14} />
                </button>
            </div>

            <style>{`
                @keyframes scroll {
                    0%   { transform: translateX(60%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scroll {
                    display: inline-block;
                    animation: scroll 25s linear infinite;
                }
            `}</style>
        </div>
    );
}
