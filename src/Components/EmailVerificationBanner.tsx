import { useAuth } from "../auth/AuthContext.tsx";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export function EmailVerificationBanner() {
    const { isAuthenticated, emailVer } = useAuth();
    const [show, setShow] = useState<boolean>(!emailVer);

    if (!isAuthenticated || emailVer || !show) return null;

    return (
        <div className="w-full h-12 bg-white/20 backdrop-blur-md sticky bottom-0 z-20 flex items-center overflow-hidden border-t border-white/10 relative">
            <CloseIcon className='stroke-white absolute left-2 cursor-pointer' onClick={() => setShow(false)} />
            <div className="animate-scroll whitespace-nowrap text-center w-full text-white font-medium px-4">
                È necessario verificare la tua email per poter inizializzare il survey. Controlla la tua casella di posta e conferma il link di verifica.
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