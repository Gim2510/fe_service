import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";
import type {UserType} from "../types/userTypes.ts";

export function useSelectedUser(id: string | null) {
    const { token } = useAuth();

    const [data, setData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !id) {
            setData(null);
            return;
        }

        async function fetchSelectedUser() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${import.meta.env.VITE_USER_BASE_URL}/v1/user/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Errore nel recupero utente");
                }

                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSelectedUser();

    }, [id, token]); // ✅ dipendenze semplici e stabili

    return {
        user: data,
        loading,
        error,
    };
}