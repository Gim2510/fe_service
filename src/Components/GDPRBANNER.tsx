import { useState, useEffect } from "react";

export function GDPRBanner() {
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("gdprAccepted");
        if (stored === "true") setAccepted(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("gdprAccepted", "true");
        setAccepted(true);
    };

    if (accepted) return null;

    return (
        <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 text-center z-30">
            <p>
                This website uses your data for account registration and analytics.
                <button onClick={handleAccept} className="ml-4 bg-blue-600 px-3 py-1 rounded cursor-pointer">Accept</button>
            </p>
        </div>
    );
}