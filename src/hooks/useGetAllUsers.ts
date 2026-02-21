import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export function useGetAllUsers() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/users`,
                {
                    method: "GET", // ⚠️ importante se è un reset
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Errore reset survey: ${response.status}`);
            }

            return await response.json();
        } catch (err: any) {
            setError(err.message || "Errore sconosciuto");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { getAllUsers, loading, error };
}
