import { useState } from "react";

export function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const deleteUser = async (userId: string | null, token: string | null) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/user/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            setSuccess(true);
        } catch {
            setError("Errore durante l'eliminazione del profilo");
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading, error, success };
}
