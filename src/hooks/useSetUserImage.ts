import { useState } from "react";

export function useSetUserImage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function setUserImage(id: string | null, user_image: string, token: string | null) {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/update_user_img/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ user_img: user_image })
                }
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to upload user image.");
            }

            setSuccess(true);
        } catch (e) {
            if (e instanceof Error) setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        setUserImage,
        loading,
        success,
        error,
    };
}