import { useState } from "react";
import type {CreateJobPositionInput} from "../types/JobApplicationTypes.ts";

export function useCreateJobApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const base_url = import.meta.env.VITE_CAREERS_BASE_URL;

    const createJobApplication = async (token: string | null, input: CreateJobPositionInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${base_url}/v1/careers/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ token, input }),
            });

            if (!response.ok) throw new Error("Request failed");

            setSuccess(true);
        } catch {
            setError("Link non valido o scaduto");
        } finally {
            setLoading(false);
        }
    };

    return { createJobApplication, loading, error, success };
}
