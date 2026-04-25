import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import { oauthLoginApi } from "../api/auth.api.ts";

export function useGoogleLogin() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doGoogleLogin(idToken: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await oauthLoginApi(idToken);
            login(data.token);
        } catch (err: any) {
            setError(err.message || "Errore login Google");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { doGoogleLogin, loading, error };
}
