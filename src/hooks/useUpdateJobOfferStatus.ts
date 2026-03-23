import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";

import {ApplicationStatus} from "../types/ApplicationStatus.ts";

export function useUpdateJobOfferStatus() {
    const { token, id } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateJobOfferStatus(new_status: ApplicationStatus): Promise<boolean> {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_CAREERS_BASE_URL}/v1/careers/update_job_offer_status/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ new_status }),
                }
            );

            if (!res.ok) {
                const msg = await res.json();
                throw new Error(msg?.message || "Update failed");
            }

            return await res.json();
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { updateJobOfferStatus, loading, error };
}
