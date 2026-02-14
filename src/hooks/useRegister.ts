import { useState } from "react";

type RegisterInput = {
    email: string;
    given_name: string;
    family_name: string;
    password: string;
    fiscal_code: string;
    partita_iva?: string;
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
                throw new Error(msg?.message || "Registrazione fallita");
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