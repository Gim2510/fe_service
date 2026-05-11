import { useEffect, useState } from "react";
import { useTheme } from "../Context/ThemeContext";

type Consent = {
    necessary: true;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
};

const defaultConsent: Consent = {
    necessary: true, preferences: false, analytics: false, marketing: false,
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
    };

    if (savedConsent) return null;

    const consentItems = [
        { key: "necessary", label: "Necessari", desc: "Essenziali per il funzionamento del sito", disabled: true },
        { key: "preferences", label: "Preferenze", desc: "Salvano impostazioni come tema" },
        { key: "analytics", label: "Analytics", desc: "Misurano traffico e utilizzo" },
        { key: "marketing", label: "Marketing", desc: "Personalizzazione contenuti" },
    ];

    return (
        <div className={`fixed bottom-0 left-0 w-full z-50 border-t ${
            isDark
                ? "bg-[#111110]/95 border-stone-800/30 backdrop-blur-xl"
                : "bg-[#F8FAFB]/95 border-slate-200 backdrop-blur-xl"
        } shadow-2xl`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>

            {!openSettings ? (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Utilizziamo cookie per migliorare l'esperienza, analizzare il traffico e personalizzare i contenuti.
                    </p>
                    <div className="flex flex-wrap gap-2 shrink-0">
                        {[
                            { label: "Rifiuta", action: () => saveConsent(defaultConsent), secondary: true },
                            { label: "Personalizza", action: () => setOpenSettings(true), secondary: true },
                            { label: "Accetta tutto", action: () => saveConsent({ necessary: true, preferences: true, analytics: true, marketing: true }), secondary: false },
                        ].map(({ label, action, secondary }) => (
                            <button
                                key={label}
                                onClick={action}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                    secondary
                                        ? isDark
                                            ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/40"
                                            : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                        : "bg-rose-700 hover:bg-rose-600 text-white border-transparent shadow-sm"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-xl mx-auto px-4 sm:px-6 py-5">
                    <h2 className={`text-sm font-semibold mb-4 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                        Preferenze Cookie
                    </h2>
                    <div className={`flex flex-col divide-y ${isDark ? "divide-stone-800/20" : "divide-stone-200"}`}>
                        {consentItems.map((item: any) => (
                            <div key={item.key} className="flex justify-between items-center py-3">
                                <div>
                                    <p className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.label}</p>
                                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.desc}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="accent-rose-700 scale-110"
                                    checked={item.key === "necessary" ? true : tempConsent[item.key as keyof Consent]}
                                    disabled={item.disabled}
                                    onChange={(e) => setTempConsent(prev => ({ ...prev, [item.key]: e.target.checked }))}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setOpenSettings(false)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                            }`}
                        >
                            Indietro
                        </button>
                        <button
                            onClick={() => saveConsent(tempConsent)}
                            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-rose-700 hover:bg-rose-600 text-white transition-colors"
                        >
                            Salva preferenze
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
