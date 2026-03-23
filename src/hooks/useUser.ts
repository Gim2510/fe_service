// src/hooks/useUser.ts
import { useEffect, useState, useCallback } from "react";
import type {UserType} from "../types/userTypes.ts";
import {useAuth} from "../auth/AuthContext.tsx";


export function useUser() {
    const { id, token } = useAuth(); // user._id preso dal token decodificato
    const [data, setData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        if (!token || !id) return;

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
    }, [token, id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user: data,
        loading,
        error,
        refetch: fetchUser,
    };
}
