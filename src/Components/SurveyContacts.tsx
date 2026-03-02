import { useState } from "react"
import { FallingLines } from "react-loader-spinner"

import { useAuth } from "../auth/AuthContext"
import { LiquidGlassButton } from "./Buttons/LiquidGlassButton"

type SurveyContactsProps = {
    surveyId: string
    onNext: () => void
}

const PHONE_PREFIXES = ["+39", "+1", "+44", "+33", "+49"]

export function SurveyContacts({ surveyId, onNext }: SurveyContactsProps) {
    const { token } = useAuth()

    const [prefix, setPrefix] = useState(PHONE_PREFIXES[0])
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const canSubmit = number.trim().length > 4 && !loading

    async function handleSubmit() {
        if (!canSubmit) return

        setLoading(true)
        setError(null)

        try {
            const res = await fetch(
                `${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/save_contacts/${surveyId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        phone: {
                            prefix,
                            number: number.trim(),
                        },
                    }),
                }
            )

            if (!res.ok) {
                throw new Error("Errore nell'invio del numero")
            }

            onNext()
        } catch (err: any) {
            setError(err.message ?? "Errore imprevisto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-8 text-center">
            <header className="space-y-2">
                <h2 className="text-2xl font-light">
                    Inserisci il tuo contatto telefonico
                </h2>
                <p className="text-neutral-400 text-sm">
                    Ti contatteremo solo se necessario
                </p>
            </header>

            <div className="flex gap-3">
                <select
                    value={prefix}
                    onChange={e => setPrefix(e.target.value)}
                    className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white"
                >
                    {PHONE_PREFIXES.map(p => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>

                <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    placeholder="Numero di telefono"
                    className="w-56 rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white placeholder:text-neutral-500"
                />
            </div>

            {error && (
                <div className="text-sm text-red-500">
                    {error}
                </div>
            )}

            <LiquidGlassButton disabled={!canSubmit} onClick={handleSubmit}>
                {loading ? (
                    <FallingLines color="#fff" width="30" visible />
                ) : (
                    "Invia"
                )}
            </LiquidGlassButton>
        </div>
    )
}