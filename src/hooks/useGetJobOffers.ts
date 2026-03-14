import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

export function useGetAllJobOffers() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllJobOffers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${import.meta.env.VITE_CAREERS_BASE_URL}/v1/careers/jobs`,
                {
                    method: "GET",
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

    return { getAllJobOffers, loading, error };
}
