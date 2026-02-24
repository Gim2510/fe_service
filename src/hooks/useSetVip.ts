import { useState } from "react";

export function useUpdateUserToVip() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const setVip = async (userId: string | null, token: string | null) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/change_vip_status/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Update failed");
            }

            setSuccess(true);
        } catch {
            setError("Errore durante l'assegnazione dello status");
        } finally {
            setLoading(false);
        }
    };

    return { setVip, loading, error, success };
}
