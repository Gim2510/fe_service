import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

type LoginInput = {
    email: string;
    password: string;
};

export function useLogin() {
    const { login } = useAuth(); // <-- usa login del contesto
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doLogin({ email, password }: LoginInput) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_USER_BASE_URL}/v1/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const msg = await res.json();
                throw new Error(msg?.message || "Login failed");
            }

            const data = await res.json();
            login(data.accessToken); // <-- qui sostituisce setAuthState
            return data;
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { doLogin, loading, error };
}
