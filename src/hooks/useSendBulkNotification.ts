import { useState } from "react";

type UserType = "ADMIN" | "VIP" | "INACTIVE" | "ALL";

export function useSendBulkNotification() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function sendBulkNotification(type: UserType, subject: string, html: string, token: string
    ) {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_NOTIFICATION_BASE_URL}/v1/email/send_bulk/${type}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ subject, html }),
                }
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to send notifications");
            }

            setSuccess(true);
        } catch (e) {
            if (e instanceof Error) setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        sendBulkNotification,
        loading,
        success,
        error,
    };
}