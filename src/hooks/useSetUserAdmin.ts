import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";

export function useSetUserAdmin() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doSetUserRoleToAdmin(id: string): Promise<void> {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_USER_BASE_URL}/v1/user/set_admin/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
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

    return { doSetUserRoleToAdmin, loading, error };
}
