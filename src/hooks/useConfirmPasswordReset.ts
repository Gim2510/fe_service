import { useState } from "react";
import axios from "axios";

export function useConfirmPasswordReset() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const base_url = import.meta.env.VITE_USER_BASE_URL

    const confirmReset = async (token: string, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post(`${base_url}/v1/user/password-reset/confirm`, {
                token,
                newPassword,
            });
            setSuccess(true);
        } catch {
            setError("Link non valido o scaduto");
        } finally {
            setLoading(false);
        }
    };

    return { confirmReset, loading, error, success };
}
