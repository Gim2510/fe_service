import { useEffect, useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import {LiquidGlassButton} from "./Buttons/LiquidGlassButton.tsx";

type Consent = {
    necessary: true;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
};

const defaultConsent: Consent = {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
};

export function GDPRBanner() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [savedConsent, setSavedConsent] = useState<Consent | null>(null);
    const [tempConsent, setTempConsent] = useState<Consent>(defaultConsent);
    const [openSettings, setOpenSettings] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("gdprConsent");
        if (stored) {
            const parsed = JSON.parse(stored);
            setSavedConsent(parsed);
            setTempConsent(parsed);
        }
    }, []);

    const saveConsent = (consent: Consent) => {
        localStorage.setItem("gdprConsent", JSON.stringify(consent));
        setSavedConsent(consent);

        if (consent.analytics) {
            console.log("Analytics enabled");
        }
    };

    if (savedConsent) return null;

    const bg = isDark
        ? "bg-neutral-900 text-white border-neutral-700"
        : "bg-white text-neutral-900 border-neutral-200";

    return (
        <div
            className={`fixed bottom-0 left-0 w-full z-50 border-t shadow-2xl ${bg}`}
            style={{paddingBottom: "env(safe-area-inset-bottom)"}}
        >
            {!openSettings ? (
                <div
                    className="max-w-6xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

                    {/* TEXT */}
                    <p className="text-xs sm:text-sm opacity-80">
                        Utilizziamo cookie per migliorare l’esperienza, analizzare il traffico e personalizzare i
                        contenuti.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">

                        <LiquidGlassButton
                            onClick={() => saveConsent(defaultConsent)}
                            variant='navbar'
                        >
                            Rifiuta
                        </LiquidGlassButton>

                        <LiquidGlassButton
                            onClick={() => setOpenSettings(true)}
                            variant='navbar'
                        >
                            Personalizza
                        </LiquidGlassButton>

                        <LiquidGlassButton
                            variant='navbar'
                            onClick={() =>
                                saveConsent({
                                    necessary: true,
                                    preferences: true,
                                    analytics: true,
                                    marketing: true,
                                })
                            }
                        >
                            Accetta tutto
                        </LiquidGlassButton>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto p-4 sm:p-6">

                    <h2 className="text-base sm:text-lg font-semibold mb-4">
                        Preferenze Cookie
                    </h2>

                    <div className="flex flex-col divide-y divide-neutral-700">
                        {[
                            {
                                key: "necessary",
                                label: "Necessari",
                                desc: "Essenziali per il funzionamento del sito",
                                disabled: true,
                            },
                            {
                                key: "preferences",
                                label: "Preferenze",
                                desc: "Salvano impostazioni come tema",
                            },
                            {
                                key: "analytics",
                                label: "Analytics",
                                desc: "Misurano traffico e utilizzo",
                            },
                            {
                                key: "marketing",
                                label: "Marketing",
                                desc: "Personalizzazione pubblicità",
                            },
                        ].map((item: any) => (
                            <div key={item.key} className="flex justify-between items-center py-4">
                                <div className="pr-4">
                                    <p className="font-medium text-sm sm:text-base">
                                        {item.label}
                                    </p>
                                    <p className="text-xs opacity-70">
                                        {item.desc}
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    className="scale-110"
                                    checked={
                                        item.key === "necessary"
                                            ? true
                                            : tempConsent[item.key as keyof Consent]
                                    }
                                    disabled={item.disabled}
                                    onChange={(e) =>
                                        setTempConsent((prev) => ({
                                            ...prev,
                                            [item.key]: e.target.checked,
                                        }))
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                        <LiquidGlassButton
                            onClick={() => setOpenSettings(false)}
                            variant='navbar'
                        >
                            Indietro
                        </LiquidGlassButton>

                        <LiquidGlassButton
                            onClick={() => saveConsent(tempConsent)}
                            variant='navbar'
                        >
                            Salva preferenze
                        </LiquidGlassButton>
                    </div>
                </div>
            )}
        </div>
    );
}