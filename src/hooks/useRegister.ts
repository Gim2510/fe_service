import { useState } from "react";
import type {CompanyRoles} from "../types/CompanyRoles.ts";

type RegisterInput = {
    email: string;
    given_name: string;
    family_name: string;
    password: string;
    fiscal_code: string;
    partita_iva?: string;
    company_name: string;
    company_role: CompanyRoles
};

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function register(data: RegisterInput) {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) {
                const msg = await res.json();
                const err = msg?.error ?? msg;
                const codeMap: Record<string, string> = {
                    MISSING_FIELD:            err?.field ? `Campo obbligatorio mancante: ${err.field}` : "Campo obbligatorio mancante",
                    INVALID_LENGTH:           err?.field === "family_name" ? "Cognome troppo lungo (max 25 caratteri)" : "Nome troppo lungo (max 25 caratteri)",
                    INVALID_EMAIL:            "Formato email non valido",
                    INVALID_PASSWORD:         "La password non soddisfa i requisiti di sicurezza",
                    EMAIL_ALREADY_REGISTERED: "Email già registrata",
                    INVALID_FISCAL_CODE:      "Codice fiscale non valido",
                    USER_CREATION_FAILED:     "Impossibile creare l'account",
                    INTERNAL_ERROR:           "Errore interno del server",
                };
                const errorMsg = codeMap[err?.code] ?? err?.message ?? "Registrazione fallita";
                throw new Error(errorMsg);
            }

            const result = await res.json();
            setSuccess("Registrazione completata!");
            return result;
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
            throw err;
        } finally {
            setLoading(false);
        }
    }
    return { register, loading, error, success };
}