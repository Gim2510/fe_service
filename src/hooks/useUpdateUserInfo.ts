import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";
import type {UpdateUserInfo} from "../types/userTypes.ts";

export function useUpdateUserInfo() {
    const { token, id } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doUpdateUserInfo(user_input: UpdateUserInfo): Promise<UpdateUserInfo> {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/update_user_info/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...user_input }),
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

    return { doUpdateUserInfo, loading, error };
}
