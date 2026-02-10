import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

type ContactProps = {
    surveyId: string;
    onNext: () => void;
};

const phonePrefixes = ["+39", "+1", "+44", "+33", "+49"];

export function SurveyContacts({ surveyId, onNext }: ContactProps) {
    const { token } = useAuth();
    const [prefix, setPrefix] = useState(phonePrefixes[0]);
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!number) {
            setError("Inserisci un numero valido");
            return;
        }
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
                    body: JSON.stringify({ phone: {prefix: prefix, number: number} }),
                }
            );
            if (!res.ok) throw new Error("Errore nell'invio del numero");
            onNext();
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl">Inserisci il tuo contatto telefonico</h2>

            <div className="flex gap-2">
                <select
                    value={prefix}
                    onChange={e => setPrefix(e.target.value)}
                    className="p-2 rounded-lg border"
                >
                    {phonePrefixes.map(p => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    placeholder="Numero"
                    className="p-2 rounded-lg border w-48"
                />
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <button
                disabled={loading || !number}
                onClick={handleSubmit}
                className="mt-4 px-6 py-3 bg-green-buttons text-white rounded-xl hover:scale-105 transition-all"
            >
                {loading ? "Salvataggio..." : "Invia"}
            </button>
        </div>
    );
}
