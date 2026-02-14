import { useState } from "react";

export function usePasswordResetRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const base_url = import.meta.env.VITE_USER_BASE_URL;

    const requestReset = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${base_url}/v1/user/password-reset/request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error("Request failed");

            setSuccess(true);
        } catch {
            // NON distinguere i casi
            setError("Errore durante l'invio della richiesta");
        } finally {
            setLoading(false);
        }
    };

    return { requestReset, loading, error, success };
}