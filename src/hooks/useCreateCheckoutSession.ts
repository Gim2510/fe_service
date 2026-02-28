import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function useCreateCheckoutSession() {
    const { token } = useAuth();
    const payments_base_url = import.meta.env.VITE_PAYMENTS_BASE_URL;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCheckoutSession = async () => {
        if (!token) {
            setError("Utente non autenticato");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${payments_base_url}/v1/payments/create_checkout_session`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Errore creazione sessione");
            }

            const json = await res.json();
            return json.data; // qui Stripe session object
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createCheckoutSession, loading, error };
}