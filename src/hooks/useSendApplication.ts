import type { JobApplicationInput } from "../types/JobApplicationTypes.ts";
import { useState } from "react";

export function useSendApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const base_url = import.meta.env.VITE_CAREERS_BASE_URL;

    const sendApplication = async (
        job_offer_id: string,
        token: string | null,
        input: JobApplicationInput
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Creiamo FormData invece di JSON
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("email", input.email);
            formData.append("social", input.social);
            formData.append("description", input.description);
            if (input.cv) formData.append("cv", input.cv); // File reale

            const response = await fetch(
                `${base_url}/v1/applications/send/${job_offer_id}`,
                {
                    method: "POST",
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        // Non impostare Content-Type: fetch lo gestisce automaticamente
                    },
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Request failed");

            setSuccess(true);
        } catch (err) {
            setError("Errore nell'invio della candidatura");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { sendApplication, loading, error, success };
}