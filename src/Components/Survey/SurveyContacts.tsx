import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Phone, ArrowRight } from "lucide-react";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useTheme } from "../../Context/ThemeContext.tsx";

type SurveyContactsProps = {
    surveyId: string;
    onNext: () => void;
};

const PHONE_PREFIXES = ["+39", "+1", "+44", "+33", "+49"];

export function SurveyContacts({ surveyId, onNext }: SurveyContactsProps) {
    const { token } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [prefix, setPrefix] = useState(PHONE_PREFIXES[0]);
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit = number.trim().length > 4 && !loading;

    async function handleSubmit() {
        if (!canSubmit) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/save_contacts/${surveyId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ phone: { prefix, number: number.trim() } }),
                }
            );
            if (!res.ok) throw new Error("Errore nell'invio del numero");
            onNext();
        } catch (err: any) {
            setError(err.message ?? "Errore imprevisto");
        } finally {
            setLoading(false);
        }
    }

    const selectClass = `h-11 px-3 rounded-xl border text-sm font-medium appearance-none cursor-pointer
        transition-colors focus:outline-none focus:ring-2
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-emerald-700 focus:ring-emerald-600/20"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-emerald-600 focus:ring-emerald-600/10"
        }`;

    const inputClass = `h-11 flex-1 px-4 rounded-xl border text-sm
        transition-colors focus:outline-none focus:ring-2 placeholder:text-slate-500
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-emerald-700 focus:ring-emerald-600/20"
            : "bg-[#F8FAFB] border-slate-200 text-slate-900 focus:border-emerald-600 focus:ring-emerald-600/10"
        }`;

    return (
        <div className="flex flex-col items-center gap-8 text-center">
            <header className="space-y-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl
                    ${isDark ? "bg-emerald-700/15 border border-emerald-700/20" : "bg-emerald-50 border border-emerald-300"}`}>
                    <Phone size={20} className="text-emerald-600" />
                </div>
                <h2 className={`text-2xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Inserisci il tuo contatto
                </h2>
                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                    Ti contatteremo solo se necessario per chiarimenti sul questionario.
                </p>
            </header>

            <div className="flex gap-3 w-full max-w-sm">
                <select
                    value={prefix}
                    onChange={e => setPrefix(e.target.value)}
                    className={selectClass + " w-24"}
                >
                    {PHONE_PREFIXES.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    placeholder="Numero di telefono"
                    className={inputClass}
                />
            </div>

            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}

            <button
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                    bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed
                    text-white text-sm font-semibold transition-colors
                    shadow-lg shadow-emerald-700/25 hover:-translate-y-0.5 duration-200"
            >
                {loading
                    ? <FallingLines color="#fff" width="20" visible />
                    : <>Invia <ArrowRight size={15} /></>
                }
            </button>
        </div>
    );
}
